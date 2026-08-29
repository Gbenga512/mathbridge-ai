import { primary4TermMap } from '../src/data/primary4TermMap.js';
import { PRIMARY4_LEARNING } from '../src/data/primary4LessonLearning.js';
import { primary4Questions } from '../src/data/primary4Math.js';
const topics=Object.values(primary4TermMap).flatMap(t=>t.topics);
const unique=[...new Set(topics)];
const missingLessons=unique.filter(t=>!PRIMARY4_LEARNING[t]);
const missingQuestions=unique.filter(t=>!primary4Questions.some(q=>q.topic===t));
const badQuestions=primary4Questions.filter(q=>!unique.includes(q.topic)||!Array.isArray(q.options)||q.options.length!==4||typeof q.answer!=='number'||q.answer<0||q.answer>3);
if(missingLessons.length||missingQuestions.length||badQuestions.length){console.error({missingLessons,missingQuestions,badQuestions:badQuestions.map(q=>q.id)});process.exit(1)}
console.log(`Primary 4 QA passed: ${unique.length} topics, ${primary4Questions.length} questions.`);
