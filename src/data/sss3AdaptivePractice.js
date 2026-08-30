import{getAllSSS3PracticeQuestions}from'./sss3Practice';
export const getSSS3AdaptiveDifficulty=percentage=>percentage>=80?'Hard':percentage>=60?'Medium':'Easy';
export const createSSS3AdaptiveSet=(mastery={},count=10)=>{const weak=Object.entries(mastery).filter(([,v])=>(v?.percentage??0)<80).map(([topic])=>topic);const all=getAllSSS3PracticeQuestions();const targeted=weak.length?all.filter(q=>weak.includes(q.topic)):all;return[...targeted].sort(()=>Math.random()-.5).slice(0,count)};
export const saveSSS3Attempt=attempt=>{const key='mathbridge-sss3-history';try{const old=JSON.parse(localStorage.getItem(key)||'[]');const next=[{...attempt,id:Date.now(),date:new Date().toISOString()},...old].slice(0,50);localStorage.setItem(key,JSON.stringify(next));return next}catch{return[attempt]}};
export const loadSSS3AttemptHistory=()=>{try{return JSON.parse(localStorage.getItem('mathbridge-sss3-history')||'[]')}catch{return[]}};
