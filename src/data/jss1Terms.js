// JSS1 Mathematics term structure for the MathBridge MVP.
// Term/week structure is based on Nigerian JSS1 scheme-of-work references and should be
// reviewed against the learner's school/state scheme before commercial launch.
export const jss1Terms={
  T1:{label:'First Term',short:'Term 1',weeks:[
    {week:1,topic:'Whole Numbers',focus:'Millions, billions, trillions and quantitative reasoning'},
    {week:2,topic:'Whole Numbers',focus:'Problems involving large numbers'},
    {week:3,topic:'LCM',focus:'Concepts, methods and quantitative reasoning'},
    {week:3,topic:'HCF',focus:'Concepts, methods and quantitative reasoning'},
    {week:4,topic:'Fractions',focus:'Meaning and types of fractions'},
    {week:5,topic:'Fractions',focus:'Equivalent fractions'},
    {week:6,topic:'Fractions',focus:'Ordering and conversion between fractions, decimals and percentages'},
    {week:8,topic:'Addition and Subtraction of Fractions',focus:'Adding and subtracting fractions'},
    {week:9,topic:'Multiplication and Division of Fractions',focus:'Multiplying and dividing fractions; factors and primes'},
    {week:10,topic:'Estimation',focus:'Estimating dimensions, capacity, mass, age and time'},
    {week:11,topic:'Estimation',focus:'First-term revision and examination preparation'}
  ]},
  T2:{label:'Second Term',short:'Term 2',weeks:[
    {week:1,topic:'Estimation',focus:'Revision of first-term difficult areas'},
    {week:2,topic:'Approximation',focus:'Accuracy, rounding, significant figures and decimal places'},
    {week:3,topic:'Approximation',focus:'Approximating arithmetic operations and quantitative reasoning'},
    {week:4,topic:'Counting in Base 2',focus:'Counting and converting base 10 numerals to binary'},
    {week:5,topic:'Counting in Base 2',focus:'Binary multiplication and real-life applications'},
    {week:6,topic:'Basic Operations',focus:'Addition and subtraction using place value and number lines'},
    {week:8,topic:'Basic Operations',focus:'Positive and negative integers'},
    {week:9,topic:'Algebraic Processes',focus:'Symbols, open sentences, coefficients and like terms'},
    {week:10,topic:'Algebraic Processes',focus:'Brackets and quantitative reasoning'},
    {week:11,topic:'Algebraic Processes',focus:'Second-term revision and examination preparation'}
  ]},
  T3:{label:'Third Term',short:'Term 3',weeks:[
    {week:1,topic:'Algebraic Processes',focus:'Revision of second-term difficult areas'},
    {week:2,topic:'Simple Equations',focus:'Translate word problems and solve simple equations'},
    {week:3,topic:'Geometry and Mensuration',focus:'Plane shapes and their properties'},
    {week:4,topic:'Geometry and Mensuration',focus:'Perimeter and area of plane shapes'},
    {week:5,topic:'Geometry and Mensuration',focus:'3D shapes, cubes, cuboids, cylinders and spheres'},
    {week:6,topic:'Angles',focus:'Vertically opposite, adjacent, alternate and corresponding angles'},
    {week:7,topic:'Angles',focus:'Straight-line, complementary, supplementary and triangle angles'},
    {week:8,topic:'Construction',focus:'Parallel/perpendicular lines, bisection and angle construction'},
    {week:9,topic:'Statistics and Data',focus:'Data collection, sources and frequency distribution'},
    {week:10,topic:'Statistics and Data',focus:'Bar charts, pie charts and histograms'},
    {week:11,topic:'Statistics and Data',focus:'Mean, median and mode'},
    {week:12,topic:'Statistics and Data',focus:'Revision and test'}
  ]}
};
export const jss1TermOrder=['T1','T2','T3'];
export const getTermTopics=term=>[...new Set(jss1Terms[term]?.weeks.map(x=>x.topic)||[])];
export const getTermForTopic=topic=>jss1TermOrder.find(t=>jss1Terms[t].weeks.some(x=>x.topic===topic))||'T1';
