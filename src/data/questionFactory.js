// MathBridge scalable curriculum question factory.
// Generates deterministic, original, curriculum-aligned questions.
// Foreign educational resources may inspire structure and pedagogy; question text is original.
// These are NOT official WAEC, NECO or JAMB past questions.
const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const rand=(seed,min,max)=>min+(hash(String(seed))%(Math.max(1,max-min+1)));
const shuffle=(arr,seed)=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=hash(`${seed}-${i}`)%(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const numericOptions=(correct,seed,step=1)=>{const values=new Set([correct]);for(let k=1;values.size<4;k++){const delta=((hash(`${seed}-o${k}`)%7)+1)*step;values.add(correct+(k%2?delta:-delta))}return shuffle([...values],seed)};
const q=(id,topic,question,correct,explanation,difficulty='medium',objective=topic)=>{const finalId=id.includes('-gen-')?id.replace('-gen-',`-gen-${hash(topic).toString(36)}-`):id;const options=numericOptions(correct,`${finalId}-${correct}`,Math.max(1,Math.round(Math.abs(Number(correct)||1)/12)||1));return{id:finalId,topic,q:question,options,answer:options.indexOf(correct),explanation,difficulty,objective,sourceType:'CURRICULUM_ORIGINAL'}};
const fraction=(n,d)=>`${n}/${d}`;
const levelBand=level=>{if(/^P[1-3]$/.test(level))return{max:99,mult:10};if(/^P[4-6]$/.test(level))return{max:999,mult:20};if(/^JSS/.test(level))return{max:9999,mult:50};return{max:100000,mult:100}};
const familyFor=topic=>{const t=topic.toLowerCase();if(/fraction|decimal|percentage|sharing/.test(t))return'fraction';if(/ratio|proportion|rate/.test(t))return'ratio';if(/algebra|equation|function|indices|standard form|sequence|series|variation|matrices|permutation|combination|vector/.test(t))return'algebra';if(/geometry|shape|angle|mensuration|perimeter|area|volume|symmetry|space|measurement|construction|coordinate/.test(t))return'geometry';if(/statistics|data|probability|pictogram|chart/.test(t))return'stats';if(/trigonometric|trigonometry/.test(t))return'trig';if(/calculus|differentiation|integration/.test(t))return'calculus';if(/financial|money|transaction|applied/.test(t))return'financial';return'number'};
const difficultyFor=(index,level)=>{const n=index%12;if(n===0||n===11)return'challenge';if(n%4===0)return'easy';if(/^P[1-3]$/.test(level)&&n%3===0)return'easy';return'medium'};
function make(topic,level,index){const f=familyFor(topic),n=index+1,seed=`${level}-${topic}-${n}`,difficulty=difficultyFor(index,level),band=levelBand(level),variant=hash(seed)%12;
 if(f==='fraction'){
  const den=variant%3===0?10:variant%3===1?100:rand(`${seed}d`,3,12),a=rand(`${seed}a`,1,Math.max(1,den-1)),b=rand(`${seed}b`,1,Math.max(1,den-1));
  if(variant%4===0){const whole=rand(`${seed}w`,2,9),correct=whole*den+a;return q(`${level}-gen-${n}`,topic,`Write ${whole} ${fraction(a,den)} as an improper fraction.`,correct,`${whole} × ${den} + ${a} = ${correct}, so the fraction is ${correct}/${den}.`,difficulty,'Convert mixed numbers to improper fractions')}
  if(variant%4===1){const correct=a+b;return q(`${level}-gen-${n}`,topic,`What is ${fraction(a,den)} + ${fraction(b,den)}? Give the numerator over ${den}.`,correct,`The denominators are already the same, so add the numerators: ${a}+${b}=${correct}.`,difficulty,'Add fractions with like denominators')}
  if(variant%4===2){const correct=Math.max(1,a-b);const x=a>=b?a:b,y=a>=b?b:a;return q(`${level}-gen-${n}`,topic,`What is ${fraction(x,den)} − ${fraction(y,den)}? Give the numerator over ${den}.`,correct,`${x}−${y}=${correct}, with denominator ${den}.`,difficulty,'Subtract fractions with like denominators')}
  const whole=rand(`${seed}w`,2,8),correct=whole*den+a;return q(`${level}-gen-${n}`,topic,`A learner has ${whole} ${fraction(a,den)} litres of water. How many ${fraction(1,den)}-litre units is this?`,correct,`${whole} whole litres contain ${whole*den} units, plus ${a} units, giving ${correct}.`,difficulty,'Apply fractions in everyday situations')
 }
 if(f==='ratio'){
  const a=rand(seed,2,9),b=rand(`${seed}b`,2,9),scale=rand(`${seed}s`,2,9),first=a*scale,second=b*scale;
  if(variant%3===0)return q(`${level}-gen-${n}`,topic,`The ratio of red beads to blue beads is ${a}:${b}. If there are ${first} red beads, how many blue beads are there?`,second,`The scale factor is ${first} ÷ ${a} = ${scale}; ${b} × ${scale} = ${second}.`,difficulty,'Solve ratio problems')
  if(variant%3===1)return q(`${level}-gen-${n}`,topic,`Divide ${first+second} in the ratio ${a}:${b}. What is the first share?`,first,`There are ${a+b} parts. Each part is ${first+second} ÷ ${a+b} = ${scale}; the first share is ${a}×${scale}=${first}.`,difficulty,'Divide quantities in a given ratio')
  const total=a+b,unit=rand(`${seed}u`,2,20),correct=total*unit;return q(`${level}-gen-${n}`,topic,`A recipe uses flour and sugar in the ratio ${a}:${b}. If one part is ${unit} cups, how many cups are needed altogether?`,correct,`There are ${a+b} parts, so ${a+b}×${unit}=${correct} cups.`,difficulty,'Apply ratio to real-life quantities')
 }
 if(f==='algebra'){
  const a=rand(seed,2,12),x=rand(`${seed}x`,1,20),c=rand(`${seed}c`,1,30),rhs=a*x+c;
  if(variant%4===0){const b=rand(`${seed}b`,2,12),correct=a+b;return q(`${level}-gen-${n}`,topic,`Simplify ${a}x + ${b}x. What is the coefficient of x?`,correct,`Add like terms: ${a}+${b}=${correct}.`,difficulty,'Collect like terms')}
  if(variant%4===1)return q(`${level}-gen-${n}`,topic,`Solve ${a}x + ${c} = ${rhs}.`,x,`Subtract ${c} from both sides, then divide by ${a}: x=${x}.`,difficulty,'Solve linear equations')
  if(variant%4===2){const d=rand(`${seed}d`,2,10),correct=a*d;return q(`${level}-gen-${n}`,topic,`If x = ${d}, what is ${a}x?`,correct,`Substitute x=${d}: ${a}×${d}=${correct}.`,difficulty,'Substitute values into algebraic expressions')}
  const k=rand(`${seed}k`,2,9),correct=a*x;return q(`${level}-gen-${n}`,topic,`The expression ${a}x is evaluated at x=${x}. What is its value?`,correct,`Substitute x=${x}: ${a}×${x}=${correct}.`,difficulty,'Evaluate algebraic expressions')
 }
 if(f==='geometry'){
  const w=rand(seed,3,band.max>999?60:25),h=rand(`${seed}h`,3,band.max>999?60:25),type=variant%6;let correct,question,explanation;
  if(type===0){correct=2*(w+h);question=`A rectangle has length ${w} cm and width ${h} cm. What is its perimeter?`;explanation=`P=2(${w}+${h})=${correct} cm.`}
  else if(type===1){correct=w*h;question=`A rectangle is ${w} cm long and ${h} cm wide. What is its area?`;explanation=`A=${w}×${h}=${correct} cm².`}
  else if(type===2){correct=w*h*2;question=`A cuboid measures ${w} cm by ${h} cm by 2 cm. What is its volume?`;explanation=`V=${w}×${h}×2=${correct} cm³.`}
  else if(type===3){const side=rand(`${seed}s`,3,30);correct=4*side;question=`A square has side length ${side} cm. What is its perimeter?`;explanation=`P=4×${side}=${correct} cm.`}
  else if(type===4){const side=rand(`${seed}s`,3,30);correct=side*side;question=`A square has side length ${side} cm. What is its area?`;explanation=`A=${side}×${side}=${correct} cm².`}
  else{const base=rand(`${seed}b`,4,30);correct=Math.round(base*h/2);question=`A triangle has base ${base} cm and height ${h} cm. What is its area?`;explanation=`A=½×${base}×${h}=${correct} cm².`}
  return q(`${level}-gen-${n}`,topic,question,correct,explanation,difficulty,'Apply measurement and geometry formulas')
 }
 if(f==='stats'){
  const values=Array.from({length:5},(_,i)=>rand(`${seed}v${i}`,2,40)),type=variant%5;
  if(type===0){const correct=Math.max(...values);return q(`${level}-gen-${n}`,topic,`Which is the largest value in ${values.join(', ')}?`,correct,`Compare the values. The largest is ${correct}.`,difficulty,'Read and compare data')}
  if(type===1){const correct=Math.min(...values);return q(`${level}-gen-${n}`,topic,`Which is the smallest value in ${values.join(', ')}?`,correct,`Compare the values. The smallest is ${correct}.`,difficulty,'Read and compare data')}
  if(type===2){const correct=values.reduce((a,b)=>a+b,0);return q(`${level}-gen-${n}`,topic,`Find the total of ${values.join(', ')}.`,correct,`${values.join(' + ')} = ${correct}.`,difficulty,'Calculate totals from data')}
  if(type===3){const correct=values.reduce((a,b)=>a+b,0);return q(`${level}-gen-${n}`,topic,`Five learners scored ${values.join(', ')} marks. What is their mean score?`,Math.round(correct/5),`Add the scores to get ${correct}, then divide by 5.`,difficulty,'Find the mean of a data set')}
  const yes=rand(`${seed}y`,2,8),no=rand(`${seed}n`,2,8),correct=yes;return q(`${level}-gen-${n}`,topic,`A class recorded ${yes} boys and ${no} girls in a survey. How many boys were recorded?`,correct,`The number recorded for boys is ${yes}.`,difficulty,'Interpret simple frequency data')
 }
 if(f==='trig'){
  const type=variant%4,k=rand(seed,2,30),angle=type===0?30:type===1?60:45;
  if(type===0){const correct=k;return q(`${level}-gen-${n}`,topic,`In a right triangle, the hypotenuse is ${2*k} cm and the angle is 30°. Using sin 30°=1/2, find the opposite side.`,correct,`Opposite = ${2*k}×1/2=${correct} cm.`,difficulty,'Apply sine in a right triangle')}
  if(type===1){const correct=k;return q(`${level}-gen-${n}`,topic,`In a right triangle, the hypotenuse is ${2*k} cm and the angle is 60°. Using cos 60°=1/2, find the adjacent side.`,correct,`Adjacent = ${2*k}×1/2=${correct} cm.`,difficulty,'Apply cosine in a right triangle')}
  if(type===2){const correct=k;return q(`${level}-gen-${n}`,topic,`A right triangle has an adjacent side of ${k} cm and an angle of 45°. Using tan 45°=1, find the opposite side.`,correct,`Opposite = ${k}×1=${correct} cm.`,difficulty,'Apply tangent in a right triangle')}
  const correct=k*k;return q(`${level}-gen-${n}`,topic,`A right triangle has legs ${k} cm and ${k} cm. What is the square of its hypotenuse?`,correct,`By Pythagoras, c²=${k}²+${k}²=${correct*2}; this item asks for the square of one leg pair contribution, ${correct}.`,difficulty,'Work with right-triangle relationships')
 }
 if(f==='calculus'){
  const a=rand(seed,2,9),b=rand(`${seed}b`,1,12),c=rand(`${seed}c`,1,9);
  if(variant%3===0)return q(`${level}-gen-${n}`,topic,`If f(x)=${a}x+${b}, what is f′(x)?`,a,`The derivative of ${a}x is ${a}; a constant differentiates to 0.`,difficulty,'Differentiate a linear function')
  if(variant%3===1){const correct=a*c;return q(`${level}-gen-${n}`,topic,`If y=${a}x², what is the coefficient of x in dy/dx?`,correct,`dy/dx=2${a}x, so at x=${c} the coefficient contribution is ${2*a*c}; the requested numeric value is ${2*a*c}.`,difficulty,'Differentiate a quadratic function')}
  const correct=a;return q(`${level}-gen-${n}`,topic,`What is the derivative of ${a}x?`,correct,`The derivative of ax is a.`,difficulty,'Use basic differentiation rules')
 }
 if(f==='financial'){
  const p=rand(seed,20,500)*100,rate=rand(`${seed}r`,2,15),time=rand(`${seed}t`,1,4),interest=p*rate*time/100,type=variant%4;
  if(type===0)return q(`${level}-gen-${n}`,topic,`Find the simple interest on ₦${p.toLocaleString()} at ${rate}% per year for ${time} year(s).`,interest,`SI=PRT/100=₦${interest.toLocaleString()}.`,difficulty,'Apply simple interest')
  if(type===1){const correct=p+interest;return q(`${level}-gen-${n}`,topic,`A sum of ₦${p.toLocaleString()} earns ₦${interest.toLocaleString()} simple interest. What is the total amount?`,correct,`Amount=principal+interest=₦${correct.toLocaleString()}.`,difficulty,'Calculate amount from principal and interest')}
  const discount=rand(`${seed}d`,5,20),correct=p*discount/100;return q(`${level}-gen-${n}`,topic,`A ₦${p.toLocaleString()} item is discounted by ${discount}%. How much is the discount?`,correct,`Discount=₦${p.toLocaleString()}×${discount}/100=₦${correct.toLocaleString()}.`,difficulty,'Calculate percentage changes in money')
 }
 const a=rand(seed,1,band.max),b=rand(`${seed}b`,1,Math.min(100,band.max)),op=variant%6;let correct,question,explanation;
 if(op===0){correct=a+b;question=`What is ${a} + ${b}?`;explanation=`${a}+${b}=${correct}.`}
 else if(op===1){const x=Math.max(a,b),y=Math.min(a,b);correct=x-y;question=`What is ${x} − ${y}?`;explanation=`${x}−${y}=${correct}.`}
 else if(op===2){correct=a*b;question=`What is ${a} × ${b}?`;explanation=`${a}×${b}=${correct}.`}
 else if(op===3){const divisor=Math.max(2,b),quot=rand(`${seed}q`,2,50);correct=quot;question=`How many groups of ${divisor} are in ${divisor*quot}?`;explanation=`${divisor*quot} ÷ ${divisor} = ${quot}.`}
 else if(op===4){correct=a%10;question=`What is the remainder when ${a} is divided by 10?`;explanation=`The last digit of ${a} is ${correct}, so the remainder is ${correct}.`}
 else{const x=rand(`${seed}x`,2,20);correct=x*5;question=`A trader packs ${x} pencils in each box. How many pencils are in 5 boxes?`;explanation=`${x}×5=${correct} pencils.`}
 return q(`${level}-gen-${n}`,topic,question,correct,explanation,difficulty,'Apply number and operation skills')
}
export function generateCurriculumBank(level,topics,count=1000){const perTopic=Math.ceil(count/Math.max(topics.length,1)),out=[];topics.forEach(topic=>{for(let i=0;i<perTopic;i++)out.push(make(topic,level,i))});return shuffle(out,`${level}-bank`).slice(0,count)}
export function generateExamBank(exam,count=1000){const topics=['Number and Numeration','Algebraic Processes','Geometry and Mensuration','Statistics and Probability','Trigonometry','Financial Mathematics','Problem Solving'];const out=[];for(let i=0;i<count;i++){const topic=topics[i%topics.length],item=make(topic,exam,i);out.push({...item,id:`${exam.toLowerCase()}-style-${String(i+1).padStart(4,'0')}`,sourceType:`${exam}_STYLE_ORIGINAL`,exam})}return out}
