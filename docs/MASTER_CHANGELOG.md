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

## Earlier production foundations

- GitHub repository: `Gbenga512/mathbridge-ai`.
- Vercel deployment is connected to GitHub for automatic deployments.
- Production Supabase environment variables are configured through Vercel.
- Curriculum structures cover Primary 1–6, JSS 1–3, and SSS 1–3.
- Question-bank validation and locking mechanisms have been added to protect the production question-bank standard.
- School account, school classes, enrollments, subscriptions, school tests, test attempts, progress, assessments, and reporting foundations exist in the Supabase schema.

## Documentation policy

Every major completed stage should add an entry here and update the appropriate specialist manual. Do not wait until the end of the project to document important decisions.
