import { jss1TermMap } from '../src/data/jss1TermMap.js';
import { JSS1_LEARNING } from '../src/data/jss1LessonLearning.js';
import { jss1Questions } from '../src/data/jss1Math.js';
import { createJSS1Progress, recordJSS1TopicResult, getJSS1ProgressSummary } from '../src/data/jss1Progress.js';
const topics=Object.values(jss1TermMap).flatMap(t=>t.topics); const unique=[...new Set(topics)];
const errors=[];
if(unique.length!==28) errors.push(`Expected 28 topics, found ${unique.length}`);
for(const t of unique){if(!JSS1_LEARNING[t])errors.push(`Missing lesson: ${t}`);if(!jss1Questions.some(q=>q.topic===t))errors.push(`Missing question: ${t}`)}
for(const q of jss1Questions){if(!unique.includes(q.topic)||q.options?.length!==4||q.answer<0||q.answer>3)errors.push(`Invalid question: ${q.id}`)}
let p=createJSS1Progress();p=recordJSS1TopicResult(p,unique[0],4,5);const s=getJSS1ProgressSummary(p,unique);if(s.masteredCount!==1||s.percentage!==4)errors.push('Mastery tracking failed');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`JSS 1 integration QA passed: ${unique.length} topics, ${jss1Questions.length} questions, mastery tracking OK.`);
