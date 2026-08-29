// Lightweight local progress store for Primary 1. Keeps learner results between sessions.
const KEY='mathbridge-primary1-progress';
export const loadPrimary1Progress=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{"className":"Primary 1","terms":{}}')}catch{return{className:'Primary 1',terms:{}}}};
export const savePrimary1TopicResult=(term,topic,score)=>{const p=loadPrimary1Progress();p.terms[term]??={};const old=p.terms[term][topic]||{attempts:0};p.terms[term][topic]={score,attempts:old.attempts+1,mastered:score>=80,updatedAt:new Date().toISOString()};localStorage.setItem(KEY,JSON.stringify(p));return p};
export const getPrimary1WeakPoints=term=>Object.entries(loadPrimary1Progress().terms?.[term]||{}).filter(([,v])=>v.score<80).sort((a,b)=>a[1].score-b[1].score).map(([topic,v])=>({topic,score:v.score,attempts:v.attempts}));
