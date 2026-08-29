// Primary 1 term-completion controller. Keeps term progression explicit and prevents a mastered
// topic from sending the learner back to the beginning of the same term.
export const PRIMARY1_TERM_ORDER=['Term 1','Term 2','Term 3'];
export const getNextPrimary1Term=term=>{const i=PRIMARY1_TERM_ORDER.indexOf(term);return i>=0&&i<PRIMARY1_TERM_ORDER.length-1?PRIMARY1_TERM_ORDER[i+1]:null;};
export const buildPrimary1Completion=(term,topics,mastered=[])=>{
 const masteredInTerm=topics.filter(t=>mastered.includes(t));
 const complete=topics.length>0&&masteredInTerm.length===topics.length;
 const nextTerm=complete?getNextPrimary1Term(term):null;
 return {term,complete,masteredCount:masteredInTerm.length,total:topics.length,percentage:topics.length?Math.round(masteredInTerm.length/topics.length*100):0,nextTerm,finalYearComplete:complete&&!nextTerm};
};
export const termLabel=term=>({ 'Term 1':'First Term','Term 2':'Second Term','Term 3':'Third Term' }[term]||term);
