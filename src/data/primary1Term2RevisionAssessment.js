// Primary 1 Term 2 revision and assessment.
export const PRIMARY1_TERM2_REVISION_ASSESSMENT=[
{id:'p1-t2-final-001',topic:'Multiplication Concepts',q:'What is 2 × 3?',options:['5','6','7'],answer:'6',explanation:'2 groups of 3 make 6.'},
{id:'p1-t2-final-002',topic:'Division Concepts',q:'What is 6 ÷ 2?',options:['2','3','4'],answer:'3',explanation:'6 shared into 2 equal groups gives 3.'},
{id:'p1-t2-final-003',topic:'Fractions',q:'Two halves make one what?',options:['Whole','Third','Quarter'],answer:'Whole',explanation:'Two equal halves make one whole.'},
{id:'p1-t2-final-004',topic:'Measurement',q:'Which is heavier: a stone or a feather?',options:['Stone','Feather','Both'],answer:'Stone',explanation:'A stone is heavier than a feather.'},
{id:'p1-t2-final-005',topic:'Money',q:'You have ₦20 and spend ₦10. How much remains?',options:['₦5','₦10','₦15'],answer:'₦10',explanation:'₦20 - ₦10 = ₦10.'},
{id:'p1-t2-final-006',topic:'Multiplication Concepts',q:'What is 2 × 5?',options:['8','10','12'],answer:'10',explanation:'Two groups of five make ten.'},
{id:'p1-t2-final-007',topic:'Division Concepts',q:'Share 8 sweets equally between 4 children. How many each?',options:['1','2','4'],answer:'2',explanation:'8 ÷ 4 = 2.'},
{id:'p1-t2-final-008',topic:'Measurement',q:'Which holds more: a bucket or a cup?',options:['Cup','Bucket','Same'],answer:'Bucket',explanation:'A bucket normally holds more than a cup.'}
];
export const scorePrimary1Term2=(answers)=>{const total=PRIMARY1_TERM2_REVISION_ASSESSMENT.length;const correct=PRIMARY1_TERM2_REVISION_ASSESSMENT.reduce((n,q)=>n+(answers?.[q.id]===q.answer?1:0),0);return{total,correct,score:Math.round(correct/total*100),mastered:correct/total>=.8};};
