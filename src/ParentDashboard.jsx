import React from 'react';
import {buildParentSummary} from './parentReport';

export default function ParentDashboard({studentName='Student',term='T1',termHistory={},progress={},onBack}){
 const r=buildParentSummary({studentName,term,termHistory,progress});
 const termName=term==='T1'?'First Term':term==='T2'?'Second Term':'Third Term';
 return <main className="dashboard parent-dashboard">
  <div className="dashhead"><div><p className="step">PARENT VIEW</p><h2>{studentName}'s Maths Progress</h2><p className="leveltext">JSS1 • {termName}</p></div><div className="streak">📈 {r.average}% average</div></div>
  <div className="stats"><div><small>Term Average</small><b>{r.average}%</b></div><div><small>Current Week</small><b>{r.currentWeek}</b></div><div><small>Weeks Mastered</small><b>{r.masteredWeeks}</b></div></div>
  <div className="report"><h3>🔴 Areas needing support</h3>{r.weak.length?<div className="topic-results">{r.weak.map(x=><div key={x.topic}><span>{x.topic}</span><b className={x.score<50?'weakscore':''}>{x.score}%</b></div>)}</div>:<p>No enough assessment data yet.</p>}
   <h3>🟢 Strong areas</h3><div className="tags">{r.strong.length?r.strong.map(x=><span key={x.topic}>✓ {x.topic} · {x.score}%</span>):<span>More assessments needed.</span>}</div>
   <div className="recommend"><span>🎯 Recommended support</span><b>{r.advice}</b><small>Use this report to decide whether the learner needs targeted home practice or additional tutoring.</small></div>
   <p className="note">This is a learning diagnostic, not an official school report.</p>
  </div>
  <button className="primary" onClick={onBack}>Back to Student Progress →</button>
 </main>;
}
