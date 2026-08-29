// Primary 1 progress state helpers. Scores persist locally until a future account sync is connected.
export const createPrimary1Progress=(term='Term 1')=>({className:'Primary 1',term,masteredTopics:[],topicResults:{},lastTopic:null});
export const recordPrimary1TopicResult=(progress,topic,correct,total,attempts=1)=>{
 const score=total?Math.round(correct/total*100):0;
 const existing=progress.topicResults?.[topic]||{};
 const next={...progress,topicResults:{...progress.topicResults,[topic]:{correct,total,score,attempts:Math.max(attempts,existing.attempts||0)+1}},lastTopic:topic};
 if(score>=80&&!next.masteredTopics.includes(topic)) next.masteredTopics=[...next.masteredTopics,topic];
 return next;
};
export const getPrimary1WeakTopics=progress=>Object.entries(progress?.topicResults||{}).filter(([,v])=>(v.score||0)<80).sort((a,b)=>(a[1].score||0)-(b[1].score||0)).map(([topic,v])=>({topic,score:v.score,attempts:v.attempts||0}));
export const getPrimary1ProgressSummary=(progress,termTopics=[])=>{const mastered=new Set(progress?.masteredTopics||[]);const total=termTopics.length;const count=termTopics.filter(t=>mastered.has(t)).length;return {className:'Primary 1',term:progress?.term||'Term 1',masteredCount:count,totalTopics:total,percentage:total?Math.round(count/total*100):0,complete:total>0&&count===total,weakTopics:getPrimary1WeakTopics(progress)};};
