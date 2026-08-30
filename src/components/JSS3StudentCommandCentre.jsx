import React from 'react';

/**
 * JSS 3 Student Command Centre
 * Presentation-only component: it receives data and callbacks from the host app.
 */
export default function JSS3StudentCommandCentre({
  mastery = [],
  today = null,
  latestScore = null,
  readiness = null,
  streak = 0,
  onOpenLesson,
  onStartPractice,
  onStartChallenge,
}) {
  const weak = mastery.filter(t => t.percentage < 60).sort((a,b) => a.percentage - b.percentage)[0];
  const developing = mastery.filter(t => t.percentage >= 60 && t.percentage < 80).sort((a,b) => a.percentage - b.percentage)[0];
  const task = today || (weak ? { topic: weak.topic, action: 'lesson', focus: 'Review this topic before practising.' } : developing ? { topic: developing.topic, action: 'practice', focus: 'Target this topic until you reach 80%.' } : { topic: mastery[0]?.topic || 'Mathematics', action: 'challenge', focus: 'Keep your skills sharp with challenge questions.' });

  const openTask = () => {
    if (task.action === 'lesson') onOpenLesson?.(task.topic);
    else if (task.action === 'practice') onStartPractice?.(task.topic);
    else onStartChallenge?.(task.topic);
  };

  return (
    <section className="student-command-centre" aria-label="JSS 3 Student Command Centre">
      <div className="report">
        <span className="pill">🎓 JSS 3 Student Dashboard</span>
        <h2>What should I do today?</h2>
        <p>One clear next step based on your current mathematics progress.</p>
        <div className="report">
          <b>🎯 Today's Task</b>
          <h3>{task.topic}</h3>
          <p>{task.focus}</p>
          <button className="primary" onClick={openTask}>
            {task.action === 'lesson' ? '📘 Open Lesson →' : task.action === 'practice' ? '📝 Start Practice →' : '🔥 Start Challenge →'}
          </button>
        </div>
      </div>

      <div className="report">
        <b>📊 Your Snapshot</b>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:'10px',marginTop:'10px'}}>
          <div><small>Latest Score</small><br/><strong>{latestScore == null ? '—' : `${latestScore}%`}</strong></div>
          <div><small>Study Streak</small><br/><strong>🔥 {streak}</strong></div>
          <div><small>Weakest Topic</small><br/><strong>{weak?.topic || 'None'}</strong></div>
          <div><small>BECE Readiness</small><br/><strong>{readiness == null ? '—' : `${readiness}%`}</strong></div>
        </div>
      </div>

      <div className="report">
        <b>📚 Topic Mastery</b>
        {mastery.length === 0 && <p>Complete a practice activity to start building your mastery profile.</p>}
        {mastery.map(topic => (
          <div key={topic.topic} style={{marginTop:'10px'}}>
            <div style={{display:'flex',justifyContent:'space-between',gap:'8px'}}>
              <span>{topic.topic}</span><b>{topic.percentage}%</b>
            </div>
            <div style={{height:'8px',background:'rgba(0,0,0,.1)',borderRadius:'8px',overflow:'hidden',marginTop:'4px'}}>
              <div style={{height:'100%',width:`${Math.min(100,Math.max(0,topic.percentage))}%`,background:'currentColor'}} />
            </div>
            <small>{topic.status || (topic.percentage >= 80 ? 'Mastered' : topic.percentage >= 60 ? 'Developing' : 'Needs Practice')}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
