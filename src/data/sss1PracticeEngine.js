import{getAllSSS1PracticeQuestions,getSSS1PracticeQuestions}from'./sss1Practice';
export const scoreSSS1Practice=(questions,answers)=>{const total=questions.length;const score=questions.reduce((s,q,i)=>s+(answers[i]===q.answer?1:0),0);return{score,total,percentage:total?Math.round(score/total*100):0,correct:questions.map((q,i)=>answers[i]===q.answer),mistakes:questions.filter((q,i)=>answers[i]!==q.answer)}};
export const createSSS1PracticeSet=(topic,count=10)=>{const pool=topic?getSSS1PracticeQuestions(topic):getAllSSS1PracticeQuestions();return[...pool].sort(()=>Math.random()-.5).slice(0,count)};
export const getSSS1PracticeFeedback=p=>p>=80?'Excellent — keep challenging yourself.':p>=60?'Good progress — practise the missed questions.':'Keep learning — review the lesson and try again.';
