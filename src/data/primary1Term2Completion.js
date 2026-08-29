// Primary 1 Term 2 completion and Term 3 unlock rules.
export const canCompletePrimary1Term2=({topicScores={},finalAssessmentScore=0,requiredTopics=[]})=>requiredTopics.length>0&&requiredTopics.every(topic=>(topicScores[topic]||0)>=80)&&finalAssessmentScore>=80;
export const getPrimary1Term2NextStage=completed=>completed?'Term 3':'Term 2 Remedial';
