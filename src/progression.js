// MathBridge curriculum progression engine.
// Progress is represented as an explicit term + week cursor and immutable
// completion keys (T1-1, T1-2, ...). The engine is intentionally idempotent:
// completing an already-completed week can never advance the learner twice.
import {jss1Weekly} from './data/jss1Weekly';

export const TERM_ORDER=['T1','T2','T3'];
export const DEFAULT_PROGRESS={term:'T1',week:1,masteredWeeks:[]};
export const defaultProgress=DEFAULT_PROGRESS;

const key=(term,week)=>`${term}-${week}`;

export function normalizeProgress(value){
 const p=value&&typeof value==='object'?value:{};
 const term=TERM_ORDER.includes(p.term)?p.term:'T1';
 const weeks=jss1Weekly[term]||[];
 const parsedWeek=Number(p.week);
 const week=Number.isInteger(parsedWeek)&&parsedWeek>=1&&parsedWeek<=Math.max(weeks.length,1)?parsedWeek:1;
 const masteredWeeks=Array.isArray(p.masteredWeeks)?[...new Set(p.masteredWeeks.map(String).filter(Boolean))]:[];
 return {term,week,masteredWeeks};
}

export function loadProgress(){
 try{return normalizeProgress(JSON.parse(localStorage.getItem('mathbridge-progress')||'{}'))}
 catch{return {...DEFAULT_PROGRESS}}
}

export function saveProgress(progress){
 try{localStorage.setItem('mathbridge-progress',JSON.stringify(normalizeProgress(progress)));return true}
 catch{return false}
}

export function progressKey(term,week){return key(term,week)}

export function isWeekUnlocked(progress,term,week){
 const p=normalizeProgress(progress);
 if(!TERM_ORDER.includes(term)||!Number.isInteger(week)||week<1)return false;
 const current=TERM_ORDER.indexOf(p.term),target=TERM_ORDER.indexOf(term);
 if(target<current)return true;
 if(target>current)return false;
 return week<=p.week||p.masteredWeeks.includes(key(term,week));
}

export function completeWeek(progress,term,week){
 const p=normalizeProgress(progress);
 const weeks=jss1Weekly[term]||[];
 if(!TERM_ORDER.includes(term)||!Number.isInteger(week)||week<1||!weeks.length)return p;
 const completedKey=key(term,week);
 const mastered=new Set(p.masteredWeeks);
 // Replaying a completed mastery result must never skip another week.
 if(mastered.has(completedKey))return p;
 mastered.add(completedKey);
 // Old/replayed results may be recorded, but cannot move the active cursor.
 if(term!==p.term||week!==p.week)return {term:p.term,week:p.week,masteredWeeks:[...mastered]};
 let nextTerm=term;
 let nextWeek=week+1;
 if(nextWeek>weeks.length){
  const idx=TERM_ORDER.indexOf(term);
  if(idx<TERM_ORDER.length-1){nextTerm=TERM_ORDER[idx+1];nextWeek=1}
  else{nextTerm=term;nextWeek=week}
 }
 return {term:nextTerm,week:nextWeek,masteredWeeks:[...mastered]};
}

export function termCompleted(progress,term){
 const p=normalizeProgress(progress);
 const weeks=jss1Weekly[term]||[];
 return weeks.length>0&&weeks.every(w=>p.masteredWeeks.includes(key(term,w.week)));
}

export function curriculumCompleted(progress){return TERM_ORDER.every(term=>termCompleted(progress,term))}

export function getCurrentWeek(progress){
 const p=normalizeProgress(progress);
 return jss1Weekly[p.term]?.find(w=>w.week===p.week)||null;
}
