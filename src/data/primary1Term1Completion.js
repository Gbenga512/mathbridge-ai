// Primary 1 Term 1 completion and next-term unlock rules.
export const canCompletePrimary1Term1=({topicScores={},finalAssessmentScore=0,requiredTopics=[]})=>requiredTopics.length>0&&requiredTopics.every(topic=>(topicScores[topic]||0)>=80)&&finalAssessmentScore>=80;
export const getPrimary1NextStage=completed=>completed?'Term 2':'Term 1 Remedial';
