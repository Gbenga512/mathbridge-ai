-- MathBridge term-final-exam progression gate.
-- A student may complete every instructional week but cannot enter the next
-- term until the current term final exam is passed.
alter table public.progress add column if not exists term_exam_results jsonb not null default '{}'::jsonb;
