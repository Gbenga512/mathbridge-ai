import React from 'react';

export default function TeacherDashboard({students=[],onBack}){
 const data=students.length?students:[
  {name:'Sample Student',term:'First Term',week:4,average:68,weak:['Fractions','LCM & HCF'],strengths:['Whole Numbers']}
 ];
 return <main className="dashboard"><div className="dashhead"><div><p className="step">TEACHER DASHBOARD</p><h2>Class Mathematics Overview</h2><p className="leveltext">Identify students who need targeted support.</p></div><button className="secondary" onClick={onBack}>← Back</button></div><div className="report"><h3>Student progress</h3><div className="teacher-list">{data.map((s,i)=><div className="teacher-card" key={i}><div><b>{s.name}</b><small>{s.term} • Week {s.week}</small></div><strong className={s.average<60?'weakscore':''}>{s.average}%</strong><div className="teacher-meta"><span>🔴 {s.weak.join(' • ')}</span><span>🟢 {s.strengths.join(' • ')}</span></div></div>)}</div><div className="recommend"><b>Teacher action</b><small>Group students with the same weak topic for focused revision, then reassess them.</small></div></div></main>
}
