# MathBridge Master Changelog

This is the running record of major MathBridge product, architecture, security, curriculum, deployment, and documentation decisions.

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
- The platform-owner SQL migration still needs to be executed in the live Supabase SQL Editor before the owner role is operational in production.

## 2026-09-15 — Persistent question-history foundation

- Added `supabase/student_question_history.sql` to provide persistent per-student question exposure history.
- Added protected database functions for recording question exposure, recording answer outcomes, and retrieving seen question IDs.
- Updated `src/questionHistory.js` with a Supabase-backed implementation while retaining local fallback behavior.
- The migration is repository-ready but must be executed in the live Supabase project before cloud history becomes active.
- Full no-repeat behavior is not yet marked complete until the main diagnostic/practice/mastery selection flow is integrated with the service and tested across devices.

## 2026-09-15 — Persistent diagnostic selection integration

- Added `src/questionSelection.js` as the production question-selection layer.
- Diagnostic selection now prefers questions the student has not previously seen while preserving topic diversity.
- Integrated diagnostic selection into the main learning flow.
- Diagnostic question exposure is recorded for authenticated students through the Supabase question-history RPC and locally for anonymous/degraded sessions.
- Added `scripts/question-selection-qa.mjs` and wired it into the CI verification path.
- The persistent cloud migration still must be executed in live Supabase before cross-device history can be considered fully operational.

## 2026-09-15 — Secure School Test Centre foundation

- Added `supabase/secure_school_tests.sql` as the production security migration for the School Test Centre.
- Added a protected `school_test_answer_keys` table so answer keys are not part of student-readable test records.
- Added security-definer `start_school_test` and `submit_school_test` RPCs so test start state and objective marking are performed server-side.
- Replaced broad student write access to test assignments/attempts with student read-only access; school staff retain administrative management access.
- Added student policies for reading only published tests they are assigned to and their question snapshots.
- The secure-test migration has now been executed in the live MathBridge Supabase project and verified by schema inspection.

## 2026-09-15 — Live Supabase security hardening

- Added explicit RLS policies for parent/teacher relationships and school operational tables.
- Removed anonymous execute access from privileged school, platform-owner, and question-history RPCs.
- Verified through PostgreSQL privilege inspection that the protected RPCs are not executable by `anon` and are available only to authenticated application flows.
- Added a database trigger preventing ordinary authenticated users from changing their own platform role, closing the self-promotion path to `site_manager`.
- Added protected school audit-log access for authorized school administrators.
- Supabase Security Advisor no longer reports the previous RLS-enabled/no-policy findings.
- Remaining Security Advisor warnings are intentional signed-in access to SECURITY DEFINER RPCs plus the separate Auth leaked-password-protection setting.

## 2026-09-15 — CI failure diagnosis and repair

- Investigated the repeated **Primary and JSS Curriculum QA** failures shown in GitHub Actions.
- The original failure was not caused by curriculum code or the question-history code.
- The workflow failed at `actions/setup-node@v4` because `cache: npm` requires a dependency lock file, while the repository did not contain `package-lock.json`, `npm-shrinkwrap.json`, or `yarn.lock`.
- Consequently `npm ci` and all curriculum QA/build steps were skipped.
- Updated `.github/workflows/primary1-qa.yml` to remove lockfile-dependent npm caching and use `npm install` so the existing repository can run its QA suite.
- The Node runtime was subsequently aligned with the current dependency requirements.
- The latest full Primary/JSS QA run passed, including question-selection QA and the production build.

## Earlier production foundations

- GitHub repository: `Gbenga512/mathbridge-ai`.
- Vercel deployment is connected to GitHub for automatic deployments.
- Production Supabase environment variables are configured through Vercel.
- Curriculum structures cover Primary 1–6, JSS 1–3, and SSS 1–3.
- Question-bank validation and locking mechanisms have been added to protect the production question-bank standard.
- School account, school classes, enrollments, subscriptions, school tests, test attempts, progress, assessments, and reporting foundations exist in the Supabase schema.

## Documentation policy

Every major completed stage should add an entry here and update the appropriate specialist manual. Do not wait until the end of the project to document important decisions.
