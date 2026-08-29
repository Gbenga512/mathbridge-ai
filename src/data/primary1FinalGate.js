// Primary 1 final completion gate.
export const primary1FinalGate=(termReports={})=>{const terms=['Term 1','Term 2','Term 3'];const status=terms.map(term=>({term,complete:!!termReports[term]?.complete,score:termReports[term]?.overallScore??null}));return{status,allComplete:status.every(x=>x.complete),next:status.find(x=>!x.complete)?.term||'Primary 2'};};
