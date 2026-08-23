import React,{useState}from'react';
const items=[
{id:'student-signup',icon:'🎓',title:'Student signup',desc:'Create a student account and save learning progress.'},
{id:'student-login',icon:'🔐',title:'Student login',desc:'Return to lessons and continue where you stopped.'},
{id:'parent-signup',icon:'👨‍👩‍👧',title:'Parent signup',desc:'Create a parent account to monitor a child.'},
{id:'parent-link',icon:'🔗',title:'Parent-child linking',desc:'Securely connect a parent account to a student.'},
{id:'sync',icon:'☁️',title:'Progress synchronization',desc:'Keep progress available across devices.'},
{id:'teacher-account',icon:'👨‍🏫',title:'Teacher account',desc:'Create a teacher workspace for monitoring.'},
{id:'teacher-class',icon:'🏫',title:'Teacher class',desc:'Create a class and add assigned students.'},
{id:'secure-rules',icon:'🛡️',title:'Secure access rules',desc:'Restrict data to authorized users.'}
];
export default function AccessCenter({onBack}){const[selected,setSelected]=useState(null);const item=items.find(x=>x.id===selected);return <main className="dashboard access-center"><div className="dashhead"><div><p className="step">MATHBRIDGE ACCOUNT CENTER</p><h2>Account & Cloud Access</h2><p className="leveltext">Choose the account function you want to use.</p></div><button className="secondary" onClick={onBack}>← Back</button></div><div className="access-grid">{items.map(x=><button className={`access-card ${selected===x.id?'active':''}`} key={x.id} onClick={()=>setSelected(x.id)}><span>{x.icon}</span><b>{x.title}</b><small>{x.desc}</small><em>{selected===x.id?'Selected':'Open →'}</em></button>)}</div>{item&&<div className="report access-panel"><h3>{item.title}</h3><p>{item.desc}</p><div className="recommend"><b>Backend status</b><small>This access point is prepared in the MVP. Real authentication, cloud database and secure access policies must be connected before production use.</small></div></div>}<p className="note">Security: browser storage is not authentication. Production access will use an authenticated cloud provider and database security policies.</p></main>}
