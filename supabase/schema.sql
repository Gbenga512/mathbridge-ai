);

create table if not exists public.school_test_items (
 id uuid primary key default gen_random_uuid(),
 test_id uuid not null references public.school_tests(id) on delete cascade,
 question_id text not null,
 position integer not null,
 points numeric(8,2) not null default 1 check (points > 0),
 unique(test_id,position),
 unique(test_id,question_id)
);

create table if not exists public.school_test_assignments (
 id uuid primary key default gen_random_uuid(),
 test_id uuid not null references public.school_tests(id) on delete cascade,
 student_id uuid not null references public.profiles(id) on delete cascade,
 status text not null default 'assigned' check (status in ('assigned','started','submitted','expired')),
 assigned_at timestamptz not null default now(),
 started_at timestamptz,
 submitted_at timestamptz,
 unique(test_id,student_id)
);

create table if not exists public.school_test_attempts (
 id uuid primary key default gen_random_uuid(),
 assignment_id uuid not null references public.school_test_assignments(id) on delete cascade,
 student_id uuid not null references public.profiles(id) on delete cascade,
 score numeric(10,2) not null default 0,
 percentage numeric(5,2) not null default 0,
 passed boolean not null default false,
 answers jsonb not null default '{}'::jsonb,
 started_at timestamptz not null default now(),
 submitted_at timestamptz,
 unique(assignment_id)
);

create table if not exists public.school_audit_log (
 id uuid primary key default gen_random_uuid(),
 school_id uuid not null references public.schools(id) on delete cascade,
 actor_id uuid not null references public.profiles(id) on delete restrict,
 action text not null,
 entity_type text not null,
 entity_id uuid,
 details jsonb,
 created_at timestamptz not null default now()
);

-- Backward-compatible upgrades for an already-created schools table.
alter table public.schools add column if not exists enabled_sections text[] not null default '{JSS}';
alter table public.school_classes add column if not exists section text;
alter table public.school_classes add column if not exists stream text;
alter table public.school_classes add column if not exists class_level text;

-- Student learning data remains independent from school membership.
-- Removing a student from a school updates only school_enrollments and releases a seat.
-- It never deletes/reset progress, assessments, reports, achievements or the student account.

create or replace function public.is_school_staff(p_school_id uuid, p_user_id uuid default auth.uid())
returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.school_staff where school_id=p_school_id and user_id=p_user_id); $$;

create or replace function public.is_school_admin(p_school_id uuid, p_user_id uuid default auth.uid())
returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.school_staff where school_id=p_school_id and user_id=p_user_id and role='school_admin'); $$;

create or replace function public.is_school_teacher(p_school_id uuid, p_user_id uuid default auth.uid())
returns boolean language sql stable security definer set search_path=public
as $$ select exists(select 1 from public.school_staff where school_id=p_school_id and user_id=p_user_id and role in ('school_admin','teacher')); $$;

create or replace function public.active_school_seats(p_school_id uuid)
returns integer language sql stable security definer set search_path=public
as $$ select count(*)::integer from public.school_enrollments where school_id=p_school_id and status='active'; $$;

create or replace function public.enroll_student_in_school(
 p_school_id uuid,
 p_student_id uuid,
 p_class_id uuid default null,
 p_sponsored_until timestamptz default null
)
returns uuid language plpgsql security definer set search_path=public
as $$
declare v_id uuid; v_limit integer; v_status text; v_exists boolean;
begin
 if not public.is_school_admin(p_school_id) then raise exception 'Only a school administrator can enroll students'; end if;
 if not exists(select 1 from public.profiles where id=p_student_id and role='student') then raise exception 'Student account not found'; end if;
 if p_class_id is not null and not exists(select 1 from public.school_classes where id=p_class_id and school_id=p_school_id) then raise exception 'Class does not belong to this school'; end if;
 select exists(select 1 from public.school_enrollments where school_id=p_school_id and student_id=p_student_id and status='active') into v_exists;
 if v_exists then raise exception 'Student is already actively enrolled'; end if;
 select seat_limit,status into v_limit,v_status from public.school_subscriptions where school_id=p_school_id order by starts_at desc limit 1;
 if v_status is distinct from 'active' or v_limit is null then raise exception 'No active school subscription'; end if;
 if public.active_school_seats(p_school_id) >= v_limit then raise exception 'No subscription seats available'; end if;
 insert into public.school_enrollments(school_id,student_id,class_id,status,sponsored_until,enrolled_at,ended_at)
 values(p_school_id,p_student_id,p_class_id,'active',p_sponsored_until,now(),null)
 on conflict(school_id,student_id) do update set class_id=excluded.class_id,status='active',sponsored_until=excluded.sponsored_until,enrolled_at=now(),ended_at=null
 returning id into v_id;
 insert into public.school_audit_log(school_id,actor_id,action,entity_type,entity_id,details) values(p_school_id,auth.uid(),'enroll','school_enrollment',v_id,jsonb_build_object('student_id',p_student_id,'class_id',p_class_id));
 return v_id;
end; $$;

create or replace function public.remove_student_from_school(p_enrollment_id uuid)
returns boolean language plpgsql security definer set search_path=public
as $$
declare v_school_id uuid; v_student_id uuid;
begin
 select school_id,student_id into v_school_id,v_student_id from public.school_enrollments where id=p_enrollment_id;
 if v_school_id is null then raise exception 'School enrolment not found'; end if;
 if not public.is_school_admin(v_school_id) then raise exception 'Only a school administrator can remove students'; end if;
 update public.school_enrollments set status='inactive',ended_at=now() where id=p_enrollment_id;
 insert into public.school_audit_log(school_id,actor_id,action,entity_type,entity_id,details) values(v_school_id,auth.uid(),'remove','school_enrollment',p_enrollment_id,jsonb_build_object('student_id',v_student_id));
 return true;
end; $$;
