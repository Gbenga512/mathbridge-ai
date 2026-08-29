import fs from 'node:fs';
import { primary1TermMap } from '../src/data/primary1TermMap.js';
import { PRIMARY1_LEARNING } from '../src/data/primary1LessonLearning.js';
import { primary1Questions } from '../src/data/primary1Math.js';

const topics=Object.values(primary1TermMap).flatMap(t=>t.topics);
const missingLessons=topics.filter(t=>!PRIMARY1_LEARNING[t]);
const questionCounts=Object.fromEntries(topics.map(t=>[t,primary1Questions.filter(q=>q.topic===t).length]));
const missingQuestions=topics.filter(t=>questionCounts[t]===0);
if(missingLessons.length||missingQuestions.length){console.error({missingLessons,missingQuestions,questionCounts});process.exit(1)}
console.log(`Primary 1 QA passed: ${topics.length} topics, all have lessons and questions.`);
