
import React, { useEffect, useState } from 'react';
import { UserProfile, Task, Recommendation } from '../types';
import { RecommendationEngine } from '../algorithms/recommendationEngine';
import { CheckCircle, Clock, Play, ArrowRight, BookOpen, Video, Mic, PenTool } from 'lucide-react';

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
        <h1 className="text-3xl font-bold text-slate-900 font-heading mb-2">Today's Sprint</h1>
        <p className="text-slate-500 font-medium">Complete these to stay on trajectory.</p>
      </header>

      <div className="space-y-4">
        {recommendation?.tasks.map((task, idx) => {
          const isDone = user.engagementHistory.some(h => h.completedIds.includes(task.id));
          return (
            <div 
              key={task.id}
              onClick={() => !isDone && onStartTask(task)}
              className={`group p-6 rounded-[2rem] border transition-all duration-300 cursor-pointer ${
                isDone 
                  ? 'bg-slate-50 border-slate-100 opacity-60 grayscale' 
                  : 'bg-white border-white shadow-premium hover:border-indigo-100'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-5">
                  <div className={`mt-1 p-3 rounded-2xl ${isDone ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
                    {isDone ? <CheckCircle size={24} /> : getIcon(task.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">{task.category}</span>
                      <span className="text-slate-200">•</span>
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 flex items-center gap-1">
                        <Clock size={10} /> {task.timeEstimate}m
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{task.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">{task.description}</p>
                  </div>
                </div>
                {!isDone && (
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                    <ArrowRight size={18} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 p-8 bg-slate-900 rounded-[2.5rem] text-center text-white">
        <h4 className="text-xl font-bold mb-2">You're doing great</h4>
        <p className="text-slate-400 text-sm mb-6">Complete today's sprint to unlock tomorrow's logic.</p>
        <button className="text-xs font-bold uppercase tracking-widest text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-colors">
          Optional: Explore Practice Hub
        </button>
      </div>
    </div>
  );
};

export default TodaySprint;
