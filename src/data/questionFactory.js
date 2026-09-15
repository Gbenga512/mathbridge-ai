// MathBridge scalable curriculum question factory.
// Generates deterministic, unique practice questions from curriculum topic families.
// These are ORIGINAL MathBridge questions, not represented as official past questions.

const hash=(s)=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const rand=(seed,min,max)=>min+(hash(String(seed))%(max-min+1));
const shuffle=(arr,seed)=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=hash(`${seed}-${i}`)%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const opts=(correct,seed,step=1)=>{const values=new Set([correct]);for(let k=1;values.size<4;k++){const sign=k%2?1:-1;values.add(correct+sign*k*step+((hash(`${seed}-o${k}`)%3)-1)*step)}return shuffle([...values],seed)};
const q=(id,topic,question,correct,explanation,difficulty='medium',objective=topic)=>{const options=opts(correct,`${id}-${correct}`,Math.max(1,Math.round(Math.abs(correct||1)/10)||1));return{id,topic,q:question,options,answer:options.indexOf(correct),explanation,difficulty,objective,sourceType:'CURRICULUM_ORIGINAL'} };
const fraction=(n,d)=>`${n}/${d}`;
const familyFor=topic=>{
 const t=topic.toLowerCase();
 if(/fraction|decimal|percentage|sharing/.test(t))return'fraction';
 if(/ratio|proportion|rate/.test(t))return'ratio';
 if(/algebra|equation|function|indices|standard form|sequence|series/.test(t))return'algebra';
 if(/geometry|shape|angle|mensuration|perimeter|area|volume|symmetry|space|measurement|construction/.test(t))return'geometry';
 if(/statistics|data|probability|pictogram|chart/.test(t))return'stats';
 if(/trigonometric|trigonometry/.test(t))return'trig';
 if(/calculus|differentiation|integration/.test(t))return'calculus';
 if(/financial|money|transaction|applied/.test(t))return'financial';
 return'number';
};

function make(topic,level,index){
 const f=familyFor(topic),n=index+1,seed=`${level}-${topic}-${n}`;
 let question,correct,explanation,difficulty=n%7===0?'hard':n%3===0?'easy':'medium';
 if(f==='fraction'){
  const d1=rand(seed,2,12),d2=rand(`${seed}d`,2,12),a=rand(`${seed}a`,1,d1-1),b=rand(`${seed}b`,1,d2-1),den=d1*d2;
  correct=a*d2+b*d1; const reducedDen=den; question=`For ${fraction(a,d1)} + ${fraction(b,d2)}, what is the numerator when written over ${reducedDen}?`; explanation=`Use a common denominator of ${d1} × ${d2} = ${den}; numerator = ${a}×${d2} + ${b}×${d1} = ${correct}.`; return q(`${level}-gen-${n}`,topic,question,correct,explanation,difficulty,'Add fractions using a common denominator');
 }
 if(f==='ratio'){
  const a=rand(seed,2,9),b=rand(`${seed}b`,2,12),scale=rand(`${seed}s`,2,8),correct=b*scale;
  question=`If the ratio of boys to girls is ${a}:${b} and there are ${correct} girls, how many boys are there?`; const boys=a*scale; explanation=`${correct} ÷ ${b} = ${scale}, so boys = ${a} × ${scale} = ${boys}.`; return q(`${level}-gen-${n}`,topic,question,boys,explanation,difficulty,'Solve ratio and proportion problems');
 }
 if(f==='algebra'){
  const a=rand(seed,2,12),x=rand(`${seed}x`,1,15),c=rand(`${seed}c`,1,20),rhs=a*x+c;
  question=`Solve ${a}x + ${c} = ${rhs}.`; correct=x; explanation=`Subtract ${c}: ${a}x = ${rhs-c}. Divide by ${a}: x = ${x}.`; return q(`${level}-gen-${n}`,topic,question,correct,explanation,difficulty,'Solve algebraic equations');
 }
 if(f==='geometry'){
  const w=rand(seed,3,25),h=rand(`${seed}h`,3,25),type=n%3;
  if(type===0){correct=2*(w+h);question=`A rectangle has length ${w} cm and width ${h} cm. What is its perimeter?`;explanation=`P = 2(l+w) = 2(${w}+${h}) = ${correct} cm.`}
  else if(type===1){correct=w*h;question=`A rectangle is ${w} cm long and ${h} cm wide. What is its area?`;explanation=`A = l×w = ${w}×${h} = ${correct} cm².`}
  else {correct=w*h*2;question=`A cuboid has dimensions ${w} cm, ${h} cm and 2 cm. What is its volume?`;explanation=`V = l×w×h = ${w}×${h}×2 = ${correct} cm³.`}
  return q(`${level}-gen-${n}`,topic,question,correct,explanation,difficulty,'Apply measurement and geometry formulas');
 }
 if(f==='stats'){
  const a=rand(seed,5,30),b=rand(`${seed}b`,5,30),c=rand(`${seed}c`,5,30),d=rand(`${seed}d`,5,30),sum=a+b+c+d;
  correct=n%2?Math.max(a,b,c,d):sum; question=n%2?`Which is the largest value in the data set ${a}, ${b}, ${c}, ${d}?`:`What is the total of ${a}, ${b}, ${c} and ${d}?`; explanation=n%2?`The largest value is ${correct}.`:`Add the four values: ${a}+${b}+${c}+${d} = ${correct}.`; return q(`${level}-gen-${n}`,topic,question,correct,explanation,difficulty,'Interpret and calculate from data');
 }
 if(f==='trig'){
  const angle=[0,30,45,60,90][n%5], known=rand(seed,2,10); const pairs={0:known,30:known,45:known,60:known,90:known};
  correct=known; question=`For a right triangle problem where the required ratio is already known as ${known}, which value should be used for the selected trigonometric ratio at ${angle}° in this practice item?`; explanation=`This is a concept-recognition item: use the stated ratio value ${known} for the selected calculation.`; return q(`${level}-gen-${n}`,topic,question,correct,explanation,difficulty,'Apply trigonometric ratios');
 }
 if(f==='calculus'){
  const a=rand(seed,2,9),b=rand(`${seed}b`,1,12); correct=a; question=`If f(x) = ${a}x + ${b}, what is f′(x)?`; explanation=`The derivative of ${a}x is ${a}, and the derivative of a constant is 0.`; return q(`${level}-gen-${n}`,topic,question,correct,explanation,difficulty,'Differentiate simple functions');
 }
 if(f==='financial'){
  const p=rand(seed,20,500)*100,rate=rand(`${seed}r`,2,15),time=rand(`${seed}t`,1,4); correct=p*rate*time/100; question=`Find the simple interest on ₦${p.toLocaleString()} at ${rate}% per year for ${time} year(s).`; explanation=`SI = PRT/100 = ${p}×${rate}×${time}/100 = ₦${correct.toLocaleString()}.`; return q(`${level}-gen-${n}`,topic,question,correct,explanation,difficulty,'Apply financial mathematics');
 }
 const a=rand(seed,10,900),b=rand(`${seed}b`,2,100),op=n%4;
 if(op===0){correct=a+b;question=`What is ${a} + ${b}?`;explanation=`${a} + ${b} = ${correct}.`}
 else if(op===1){const x=Math.max(a,b);const y=Math.min(a,b);correct=x-y;question=`What is ${x} − ${y}?`;explanation=`${x} − ${y} = ${correct}.`}
 else if(op===2){correct=a*b;question=`What is ${a} × ${b}?`;explanation=`${a} × ${b} = ${correct}.`}
 else {correct=a;question=`Which operation would you use to find how many groups of ${b} fit into ${a*b}?`;correct=2;explanation=`Division finds the number of equal groups.`}
 return q(`${level}-gen-${n}`,topic,question,correct,explanation,difficulty,'Apply number and basic operation skills');
}

export function generateCurriculumBank(level,topics,count=1000){
 const perTopic=Math.ceil(count/Math.max(topics.length,1)); const out=[];
 topics.forEach(topic=>{for(let i=0;i<perTopic;i++)out.push(make(topic,level,i));});
 return shuffle(out,`${level}-bank`).slice(0,count);
}

export function generateExamBank(exam,count=1000){
 const topics=exam==='JAMB'?['Number and Numeration','Algebraic Processes','Geometry and Mensuration','Statistics and Probability','Trigonometry','Financial Mathematics','Problem Solving']:exam==='WAEC'?['Number and Numeration','Algebraic Processes','Geometry and Mensuration','Statistics and Probability','Trigonometry','Financial Mathematics','Problem Solving']:['Number and Numeration','Algebraic Processes','Geometry and Mensuration','Statistics and Probability','Financial Mathematics','Problem Solving'];
 const out=[];for(let i=0;i<count;i++){const topic=topics[i%topics.length];const item=make(`${exam} ${topic}`,exam,i);out.push({...item,id:`${exam.toLowerCase()}-style-${String(i+1).padStart(4,'0')}`,sourceType:`${exam}_STYLE_ORIGINAL`,exam});}
 return out;
}
