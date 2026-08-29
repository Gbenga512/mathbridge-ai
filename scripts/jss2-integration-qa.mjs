import {jss2TermMap} from '../src/data/jss2TermMap.js';
import {JSS2_LEARNING} from '../src/data/jss2LessonLearning.js';
import {jss2Questions} from '../src/data/jss2Math.js';
import {createJSS2Progress,recordJSS2TopicResult,getJSS2ProgressSummary} from '../src/data/jss2Progress.js';
const topics=Object.values(jss2TermMap).flatMap(t=>t.topics),unique=[...new Set(topics)],errors=[];
if(unique.length!==31)errors.push(`Expected 31 topics, found ${unique.length}`);
for(const t of unique){if(!JSS2_LEARNING[t])errors.push(`Missing lesson: ${t}`);if(!jss2Questions.some(q=>q.topic===t))errors.push(`Missing question: ${t}`)}
for(const q of jss2Questions){if(!unique.includes(q.topic)||!q.q||!Array.isArray(q.options)||q.options.length!==4||!Number.isInteger(q.answer)||q.answer<0||q.answer>3||!q.explanation)errors.push(`Invalid question: ${q.id}`)}
let p=createJSS2Progress();p=recordJSS2TopicResult(p,unique[0],4,5);const s=getJSS2ProgressSummary(p,unique);if(s.masteredCount!==1||s.percentage!==3)errors.push('Mastery tracking failed');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log(`JSS 2 integration QA passed: ${unique.length} topics, ${jss2Questions.length} questions, mastery tracking OK.`);
