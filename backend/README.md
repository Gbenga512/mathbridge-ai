# MathBridge backend plan

## Production services

MathBridge should use a managed authentication/database provider such as Supabase or Firebase before public launch.

Required tables/collections:

- `profiles`: user id, role, name, class, created_at
- `students`: student profile and curriculum level
- `parent_children`: parent_id, student_id, relationship
- `teacher_classes`: teacher_id, class_id
- `class_students`: class_id, student_id
- `progress`: student_id, term, week, topic, status, score, attempts, updated_at
- `assessments`: student_id, assessment_type, topic, score, answers, completed_at
- `term_reports`: student_id, term, average, weak_points, strengths, recommendations, created_at
- `rewards`: student_id, reward_type, status, earned_at

## Security rules

Students may read/write their own learning records. Parents may read only linked children's records. Teachers may read only students assigned to their classes. Administrative actions require a separate admin role. Never store passwords in the MathBridge database; use the authentication provider.

## MVP migration

The current frontend uses local browser storage. The `src/cloudProgress.js` adapter provides a single interface so the storage implementation can later be replaced by the authenticated cloud API without rewriting the learning engine.
