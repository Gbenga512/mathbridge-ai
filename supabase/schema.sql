-- MathBridge production database schema.
-- Student learning records are independent of school subscription/enrollment.
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
 created_at timestamptz not null default now(),
 primary key(parent_id,child_id)
);
create table if not exists public.teacher_classes (
 id uuid primary key default gen_random_uuid(),
 teacher_id uuid not null references public.profiles(id) on delete cascade,
 class_name text not null,
 created_at timestamptz not null default now()
);
create table if not exists public.class_students (
 class_id uuid not null references public.teacher_classes(id) on delete cascade,
 student_id uuid not null references public.profiles(id) on delete cascade,
 primary key(class_id,student_id)
);
create table if not exists public.schools (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 school_code text not null unique,
 created_at timestamptz not null default now()
);
create table if not exists public.school_staff (
 school_id uuid not null references public.schools(id) on delete cascade,
 user_id uuid not null references public.profiles(id) on delete cascade,
 role text not null check (role in ('school_admin','teacher')),
 created_at timestamptz not null default now(),
 primary key(school_id,user_id)
);
create table if not exists public.school_classes (
 id uuid primary key default gen_random_uuid(),
 school_id uuid not null references public.schools(id) on delete cascade,
 class_name text not null,
 created_at timestamptz not null default now()
);
create table if not exists public.school_enrollments (
 id uuid primary key default gen_random_uuid(),
 school_id uuid not null references public.schools(id) on delete cascade,
 student_id uuid not null references public.profiles(id) on delete cascade,
 class_id uuid references public.school_classes(id) on delete set null,
 status text not null default 'active' check (status in ('active','removed','suspended')),
 sponsored_until timestamptz,
 enrolled_at timestamptz not null default now(),
 ended_at timestamptz,
 unique(school_id,student_id)
);
create table if not exists public.school_subscriptions (
 id uuid primary key default gen_random_uuid(),
 school_id uuid not null references public.schools(id) on delete cascade,
 seat_limit integer not null check (seat_limit > 0),
 status text not null default 'active' check (status in ('active','past_due','cancelled','expired')),
 starts_at timestamptz not null default now(),
 ends_at timestamptz
);
create table if not exists public.progress (
 student_id uuid primary key references public.profiles(id) on delete cascade,
 term text not null default 'T1',
 week integer not null default 1,
 mastered_weeks text[] not null default '{}',
 updated_at timestamptz not null default now()
);
create table if not exists public.assessments (
 id uuid primary key default gen_random_uuid(),
 student_id uuid not null references public.profiles(id) on delete cascade,
 assessment_type text not null,
 topic text,
 score integer,
 attempts integer not null default 1,
 answers jsonb,
 completed_at timestamptz not null default now()
);
create table if not exists public.term_reports (
 id uuid primary key default gen_random_uuid(),
 student_id uuid not null references public.profiles(id) on delete cascade,
 term text not null,
 average integer,
 weak_points jsonb,
 strengths jsonb,
 recommendations jsonb,
 created_at timestamptz not null default now()
);

-- Student learning data is deliberately separate from school enrollment.
-- Removing a student from a school changes only school_enrollments.status/ended_at.
-- Do not delete or reset progress, assessments, reports, or the auth/profile record.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path=public
as $$
begin
 insert into public.profiles(id,role,full_name,class_level)
 values(new.id,coalesce(new.raw_user_meta_data->>'role','student'),coalesce(new.raw_user_meta_data->>'full_name','Student'),new.raw_user_meta_data->>'class_level')
 on conflict(id) do nothing;
 if coalesce(new.raw_user_meta_data->>'role','student')='student' then
   insert into public.progress(student_id,term,week,mastered_weeks)
   values(new.id,'T1',1,'{}')
   on conflict(student_id) do nothing;
 end if;
 return new;
end;
$$;
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

create policy "profiles own record" on public.profiles for all using (auth.uid()=id) with check (auth.uid()=id);
create policy "progress own record" on public.progress for all using (auth.uid()=student_id) with check (auth.uid()=student_id);
create policy "assessments own record" on public.assessments for all using (auth.uid()=student_id) with check (auth.uid()=student_id);
create policy "reports own record" on public.term_reports for select using (auth.uid()=student_id);
