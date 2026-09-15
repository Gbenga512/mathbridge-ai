import{classQuestionBanks,examQuestionBanks,QUESTION_BANK_STANDARD}from'../src/data/questionBank.js';
const fail=[];
const allowedLevels=new Set(QUESTION_BANK_STANDARD.schoolLevels);
const allowedDifficulty=new Set(['easy','medium','hard','challenge']);
for(const level of QUESTION_BANK_STANDARD.schoolLevels){
 const bank=classQuestionBanks[level]||[];
 if(bank.length<QUESTION_BANK_STANDARD.minimumPerClass)fail.push(`${level}: ${bank.length} questions`);
 const ids=new Set(),texts=new Set();
 for(const item of bank){
  if(ids.has(item.id))fail.push(`${level}: duplicate ID ${item.id}`);ids.add(item.id);
  const text=String(item.q||'').trim().toLowerCase();
  if(!text)fail.push(`${level}: missing question ${item.id}`);
  if(texts.has(text))fail.push(`${level}: duplicate question text ${item.id}`);texts.add(text);
  if(!Array.isArray(item.options)||item.options.length!==4)fail.push(`${level}: invalid options ${item.id}`);
  else{
   const unique=new Set(item.options.map(String));
   if(unique.size!==4)fail.push(`${level}: repeated answer options ${item.id}`);
   if(typeof item.answer!=='number'||item.answer<0||item.answer>3||!Number.isInteger(item.answer))fail.push(`${level}: invalid answer index ${item.id}`);
   else if(item.options[item.answer]===undefined)fail.push(`${level}: answer index has no option ${item.id}`);
  }
  if(!item.topic)fail.push(`${level}: missing topic ${item.id}`);
  if(item.classLevel!==level)fail.push(`${level}: wrong classLevel ${item.id}`);
  if(!item.term)fail.push(`${level}: missing term ${item.id}`);
  if(!allowedDifficulty.has(item.difficulty))fail.push(`${level}: invalid difficulty ${item.id}`);
  if(!item.explanation)fail.push(`${level}: missing explanation ${item.id}`);
  if(!item.objective)fail.push(`${level}: missing objective ${item.id}`);
 }
}
for(const exam of QUESTION_BANK_STANDARD.examBanks){
 const bank=examQuestionBanks[exam]||[];
 if(bank.length<QUESTION_BANK_STANDARD.minimumPerExam)fail.push(`${exam}: ${bank.length} questions`);
 const ids=new Set(),texts=new Set();
 for(const item of bank){
  if(ids.has(item.id))fail.push(`${exam}: duplicate ID ${item.id}`);ids.add(item.id);
  const text=String(item.q||'').trim().toLowerCase();
  if(texts.has(text))fail.push(`${exam}: duplicate question text ${item.id}`);texts.add(text);
  if(item.exam!==exam)fail.push(`${exam}: wrong exam tag ${item.id}`);
  if(item.sourceType!==`${exam}_STYLE_ORIGINAL`)fail.push(`${exam}: wrong source type ${item.id}`);
  if(!Array.isArray(item.options)||item.options.length!==4)fail.push(`${exam}: invalid options ${item.id}`);
  else if(new Set(item.options.map(String)).size!==4)fail.push(`${exam}: repeated answer options ${item.id}`);
  if(typeof item.answer!=='number'||item.answer<0||item.answer>3||!Number.isInteger(item.answer))fail.push(`${exam}: invalid answer index ${item.id}`);
  if(!item.topic||!item.explanation||!item.objective)fail.push(`${exam}: incomplete metadata ${item.id}`);
 }
}
if(fail.length){console.error('QUESTION BANK QA FAILED');console.error(fail.slice(0,100).join('\n'));process.exit(1)}
const classTotal=Object.values(classQuestionBanks).reduce((s,b)=>s+b.length,0),examTotal=Object.values(examQuestionBanks).reduce((s,b)=>s+b.length,0);
console.log(`QUESTION BANK QA OK: ${classTotal} school questions + ${examTotal} examination-style questions = ${classTotal+examTotal} total.`);
console.log(`Coverage: ${Object.entries(classQuestionBanks).map(([k,v])=>`${k}=${v.length}`).join(', ')}`);
