import { primary2TermMap } from '../src/data/primary2TermMap.js';
import { PRIMARY2_LEARNING } from '../src/data/primary2LessonLearning.js';
import { primary2Questions } from '../src/data/primary2Math.js';
const topics=Object.values(primary2TermMap).flatMap(t=>t.topics);
const missingLessons=topics.filter(t=>!PRIMARY2_LEARNING[t]);
const missingQuestions=topics.filter(t=>!primary2Questions.some(q=>q.topic===t));
if(missingLessons.length||missingQuestions.length){console.error({missingLessons,missingQuestions});process.exit(1)}
console.log(`Primary 2 QA passed: ${topics.length} topics have lessons and questions.`);
