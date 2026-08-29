// Primary 1 progress state helpers. Designed for the learner dashboard and future persistence layer.
export const createPrimary1Progress=(term='Term 1')=>({className:'Primary 1',term,masteredTopics:[],topicResults:{},lastTopic:null});
export const recordPrimary1TopicResult=(progress,topic,correct,total)=>{
 const score=total?Math.round(correct/total*100):0;
 const existing=progress.topicResults?.[topic]||{};
 const next={...progress,topicResults:{...progress.topicResults,[topic]:{correct,total,score,attempts:(existing.attempts||0)+1}},lastTopic:topic};
 if(score>=80&&!next.masteredTopics.includes(topic)) next.masteredTopics=[...next.masteredTopics,topic];
 return next;
};
export const getPrimary1WeakTopics=progress=>Object.entries(progress?.topicResults||{}).filter(([,v])=>(v.score||0)<80).sort((a,b)=>(a[1].score||0)-(b[1].score||0)).map(([topic,v])=>({topic,score:v.score,attempts:v.attempts||0}));
