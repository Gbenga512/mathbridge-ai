import{classQuestionBanks,examQuestionBanks,QUESTION_BANK_STANDARD}from'../src/data/questionBank.js';
const fail=[];const allowedDifficulty=new Set(['easy','medium','hard','challenge']);
const banned=/\b(?:copy|official past question|answer key)\b/i;
function checkBank(name,bank,{exam=false}={}){
 const seenText=new Set();
 for(const item of bank){
  const text=String(item.q||'').trim();
  const key=text.toLowerCase().replace(/\s+/g,' ');
  if(!text)fail.push(`${name}: ${item.id} missing question text`);
  if(seenText.has(key))fail.push(`${name}: duplicate normalized question text ${item.id}`);else seenText.add(key);
  if(!allowedDifficulty.has(item.difficulty))fail.push(`${name}: ${item.id} invalid difficulty ${item.difficulty}`);
  if(!item.explanation||String(item.explanation).trim().length<8)fail.push(`${name}: ${item.id} missing/short explanation`);
  if(!item.objective||String(item.objective).trim().length<3)fail.push(`${name}: ${item.id} missing objective`);
  if(!Array.isArray(item.options)||item.options.length!==4)fail.push(`${name}: ${item.id} must have exactly four options`);
  else{
   const optionKeys=item.options.map(x=>String(x).trim().toLowerCase());
   if(new Set(optionKeys).size!==4)fail.push(`${name}: ${item.id} has repeated answer options`);
   if(item.answer<0||item.answer>3||item.options[item.answer]===undefined)fail.push(`${name}: ${item.id} answer index is invalid`);
  }
  if(banned.test(text)||banned.test(String(item.explanation)))fail.push(`${name}: ${item.id} contains prohibited source/copy wording`);
  if(exam&&!item.exam)fail.push(`${name}: ${item.id} missing exam tag`);
 }
}
for(const level of QUESTION_BANK_STANDARD.schoolLevels)checkBank(level,classQuestionBanks[level]||[]);
for(const exam of QUESTION_BANK_STANDARD.examBanks)checkBank(exam,examQuestionBanks[exam]||[],{exam:true});
const all=[...Object.values(classQuestionBanks).flat(),...Object.values(examQuestionBanks).flat()];
const ids=new Set();for(const item of all){if(ids.has(item.id))fail.push(`GLOBAL: duplicate ID ${item.id}`);ids.add(item.id)}
if(fail.length){console.error('QUESTION QUALITY CHECK FAILED');console.error(fail.slice(0,100).join('\n'));process.exit(1)}
console.log(`QUESTION QUALITY OK: checked ${all.length} questions with unique IDs, four distinct options, explanations, objectives and valid difficulty metadata.`);
