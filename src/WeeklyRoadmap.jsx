import React from 'react';
import {jss1Weekly} from './data/jss1Weekly';
import {progressKey} from './progression';

export default function WeeklyRoadmap({term='T1',currentWeek=1,masteredWeeks=[],termExamPassed=false,onStart,onExam}){
 const weeks=jss1Weekly[term]||[];const termCompleted=weeks.length>0&&weeks.every(w=>masteredWeeks.includes(progressKey(term,w.week)));const termExamUnlocked=termCompleted&&!termExamPassed;
 return <section className="weekly-roadmap">
  <div className="roadmap-head"><div><span className="step">YOUR LEARNING ROADMAP</span><h3>{term==='T1'?'📘 First Term':term==='T2'?'📗 Second Term':'📕 Third Term'}</h3></div><span className="roadmap-count">{weeks.filter(w=>masteredWeeks.includes(progressKey(term,w.week))).length}/{weeks.length} weeks mastered</span></div>
  <div className="week-list">{weeks.map(w=>{const done=masteredWeeks.includes(progressKey(term,w.week));const active=w.week===currentWeek&&!done;const locked=w.week>currentWeek&&!done;return <button className={`week-row ${done?'done':''} ${active?'active':''} ${locked?'locked':''}`} key={`${w.week}-${w.title}`} disabled={locked} onClick={()=>onStart?.(w)}><span className="week-dot">{done?'✓':w.week}</span><span className="week-copy"><b>Week {w.week} — {w.title}</b><small>{w.focus}</small></span><span className="week-status">{done?'COMPLETED':active?'CURRENT':'LOCKED'}</span></button>})}</div>
 </section>
}
