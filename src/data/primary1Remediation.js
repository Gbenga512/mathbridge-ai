// Primary 1 remediation planner: turns weak topics into a focused next-study queue.
export const buildPrimary1Remediation=(report)=>{
 const weak=[...(report?.weakPoints||[])].sort((a,b)=>a.score-b.score);
 return weak.map((item,index)=>({priority:index+1,topic:item.topic,score:item.score,action:`Revise ${item.topic}, complete targeted practice, then retry mastery.`,requiredScore:80}));
};
export const remediationComplete=items=>!items?.length;
