
import React, { useEffect, useState } from 'react';
import { UserProfile, Task, Recommendation } from '../types';
import { RecommendationEngine } from '../algorithms/recommendationEngine';
import { GeminiService } from '../services/geminiService';
import { Play, TrendingUp, Calendar, Info, ChevronRight, Zap } from 'lucide-react';

const engine = new RecommendationEngine();
const gemini = new GeminiService();

interface Props {
  user: UserProfile;
  onStartSprint: () => void;
}

const Dashboard: React.FC<Props> = ({ user, onStartSprint }) => {
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecs = async () => {
      setLoading(true);
      const rec = await engine.getDailyRecommendation(user);
      setRecommendation(rec);
      
      // Use the service method instead of hacking access to private instance property
      const motivationalInsight = await gemini.getMotivationalInsight(user.targetBand);
      setInsight(motivationalInsight);
      
      setLoading(false);
    };
    fetchRecs();
  }, [user]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-pulse rounded-full h-12 w-12 bg-indigo-100 flex items-center justify-center">
          <div className="h-6 w-6 rounded-full bg-indigo-600"></div>
        </div>
        <p className="text-slate-400 font-medium text-sm">Crafting your sprint...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 pt-12 pb-12 animate-in fade-in duration-500">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-2">Good morning, Student</p>
          <h1 className="text-4xl font-bold text-slate-900 font-heading">Dashboard</h1>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Exam in</p>
          <p className="text-2xl font-bold text-slate-800 font-heading">45 Days</p>
        </div>
      </header>

      {/* Primary CTA Card: Today's Momentum Sprint */}
      <section 
        onClick={onStartSprint}
        className="relative overflow-hidden bg-slate-900 rounded-[2.5rem] p-8 md:p-12 mb-10 text-white shadow-2xl shadow-indigo-200 cursor-pointer group active:scale-[0.98] transition-all"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20 group-hover:opacity-40 transition-opacity"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg">
                <Zap size={20} fill="currentColor" />
              </div>
              <span className="text-indigo-400 font-bold text-sm uppercase tracking-widest">Active Momentum</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 leading-tight">Today's Sprint</h2>
            <div className="flex items-center gap-6 text-slate-300 font-medium">
              <span className="flex items-center gap-2"><Play size={16} fill="currentColor" /> {recommendation?.tasks.length} Tasks</span>
              <span className="flex items-center gap-2"><Calendar size={16} /> ~{recommendation?.totalTime} Mins</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
              <ChevronRight size={32} />
            </div>
          </div>
        </div>
      </section>

      {/* Grid: Stats & Micro Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Band Trajectory */}
        <div className="bg-white p-8 rounded-[2rem] shadow-premium border border-slate-50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-bold text-xl text-slate-800">Trajectory</h3>
            <TrendingUp size={20} className="text-emerald-500" />
          </div>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-5xl font-bold font-heading text-slate-900">5.5</span>
            <span className="text-slate-300 text-3xl font-heading mb-1">→</span>
            <span className="text-4xl font-bold font-heading text-indigo-600 mb-0.5">7.5</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <p className="text-xs font-bold text-slate-400 mt-4 uppercase tracking-widest">Projected Readiness: 45%</p>
        </div>

        {/* Weekly Consistency */}
        <div className="bg-white p-8 rounded-[2rem] shadow-premium border border-slate-50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-bold text-xl text-slate-800">Consistency</h3>
            <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full uppercase">On Streak</span>
          </div>
          <div className="flex gap-2 mb-6">
            {[true, true, true, false, false, false, false].map((done, i) => (
              <div key={i} className={`flex-1 h-12 rounded-xl flex items-center justify-center border-2 ${done ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-slate-50 border-slate-100 text-slate-300'}`}>
                {done && <Zap size={14} fill="currentColor" />}
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm font-medium">3/5 days completed this week. Almost there!</p>
        </div>
      </div>

      {/* Motivation Insight Bar */}
      <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex items-start gap-4 mb-10">
        <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm">
          <Info size={18} />
        </div>
        <div>
          <p className="text-slate-700 text-sm leading-relaxed font-medium italic">
            "{insight}"
          </p>
        </div>
      </div>

      {/* Micro Progress Widgets */}
      <section>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Skill Breakdown</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {['Reading', 'Listening', 'Writing', 'Speaking'].map((skill) => (
            <div key={skill} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">{skill}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-900" style={{ width: `${Math.random() * 60 + 20}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
