// JSS1 term/week progression state for the MVP.
import {jss1Weekly} from './data/jss1Weekly';

export const TERM_ORDER=['T1','T2','T3'];
export const defaultProgress={term:'T1',week:1,masteredWeeks:[]};

export function loadProgress(){
 try{return {...defaultProgress,...JSON.parse(localStorage.getItem('mathbridge-progress')||'{}')}}catch{return {...defaultProgress}}
}
export function saveProgress(progress){
 try{localStorage.setItem('mathbridge-progress',JSON.stringify(progress))}catch{}
}
export function isWeekUnlocked(progress,term,week){
 if(term===progress.term)return week<=progress.week||progress.masteredWeeks.includes(`${term}-${week}`);
 const current=TERM_ORDER.indexOf(progress.term),target=TERM_ORDER.indexOf(term);
 return target<current;
}
export function completeWeek(progress,term,week){
 const mastered=new Set(progress.masteredWeeks||[]);mastered.add(`${term}-${week}`);
 const weeks=jss1Weekly[term]||[];let nextTerm=term,nextWeek=week+1;
 if(nextWeek>weeks.length){const idx=TERM_ORDER.indexOf(term);nextTerm=TERM_ORDER[idx+1]||term;nextWeek=1}
 return {term:nextTerm,week:nextWeek,masteredWeeks:[...mastered]};
}
export function termCompleted(progress,term){
 const weeks=jss1Weekly[term]||[];return weeks.length>0&&weeks.every(w=>progress.masteredWeeks.includes(`${term}-${w.week}`));
}
