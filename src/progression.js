// MathBridge curriculum progression engine.
// Progress is represented as an explicit term + week cursor and immutable
// completion keys (T1-1, T1-2, ...). The engine is intentionally idempotent.
import {jss1Weekly} from './data/jss1Weekly.js';

export const TERM_ORDER=['T1','T2','T3'];
export const DEFAULT_PROGRESS={term:'T1',week:1,masteredWeeks:[],termExamResults:{}};
export const defaultProgress=DEFAULT_PROGRESS;
const key=(term,week)=>`${term}-${week}`;
const weeksFor=term=>jss1Weekly[term]||[];

function cursorAfterMastered(masteredWeeks,ptermExamResults={}){
 const mastered=new Set(masteredWeeks||[]);let term='T1',week=1;
 for(const t of TERM_ORDER){const weeks=weeksFor(t);let next=1;while(next<=weeks.length&&mastered.has(key(t,next)))next+=1;if(next<=weeks.length)return{term:t,week:next};if(weeks.length===0)return{term:t,week:1};if(!mastered.has(key(t,weeks.length)))return{term:t,week:weeks.length};if(!((ptermExamResults||{})[t]?.passed))return{term:t,week:weeks.length+1}}
 const last=TERM_ORDER[TERM_ORDER.length-1];return{term:last,week:Math.max(weeksFor(last).length,1)};
}
export function normalizeProgress(value){
 const p=value&&typeof value==='object'?value:{};const requestedTerm=TERM_ORDER.includes(p.term)?p.term:'T1';const requestedWeeks=weeksFor(requestedTerm);const parsedWeek=Number(p.week);const maxCursor=Math.max(requestedWeeks.length+1,2);const requestedWeek=Number.isInteger(parsedWeek)&&parsedWeek>=1&&parsedWeek<=maxCursor?parsedWeek:1;const masteredWeeks=Array.isArray(p.masteredWeeks)?[...new Set(p.masteredWeeks.map(String).filter(Boolean))]:[];const termExamResults=p.termExamResults&&typeof p.termExamResults==='object'&&!Array.isArray(p.termExamResults)?p.termExamResults:{};const recovered=cursorAfterMastered(masteredWeeks,termExamResults);const requestedIndex=TERM_ORDER.indexOf(requestedTerm),recoveredIndex=TERM_ORDER.indexOf(recovered.term);const useRecovered=recoveredIndex>requestedIndex||(recoveredIndex===requestedIndex&&recovered.week>requestedWeek);const term=useRecovered?recovered.term:requestedTerm;const week=useRecovered?recovered.week:requestedWeek;return{term,week,masteredWeeks,termExamResults};
}
export function loadProgress(){try{return normalizeProgress(JSON.parse(localStorage.getItem('mathbridge-progress')||'{}'))}catch{return{...DEFAULT_PROGRESS}}}
export function saveProgress(progress){const normalized=normalizeProgress(progress);try{localStorage.setItem('mathbridge-progress',JSON.stringify(normalized));const userId=localStorage.getItem('mathbridge-current-user');if(userId)void import('./cloudProgress.js').then(({saveCloudProgress})=>saveCloudProgress(userId,normalized)).catch(()=>{});return true}catch{return false}}
export function progressKey(term,week){return key(term,week)}
export function isWeekUnlocked(progress,term,week){const p=normalizeProgress(progress);if(!TERM_ORDER.includes(term)||!Number.isInteger(week)||week<1)return false;const current=TERM_ORDER.indexOf(p.term),target=TERM_ORDER.indexOf(term);if(target<current)return true;if(target>current)return false;return week<=p.week||p.masteredWeeks.includes(key(term,week))}
export function completeWeek(progress,term,week){const p=normalizeProgress(progress),weeks=weeksFor(term);if(!TERM_ORDER.includes(term)||!Number.isInteger(week)||week<1||!weeks.length)return p;const completedKey=key(term,week),mastered=new Set(p.masteredWeeks);if(mastered.has(completedKey))return p;mastered.add(completedKey);if(term!==p.term||week!==p.week)return normalizeProgress({term:p.term,week:p.week,masteredWeeks:[...mastered]});let nextTerm=term,nextWeek=week+1;if(nextWeek>weeks.length){const idx=TERM_ORDER.indexOf(term);if(idx<TERM_ORDER.length-1){nextTerm=TERM_ORDER[idx];nextWeek=week+1}else{nextTerm=term;nextWeek=week}}return normalizeProgress({term:nextTerm,week:nextWeek,masteredWeeks:[...mastered],termExamResults:p.termExamResults})}
export function termCompleted(progress,term){const p=normalizeProgress(progress),weeks=weeksFor(term);return weeks.length>0&&weeks.every(w=>p.masteredWeeks.includes(key(term,w.week)))}
export function curriculumCompleted(progress){return TERM_ORDER.every(term=>termCompleted(progress,term))}
export function getCurrentWeek(progress){const p=normalizeProgress(progress);return weeksFor(p.term).find(w=>w.week===p.week)||null}

export function isFinalExamUnlocked(progress){const p=normalizeProgress(progress),weeks=weeksFor(p.term);return weeks.length>0&&p.week>weeks.length&&!p.termExamResults?.[p.term]?.passed;}
export function completeTermExam(progress,term,score,passMark=80){const p=normalizeProgress(progress);if(!TERM_ORDER.includes(term)||score==null)return p;const passed=Number(score)>=passMark;const results={...(p.termExamResults||{}),[term]:{score:Number(score),passMark,passed,completedAt:new Date().toISOString()}};if(!passed)return normalizeProgress({...p,termExamResults:results,week:Math.max(p.week,weeksFor(term).length+1)});const idx=TERM_ORDER.indexOf(term);if(idx<TERM_ORDER.length-1)return normalizeProgress({...p,term:TERM_ORDER[idx+1],week:1,termExamResults:results});return normalizeProgress({...p,term,week:weeksFor(term).length+1,termExamResults:results});}
export function curriculumCompleted(progress){const p=normalizeProgress(progress);return TERM_ORDER.every(term=>p.termExamResults?.[term]?.passed);}
