import React from 'react';
import {jss1Weekly} from './data/jss1Weekly';

export default function WeeklyRoadmap({term='T1',currentWeek=1,masteredWeeks=[],onStart}){
 const weeks=jss1Weekly[term]||[];
 return <section className="weekly-roadmap">
  <div className="roadmap-head"><div><span className="step">YOUR LEARNING ROADMAP</span><h3>{term==='T1'?'📘 First Term':term==='T2'?'📗 Second Term':'📕 Third Term'}</h3></div><span className="roadmap-count">{masteredWeeks.length}/{weeks.length} weeks mastered</span></div>
  <div className="week-list">{weeks.map((w,i)=>{const done=masteredWeeks.includes(w.week);const active=w.week===currentWeek&&!done;const locked=w.week>currentWeek&&!done;return <button className={`week-row ${done?'done':''} ${active?'active':''} ${locked?'locked':''}`} key={`${w.week}-${w.title}`} disabled={locked} onClick={()=>onStart?.(w)}><span className="week-dot">{done?'✓':w.week}</span><span className="week-copy"><b>Week {w.week} — {w.title}</b><small>{w.focus}</small></span><span className="week-status">{done?'COMPLETED':active?'CURRENT':'LOCKED'}</span></button>})}</div>
 </section>
}
