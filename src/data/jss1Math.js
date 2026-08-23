// MathBridge JSS1 Mathematics content bank.
// Based on the Nigerian NERDC JSS Mathematics framework.
// Please have a maths teacher review the content before public launch.
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
q('j1-001','Whole Numbers','Look at 47,326. What is the value of the 7?',['7','70','700','7,000'],3,'The 7 is in the thousands place, so its value is 7,000.','easy'),
q('j1-002','Whole Numbers','Which of these numbers is the biggest?',['3,405','3,450','3,054','3,405'],1,'Look at the numbers from left to right. 3,450 is the biggest.','easy'),
q('j1-003','LCM and HCF','What is the biggest number that can divide both 12 and 18?',['2','3','6','9'],2,'6 can divide both 12 and 18. No bigger number can do that.','easy'),
q('j1-004','LCM and HCF','What is the first number that both 4 and 6 can divide into?',['8','10','12','24'],2,'4 goes into 12 and 6 also goes into 12. So the answer is 12.','medium'),
q('j1-005','Fractions','What do you get when you add 1/2 and 1/4?',['2/6','3/4','1/6','1/8'],1,'Change 1/2 to 2/4. Then 2/4 + 1/4 = 3/4.','easy'),
q('j1-006','Fractions','What do you get when you take 1/4 away from 3/4?',['1/2','2/8','3/8','1'],0,'3/4 - 1/4 = 2/4. And 2/4 is the same as 1/2.','easy'),
q('j1-007','Fractions','Which one means the same thing as 2/3?',['3/5','4/6','5/8','6/10'],1,'Multiply the top and bottom by 2. 2/3 becomes 4/6.','medium'),
q('j1-008','Counting in Base 2','If we write 5 in binary, what do we get?',['100','101','110','111'],1,'5 is 4 + 1, so 5 in binary is 101.','easy'),
q('j1-009','Counting in Base 2','1010₂ is what number in normal counting?',['8','9','10','12'],2,'1010 in binary means 8 + 2. That gives 10.','medium'),
q('j1-010','Conversion from Base 10 to Binary','How do we write 7 in binary?',['101','110','111','1000'],2,'7 is 4 + 2 + 1, so it is 111 in binary.','medium'),
q('j1-011','Addition and Subtraction','What is 3,845 + 2,176?',['5,921','6,021','6,121','6,201'],1,'Add the two numbers. You get 6,021.','easy'),
q('j1-012','Addition and Subtraction','Take 2,735 away from 8,000. What is left?',['5,165','5,265','5,365','5,475'],1,'8,000 - 2,735 = 5,265.','medium'),
q('j1-013','Addition and Subtraction of Fractions','What do you get when you add 2/5 and 1/5?',['2/10','3/5','3/10','1/5'],1,'The bottom numbers are the same. Add the top numbers: 2 + 1 = 3. So the answer is 3/5.','easy'),
q('j1-014','Multiplication and Division of Fractions','What is 1/2 × 2/3?',['1/3','2/5','3/4','1/6'],0,'Multiply top by top and bottom by bottom: 1 × 2 over 2 × 3 = 2/6 = 1/3.','medium'),
q('j1-015','Multiplication and Division of Fractions','What is 3/4 ÷ 1/2?',['3/8','1/2','3/2','2'],2,'Turn 1/2 upside down, then multiply: 3/4 × 2 = 3/2.','hard'),
q('j1-016','Estimation','About how much is 398 + 203, to the nearest hundred?',['500','600','700','800'],1,'398 is about 400 and 203 is about 200. 400 + 200 = 600.','easy'),
q('j1-017','Approximation','49.8 is closest to which number?',['40','45','50','60'],2,'49.8 is very close to 50.','easy'),
q('j1-018','Addition of Binary Numerals','What is 101₂ + 10₂?',['110₂','111₂','1000₂','1010₂'],1,'101 is 5 and 10 is 2. 5 + 2 = 7, and 7 is 111 in binary.','medium'),
q('j1-019','Algebraic Expressions','Make 3x + 2x simpler. What do you get?',['5','5x','6x','x'],1,'3x and 2x are like terms. Add 3 and 2 to get 5x.','easy'),
q('j1-020','Algebraic Expressions','If x is 4, what is 2x + 3?',['8','9','11','12'],2,'Put 4 in place of x: 2 × 4 + 3 = 11.','medium'),
q('j1-021','Simple Equations','If x + 7 = 12, what is x?',['3','4','5','6'],2,'Take 7 away from 12. That leaves 5, so x = 5.','easy'),
q('j1-022','Simple Equations','If 3x = 18, what is x?',['5','6','7','9'],1,'Divide 18 by 3. So x = 6.','easy'),
q('j1-023','Word Problems','One book costs ₦800. How much will 3 books cost?',['₦1,600','₦2,000','₦2,400','₦3,200'],2,'One book is ₦800. So 3 books cost ₦800 × 3 = ₦2,400.','easy'),
q('j1-024','Perimeter','A rectangle is 8 cm long and 3 cm wide. How far is it all the way around?',['11 cm','22 cm','24 cm','26 cm'],1,'Add all four sides: 8 + 3 + 8 + 3 = 22 cm.','medium'),
q('j1-025','Area','A rectangle is 7 cm long and 4 cm wide. How much space is inside it?',['11 cm²','22 cm²','28 cm²','44 cm²'],2,'Area means the space inside. 7 × 4 = 28 cm².','easy'),
q('j1-026','Volume','A box is 2 cm long, 3 cm wide and 4 cm high. How much space is inside it?',['9 cm³','18 cm³','24 cm³','36 cm³'],2,'Multiply the three numbers: 2 × 3 × 4 = 24 cm³.','medium'),
q('j1-027','Angles','An angle is 90°. What do we call it?',['Acute','Right','Obtuse','Reflex'],1,'An angle of 90° is called a right angle.','easy'),
q('j1-028','Triangles','How many sides does a triangle have?',['2','3','4','5'],1,'A triangle has 3 sides.','easy'),
q('j1-029','Quadrilaterals','How many sides does a quadrilateral have?',['3','4','5','6'],1,'A quadrilateral has 4 sides.','easy'),
q('j1-030','Symmetry','A shape has two matching halves. What do we call the line that divides them?',['A line of symmetry','A radius','A perimeter','A scale'],0,'A line of symmetry divides a shape into two matching halves.','easy'),
q('j1-031','Data Collection','Which one is an example of data?',['Answers from a colour survey','A ruler','A triangle','A formula'],0,'Answers from a survey are information we collect. That is data.','easy'),
q('j1-032','Tables and Charts','Which chart is good for comparing different groups?',['Bar chart','Compass','Number line','Protractor'],0,'A bar chart makes it easy to compare different groups.','easy'),
q('j1-033','Simple Data Interpretation','There are 12 boys and 18 girls in a class. How many pupils are there altogether?',['20','28','30','36'],2,'Add them together: 12 + 18 = 30 pupils.','easy')
];
