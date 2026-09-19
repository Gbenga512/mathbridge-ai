import { primary3TermMap } from '../src/data/primary3TermMap.js';
import { PRIMARY3_LEARNING } from '../src/data/primary3LessonLearning.js';
import { primary3Questions } from '../src/data/primary3Math.js';
const topics=Object.values(primary3TermMap).flatMap(t=>t.topics);
const missingLessons=topics.filter(t=>!PRIMARY3_LEARNING[t]);
const missingQuestions=topics.filter(t=>!primary3Questions.some(q=>q.topic===t));
if(missingLessons.length||missingQuestions.length){console.error({missingLessons,missingQuestions});process.exit(1)}
console.log(`Primary 3 QA passed: ${topics.length} topics have lessons and questions.`);

import { generateCurriculumBank } from '../src/data/questionFactory.js';
const generatedP3=generateCurriculumBank('P3',topics,2000);
const forbiddenP3=/\\b(volume|coordinate|algebra|equation|trigonometry|calculus|determinant|matrix|simple interest)\\b|\\bcuboid\\s+has\\s+dimensions\\b/i;
const badP3=generatedP3.filter(q=>forbiddenP3.test(String(q.q))||!Array.isArray(q.options)||q.options.length!==4||new Set(q.options.map(String)).size!==4||q.answer<0||q.answer>3||String(q.q).length>180);
if(badP3.length){console.error('P3 generated-bank QA failed',badP3.slice(0,10));process.exit(1)}
console.log('P3 generated-bank QA passed: 2,000 questions are structurally valid and age-appropriate.');
