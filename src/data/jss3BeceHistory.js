const KEY='mathbridge-jss3-bece-history';
export const loadJSS3BeceHistory=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}};
export const saveJSS3BeceAttempt=attempt=>{const history=loadJSS3BeceHistory();const next=[{...attempt,id:Date.now()},...history].slice(0,20);localStorage.setItem(KEY,JSON.stringify(next));return next};
export const getJSS3BeceTrend=history=>history.length<2?null:{first:history[history.length-1].percentage,latest:history[0].percentage,change:history[0].percentage-history[history.length-1].percentage};
