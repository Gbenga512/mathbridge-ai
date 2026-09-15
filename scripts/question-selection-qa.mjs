import{selectFreshQuestions}from'../src/questionSelection.js';
const questions=Array.from({length:60},(_,i)=>({id:`q-${i+1}`,topic:`Topic ${i%12}`,q:`Question ${i+1}`,options:['A','B','C','D'],answer:0,explanation:'Test explanation'}));
const selected=selectFreshQuestions({userId:'qa-user',questions,count:10,byTopic:true});
const errors=[];const ids=new Set(selected.map(q=>q.id));
if(selected.length!==10)errors.push(`Expected 10 questions, found ${selected.length}`);
if(ids.size!==selected.length)errors.push('Duplicate question selected');
if(new Set(selected.map(q=>q.topic)).size!==10)errors.push('Diagnostic should cover 10 distinct topics when enough topics exist');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Question selection QA passed: ${selected.length} unique questions across ${new Set(selected.map(q=>q.topic)).size} topics.`);
