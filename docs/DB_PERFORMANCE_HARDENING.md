# MathBridge Database Performance Hardening

## 2026-09-15

The production Supabase database was reviewed for foreign-key index coverage. Fifteen dedicated indexes were added for foreign-key columns that were not already covered by an appropriate primary or composite index.

The migration was applied to the live MathBridge project and the resulting indexes were verified in `pg_indexes`.

The hardening covers:

- `assessments.student_id`
- `class_students.student_id`
- `parent_children.child_id`
- `school_audit_log.actor_id`
- `school_audit_log.school_id`
- `school_classes.school_id`
- `school_enrollments.class_id`
- `school_enrollments.student_id`
- `school_staff.user_id`
- `school_subscriptions.school_id`
- `school_test_attempts.student_id`
- `school_tests.class_id`
- `school_tests.created_by`
- `teacher_classes.teacher_id`
- `term_reports.student_id`

Existing indexes were not duplicated where a primary key or composite index already provided suitable left-prefix coverage.

## Remaining performance work

Supabase also reported RLS init-plan and multiple-permissive-policy findings. Those require policy-by-policy review because changing them without testing could break legitimate student, school, teacher, or test-centre access. They remain a separate hardening stage.
