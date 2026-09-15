// Production learning-flow helpers. Pure functions make progression decisions
// deterministic and easy to regression-test independently from the React UI.
import {TERM_ORDER, normalizeProgress, progressKey} from './progression';

export function buildMasteredSet(masteredTopics){
 return new Set(Array.isArray(masteredTopics)?masteredTopics.map(String):[]);
}

export function nextUnmasteredTopic(topicOrder, masteredTopics){
 const mastered=buildMasteredSet(masteredTopics);
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
