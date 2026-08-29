// Primary 1 Mathematics question bank grounded in the NERDC Primary 1-3 Mathematics curriculum.
// This file is intentionally structured for gradual expansion. Verified curriculum topics are
// listed in curriculumCatalog.js; questions should be reviewed before commercial launch.
const q=(id,topic,question,options,answer,explanation,difficulty='easy')=>({id,topic,q:question,options,answer,explanation,difficulty});

export const primary1Questions=[
q('p1-001','Whole numbers 1-5','How many balls are there if you have 3 balls?',['2','3','4','5'],1,'There are 3 balls, so the number is 3.'),
q('p1-002','Whole numbers 1-5','Which number comes after 2?',['1','2','3','4'],2,'Counting forward from 2 gives 3.'),
q('p1-003','Whole numbers 1-5','Which number is bigger?',['1','2','4','3'],2,'4 is greater than 1, 2 and 3.'),
q('p1-004','Whole numbers 1-5','Put these numbers in counting order: 1, 3, 2. Which order is correct?',['1, 2, 3','3, 2, 1','2, 1, 3','1, 3, 2'],0,'Counting order from smallest to largest is 1, 2, 3.'),
q('p1-005','Whole number 0 (Zero)','Which number means there are no objects?',['1','2','0','5'],2,'Zero, written 0, represents no objects.'),
q('p1-006','Whole number 0 (Zero)','What is the symbol for zero?',['1','0','9','10'],1,'The symbol for zero is 0.'),
q('p1-007','Whole numbers 6-9','What number comes after 6?',['5','6','7','8'],2,'Counting after 6 gives 7.'),
q('p1-008','Whole numbers 6-9','Which number is the greatest?',['6','8','7','9'],3,'9 is greater than 6, 7 and 8.'),
q('p1-009','Whole number 10','How many units make one group of ten?',['5','8','10','20'],2,'Ten units make one group of ten.'),
q('p1-010','Whole number 10','How many tens are in 10?',['0','1','2','10'],1,'10 is one group of ten, so it has 1 ten.'),
q('p1-011','Whole numbers 1-99','Which number is written as twenty?',['12','20','22','2'],1,'Twenty is written as 20.'),
q('p1-012','Whole numbers 1-99','Which number is greater?',['15','18','12','10'],1,'18 is greater than 15, 12 and 10.'),
q('p1-013','Fractions: halves and quarters','If one orange is divided into two equal parts, each part is called what?',['A half','A quarter','A whole','A third'],0,'One of two equal parts is one-half.'),
q('p1-014','Fractions: halves and quarters','Which fraction means one out of four equal parts?',['1/2','1/3','1/4','2/4'],2,'One out of four equal parts is one-quarter, written 1/4.'),
q('p1-015','Fractions: halves and quarters','Which fraction shows half of a whole?',['1/2','1/4','2/3','3/4'],0,'One of two equal parts is 1/2.'),
q('p1-016','Addition','What is 2 + 2?',['3','4','5','6'],1,'2 plus 2 equals 4.'),
q('p1-017','Addition','What is 1 + 3?',['2','3','4','5'],2,'1 plus 3 equals 4.'),
q('p1-018','Addition','What is 5 + 2?',['6','7','8','9'],1,'5 plus 2 equals 7.'),
q('p1-019','Addition','What is 7 + 1?',['6','7','8','9'],2,'7 plus 1 equals 8.'),
q('p1-020','Addition','What is 9 + 0?',['0','8','9','10'],2,'Adding zero does not change a number, so 9 + 0 = 9.'),

// Additional starter questions for the remaining Primary 1 curriculum areas.
q('p1-021','Subtraction','What is 5 - 2?',['2','3','4','5'],1,'Take 2 away from 5: 5 - 2 = 3.'),
q('p1-022','Subtraction','What is 8 - 3?',['4','5','6','7'],1,'Take 3 away from 8: 8 - 3 = 5.'),
q('p1-023','Subtraction','What is 6 - 0?',['0','5','6','7'],2,'Subtracting zero does not change the number.'),
q('p1-024','Open sentences','Complete the sentence: 3 + __ = 5.',['1','2','3','4'],1,'3 plus 2 equals 5.'),
q('p1-025','Open sentences','Complete the sentence: 7 - __ = 4.',['2','3','4','5'],1,'7 minus 3 equals 4.'),
q('p1-026','Nigerian money','Which of these is the symbol for the Nigerian naira?',['$','£','₦','€'],2,'The Nigerian naira is represented by ₦.'),
q('p1-027','Nigerian money','Which amount is greater?',['₦10','₦5','₦20','₦2'],2,'₦20 is greater than ₦10, ₦5 and ₦2.'),
q('p1-028','Length','Which object is usually longer?',['A pencil','A ruler','A small coin','An eraser'],1,'A ruler is generally longer than the other objects listed.'),
q('p1-029','Time','How many days are there in one week?',['5','6','7','8'],2,'There are 7 days in one week.'),
q('p1-030','Weight','Which is usually heavier?',['A feather','A stone','A leaf','A sheet of paper'],1,'A stone is usually heavier than the other objects listed.'),
q('p1-031','2-dimensional shapes','Which shape has three sides?',['Circle','Triangle','Square','Rectangle'],1,'A triangle has three sides.'),
q('p1-032','2-dimensional shapes','Which shape has four equal sides?',['Triangle','Circle','Square','Oval'],2,'A square has four equal sides.'),
q('p1-033','3-dimensional shapes','Which object is shaped like a ball?',['Cube','Sphere','Cuboid','Cylinder'],1,'A ball has the shape of a sphere.'),
q('p1-034','3-dimensional shapes','Which object has a shape like a box?',['Sphere','Cube','Circle','Triangle'],1,'A box can have the shape of a cube.'),
q('p1-035','Data collection','If 3 pupils like rice and 2 pupils like beans, how many pupils are there altogether?',['4','5','6','7'],1,'3 + 2 = 5 pupils.'),
q('p1-036','Data collection','Which is a way to collect information from pupils?',['Asking questions','Closing your eyes','Sleeping','Running'],0,'Asking questions is a simple way to collect information.'),
q('p1-037','Whole numbers 1-99','Which number comes immediately before 30?',['28','29','31','32'],1,'The number immediately before 30 is 29.'),
q('p1-038','Whole numbers 1-99','Which number comes immediately after 49?',['48','49','50','51'],2,'The number immediately after 49 is 50.'),
q('p1-039','Addition','A child has 4 oranges and gets 3 more. How many oranges does the child have?',['6','7','8','9'],1,'4 + 3 = 7 oranges.'),
q('p1-040','Subtraction','There are 9 mangoes. If 4 are eaten, how many remain?',['4','5','6','7'],1,'9 - 4 = 5 mangoes remain.')
];
