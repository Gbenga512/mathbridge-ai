-- MathBridge production migration: secure school assessments.
-- Run this migration in Supabase SQL Editor after the base schema.

create table if not exists public.school_test_answer_keys(
  id uuid primary key default gen_random_uuid(),
  item_id uuid not null unique references public.school_test_items(id) on delete cascade,
  answer integer not null,
  created_at timestamptz not null default now()
);

alter table public.school_test_answer_keys enable row level security;

drop policy if exists "school answer keys staff" on public.school_test_answer_keys;
create policy "school answer keys staff" on public.school_test_answer_keys
for all using(exists(
  select 1 from public.school_test_items i
  join public.school_tests t on t.id=i.test_id
  where i.id=item_id and public.is_school_staff(t.school_id)
)) with check(exists(
  select 1 from public.school_test_items i
  join public.school_tests t on t.id=i.test_id
  where i.id=item_id and public.is_school_staff(t.school_id)
));

-- Students may read only the question snapshot, never the answer key.
-- PostgreSQL RLS is row-based, so the answer key lives in its own protected table.
drop policy if exists "school test items student" on public.school_test_items;
create policy "school test items student" on public.school_test_items
for select using(exists(
  select 1 from public.school_test_assignments a
  join public.school_tests t on t.id=a.test_id
  where a.test_id=test_id and a.student_id=auth.uid() and t.status='published'
));

-- Students can read their assignments but cannot directly insert/update/delete them.
drop policy if exists "school assignments student or staff" on public.school_test_assignments;
create policy "school assignments student read" on public.school_test_assignments
for select using(auth.uid()=student_id or exists(
  select 1 from public.school_tests t where t.id=test_id and public.is_school_staff(t.school_id)
));
create policy "school assignments staff write" on public.school_test_assignments
for all using(exists(
  select 1 from public.school_tests t where t.id=test_id and public.is_school_staff(t.school_id)
)) with check(exists(
  select 1 from public.school_tests t where t.id=test_id and public.is_school_staff(t.school_id)
));

-- Students can only read their own attempts; writes happen through SECURITY DEFINER RPC.
drop policy if exists "school attempts student or staff" on public.school_test_attempts;
create policy "school attempts student read" on public.school_test_attempts
for select using(auth.uid()=student_id or exists(
  select 1 from public.school_test_assignments a
  join public.school_tests t on t.id=a.test_id
  where a.id=assignment_id and public.is_school_staff(t.school_id)
));
create policy "school attempts staff write" on public.school_test_attempts
for all using(exists(
  select 1 from public.school_test_assignments a
  join public.school_tests t on t.id=a.test_id
  where a.id=assignment_id and public.is_school_staff(t.school_id)
)) with check(exists(
  select 1 from public.school_test_assignments a
  join public.school_tests t on t.id=a.test_id
  where a.id=assignment_id and public.is_school_staff(t.school_id)
));

-- Students may see only tests to which they are assigned.
drop policy if exists "school test student" on public.school_tests;
create policy "school test student" on public.school_tests
for select using(exists(
  select 1 from public.school_test_assignments a
  where a.test_id=id and a.student_id=auth.uid()
));

create or replace function public.start_school_test(p_assignment_id uuid)
returns public.school_test_assignments
language plpgsql security definer set search_path=public
as $$
declare a public.school_test_assignments; t public.school_tests;
begin
  select * into a from public.school_test_assignments
  where id=p_assignment_id and student_id=auth.uid();
  if not found then raise exception 'Assignment not found'; end if;
  if a.status='submitted' then raise exception 'Test already submitted'; end if;
  select * into t from public.school_tests where id=a.test_id and status='published';
  if not found then raise exception 'Test is not available'; end if;
  if t.starts_at is not null and now()<t.starts_at then raise exception 'Test has not started'; end if;
  if t.closes_at is not null and now()>t.closes_at then raise exception 'Test is closed'; end if;
  if a.status='assigned' then
    update public.school_test_assignments set status='started',started_at=now()
    where id=a.id returning * into a;
  end if;
  return a;
end;
$$;

create or replace function public.submit_school_test(p_assignment_id uuid,p_answers jsonb)
returns jsonb language plpgsql security definer set search_path=public
as $$
declare a public.school_test_assignments; t public.school_tests; i record;
v_total numeric:=0; v_score numeric:=0; v_selected integer;
v_percentage numeric:=0; v_passed boolean:=false; v_now timestamptz:=now();
begin
  select * into a from public.school_test_assignments
  where id=p_assignment_id and student_id=auth.uid() for update;
  if not found then raise exception 'Assignment not found'; end if;
  if a.status='submitted' then raise exception 'Test already submitted'; end if;
  select * into t from public.school_tests where id=a.test_id;
  if not found or t.status<>'published' then raise exception 'Test is not available'; end if;
  if a.started_at is null then raise exception 'Test has not been started'; end if;

  -- Enforce the duration server-side even if the browser timer is manipulated.
  if v_now > a.started_at + make_interval(mins=>t.duration_minutes) then
    raise exception 'Test time has expired';
  end if;

  for i in
    select sti.id,sti.points,ak.answer
    from public.school_test_items sti
    join public.school_test_answer_keys ak on ak.item_id=sti.id
    where sti.test_id=t.id
  loop
    v_total:=v_total+i.points;
    v_selected:=null;
    begin v_selected:=(p_answers->>i.id::text)::integer; exception when others then v_selected:=null; end;
    if v_selected=i.answer then v_score:=v_score+i.points; end if;
  end loop;
  if v_total>0 then v_percentage:=round((v_score/v_total)*100,2); end if;
  v_passed:=v_percentage>=t.pass_mark;

  insert into public.school_test_attempts(assignment_id,student_id,score,percentage,passed,answers,started_at,submitted_at)
  values(a.id,auth.uid(),v_score,v_percentage,v_passed,coalesce(p_answers,'{}'::jsonb),a.started_at,v_now)
  on conflict(assignment_id) do update set score=excluded.score,percentage=excluded.percentage,passed=excluded.passed,answers=excluded.answers,submitted_at=excluded.submitted_at;
  update public.school_test_assignments set status='submitted',submitted_at=v_now where id=a.id;
  return jsonb_build_object('score',v_score,'percentage',v_percentage,'passed',v_passed,'submitted_at',v_now);
end;
$$;

grant execute on function public.start_school_test(uuid) to authenticated;
grant execute on function public.submit_school_test(uuid,jsonb) to authenticated;

-- Existing question snapshots contain answer for tests already created.
-- Copy those answers into the protected key table, then remove them from the student snapshot.
insert into public.school_test_answer_keys(item_id,answer)
select id,(question_snapshot->>'answer')::integer
from public.school_test_items
where question_snapshot ? 'answer'
on conflict(item_id) do nothing;

update public.school_test_items
set question_snapshot = question_snapshot - 'answer'
where question_snapshot ? 'answer';
