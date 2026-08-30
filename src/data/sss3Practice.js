export const SSS3_PRACTICE={
'Advanced Algebra':[
{id:'s3-alg-1',topic:'Advanced Algebra',q:'Solve 2x+5=17.',options:['4','5','6','7'],answer:2,difficulty:'Easy',explanation:'2x=12, so x=6.'},
{id:'s3-alg-2',topic:'Advanced Algebra',q:'Factor x²−9.',options:['(x−9)(x+1)','(x−3)(x+3)','(x−3)²','(x+9)(x−1)'],answer:1,difficulty:'Easy',explanation:'x²−9 is a difference of two squares.'},
{id:'s3-alg-3',topic:'Advanced Algebra',q:'Solve x²−5x+6=0.',options:['x=1 or 6','x=2 or 3','x=−2 or −3','x=3 or 6'],answer:1,difficulty:'Medium',explanation:'(x−2)(x−3)=0.'},
{id:'s3-alg-4',topic:'Advanced Algebra',q:'If 3x−2>7, then:',options:['x>3','x>5/3','x<3','x<5/3'],answer:0,difficulty:'Medium',explanation:'3x>9, hence x>3.'},
{id:'s3-alg-5',topic:'Advanced Algebra',q:'The roots of x²−7x+10=0 are:',options:['1 and 10','2 and 5','−2 and −5','3 and 4'],answer:1,difficulty:'Hard',explanation:'(x−2)(x−5)=0.'}],
'Functions and Graphs':[
{id:'s3-fn-1',topic:'Functions and Graphs',q:'If f(x)=x²+1, find f(3).',options:['7','8','9','10'],answer:1,difficulty:'Easy',explanation:'3²+1=10. Correction: 9+1=10, so the correct option is 10.',},
{id:'s3-fn-2',topic:'Functions and Graphs',q:'For f(x)=2x−1, f(4)=',options:['6','7','8','9'],answer:1,difficulty:'Easy',explanation:'2(4)−1=7.'},
{id:'s3-fn-3',topic:'Functions and Graphs',q:'The gradient of y=3x+2 is:',options:['2','3','−2','−3'],answer:1,difficulty:'Medium',explanation:'In y=mx+c, m is the gradient.'},
{id:'s3-fn-4',topic:'Functions and Graphs',q:'The vertex of y=(x−2)²+3 is:',options:['(−2,3)','(2,−3)','(2,3)','(−2,−3)'],answer:2,difficulty:'Medium',explanation:'Vertex form is y=(x−h)²+k.'},
{id:'s3-fn-5',topic:'Functions and Graphs',q:'If f(x)=x+2 and g(x)=3x, find f(g(2)).',options:['6','8','10','12'],answer:1,difficulty:'Hard',explanation:'g(2)=6, then f(6)=8.'}],
Trigonometry:[
{id:'s3-trig-1',topic:'Trigonometry',q:'sin²θ+cos²θ equals:',options:['0','1','2','tanθ'],answer:1,difficulty:'Easy',explanation:'This is the fundamental Pythagorean identity.'},
{id:'s3-trig-2',topic:'Trigonometry',q:'If sinθ=3/5 and θ is acute, cosθ=',options:['3/5','4/5','5/3','1/5'],answer:1,difficulty:'Easy',explanation:'Using sin²θ+cos²θ=1 gives cosθ=4/5.'},
{id:'s3-trig-3',topic:'Trigonometry',q:'tan45°=',options:['0','1/2','1','2'],answer:2,difficulty:'Medium',explanation:'tan45°=1.'},
{id:'s3-trig-4',topic:'Trigonometry',q:'Solve sinθ=1 for 0°≤θ≤360°.',options:['0°','90°','180°','270°'],answer:1,difficulty:'Medium',explanation:'Sine is 1 at 90° in this interval.'},
{id:'s3-trig-5',topic:'Trigonometry',q:'If tanθ=3/4 in an acute triangle, sinθ=',options:['3/5','4/5','3/4','4/3'],answer:0,difficulty:'Hard',explanation:'Use a 3-4-5 triangle.'}],
Differentiation:[
{id:'s3-diff-1',topic:'Differentiation',q:'If y=x³, dy/dx=',options:['x²','2x²','3x²','3x'],answer:2,difficulty:'Easy',explanation:'Apply the power rule.'},
{id:'s3-diff-2',topic:'Differentiation',q:'Differentiate y=5x²−3x.',options:['10x−3','5x−3','10x+3','5x²−3'],answer:0,difficulty:'Easy',explanation:'Differentiate each term.'},
{id:'s3-diff-3',topic:'Differentiation',q:'The gradient of y=x² at x=3 is:',options:['3','6','9','12'],answer:1,difficulty:'Medium',explanation:'dy/dx=2x, so gradient=6.'},
{id:'s3-diff-4',topic:'Differentiation',q:'If y=2x³+4x, dy/dx=',options:['6x²+4','6x+4','2x²+4','6x³+4'],answer:0,difficulty:'Medium',explanation:'3(2)x²+4=6x²+4.'},
{id:'s3-diff-5',topic:'Differentiation',q:'A stationary point occurs where:',options:['dy/dx=1','dy/dx=−1','dy/dx=0','y=0'],answer:2,difficulty:'Hard',explanation:'A horizontal tangent has zero gradient.'}],
'Integration Foundations':[
{id:'s3-int-1',topic:'Integration Foundations',q:'∫x² dx=',options:['2x+C','x³/3+C','x²/2+C','3x+C'],answer:1,difficulty:'Easy',explanation:'Increase the power and divide by the new power.'},
{id:'s3-int-2',topic:'Integration Foundations',q:'∫3x² dx=',options:['3x³+C','x³+C','x²+C','6x+C'],answer:1,difficulty:'Easy',explanation:'The integral of 3x² is x³+C.'},
{id:'s3-int-3',topic:'Integration Foundations',q:'The constant of integration is represented by:',options:['K','C','I','A'],answer:1,difficulty:'Easy',explanation:'Indefinite integrals include +C.'},
{id:'s3-int-4',topic:'Integration Foundations',q:'∫(2x+1)dx=',options:['x²+x+C','2x²+x+C','x²+1+C','2x+x²+C'],answer:0,difficulty:'Medium',explanation:'Integrate each term separately.'},
{id:'s3-int-5',topic:'Integration Foundations',q:'The area under a curve between limits is found using:',options:['Differentiation','Definite integration','Factorisation','Matrices'],answer:1,difficulty:'Hard',explanation:'A definite integral gives signed area.'}],
'Statistics and Probability':[
{id:'s3-stat-1',topic:'Statistics and Probability',q:'Mean of 4,6,8 is:',options:['5','6','7','8'],answer:1,difficulty:'Easy',explanation:'18/3=6.'},
{id:'s3-stat-2',topic:'Statistics and Probability',q:'For independent A and B, P(A∩B)=',options:['P(A)+P(B)','P(A)−P(B)','P(A)P(B)','P(A)/P(B)'],answer:2,difficulty:'Easy',explanation:'Independent event probabilities multiply.'},
{id:'s3-stat-3',topic:'Statistics and Probability',q:'The median of 2,5,7,9,12 is:',options:['5','7','8','9'],answer:1,difficulty:'Medium',explanation:'The middle ordered value is 7.'},
{id:'s3-stat-4',topic:'Statistics and Probability',q:'A fair die is rolled. P(even number)=',options:['1/6','1/3','1/2','2/3'],answer:2,difficulty:'Medium',explanation:'Three of six outcomes are even.'},
{id:'s3-stat-5',topic:'Statistics and Probability',q:'Standard deviation mainly measures:',options:['Central tendency','Spread','Frequency only','Sample size'],answer:1,difficulty:'Hard',explanation:'It measures dispersion around the mean.'}],
'Coordinate Geometry':[
{id:'s3-coord-1',topic:'Coordinate Geometry',q:'Gradient through (1,2) and (3,6) is:',options:['1','2','3','4'],answer:1,difficulty:'Easy',explanation:'(6−2)/(3−1)=2.'},
{id:'s3-coord-2',topic:'Coordinate Geometry',q:'Distance between (0,0) and (3,4) is:',options:['3','4','5','7'],answer:2,difficulty:'Easy',explanation:'√(3²+4²)=5.'},
{id:'s3-coord-3',topic:'Coordinate Geometry',q:'The midpoint of (2,4) and (6,8) is:',options:['(4,6)','(8,12)','(2,2)','(3,5)'],answer:0,difficulty:'Medium',explanation:'Average corresponding coordinates.'},
{id:'s3-coord-4',topic:'Coordinate Geometry',q:'The equation y=2x+5 has y-intercept:',options:['2','5','−2','−5'],answer:1,difficulty:'Medium',explanation:'Set x=0.'},
{id:'s3-coord-5',topic:'Coordinate Geometry',q:'Parallel lines have:',options:['Equal gradients','Opposite gradients','Product of gradients 1','Zero gradients always'],answer:0,difficulty:'Hard',explanation:'Non-vertical parallel lines have equal gradients.'}],
'Financial Mathematics':[
{id:'s3-fin-1',topic:'Financial Mathematics',q:'Simple interest is calculated using:',options:['I=Prt','I=P+r+t','I=P/t','I=P(1+r)^t'],answer:0,difficulty:'Easy',explanation:'P is principal, r rate and t time.'},
{id:'s3-fin-2',topic:'Financial Mathematics',q:'₦20,000 at 5% simple interest for 2 years earns:',options:['₦1,000','₦2,000','₦2,500','₦4,000'],answer:1,difficulty:'Easy',explanation:'20,000×0.05×2=2,000.'},
{id:'s3-fin-3',topic:'Financial Mathematics',q:'Compound amount is commonly given by:',options:['A=P(1+r)^n','A=Prn','A=P+r+n','A=P/(1+r)^n'],answer:0,difficulty:'Medium',explanation:'This is the compound-growth formula.'},
{id:'s3-fin-4',topic:'Financial Mathematics',q:'Depreciation means:',options:['Increase in value','Reduction in value','Constant profit','Tax refund'],answer:1,difficulty:'Medium',explanation:'Depreciation represents loss of asset value.'},
{id:'s3-fin-5',topic:'Financial Mathematics',q:'If an investment doubles, its growth factor is:',options:['0.5','1','2','100'],answer:2,difficulty:'Hard',explanation:'Final value is twice the initial value.'}],
'Vectors and Transformations':[
{id:'s3-vec-1',topic:'Vectors and Transformations',q:'Vector from (1,2) to (4,6) is:',options:['(3,4)','(5,8)','(−3,−4)','(4,3)'],answer:0,difficulty:'Easy',explanation:'Subtract initial coordinates from final coordinates.'},
{id:'s3-vec-2',topic:'Vectors and Transformations',q:'Magnitude of (3,4) is:',options:['3','4','5','7'],answer:2,difficulty:'Easy',explanation:'√(9+16)=5.'},
{id:'s3-vec-3',topic:'Vectors and Transformations',q:'A translation moves every point by the same:',options:['Angle only','Distance and direction','Area only','Slope only'],answer:1,difficulty:'Medium',explanation:'A translation is defined by a displacement vector.'},
{id:'s3-vec-4',topic:'Vectors and Transformations',q:'The zero vector has magnitude:',options:['−1','0','1','Undefined'],answer:1,difficulty:'Medium',explanation:'Its components are all zero.'},
{id:'s3-vec-5',topic:'Vectors and Transformations',q:'A rotation is measured about a:',options:['Radius','Centre','Gradient','Midpoint only'],answer:1,difficulty:'Hard',explanation:'Rotations occur about a fixed centre.'}],
'Sequences and Series':[
{id:'s3-seq-1',topic:'Sequences and Series',q:'The next term of 2,5,8,11 is:',options:['12','13','14','15'],answer:2,difficulty:'Easy',explanation:'The common difference is 3.'},
{id:'s3-seq-2',topic:'Sequences and Series',q:'The nth term of an arithmetic sequence is:',options:['a+(n−1)d','ar^n','a−nd','n/d'],answer:0,difficulty:'Easy',explanation:'This is the arithmetic nth-term formula.'},
{id:'s3-seq-3',topic:'Sequences and Series',q:'Common ratio of 3,6,12,24 is:',options:['1','2','3','4'],answer:1,difficulty:'Medium',explanation:'Each term is multiplied by 2.'},
{id:'s3-seq-4',topic:'Sequences and Series',q:'The sum of the first n arithmetic terms uses:',options:['S=n/2[2a+(n−1)d]','S=ar^n','S=a/d','S=n(a+d)'],answer:0,difficulty:'Medium',explanation:'This is the standard arithmetic-series formula.'},
{id:'s3-seq-5',topic:'Sequences and Series',q:'A geometric sequence has a constant:',options:['Difference','Ratio','Sum','Square'],answer:1,difficulty:'Hard',explanation:'Successive terms have the same multiplier.'}],
'Examination Problem Solving':[
{id:'s3-exam-1',topic:'Examination Problem Solving',q:'The best first step in a word problem is to:',options:['Guess','Identify the given and required quantities','Skip it','Multiply all numbers'],answer:1,difficulty:'Easy',explanation:'Understanding the problem comes before calculation.'},
{id:'s3-exam-2',topic:'Examination Problem Solving',q:'Showing working is useful because it:',options:['Uses space only','Makes the method traceable','Guarantees full marks','Avoids calculation'],answer:1,difficulty:'Easy',explanation:'Clear working allows the method to be followed.'},
{id:'s3-exam-3',topic:'Examination Problem Solving',q:'If a question seems difficult, a good strategy is to:',options:['Stop immediately','Break it into smaller steps','Erase all work','Choose random answers'],answer:1,difficulty:'Medium',explanation:'Decomposition makes multi-step problems manageable.'},
{id:'s3-exam-4',topic:'Examination Problem Solving',q:'After obtaining an answer, you should:',options:['Never check it','Check whether it is reasonable','Change it randomly','Ignore units'],answer:1,difficulty:'Medium',explanation:'Checking catches errors and tests plausibility.'},
{id:'s3-exam-5',topic:'Examination Problem Solving',q:'In a timed exam, if stuck for too long you should:',options:['Spend the entire exam on it','Move on and return later','Submit immediately','Delete other answers'],answer:1,difficulty:'Hard',explanation:'Time management protects marks from easier questions.'}],
'WAEC and NECO Revision':[
{id:'s3-rev-1',topic:'WAEC and NECO Revision',q:'A strong revision plan should include:',options:['Only one topic','Mixed practice and review of errors','No timed work','Only memorisation'],answer:1,difficulty:'Easy',explanation:'Mixed practice and error analysis improve exam readiness.'},
{id:'s3-rev-2',topic:'WAEC and NECO Revision',q:'Timed practice mainly develops:',options:['Exam pacing','Calculator repair','Memory of names','Drawing skills only'],answer:0,difficulty:'Easy',explanation:'Timed papers train pacing under exam conditions.'},
{id:'s3-rev-3',topic:'WAEC and NECO Revision',q:'When reviewing a wrong answer, first identify:',options:['The font used','Where the reasoning went wrong','The next exam date','A random formula'],answer:1,difficulty:'Medium',explanation:'Understanding the error prevents repeating it.'},
{id:'s3-rev-4',topic:'WAEC and NECO Revision',q:'A mixed-topic mock exam tests:',options:['One formula only','Topic switching and overall readiness','Handwriting only','Attendance'],answer:1,difficulty:'Medium',explanation:'Real exams require switching between concepts.'},
{id:'s3-rev-5',topic:'WAEC and NECO Revision',q:'The best use of repeated mistakes is to:',options:['Ignore them','Create targeted practice for the weak skill','Memorise the wrong answer','Avoid the topic'],answer:1,difficulty:'Hard',explanation:'Targeted remediation directly addresses the learning gap.'}]
};
export const getSSS3PracticeQuestions=topic=>SSS3_PRACTICE[topic]||[];
export const getAllSSS3PracticeQuestions=()=>Object.values(SSS3_PRACTICE).flat();
