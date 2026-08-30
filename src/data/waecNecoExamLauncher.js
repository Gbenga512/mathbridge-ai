export const CBT_OPTIONS=[{id:'WAEC',label:'WAEC Mathematics',description:'Timed mathematics practice with examination-style questions.'},{id:'NECO',label:'NECO Mathematics',description:'Timed mathematics practice with examination-style questions.'}];
export const getCbtLaunchOptions=()=>CBT_OPTIONS;
export const getCbtLaunchMessage=exam=>exam==='NECO'?'Prepare for your NECO Mathematics practice exam.':'Prepare for your WAEC Mathematics practice exam.';
