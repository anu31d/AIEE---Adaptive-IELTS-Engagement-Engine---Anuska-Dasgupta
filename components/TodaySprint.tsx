
import React, { useEffect, useState } from 'react';
import { UserProfile, Task, Recommendation } from '../types';
import { RecommendationEngine } from '../algorithms/recommendationEngine';
import { CheckCircle, Clock, Play, ArrowRight, BookOpen, Video, Mic, PenTool, Zap } from 'lucide-react';

const engine = new RecommendationEngine();

interface Props {
  user: UserProfile;
  onStartTask: (task: Task) => void;
}

const TodaySprint: React.FC<Props> = ({ user, onStartTask }) => {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      setLoading(true);
      const rec = await engine.getDailyRecommendation(user);
      setRecommendation(rec);
      setLoading(false);
    };
    fetchRecs();
  }, [user]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={18} />;
      case 'practice': return <BookOpen size={18} />;
      case 'prompt': return <Mic size={18} />;
      case 'review': return <PenTool size={18} />;
      default: return <BookOpen size={18} />;
    }
  };

  if (loading) return null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-in slide-in-from-bottom-4 duration-500">
      <header className="mb-12">
        <p className="text-indigo-500 font-bold text-xs uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
          <Zap size={14} fill="currentColor" />
          Active Sprint
        </p>
        <h1 className="text-3xl font-bold text-slate-900 font-heading mb-2">Today's <span className="gradient-text">Sprint</span></h1>
        <p className="text-slate-500 font-medium">Complete these to stay on trajectory.</p>
      </header>

      <div className="space-y-4">
        {recommendation?.tasks.map((task, idx) => {
          const isDone = user.engagementHistory.some(h => h.completedIds.includes(task.id));
          return (
            <div 
              key={task.id}
              onClick={() => !isDone && onStartTask(task)}
              className={`group p-6 rounded-[2rem] border-2 transition-all duration-300 cursor-pointer relative overflow-hidden ${
                isDone 
                  ? 'bg-slate-50/80 border-slate-100 opacity-70' 
                  : 'bg-white/80 backdrop-blur-sm border-white shadow-premium hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50 card-hover'
              }`}
            >
              {!isDone && <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -mr-16 -mt-16"></div>}
              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-start gap-5">
                  <div className={`mt-1 p-3.5 rounded-2xl transition-all duration-300 ${isDone ? 'bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600' : 'bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 group-hover:from-indigo-100 group-hover:to-purple-100'}`}>
                    {isDone ? <CheckCircle size={24} /> : getIcon(task.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">{task.category}</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-full">
                        <Clock size={10} /> {task.timeEstimate}m
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-900 transition-colors">{task.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{task.description}</p>
                  </div>
                </div>
                {!isDone && (
                  <div className="w-11 h-11 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-indigo-200/50">
                    <ArrowRight size={18} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2.5rem] text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500 rounded-full blur-[80px] opacity-20"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">On Track</span>
          </div>
          <h4 className="text-2xl font-bold mb-2 font-heading">You're doing great</h4>
          <p className="text-slate-400 text-sm mb-6">Complete today's sprint to unlock tomorrow's logic.</p>
          <button className="text-xs font-bold uppercase tracking-widest text-indigo-300 hover:text-white bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full transition-all duration-300">
            Explore Practice Hub →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodaySprint;
