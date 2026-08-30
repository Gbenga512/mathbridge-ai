import React,{useEffect}from'react';
import{createRoot}from'react-dom/client';
import'./styles.css';
import'./termStyles.css';
import'./sssEntry.css';
import SSSPortal from'./SSSPortal';
import'./main_term.jsx';

function SSSShell(){const goBack=()=>window.location.reload();return <main className="sss-shell"><div className="sss-head"><div><p className="step">SENIOR SECONDARY SCHOOL</p><h1>MathBridge SSS Learning Centre</h1><p>Choose your class to continue learning.</p></div><button className="secondary" onClick={goBack}>← Back to Curriculum</button></div><div className="sss-levels"><button className="sss-level" onClick={()=>window.__mathbridgeSSSRender('SSS1')}><strong>SSS 1</strong><span>Build your senior secondary foundation</span></button><button className="sss-level" onClick={()=>window.__mathbridgeSSSRender('SSS2')}><strong>SSS 2</strong><span>Develop deeper algebra, geometry and statistics</span></button><button className="sss-level" disabled><strong>SSS 3</strong><span>Preparation in progress — coming next</span></button></div></main>}
const root=createRoot(document.getElementById('root'));
const renderShell=()=>root.render(<SSSShell/>);
window.__mathbridgeSSSRender=level=>root.render(<SSSPortal level={level} onBack={renderShell}/>);
const install=()=>{const selects=[...document.querySelectorAll('select')];const levelSelect=selects.find(s=>[...s.options].some(o=>o.value==='Primary')&&[...s.options].some(o=>o.value==='JSS'))||selects[0];if(!levelSelect||levelSelect.dataset.sssReady)return false;if(![...levelSelect.options].some(o=>o.value==='SSS'))levelSelect.add(new Option('SSS','SSS'));levelSelect.dataset.sssReady='1';levelSelect.addEventListener('change',e=>{if(e.target.value==='SSS'){e.preventDefault();e.stopImmediatePropagation();renderShell()}},true);return true};
const observer=new MutationObserver(()=>install());observer.observe(document.getElementById('root'),{childList:true,subtree:true});
const timer=setInterval(()=>{if(install())clearInterval(timer)},100);
useEffect;
