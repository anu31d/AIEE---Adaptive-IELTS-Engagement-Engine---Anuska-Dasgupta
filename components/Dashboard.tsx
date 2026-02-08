
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
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg-subtle"></div>
      <div className="flex flex-col items-center gap-6 relative z-10">
        <div className="relative">
          <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center animate-pulse-slow shadow-lg shadow-indigo-200/50">
            <Zap className="w-8 h-8 text-white" fill="currentColor" />
          </div>
          <div className="absolute -inset-2 gradient-bg rounded-3xl opacity-20 blur-xl animate-pulse"></div>
        </div>
        <div className="text-center">
          <p className="text-slate-600 font-semibold text-sm">Crafting your sprint...</p>
          <p className="text-slate-400 text-xs mt-1">Personalizing for maximum impact</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-6 pt-12 pb-12 animate-in fade-in duration-500">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <p className="text-indigo-500 font-bold text-xs uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Good morning, Student
          </p>
          <h1 className="text-4xl font-bold text-slate-900 font-heading">Dash<span className="gradient-text">board</span></h1>
        </div>
        <div className="text-right hidden sm:block gradient-bg-subtle p-4 rounded-2xl border border-indigo-100/50">
          <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Exam in</p>
          <p className="text-2xl font-bold gradient-text font-heading">45 Days</p>
        </div>
      </header>

      {/* Primary CTA Card: Today's Momentum Sprint */}
      <section 
        onClick={onStartSprint}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2.5rem] p-8 md:p-12 mb-10 text-white shadow-2xl shadow-indigo-300/30 cursor-pointer group active:scale-[0.98] transition-all duration-300 hover:shadow-indigo-400/40"
      >
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500 rounded-full blur-[120px] opacity-30 -mr-20 -mt-20 group-hover:opacity-50 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-purple-500 rounded-full blur-[100px] opacity-20 -ml-20 -mb-20 group-hover:opacity-40 transition-opacity duration-500"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-12 group-hover:via-white/10 transition-all"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 text-indigo-300 rounded-xl backdrop-blur-sm border border-white/10">
                <Zap size={20} fill="currentColor" />
              </div>
              <span className="text-indigo-300 font-bold text-sm uppercase tracking-widest">Active Momentum</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 leading-tight bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">Today's Sprint</h2>
            <div className="flex items-center gap-6 text-slate-300 font-medium">
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full"><Play size={16} fill="currentColor" className="text-indigo-400" /> {recommendation?.tasks.length} Tasks</span>
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full"><Calendar size={16} className="text-purple-400" /> ~{recommendation?.totalTime} Mins</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-white to-indigo-100 text-slate-900 rounded-full flex items-center justify-center shadow-xl shadow-indigo-500/20 group-hover:scale-110 group-hover:shadow-indigo-400/40 transition-all duration-300">
              <ChevronRight size={32} />
            </div>
          </div>
        </div>
      </section>

      {/* Grid: Stats & Micro Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Band Trajectory */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] shadow-premium border border-slate-100/50 card-hover">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-bold text-xl text-slate-800">Trajectory</h3>
            <div className="p-2 bg-emerald-50 rounded-xl">
              <TrendingUp size={20} className="text-emerald-500" />
            </div>
          </div>
          <div className="flex items-end gap-3 mb-5">
            <span className="text-5xl font-bold font-heading text-slate-900">5.5</span>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-0.5 bg-gradient-to-r from-slate-300 to-indigo-400 rounded-full"></div>
              <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </div>
            <span className="text-4xl font-bold font-heading gradient-text mb-0.5">7.5</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden relative">
            <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full transition-all duration-1000" style={{ width: '45%' }}></div>
            <div className="absolute inset-0 animate-shimmer pointer-events-none"></div>
          </div>
          <p className="text-xs font-bold text-slate-400 mt-4 uppercase tracking-widest">Projected Readiness: <span className="text-indigo-500">45%</span></p>
        </div>

        {/* Weekly Consistency */}
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] shadow-premium border border-slate-100/50 card-hover">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-bold text-xl text-slate-800">Consistency</h3>
            <span className="px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600 text-[10px] font-bold rounded-full uppercase border border-amber-100">🔥 On Streak</span>
          </div>
          <div className="flex gap-2 mb-6">
            {[true, true, true, false, false, false, false].map((done, i) => (
              <div key={i} className={`flex-1 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${done ? 'bg-gradient-to-br from-indigo-500 to-purple-600 border-transparent text-white shadow-md shadow-indigo-200/50' : 'bg-slate-50 border-slate-100 text-slate-300 hover:border-indigo-200'}`}>
                {done && <Zap size={14} fill="currentColor" />}
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm font-medium">3/5 days completed this week. <span className="text-indigo-500 font-semibold">Almost there!</span></p>
        </div>
      </div>

      {/* Motivation Insight Bar */}
      <div className="p-6 bg-gradient-to-r from-indigo-50/80 via-purple-50/50 to-cyan-50/50 rounded-2xl border border-indigo-100/50 flex items-start gap-4 mb-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>
        <div className="p-2.5 bg-white rounded-xl text-indigo-600 shadow-sm relative z-10">
          <Info size={18} />
        </div>
        <div className="relative z-10">
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">AI Insight</p>
          <p className="text-slate-700 text-sm leading-relaxed font-medium">
            "{insight}"
          </p>
        </div>
      </div>

      {/* Micro Progress Widgets */}
      <section>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Skill Breakdown</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {['Reading', 'Listening', 'Writing', 'Speaking'].map((skill, index) => {
            const colors = ['from-blue-500 to-cyan-400', 'from-purple-500 to-pink-400', 'from-amber-500 to-orange-400', 'from-emerald-500 to-teal-400'];
            const bgColors = ['bg-blue-50', 'bg-purple-50', 'bg-amber-50', 'bg-emerald-50'];
            return (
            <div key={skill} className={`${bgColors[index]} p-5 rounded-2xl border border-white/50 shadow-sm card-hover`}>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">{skill}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-white/60 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${colors[index]} rounded-full`} style={{ width: `${Math.random() * 60 + 20}%` }}></div>
                </div>
              </div>
            </div>
          )})}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
