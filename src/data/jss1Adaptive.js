// MathBridge JSS1 adaptive seed bank.
// Additional questions used to reduce repetition in practice and mastery.
// Content should be reviewed by a qualified Nigerian Mathematics teacher before commercial launch.
const q=(id,topic,question,options,answer,explanation,difficulty='medium')=>({id,topic,q:question,options,answer,explanation,difficulty});
export const adaptivePractice=[
q('ap-001','Whole Numbers','What is the place value of 6 in 36,412?',['6','60','600','6,000'],3,'The 6 is in the thousands place, so its value is 6,000.','easy'),
q('ap-002','Whole Numbers','What is 4,000 + 700 + 20 + 5?',['4,725','4,205','4,750','4,705'],0,'Add the place values: 4,000 + 700 + 20 + 5 = 4,725.','easy'),
q('ap-003','LCM and HCF','What is the HCF of 15 and 25?',['3','5','10','15'],1,'The common factors include 1 and 5. The biggest is 5.','easy'),
q('ap-004','LCM and HCF','What is the LCM of 4 and 8?',['8','12','16','32'],0,'8 is the first number both 4 and 8 can divide into.','easy'),
q('ap-005','Fractions','Which fraction is bigger: 3/5 or 2/5?',['3/5','2/5','They are equal','Cannot tell'],0,'The denominators are the same, so compare the numerators. 3 is bigger than 2.','easy'),
q('ap-006','Fractions','What is 2/3 - 1/3?',['1/3','1/6','2/3','3/3'],0,'The denominator stays 3. Subtract 1 from 2 to get 1/3.','easy'),
q('ap-007','Counting in Base 2','What is 7 in binary?',['101','110','111','1000'],2,'7 is 4 + 2 + 1, so it is 111 in binary.','medium'),
q('ap-008','Counting in Base 2','What number is 110₂?',['4','5','6','7'],2,'110₂ means 4 + 2 = 6.','medium'),
q('ap-009','Addition and Subtraction','What is 2,906 + 1,087?',['3,893','3,993','4,003','4,093'],1,'Add the numbers carefully: 2,906 + 1,087 = 3,993.','medium'),
q('ap-010','Addition and Subtraction','What is 5,000 - 2,468?',['2,432','2,532','2,632','2,732'],1,'5,000 - 2,468 = 2,532.','medium'),
q('ap-011','Estimation','Estimate 247 + 352 to the nearest hundred.',['500','600','700','800'],1,'247 rounds to 200 and 352 rounds to 400. 200 + 400 = 600.','medium'),
q('ap-012','Approximation','Round 84.6 to the nearest whole number.',['83','84','85','86'],2,'The decimal part is .6, so 84.6 rounds up to 85.','easy'),
q('ap-013','Algebraic Expressions','Simplify 6x + 2x.',['8','8x','12x','x'],1,'6x and 2x are like terms. 6 + 2 = 8, so the answer is 8x.','easy'),
q('ap-014','Simple Equations','If x + 9 = 20, what is x?',['9','10','11','12'],2,'Subtract 9 from 20. x = 11.','easy'),
q('ap-015','Word Problems','A student saves ₦500 each week for 4 weeks. How much is saved?',['₦1,000','₦1,500','₦2,000','₦2,500'],2,'₦500 × 4 = ₦2,000.','easy'),
q('ap-016','Perimeter','A rectangle is 10 cm long and 4 cm wide. What is its perimeter?',['14 cm','20 cm','28 cm','40 cm'],2,'Perimeter = 2(10 + 4) = 28 cm.','medium'),
q('ap-017','Area','A rectangle is 9 cm long and 3 cm wide. What is its area?',['12 cm²','18 cm²','27 cm²','36 cm²'],2,'Area = length × width = 9 × 3 = 27 cm².','easy'),
q('ap-018','Volume','A cuboid measures 2 cm × 4 cm × 5 cm. What is its volume?',['11 cm³','20 cm³','40 cm³','80 cm³'],2,'Volume = 2 × 4 × 5 = 40 cm³.','medium'),
q('ap-019','Angles','Which angle is greater than 90° but less than 180°?',['Acute','Right','Obtuse','Reflex'],2,'An obtuse angle is greater than 90° and less than 180°.','easy'),
q('ap-020','Data Collection','A class records each pupil’s height. What are they collecting?',['Data','Perimeter','Angles','Equations'],0,'The recorded measurements are data.','easy')
];
export const adaptiveTest=[
q('at-001','Whole Numbers','What is the value of 8 in 58,214?',['8','80','800','8,000'],3,'The 8 is in the thousands place.','easy'),
q('at-002','Whole Numbers','Which number is greater?',['6,205','6,250','6,025','6,052'],1,'Compare from left to right. 6,250 is greatest.','easy'),
q('at-003','LCM and HCF','What is the HCF of 18 and 24?',['3','6','9','12'],1,'6 is the biggest number that divides both 18 and 24.','medium'),
q('at-004','LCM and HCF','What is the LCM of 5 and 10?',['10','15','20','50'],0,'10 is the first number both 5 and 10 can divide into.','easy'),
q('at-005','Fractions','What is 3/4 - 1/4?',['1/4','1/2','2/3','3/4'],1,'3/4 - 1/4 = 2/4 = 1/2.','easy'),
q('at-006','Fractions','What is 1/2 + 1/2?',['1/2','1','2','3/2'],1,'Two halves make one whole.','easy'),
q('at-007','Counting in Base 2','What is 100₂ as a decimal number?',['2','3','4','8'],2,'100₂ means 4 in base 10.','medium'),
q('at-008','Counting in Base 2','Which binary number represents 6?',['101','110','111','100'],1,'6 is 4 + 2, which is 110₂.','medium'),
q('at-009','Addition and Subtraction','What is 4,125 + 2,306?',['6,331','6,431','6,531','6,631'],1,'4,125 + 2,306 = 6,431.','medium'),
q('at-010','Addition and Subtraction','What is 7,200 - 3,450?',['3,650','3,750','3,850','4,750'],1,'7,200 - 3,450 = 3,750.','medium'),
q('at-011','Estimation','Estimate 498 + 205 to the nearest hundred.',['600','700','800','900'],1,'498 rounds to 500 and 205 rounds to 200. Total about 700.','medium'),
q('at-012','Approximation','Round 6,748 to the nearest hundred.',['6,700','6,750','6,800','7,000'],0,'The tens digit is 4, so 6,748 rounds to 6,700.','medium'),
q('at-013','Algebraic Expressions','Simplify 7a + 2a.',['9','9a','14a','a'],1,'7a + 2a = 9a.','easy'),
q('at-014','Simple Equations','If 4x = 28, what is x?',['5','6','7','8'],2,'28 divided by 4 equals 7.','easy'),
q('at-015','Word Problems','Four exercise books cost ₦600 each. What is the total cost?',['₦1,800','₦2,000','₦2,400','₦2,600'],2,'₦600 × 4 = ₦2,400.','easy'),
q('at-016','Perimeter','A square has a side of 7 cm. What is its perimeter?',['14 cm','21 cm','28 cm','49 cm'],2,'A square has four equal sides: 4 × 7 = 28 cm.','easy'),
q('at-017','Area','A square has a side of 6 cm. What is its area?',['12 cm²','24 cm²','30 cm²','36 cm²'],3,'Area = side × side = 6 × 6 = 36 cm².','easy'),
q('at-018','Volume','A box is 3 cm × 3 cm × 2 cm. What is its volume?',['8 cm³','12 cm³','18 cm³','24 cm³'],2,'3 × 3 × 2 = 18 cm³.','easy'),
q('at-019','Angles','An angle measures 45°. What type is it?',['Acute','Right','Obtuse','Reflex'],0,'45° is less than 90°, so it is acute.','easy'),
q('at-020','Simple Data Interpretation','A chart shows 14 boys and 16 girls. How many pupils are represented?',['20','28','30','32'],2,'14 + 16 = 30 pupils.','easy')
];
