import{getAllSSS2PracticeQuestions}from'./sss2Practice';
export const loadSSS2PracticeHistory=()=>{try{return JSON.parse(localStorage.getItem('mathbridge-sss2-practice-history')||'[]')}catch{return[]}};
export const saveSSS2PracticeAttempt=attempt=>{const h=loadSSS2PracticeHistory();const next=[{...attempt,id:Date.now(),date:new Date().toISOString()},...h].slice(0,50);localStorage.setItem('mathbridge-sss2-practice-history',JSON.stringify(next));return next};
export const createAdaptiveSSS2Practice=(mastery={},count=10)=>{const weak=Object.entries(mastery).filter(([,x])=>(x?.percentage||0)<80).map(([topic])=>topic);const pool=getAllSSS2PracticeQuestions().filter(q=>!weak.length||weak.includes(q.topic)||!q.topic);return[...pool].sort(()=>Math.random()-.5).slice(0,count)};
export const getSSS2AdaptiveDifficulty=percentage=>percentage>=80?'Hard':percentage>=60?'Medium':'Easy';
