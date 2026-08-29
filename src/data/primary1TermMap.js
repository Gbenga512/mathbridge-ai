// Primary 1 term map for the MathBridge learner journey.
// This separates the verified topic sequence by term so the learner can see progression.
export const primary1TermMap={
 'Term 1':{
  label:'First Term',
  topics:['Whole numbers 1-5','Whole number 0 (Zero)','Whole numbers 6-9','Whole number 10','Whole numbers 1-99','Fractions: halves and quarters','Addition'],
  checkpoint:'First Term Assessment'
 },
 'Term 2':{
  label:'Second Term',
  topics:['Subtraction','Open sentences','Nigerian money','Length','Time'],
  checkpoint:'Second Term Assessment'
 },
 'Term 3':{
  label:'Third Term',
  topics:['Weight','2-dimensional shapes','3-dimensional shapes','Data collection'],
  checkpoint:'Third Term Assessment'
 }
};
export const primary1TermProgress=(term,mastered=[])=>{
 const topics=primary1TermMap[term]?.topics||[];
 const masteredCount=topics.filter(t=>mastered.includes(t)).length;
 return {term,topics,masteredCount,total:topics.length,percentage:topics.length?Math.round(masteredCount/topics.length*100):0,complete:topics.length>0&&masteredCount===topics.length};
};
