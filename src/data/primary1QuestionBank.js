// Initial curriculum-aligned Primary 1 Mathematics practice bank.
export const PRIMARY1_QUESTIONS=[
{id:'p1-t1-numbers-001',term:'Term 1',topic:'Counting and Number Recognition',question:'Which number comes after 4?',options:['3','5','6'],answer:'5',explanation:'Counting forward from 4 gives 5.',difficulty:'easy'},
{id:'p1-t1-addition-001',term:'Term 1',topic:'Addition',question:'What is 2 + 3?',options:['4','5','6'],answer:'5',explanation:'Put 2 and 3 together: 2 + 3 = 5.',difficulty:'easy'},
{id:'p1-t1-subtraction-001',term:'Term 1',topic:'Subtraction',question:'What is 5 - 2?',options:['2','3','4'],answer:'3',explanation:'Take 2 away from 5 and 3 remain.',difficulty:'easy'},
{id:'p1-t1-pattern-001',term:'Term 1',topic:'Patterns',question:'What comes next: 2, 4, 6, __?',options:['7','8','9'],answer:'8',explanation:'The pattern adds 2 each time.',difficulty:'easy'},
{id:'p1-t2-fractions-001',term:'Term 2',topic:'Fractions',question:'What do we call one of two equal parts?',options:['Half','Whole','Three'],answer:'Half',explanation:'One of two equal parts is called a half.',difficulty:'easy'},
{id:'p1-t2-money-001',term:'Term 2',topic:'Money',question:'Which is used to buy things in Nigeria?',options:['Naira','Metre','Litre'],answer:'Naira',explanation:'The naira is Nigeria’s currency.',difficulty:'easy'},
{id:'p1-t3-time-001',term:'Term 3',topic:'Time',question:'How many days are in one week?',options:['5','7','10'],answer:'7',explanation:'A week has seven days.',difficulty:'easy'},
{id:'p1-t3-geometry-001',term:'Term 3',topic:'Geometry',question:'Which shape has 3 sides?',options:['Circle','Triangle','Square'],answer:'Triangle',explanation:'A triangle has three sides.',difficulty:'easy'}
];
export const getPrimary1Questions=(term,topic)=>PRIMARY1_QUESTIONS.filter(q=>(!term||q.term===term)&&(!topic||q.topic===topic));
