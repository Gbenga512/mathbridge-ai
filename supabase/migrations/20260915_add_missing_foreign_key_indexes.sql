-- MathBridge production performance hardening
-- Add indexes for foreign-key columns identified during Supabase performance review.
-- Existing composite/primary indexes are intentionally not duplicated.

create index if not exists idx_assessments_student_id on public.assessments(student_id);
create index if not exists idx_class_students_student_id on public.class_students(student_id);
create index if not exists idx_parent_children_child_id on public.parent_children(child_id);
create index if not exists idx_school_audit_log_actor_id on public.school_audit_log(actor_id);
create index if not exists idx_school_audit_log_school_id on public.school_audit_log(school_id);
create index if not exists idx_school_classes_school_id on public.school_classes(school_id);
create index if not exists idx_school_enrollments_class_id on public.school_enrollments(class_id);
create index if not exists idx_school_enrollments_student_id on public.school_enrollments(student_id);
create index if not exists idx_school_staff_user_id on public.school_staff(user_id);
create index if not exists idx_school_subscriptions_school_id on public.school_subscriptions(school_id);
create index if not exists idx_school_test_attempts_student_id on public.school_test_attempts(student_id);
create index if not exists idx_school_tests_class_id on public.school_tests(class_id);
create index if not exists idx_school_tests_created_by on public.school_tests(created_by);
create index if not exists idx_teacher_classes_teacher_id on public.teacher_classes(teacher_id);
create index if not exists idx_term_reports_student_id on public.term_reports(student_id);
