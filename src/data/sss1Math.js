// SSS 1 Mathematics foundation — Nigerian senior secondary curriculum topics.
export const sss1Questions=[
{id:'sss1-sets-1',topic:'Sets',difficulty:'Easy',q:'If A = {1, 2, 3} and B = {3, 4, 5}, what is A ∩ B?',options:['{1, 2}','{3}','{4, 5}','{1, 2, 3, 4, 5}'],answer:1},
{id:'sss1-indices-1',topic:'Indices',difficulty:'Easy',q:'Simplify 2³ × 2².',options:['2⁵','2⁶','4⁵','4⁶'],answer:0},
{id:'sss1-log-1',topic:'Logarithms',difficulty:'Medium',q:'What is log₁₀(1000)?',options:['2','3','10','100'],answer:1},
{id:'sss1-surds-1',topic:'Surds',difficulty:'Medium',q:'Simplify √50.',options:['5√2','2√5','10√5','25√2'],answer:0},
{id:'sss1-quadratic-1',topic:'Quadratic Equations',difficulty:'Medium',q:'Which is a factorisation of x² − 5x + 6?',options:['(x−1)(x−6)','(x−2)(x−3)','(x+2)(x+3)','(x+1)(x+6)'],answer:1},
{id:'sss1-coordinate-1',topic:'Coordinate Geometry',difficulty:'Easy',q:'What is the midpoint of (2, 4) and (6, 8)?',options:['(4, 6)','(8, 12)','(2, 2)','(3, 4)'],answer:0},
{id:'sss1-trig-1',topic:'Trigonometry',difficulty:'Medium',q:'In a right-angled triangle, sin θ is equal to:',options:['adjacent/hypotenuse','opposite/hypotenuse','opposite/adjacent','hypotenuse/opposite'],answer:1},
{id:'sss1-sequence-1',topic:'Sequences and Series',difficulty:'Easy',q:'What is the next term in 3, 6, 9, 12, ...?',options:['13','14','15','18'],answer:2},
{id:'sss1-stat-1',topic:'Statistics',difficulty:'Easy',q:'Find the mean of 4, 6 and 8.',options:['5','6','7','18'],answer:1},
{id:'sss1-prob-1',topic:'Probability',difficulty:'Easy',q:'A fair die is rolled once. What is the probability of getting a 6?',options:['1/2','1/3','1/6','5/6'],answer:2}
];
export const SSS1_TOPICS=[...new Set(sss1Questions.map(q=>q.topic))];
