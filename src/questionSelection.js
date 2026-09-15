const localSeen=userId=>{try{const prefix=`mathbridge-question-history:${userId||'local-user'}`;const seen=new Set();for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k===prefix||k?.startsWith(`${prefix}:`)){const value=JSON.parse(localStorage.getItem(k)||'[]');if(Array.isArray(value))value.forEach(id=>seen.add(String(id)))}}return[...seen]}catch{return[]}};
const shuffle=items=>{const a=[...(items||[])];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

/** Select a varied set while preferring unseen question IDs. */
export function selectFreshQuestions({userId,questions,count=10,byTopic=true,seenIds=null}){
 const source=Array.isArray(questions)?questions.filter(q=>q?.id!=null):[];
 if(!source.length||count<=0)return[];
 const seen=new Set((Array.isArray(seenIds)?seenIds:localSeen(userId)).map(String));
 const fresh=source.filter(q=>!seen.has(String(q.id)));
 const candidates=fresh.length>=count?fresh:source;
 if(!byTopic)return shuffle(candidates).slice(0,Math.min(count,candidates.length));
 const groups=new Map();
 for(const q of candidates){const topic=q?.topic||'General';if(!groups.has(topic))groups.set(topic,[]);groups.get(topic).push(q)}
 const selected=[];const selectedIds=new Set();
 const topics=shuffle([...groups.keys()]);
 for(const topic of topics){if(selected.length>=count)break;const q=shuffle(groups.get(topic)).find(x=>!selectedIds.has(String(x.id)));if(q){selected.push(q);selectedIds.add(String(q.id))}}
 if(selected.length<count){for(const q of shuffle(candidates)){if(selected.length>=count)break;if(!selectedIds.has(String(q.id))){selected.push(q);selectedIds.add(String(q.id))}}}
 return selected;
}

export function questionHistoryFallback({userId,questions,count=10,byTopic=true,seenIds=null}){return selectFreshQuestions({userId,questions,count,byTopic,seenIds});}
