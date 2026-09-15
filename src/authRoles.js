// Production role/session model. Secure authorization is enforced by Supabase RLS; this module only stores the UI context.
export const ROLES={student:'student',parent:'parent',teacher:'teacher',school_admin:'school_admin'};
export const roleLabels={student:'Student',parent:'Parent',teacher:'Teacher',school_admin:'School Administrator'};
export function loadRole(){try{return localStorage.getItem('mathbridge-role')||ROLES.student}catch{return ROLES.student}}
export function saveRole(role){try{localStorage.setItem('mathbridge-role',role)}catch{}return role}
export function clearRole(){try{localStorage.removeItem('mathbridge-role')}catch{}}
