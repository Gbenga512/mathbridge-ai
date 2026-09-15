import{supabase,supabaseConfigured}from'./supabaseClient';

const prefix='mathbridge-question-history:';
const key=userId=>`${prefix}${userId||'local-user'}`;
const localGet=userId=>{try{const value=JSON.parse(localStorage.getItem(key(userId))||'[]');return Array.isArray(value)?value:[]}catch{return[]}};
const localSave=(userId,ids)=>{try{localStorage.setItem(key(userId),JSON.stringify([...new Set(ids.map(String))]))}catch{}};

export function getQuestionHistory(userId){return localGet(userId)}
export function hasSeenQuestion(userId,id){return localGet(userId).includes(String(id))}
export function markQuestionSeen(userId,id){if(!id)return;const list=localGet(userId);if(!list.includes(String(id))){list.push(String(id));localSave(userId,list)}}
export function markQuestionsSeen(userId,ids){if(!Array.isArray(ids))return;const seen=new Set(localGet(userId));ids.forEach(id=>{if(id)seen.add(String(id))});localSave(userId,[...seen])}
export function freshQuestions(userId,questions){const seen=new Set(localGet(userId));return(questions||[]).filter(q=>!seen.has(String(q.id)))}

export async function getCloudSeenQuestionIds(userId,level=null,activityType=null){
 if(supabaseConfigured&&userId&&userId!=='local-user'){
  const{data,error}=await supabase.rpc('get_seen_question_ids',{p_level:level,p_activity_type:activityType});
  if(!error){const ids=(data||[]).map(x=>String(x.question_id));markQuestionsSeen(userId,ids);return ids}
 }
 return localGet(userId);
}

export async function recordQuestionExposure({studentId,questionId,level=null,topic=null,activityType='practice',sessionId=null}){
 if(!questionId)return{ok:false,error:new Error('Question ID is required')};
 markQuestionSeen(studentId,questionId);
 if(supabaseConfigured&&studentId&&studentId!=='local-user'){
  const{data,error}=await supabase.rpc('record_question_exposure',{p_question_id:String(questionId),p_level:level,p_topic:topic,p_activity_type:activityType,p_session_id:sessionId});
  if(!error)return{ok:true,mode:'supabase',id:data};
 }
 return{ok:true,mode:'local'};
}

export async function recordQuestionAnswer({studentId,questionId,activityType='practice',correct}){
 if(supabaseConfigured&&studentId&&studentId!=='local-user'){
  const{data,error}=await supabase.rpc('record_question_answer',{p_question_id:String(questionId),p_activity_type:activityType,p_correct:Boolean(correct)});
  if(!error)return{ok:Boolean(data),mode:'supabase'};
 }
 return{ok:true,mode:'local'};
}
