const localSeen=userId=>{try{const raw=localStorage.getItem(`mathbridge-question-history:${userId||'local-user'}`);const value=JSON.parse(raw||'[]');return Array.isArray(value)?value.map(String):[]}catch{return[]}};
const shuffle=items=>{const a=[...(items||[])];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

/** Select a varied set while preferring unseen question IDs. */
export function selectFreshQuestions({userId,questions,count=10,byTopic=true,seenIds=null}){
 const source=Array.isArray(questions)?questions:[];
 if(!source.length||count<=0)return[];
 const seen=new Set((Array.isArray(seenIds)?seenIds:localSeen(userId)).map(String));
 const fresh=source.filter(q=>!seen.has(String(q.id)));
 const candidates=fresh.length>=count?fresh:source;
 if(!byTopic)return shuffle(candidates).slice(0,Math.min(count,candidates.length));
 const groups=new Map();
 for(const q of candidates){const topic=q?.topic||'General';if(!groups.has(topic))groups.set(topic,[]);groups.get(topic).push(q)}
 const selected=[];const topics=shuffle([...groups.keys()]);
 for(const topic of topics){if(selected.length>=count)break;selected.push(shuffle(groups.get(topic))[0])}
 if(selected.length<count){const used=new Set(selected.map(q=>String(q.id)));for(const q of shuffle(candidates)){if(selected.length>=count)break;if(!used.has(String(q.id))){selected.push(q);used.add(String(q.id))}}}
 return selected;
}

export function questionHistoryFallback({userId,questions,count=10,byTopic=true,seenIds=null}){return selectFreshQuestions({userId,questions,count,byTopic,seenIds});}
