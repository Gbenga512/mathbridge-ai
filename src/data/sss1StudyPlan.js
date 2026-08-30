import{SSS1_TOPICS}from'./sss1Curriculum';
export const buildSSS1StudyPlan=(mastery={})=>[...SSS1_TOPICS].map(topic=>({topic,percentage:mastery[topic]?.percentage||0,status:mastery[topic]?.status||'Not Started',action:(mastery[topic]?.percentage||0)<60?'Review lesson':(mastery[topic]?.percentage||0)<80?'Targeted practice':'Challenge practice'})).sort((a,b)=>a.percentage-b.percentage).slice(0,7);
