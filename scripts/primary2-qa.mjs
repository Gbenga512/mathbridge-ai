import { primary2TermMap } from '../src/data/primary2TermMap.js';
import { PRIMARY2_LEARNING } from '../src/data/primary2LessonLearning.js';
import { primary2Questions } from '../src/data/primary2Math.js';
const topics=Object.values(primary2TermMap).flatMap(t=>t.topics);
const missingLessons=topics.filter(t=>!PRIMARY2_LEARNING[t]);
const missingQuestions=topics.filter(t=>!primary2Questions.some(q=>q.topic===t));
if(missingLessons.length||missingQuestions.length){console.error({missingLessons,missingQuestions});process.exit(1)}
console.log(`Primary 2 QA passed: ${topics.length} topics have lessons and questions.`);

import { generateCurriculumBank } from '../src/data/questionFactory.js';
const generatedP2=generateCurriculumBank('P2',topics,2000);
const forbiddenP2=/\\b(volume|coordinate|algebra|equation|trigonometry|calculus|determinant|matrix|simple interest)\\b|\\bcuboid\\s+has\\s+dimensions\\b/i;
const badP2=generatedP2.filter(q=>forbiddenP2.test(String(q.q))||!Array.isArray(q.options)||q.options.length!==4||new Set(q.options.map(String)).size!==4||q.answer<0||q.answer>3||String(q.q).length>180);
if(badP2.length){console.error('P2 generated-bank QA failed',badP2.slice(0,10));process.exit(1)}
console.log('P2 generated-bank QA passed: 2,000 questions are structurally valid and age-appropriate.');
