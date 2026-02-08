
import React, { useState, useEffect } from 'react';
import { UserProfile, Task } from './types';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import TodaySprint from './components/TodaySprint';
import ProgressView from './components/ProgressView';
import TaskExecution from './components/TaskExecution';
import Layout from './components/Layout';

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('aiee_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [activeTab, setActiveTab] = useState('home');
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('aiee_user', JSON.stringify(user));
    }
  }, [user]);

  const handleOnboarding = (profile: UserProfile) => {
    setUser(profile);
  };

  const completeTask = () => {
    if (!activeTask || !user) return;
    
    const currentMastery = user.skillMastery[activeTask.skillId] || 0;
    const newMastery = Math.min(1, currentMastery + 0.1);
    
    setUser({
      ...user,
      skillMastery: {
        ...user.skillMastery,
        [activeTask.skillId]: newMastery
      },
      engagementHistory: [
        ...user.engagementHistory,
        {
          date: new Date().toISOString(),
          taskIds: [activeTask.id],
          completedIds: [activeTask.id],
          duration: activeTask.timeEstimate,
          performance: { [activeTask.id]: 1.0 }
        }
      ]
    });
    
    setActiveTask(null);
  };

  if (!user) {
    return <Onboarding onComplete={handleOnboarding} />;
  }

  if (activeTask) {
    return (
      <TaskExecution 
        task={activeTask} 
        onComplete={completeTask} 
        onBack={() => setActiveTask(null)} 
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard user={user} onStartSprint={() => setActiveTab('today')} />;
      case 'today':
        return <TodaySprint user={user} onStartTask={setActiveTask} />;
      case 'progress':
        return <ProgressView user={user} />;
      case 'hub':
        return (
          <div className="flex items-center justify-center h-full p-12 text-center">
            <div className="max-w-xs">
              <h2 className="text-2xl font-bold font-heading mb-4">Practice Hub</h2>
              <p className="text-slate-500 text-sm mb-8">Extra practice modules are currently locked. Complete your daily sprints to gain full library access.</p>
              <button onClick={() => setActiveTab('today')} className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-indigo-100">Go to Today's Sprint</button>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="max-w-2xl mx-auto p-12">
            <header className="mb-12">
              <h1 className="text-3xl font-bold text-slate-900 font-heading mb-2">Profile</h1>
              <p className="text-slate-500 font-medium italic">Student Account (Beta)</p>
            </header>
            <div className="space-y-4">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center">
                <span className="font-bold text-slate-800">Target Band</span>
                <span className="text-indigo-600 font-bold">{user.targetBand}</span>
              </div>
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex justify-between items-center">
                <span className="font-bold text-slate-800">Exam Date</span>
                <span className="text-slate-600 font-medium">{new Date(user.examDate).toLocaleDateString()}</span>
              </div>
              <button 
                onClick={() => { localStorage.clear(); window.location.reload(); }}
                className="w-full p-6 text-red-500 font-bold hover:bg-red-50 rounded-3xl transition-colors border-2 border-dashed border-red-100"
              >
                Reset Account Momentum
              </button>
            </div>
          </div>
        );
      default:
        return <Dashboard user={user} onStartSprint={() => setActiveTab('today')} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
