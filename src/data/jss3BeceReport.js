// Analyse a completed JSS 3 BECE practice paper and recommend revision topics.
export const analyseJSS3BeceAttempt=(questions,answers)=>{
 const byTopic={};
 questions.forEach((q,i)=>{const topic=q.topic;if(!byTopic[topic])byTopic[topic]={topic,correct:0,total:0,percentage:0};byTopic[topic].total+=1;if(answers[i]===q.answer)byTopic[topic].correct+=1;});
 const topics=Object.values(byTopic).map(x=>({...x,percentage:Math.round(x.correct/x.total*100)})).sort((a,b)=>a.percentage-b.percentage);
 return {topics,weakTopics:topics.filter(x=>x.percentage<80),strongTopics:topics.filter(x=>x.percentage>=80),recommendations:topics.filter(x=>x.percentage<80).slice(0,5).map(x=>`Revise ${x.topic} (${x.percentage}%).`)};
};
