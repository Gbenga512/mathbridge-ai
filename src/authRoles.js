// MVP role/session model. This is UI-level role selection only; do not treat it as secure authentication.
export const ROLES={student:'student',parent:'parent',teacher:'teacher'};
export const roleLabels={student:'Student',parent:'Parent',teacher:'Teacher'};
export function loadRole(){try{return localStorage.getItem('mathbridge-role')||ROLES.student}catch{return ROLES.student}}
export function saveRole(role){try{localStorage.setItem('mathbridge-role',role)}catch{}return role}
export function clearRole(){try{localStorage.removeItem('mathbridge-role')}catch{}}
