import{selectFreshQuestions}from'../src/questionSelection.js';
const questions=Array.from({length:60},(_,i)=>({id:`q-${i+1}`,topic:`Topic ${i%12}`,q:`Question ${i+1}`,options:['A','B','C','D'],answer:0,explanation:'Test explanation'}));
const errors=[];
const selected=selectFreshQuestions({userId:'qa-user',questions,count:10,byTopic:true,seenIds:['q-1','q-2','q-3']});
const ids=new Set(selected.map(q=>q.id));
if(selected.length!==10)errors.push(`Expected 10 questions, found ${selected.length}`);
if(ids.size!==selected.length)errors.push('Duplicate question selected');
if(selected.some(q=>['q-1','q-2','q-3'].includes(q.id)))errors.push('Previously seen question was selected');
if(new Set(selected.map(q=>q.topic)).size!==10)errors.push('Diagnostic should cover 10 distinct topics when enough topics exist');
const small=questions.slice(0,8);const allSeen=small.map(q=>q.id);const fallback=selectFreshQuestions({userId:'qa-user-2',questions:small,count:5,byTopic:true,seenIds:allSeen});
if(fallback.length!==5)errors.push(`Expected 5 fallback questions, found ${fallback.length}`);
if(new Set(fallback.map(q=>q.id)).size!==fallback.length)errors.push('Fallback selection contains duplicates');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Question selection QA passed: ${selected.length} fresh questions plus ${fallback.length} safe fallback questions.`);
