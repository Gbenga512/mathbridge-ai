-- RLS policy helper: clients need EXECUTE because PostgreSQL evaluates
-- policy expressions with the requesting role's privileges.
-- The helper is SECURITY DEFINER and only returns a boolean authorization
-- decision for the supplied test id; it does not expose protected rows.
revoke execute on function public.is_school_test_staff(uuid, uuid) from public, anon;
grant execute on function public.is_school_test_staff(uuid, uuid) to authenticated;
