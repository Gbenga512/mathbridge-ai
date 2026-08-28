// MathBridge curriculum registry based on the official Nigerian Educational Research
// and Development Council (NERDC) curriculum sources. Do not invent topics for
// classes whose current official content has not been imported and verified.
export const NIGERIA_MATH_CURRICULUM={
 Primary:{
  'Primary 1':{edition:'September 2025',source:'https://lmis.nerdcportals.com.ng/pry_1',status:'official-source-linked'},
  'Primary 2':{edition:'September 2025',source:'https://lmis.nerdcportals.com.ng/pry_2',status:'official-source-linked'},
  'Primary 3':{edition:'September 2025',source:'https://lmis.nerdcportals.com.ng/pry_3',status:'official-source-linked'},
  'Primary 4':{edition:'September 2025',source:'https://lmis.nerdcportals.com.ng/pry_4',status:'official-source-linked'},
  'Primary 5':{edition:'September 2025',source:'https://lmis.nerdcportals.com.ng/pry_5',status:'official-source-linked'},
  'Primary 6':{edition:'September 2025',source:'https://lmis.nerdcportals.com.ng/pry_6',status:'official-source-linked'}
 },
 JSS:{
  'JSS 1':{edition:'September 2025',source:'https://lmis.nerdcportals.com.ng/jss_1',status:'official-source-linked'},
  'JSS 2':{edition:'September 2025',source:'https://lmis.nerdcportals.com.ng/jss_2',status:'official-source-linked'},
  'JSS 3':{edition:'September 2025',source:'https://lmis.nerdcportals.com.ng/jss_3',status:'official-source-linked'}
 },
 SSS:{
  'SSS 1':{edition:'September 2025',source:'https://lmis.nerdcportals.com.ng/sss_1',status:'official-source-linked'},
  'SSS 2':{edition:'September 2025',source:'https://lmis.nerdcportals.com.ng/sss_2',status:'official-source-linked'},
  'SSS 3':{edition:'September 2025',source:'https://lmis.nerdcportals.com.ng/sss_3',status:'official-source-linked'}
 }
};

export function getNigeriaMathCurriculum(level,className){return NIGERIA_MATH_CURRICULUM[level]?.[className]||null}
