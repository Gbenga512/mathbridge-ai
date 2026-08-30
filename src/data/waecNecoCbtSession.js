export const startCbtSession=(exam,questions,durationMinutes)=>({exam,questions,currentIndex:0,answers:{},flagged:{},startedAt:Date.now(),durationSeconds:durationMinutes*60,submitted:false});
export const answerCbtQuestion=(session,index,answer)=>({...session,answers:{...session.answers,[index]:answer}});
export const toggleCbtFlag=(session,index)=>({...session,flagged:{...session.flagged,[index]:!session.flagged[index]}});
export const moveCbtQuestion=(session,index)=>({...session,currentIndex:Math.max(0,Math.min(index,session.questions.length-1))});
export const getCbtTimeRemaining=(session,now=Date.now())=>Math.max(0,session.durationSeconds-Math.floor((now-session.startedAt)/1000));
export const isCbtComplete=(session)=>Object.keys(session.answers).length===session.questions.length;
