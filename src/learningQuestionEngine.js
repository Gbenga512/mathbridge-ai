import{getCloudSeenQuestionIds,recordQuestionAnswer,recordQuestionExposure}from'./questionHistory';
import{selectFreshQuestions}from'./questionSelection';

export const ACTIVITY_TYPES=Object.freeze({diagnostic:'diagnostic',practice:'practice',mastery:'mastery',test:'test',exam:'exam'});

export async function loadActivityHistory({studentId,level,activityType}){
 const ids=await getCloudSeenQuestionIds(studentId,level,activityType);
 return new Set((ids||[]).map(String));
}

export async function selectActivityQuestions({studentId,level,activityType,questions,count=10,byTopic=true,sessionSeenIds=[]}){
 const cloudSeen=await loadActivityHistory({studentId,level,activityType});
 const sessionSeen=new Set((sessionSeenIds||[]).map(String));
 const combined=new Set([...cloudSeen,...sessionSeen]);
 const selected=selectFreshQuestions({userId:studentId,questions,count,byTopic,seenIds:[...combined]});
 return{questions:selected,seenIds:combined};
}

export async function recordPresentedQuestions({studentId,level,activityType,questions,sessionId=null}){
 const list=Array.isArray(questions)?questions:[];
 return Promise.all(list.map(q=>recordQuestionExposure({studentId,questionId:q.id,level,topic:q.topic,activityType,sessionId})));
}

export async function recordActivityAnswer({studentId,level,activityType,questionId,correct}){
 return recordQuestionAnswer({studentId,level,activityType,questionId,correct});
}

export function buildSessionSeenIds(previousIds=[],questions=[]){
 const ids=new Set((previousIds||[]).map(String));
 (questions||[]).forEach(q=>{if(q?.id)ids.add(String(q.id))});
 return[...ids];
}
