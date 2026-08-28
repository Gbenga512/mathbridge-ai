// MathBridge curriculum catalog. Official curriculum references are from NERDC.
// Content is only marked VERIFIED where the source material has been checked.
export const curriculumCatalog={
 Primary:{
  'Primary 1':{source:'https://www.nerdc.gov.ng/content_manager/primary/pri1-3_maths.pdf',verified:true,topics:[
   {theme:'Number and Numeration',topic:'Whole numbers 1-5',objectives:['Count correctly up to 5','Write numbers 1-5','Order numbers 1-5']},
   {theme:'Number and Numeration',topic:'Whole number 0 (Zero)',objectives:['Recognize 0 as nothingness','Read 0','Write 0']},
   {theme:'Number and Numeration',topic:'Whole numbers 6-9',objectives:['Count and read 1-9','Write 6-9','Order 6-9']},
   {theme:'Number and Numeration',topic:'Whole number 10',objectives:['Recognize 10 as a group','Use tens and units']},
   {theme:'Number and Numeration',topic:'Whole numbers 1-99',objectives:['Identify and read numbers 1-99','Write numbers 1-99']},
   {theme:'Number and Numeration',topic:'Fractions: halves and quarters',objectives:['Identify 1/2 and 1/4 using objects and shapes']},
   {theme:'Basic Operations',topic:'Addition',objectives:['Add whole numbers within the stated curriculum ranges']}
  ]},
  'Primary 2':{source:'https://www.nerdc.gov.ng/content_manager/primary/pri1-3_maths.pdf',verified:true,topics:[]},
  'Primary 3':{source:'https://www.nerdc.gov.ng/content_manager/primary/pri1-3_maths.pdf',verified:true,topics:[]}
 },
 JSS:{
  'JSS 1':{source:'https://nerdc.gov.ng/content_manager/jss/jss1-3_maths.pdf',verified:true,topics:[
   {theme:'Numbers and Numeration',topic:'Whole Numbers',objectives:['Work with whole numbers according to the curriculum']},
   {theme:'Numbers and Numeration',topic:'LCM and HCF',objectives:['Find LCM and HCF']},
   {theme:'Numbers and Numeration',topic:'Fractions',objectives:['Perform operations with fractions']},
   {theme:'Numbers and Numeration',topic:'Counting in Base 2',objectives:['Count and represent numbers in base 2']},
   {theme:'Numbers and Numeration',topic:'Conversion from Base 10 to Binary',objectives:['Convert base-10 numbers to binary']},
   {theme:'Basic Operations',topic:'Addition and Subtraction',objectives:['Perform addition and subtraction']},
   {theme:'Basic Operations',topic:'Addition and Subtraction of Fractions',objectives:['Add and subtract fractions']},
   {theme:'Basic Operations',topic:'Multiplication and Division of Fractions',objectives:['Multiply and divide fractions']},
   {theme:'Derived Operations',topic:'Estimation',objectives:['Estimate numerical results']},
   {theme:'Derived Operations',topic:'Approximation',objectives:['Approximate numerical values']},
   {theme:'Algebraic Processes',topic:'Algebraic Expressions',objectives:['Simplify and evaluate algebraic expressions']},
   {theme:'Algebraic Processes',topic:'Simple Equations',objectives:['Solve simple equations']},
   {theme:'Mensuration and Geometry',topic:'Plane Shapes',objectives:['Find perimeter and area of plane shapes']},
   {theme:'Mensuration and Geometry',topic:'Angles',objectives:['Identify and work with angles']},
   {theme:'Statistics',topic:'Data Collection',objectives:['Collect and organize data']}
  ]},
  'JSS 2':{source:'https://nerdc.gov.ng/content_manager/jss/jss1-3_maths.pdf',verified:true,topics:[]},
  'JSS 3':{source:'https://nerdc.gov.ng/content_manager/jss/jss1-3_maths.pdf',verified:true,topics:[]}
 },
 SSS:{
  'SSS 1':{source:'https://www.nerdc.gov.ng/content_manager/new_senior_curriculum_home.html',verified:true,topics:[]},
  'SSS 2':{source:'https://www.nerdc.gov.ng/content_manager/new_senior_curriculum_home.html',verified:true,topics:[]},
  'SSS 3':{source:'https://www.nerdc.gov.ng/content_manager/new_senior_curriculum_home.html',verified:true,topics:[]}
 }
};
export const getCurriculum=(level,className)=>curriculumCatalog[level]?.[className]||null;
