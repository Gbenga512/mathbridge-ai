// Role-aware Primary 1 report access rules.
export const canViewPrimary1Report=(role,reportOwnerId,requesterId)=>{if(role==='student')return reportOwnerId===requesterId;if(role==='parent'||role==='teacher')return true;return false};
export const allowedPrimary1ReportFields=role=>role==='student'?['score','mastered','weakPoints','recommendation']:role==='parent'?['score','mastered','weakPoints','recommendation','term']:role==='teacher'?['score','mastered','weakPoints','recommendation','term','classAverage','classWeakPoints']:[];
