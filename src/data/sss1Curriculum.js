export const SSS1_CURRICULUM={
  'Term 1':{label:'Term 1',topics:['Sets','Indices','Logarithms','Surds']},
  'Term 2':{label:'Term 2',topics:['Quadratic Equations','Coordinate Geometry','Trigonometry']},
  'Term 3':{label:'Term 3',topics:['Sequences and Series','Statistics','Probability']}
};
export const SSS1_TOPICS=Object.values(SSS1_CURRICULUM).flatMap(x=>x.topics);
