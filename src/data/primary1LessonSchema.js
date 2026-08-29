// Lesson structure for Primary 1 Mathematics curriculum content.
export const createPrimary1Lesson=({id,term,topic,title,objective,explanation,examples=[],practiceIds=[]})=>({id:String(id),className:'Primary 1',subject:'Mathematics',term,topic,title,objective,explanation,examples,practiceIds});
export const validatePrimary1Lesson=l=>Boolean(l?.id&&l?.term&&l?.topic&&l?.title&&l?.objective&&l?.explanation);
