import React,{useState}from'react';
import {saveCloudProgress,getProgress,signUpStudent,signInStudent,supabaseConfigured} from './cloudProgress';

export default function StudentAccount({onBack,onContinue}){
 const[mode,setMode]=useState('signup'),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[studentName,setStudentName]=useState(''),[message,setMessage]=useState(''),[busy,setBusy]=useState(false);
 const submit=async e=>{e.preventDefault();setMessage('');if(!email||!password||(mode==='signup'&&!studentName)){setMessage('Please complete all required fields.');return}setBusy(true);try{
  if(supabaseConfigured){
   const result=mode==='signup'?await signUpStudent({email:email.trim(),password,fullName:studentName,classLevel:'JSS1'}):await signInStudent(email.trim(),password);
   if(result.error){setMessage(result.error.message||'Account request failed.');return}
   if(mode==='signup'){setMessage(result.data?.session?'Account created. Your progress is now cloud-ready.':'Account created. Please check your email to confirm the account, then log in.');}
   else{setMessage('Login successful. Your cloud progress is ready.');}
  }else{
   const userId=`student:${email.trim().toLowerCase()}`;
   if(mode==='signup'){await saveCloudProgress(userId,{userId,role:'student',name:studentName,term:'T1',week:1,masteredWeeks:[]});setMessage('Student account created on this device. Cloud accounts are not configured yet.');}
   else{const p=await getProgress(userId);setMessage(p?`Welcome back, ${p.name||'student'}! Your saved progress is available.`:'No account record was found on this browser.');}
  }
 }finally{setBusy(false)}};
 return <main className="dashboard account-page"><div className="dashhead"><div><p className="step">🎓 STUDENT ACCOUNT</p><h2>{mode==='signup'?'Create your MathBridge account':'Welcome back'}</h2><p className="leveltext">{supabaseConfigured?'Your account and learning progress can sync across devices.':'The app is currently using device storage until Supabase is configured.'}</p></div><button className="secondary" onClick={onBack}>← Back</button></div><div className="account-card"><div className="account-tabs"><button className={mode==='signup'?'active':''} onClick={()=>{setMode('signup');setMessage('')}}>Student Signup</button><button className={mode==='login'?'active':''} onClick={()=>{setMode('login');setMessage('')}}>Student Login</button></div><form onSubmit={submit}>{mode==='signup'&&<input value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder="Student name"/>}<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address"/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/><button className="primary" type="submit" disabled={busy}>{busy?'Please wait…':mode==='signup'?'Create Student Account →':'Login →'}</button></form>{message&&<div className="recommend"><b>{message}</b><small>{supabaseConfigured?'Authentication is handled by Supabase.':'This prototype uses browser storage; add Supabase environment variables for cloud authentication.'}</small></div>}<button className="secondary full" onClick={onContinue}>Continue to Maths →</button></div></main>
}
