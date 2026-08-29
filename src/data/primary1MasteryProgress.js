// Primary 1 learner mastery progress state and remedial flow.
export const updatePrimary1MasteryProgress=(progress,assessment)=>{const next={...progress,score:assessment.score,attempts:(progress?.attempts||0)+1,mastered:assessment.mastered,status:assessment.status,lastUpdated:new Date().toISOString()};return{...next,nextAction:assessment.mastered?'Next lesson/topic':'Remedial practice'};};
export const shouldUnlockPrimary1NextTopic=progress=>Boolean(progress?.mastered&&progress?.score>=80);
export const getPrimary1WeakTopicIds=topics=>topics.filter(t=>t.weak).map(t=>t.topic);
