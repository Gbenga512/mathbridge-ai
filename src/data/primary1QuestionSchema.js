// Schema for curriculum-aligned Primary 1 Mathematics practice questions.
export const createPrimary1Question=({id,term,topic,question,options=[],answer,explanation,difficulty='easy'})=>({id:String(id),className:'Primary 1',subject:'Mathematics',term,topic,question,options,answer,explanation,difficulty});
export const validatePrimary1Question=q=>Boolean(q?.id&&q?.term&&q?.topic&&q?.question&&q?.answer&&q?.explanation);
