// Primary 1 mastery practice policy: learners repeat weak topics until they reach 80%.
export const getPrimary1PracticePolicy=(score,attempts=0)=>({score,attempts,mastered:score>=80,nextAction:score>=80?'Next topic':attempts>=2?'Review lesson and retry':'Retry mastery'});
export const PRIMARY1_MASTERY_TARGET=80;
