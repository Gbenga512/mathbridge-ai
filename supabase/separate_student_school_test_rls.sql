-- Production fix: student read paths must never invoke school-staff helpers.
-- Remove legacy mixed policies and keep student access based only on ownership.

drop policy if exists "school assignments read" on public.school_test_assignments;
drop policy if exists "school assignments staff delete" on public.school_test_assignments;
drop policy if exists "school assignments staff manage" on public.school_test_assignments;
drop policy if exists "school assignments staff update" on public.school_test_assignments;
drop policy if exists "school assignments student read" on public.school_test_assignments;

drop policy if exists "school attempts read" on public.school_test_attempts;
drop policy if exists "school attempts staff read" on public.school_test_attempts;
drop policy if exists "school attempts student read" on public.school_test_attempts;

drop policy if exists "school test items read" on public.school_test_items;
drop policy if exists "school test items staff manage" on public.school_test_items;
drop policy if exists "school test items assigned student read" on public.school_test_items;
drop policy if exists "school test items insert" on public.school_test_items;
drop policy if exists "school test items update" on public.school_test_items;
drop policy if exists "school test items delete" on public.school_test_items;

drop policy if exists "school tests read" on public.school_tests;
drop policy if exists "school tests staff manage" on public.school_tests;
drop policy if exists "school tests assigned student read" on public.school_tests;
drop policy if exists "school tests insert" on public.school_tests;
drop policy if exists "school tests update" on public.school_tests;
drop policy if exists "school tests delete" on public.school_tests;

create policy "student reads own test assignments" on public.school_test_assignments
  for select using ((select auth.uid()) = student_id);

create policy "student reads assigned published tests" on public.school_tests
  for select using (
    status = 'published'
    and exists (
      select 1 from public.school_test_assignments a
      where a.test_id = school_tests.id
        and a.student_id = (select auth.uid())
    )
  );

create policy "student reads assigned published items" on public.school_test_items
  for select using (
    exists (
      select 1
      from public.school_test_assignments a
      join public.school_tests t on t.id = a.test_id
      where a.test_id = school_test_items.test_id
        and a.student_id = (select auth.uid())
        and t.status = 'published'
    )
  );

create policy "student reads own attempts" on public.school_test_attempts
  for select using ((select auth.uid()) = student_id);

create policy "staff manages tests" on public.school_tests
  for all using ((select public.is_school_test_staff(id)))
  with check ((select public.is_school_test_staff(id)));

create policy "staff manages test items" on public.school_test_items
  for all using ((select public.is_school_test_staff(test_id)))
  with check ((select public.is_school_test_staff(test_id)));

create policy "staff manages assignments" on public.school_test_assignments
  for all using ((select public.is_school_test_staff(test_id)))
  with check ((select public.is_school_test_staff(test_id)));

create policy "staff reads attempts" on public.school_test_attempts
  for select using (
    exists (
      select 1 from public.school_test_assignments a
      where a.id = school_test_attempts.assignment_id
        and (select public.is_school_test_staff(a.test_id))
    )
  );
