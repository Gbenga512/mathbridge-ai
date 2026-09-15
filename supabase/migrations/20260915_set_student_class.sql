-- MathBridge production: secure post-signup class selection.
-- Students set their current class after authentication. The RPC prevents
-- clients from changing another user's profile and preserves non-student roles.

create or replace function public.set_student_class(p_class_level text)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  v_profile public.profiles;
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if p_class_level not in (
    'P1','P2','P3','P4','P5','P6',
    'JSS1','JSS2','JSS3',
    'SSS1','SSS2','SSS3'
  ) then
    raise exception 'Invalid class level';
  end if;

  update public.profiles
     set class_level = p_class_level
   where id = auth.uid()
     and role = 'student'
   returning * into v_profile;

  if not found then
    raise exception 'Only a student account can set its class';
  end if;

  return v_profile;
end;
$$;

revoke all on function public.set_student_class(text) from public;
grant execute on function public.set_student_class(text) to authenticated;
