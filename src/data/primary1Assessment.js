// Primary 1 assessment configuration. The app uses the same verified question bank,
// while selecting balanced questions by topic for diagnostics and mastery.
export const primary1Assessment={
 diagnostic:{count:10,description:'Baseline check across the selected term topics.'},
 practice:{questionsPerTopic:5,description:'Practice with immediate explanation and correction.'},
 mastery:{questions:5,target:80,maxAttempts:2,description:'Timed mastery check; 80% unlocks the next topic.'},
 termReport:{enabled:true,showWeakPoints:true,showMasteredTopics:true},
 progression:{rule:'Master the current topic before unlocking the next mapped topic.'}
};
