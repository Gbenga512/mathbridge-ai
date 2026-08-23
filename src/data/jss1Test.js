// Separate JSS1 short-test questions. These must not be reused in the Maths Check or Practice.
const q=(id,topic,question,options,answer,explanation)=>({id,topic,q:question,options,answer,explanation});
export const jss1TestQuestions=[
q('t-001','Whole Numbers','How much is 3,000 + 450?',['3,350','3,450','3,550','3,650'],1,'Add 3,000 and 450. The answer is 3,450.'),
q('t-002','LCM and HCF','What is the HCF of 10 and 15?',['3','5','10','15'],1,'5 is the biggest number that can divide both 10 and 15.'),
q('t-003','Fractions','What is 2/5 + 1/5?',['2/5','3/5','3/10','1'],1,'The bottom number is the same, so 2 + 1 = 3.'),
q('t-004','Counting in Base 2','What is 5 written in binary?',['101','110','111','100'],0,'5 is 4 + 1, so it is 101 in binary.'),
q('t-005','Conversion from Base 10 to Binary','What is 3 in base 2?',['10','11','100','101'],1,'3 is written as 11 in binary.'),
q('t-006','Addition and Subtraction','What is 6,200 - 1,800?',['4,200','4,300','4,400','4,500'],2,'Take 1,800 away from 6,200. You get 4,400.'),
q('t-007','Addition and Subtraction of Fractions','What is 3/8 - 1/8?',['1/8','2/8','3/8','4/8'],1,'The bottom number is the same. 3 - 1 = 2.'),
q('t-008','Multiplication and Division of Fractions','What is 1/2 ÷ 2?',['1/4','1/2','1','2'],0,'Half divided by 2 is one quarter.'),
q('t-009','Estimation','About how much is 402 + 198?',['400','500','600','700'],2,'402 is about 400 and 198 is about 200. So about 600.'),
q('t-010','Approximation','Round 43 to the nearest ten.',['30','40','50','60'],1,'43 is closer to 40.'),
q('t-011','Addition of Binary Numerals','What is 1₂ + 1₂?',['1₂','10₂','11₂','100₂'],1,'1 + 1 in binary is 10₂.'),
q('t-012','Algebraic Expressions','Simplify 2a + 3a.',['5','5a','6a','a'],1,'2a + 3a = 5a.'),
q('t-013','Simple Equations','If x - 4 = 6, what is x?',['8','9','10','12'],2,'Add 4 to 6. x = 10.'),
q('t-014','Word Problems','A girl has 15 oranges and gives away 6. How many are left?',['7','8','9','10'],2,'15 - 6 = 9.'),
q('t-015','Perimeter','A rectangle is 7 cm long and 2 cm wide. What is its perimeter?',['9 cm','14 cm','18 cm','20 cm'],2,'Add all four sides: 7 + 2 + 7 + 2 = 18 cm.'),
q('t-016','Area','A square has a side of 4 cm. What is its area?',['8 cm²','12 cm²','16 cm²','20 cm²'],2,'Area of a square = side × side. 4 × 4 = 16 cm².'),
q('t-017','Volume','A box is 3 cm long, 2 cm wide and 2 cm high. What is its volume?',['7 cm³','10 cm³','12 cm³','14 cm³'],2,'3 × 2 × 2 = 12 cm³.'),
q('t-018','Angles','How many degrees are in a right angle?',['45°','90°','120°','180°'],1,'A right angle is 90°.'),
q('t-019','Triangles','How many sides does a triangle have?',['2','3','4','5'],1,'A triangle has 3 sides.'),
q('t-020','Quadrilaterals','How many sides does a quadrilateral have?',['3','4','5','6'],1,'A quadrilateral has 4 sides.'),
q('t-021','Symmetry','A shape has one line that divides it into two matching parts. What is this called?',['Symmetry','Area','Volume','Perimeter'],0,'The matching halves show symmetry.'),
q('t-022','Data Collection','A teacher asks 10 pupils how they come to school. What is she collecting?',['Data','Angles','Money','Fractions'],0,'The answers she collects are data.'),
q('t-023','Tables and Charts','Which one is best for showing how many pupils chose each colour?',['Bar chart','Number line','Compass','Formula'],0,'A bar chart makes it easy to compare groups.'),
q('t-024','Simple Data Interpretation','A class has 12 boys and 18 girls. How many pupils are there altogether?',['20','25','30','35'],2,'12 + 18 = 30 pupils.')
];
