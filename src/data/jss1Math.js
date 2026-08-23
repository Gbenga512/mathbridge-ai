// MathBridge JSS1 Mathematics content bank.
// Curriculum structure follows the NERDC JSS Mathematics framework.
// Initial product content should be educator-reviewed before commercial launch.
export const jss1Math={level:'JSS 1',curriculum:'Nigeria - NERDC Basic Education Curriculum',strands:[
{name:'Number and Numeration',topics:['Whole Numbers','LCM and HCF','Fractions','Counting in Base 2','Conversion from Base 10 to Binary']},
{name:'Basic Operations',topics:['Addition and Subtraction','Addition and Subtraction of Fractions','Multiplication and Division of Fractions']},
{name:'Derived Operations',topics:['Estimation','Approximation','Addition of Binary Numerals']},
{name:'Algebraic Processes',topics:['Algebraic Expressions','Simple Equations','Word Problems']},
{name:'Mensuration',topics:['Perimeter','Area','Volume']},
{name:'Geometry',topics:['Angles','Triangles','Quadrilaterals','Symmetry']},
{name:'Statistics',topics:['Data Collection','Tables and Charts','Simple Data Interpretation']}
]};
const q=(id,topic,question,options,answer,explanation,difficulty='medium')=>({id,topic,q:question,options,answer,explanation,difficulty});
export const jss1Questions=[
q('j1-001','Whole Numbers','What is the place value of 7 in 47,326?',['7','70','700','7,000'],3,'The 7 is in the thousands place.','easy'),
q('j1-002','Whole Numbers','Which number is greatest?',['3,405','3,450','3,054','3,405'],1,'Compare digits from left to right: 3,450 is greatest.','easy'),
q('j1-003','LCM and HCF','What is the HCF of 12 and 18?',['2','3','6','9'],2,'The highest common factor is 6.','easy'),
q('j1-004','LCM and HCF','What is the LCM of 4 and 6?',['8','10','12','24'],2,'The first common multiple is 12.','medium'),
q('j1-005','Fractions','What is 1/2 + 1/4?',['2/6','3/4','1/6','1/8'],1,'Convert 1/2 to 2/4, then add to get 3/4.','easy'),
q('j1-006','Fractions','What is 3/4 - 1/4?',['1/2','2/8','3/8','1'],0,'3/4 - 1/4 = 2/4 = 1/2.','easy'),
q('j1-007','Fractions','Which fraction is equivalent to 2/3?',['3/5','4/6','5/8','6/10'],1,'Multiply numerator and denominator by 2.','medium'),
q('j1-008','Counting in Base 2','What is decimal 5 in binary?',['100','101','110','111'],1,'5 = 4 + 1, so 101₂.','easy'),
q('j1-009','Counting in Base 2','What decimal number is 1010₂?',['8','9','10','12'],2,'1010₂ = 8 + 2 = 10.','medium'),
q('j1-010','Conversion from Base 10 to Binary','What is decimal 7 in base 2?',['101','110','111','1000'],2,'7 = 4 + 2 + 1, so 111₂.','medium'),
q('j1-011','Addition and Subtraction','What is 3,845 + 2,176?',['5,921','6,021','6,121','6,201'],1,'3,845 + 2,176 = 6,021.','easy'),
q('j1-012','Addition and Subtraction','What is 8,000 - 2,735?',['5,165','5,265','5,365','5,475'],1,'8,000 - 2,735 = 5,265.','medium'),
q('j1-013','Addition and Subtraction of Fractions','What is 2/5 + 1/5?',['2/10','3/5','3/10','1/5'],1,'Same denominator: 2/5 + 1/5 = 3/5.','easy'),
q('j1-014','Multiplication and Division of Fractions','What is 1/2 × 2/3?',['1/3','2/5','3/4','1/6'],0,'2/6 simplifies to 1/3.','medium'),
q('j1-015','Multiplication and Division of Fractions','What is 3/4 ÷ 1/2?',['3/8','1/2','3/2','2'],2,'Multiply by the reciprocal: 3/4 × 2 = 3/2.','hard'),
q('j1-016','Estimation','Estimate 398 + 203 to the nearest hundred.',['500','600','700','800'],1,'398 rounds to 400 and 203 to 200. Total 600.','easy'),
q('j1-017','Approximation','Which is closest to 49.8?',['40','45','50','60'],2,'49.8 is closest to 50.','easy'),
q('j1-018','Addition of Binary Numerals','What is 101₂ + 10₂?',['110₂','111₂','1000₂','1010₂'],1,'5 + 2 = 7, which is 111₂.','medium'),
q('j1-019','Algebraic Expressions','Simplify 3x + 2x.',['5','5x','6x','x'],1,'Like terms combine to 5x.','easy'),
q('j1-020','Algebraic Expressions','If x = 4, what is 2x + 3?',['8','9','11','12'],2,'2(4) + 3 = 11.','medium'),
q('j1-021','Simple Equations','If x + 7 = 12, what is x?',['3','4','5','6'],2,'Subtract 7 from both sides: x = 5.','easy'),
q('j1-022','Simple Equations','If 3x = 18, what is x?',['5','6','7','9'],1,'Divide both sides by 3: x = 6.','easy'),
q('j1-023','Word Problems','A book costs ₦800. How much do 3 books cost?',['₦1,600','₦2,000','₦2,400','₦3,200'],2,'₦800 × 3 = ₦2,400.','easy'),
q('j1-024','Perimeter','What is the perimeter of a rectangle 8 cm long and 3 cm wide?',['11 cm','22 cm','24 cm','26 cm'],1,'2(8 + 3) = 22 cm.','medium'),
q('j1-025','Area','What is the area of a rectangle 7 cm by 4 cm?',['11 cm²','22 cm²','28 cm²','44 cm²'],2,'7 × 4 = 28 cm².','easy'),
q('j1-026','Volume','What is the volume of a cuboid 2 cm × 3 cm × 4 cm?',['9 cm³','18 cm³','24 cm³','36 cm³'],2,'2 × 3 × 4 = 24 cm³.','medium'),
q('j1-027','Angles','An angle measuring 90° is called what?',['Acute','Right','Obtuse','Reflex'],1,'A 90° angle is a right angle.','easy'),
q('j1-028','Triangles','How many sides does a triangle have?',['2','3','4','5'],1,'A triangle has three sides.','easy'),
q('j1-029','Quadrilaterals','How many sides does a quadrilateral have?',['3','4','5','6'],1,'A quadrilateral has four sides.','easy'),
q('j1-030','Symmetry','A shape divided into two matching halves has what?',['A line of symmetry','A radius','A perimeter','A scale'],0,'A line of symmetry creates matching mirror halves.','easy'),
q('j1-031','Data Collection','Which is an example of data?',['A colour preference survey result','A ruler','A triangle','A formula'],0,'Survey responses are collected data.','easy'),
q('j1-032','Tables and Charts','Which chart is useful for comparing categories?',['Bar chart','Compass','Number line','Protractor'],0,'Bar charts compare quantities across categories.','easy'),
q('j1-033','Simple Data Interpretation','A class has 12 boys and 18 girls. How many pupils are there?',['20','28','30','36'],2,'12 + 18 = 30 pupils.','easy')
];
