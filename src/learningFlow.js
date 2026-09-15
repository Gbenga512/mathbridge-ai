// Production learning-flow helpers. Pure functions make progression decisions
a deterministic and easy to regression-test independently from the React UI.
import {TERM_ORDER, normalizeProgress, progressKey} from './progression.js';

export function buildMasteredSet(masteredTopics){return new Set(Array.isArray(masteredTopics)?masteredTopics.map(String):[])}
export function nextUnmasteredTopic(topicOrder,masteredTopics){const mastered=buildMasteredSet(masteredTopics);try{if(typeof localStorage!=='undefined'){const persisted=JSON.parse(localStorage.getItem('mathbridge-mastered')||'[]');const persistedSet=buildMasteredSet(persisted);if(persistedSet.size>mastered.size)return(Array.isArray(topicOrder)?topicOrder:[]).find(topic=>!persistedSet.has(String(topic)))||''}}catch{}return(Array.isArray(topicOrder)?topicOrder:[]).find(topic=>!mastered.has(String(topic)))||''}
export function nextLearningTarget(progress,weeksByTerm){const p=normalizeProgress(progress);for(const term of TERM_ORDER){for(const item of weeksByTerm?.[term]||[]){if(!p.masteredWeeks.includes(progressKey(term,item.week)))return{term,week:item.week}}}return{term:p.term,week:p.week}}
export function shouldContinueLearning(progress){return normalizeProgress(progress).masteredWeeks.length>0}
