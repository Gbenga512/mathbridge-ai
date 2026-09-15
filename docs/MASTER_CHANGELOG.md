# MathBridge Master Changelog

This is the running record of major MathBridge product, architecture, security, curriculum, deployment, and documentation decisions.

## 2026-09-15 — Production RLS and database performance hardening

- Applied a live Supabase migration to optimize the affected RLS policies by wrapping `auth.uid()`/authentication evaluation in a scalar `SELECT`, preventing repeated per-row initialization at scale.
- Hardened the affected policies for progress, assessments, term reports, question history, parent/child relationships, teacher classes, class students, school enrollments, school audit logs, profiles, and the student-facing School Test Centre.
- Added dedicated foreign-key indexes for production query paths identified by the Supabase performance advisor.
- Re-ran the Supabase performance advisor after the migration: the previous **15 Auth RLS initialization-plan warnings are cleared**.
- The remaining unused-index notices are informational and are being retained until real production traffic establishes whether each index is useful.
- Reworked the `enroll_student_in_school` security-definer function so its authorization check uses the submitted school identifier directly. This removes an unsafe dependency on an unrelated test-row lookup and keeps school enrollment authorization deterministic.
- Re-ran the Supabase security advisor. The signed-in SECURITY DEFINER warning count is now **8**, representing intentionally client-callable application RPCs. Internal helper execution remains restricted.

## 2026-09-15 — School Test Centre RLS recursion fix

- Reproduced the student **My Tests** failure visible in production: `infinite recursion detected in policy for relation "school_tests"`.
- Root cause was circular RLS evaluation: the student assignment policy on `school_test_assignments` could evaluate the `school_tests` staff policy, which in turn evaluates school-staff membership, while the student test-read policy was also traversing assignments.
- Added the security-definer helper `is_school_test_staff(test_id, user_id)` for staff authorization without recursively evaluating the `school_tests` RLS policy.
- Explicitly qualified outer table references in student test and test-item policies.
- Replaced the assignment staff policy and attempt staff-read policy with the non-recursive helper path.
- Applied the migration to the live MathBridge Supabase project successfully.
- This fixes the database-policy error shown on the production **My Tests** screen without exposing answer keys to students.

## 2026-09-15 — Production email confirmation redirect

- Identified the student signup confirmation failure: Supabase was redirecting confirmed users to `http://localhost:3000`, which is only reachable from the development machine.
- Updated `src/cloudProgress.js` so student signup explicitly requests the production MathBridge redirect URL: `https://mathbridge-ai-eight.vercel.app/`.
- This prevents email confirmation links generated from the local development environment from sending phone users to the local laptop server.
- The Supabase Auth Redirect URL allow-list must include the production URL for the explicit redirect to be accepted.
- The existing localhost URL may remain configured for local development.

## 2026-09-15 — Role-aware profile lookup foundation

- Added `getUserProfile(userId)` to `src/cloudProgress.js` so the application can resolve the protected platform role from the live `profiles` table after authentication.
- This is the foundation for strict role-aware portal routing and prevents platform-owner accounts from being treated as ordinary student accounts as the production navigation is hardened.
- Public signup continues to create only student accounts; platform roles remain controlled server-side.

## 2026-09-15 — Student progress dashboard UI refresh

- Redesigned the student progress dashboard for a production education-product experience on desktop and mobile.
- Improved visual hierarchy for current term/week, mastered topics, learning journey, School Test Centre, WAEC/NECO Performance Centre, and Continue Learning.
- Preserved the existing progression and mastery logic while improving presentation.
- Production deployment was created from commit `c6db2516d822c40b6f0e5ec06ecdbf7dce0e4db3`.

## 2026-09-15 — Documentation foundation

- Established GitHub-based living documentation for MathBridge.
- Created the Product Manual as the primary product/business reference.
- Confirmed that MathBridge is the actual production product under active development, not a prototype.
- Confirmed long-term Android distribution goal through Google Play Store.
- Confirmed that documentation will be updated incrementally as features are completed.
- Established the principle that student learning data must survive school changes and ownership changes.
- Recorded the platform role hierarchy and school/personal learning model.
- Recorded the production question-bank standard and School Test Centre requirements.

## 2026-09-15 — Platform ownership foundation

- Added Site Manager / Platform Owner and Site Administrator concepts to the application role model.
- Added `supabase/platform_owner.sql` as the platform-owner database migration.
- Added Site Manager dashboard service and portal.
- Integrated Site Manager routing through the School Portal entry point.
- Owner role provisioning is intended to be controlled and not exposed through public signup.
- The platform-owner SQL migration has now been executed in the live MathBridge Supabase project.

## 2026-09-15 — Persistent question-history foundation

- Added `supabase/student_question_history.sql` to provide persistent per-student question exposure history.
- Added protected database functions for recording question exposure, recording answer outcomes, and retrieving seen question IDs.
- Updated `src/questionHistory.js` with a Supabase-backed implementation while retaining local fallback behavior.
- The live MathBridge Supabase project now contains the persistent question-history table and canonical RPC contract.
- Full no-repeat behavior is not yet marked complete until practice/mastery/test/exam selection flows are integrated and tested across devices.

## 2026-09-15 — Persistent diagnostic selection integration

- Added `src/questionSelection.js` as the production question-selection layer.
- Diagnostic selection now prefers questions the student has not previously seen while preserving topic diversity.
- Integrated diagnostic selection into the main learning flow.
- Diagnostic question exposure is recorded for authenticated students through the Supabase question-history RPC and locally for anonymous/degraded sessions.
- Added `scripts/question-selection-qa.mjs` and wired it into the CI verification path.

## 2026-09-15 — Learning engine foundation

- Corrected `src/questionHistory.js` to use the current production RPC contract: `p_level`, `p_topic`, `p_activity_type`, `p_session_id`, and `record_question_answer`.
- Added activity-scoped local question history so diagnostic, practice, mastery, test, and exam activity histories can be kept distinct.
- Added `src/learningQuestionEngine.js` as the shared learning-session orchestration layer.
- Defined canonical activity types: `diagnostic`, `practice`, `mastery`, `test`, and `exam`.
- Added shared operations for loading cloud history, selecting fresh activity questions, recording presented questions, and recording outcomes.
- Strengthened question-selection QA to verify exclusion of seen IDs, uniqueness, topic diversity, and safe fallback behavior.
- Practice/mastery/test/exam integration into the visible main learning flow remains the next integration checkpoint; this foundation is not being represented as complete until that integration is tested.

## 2026-09-15 — Secure School Test Centre foundation

- Added `supabase/secure_school_tests.sql` as the production security migration for the School Test Centre.
- Added a protected `school_test_answer_keys` table so answer keys are not part of student-readable test records.
- Added security-definer `start_school_test` and `submit_school_test` RPCs so test start state and objective marking are performed server-side.
- Replaced broad student write access to test assignments/attempts with student read-only access; school staff retain administrative management access.
- Added student policies for reading only published tests they are assigned to and their question snapshots.
- The secure-test migration has been executed in the live MathBridge Supabase project.

## 2026-09-15 — Live Supabase security hardening

- Added explicit RLS policies for parent/teacher relationships and school operational tables.
- Removed anonymous execute access from privileged school, platform-owner, question-history, and test RPCs.
- Added a database trigger preventing ordinary authenticated users from changing their own protected platform role.
- Added protected school audit-log access for authorized school administrators.
- Supabase Security Advisor no longer reports the previous RLS-enabled/no-policy findings.
- Remaining Security Advisor warnings are intentional signed-in access to SECURITY DEFINER RPCs plus the separate Auth leaked-password-protection setting.

## 2026-09-15 — Live RPC permission hardening

- Reviewed live `SECURITY DEFINER` functions and distinguished internal helper functions from intentionally client-callable application RPCs.
- Revoked `EXECUTE` from authenticated/anonymous roles for internal helpers including role checks, seat calculations, and the user-creation trigger.
- Preserved authenticated execution only for application RPCs that the frontend intentionally invokes for question history, school enrollment/removal, Site Manager dashboard access, and secure test start/submission.
- Rechecked RLS after the change; protected application tables continue to have RLS policies.
- Supabase Security Advisor reduced the signed-in `SECURITY DEFINER` warning set from 14 functions to 8 intentionally callable application RPCs.

## 2026-09-15 — Platform owner live provisioning

- Verified the live MathBridge `profiles` table and identified the existing owner account.
- Provisioned that account as `site_manager` directly in the live database rather than exposing owner-role selection through signup.
- Verified the live profile now carries the protected `site_manager` role.
- Updated the protected role-change trigger so ordinary authenticated users cannot alter protected roles while trusted database administration can provision the owner role.
- A direct SQL call to the Site Manager dashboard RPC without an authenticated user context correctly failed with `Platform owner access required`; this confirms the RPC is enforcing its caller check rather than exposing dashboard data to unauthenticated database calls.

## 2026-09-15 — Secure test submission hardening

- Identified and corrected a PL/pgSQL variable/column naming collision in the live `submit_school_test` function that could make score persistence ambiguous.
- Renamed scoring variables and explicitly qualified the attempt update target.
- Added server-side enforcement of `duration_minutes` using the persisted test start time.
- The browser can no longer extend a timed school test by manipulating its local timer.
- Updated `supabase/secure_school_tests.sql` and added `supabase/security_hardening.sql` to keep repository documentation aligned with the production security model.

## 2026-09-15 — CI failure diagnosis and repair

- Investigated the repeated **Primary and JSS Curriculum QA** failures shown in GitHub Actions.
- The original failure was not caused by curriculum code or the question-history code.
- The workflow failed at `actions/setup-node@v4` because `cache: npm` requires a dependency lock file, while the repository did not contain `package-lock.json`, `npm-shrinkwrap.json`, or `yarn.lock`.
- Consequently `npm ci` and all curriculum QA/build steps were skipped.
- Updated `.github/workflows/primary1-qa.yml` to remove lockfile-dependent npm caching and use `npm install` so the existing repository can run its QA suite.
- The Node runtime was subsequently aligned with the current dependency requirements.
- The latest full Primary/JSS QA run passed, including question-selection QA and the production build.

## Earlier production foundations

- GitHub repository: `mathbridge-ai`.
- Vercel deployment is connected to GitHub for automatic deployments.
- Production Supabase environment variables are configured through Vercel.
- Curriculum structures cover Primary 1–6, JSS 1–3, and SSS 1–3.
- Question-bank validation and locking mechanisms have been added to protect the production question-bank standard.
- School account, school classes, enrollments, subscriptions, school tests, test attempts, progress, assessments, and reporting foundations exist in the Supabase schema.

## Documentation policy

Every major completed stage should add an entry here and update the appropriate specialist manual. Do not wait until the end of the project to document important decisions.
