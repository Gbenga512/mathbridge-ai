// MathBridge JSS1 Mathematics curriculum map.
// Topic map is based on NERDC's published JSS Mathematics curriculum.
// Verify against the latest NERDC implementation document before commercial launch.
export const jss1Math = {
  level: 'JSS 1',
  curriculum: 'Nigeria - NERDC Basic Education Curriculum',
  strands: [
    { name: 'Number and Numeration', topics: ['Whole Numbers', 'LCM and HCF', 'Fractions', 'Counting in Base 2', 'Conversion from Base 10 to Binary'] },
    { name: 'Basic Operations', topics: ['Addition and Subtraction', 'Addition and Subtraction of Fractions', 'Multiplication and Division of Fractions'] },
    { name: 'Derived Operations', topics: ['Estimation', 'Approximation', 'Addition of Binary Numerals'] },
    { name: 'Algebraic Processes', topics: ['Algebraic Expressions', 'Simple Equations', 'Word Problems'] },
    { name: 'Mensuration', topics: ['Perimeter', 'Area', 'Volume'] },
    { name: 'Geometry', topics: ['Angles', 'Triangles', 'Quadrilaterals', 'Symmetry'] },
    { name: 'Statistics', topics: ['Data Collection', 'Tables and Charts', 'Simple Data Interpretation'] }
  ]
};

export const jss1Questions = [
  {id:'j1-001',topic:'Whole Numbers',q:'What is the place value of 7 in 47,326?',options:['7','70','700','7,000'],answer:3,explanation:'The 7 is in the thousands place, so its value is 7,000.'},
  {id:'j1-002',topic:'LCM and HCF',q:'What is the HCF of 12 and 18?',options:['2','3','6','9'],answer:2,explanation:'The common factors are 1, 2, 3 and 6. The highest is 6.'},
  {id:'j1-003',topic:'Fractions',q:'What is 1/2 + 1/4?',options:['2/6','3/4','1/6','1/8'],answer:1,explanation:'Convert 1/2 to 2/4, then 2/4 + 1/4 = 3/4.'},
  {id:'j1-004',topic:'Fractions',q:'What is 3/4 - 1/4?',options:['1/2','2/8','3/8','1'],answer:0,explanation:'The denominators are the same, so subtract the numerators: 3/4 - 1/4 = 2/4 = 1/2.'},
  {id:'j1-005',topic:'Counting in Base 2',q:'What is the binary representation of decimal 5?',options:['100','101','110','111'],answer:1,explanation:'5 = 4 + 1, so its binary form is 101.'},
  {id:'j1-006',topic:'Addition and Subtraction',q:'What is 3,845 + 2,176?',options:['5,921','6,021','6,121','6,201'],answer:1,explanation:'Add by place value: 3,845 + 2,176 = 6,021.'},
  {id:'j1-007',topic:'Estimation',q:'Estimate 398 + 203 to the nearest hundred.',options:['500','600','700','800'],answer:1,explanation:'398 rounds to 400 and 203 rounds to 200. 400 + 200 = 600.'},
  {id:'j1-008',topic:'Approximation',q:'Which is closest to 49.8?',options:['40','45','50','60'],answer:2,explanation:'49.8 is closest to 50.'},
  {id:'j1-009',topic:'Simple Equations',q:'If x + 7 = 12, what is x?',options:['3','4','5','6'],answer:2,explanation:'Subtract 7 from both sides: x = 5.'},
  {id:'j1-010',topic:'Angles',q:'An angle measuring 90° is called what?',options:['Acute','Right','Obtuse','Reflex'],answer:1,explanation:'A 90° angle is a right angle.'}
];
