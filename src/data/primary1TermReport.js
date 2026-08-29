// Primary 1 term-report helpers. Scores below 80% are flagged for targeted remediation.
export const buildPrimary1TermReport=(term,topicResults={})=>{
 const topics=Object.entries(topicResults).map(([topic,v])=>{const total=v.total||0;const correct=v.correct||0;const score=total?Math.round(correct/total*100):0;return {topic,score,correct,total,mastered:score>=80,attempts:v.attempts||0};});
 const total=topics.reduce((n,x)=>n+x.total,0),correct=topics.reduce((n,x)=>n+x.correct,0);
 return {term,overallScore:total?Math.round(correct/total*100):0,topics,masteredTopics:topics.filter(x=>x.mastered),weakPoints:topics.filter(x=>x.score<80).sort((a,b)=>a.score-b.score),nextActions:topics.filter(x=>x.score<80).sort((a,b)=>a.score-b.score).map(x=>`Revise ${x.topic} and retry practice.`)};
};
export const termStatus=report=>report?.overallScore>=80?'Ready for term assessment':'Continue targeted practice before assessment';
