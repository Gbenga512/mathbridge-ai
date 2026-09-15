// Persistent per-student question history. Questions are not accidentally repeated.
const prefix='mathbridge-question-history:';
const key=userId=>`${prefix}${userId||'local-user'}`;
export function getQuestionHistory(userId){try{const value=JSON.parse(localStorage.getItem(key(userId))||'[]');return Array.isArray(value)?value:[]}catch{return[]}}
export function hasSeenQuestion(userId,id){return getQuestionHistory(userId).includes(String(id))}
export function markQuestionSeen(userId,id){if(!id)return;try{const list=getQuestionHistory(userId),value=String(id);if(!list.includes(value)){list.push(value);localStorage.setItem(key(userId),JSON.stringify(list))}}catch{}}
export function markQuestionsSeen(userId,ids){if(!Array.isArray(ids))return;try{const seen=new Set(getQuestionHistory(userId));ids.forEach(id=>{if(id)seen.add(String(id))});localStorage.setItem(key(userId),JSON.stringify([...seen]))}catch{}}
export function freshQuestions(userId,questions){const seen=new Set(getQuestionHistory(userId));return questions.filter(q=>!seen.has(String(q.id)))}
