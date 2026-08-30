export const getSSS1AdaptiveDifficulty=(percentage=0)=>percentage>=80?'Hard':percentage>=60?'Medium':'Easy';
export const chooseSSS1NextTopic=(mastery={})=>Object.entries(mastery).sort(([,a],[,b])=>(a?.percentage||0)-(b?.percentage||0))[0]?.[0]||null;
export const buildSSS1AdaptivePlan=(mastery={})=>Object.entries(mastery).map(([topic,data])=>({topic,percentage:data?.percentage||0,difficulty:getSSS1AdaptiveDifficulty(data?.percentage||0),action:(data?.percentage||0)<60?'lesson':(data?.percentage||0)<80?'practice':'challenge'})).sort((a,b)=>a.percentage-b.percentage);
