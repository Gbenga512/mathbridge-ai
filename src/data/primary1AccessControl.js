// Primary 1 role access matrix for learner, parent and teacher views.
export const PRIMARY1_ROLES={student:{dashboard:true,ownProgress:true,parentReports:false,classReports:false},parent:{dashboard:true,ownProgress:false,parentReports:true,classReports:false},teacher:{dashboard:true,ownProgress:false,parentReports:false,classReports:true}};
export const canAccessPrimary1=(role,area)=>Boolean(PRIMARY1_ROLES[role]?.[area]);
