# MathBridge Master Changelog

This is the running record of major MathBridge product, architecture, security, curriculum, deployment, and documentation decisions.

## 2026-09-15 — Question engine production expansion

- Reworked `src/data/questionFactory.js` from a small set of repetitive templates into multiple curriculum-family generators.
- Added dedicated generation families for sets, fractions, statistics, geometry, algebra, indices, sequences, functions, matrices, counting, vectors, trigonometry, calculus, financial mathematics, and general number skills.
- Added multiple question forms per family, deterministic parameter variation, progressive difficulty labels, explicit learning objectives, explanations, and four distinct answer options.
- Preserved the rule that WAEC/NECO/JAMB banks contain original examination-style questions and are not presented as official past questions.
- Kept the production baseline at 2,000 questions per school class and 2,000 per examination-style bank.
- Strengthened `scripts/verify-question-banks.mjs` to validate minimum counts, duplicate IDs/text, four unique options, valid answer indexes, class tags, terms, difficulty, explanations, objectives, and exam metadata.

## 2026-09-15 — CI/CD workflow hardening

- Replaced the self-modifying class-routing GitHub Actions workflow with read-only regression QA.
- Replaced the self-modifying curriculum-wording workflow with read-only build QA.
- Production CI now verifies the application rather than editing source files automatically during a build.
- This prevents automated commits from racing with development changes and reduces the risk of repeated workflow-generated failure emails.

## 2026-09-15 — Student class selection and persistence

- Corrected the student onboarding flow so class is no longer silently fixed to JSS 1 during account creation.
- Added a required class selector covering Primary 1–6, JSS 1–3, and SSS 1–3.
- The selected class is stored in the student's Supabase profile as `class_level` through the secure `set_student_class` RPC after authentication.
- The authenticated application reads the protected profile class and uses it as the learner's active curriculum level.
- The selected class is also cached locally for a consistent reload experience.
- The student dashboard displays the actual selected class instead of hardcoded JSS 1.

## 2026-09-15 — Role-aware authentication portal routing

- Extended authentication to resolve the protected role from `profiles` after sign-in.
- Student accounts continue into the personal learning dashboard.
- Platform and school roles are no longer silently treated as student learning accounts.
- Authenticated non-student roles are routed into the authorized `SchoolPortal`.

## 2026-09-15 — Mastery continuation regression fix

- Corrected next-topic calculation so a successfully mastered topic cannot be selected again as the continuation target.
- Added persistence-aware protection around the mastered-topic set.
- Production commit: `2001152013bae93ca7effcd26b8d74adefc681f1`.

## 2026-09-15 — Production RLS and database performance hardening

- Applied a live Supabase migration to optimize affected RLS policies and add production foreign-key indexes.
- Previous 15 Auth RLS initialization-plan warnings were cleared.
- Internal SECURITY DEFINER helper execution remains restricted.

## 2026-09-15 — School Test Centre RLS recursion fix

- Reproduced and corrected the production `infinite recursion detected in policy for relation school_tests` failure.
- Added a non-recursive security-definer staff authorization helper and qualified student policy references.
- The secure-test migration is applied to the live Supabase project.

## 2026-09-15 — Production email confirmation redirect

- Updated student signup to request the production MathBridge redirect URL instead of localhost.
- Supabase Auth URL configuration was updated for production use.

## 2026-09-15 — Persistent question-history foundation

- Added persistent per-student question exposure history and protected RPCs.
- Diagnostic selection prefers unseen questions and records authenticated student exposure.
- Full persistent no-repeat behavior remains a QA checkpoint until real student activity is exercised across visible learning flows.

## 2026-09-15 — Learning engine foundation

- Added activity-scoped history and shared learning-session orchestration for diagnostic, practice, mastery, test, and exam activity.
- Practice/mastery/test/exam integration remains a validation checkpoint until exercised with a real student account.

## 2026-09-15 — Documentation foundation

- Established living Product, Technical, Deployment, and Master Changelog documentation.
- MathBridge is the actual production product under active development, not a prototype.
- Long-term Android distribution through Google Play Store remains the target.


## 2026-09-18 — Week-by-week term progression and final-exam gate

- Added termExamResults to persistent student progress.
- A new student starts at First Term (T1) Week 1.
- Students now complete instructional weeks sequentially; passing a weekly assessment at 80% or above unlocks the next week.
- Completing the final instructional week no longer advances the student automatically into the next term.
- A dedicated Term Final Exam is unlocked only after all instructional weeks in the current term are completed.
- Passing the Term Final Exam at 80% or above advances the student to the next term at Week 1.
- A failed final exam keeps the student in the current term and allows a fresh attempt.
- The progression state is persisted in Supabase and local fallback storage.
- Added src/WeeklyAssessment.jsx for fresh weekly tests and term final exams.

## 2026-09-18 — Question-repeat reduction by curriculum stage

- Added a dedicated weekly question-history activity type.
- Weekly assessments select questions from the current week's curriculum topics instead of drawing blindly from the entire class bank.
- Previously exposed weekly questions are excluded using persistent per-student history.
- Term final exams select across the current term's curriculum topics and use a separate persistent exam history bucket.
- The existing production bank remains at the 2,000-question-per-class baseline, with generated variation and unseen-question selection providing substantially more session variety.
- This addresses the observed problem where students were repeatedly seeing the same questions within the same term.

## 2026-09-18 — Production deployment verification

- Fixed a duplicate curriculumCompleted export introduced during progression-gate implementation.
- Vercel production deployment dpl_Hzmy5jDx7tXKbKXNQSHasNcGhpfL is READY.
- Production deployment commit: 5c52ca488f43a6e36bb10bbc9369c5a171aa5cc5.
- Supabase migrations for term-exam progress and weekly question history are applied to the live project.
