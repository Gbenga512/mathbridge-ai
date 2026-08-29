// Primary 1 learner identity gate before progress is accessed.
export const createPrimary1LearnerSession=(learnerId,name)=>({learnerId:String(learnerId),name:name||'Learner',className:'Primary 1',startedAt:new Date().toISOString()});
export const canOpenPrimary1Progress=session=>Boolean(session?.learnerId&&session?.className==='Primary 1');
