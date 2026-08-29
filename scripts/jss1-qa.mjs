import { jss1TermMap } from '../src/data/jss1TermMap.js';
import { JSS1_LEARNING } from '../src/data/jss1LessonLearning.js';
import { jss1Questions } from '../src/data/jss1Math.js';
const topics=Object.values(jss1TermMap).flatMap(t=>t.topics);
const unique=[...new Set(topics)];
const missingLessons=unique.filter(t=>!JSS1_LEARNING[t]);
const missingQuestions=unique.filter(t=>!jss1Questions.some(q=>q.topic===t));
const badQuestions=jss1Questions.filter(q=>!unique.includes(q.topic)||!q.q||!Array.isArray(q.options)||q.options.length!==4||!Number.isInteger(q.answer)||q.answer<0||q.answer>3);
if(missingLessons.length||missingQuestions.length||badQuestions.length){console.error(JSON.stringify({missingLessons,missingQuestions,badQuestions:badQuestions.map(q=>q.id)},null,2));process.exit(1)}
console.log(`JSS 1 QA passed: ${unique.length} topics, ${jss1Questions.length} questions.`);
