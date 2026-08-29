import {jss3Questions} from './jss3Math';
export const JSS3_BECE_CONFIG={title:'JSS 3 BECE Mathematics Practice',durationMinutes:30,questionCount:20,passMark:50};
export const createJSS3BecePaper=()=>{const pool=jss3Questions.filter(q=>!['BECE mixed revision','BECE practice assessment'].includes(q.topic));const copy=[...pool];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]]}return copy.slice(0,JSS3_BECE_CONFIG.questionCount)};
