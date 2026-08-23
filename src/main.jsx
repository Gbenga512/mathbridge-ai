import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const questions=[
 {q:'How do you feel when you see a Mathematics question?',a:['Confident','Okay','Worried','I want to avoid it']},
 {q:'What is 1/2 + 1/4?',a:['2/6','3/4','1/6','1/8'],correct:1},
 {q:'If 3x = 12, what is x?',a:['3','4','9','36'],correct:1},
 {q:'Which topic do you find most difficult?',a:['Fractions','Algebra','Geometry','Word problems']}
];
function App(){const [screen,setScreen]=useState('home');const [i,setI]=useState(0);const [score,setScore]=useState(0);const [name,setName]=useState('');
 const answer=(n)=>{if(questions[i].correct===n)setScore(s=>s+1); if(i<questions.length-1)setI(i+1);else setScreen('result')};
 return <div className="app"><header><div className="logo">Math<span>Bridge</span></div><button className="ghost" onClick={()=>setScreen('home')}>Home</button></header>
 {screen==='home'&&<main className="hero"><div className="pill">🎯 Mathematics Health Check</div><h1>Learn Maths.<br/><span>Lose the Fear.</span></h1><p>MathBridge finds the gaps in your foundation, explains difficult ideas simply, and helps you build confidence one step at a time.</p><div className="cards"><div><b>🧠 Diagnose</b><small>Find exactly where you need help.</small></div><div><b>💡 Simplify</b><small>Learn easy methods and memory tricks.</small></div><div><b>🏆 Improve</b><small>Practice, score points and level up.</small></div></div><button className="primary" onClick={()=>{setI(0);setScore(0);setScreen('quiz')}}>Start My Maths Health Check →</button><p className="note">Free • About 5 minutes • No pressure</p></main>}
 {screen==='quiz'&&<main className="quiz"><div className="progress"><span style={{width:`${(i/questions.length)*100}%`}}/></div><p className="step">QUESTION {i+1} OF {questions.length}</p><h2>{questions[i].q}</h2><div className="answers">{questions[i].a.map((x,n)=><button key={x} onClick={()=>answer(n)}>{x}<span>→</span></button>)}</div><p className="encourage">💙 There is no judgment here. This helps us find your best starting point.</p></main>}
 {screen==='result'&&<main className="result"><div className="badge">🎉</div><p className="step">YOUR FIRST MATHS HEALTH REPORT</p><h2>{name?`Great work, ${name}!`:'Great work!'}</h2><div className="score"><strong>{Math.round(score/questions.length*100)}%</strong><span>diagnostic score</span></div><div className="report"><h3>Your next step</h3><p>Your results suggest we should strengthen your foundation before moving ahead. MathBridge will give you a simple lesson, an easy method, practice questions and a timed challenge.</p><div className="recommend">📚 Recommended starting point <b>Foundation Builder</b></div></div><button className="primary" onClick={()=>setScreen('lesson')}>Start My Learning Path →</button></main>}
 {screen==='lesson'&&<main className="lesson"><div className="pill">✨ Your personalized lesson</div><h2>Fractions made simple</h2><p className="lead">A fraction tells you how many parts you have out of equal parts.</p><div className="formula"><small>THE EASY RULE</small><strong>Same denominator → add the numerators.</strong><p>½ + ¼ → 2/4 + 1/4 → <b>3/4</b></p></div><div className="song">🎵 <b>Memory Song</b><br/>“Same bottom, add the top — simplify and never stop!”</div><button className="primary" onClick={()=>setScreen('challenge')}>Practice This Skill →</button></main>}
 {screen==='challenge'&&<main className="challenge"><div className="pill">⏱️ Timed Challenge</div><h2>Ready to prove it?</h2><p>Answer 5 questions against the clock. Build your score and earn your first badge.</p><div className="challengebox"><span>🏆</span><b>Foundation Starter</b><small>Complete your first challenge to unlock it.</small></div><button className="primary" onClick={()=>setScreen('home')}>Back to Dashboard</button></main>}
 </div>}
createRoot(document.getElementById('root')).render(<App/>);
