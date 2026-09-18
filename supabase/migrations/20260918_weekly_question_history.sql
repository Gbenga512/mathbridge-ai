-- Allow a separate persistent history bucket for weekly curriculum assessments.
alter table public.student_question_history
drop constraint if exists student_question_history_activity_type_check;
alter table public.student_question_history
add constraint student_question_history_activity_type_check
check(activity_type in ('diagnostic','practice','mastery','test','exam','weekly'));
