-- MathBridge production database schema.
-- Student accounts and learning records are student-owned. School membership is separate.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 role text not null check (role in ('student','parent','teacher','school_admin')),
 full_name text not null,
 class_level text,
 created_at timestamptz not null default now()
);
create table if not exists public.parent_children (
 parent_id uuid not null references public.profiles(id) on delete cascade,
 child_id uuid not null references public.profiles(id) on delete cascade,
 created_at timestamptz not null default now(), primary key(parent_id,child_id)
);
create table if not exists public.teacher_classes (
 id uuid primary key default gen_random_uuid(), teacher_id uuid not null references public.profiles(id) on delete cascade,
 class_name text not null, created_at timestamptz not null default now()
);
create table if not exists public.class_students (
 class_id uuid not null references public.teacher_classes(id) on delete cascade,
 student_id uuid not null references public.profiles(id) on delete cascade, primary key(class_id,student_id)
);
create table if not exists public.schools (
 id uuid primary key default gen_random_uuid(), name text not null, school_code text not null unique,
 enabled_sections text[] not null default '{JSS}', created_at timestamptz not null default now()
);
create table if not exists public.school_staff (
 school_id uuid not null references public.schools(id) on delete cascade,
 user_id uuid not null references public.profiles(id) on delete cascade,
 role text not null check (role in ('school_admin','teacher')), created_at timestamptz not null default now(),
 primary key(school_id,user_id)
);
create table if not exists public.school_classes (
 id uuid primary key default gen_random_uuid(), school_id uuid not null references public.schools(id) on delete cascade,
 class_name text not null, class_level text, section text, stream text, created_at timestamptz not null default now(),
 unique(school_id,class_name)
);
create table if not exists public.school_enrollments (
 id uuid primary key default gen_random_uuid(), school_id uuid not null references public.schools(id) on delete cascade,
 student_id uuid not null references public.profiles(id) on delete cascade, class_id uuid references public.school_classes(id) on delete set null,
 status text not null default 'active' check (status in ('active','removed','suspended')), sponsored_until timestamptz,
 enrolled_at timestamptz not null default now(), ended_at timestamptz, unique(school_id,student_id)
);
create table if not exists public.school_subscriptions (
 id uuid primary key default gen_random_uuid(), school_id uuid not null references public.schools(id) on delete cascade,
 seat_limit integer not null check(seat_limit>0), status text not null default 'active' check(status in ('active','past_due','cancelled','expired')),
 starts_at timestamptz not null default now(), ends_at timestamptz
);
create table if not exists public.progress (
 student_id uuid primary key references public.profiles(id) on delete cascade, term text not null default 'T1', week integer not null default 1,
 mastered_weeks text[] not null default '{}', updated_at timestamptz not null default now()
);
create table if not exists public.assessments (
 id uuid primary key default gen_random_uuid(), student_id uuid not null references public.profiles(id) on delete cascade,
 assessment_type text not null, topic text, score integer, attempts integer not null default 1, answers jsonb, completed_at timestamptz not null default now()
);
create table if not exists public.term_reports (
 id uuid primary key default gen_random_uuid(), student_id uuid not null references public.profiles(id) on delete cascade,
 term text not null, average integer, weak_points jsonb, strengths jsonb, recommendations jsonb, created_at timestamptz not null default now()
);
create table if not exists public.school_tests (
 id uuid primary key default gen_random_uuid(), school_id uuid not null references public.schools(id) on delete cascade,
 created_by uuid not null references public.profiles(id) on delete restrict, title text not null,
 subject text not null default 'Mathematics', term text, class_id uuid references public.school_classes(id) on delete set null,
 question_count integer not null check(question_count>0), duration_minutes integer not null check(duration_minutes>0),
 pass_mark integer not null default 50 check(pass_mark between 0 and 100), instructions text,
 randomize_questions boolean not null default true, randomize_options boolean not null default false,
 status text not null default 'draft' check(status in ('draft','published','closed')), starts_at timestamptz, closes_at timestamptz,
 created_at timestamptz not null default now()
);
create table if not exists public.school_test_items (
 id uuid primary key default gen_random_uuid(), test_id uuid not null references public.school_tests(id) on delete cascade,
 question_id text not null, position integer not null, points numeric(8,2) not null default 1 check(points>0),
 unique(test_id,position), unique(test_id,question_id)
);
create table if not exists public.school_test_assignments (
 id uuid primary key default gen_random_uuid(), test_id uuid not null references public.school_tests(id) on delete cascade,
 student_id uuid not null references public.profiles(id) on delete cascade,
 status text not null default 'assigned' check(status in ('assigned','started','submitted','expired')),
 assigned_at timestamptz not null default now(), started_at timestamptz, submitted_at timestamptz, unique(test_id,student_id)
);
create table if not exists public.school_test_attempts (
 id uuid primary key default gen_random_uuid(), assignment_id uuid not null references public.school_test_assignments(id) on delete cascade,
 student_id uuid not null references public.profiles(id) on delete cascade, score numeric(10,2) not null default 0,
 percentage numeric(5,2) not null default 0, passed boolean not null default false, answers jsonb not null default '{}'::jsonb,
 started_at timestamptz not null default now(), submitted_at timestamptz, unique(assignment_id)
);
create table if not exists public.school_audit_log (
 id uuid primary key default gen_random_uuid(), school_id uuid not null references public.schools(id) on delete cascade,
 actor_id uuid not null references public.profiles(id) on delete restrict, action text not null, entity_type text not null,
 entity_id uuid, details jsonb, created_at timestamptz not null default now()
);

-- Safe upgrades for existing installations.
alter table public.school_classes add column if not exists class_level text;
alter table public.school_classes add column if not exists section text;
alter table public.school_classes add column if not exists stream text;
alter table public.schools add column if not exists enabled_sections text[] not null default '{JSS}';

create or replace function public.is_school_staff(p_school_id uuid,p_user_id uuid default auth.uid()) returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.school_staff where school_id=p_school_id and user_id=p_user_id); $$;
create or replace function public.is_school_admin(p_school_id uuid,p_user_id uuid default auth.uid()) returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.school_staff where school_id=p_school_id and user_id=p_user_id and role='school_admin'); $$;
create or replace function public.is_school_teacher(p_school_id uuid,p_user_id uuid default auth.uid()) returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.school_staff where school_id=p_school_id and user_id=p_user_id and role in ('school_admin','teacher')); $$;
create or replace function public.active_school_seats(p_school_id uuid) returns integer language sql stable security definer set search_path=public
as $$ select count(*)::integer from public.school_enrollments where school_id=p_school_id and status='active'; $$;

create or replace function public.enroll_student_in_school(p_school_id uuid,p_student_id uuid,p_class_id uuid default null,p_sponsored_until timestamptz default null)
returns uuid language plpgsql security definer set search_path=public as $$
declare v_id uuid; v_limit integer; v_status text; v_exists boolean;
begin
 if not public.is_school_admin(p_school_id) then raise exception 'Only a school administrator can enroll students'; end if;
 if not exists(select 1 from public.profiles where id=p_student_id and role='student') then raise exception 'Student account not found'; end if;
 if p_class_id is not null and not exists(select 1 from public.school_classes where id=p_class_id and school_id=p_school_id) then raise exception 'Class does not belong to this school'; end if;
 select exists(select 1 from public.school_enrollments where school_id=p_school_id and student_id=p_student_id and status='active') into v_exists;
 if v_exists then raise exception 'Student is already actively enrolled'; end if;
 select seat_limit,status into v_limit,v_status from public.school_subscriptions where school_id=p_school_id order by starts_at desc limit 1;
 if v_status is distinct from 'active' or v_limit is null then raise exception 'No active school subscription'; end if;
 if public.active_school_seats(p_school_id)>=v_limit then raise exception 'No subscription seats available'; end if;
 insert into public.school_enrollments(school_id,student_id,class_id,status,sponsored_until,enrolled_at,ended_at)
 values(p_school_id,p_student_id,p_class_id,'active',p_sponsored_until,now(),null)
 on conflict(school_id,student_id) do update set class_id=excluded.class_id,status='active',sponsored_until=excluded.sponsored_until,enrolled_at=now(),ended_at=null returning id into v_id;
 insert into public.school_audit_log(school_id,actor_id,action,entity_type,entity_id,details) values(p_school_id,auth.uid(),'enroll','school_enrollment',v_id,jsonb_build_object('student_id',p_student_id,'class_id',p_class_id));
 return v_id;
end; $$;
create or replace function public.remove_student_from_school(p_enrollment_id uuid) returns boolean language plpgsql security definer set search_path=public as $$
declare v_school uuid; v_student uuid;
begin
 select school_id,student_id into v_school,v_student from public.school_enrollments where id=p_enrollment_id;
 if v_school is null then raise exception 'Enrollment not found'; end if;
 if not public.is_school_admin(v_school) then raise exception 'Only a school administrator can remove students'; end if;
 update public.school_enrollments set status='removed',ended_at=now() where id=p_enrollment_id and status='active';
 insert into public.school_audit_log(school_id,actor_id,action,entity_type,entity_id,details) values(v_school,auth.uid(),'remove','school_enrollment',p_enrollment_id,jsonb_build_object('student_id',v_student,'learning_data_preserved',true));
 return true;
end; $$;
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin
 insert into public.profiles(id,role,full_name,class_level) values(new.id,coalesce(new.raw_user_meta_data->>'role','student'),coalesce(new.raw_user_meta_data->>'full_name','User'),new.raw_user_meta_data->>'class_level') on conflict(id) do nothing;
 if coalesce(new.raw_user_meta_data->>'role','student')='student' then insert into public.progress(student_id,term,week,mastered_weeks) values(new.id,'T1',1,'{}') on conflict(student_id) do nothing; end if;
 return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.parent_children enable row level security;
alter table public.teacher_classes enable row level security;
alter table public.class_students enable row level security;
alter table public.schools enable row level security;
alter table public.school_staff enable row level security;
alter table public.school_classes enable row level security;
alter table public.school_enrollments enable row level security;
alter table public.school_subscriptions enable row level security;
alter table public.progress enable row level security;
alter table public.assessments enable row level security;
alter table public.term_reports enable row level security;
alter table public.school_tests enable row level security;
alter table public.school_test_items enable row level security;
alter table public.school_test_assignments enable row level security;
alter table public.school_test_attempts enable row level security;
alter table public.school_audit_log enable row level security;

drop policy if exists "profiles own record" on public.profiles;
drop policy if exists "progress own record" on public.progress;
drop policy if exists "assessments own record" on public.assessments;
drop policy if exists "reports own record" on public.term_reports;
drop policy if exists "schools staff read" on public.schools;
drop policy if exists "school staff read" on public.school_staff;
drop policy if exists "school classes staff" on public.school_classes;
drop policy if exists "school enrollments staff" on public.school_enrollments;
drop policy if exists "school subscriptions staff" on public.school_subscriptions;
drop policy if exists "school tests staff" on public.school_tests;
drop policy if exists "school test items staff" on public.school_test_items;
drop policy if exists "school assignments student or staff" on public.school_test_assignments;
drop policy if exists "school attempts student or staff" on public.school_test_attempts;
drop policy if exists "school audit admin" on public.school_audit_log;
create policy "profiles own record" on public.profiles for all using(auth.uid()=id) with check(auth.uid()=id);
create policy "progress own record" on public.progress for all using(auth.uid()=student_id) with check(auth.uid()=student_id);
create policy "assessments own record" on public.assessments for all using(auth.uid()=student_id) with check(auth.uid()=student_id);
create policy "reports own record" on public.term_reports for select using(auth.uid()=student_id);
create policy "schools staff read" on public.schools for select using(public.is_school_staff(id));
create policy "school staff read" on public.school_staff for select using(public.is_school_staff(school_id));
create policy "school classes staff" on public.school_classes for select using(public.is_school_staff(school_id));
create policy "school enrollments staff" on public.school_enrollments for select using(public.is_school_staff(school_id) or auth.uid()=student_id);
create policy "school subscriptions staff" on public.school_subscriptions for select using(public.is_school_staff(school_id));
create policy "school tests staff" on public.school_tests for all using(public.is_school_staff(school_id)) with check(public.is_school_staff(school_id));
create policy "school test items staff" on public.school_test_items for all using(exists(select 1 from public.school_tests t where t.id=test_id and public.is_school_staff(t.school_id))) with check(exists(select 1 from public.school_tests t where t.id=test_id and public.is_school_staff(t.school_id)));
create policy "school assignments student or staff" on public.school_test_assignments for all using(auth.uid()=student_id or exists(select 1 from public.school_tests t where t.id=test_id and public.is_school_staff(t.school_id))) with check(auth.uid()=student_id or exists(select 1 from public.school_tests t where t.id=test_id and public.is_school_staff(t.school_id)));
create policy "school attempts student or staff" on public.school_test_attempts for all using(auth.uid()=student_id or exists(select 1 from public.school_test_assignments a join public.school_tests t on t.id=a.test_id where a.id=assignment_id and public.is_school_staff(t.school_id))) with check(auth.uid()=student_id or exists(select 1 from public.school_test_assignments a join public.school_tests t on t.id=a.test_id where a.id=assignment_id and public.is_school_staff(t.school_id)));
create policy "school audit admin" on public.school_audit_log for select using(public.is_school_admin(school_id));
create index if not exists idx_school_enrollments_school_status on public.school_enrollments(school_id,status);
create index if not exists idx_school_enrollments_student on public.school_enrollments(student_id);
create index if not exists idx_school_classes_school on public.school_classes(school_id);
create index if not exists idx_school_tests_school_status on public.school_tests(school_id,status);
create index if not exists idx_school_assignments_student on public.school_test_assignments(student_id);
create index if not exists idx_school_attempts_student on public.school_test_attempts(student_id);
