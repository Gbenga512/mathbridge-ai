// MathBridge curriculum catalog. NERDC is the primary curriculum source.
// A class is only marked complete when curriculum, lessons, assessments, progression and reports are implemented and tested.
const p1Topics=[
 ['Number and Numeration','Whole numbers 1-5',['Count correctly up to 5','Write numbers 1-5','Order numbers 1-5']],
 ['Number and Numeration','Whole number 0 (Zero)',['Recognise zero','Read and write 0']],
 ['Number and Numeration','Whole numbers 6-9',['Count, read and write 6-9','Order numbers 6-9']],
 ['Number and Numeration','Whole number 10',['Recognise 10 as a group','Use tens and units']],
 ['Number and Numeration','Whole numbers 1-99',['Read and write numbers 1-99','Order and compare numbers']],
 ['Number and Numeration','Fractions: halves and quarters',['Identify halves and quarters using objects and shapes']],
 ['Basic Operations','Addition',['Add whole numbers within Primary 1 ranges']],
 ['Basic Operations','Subtraction',['Subtract whole numbers within Primary 1 ranges']],
 ['Basic Operations','Open sentences',['Find missing numbers in simple number sentences']],
 ['Everyday Mathematics','Nigerian money',['Recognise and compare Nigerian naira amounts']],
 ['Measurement','Length',['Compare and describe length']],
 ['Measurement','Time',['Recognise basic time periods and calendar sequences']],
 ['Measurement','Weight',['Compare heavy and light objects']],
 ['Geometry','2-dimensional shapes',['Recognise and describe common flat shapes']],
 ['Geometry','3-dimensional shapes',['Recognise common solid shapes']],
 ['Statistics','Data collection',['Collect, record and compare simple class data']]
].map(([theme,topic,objectives])=>({theme,topic,objectives}));

export const curriculumCatalog={
 Primary:{
  'Primary 1':{source:'https://www.nerdc.gov.ng/content_manager/primary/pri1-3_maths.pdf',verified:true,topics:p1Topics},
  'Primary 2':{source:'https://www.nerdc.gov.ng/content_manager/primary/pri1-3_maths.pdf',verified:true,topics:[]},
  'Primary 3':{source:'https://www.nerdc.gov.ng/content_manager/primary/pri1-3_maths.pdf',verified:true,topics:[]},
  'Primary 4':{source:'https://www.nerdc.gov.ng/content_manager/primary/pri4-6_maths.pdf',verified:true,topics:[]},
  'Primary 5':{source:'https://www.nerdc.gov.ng/content_manager/primary/pri4-6_maths.pdf',verified:true,topics:[]},
  'Primary 6':{source:'https://www.nerdc.gov.ng/content_manager/primary/pri4-6_maths.pdf',verified:true,topics:[]}
 },
 JSS:{
  'JSS 1':{source:'https://nerdc.gov.ng/content_manager/jss/jss1-3_maths.pdf',verified:true,topics:[]},
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
export const getCurriculumTopics=(level,className)=>getCurriculum(level,className)?.topics||[];
