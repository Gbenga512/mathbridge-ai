import {freshQuestions} from './questionHistory';

const shuffle=items=>{const a=[...(items||[])];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

/**
 * Selects a varied question set while preferring questions the student has never seen.
 * The caller should persist the selected IDs with recordQuestionExposure after selection.
 */
export function selectFreshQuestions({userId,questions,count=10,byTopic=true}){
  const source=Array.isArray(questions)?questions:[];
  if(!source.length||count<=0)return [];
  const fresh=freshQuestions(userId,source);
  const candidates=fresh.length>=count?fresh:source;
  if(!byTopic)return shuffle(candidates).slice(0,Math.min(count,candidates.length));

  const groups=new Map();
  for(const q of candidates){const topic=q?.topic||'General';if(!groups.has(topic))groups.set(topic,[]);groups.get(topic).push(q)}
  const topics=shuffle([...groups.keys()]);
  const selected=[];
  for(const topic of topics){if(selected.length>=count)break;selected.push(shuffle(groups.get(topic))[0])}
  if(selected.length<count){
    const used=new Set(selected.map(q=>String(q.id)));
    for(const q of shuffle(candidates)){if(selected.length>=count)break;if(!used.has(String(q.id))){selected.push(q);used.add(String(q.id))}}
  }
  return selected;
}

export function questionHistoryFallback({userId,questions,count=10,byTopic=true}){
  return selectFreshQuestions({userId,questions,count,byTopic});
}
