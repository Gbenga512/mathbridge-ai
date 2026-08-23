// Parent-facing summary generated from the student's local learning record.
export function buildParentSummary({studentName='Student',term='T1',termHistory={},progress={}}){
 const scores=Object.entries(termHistory[term]||{}).map(([topic,score])=>({topic,score}));
 const average=scores.length?Math.round(scores.reduce((s,x)=>s+x.score,0)/scores.length):0;
 const weak=[...scores].sort((a,b)=>a.score-b.score).slice(0,5);
 const strong=[...scores].sort((a,b)=>b.score-a.score).slice(0,3);
 return {studentName,term,average,weak,strong,currentWeek:progress.week,masteredWeeks:progress.masteredWeeks?.length||0,advice:weak.length?`Focus extra support on ${weak[0].topic} before increasing difficulty.`:'Complete more assessments to build a stronger diagnostic.'};
}
