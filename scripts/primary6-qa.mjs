import { primary6TermMap } from '../src/data/primary6TermMap.js';
import { PRIMARY6_LEARNING } from '../src/data/primary6LessonLearning.js';
import { primary6Questions } from '../src/data/primary6Math.js';
const topics=Object.values(primary6TermMap).flatMap(t=>t.topics);
const unique=[...new Set(topics)];
const missingLessons=unique.filter(t=>!PRIMARY6_LEARNING[t]);
const missingQuestions=unique.filter(t=>!primary6Questions.some(q=>q.topic===t));
const badQuestions=primary6Questions.filter(q=>!unique.includes(q.topic)||!q.q||!Array.isArray(q.options)||q.options.length!==4||!Number.isInteger(q.answer)||q.answer<0||q.answer>3);
if(missingLessons.length||missingQuestions.length||badQuestions.length){console.error(JSON.stringify({missingLessons,missingQuestions,badQuestions:badQuestions.map(q=>q.id)},null,2));process.exit(1)}
console.log(`Primary 6 QA passed: ${unique.length} topics, ${primary6Questions.length} questions.`);
