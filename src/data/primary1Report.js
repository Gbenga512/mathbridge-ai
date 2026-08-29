// Primary 1 term-end report helpers.
export const buildPrimary1TermReport=(term,results={})=>{
 const entries=Object.entries(results);
 const total=entries.reduce((n,[,v])=>n+(v.total||0),0);
 const correct=entries.reduce((n,[,v])=>n+(v.correct||0),0);
 const topics=entries.map(([topic,v])=>({topic,score:v.total?Math.round((v.correct||0)/v.total*100):0,attempts:v.attempts||0,mastered:!!v.mastered}));
 const weakPoints=topics.filter(x=>x.score<80).sort((a,b)=>a.score-b.score);
 return {term,total,correct,percentage:total?Math.round(correct/total*100):0,topics,weakPoints,masteredTopics:topics.filter(x=>x.mastered),generatedAt:new Date().toISOString()};
};
export const reportMessage=(report)=>report.weakPoints.length?`Focus areas: ${report.weakPoints.map(x=>x.topic).join(', ')}.`:'Excellent! No topic is currently below the 80% mastery target.';
