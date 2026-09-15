# MathBridge Deployment Manual

## 1. Source Control

Repository: `Gbenga512/mathbridge-ai`

The GitHub `main` branch is the production deployment source.

## 2. Web Deployment

MathBridge is connected to Vercel for automatic deployment from GitHub.

A successful push to `main` can trigger a new Vercel deployment. Production environment variables include:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Never place Supabase service-role secrets or other private credentials in Vite client environment variables.

## 3. Continuous Integration

The Primary and JSS Curriculum QA workflow is:

1. Checkout repository.
2. Install Node.js.
3. Install npm dependencies.
4. Run Primary 1–6 QA scripts.
5. Run JSS1–JSS3 QA and integration checks.
6. Run the production build.

The workflow currently uses `npm install` because the repository does not yet contain a committed npm lock file. A future hardening step should add and commit a reviewed `package-lock.json`, then return CI to `npm ci` with npm caching enabled for deterministic builds.

## 4. Diagnosing Failed Actions

If the QA email reports a failed workflow:

1. Open the failed GitHub Actions run.
2. Open the failed job.
3. Identify the first failed step; later steps may be skipped as a consequence.
4. Read the job log before changing application code.
5. Fix the root cause.
6. Push the correction and confirm the next run.

On 2026-09-15 the repeated failures were caused by missing dependency lock files, not by the curriculum QA scripts.

## 5. Supabase Migrations

Repository SQL migrations are not automatically considered live.

The following must be executed and verified in the intended Supabase project before their features are considered production-complete:

- `supabase/platform_owner.sql`
- `supabase/secure_school_tests.sql`
- `supabase/student_question_history.sql`

After executing a migration, verify its tables, functions, RLS policies and application behavior.

## 6. Release Verification

Before treating a release as production-ready, verify:

- GitHub Actions pass
- Vercel build/deployment succeeds
- Authentication works
- Cloud progress persists
- Question history persists
- School roles remain restricted
- Test Centre permissions are correct
- Responsive behavior works on laptop and mobile
- No critical console/runtime errors occur

## 7. Android Release Roadmap

The eventual Android release should use the same Supabase backend and account/data model as the web product.

The release path is expected to include Android packaging, signed `.aab` generation, internal testing, closed testing, production release preparation, and Google Play Store submission.

---

**Last updated:** 2026-09-15
