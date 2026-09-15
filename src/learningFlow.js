// Production learning-flow helpers. Pure functions make progression decisions
// deterministic and easy to regression-test independently from the React UI.
import {TERM_ORDER, normalizeProgress, progressKey} from './progression';

export function buildMasteredSet(masteredTopics){
 return new Set(Array.isArray(masteredTopics)?masteredTopics.map(String):[]);
}

export function nextUnmasteredTopic(topicOrder, masteredTopics){
 const mastered=buildMasteredSet(masteredTopics);

 // The mastery screen persists the newly mastered topic before calculating the
 // continuation target. Older callers intentionally pass a list with the
 // current topic removed, so use that persisted source of truth when it is
 // ahead of the caller's list. This prevents a successful mastery from
 // selecting the just-completed topic again or sending the learner backwards.
 try{
  if(typeof localStorage!=='undefined'){
   const persisted=JSON.parse(localStorage.getItem('mathbridge-mastered')||'[]');
   const persistedSet=buildMasteredSet(persisted);
   if(persistedSet.size>mastered.size){
    return (Array.isArray(topicOrder)?topicOrder:[]).find(topic=>!persistedSet.has(String(topic)))||'';
   }
  }
 }catch{}

 return (Array.isArray(topicOrder)?topicOrder:[]).find(topic=>!mastered.has(String(topic)))||'';
}

export function nextLearningTarget(progress, weeksByTerm){
 const p=normalizeProgress(progress);
 const terms=Array.isArray(TERM_ORDER)?TERM_ORDER:[];
 for(const term of terms){
  const weeks=weeksByTerm?.[term]||[];
  for(const item of weeks){
   if(!p.masteredWeeks.includes(progressKey(term,item.week))) return {term,week:item.week};
  }
 }
 return {term:p.term,week:p.week};
}

export function shouldContinueLearning(progress){
 const p=normalizeProgress(progress);
 return p.masteredWeeks.length>0;
}
