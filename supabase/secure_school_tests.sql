-- MathBridge production-secure School Test Centre.
-- Students can read only assigned, published test content without answer keys.
-- Answer keys and marking remain server-side through security-definer RPCs.

create table if not exists public.school_test_answer_keys(
  item_id uuid primary key references public.school_test_items(id) on delete cascade,
  answer integer not null check(answer>=0),
  created_at timestamptz not null default now()
);

alter table public.school_test_answer_keys enable row level security;
drop policy if exists "school answer keys staff" on public.school_test_answer_keys;
drop policy if exists "school answer keys staff insert" on public.school_test_answer_keys;
create policy "school answer keys staff insert" on public.school_test_answer_keys
  for insert with check(exists(select 1 from public.school_test_items i join public.school_tests t on t.id=i.test_id where i.id=item_id and public.is_school_admin(t.school_id)));

-- Replace broad student write policies from the base schema.
drop policy if exists "school tests staff" on public.school_tests;
drop policy if exists "school test items staff" on public.school_test_items;
drop policy if exists "school assignments student or staff" on public.school_test_assignments;
drop policy if exists "school attempts student or staff" on public.school_test_attempts;

-- IMPORTANT: these staff policies use the dedicated SECURITY DEFINER helper.
-- Calling is_school_staff() from an RLS policy would fail for clients after
-- its EXECUTE privilege was intentionally revoked during security hardening.
create policy "school tests staff manage" on public.school_tests for all using((select public.is_school_test_staff(id))) with check((select public.is_school_test_staff(id)));
create policy "school tests assigned student read" on public.school_tests for select using(status='published' and exists(select 1 from public.school_test_assignments a where a.test_id=school_tests.id and a.student_id=auth.uid()));
create policy "school test items staff manage" on public.school_test_items for all using((select public.is_school_test_staff(test_id))) with check((select public.is_school_test_staff(test_id)));
create policy "school test items assigned student read" on public.school_test_items for select using(exists(select 1 from public.school_test_assignments a join public.school_tests t on t.id=a.test_id where a.test_id=school_test_items.test_id and a.student_id=auth.uid() and t.status='published'));
create policy "school assignments staff manage" on public.school_test_assignments for all using((select public.is_school_test_staff(test_id))) with check((select public.is_school_test_staff(test_id)));
create policy "school assignments student read" on public.school_test_assignments for select using((select auth.uid())=student_id);
create policy "school attempts staff read" on public.school_test_attempts for select using(exists(select 1 from public.school_test_assignments a where a.id=assignment_id and (select public.is_school_test_staff(a.test_id))));
create policy "school attempts student read" on public.school_test_attempts for select using((select auth.uid())=student_id);

create or replace function public.start_school_test(p_assignment_id uuid) returns jsonb language plpgsql security definer set search_path=public as $$
declare v_assignment public.school_test_assignments%rowtype; v_test public.school_tests%rowtype; v_attempt public.school_test_attempts%rowtype;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  select * into v_assignment from public.school_test_assignments where id=p_assignment_id and student_id=auth.uid();
  if not found then raise exception 'Test assignment not found'; end if;
  select * into v_test from public.school_tests where id=v_assignment.test_id;
  if not found or v_test.status<>'published' then raise exception 'Test is not available'; end if;
  if v_test.starts_at is not null and now()<v_test.starts_at then raise exception 'Test has not started'; end if;
  if v_test.closes_at is not null and now()>v_test.closes_at then raise exception 'Test is closed'; end if;
  if v_assignment.status='submitted' then raise exception 'Test has already been submitted'; end if;
  if v_assignment.status='assigned' then update public.school_test_assignments set status='started',started_at=coalesce(started_at,now()) where id=p_assignment_id returning * into v_assignment; end if;
  insert into public.school_test_attempts(assignment_id,student_id,started_at) values(v_assignment.id,auth.uid(),coalesce(v_assignment.started_at,now())) on conflict(assignment_id) do update set started_at=excluded.started_at returning * into v_attempt;
  return jsonb_build_object('id',v_assignment.id,'test_id',v_assignment.test_id,'status',v_assignment.status,'started_at',v_assignment.started_at,'attempt_id',v_attempt.id);
end; $$;

create or replace function public.submit_school_test(p_assignment_id uuid,p_answers jsonb default '{}'::jsonb) returns jsonb language plpgsql security definer set search_path=public as $$
declare v_assignment public.school_test_assignments%rowtype; v_test public.school_tests%rowtype; v_attempt public.school_test_attempts%rowtype; v_total numeric:=0; v_score numeric:=0; v_item record; v_answer integer; v_count integer:=0; v_percentage numeric:=0; v_passed boolean:=false; v_started_at timestamptz;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  select * into v_assignment from public.school_test_assignments where id=p_assignment_id and student_id=auth.uid();
  if not found then raise exception 'Test assignment not found'; end if;
  select * into v_test from public.school_tests where id=v_assignment.test_id;
  if not found then raise exception 'Test not found'; end if;
  if v_assignment.status='submitted' then select * into v_attempt from public.school_test_attempts where assignment_id=p_assignment_id; return jsonb_build_object('score',v_attempt.score,'percentage',v_attempt.percentage,'passed',v_attempt.passed,'already_submitted',true); end if;
  if v_assignment.status<>'started' then raise exception 'Test has not been started'; end if;
  select started_at into v_started_at from public.school_test_attempts where assignment_id=p_assignment_id and student_id=auth.uid();
  v_started_at:=coalesce(v_assignment.started_at,v_started_at);
  if v_started_at is null then raise exception 'Test start time is missing'; end if;
  if v_test.closes_at is not null and now()>v_test.closes_at then raise exception 'Test is closed'; end if;
  if v_test.duration_minutes is not null and now()>v_started_at+make_interval(mins=>v_test.duration_minutes) then raise exception 'Test time has expired'; end if;
  for v_item in select i.id,i.points,k.answer from public.school_test_items i join public.school_test_answer_keys k on k.item_id=i.id where i.test_id=v_test.id order by i.position loop
    v_total:=v_total+coalesce(v_item.points,0); v_count:=v_count+1;
    if p_answers ? v_item.id::text then begin v_answer:=(p_answers->>v_item.id::text)::integer; exception when others then v_answer:=null; end if; else v_answer:=null; end if;
    if v_answer is not null and v_answer=v_item.answer then v_score:=v_score+coalesce(v_item.points,0); end if;
  end loop;
  if v_total>0 then v_percentage:=round((v_score/v_total)*100,2); end if;
  v_passed:=v_percentage>=v_test.pass_mark;
  update public.school_test_attempts as sta set score=v_score,percentage=v_percentage,passed=v_passed,answers=p_answers,submitted_at=now() where sta.assignment_id=p_assignment_id returning sta.* into v_attempt;
  if not found then insert into public.school_test_attempts(assignment_id,student_id,score,percentage,passed,answers,started_at,submitted_at) values(v_assignment.id,auth.uid(),v_score,v_percentage,v_passed,p_answers,v_started_at,now()) returning * into v_attempt; end if;
  update public.school_test_assignments set status='submitted',submitted_at=now() where id=p_assignment_id;
  return jsonb_build_object('score',v_score,'percentage',v_percentage,'passed',v_passed,'questions',v_count,'submitted_at',v_attempt.submitted_at);
end; $$;

revoke execute on function public.start_school_test(uuid) from public,anon; grant execute on function public.start_school_test(uuid) to authenticated;
revoke execute on function public.submit_school_test(uuid,jsonb) from public,anon; grant execute on function public.submit_school_test(uuid,jsonb) to authenticated;
