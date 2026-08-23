-- MathBridge production database schema.
-- Run in Supabase SQL Editor after creating the project.
create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 role text not null check (role in ('student','parent','teacher')),
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

alter table public.profiles enable row level security;
alter table public.parent_children enable row level security;
alter table public.teacher_classes enable row level security;
alter table public.class_students enable row level security;
alter table public.progress enable row level security;
alter table public.assessments enable row level security;
alter table public.term_reports enable row level security;

-- Base policies. Production deployment should review these with the final role model.
create policy "profiles own record" on public.profiles for all using (auth.uid()=id) with check (auth.uid()=id);
create policy "progress own record" on public.progress for all using (auth.uid()=student_id) with check (auth.uid()=student_id);
create policy "assessments own record" on public.assessments for all using (auth.uid()=student_id) with check (auth.uid()=student_id);
create policy "reports own record" on public.term_reports for select using (auth.uid()=student_id);
