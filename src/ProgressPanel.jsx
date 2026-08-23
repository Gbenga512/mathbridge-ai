import React from 'react';
import WeeklyRoadmap from './WeeklyRoadmap';
import {jss1Weekly} from './data/jss1Weekly';
import {TERM_ORDER,defaultProgress,loadProgress,saveProgress,termCompleted} from './progression';

export default function ProgressPanel({onStartWeek}){
 const [progress,setProgress]=React.useState(loadProgress);
 React.useEffect(()=>saveProgress(progress),[progress]);
 const termName={T1:'📘 First Term',T2:'📗 Second Term',T3:'📕 Third Term'}[progress.term];
 const total=jss1Weekly[progress.term]?.length||0;
 const completed=(progress.masteredWeeks||[]).filter(k=>k.startsWith(progress.term+'-')).length;
 const pct=total?Math.round(completed/total*100):0;
 const finishDemoWeek=()=>{
  const {completeWeek}=require('./progression');
  const next=completeWeek(progress,progress.term,progress.week);
  setProgress(next);saveProgress(next);
 };
 const reset=()=>{setProgress(defaultProgress);saveProgress(defaultProgress)};
 return <section className="progress-panel">
  <div className="progress-panel-head"><div><span className="step">JSS1 LEARNING PROGRESS</span><h2>{termName}</h2><p>Week {progress.week} of {total} • {pct}% of this term mastered</p></div><button className="secondary" onClick={reset}>Reset Progress</button></div>
  <div className="term-strip">{TERM_ORDER.map(t=><span key={t} className={t===progress.term?'current':TERM_ORDER.indexOf(t)<TERM_ORDER.indexOf(progress.term)?'complete':'locked'}>{t==='T1'?'First Term':t==='T2'?'Second Term':'Third Term'}</span>)}</div>
  <WeeklyRoadmap term={progress.term} currentWeek={progress.week} masteredWeeks={(progress.masteredWeeks||[]).filter(k=>k.startsWith(progress.term+'-')).map(k=>Number(k.split('-')[1]))} onStart={onStartWeek}/>
  <div className="progress-actions"><button className="primary" onClick={finishDemoWeek}>Mark Current Week Mastered</button>{termCompleted(progress,progress.term)&&<div className="term-complete">🎉 {termName} completed. The next term is unlocked.</div>}</div>
 </section>;
}
