// Cloud-ready progress adapter for the MVP.
// The adapter keeps the app working locally today and exposes one interface
// that can later be backed by Supabase/Firebase or another authenticated API.
const KEY='mathbridge-cloud-progress';
export async function getProgress(userId='local-user'){
 try{return JSON.parse(localStorage.getItem(`${KEY}:${userId}`)||'null')}catch{return null}
}
export async function saveCloudProgress(userId,progress){
 try{localStorage.setItem(`${KEY}:${userId}`,JSON.stringify({...progress,updatedAt:new Date().toISOString()}));return {ok:true,mode:'local-mvp'}}catch{return {ok:false,mode:'local-mvp'}}
}
export async function linkChild(parentId,childId){
 try{const key=`mathbridge-parent:${parentId}`;const existing=JSON.parse(localStorage.getItem(key)||'[]');if(!existing.includes(childId))existing.push(childId);localStorage.setItem(key,JSON.stringify(existing));return existing}catch{return[]}
}
export async function getLinkedChildren(parentId){try{return JSON.parse(localStorage.getItem(`mathbridge-parent:${parentId}`)||'[]')}catch{return[]}}
