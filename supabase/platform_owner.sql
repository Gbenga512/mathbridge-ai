-- MathBridge platform-owner foundation.
-- Run this migration in the Supabase SQL Editor before using the owner dashboard.
-- There is intentionally no public signup path for these roles.

alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check check(role in ('student','parent','teacher','school_admin','site_admin','site_manager'));

create or replace function public.is_site_manager(p_user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path=public
as $$
  select exists(select 1 from public.profiles where id=p_user_id and role='site_manager');
$$;

create or replace function public.is_site_admin(p_user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path=public
as $$
  select exists(select 1 from public.profiles where id=p_user_id and role in ('site_admin','site_manager'));
$$;

create or replace function public.get_site_manager_dashboard()
returns jsonb
language plpgsql
security definer
set search_path=public
as $$
declare result jsonb;
begin
  if not public.is_site_manager() then
    raise exception 'Platform owner access required';
  end if;

  select jsonb_build_object(
    'stats', jsonb_build_object(
      'users',(select count(*) from public.profiles),
      'students',(select count(*) from public.profiles where role='student'),
      'schools',(select count(*) from public.schools),
      'active_seats',(select count(*) from public.school_enrollments where status='active'),
      'active_subscriptions',(select count(*) from public.school_subscriptions where status='active'),
      'tests',(select count(*) from public.school_tests),
      'submitted_attempts',(select count(*) from public.school_test_attempts where submitted_at is not null)
    ),
    'recent_schools',coalesce((select jsonb_agg(s order by s.created_at desc) from (select id,name,school_code,created_at from public.schools order by created_at desc limit 8)s),'[]'::jsonb),
    'recent_tests',coalesce((select jsonb_agg(t order by t.created_at desc) from (select id,title,subject,status,created_at from public.school_tests order by created_at desc limit 8)t),'[]'::jsonb)
  ) into result;

  return result;
end;
$$;

revoke execute on function public.get_site_manager_dashboard() from public;
grant execute on function public.get_site_manager_dashboard() to authenticated;
revoke execute on function public.is_site_manager(uuid) from public;
grant execute on function public.is_site_manager(uuid) to authenticated;
revoke execute on function public.is_site_admin(uuid) from public;
grant execute on function public.is_site_admin(uuid) to authenticated;

-- Provision the first owner manually from a trusted/admin SQL context after creating the owner's Auth account:
-- update public.profiles set role='site_manager' where id='<OWNER_AUTH_USER_UUID>';

-- Ownership is separate from operational administration. A future ownership-transfer
-- workflow should explicitly change the owner role and write an audit record; it must
-- never delete student learning data.
