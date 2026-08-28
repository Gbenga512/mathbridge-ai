// Temporary compatibility fix for the live term-based entry point.
// The production source should eventually use this wording directly in JSX.
(function(){
  const oldText='MathBridge follows the JSS1 scheme term by term, then week by week. Students always know what they are learning, what they have mastered and what comes next.';
  const newText='MathBridge follows the Nigerian Mathematics scheme for the selected class, term by term, then week by week. Students always know what they are learning, what they have mastered and what comes next.';
  const fix=()=>document.querySelectorAll('p').forEach(el=>{if(el.textContent.trim()===oldText)el.textContent=newText});
  const observer=new MutationObserver(fix);
  observer.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(fix,0);
  setTimeout(fix,500);
  setTimeout(fix,1500);
})();
