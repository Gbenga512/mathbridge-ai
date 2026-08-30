const KEY='mathbridge-exam-history';
export const saveExamReport=report=>{try{const history=JSON.parse(localStorage.getItem(KEY)||'[]');const next=[{...report,id:`result-${Date.now()}`},...history].slice(0,30);localStorage.setItem(KEY,JSON.stringify(next));return next}catch{return[report]}};
export const loadExamReports=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}};
export const getRevisionRecommendations=report=>(report.weakTopics||[]).map(topic=>({topic,action:'Review lesson and complete 10 practice questions'}));
