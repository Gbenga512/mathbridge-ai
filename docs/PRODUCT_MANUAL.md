# MathBridge Product Manual

**Product:** MathBridge
**Status:** Production product under active development
**Repository:** `Gbenga512/mathbridge-ai`

## 1. Purpose

MathBridge is a mathematics learning platform designed to provide curriculum-aligned learning, assessment, personalized progression, mastery tracking, school administration, parent visibility, and examination preparation.

MathBridge is being built as the actual product, not as a prototype.

## 2. Product Vision

The core learning journey is:

**Curriculum → Diagnostic → Personalized Learning Path → Practice → Mastery → Rewards → Reporting**

The long-term distribution goal is a downloadable Android application on the Google Play Store, backed by the same production cloud account and learning data used by the web application.

## 3. Supported Learning Contexts

MathBridge supports both:

- Independent personal learning
- School-sponsored learning

A student account belongs to the student. A school provides access, enrollment, seats, classes, teachers, and school-level services; it does not own or delete the student's personal learning history.

If a student leaves a school, the school may remove the active enrollment/seat, but the student's account, progress, mastery, assessment history, and achievements remain preserved.

A student may later continue personally or enroll in another school using the same account and learning history.

## 4. School Structure

A MathBridge school account represents one institution and may contain any combination of:

- Primary 1–6
- JSS 1–3
- SSS 1–3

Teachers are assigned only to appropriate classes/students. Curriculum content is level-specific so students should not receive inappropriate class-level material through normal curriculum progression.

## 5. Platform Roles

The current role model is:

1. **Site Manager / Platform Owner** — highest platform role; owns and governs the MathBridge platform operationally.
2. **Site Administrator** — platform operations role beneath the owner.
3. **School Administrator** — manages an individual school account.
4. **Teacher** — manages authorized classes and students.
5. **Parent** — views and supports linked children's learning.
6. **Student** — owns their learning account and learning journey.

The assistant/development team is not a MathBridge user account.

There is no public signup path for Site Manager or Site Administrator roles. Owner provisioning is intended to be controlled and secure.

## 6. Ownership Principle

Platform account ownership and source-code/IP ownership are separate concepts.

MathBridge is designed so operational platform ownership can eventually be transferred without rebuilding the product or deleting student learning data. A future ownership-transfer workflow should require strong authentication, verification of the new owner, explicit confirmation, an audit record, and preservation of student data.

Any legal sale or IP transfer should be documented separately through appropriate legal agreements.

## 7. Question Bank Standard

The production target is 1,000 curriculum questions for each of:

- Primary 1–6
- JSS 1–3
- SSS 1–3

There are also targets of 1,000 original exam-style questions for each of:

- WAEC
- NECO
- JAMB

Question records should include appropriate metadata such as ID, question text, options, answer, topic, difficulty, explanation, objective, class level, and source type.

Generated exam-style questions are original algorithmic content and must not be represented as genuine official past-paper questions.

Question banks require duplicate detection, structural validation, and pedagogical QA before being treated as fully production-vetted content.

## 8. School Test Centre

The School Test Centre is designed to allow schools to create and administer timed tests from approved question content.

A test can include title, class, subject, term, topics, question count, duration, start/closing times, pass mark, instructions, and randomization settings.

Students complete assigned tests and receive automatically marked objective results. School results should show student name, class, test name, date, score, percentage, grade, and pass/fail status.

Schools should be able to download result data in spreadsheet/CSV and PDF-friendly formats.

## 9. Production Principles

A feature is considered complete only when it is built, integrated, tested, and protected against regression.

Production work must prioritize:

- Real authentication and cloud persistence
- Secure authorization and database RLS
- Persistent learning history
- Responsive web behavior
- Reliable error/offline handling
- Question quality and non-repeat behavior
- Role-based access control
- Auditability
- Testing and deployment verification

## 10. Documentation Rule

This manual is a living document. Major product decisions and completed features must be documented in GitHub as development continues.

Technical implementation details belong in the Technical Manual and related specialist manuals.

---

**Last updated:** 2026-09-15
