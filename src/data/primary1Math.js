// Primary 1 Mathematics starter question bank grounded in the NERDC Primary 1-3 Mathematics curriculum.
// Source: https://www.nerdc.gov.ng/content_manager/primary/pri1-3_maths.pdf
const q=(id,topic,question,options,answer,explanation,difficulty='easy')=>({id,topic,q:question,options,answer,explanation,difficulty});
export const primary1Questions=[
q('p1-001','Whole numbers 1-5','How many balls are there if you have 3 balls?',['2','3','4','5'],1,'There are 3 balls, so the number is 3.'),
q('p1-002','Whole numbers 1-5','Which number comes after 2?',['1','2','3','4'],2,'Counting forward from 2 gives 3.'),
q('p1-003','Whole numbers 1-5','Which number is bigger?',['1','2','4','3'],2,'4 is greater than 1, 2 and 3.'),
q('p1-004','Whole numbers 1-5','Put these numbers in counting order: 1, 3, 2. Which order is correct?',['1, 2, 3','3, 2, 1','2, 1, 3','1, 3, 2'],0,'Counting order from smallest to largest is 1, 2, 3.'),
q('p1-005','Whole number 0 (Zero)','Which number means there are no objects?',['1','2','0','5'],2,'Zero, written 0, represents nothing or no objects.'),
q('p1-006','Whole number 0 (Zero)','What is the symbol for zero?',['1','0','9','10'],1,'The symbol for zero is 0.'),
q('p1-007','Whole numbers 6-9','What number comes after 6?',['5','6','7','8'],2,'Counting after 6 gives 7.'),
q('p1-008','Whole numbers 6-9','Which number is the greatest?',['6','8','7','9'],3,'9 is greater than 6, 7 and 8.'),
q('p1-009','Whole number 10','How many units make one group of ten?',['5','8','10','20'],2,'The curriculum introduces 10 as a group of ten units.'),
q('p1-010','Whole number 10','How many tens are in 10?',['0','1','2','10'],1,'10 is one group of ten, so it has 1 ten.'),
q('p1-011','Whole numbers 1-99','Which number is written as twenty?',['12','20','22','2'],1,'Twenty is written as 20.'),
q('p1-012','Whole numbers 1-99','Which number is greater?',['15','18','12','10'],1,'18 is greater than 15, 12 and 10.'),
q('p1-013','Fractions: halves and quarters','If one orange is divided into two equal parts, each part is called what?',['A half','A quarter','A whole','A third'],0,'One of two equal parts is one-half.'),
q('p1-014','Fractions: halves and quarters','Which fraction means one out of four equal parts?',['1/2','1/3','1/4','2/4'],2,'One out of four equal parts is one-quarter, written 1/4.'),
q('p1-015','Fractions: halves and quarters','Which fraction shows half of a whole?',['1/2','1/4','2/3','3/4'],0,'A whole divided into two equal parts gives halves; one part is 1/2.'),
q('p1-016','Addition','What is 2 + 2?',['3','4','5','6'],1,'Combining two objects with two more gives four.'),
q('p1-017','Addition','What is 1 + 3?',['2','3','4','5'],2,'1 plus 3 equals 4.'),
q('p1-018','Addition','What is 5 + 2?',['6','7','8','9'],1,'5 plus 2 equals 7.'),
q('p1-019','Addition','What is 7 + 1?',['6','7','8','9'],2,'7 plus 1 equals 8.'),
q('p1-020','Addition','What is 9 + 0?',['0','8','9','10'],2,'Adding zero does not change a number, so 9 + 0 = 9.')
];
