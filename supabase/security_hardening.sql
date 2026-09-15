-- MathBridge production security hardening.
-- Applied to the live Supabase project on 2026-09-15.

-- Remove anonymous/public execution from privileged application functions.
revoke all on function public.active_school_seats(uuid) from anon, public;
revoke all on function public.enroll_student_in_school(uuid,uuid,uuid,timestamptz) from anon, public;
revoke all on function public.remove_student_from_school(uuid) from anon, public;
revoke all on function public.is_school_admin(uuid,uuid) from anon, public;
revoke all on function public.is_school_staff(uuid,uuid) from anon, public;
revoke all on function public.is_site_manager(uuid) from anon, public;
revoke all on function public.is_site_admin(uuid) from anon, public;
revoke all on function public.get_site_manager_dashboard() from anon, public;
revoke all on function public.handle_new_user() from anon, public;

-- Protected learning-history and Test Centre RPCs are authenticated-only.
revoke all on function public.get_seen_question_ids(text,text) from anon, public;
revoke all on function public.record_question_exposure(text,text,text,text,uuid) from anon, public;
revoke all on function public.record_question_answer(text,text,boolean) from anon, public;
revoke all on function public.start_school_test(uuid) from anon, public;
revoke all on function public.submit_school_test(uuid,jsonb) from anon, public;

grant execute on function public.get_seen_question_ids(text,text) to authenticated;
grant execute on function public.record_question_exposure(text,text,text,text,uuid) to authenticated;
grant execute on function public.record_question_answer(text,text,boolean) to authenticated;
grant execute on function public.start_school_test(uuid) to authenticated;
grant execute on function public.submit_school_test(uuid,jsonb) to authenticated;

-- The school relationship tables require explicit RLS policies.
create policy "parent children own" on public.parent_children for select to authenticated
  using ((select auth.uid())=parent_id or (select auth.uid())=child_id);
create policy "teacher classes own" on public.teacher_classes for all to authenticated
  using ((select auth.uid())=teacher_id) with check ((select auth.uid())=teacher_id);
create policy "class students teacher" on public.class_students for select to authenticated
  using (exists(select 1 from public.teacher_classes c where c.id=class_id and c.teacher_id=(select auth.uid())));
create policy "schools staff read" on public.schools for select to authenticated
  using ((select public.is_school_staff(id)));
create policy "school staff own school" on public.school_staff for select to authenticated
  using ((select public.is_school_staff(school_id)));
create policy "school classes staff" on public.school_classes for select to authenticated
  using ((select public.is_school_staff(school_id)));
create policy "school enrollments staff" on public.school_enrollments for select to authenticated
  using ((select public.is_school_staff(school_id)) or (select auth.uid())=student_id);
create policy "school subscriptions admin" on public.school_subscriptions for select to authenticated
  using ((select public.is_school_admin(school_id)));
create policy "school audit admin read" on public.school_audit_log for select to authenticated
  using ((select public.is_school_admin(school_id)));
create policy "school audit admin insert" on public.school_audit_log for insert to authenticated
  with check ((select public.is_school_admin(school_id)) and actor_id=(select auth.uid()));

-- Explicitly prevent anonymous table access.
revoke all on public.school_audit_log,public.school_subscriptions,public.school_staff,public.school_classes,public.school_enrollments,public.schools,public.teacher_classes,public.class_students,public.parent_children,public.student_question_history,public.school_test_answer_keys from anon;

-- Prevent future anonymous execution of newly created public functions.
alter default privileges in schema public revoke execute on functions from anon, public;
