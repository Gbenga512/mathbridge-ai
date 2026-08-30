export const SSS3_CBT_LAUNCHER={title:'SSS 3 Examination Centre',subtitle:'Prepare for WAEC and NECO Mathematics',exams:[{id:'WAEC',label:'WAEC Mathematics',duration:'150 minutes',questions:50},{id:'NECO',label:'NECO Mathematics',duration:'150 minutes',questions:50}]};
export const getSSS3CbtExam=id=>SSS3_CBT_LAUNCHER.exams.find(x=>x.id===id)||SSS3_CBT_LAUNCHER.exams[0];
