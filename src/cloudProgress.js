import {supabase,supabaseConfigured} from './supabaseClient';
export {supabaseConfigured} from './supabaseClient';

const KEY='mathbridge-cloud-progress';
const PRODUCTION_AUTH_REDIRECT='https://mathbridge-ai-eight.vercel.app/';
const getAuthRedirect=()=>PRODUCTION_AUTH_REDIRECT;
const localGet=(userId)=>{try{return JSON.parse(localStorage.getItem(`${KEY}:${userId}`)||'null')}catch{return null}};
const localSave=(userId,progress)=>{try{return localStorage.setItem(`${KEY}:${userId}`,JSON.stringify({...progress,updatedAt:new Date().toISOString()})),{ok:true,mode:'local'}}catch{return {ok:false,mode:'local'}}};

export async function signUpStudent({email,password,fullName,classLevel}){
 if(!supabaseConfigured)return {data:null,error:new Error('Supabase is not configured yet.')};
 const {data,error}=await supabase.auth.signUp({email,password,options:{data:{role:'student',full_name:fullName,class_level:classLevel||null},emailRedirectTo:getAuthRedirect()}});
 if(error)return {data,error};
 return {data,error:null};
}
export async function signInStudent(email,password){if(!supabaseConfigured)return {data:null,error:new Error('Supabase is not configured yet.')};return await supabase.auth.signInWithPassword({email,password});}
export async function signOutStudent(){if(supabaseConfigured)return await supabase.auth.signOut();return {error:null};}
export async function getSession(){if(supabaseConfigured)return (await supabase.auth.getSession()).data.session;return null;}
export async function getUserProfile(userId){
 if(supabaseConfigured&&userId){
  const {data,error}=await supabase.from('profiles').select('id,role,full_name,class_level').eq('id',userId).maybeSingle();
  if(!error&&data)return data;
 }
 return null;
}

export async function setStudentClass(userId,classLevel){
 if(!classLevel)return {data:null,error:new Error('Please select your current class.')};
 if(supabaseConfigured&&userId){
  const {data,error}=await supabase.rpc('set_student_class',{p_class_level:classLevel});
  if(!error&&data)return {data,error:null};
  return {data:null,error:error||new Error('Unable to save your class.')};
 }
 try{localStorage.setItem('mathbridge-class-level',classLevel);return {data:{id:userId,role:'student',class_level:classLevel},error:null}}catch(error){return {data:null,error}};
}

export async function getProgress(userId='local-user'){
 if(supabaseConfigured&&userId&&userId!=='local-user'){
  const {data,error}=await supabase.from('progress').select('*').eq('student_id',userId).maybeSingle();
  if(!error&&data)return {term:data.term,week:data.week,masteredWeeks:data.mastered_weeks||[],termExamResults:data.term_exam_results||{},updatedAt:data.updated_at};
 }
 return localGet(userId);
}
export async function saveCloudProgress(userId,progress){
 if(supabaseConfigured&&userId&&userId!=='local-user'){
  const {error}=await supabase.from('progress').upsert({student_id:userId,term:progress.term,week:progress.week,mastered_weeks:progress.masteredWeeks||[],term_exam_results:progress.termExamResults||{},updated_at:new Date().toISOString()});
  if(!error)return {ok:true,mode:'supabase'};
 }
 return localSave(userId,progress);
}
export async function saveAssessment(userId,assessment){if(!supabaseConfigured||!userId||userId==='local-user')return {ok:false,mode:'local'};const {error}=await supabase.from('assessments').insert({student_id:userId,...assessment});return {ok:!error,mode:'supabase',error};}
export async function linkChild(parentId,childId){
 if(supabaseConfigured){const {error}=await supabase.from('parent_children').upsert({parent_id:parentId,child_id:childId});if(!error)return [childId];}
 try{const key=`mathbridge-parent:${parentId}`;const existing=JSON.parse(localStorage.getItem(key)||'[]');if(!existing.includes(childId))existing.push(childId);localStorage.setItem(key,JSON.stringify(existing));return existing}catch{return[]}
}
export async function getLinkedChildren(parentId){if(supabaseConfigured){const {data,error}=await supabase.from('parent_children').select('child_id').eq('parent_id',parentId);if(!error)return (data||[]).map(x=>x.child_id)}try{return JSON.parse(localStorage.getItem(`mathbridge-parent:${parentId}`)||'[]')}catch{return[]}}

export async function getSchoolJoinOptions(schoolCode){
 if(!supabaseConfigured)return {data:null,error:new Error('Cloud school services are not configured.')};
 const {data,error}=await supabase.rpc('get_school_join_options',{p_school_code:String(schoolCode||'').trim()});
 return {data,error};
}
export async function joinSchoolByCode(schoolCode,classId){
 if(!supabaseConfigured)return {data:null,error:new Error('Cloud school services are not configured.')};
 const {data,error}=await supabase.rpc('join_school_by_code',{p_school_code:String(schoolCode||'').trim(),p_class_id:classId});
 return {data,error};
}
