import{supabase,supabaseConfigured}from'./supabaseClient';

const prefix='mathbridge-question-history:';
const key=(userId,level=null,activityType=null)=>`${prefix}${userId||'local-user'}:${level||'all'}:${activityType||'all'}`;
const legacyKey=userId=>`${prefix}${userId||'local-user'}`;
const localGet=(userId,level=null,activityType=null)=>{try{const scoped=JSON.parse(localStorage.getItem(key(userId,level,activityType))||'[]');if(Array.isArray(scoped))return scoped.map(String);if(level||activityType)return[];const legacy=JSON.parse(localStorage.getItem(legacyKey(userId))||'[]');return Array.isArray(legacy)?legacy.map(String):[]}catch{return[]}};
const localSave=(userId,ids,level=null,activityType=null)=>{try{localStorage.setItem(key(userId,level,activityType),JSON.stringify([...new Set(ids.map(String))]))}catch{}};

export function getQuestionHistory(userId,level=null,activityType=null){return localGet(userId,level,activityType)}
export function hasSeenQuestion(userId,id,level=null,activityType=null){return localGet(userId,level,activityType).includes(String(id))}
export function markQuestionSeen(userId,id,level=null,activityType=null){if(!id)return;const list=localGet(userId,level,activityType);if(!list.includes(String(id))){list.push(String(id));localSave(userId,list,level,activityType)}}
export function markQuestionsSeen(userId,ids,level=null,activityType=null){if(!Array.isArray(ids))return;const seen=new Set(localGet(userId,level,activityType));ids.forEach(id=>{if(id)seen.add(String(id))});localSave(userId,[...seen],level,activityType)}
export function freshQuestions(userId,questions,level=null,activityType=null){const seen=new Set(localGet(userId,level,activityType));return(questions||[]).filter(q=>!seen.has(String(q.id)))}

export async function getCloudSeenQuestionIds(userId,level=null,activityType=null){
 if(supabaseConfigured&&userId&&userId!=='local-user'){
  const{data,error}=await supabase.rpc('get_seen_question_ids',{p_level:level,p_activity_type:activityType});
  if(!error){const ids=(data||[]).map(x=>String(x.question_id));markQuestionsSeen(userId,ids,level,activityType);return ids}
 }
 return localGet(userId,level,activityType);
}

export async function recordQuestionExposure({studentId,questionId,level=null,topic=null,activityType='practice',sessionId=null}){
 if(!questionId)return{ok:false,error:new Error('Question ID is required')};
 markQuestionSeen(studentId,questionId,level,activityType);
 if(supabaseConfigured&&studentId&&studentId!=='local-user'){
  const{data,error}=await supabase.rpc('record_question_exposure',{p_question_id:String(questionId),p_level:level,p_topic:topic,p_activity_type:activityType,p_session_id:sessionId});
  if(!error)return{ok:true,mode:'supabase',id:data};
 }
 return{ok:true,mode:'local'};
}

export async function recordQuestionAnswer({studentId,questionId,activityType='practice',correct,level=null}){
 if(!questionId)return{ok:false,error:new Error('Question ID is required')};
 if(supabaseConfigured&&studentId&&studentId!=='local-user'){
  const{data,error}=await supabase.rpc('record_question_answer',{p_question_id:String(questionId),p_activity_type:activityType,p_correct:Boolean(correct)});
  if(!error)return{ok:Boolean(data),mode:'supabase'};
 }
 markQuestionSeen(studentId,questionId,level,activityType);
 return{ok:true,mode:'local'};
}
