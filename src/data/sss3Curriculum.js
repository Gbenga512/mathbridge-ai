export const SSS3_CURRICULUM={
'Term 1':{topics:['Advanced Algebra','Functions and Graphs','Trigonometry','Differentiation']},
'Term 2':{topics:['Integration Foundations','Statistics and Probability','Coordinate Geometry','Financial Mathematics']},
'Term 3':{topics:['Vectors and Transformations','Sequences and Series','Examination Problem Solving','WAEC and NECO Revision']}
};
export const SSS3_TOPICS=Object.values(SSS3_CURRICULUM).flatMap(x=>x.topics);
