// Weekly JSS1 roadmap for MathBridge MVP.
// This is a teaching sequence based on the current term map; schools/states may vary.
export const jss1Weekly={
 T1:[
  {week:1,title:'Whole Numbers',focus:'Large numbers and place value',topics:['Whole Numbers']},
  {week:2,title:'Whole Numbers',focus:'Problems involving large numbers',topics:['Whole Numbers']},
  {week:3,title:'LCM & HCF',focus:'Find common multiples and highest common factors',topics:['LCM and HCF']},
  {week:4,title:'Fractions',focus:'Meaning, types and basic fraction ideas',topics:['Fractions']},
  {week:5,title:'Equivalent Fractions',focus:'Recognise and create equivalent fractions',topics:['Fractions']},
  {week:6,title:'Fractions, Decimals & Percentages',focus:'Order and convert simple values',topics:['Fractions']},
  {week:7,title:'First Term Review',focus:'Review and repair difficult areas',topics:['Whole Numbers','LCM and HCF','Fractions']},
  {week:8,title:'Adding & Subtracting Fractions',focus:'Use common denominators correctly',topics:['Addition and Subtraction of Fractions']},
  {week:9,title:'Multiplying & Dividing Fractions',focus:'Multiply and divide fractions and use factors',topics:['Multiplication and Division of Fractions']},
  {week:10,title:'Estimation',focus:'Estimate dimensions, capacity, mass, age and time',topics:['Estimation']},
  {week:11,title:'First Term Mastery',focus:'Final revision and mastery challenge',topics:['Whole Numbers','LCM and HCF','Fractions','Addition and Subtraction of Fractions','Multiplication and Division of Fractions','Estimation']}
 ],
 T2:[
  {week:1,title:'Term 2 Bridge',focus:'Repair difficult First Term skills',topics:['Estimation']},
  {week:2,title:'Approximation',focus:'Rounding, decimal places and significant figures',topics:['Approximation']},
  {week:3,title:'Approximation in Problems',focus:'Approximate calculations and reason with estimates',topics:['Approximation']},
  {week:4,title:'Counting in Base 2',focus:'Count in binary and convert from base 10',topics:['Counting in Base 2','Conversion from Base 10 to Binary']},
  {week:5,title:'Binary Operations',focus:'Work with binary numerals and applications',topics:['Counting in Base 2','Addition of Binary Numerals']},
  {week:6,title:'Basic Operations',focus:'Addition and subtraction using number properties',topics:['Addition and Subtraction']},
  {week:7,title:'Term 2 Review',focus:'Review and repair difficult areas',topics:['Approximation','Counting in Base 2','Addition and Subtraction']},
  {week:8,title:'Integers',focus:'Work with positive and negative numbers',topics:['Addition and Subtraction']},
  {week:9,title:'Algebraic Expressions',focus:'Symbols, coefficients and like terms',topics:['Algebraic Expressions']},
  {week:10,title:'Algebraic Processes',focus:'Brackets and quantitative reasoning',topics:['Algebraic Expressions']},
  {week:11,title:'Second Term Mastery',focus:'Final revision and mastery challenge',topics:['Approximation','Counting in Base 2','Conversion from Base 10 to Binary','Addition and Subtraction','Algebraic Expressions']}
 ],
 T3:[
  {week:1,title:'Algebra Review',focus:'Repair difficult algebra skills from Term 2',topics:['Algebraic Expressions']},
  {week:2,title:'Simple Equations',focus:'Translate and solve simple equations',topics:['Simple Equations']},
  {week:3,title:'Plane Shapes',focus:'Identify and describe common shapes',topics:['Triangles','Quadrilaterals','Symmetry']},
  {week:4,title:'Perimeter & Area',focus:'Measure boundaries and areas of plane shapes',topics:['Perimeter','Area']},
  {week:5,title:'3D Shapes & Volume',focus:'Cubes, cuboids and volume',topics:['Volume']},
  {week:6,title:'Angles',focus:'Angle relationships and properties',topics:['Angles']},
  {week:7,title:'More Angle Relationships',focus:'Straight-line, complementary and supplementary angles',topics:['Angles','Triangles']},
  {week:8,title:'Construction',focus:'Bisection and parallel/perpendicular construction',topics:['Angles']},
  {week:9,title:'Collecting Data',focus:'Sources, collection and frequency',topics:['Data Collection']},
  {week:10,title:'Charts & Graphs',focus:'Read and compare data displays',topics:['Tables and Charts']},
  {week:11,title:'Mean, Median & Mode',focus:'Describe data using averages',topics:['Simple Data Interpretation']},
  {week:12,title:'JSS1 Final Mastery',focus:'Revision and final JSS1 mastery challenge',topics:['Simple Equations','Perimeter','Area','Volume','Angles','Triangles','Quadrilaterals','Symmetry','Data Collection','Tables and Charts','Simple Data Interpretation']}
 ]
};
export const getWeek=(term,week)=>jss1Weekly[term]?.find(x=>x.week===week);
