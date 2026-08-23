// End-of-term diagnostic/report logic. Scores are based on recorded topic performance.
export function buildTermReport({term='T1',topicResults=[],weeksCompleted=0,totalWeeks=0}){
 const completed=topicResults.filter(x=>x.answered>0);
 const weak=[...completed].sort((a,b)=>a.score-b.score).slice(0,5);
 const strong=[...completed].sort((a,b)=>b.score-a.score).slice(0,3);
 const avg=completed.length?Math.round(completed.reduce((s,x)=>s+x.score,0)/completed.length):0;
 return {
  term,average:avg,weeksCompleted,totalWeeks,
  status:avg>=80?'Strong term performance':avg>=60?'Developing — keep practising':'Needs targeted support',
  weakPoints:weak.map(x=>({topic:x.topic,score:x.score,priority:x.score<50?'High':x.score<70?'Medium':'Watch'})),
  strengths:strong.map(x=>({topic:x.topic,score:x.score})),
  recommendations:weak.map(x=>x.score<50?`Relearn ${x.topic} from the foundation and complete guided practice.`:`Practise ${x.topic} again until you consistently reach 80%+.`)
 };
}
