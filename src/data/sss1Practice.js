export const SSS1_PRACTICE={
 Sets:[{id:'sets-1',q:'If A={1,2,3} and B={3,4,5}, what is A∩B?',options:['{1,2}','{3}','{1,2,3,4,5}','∅'],answer:1,difficulty:'Easy'},{id:'sets-2',q:'Using the same sets, what is A∪B?',options:['{3}','{1,2,3,4,5}','{1,2}','∅'],answer:1,difficulty:'Medium'}],
 Indices:[{id:'indices-1',q:'Simplify 2³×2².',options:['2⁵','2⁶','4⁵','2'],answer:0,difficulty:'Easy'},{id:'indices-2',q:'Simplify x⁷÷x³.',options:['x²','x³','x⁴','x¹⁰'],answer:2,difficulty:'Medium'}],
 Logarithms:[{id:'logs-1',q:'What is log₂8?',options:['2','3','4','8'],answer:1,difficulty:'Easy'},{id:'logs-2',q:'If log₁₀x=2, find x.',options:['10','20','100','1000'],answer:2,difficulty:'Medium'}],
 Surds:[{id:'surds-1',q:'Simplify √50.',options:['5√2','10√5','25√2','2√5'],answer:0,difficulty:'Easy'},{id:'surds-2',q:'Simplify √12+√27.',options:['5√3','7√3','3√3','√39'],answer:0,difficulty:'Medium'}],
 'Quadratic Equations':[{id:'quad-1',q:'Solve x²−5x+6=0.',options:['1 or 6','2 or 3','−2 or −3','3 or 5'],answer:1,difficulty:'Easy'},{id:'quad-2',q:'For x²−4x−5=0, what is the product of the roots?',options:['−5','5','4','−4'],answer:0,difficulty:'Medium'}],
 'Coordinate Geometry':[{id:'coord-1',q:'Find the midpoint of (2,4) and (6,8).',options:['(4,6)','(8,12)','(2,6)','(3,4)'],answer:0,difficulty:'Easy'},{id:'coord-2',q:'What is the gradient of the line through (1,2) and (3,6)?',options:['1','2','3','4'],answer:1,difficulty:'Medium'}],
 Trigonometry:[{id:'trig-1',q:'In a right triangle, tan θ equals:',options:['opposite/adjacent','adjacent/hypotenuse','opposite/hypotenuse','hypotenuse/opposite'],answer:0,difficulty:'Easy'},{id:'trig-2',q:'If opposite=3 and adjacent=4, what is tan θ?',options:['3/4','4/3','3/5','4/5'],answer:0,difficulty:'Medium'}],
 'Sequences and Series':[{id:'seq-1',q:'What is the common difference in 2,5,8,11?',options:['2','3','4','5'],answer:1,difficulty:'Easy'},{id:'seq-2',q:'Find the 5th term of 2,5,8,11,...',options:['12','13','14','15'],answer:2,difficulty:'Medium'}],
 Statistics:[{id:'stats-1',q:'Find the mean of 2,4,6,8.',options:['4','5','6','20'],answer:1,difficulty:'Easy'},{id:'stats-2',q:'What is the median of 2,5,7,9,12?',options:['5','7','9','12'],answer:1,difficulty:'Medium'}],
 Probability:[{id:'prob-1',q:'What is the probability of rolling a 6 on a fair die?',options:['1/2','1/3','1/6','6/6'],answer:2,difficulty:'Easy'},{id:'prob-2',q:'A bag contains 3 red and 2 blue balls. What is P(red)?',options:['2/5','3/5','1/2','3/2'],answer:1,difficulty:'Medium'}]
};
export const getSSS1PracticeQuestions=(topic)=>SSS1_PRACTICE[topic]||[];
export const getAllSSS1PracticeQuestions=()=>Object.entries(SSS1_PRACTICE).flatMap(([topic,questions])=>questions.map(q=>({...q,topic})));
