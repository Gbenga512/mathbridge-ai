import {jss3TermMap} from '../src/data/jss3TermMap.js';
import {JSS3_LEARNING} from '../src/data/jss3LessonLearning.js';
import {jss3Questions} from '../src/data/jss3Math.js';
import {createJSS3Progress,recordJSS3TopicResult,getJSS3ProgressSummary} from '../src/data/jss3Progress.js';
const topics=Object.values(jss3TermMap).flatMap(t=>t.topics),unique=[...new Set(topics)],errors=[];
if(unique.length!==16)errors.push(`Expected 16 mapped topics, found ${unique.length}`);
for(const t of unique){if(!JSS3_LEARNING[t])errors.push(`Missing lesson: ${t}`);if(!jss3Questions.some(q=>q.topic===t))errors.push(`Missing question: ${t}`)}
for(const q of jss3Questions){if(!unique.includes(q.topic)||!q.q||!Array.isArray(q.options)||q.options.length!==4||!Number.isInteger(q.answer)||q.answer<0||q.answer>3||!q.explanation)errors.push(`Invalid question: ${q.id}`)}
let p=createJSS3Progress();p=recordJSS3TopicResult(p,unique[0],4,5);const s=getJSS3ProgressSummary(p,unique);if(s.masteredCount!==1||s.percentage!==6)errors.push('Mastery tracking failed');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log(`JSS 3 QA passed: ${unique.length} mapped topics, ${jss3Questions.length} questions, mastery tracking OK.`);
