import {supabase,supabaseConfigured} from './supabaseClient';
export {supabaseConfigured} from './supabaseClient';

const KEY='mathbridge-cloud-progress';
const PRODUCTION_AUTH_REDIRECT='https://mathbridge-ai-eight.vercel.app/';
const getAuthRedirect=()=>PRODUCTION_AUTH_REDIRECT;
const localGet=(userId)=>{try{return JSON.parse(localStorage.getItem(`${KEY}:${userId}`)||'null')}catch{return null}};
const localSave=(userId,progress)=>{try{localStorage.setItem(`${KEY}:${userId}`,JSON.stringify({...progress,updatedAt:new Date().toISOString()}));return {ok:true,mode:'local'};}catch{return {ok:false,mode:'local'}}};

export async function signUpStudent({email,password,fullName,classLevel}){
 if(!supabaseConfigured)return {data:null,error:new Error('Supabase is not configured yet.')};
 const {data,error}=await supabase.auth.signUp({email,password,options:{data:{role:'student',full_name:fullName,class_level:classLevel||null},emailRedirectTo:getAuthRedirect()}});
 if(error)return {data,error};
 return {data,error:null};
}
export async function signInStudent(email,password){if(!supabaseConfigured)return {data:null,error:new Error('Supabase is not configured yet.')};return await supabase.auth.signInWithPassword({email,password});}
export async function signOutStudent(){if(supabaseConfigured)return await supabase.auth.signOut();return {error:null};}
export async function getSession(){if(supabaseConfigured)return (await supabase.auth.getSession()).data.session;return null;}

export async function getProgress(userId='local-user'){
 if(supabaseConfigured&&userId&&userId!=='local-user'){
  const {data,error}=await supabase.from('progress').select('*').eq('student_id',userId).maybeSingle();
  if(!error&&data)return {term:data.term,week:data.week,masteredWeeks:data.mastered_weeks||[],updatedAt:data.updated_at};
 }
 return localGet(userId);
}
export async function saveCloudProgress(userId,progress){
 if(supabaseConfigured&&userId&&userId!=='local-user'){
  const {error}=await supabase.from('progress').upsert({student_id:userId,term:progress.term,week:progress.week,mastered_weeks:progress.masteredWeeks||[],updated_at:new Date().toISOString()});
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
