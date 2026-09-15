# MathBridge Technical Manual

## 1. Architecture

MathBridge is a React web application deployed through Vercel and backed by Supabase for authentication and cloud persistence. GitHub is the source-control and documentation system.

The application currently contains curriculum data, question banks, progression logic, school services, school/test portals, student accounts, reporting, and cloud progress services.

## 2. Repository

Repository: `Gbenga512/mathbridge-ai`

Primary implementation areas include:

- `src/main.jsx` — main learning application and navigation
- `src/cloudProgress.js` — authentication and cloud progress bridge
- `src/questionHistory.js` — question-history client service
- `src/schoolService.js` — school operations
- `src/SchoolPortal.jsx` — school routing/dashboard
- `src/StudentTestCentre.jsx` — student test experience
- `src/SchoolTestCentre.jsx` — school test administration
- `src/siteManagerService.js` — platform-owner dashboard service
- `src/SiteManagerPortal.jsx` — platform-owner dashboard
- `src/authRoles.js` — UI role constants/labels
- `src/data/curriculum.js` — curriculum definitions
- `src/data/questionBank.js` — question-bank access
- `supabase/schema.sql` — core database schema
- `supabase/platform_owner.sql` — platform-owner migration
- `supabase/secure_school_tests.sql` — secure school-test migration
- `supabase/student_question_history.sql` — persistent question-history migration

## 3. Authentication and Authorization

Supabase Auth provides authenticated student sessions. The database is the authority for authorization; client-side role values are not sufficient for security.

The current role model includes:

- student
- parent
- teacher
- school_admin
- site_admin
- site_manager

The platform-owner migration expands the database role constraint and provides protected owner functions.

## 4. Data Ownership

Student progress and learning history are student-owned. School enrollment is a separate relationship. Removing a student from a school must not delete the student's learning records.

## 5. Question History

`supabase/student_question_history.sql` provides persistent per-student question exposure records. It supports activity types for diagnostic, practice, mastery, test, and exam activities.

`src/questionHistory.js` provides a client bridge with local fallback. The intended production flow is:

1. Authenticate the student.
2. Retrieve previously exposed question IDs from Supabase.
3. Exclude those IDs from candidate question pools.
4. Record each newly exposed question.
5. Record the answer outcome.
6. Keep local fallback only for degraded/offline operation.

The migration must be executed in the live Supabase project before cloud question history is available.

## 6. Progress Persistence

`src/cloudProgress.js` reads and writes the student's `progress` record when Supabase is configured. The current implementation retains local fallback behavior. Production hardening should distinguish a deliberate offline mode from an unexpected cloud write failure rather than silently treating every failure as normal local operation.

## 7. School Data Model

The core schema contains schools, school staff, school classes, school enrollments, subscriptions, school tests, test items, assignments, attempts, and audit logs.

A school subscription controls available seats. Enrollment is intended to be performed by an authorized school administrator.

## 8. Platform Owner

The platform owner is represented by the `site_manager` role. Owner access is not intended to be available through public registration.

The `get_site_manager_dashboard()` database function is protected by the `is_site_manager()` check.

Before using the owner dashboard in production, execute `supabase/platform_owner.sql` and manually provision the first trusted owner account.

## 9. Secure Test Architecture

School tests require special care because answer keys must not be exposed to students through ordinary client-readable records. `supabase/secure_school_tests.sql` creates `school_test_answer_keys` with no student-readable policy, restricts students to assigned/published tests and question snapshots, and replaces broad student write access to assignments/attempts with read-only access.

`start_school_test` validates the authenticated student assignment and test availability, records the start state, and creates the attempt server-side. `submit_school_test` reads the protected answer key, calculates the objective score, writes the attempt, and closes the assignment server-side. Students never receive the answer key through the test-item API.

The secure-test migration is repository-ready but must be executed and verified in the live Supabase project before secure-test behavior can be considered production-complete.

## 10. Deployment

The application is connected to Vercel through GitHub. Production Supabase configuration is supplied through Vercel environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Environment-variable changes require a new deployment.

## 11. Production Verification Rule

A repository change is not considered production-complete merely because it has been committed. The feature must be integrated, deployed, tested on the actual application, and checked for regressions.

Database migrations are not considered live until they have been executed successfully in the production Supabase project.

## 12. Android Roadmap

The long-term distribution target is a signed Android application bundle for Google Play Store distribution. The web and Android clients should use the same Supabase backend and account/data model.

Before Play Store release, the application must pass functional, security, responsive/mobile, authentication, persistence, performance, and release-build testing.

---

**Last updated:** 2026-09-15
