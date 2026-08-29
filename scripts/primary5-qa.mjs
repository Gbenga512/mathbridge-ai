import { primary5TermMap } from '../src/data/primary5TermMap.js';
import { PRIMARY5_LEARNING } from '../src/data/primary5LessonLearning.js';
import { primary5Questions } from '../src/data/primary5Math.js';
const topics=Object.values(primary5TermMap).flatMap(t=>t.topics);
const unique=[...new Set(topics)];
const missingLessons=unique.filter(t=>!PRIMARY5_LEARNING[t]);
const missingQuestions=unique.filter(t=>!primary5Questions.some(q=>q.topic===t));
const badQuestions=primary5Questions.filter(q=>!unique.includes(q.topic)||!Array.isArray(q.options)||q.options.length!==4||typeof q.answer!=='number'||q.answer<0||q.answer>3||!q.q);
if(missingLessons.length||missingQuestions.length||badQuestions.length){console.error({missingLessons,missingQuestions,badQuestions:badQuestions.map(q=>q.id)});process.exit(1)}
console.log(`Primary 5 QA passed: ${unique.length} topics, ${primary5Questions.length} questions.`);
