import React,{useState}from'react';
import './auth.css';
import {saveCloudProgress,getProgress,signUpStudent,signInStudent,supabaseConfigured} from './cloudProgress';

const hydrateLocalProgress=async userId=>{const cloud=await getProgress(userId);if(cloud){try{localStorage.setItem('mathbridge-progress',JSON.stringify({term:cloud.term,week:cloud.week,masteredWeeks:cloud.masteredWeeks||[]}))}catch{}}return cloud};

export default function StudentAccount({onBack,onContinue,onAuthenticated}){
 const[mode,setMode]=useState('login'),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[studentName,setStudentName]=useState(''),[message,setMessage]=useState(''),[busy,setBusy]=useState(false),[showPassword,setShowPassword]=useState(false);
 const chooseMode=next=>{if(busy)return;setMode(next);setMessage('');setShowPassword(false)};
 const finishLogin=async result=>{const userId=result?.data?.user?.id||result?.user?.id;if(!userId)return null;try{localStorage.setItem('mathbridge-current-user',userId)}catch{}const cloud=await hydrateLocalProgress(userId);onAuthenticated?.(userId,cloud);return cloud};
 const openDashboard=()=>{setMessage('Login successful. Opening your Maths dashboard…');setTimeout(()=>onContinue?.(),350)};
 const submit=async e=>{e.preventDefault();setMessage('');if(!email||!password||(mode==='signup'&&!studentName)){setMessage('Please complete all required fields.');return}setBusy(true);try{
  if(supabaseConfigured){
   const result=mode==='signup'?await signUpStudent({email:email.trim(),password,fullName:studentName,classLevel:'JSS1'}):await signInStudent(email.trim(),password);
   if(result.error){setMessage(result.error.message||'Account request failed.');return}
   if(mode==='signup'){
    if(result.data?.session){await finishLogin(result);setMessage('Account created. Opening your Maths dashboard…');setTimeout(()=>onContinue?.(),350)}
    else setMessage('Account created. Please check your email to confirm the account, then log in.');
   }else{await finishLogin(result);openDashboard()}
  }else{
   const userId=`student:${email.trim().toLowerCase()}`;try{localStorage.setItem('mathbridge-current-user',userId)}catch{}
   if(mode==='signup'){const p={userId,role:'student',name:studentName,term:'T1',week:1,masteredWeeks:[]};await saveCloudProgress(userId,p);onAuthenticated?.(userId,p);setMessage('Student account created. Opening your Maths dashboard…');setTimeout(()=>onContinue?.(),350)}
   else{const p=await getProgress(userId);if(p)try{localStorage.setItem('mathbridge-progress',JSON.stringify({term:p.term,week:p.week,masteredWeeks:p.masteredWeeks||[]}))}catch{}if(p){onAuthenticated?.(userId,p);openDashboard()}else setMessage('No account record was found on this device.')}
  }
 }catch(err){setMessage(err?.message||'Unable to connect to the account service. Please try again.')}finally{setBusy(false)}};
 return <main className="auth-page">
   <section className="auth-shell" aria-label="MathBridge student account">
    <div className="auth-brand-panel">
      <button type="button" className="auth-logo" onClick={onBack}>Math<span>Bridge</span></button>
      <div className="auth-brand-content">
        <span className="auth-eyebrow">🇳🇬 NIGERIAN CURRICULUM MATHS</span>
        <h1>Learn Maths.<br/><span>Lose the Fear.</span></h1>
        <p>MathBridge finds what you know, identifies the gaps, and gives you a fresh learning challenge built around your needs.</p>
        <div className="auth-benefits">
          <div><span>✓</span><div><b>Personal learning path</b><small>Your practice adapts to your performance.</small></div></div>
          <div><span>✓</span><div><b>Fresh questions</b><small>Different challenges keep practice meaningful.</small></div></div>
          <div><span>✓</span><div><b>Track your progress</b><small>Build mastery one topic at a time.</small></div></div>
        </div>
      </div>
      <p className="auth-footer">Built for learners following the Nigerian curriculum.</p>
    </div>
    <div className="auth-form-panel">
      <button type="button" className="auth-mobile-back" onClick={onBack}>← Back to MathBridge</button>
      <div className="auth-heading">
        <span className="auth-icon">🎓</span>
        <p className="auth-kicker">STUDENT ACCOUNT</p>
        <h2>{mode==='signup'?'Create your account':'Welcome back'}</h2>
        <p>{mode==='signup'?'Start a personal Maths journey that remembers your progress.':'Continue your Maths journey from where you stopped.'}</p>
      </div>
      <div className="account-tabs" role="tablist" aria-label="Student account mode">
        <button type="button" role="tab" aria-selected={mode==='login'} className={mode==='login'?'active':''} onClick={()=>chooseMode('login')}>Log In</button>
        <button type="button" role="tab" aria-selected={mode==='signup'} className={mode==='signup'?'active':''} onClick={()=>chooseMode('signup')}>Create Account</button>
      </div>
      <form className="auth-form" onSubmit={submit}>
        {mode==='signup'&&<label><span>Student name</span><input autoFocus value={studentName} onChange={e=>setStudentName(e.target.value)} placeholder="Enter your name" autoComplete="name"/></label>}
        <label><span>Email address</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" autoComplete="email"/></label>
        <label><span>Password</span><div className="password-wrap"><input type={showPassword?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" autoComplete={mode==='signup'?'new-password':'current-password'}/><button type="button" aria-label={showPassword?'Hide password':'Show password'} onClick={()=>setShowPassword(v=>!v)}>{showPassword?'Hide':'Show'}</button></div></label>
        {mode==='login'&&<div className="auth-help"><span>Secure sign-in</span><small>Use the email and password linked to your MathBridge account.</small></div>}
        <button className="primary auth-submit" type="submit" disabled={busy}>{busy?'Please wait…':mode==='signup'?'Create Student Account':'Log In'}</button>
      </form>
      {message&&<div className={`auth-message ${message.toLowerCase().includes('rate limit')?'error':''}`} role="status"><b>{message}</b><small>{supabaseConfigured?'Authentication is securely handled by Supabase.':'Your personal learning data is stored on this device.'}</small></div>}
      <button type="button" className="secondary auth-continue" onClick={onContinue}>Continue without account</button>
      <p className="auth-terms">By continuing, you agree to use MathBridge for learning and assessment purposes.</p>
    </div>
   </section>
 </main>
}
