// Primary 1 offline-first progress helpers.
const KEY='mathbridge-primary1-offline-queue';
export const queuePrimary1Progress=payload=>{const q=JSON.parse(localStorage.getItem(KEY)||'[]');q.push({...payload,queuedAt:new Date().toISOString()});localStorage.setItem(KEY,JSON.stringify(q));return q};
export const getPrimary1SyncQueue=()=>JSON.parse(localStorage.getItem(KEY)||'[]');
export const clearPrimary1SyncQueue=()=>localStorage.removeItem(KEY);
