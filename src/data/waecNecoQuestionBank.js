import{WAEC_NECO_EXPANDED_BANK}from'./waecNecoQuestionBankExpanded';
export const WAEC_NECO_QUESTION_BANK=[
{exam:'WAEC',id:'W001',topic:'Algebra',difficulty:'Medium',question:'Solve 2x + 5 = 17.',options:['4','5','6','7'],answer:'6',explanation:'Subtract 5 and divide by 2.'},
{exam:'WAEC',id:'W002',topic:'Trigonometry',difficulty:'Medium',question:'If sin θ = 1/2 and θ is acute, find θ.',options:['30°','45°','60°','90°'],answer:'30°',explanation:'The acute angle whose sine is 1/2 is 30°.'},
{exam:'WAEC',id:'W003',topic:'Statistics',difficulty:'Easy',question:'Find the mean of 4, 6, 8 and 10.',options:['6','7','8','9'],answer:'7',explanation:'(4+6+8+10)/4 = 7.'},
{exam:'NECO',id:'N001',topic:'Algebra',difficulty:'Medium',question:'If x² = 49, what are the possible values of x?',options:['7 only','-7 only','±7','49'],answer:'±7',explanation:'Both 7 and -7 have square 49.'},
{exam:'NECO',id:'N002',topic:'Probability',difficulty:'Easy',question:'A fair die is thrown once. What is the probability of getting a 4?',options:['1/2','1/4','1/6','1/3'],answer:'1/6',explanation:'There is one favourable outcome among six equally likely outcomes.'},
{exam:'NECO',id:'N003',topic:'Coordinate Geometry',difficulty:'Medium',question:'What is the gradient of the line through (1,2) and (3,6)?',options:['1','2','3','4'],answer:'2',explanation:'Gradient = (6-2)/(3-1) = 2.'},
...WAEC_NECO_EXPANDED_BANK
];
export const getExamQuestions=(exam,count=50)=>{const pool=WAEC_NECO_QUESTION_BANK.filter(q=>q.exam===exam);return[...pool].sort(()=>Math.random()-.5).slice(0,count)};
