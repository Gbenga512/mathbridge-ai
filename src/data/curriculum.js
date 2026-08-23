// MathBridge curriculum framework.
// The level structure follows NERDC's New Revised Basic Education Curriculum
// (Primary 1-6 and JSS 1-3) and New Revised Senior Secondary Education Curriculum
// (SSS 1-3). Topic mapping is an initial product map and should be reviewed against
// the current official mathematics documents before commercial curriculum claims.
export const curriculumSource={
  name:'Nigerian Educational Research and Development Council (NERDC)',
  basicUrl:'https://nerdc.gov.ng/content_manager/new_curriculum_home.html',
  seniorUrl:'https://nerdc.gov.ng/content_manager/new_senior_curriculum_home.html'
};

const foundation=[
  'Number and Numeration','Basic Operations','Fractions, Decimals and Percentages',
  'Ratio, Proportion and Rates','Algebraic Thinking','Geometry and Measurement',
  'Data, Statistics and Probability','Mathematical Reasoning and Word Problems'
];

export const curriculum={
  primary:{
    label:'Primary School',
    levels:{
      P1:{label:'Primary 1',topics:['Counting and Number Sense','Basic Operations','Shapes and Space','Measurement','Patterns and Simple Data']},
      P2:{label:'Primary 2',topics:['Number Operations','Fractions and Sharing','Measurement','Shapes and Patterns','Simple Data']},
      P3:{label:'Primary 3',topics:['Number Operations','Fractions','Money and Measurement','Geometry','Patterns and Data']},
      P4:{label:'Primary 4',topics:foundation.slice(0,7)},
      P5:{label:'Primary 5',topics:foundation},
      P6:{label:'Primary 6',topics:foundation}
    }
  },
  jss:{
    label:'Junior Secondary School',
    levels:{
      JSS1:{label:'JSS 1',topics:['Number Bases and Numeration','Fractions, Decimals and Percentages','Directed Numbers','Algebraic Expressions','Simple Equations','Geometry and Measurement','Statistics and Data','Word Problems']},
      JSS2:{label:'JSS 2',topics:['Number and Standard Form','Ratio, Proportion and Rates','Approximation and Estimation','Algebraic Processes','Linear Equations','Plane Geometry and Mensuration','Statistics and Probability','Practical Word Problems']},
      JSS3:{label:'JSS 3',topics:['Number and Numeration','Indices and Standard Form','Algebraic Processes','Equations and Graphs','Geometry and Mensuration','Statistics and Probability','Financial Mathematics','Problem Solving']}
    }
  },
  sss:{
    label:'Senior Secondary School',
    levels:{
      SSS1:{label:'SSS 1',topics:['Number and Numeration','Algebraic Processes','Geometry and Mensuration','Statistics and Probability','Trigonometric Foundations','Mathematical Modelling and Applications']},
      SSS2:{label:'SSS 2',topics:['Algebra and Functions','Sequences and Series','Coordinate Geometry','Trigonometry','Statistics and Probability','Financial and Applied Mathematics']},
      SSS3:{label:'SSS 3',topics:['Advanced Algebra','Functions and Graphs','Trigonometry','Statistics and Probability','Calculus Foundations','Examination Problem Solving']}
    }
  }
};

export const levelOptions=Object.values(curriculum).flatMap(group=>Object.entries(group.levels).map(([value,level])=>({value,label:level.label,group:group.label})));
