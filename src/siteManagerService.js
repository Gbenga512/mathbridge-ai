import{supabase,supabaseConfigured}from'./supabaseClient';
const fail=message=>({ok:false,error:new Error(message)});
export const getSiteManagerDashboard=async()=>{if(!supabaseConfigured||!supabase)return fail('Cloud services are not configured.');const{data,error}=await supabase.rpc('get_site_manager_dashboard');if(error)return{ok:false,error};return{ok:true,data:data||{}}};
export const getSiteManagerRole=async userId=>{if(!supabaseConfigured||!supabase||!userId)return{role:null,error:null};const{data,error}=await supabase.from('profiles').select('role,full_name').eq('id',userId).single();return{role:data?.role||null,fullName:data?.full_name||'',error}};
