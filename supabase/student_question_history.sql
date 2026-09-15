-- MathBridge production question-history foundation.
-- Run after the main schema. This migration makes question exposure persistent per student.
-- It intentionally stores question IDs, not answer keys.

create table if not exists public.student_question_history(
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  question_id text not null,
  level text,
  topic text,
  activity_type text not null check(activity_type in ('diagnostic','practice','mastery','test','exam')),
  session_id uuid,
  answered boolean not null default false,
  correct boolean,
  answered_at timestamptz,
  exposed_at timestamptz not null default now(),
  unique(student_id,question_id,activity_type)
);

create index if not exists idx_question_history_student on public.student_question_history(student_id);
create index if not exists idx_question_history_student_level on public.student_question_history(student_id,level);
create index if not exists idx_question_history_student_topic on public.student_question_history(student_id,topic);

alter table public.student_question_history enable row level security;

drop policy if exists "question history own" on public.student_question_history;
create policy "question history own" on public.student_question_history
  for all using(auth.uid()=student_id) with check(auth.uid()=student_id);

create or replace function public.record_question_exposure(
  p_question_id text,
  p_level text default null,
  p_topic text default null,
  p_activity_type text default 'practice',
  p_session_id uuid default null
) returns uuid
language plpgsql security definer set search_path=public as $$
declare v_id uuid;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if not exists(select 1 from public.profiles where id=auth.uid() and role='student') then
    raise exception 'Student access required';
  end if;
  insert into public.student_question_history(student_id,question_id,level,topic,activity_type,session_id)
  values(auth.uid(),p_question_id,p_level,p_topic,p_activity_type,p_session_id)
  on conflict(student_id,question_id,activity_type) do update
    set level=coalesce(excluded.level,student_question_history.level),
        topic=coalesce(excluded.topic,student_question_history.topic),
        session_id=coalesce(excluded.session_id,student_question_history.session_id)
  returning id into v_id;
  return v_id;
end;
$$;

create or replace function public.record_question_answer(
  p_question_id text,
  p_activity_type text,
  p_correct boolean
) returns boolean
language plpgsql security definer set search_path=public as $$
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  update public.student_question_history
  set answered=true,correct=p_correct,answered_at=now()
  where student_id=auth.uid() and question_id=p_question_id and activity_type=p_activity_type;
  return found;
end;
$$;

create or replace function public.get_seen_question_ids(
  p_level text default null,
  p_activity_type text default null
) returns table(question_id text)
language sql stable security definer set search_path=public as $$
  select h.question_id
  from public.student_question_history h
  where h.student_id=auth.uid()
    and (p_level is null or h.level=p_level)
    and (p_activity_type is null or h.activity_type=p_activity_type);
$$;

revoke execute on function public.record_question_exposure(text,text,text,text,uuid) from public;
revoke execute on function public.record_question_answer(text,text,boolean) from public;
revoke execute on function public.get_seen_question_ids(text,text) from public;
grant execute on function public.record_question_exposure(text,text,text,text,uuid) to authenticated;
grant execute on function public.record_question_answer(text,text,boolean) to authenticated;
grant execute on function public.get_seen_question_ids(text,text) to authenticated;
