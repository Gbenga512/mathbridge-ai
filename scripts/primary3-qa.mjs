import { primary3TermMap } from '../src/data/primary3TermMap.js';
import { PRIMARY3_LEARNING } from '../src/data/primary3LessonLearning.js';
import { primary3Questions } from '../src/data/primary3Math.js';
const topics=Object.values(primary3TermMap).flatMap(t=>t.topics);
const missingLessons=topics.filter(t=>!PRIMARY3_LEARNING[t]);
const missingQuestions=topics.filter(t=>!primary3Questions.some(q=>q.topic===t));
if(missingLessons.length||missingQuestions.length){console.error({missingLessons,missingQuestions});process.exit(1)}
console.log(`Primary 3 QA passed: ${topics.length} topics have lessons and questions.`);
