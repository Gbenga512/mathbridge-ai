export const SSS2_CURRICULUM={
  'Term 1':{topics:['Functions','Variation','Matrices','Permutations and Combinations']},
  'Term 2':{topics:['Trigonometric Identities','Vectors','Probability','Statistics']},
  'Term 3':{topics:['Differentiation Foundations','Financial Mathematics','Mensuration','Revision and Examination Practice']}
};
export const SSS2_TOPICS=Object.values(SSS2_CURRICULUM).flatMap(x=>x.topics);
