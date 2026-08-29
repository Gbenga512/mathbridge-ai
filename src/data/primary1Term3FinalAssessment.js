// Primary 1 Term 3 final assessment and full-year completion rules.
export const PRIMARY1_TERM3_FINAL_ASSESSMENT=[
{id:'p1-t3-final-001',topic:'Time',q:'How many days are in a week?',options:['5','7','8'],answer:'7',explanation:'A week has seven days.'},
{id:'p1-t3-final-002',topic:'Time',q:'Which day comes after Wednesday?',options:['Tuesday','Thursday','Friday'],answer:'Thursday',explanation:'Thursday comes after Wednesday.'},
{id:'p1-t3-final-003',topic:'Geometry',q:'How many sides does a square have?',options:['3','4','5'],answer:'4',explanation:'A square has four sides.'},
{id:'p1-t3-final-004',topic:'Geometry',q:'Which shape is round?',options:['Circle','Triangle','Square'],answer:'Circle',explanation:'A circle is round.'},
{id:'p1-t3-final-005',topic:'Data Handling',q:'A chart has 5 cats and 3 dogs. Which has more?',options:['Cats','Dogs','They are equal'],answer:'Cats',explanation:'5 is greater than 3.'},
{id:'p1-t3-final-006',topic:'Problem Solving',q:'Tola has 6 pencils and gets 2 more. How many pencils?',options:['7','8','9'],answer:'8',explanation:'6 + 2 = 8.'},
{id:'p1-t3-final-007',topic:'Problem Solving',q:'There are 10 oranges. 3 are eaten. How many remain?',options:['6','7','8'],answer:'7',explanation:'10 - 3 = 7.'},
{id:'p1-t3-final-008',topic:'Time',q:'If the minute hand is on 12 and the hour hand is on 5, what time is it?',options:['5 o’clock','12 o’clock','6 o’clock'],answer:'5 o’clock',explanation:'The minute hand on 12 means o’clock, and the hour hand points to 5.'}
];
export const scorePrimary1FinalYear=(term1Score,term2Score,term3Answers)=>{const total=PRIMARY1_TERM3_FINAL_ASSESSMENT.length;const correct=PRIMARY1_TERM3_FINAL_ASSESSMENT.reduce((n,q)=>n+(term3Answers?.[q.id]===q.answer?1:0),0);const term3Score=Math.round(correct/total*100);const overall=Math.round((term1Score+term2Score+term3Score)/3);return{term3Score,overall,completed:term1Score>=80&&term2Score>=80&&term3Score>=80,status:term1Score>=80&&term2Score>=80&&term3Score>=80?'Primary 1 Completed':'Continue Remedial Practice'};};
