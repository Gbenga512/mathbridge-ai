// Primary 2 Mathematics starter bank. Use the applicable NERDC Mathematics curriculum as the source of truth and review before public launch.
const q=(id,topic,question,options,answer,explanation,difficulty='easy')=>({id,topic,q:question,options,answer,explanation,difficulty});
export const primary2Questions=[
q('p2-001','Whole numbers','What is the value of 6 in 64?',['6','60','600','64'],1,'The 6 is in the tens place, so its value is 60.'),
q('p2-002','Whole numbers','What number comes after 79?',['78','79','80','81'],2,'80 comes after 79.'),
q('p2-003','Addition','What is 24 + 15?',['29','39','49','59'],1,'24 + 15 = 39.'),
q('p2-004','Subtraction','What is 52 - 20?',['22','32','42','72'],1,'52 - 20 = 32.'),
q('p2-005','Multiplication','What is 3 × 4?',['7','10','12','14'],2,'3 groups of 4 make 12.'),
q('p2-006','Division','What is 12 ÷ 3?',['3','4','5','6'],1,'12 shared equally into 3 groups gives 4 in each group.'),
q('p2-007','Fractions','Which fraction is one half?',['1/2','1/3','1/4','2/3'],0,'One of two equal parts is one half, written 1/2.'),
q('p2-008','Measurement','How many centimetres are in 1 metre?',['10','50','100','1000'],2,'1 metre is equal to 100 centimetres.'),
q('p2-009','Money','How much is ₦200 + ₦150?',['₦250','₦300','₦350','₦400'],2,'₦200 + ₦150 = ₦350.'),
q('p2-010','Geometry','How many sides does a rectangle have?',['3','4','5','6'],1,'A rectangle has four sides.'),
q('p2-011','Time','How many hours are in one day?',['12','20','24','60'],2,'One day has 24 hours.'),
q('p2-012','Data','Which display is useful for comparing categories?',['Bar chart','Clock','Ruler','Compass'],0,'A bar chart is useful for comparing categories.')
];
