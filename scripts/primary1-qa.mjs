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

import { generateCurriculumBank } from '../src/data/questionFactory.js';
const generated=generateCurriculumBank('P1',topics,2000);
const forbidden=/\b(volume|perimeter|area|coordinate|algebra|equation|trigonometry|calculus|determinant|matrix|percentage|decimal|ratio|simple interest)\b|\b(find|calculate)\s+the\s+volume\b|\bcuboid\s+has\s+dimensions\b/i;
const bad=generated.filter(q=>forbidden.test(String(q.q))||!Array.isArray(q.options)||q.options.length!==4||new Set(q.options.map(String)).size!==4||q.answer<0||q.answer>3||String(q.q).length>180);
if(bad.length){console.error('Primary 1 generated-bank QA failed',bad.slice(0,10));process.exit(1)}
console.log('Primary 1 generated-bank QA passed: 2,000 questions are structurally valid and age-appropriate.');
