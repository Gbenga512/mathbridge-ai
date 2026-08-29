// Primary 1 Mathematics curriculum structure for the Nigerian learner journey.
export const PRIMARY1_CURRICULUM={level:'Primary',className:'Primary 1',subject:'Mathematics',terms:{'Term 1':['Counting and Number Recognition','Place Value','Addition','Subtraction','Patterns'],'Term 2':['Multiplication Concepts','Division Concepts','Fractions','Measurement','Money'],'Term 3':['Time','Geometry','Data Handling','Problem Solving','Revision and Assessment']}};
export const getPrimary1Topics=term=>PRIMARY1_CURRICULUM.terms[term]||[];
