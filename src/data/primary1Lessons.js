// Primary 1 lesson cards for MathBridge.
// The topic set is based on the verified NERDC Primary 1-3 Mathematics curriculum.
const lesson=(simple,method,memory,example)=>({simple,method,memory,example});
export const primary1Lessons={
 'Whole numbers 1-5':lesson('Numbers tell us how many things we have. Count objects one at a time from 1 to 5.','Point to each object once while saying 1, 2, 3, 4, 5.','One, two, three, four, five — count what you see.','3 pencils means the number 3.'),
 'Whole number 0 (Zero)':lesson('Zero means there are no objects.','If the group is empty, write 0.','Zero means none.','0 oranges means no oranges.'),
 'Whole numbers 6-9':lesson('After 5 come 6, 7, 8 and 9.','Count forward one number at a time.','Six, seven, eight, nine — keep counting in line.','6, 7, 8, 9.'),
 'Whole number 10':lesson('Ten is a group of ten units.','Count ten objects and group them together.','Ten ones make one ten.','10 = 1 ten.'),
 'Whole numbers 1-99':lesson('Numbers continue from 1 through 99 and can be ordered from smaller to larger.','Compare the tens first, then the units when needed.','Small to big: count forward.','42 is greater than 24.'),
 'Fractions: halves and quarters':lesson('A fraction describes an equal part of a whole. A half has 2 equal parts and a quarter has 4.','Divide the whole into equal parts, then identify one part.','Half = 2 equal parts; quarter = 4 equal parts.','One of two equal parts is 1/2.'),
 'Addition':lesson('Addition means putting quantities together.','Start with the first number and count on by the second number.','Addition means put together.','2 + 3 = 5.'),
 'Subtraction':lesson('Subtraction means taking some away.','Start with the first number and count backwards by the amount taken away.','Subtraction means take away.','5 - 2 = 3.'),
 'Open sentences':lesson('An open sentence has a missing number that must make the statement true.','Try a possible number and check the equation.','Fill the gap to make it true.','3 + __ = 5, so __ = 2.'),
 'Nigerian money':lesson('Nigeria uses the naira. Its symbol is ₦.','Read and compare amounts in naira.','₦ means naira.','₦20 is greater than ₦10.'),
 'Length':lesson('Length tells us how long or short something is.','Place objects side by side with their ends together to compare.','Length = how long.','A ruler is usually longer than an eraser.'),
 'Time':lesson('Time tells us when things happen. A week has 7 days.','Use a clock for daily time and a calendar for days and weeks.','7 days make a week.','Monday to Sunday is one week.'),
 'Weight':lesson('Weight helps us compare how heavy or light objects are.','Compare objects and identify the heavier or lighter one.','Weight = how heavy.','A stone is usually heavier than a feather.'),
 '2-dimensional shapes':lesson('2D shapes are flat shapes.','Look at the outline and count the sides.','2D shapes are flat.','A triangle has 3 sides; a square has 4 equal sides.'),
 '3-dimensional shapes':lesson('3D shapes are solid objects that take up space.','Look at the object from different sides and identify its solid shape.','3D shapes take up space.','A ball is shaped like a sphere.'),
 'Data collection':lesson('Data is information we collect, such as pupils answers to a question.','Ask a clear question, record responses and count them.','Ask, record, count.','If 3 pupils choose rice and 2 choose beans, there are 5 responses.')
};
