// MathBridge production question factory.
// Creates original, curriculum-aligned questions. Foreign resources may inform
// topic coverage and pedagogy, but their question wording is never copied.
const hash=s=>{let h=2166136261;for(let i=0;i<String(s).length;i++){h^=String(s).charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const rand=(seed,min,max)=>min+hash(seed)%(Math.max(1,max-min+1));
const shuffle=(arr,seed)=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=hash(`${seed}-${i}`)%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const options=(correct,seed,step=1)=>{const c=Number(correct),s=new Set([c]);for(let k=1;s.size<4;k++){const d=((hash(`${seed}-d-${k}`)%7)+1)*step;s.add(c+(k%2?d:-d))}return shuffle([...s],seed)};
const q=(id,topic,text,correct,explanation,difficulty,objective,step=1)=>{const os=options(correct,`${id}-${correct}`,step);return{id,topic,q:text,options:os,answer:os.indexOf(Number(correct)),explanation,difficulty,objective,sourceType:'CURRICULUM_ORIGINAL'}};
const difficultyFor=(i,level)=>{const n=i%12;if(n===0||n===11)return'challenge';if(n%4===0||(/^P[1-3]$/.test(level)&&n%3===0))return'easy';return'medium'};
const familyFor=topic=>{const t=String(topic).toLowerCase();
 if(/set|venn/.test(t))return'sets';
 if(/fraction|decimal|percentage|sharing|ratio|proportion|rate|variation/.test(t))return'fraction';
 if(/statistics|data|probability|pictogram|chart|mean|median|mode|range/.test(t))return'stats';
 if(/trigonometric|trigonometry/.test(t))return'trig';
 if(/calculus|differentiation|integration/.test(t))return'calculus';
 if(/financial|money|transaction|profit|loss|discount|interest|applied/.test(t))return'financial';
 if(/coordinate|geometry|shape|angle|mensuration|perimeter|area|volume|symmetry|space|measurement|construction/.test(t))return'geometry';
 if(/matrix|matrices/.test(t))return'matrix';
 if(/permutation|combination/.test(t))return'counting';
 if(/vector/.test(t))return'vector';
 if(/sequence|series/.test(t))return'sequence';
 if(/logarithm|log\b|indices|index|surd|standard form/.test(t))return'indices';
 if(/function/.test(t))return'function';
 if(/algebra|equation|expression|quadratic|factor|formula/.test(t))return'algebra';
 return'number';
};
function make(topic,level,index){
 const n=index+1,seed=`${level}-${topic}-${n}`,v=hash(seed)%12,difficulty=difficultyFor(index,level),f=familyFor(topic);
 if(f==='sets'){
  const a=rand(`${seed}a`,3,12),b=rand(`${seed}b`,3,12),common=rand(`${seed}c`,0,Math.min(a,b)),correct=a+b-common;
  return q(`${level}-gen-${n}`,topic,`Set A has ${a} elements and Set B has ${b} elements. If ${common} elements are common to both sets, how many elements are in A ∪ B?`,correct,`n(A∪B)=${a}+${b}−${common}=${correct}.`,difficulty,'Find the union of two sets');
 }
 if(f==='fraction'){
  const d=v%3===0?10:v%3===1?100:rand(`${seed}d`,3,12),a=rand(`${seed}a`,1,d-1),b=rand(`${seed}b`,1,d-1),type=v%5;
  if(type===0){const whole=rand(`${seed}w`,2,8),correct=whole*d+a;return q(`${level}-gen-${n}`,topic,`Write ${whole} ${a}/${d} as an improper fraction. Give the numerator.`,correct,`${whole}×${d}+${a}=${correct}.`,difficulty,'Convert a mixed number to an improper fraction')}
  if(type===1){const correct=a+b;return q(`${level}-gen-${n}`,topic,`What is ${a}/${d} + ${b}/${d}? Give the numerator when the denominator is ${d}.`,correct,`Add the numerators: ${a}+${b}=${correct}.`,difficulty,'Add fractions with like denominators')}
  if(type===2){const hi=Math.max(a,b),lo=Math.min(a,b),correct=hi-lo;return q(`${level}-gen-${n}`,topic,`What is ${hi}/${d} − ${lo}/${d}? Give the numerator when the denominator is ${d}.`,correct,`${hi}−${lo}=${correct}.`,difficulty,'Subtract fractions with like denominators')}
  if(type===3){const whole=rand(`${seed}w`,20,120),num=rand(`${seed}n`,1,4),den=rand(`${seed}x`,5,10),correct=whole*num/den;return q(`${level}-gen-${n}`,topic,`Find ${num}/${den} of ${whole}.`,correct,`${whole}×${num}/${den}=${correct}.`,difficulty,'Find a fraction of a quantity')}
  const correct=Number((a/d).toFixed(2));return q(`${level}-gen-${n}`,topic,`Write ${a}/${d} as a decimal, correct to 2 decimal places.`,correct,`${a}÷${d}=${correct}.`,difficulty,'Convert a fraction to a decimal',0.01);
 }
 if(f==='stats'){
  const vals=Array.from({length:5},(_,i)=>rand(`${seed}v${i}`,2,40)),type=v%5;
  if(type===0){const correct=Math.max(...vals);return q(`${level}-gen-${n}`,topic,`Which is the largest value in ${vals.join(', ')}?`,correct,`The largest value is ${correct}.`,difficulty,'Compare data values')}
  if(type===1){const correct=Math.min(...vals);return q(`${level}-gen-${n}`,topic,`Which is the smallest value in ${vals.join(', ')}?`,correct,`The smallest value is ${correct}.`,difficulty,'Compare data values')}
  if(type===2){const correct=vals.reduce((a,b)=>a+b,0);return q(`${level}-gen-${n}`,topic,`Find the total of ${vals.join(', ')}.`,correct,`${vals.join(' + ')}=${correct}.`,difficulty,'Calculate a total from data')}
  if(type===3){const sum=vals.reduce((a,b)=>a+b,0),correct=sum/5;return q(`${level}-gen-${n}`,topic,`Five learners scored ${vals.join(', ')} marks. What is their mean score?`,correct,`${sum}÷5=${correct}.`,difficulty,'Calculate the mean of a data set',0.01)}
  const sorted=[...vals].sort((a,b)=>a-b),correct=sorted[2];return q(`${level}-gen-${n}`,topic,`Find the median of ${vals.join(', ')}.`,correct,`Ordered values: ${sorted.join(', ')}. The middle value is ${correct}.`,difficulty,'Find the median of a data set');
 }
 if(f==='geometry'){
  const a=rand(`${seed}a`,3,30),b=rand(`${seed}b`,3,30),type=v%6;
  if(type===0){const correct=2*(a+b);return q(`${level}-gen-${n}`,topic,`A rectangle is ${a} cm long and ${b} cm wide. Find its perimeter.`,correct,`P=2(${a}+${b})=${correct} cm.`,difficulty,'Calculate rectangle perimeter')}
  if(type===1){const correct=a*b;return q(`${level}-gen-${n}`,topic,`A rectangle is ${a} cm long and ${b} cm wide. Find its area.`,correct,`A=${a}×${b}=${correct} cm².`,difficulty,'Calculate rectangle area')}
  if(type===2){const c=rand(`${seed}c`,2,15),correct=a*b*c;return q(`${level}-gen-${n}`,topic,`A cuboid measures ${a} cm by ${b} cm by ${c} cm. Find its volume.`,correct,`V=${a}×${b}×${c}=${correct} cm³.`,difficulty,'Calculate cuboid volume')}
  if(type===3){const side=rand(`${seed}s`,3,30),correct=4*side;return q(`${level}-gen-${n}`,topic,`A square has side length ${side} cm. Find its perimeter.`,correct,`P=4×${side}=${correct} cm.`,difficulty,'Calculate square perimeter')}
  if(type===4){const side=rand(`${seed}s`,3,30),correct=side*side;return q(`${level}-gen-${n}`,topic,`A square has side length ${side} cm. Find its area.`,correct,`A=${side}×${side}=${correct} cm².`,difficulty,'Calculate square area')}
  const base=rand(`${seed}base`,4,30),h=rand(`${seed}h`,4,30),correct=base*h/2;return q(`${level}-gen-${n}`,topic,`A triangle has base ${base} cm and height ${h} cm. Find its area.`,correct,`A=½×${base}×${h}=${correct} cm².`,difficulty,'Calculate triangle area');
 }
 if(f==='algebra'){
  const a=rand(`${seed}a`,2,12),x=rand(`${seed}x`,1,20),c=rand(`${seed}c`,1,30),rhs=a*x+c,type=v%4;
  if(type===0){const b=rand(`${seed}b`,2,12),correct=a+b;return q(`${level}-gen-${n}`,topic,`Simplify ${a}x + ${b}x. What is the coefficient of x?`,correct,`${a}+${b}=${correct}.`,difficulty,'Collect like terms')}
  if(type===1)return q(`${level}-gen-${n}`,topic,`Solve ${a}x + ${c} = ${rhs}.`,x,`Subtract ${c}, then divide by ${a}: x=${x}.`,difficulty,'Solve a linear equation')
  if(type===2){const value=rand(`${seed}value`,1,15),correct=a*value+c;return q(`${level}-gen-${n}`,topic,`If x=${value}, find ${a}x+${c}.`,correct,`${a}×${value}+${c}=${correct}.`,difficulty,'Substitute values into an expression')}
  const correct=a*x;return q(`${level}-gen-${n}`,topic,`If x=${x}, what is ${a}x?`,correct,`${a}×${x}=${correct}.`,difficulty,'Evaluate an algebraic expression');
 }
 if(f==='indices'){
  const base=rand(`${seed}b`,2,6),m=rand(`${seed}m`,1,5),r=rand(`${seed}r`,1,4),type=v%3;
  if(type===0){const correct=m+r;return q(`${level}-gen-${n}`,topic,`Simplify a^${m} × a^${r}. Give the exponent of a.`,correct,`Add exponents: ${m}+${r}=${correct}.`,difficulty,'Use the multiplication law of indices')}
  if(type===1){const correct=m*r;return q(`${level}-gen-${n}`,topic,`Simplify (a^${m})^${r}. Give the exponent of a.`,correct,`Multiply exponents: ${m}×${r}=${correct}.`,difficulty,'Use the power law of indices')}
  const correct=base**m;return q(`${level}-gen-${n}`,topic,`Evaluate ${base}^${m}.`,correct,`${base}^${m}=${correct}.`,difficulty,'Evaluate an index expression');
 }
 if(f==='sequence'){
  const first=rand(`${seed}a`,1,20),step=rand(`${seed}s`,2,12),term=rand(`${seed}t`,3,10),correct=first+(term-1)*step;return q(`${level}-gen-${n}`,topic,`An arithmetic sequence starts ${first}, ${first+step}, ${first+2*step}, … What is the ${term}th term?`,correct,`Tₙ=a+(n−1)d=${first}+(${term}−1)×${step}=${correct}.`,difficulty,'Find a term of an arithmetic sequence');
 }
 if(f==='function'){
  const a=rand(`${seed}a`,2,9),b=rand(`${seed}b`,1,12),x=rand(`${seed}x`,1,10),correct=a*x+b;return q(`${level}-gen-${n}`,topic,`If f(x)=${a}x+${b}, find f(${x}).`,correct,`f(${x})=${a}×${x}+${b}=${correct}.`,difficulty,'Evaluate a function');
 }
 if(f==='matrix'){
  const a=rand(`${seed}a`,1,9),b=rand(`${seed}b`,1,9),c=rand(`${seed}c`,1,9),d=rand(`${seed}d`,1,9),correct=a*d-b*c;return q(`${level}-gen-${n}`,topic,`Find the determinant of [[${a}, ${b}], [${c}, ${d}]].`,correct,`Determinant=(${a}×${d})−(${b}×${c})=${correct}.`,difficulty,'Find the determinant of a 2 × 2 matrix');
 }
 if(f==='counting'){
  const total=rand(`${seed}n`,5,9),r=rand(`${seed}r`,2,total-1),type=v%2;
  let numerator=1,denominator=1;for(let i=0;i<r;i++){numerator*=total-i;denominator*=i+1}
  if(type===0)return q(`${level}-gen-${n}`,topic,`How many ways can ${r} objects be chosen from ${total} when order does not matter?`,numerator/denominator,`Use nCr=${total}!/(${r}!(${total-r})!)=${numerator/denominator}.`,difficulty,'Apply combinations');
  return q(`${level}-gen-${n}`,topic,`How many ordered arrangements of ${r} positions can be made from ${total} different objects?`,numerator,`Use nPr=${total}×${total-1}×… for ${r} factors=${numerator}.`,difficulty,'Apply permutations');
 }
 if(f==='vector'){
  const a=rand(`${seed}a`,1,9),b=rand(`${seed}b`,1,9),c=rand(`${seed}c`,1,9),d=rand(`${seed}d`,1,9),correct=v%2?a*d-b*c:a+c;return q(`${level}-gen-${n}`,topic,v%2?`For u=(${a},${b}) and v=(${c},${d}), find ad−bc.`:`For u=(${a},${b}) and v=(${c},${d}), find the x-component of u+v.`,correct,v%2?`${a}×${d}−${b}×${c}=${correct}.`:`${a}+${c}=${correct}.`,difficulty,'Apply vector operations');
 }
 if(f==='trig'){
  const k=rand(seed,2,30),type=v%3;
  if(type===0)return q(`${level}-gen-${n}`,topic,`A right triangle has hypotenuse ${2*k} cm and angle 30°. Using sin 30°=1/2, find the opposite side.`,k,`Opposite=${2*k}×1/2=${k} cm.`,difficulty,'Apply sine in a right triangle')
  if(type===1)return q(`${level}-gen-${n}`,topic,`A right triangle has hypotenuse ${2*k} cm and angle 60°. Using cos 60°=1/2, find the adjacent side.`,k,`Adjacent=${2*k}×1/2=${k} cm.`,difficulty,'Apply cosine in a right triangle')
  return q(`${level}-gen-${n}`,topic,`A right triangle has an adjacent side of ${k} cm and angle 45°. Using tan 45°=1, find the opposite side.`,k,`Opposite=${k}×1=${k} cm.`,difficulty,'Apply tangent in a right triangle');
 }
 if(f==='calculus'){
  const a=rand(seed,2,9),x=rand(`${seed}x`,1,9),b=rand(`${seed}b`,1,12),power=rand(`${seed}p`,2,4),type=v%3;
  if(type===0)return q(`${level}-gen-${n}`,topic,`If f(x)=${a}x+${b}, what is f′(x)?`,a,`The derivative of ${a}x is ${a}; the constant becomes 0.`,difficulty,'Differentiate a linear function')
  if(type===1){const correct=a*power;return q(`${level}-gen-${n}`,topic,`If y=${a}x^${power}, what is the coefficient in dy/dx?`,correct,`dy/dx=${a*power}x^${power-1}.`,difficulty,'Differentiate a power function')}
  const correct=a*x;return q(`${level}-gen-${n}`,topic,`If f(x)=${a}x, what is f(${x})?`,correct,`${a}×${x}=${correct}.`,difficulty,'Evaluate a simple function');
 }
 if(f==='financial'){
  const p=rand(seed,20,500)*100,rate=rand(`${seed}r`,2,15),time=rand(`${seed}t`,1,4),type=v%4,interest=p*rate*time/100;
  if(type===0)return q(`${level}-gen-${n}`,topic,`Find the simple interest on ₦${p.toLocaleString()} at ${rate}% per year for ${time} year(s).`,interest,`SI=PRT/100=₦${interest.toLocaleString()}.`,difficulty,'Calculate simple interest')
  if(type===1){const correct=p+interest;return q(`${level}-gen-${n}`,topic,`Find the amount on ₦${p.toLocaleString()} at ${rate}% simple interest for ${time} year(s).`,correct,`Amount=₦${p.toLocaleString()}+₦${interest.toLocaleString()}=₦${correct.toLocaleString()}.`,difficulty,'Calculate amount using simple interest')}
  const discount=rand(`${seed}d`,5,20),correct=p*discount/100;return q(`${level}-gen-${n}`,topic,`A ₦${p.toLocaleString()} item is discounted by ${discount}%. Find the discount amount.`,correct,`Discount=₦${correct.toLocaleString()}.`,difficulty,'Calculate a percentage discount');
 }
 const a=rand(seed,1,/^P[1-3]$/.test(level)?99:/^P[4-6]$/.test(level)?999:9999),b=rand(`${seed}b`,1,100),op=v%6;
 if(op===0)return q(`${level}-gen-${n}`,topic,`What is ${a} + ${b}?`,a+b,`${a}+${b}=${a+b}.`,difficulty,'Add numbers');
 if(op===1){const x=Math.max(a,b),y=Math.min(a,b);return q(`${level}-gen-${n}`,topic,`What is ${x} − ${y}?`,x-y,`${x}−${y}=${x-y}.`,difficulty,'Subtract numbers')}
 if(op===2)return q(`${level}-gen-${n}`,topic,`What is ${a} × ${b}?`,a*b,`${a}×${b}=${a*b}.`,difficulty,'Multiply numbers');
 if(op===3){const divisor=Math.max(2,b),quot=rand(`${seed}q`,2,50);return q(`${level}-gen-${n}`,topic,`How many groups of ${divisor} are in ${divisor*quot}?`,quot,`${divisor*quot}÷${divisor}=${quot}.`,difficulty,'Divide numbers')}
 if(op===4){const correct=Math.round(a/10)*10;return q(`${level}-gen-${n}`,topic,`Round ${a} to the nearest ten.`,correct,`${a} rounds to ${correct}.`,difficulty,'Round whole numbers')}
 const correct=a%10;return q(`${level}-gen-${n}`,topic,`What is the remainder when ${a} is divided by 10?`,correct,`The last digit is ${correct}, so the remainder is ${correct}.`,difficulty,'Find a remainder');
}
export function generateCurriculumBank(level,topics,count=2000){const safe=Array.isArray(topics)&&topics.length?topics:['Number and Numeration'];const per=Math.ceil(count/safe.length),out=[];safe.forEach(topic=>{for(let i=0;i<per;i++)out.push(make(topic,level,i))});return shuffle(out,`${level}-bank`).slice(0,count)}
export function generateExamBank(exam,count=2000){const topics=['Number and Numeration','Algebraic Processes','Geometry and Mensuration','Statistics and Probability','Trigonometry','Financial Mathematics','Problem Solving'];const out=[];for(let i=0;i<count;i++){const topic=topics[i%topics.length],item=make(`${exam} ${topic}`,exam,i);out.push({...item,id:`${exam.toLowerCase()}-style-${String(i+1).padStart(4,'0')}`,sourceType:`${exam}_STYLE_ORIGINAL`,exam})}return out}
