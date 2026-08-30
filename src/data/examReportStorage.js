import{loadStudentProfile,recordExamAttempt}from'./studentProfile';
const KEY='mathbridge-exam-history';
export const saveExamReport=report=>{try{const history=JSON.parse(localStorage.getItem(KEY)||'[]');const next=[{...report,id:`result-${Date.now()}`},...history].slice(0,30);localStorage.setItem(KEY,JSON.stringify(next));const profile=loadStudentProfile();recordExamAttempt(profile,{exam:report.exam||'CBT',percentage:report.percentage||0,topics:(report.topics||[]).map(t=>({topic:t.topic,correct:t.correct||0,total:t.total||0}))});return next}catch{return[report]}};
export const loadExamReports=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}};
export const getRevisionRecommendations=report=>(report.weakTopics||[]).map(topic=>({topic,action:'Review lesson and complete 10 practice questions'}));
