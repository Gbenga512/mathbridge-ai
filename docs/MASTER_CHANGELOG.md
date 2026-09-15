# MathBridge Master Changelog

This is the running record of major MathBridge product, architecture, security, curriculum, deployment, and documentation decisions.

## 2026-09-15 — Student class selection and persistence

- Corrected the student onboarding flow so class is no longer silently fixed to JSS 1 during account creation.
- Added a required class selector covering Primary 1–6, JSS 1–3, and SSS 1–3.
- The selected class is stored in the student's Supabase profile as `class_level` during signup.
- The authenticated application now reads the protected profile class and uses it as the learner's active curriculum level.
- The selected class is also cached locally for a consistent reload experience.
- The student dashboard now displays the actual selected class instead of hardcoded JSS 1.

## 2026-09-15 — Role-aware authentication portal routing

- Extended the authentication flow to resolve the authenticated user's protected role from `profiles` after sign-in.
- Student accounts continue into the personal learning dashboard.
- Platform and school roles are no longer silently treated as student learning accounts after authentication.
- Authenticated non-student roles are routed into the existing authorized `SchoolPortal`.

## 2026-09-15 — Mastery continuation regression fix

- Corrected next-topic calculation so a successfully mastered topic cannot be selected again as the continuation target.
- Added persistence-aware protection around the mastered-topic set.
- Production commit: `2001152013bae93ca7effcd26b8d74adefc681f1`.

## 2026-09-15 — Production RLS and database performance hardening

- Applied a live Supabase migration to optimize affected RLS policies and add production foreign-key indexes.
- Previous 15 Auth RLS initialization-plan warnings were cleared.
- Remaining unused-index notices are informational and retained until real traffic establishes their usefulness.
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
- Full persistent no-repeat behavior remains a QA checkpoint until real student activity is exercised across the visible learning flows.

## 2026-09-15 — Learning engine foundation

- Added activity-scoped history and shared learning-session orchestration for diagnostic, practice, mastery, test, and exam activity.
- Practice/mastery/test/exam integration remains a validation checkpoint until exercised with a real student account.

## 2026-09-15 — Documentation foundation

- Established living Product, Technical, Deployment, and Master Changelog documentation.
- MathBridge is the actual production product under active development, not a prototype.
- Long-term Android distribution through Google Play Store remains the target.
