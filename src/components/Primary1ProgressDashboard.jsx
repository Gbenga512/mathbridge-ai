import React from 'react';

export default function Primary1ProgressDashboard({term='Term 1',topics=[],mastered=[],scores={},onPractice}){
 const rows=topics.map(topic=>({topic,score:scores[topic]??null,mastered:mastered.includes(topic)}));
 const masteredCount=rows.filter(r=>r.mastered).length;
 const weak=rows.filter(r=>r.score!==null&&r.score<80).sort((a,b)=>a.score-b.score);
 return <section className="primary1-progress-dashboard">
  <div className="progress-header"><div><small>MY PROGRESS</small><h2>Primary 1 • {term}</h2></div><strong>{topics.length?Math.round(masteredCount/topics.length*100):0}%</strong></div>
  <div className="progress"><span style={{width:`${topics.length?masteredCount/topics.length*100:0}%`}}/></div>
  <p>{masteredCount} of {topics.length} topics mastered</p>
  <div className="progress-topics">{rows.map(r=><div key={r.topic}><span>{r.mastered?'🏆':'📘'} {r.topic}</span><b>{r.score===null?'Not attempted':`${r.score}%`}</b></div>)}</div>
  {weak.length>0&&<div className="report"><h3>🔴 Focus areas</h3>{weak.slice(0,3).map(r=><button className="secondary" key={r.topic} onClick={()=>onPractice?.(r.topic)}>Practise {r.topic} →</button>)}</div>}
 </section>;
}
