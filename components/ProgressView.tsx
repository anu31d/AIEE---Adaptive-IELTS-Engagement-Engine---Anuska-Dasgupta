
import React from 'react';
import { UserProfile } from '../types';
import { Award, Target, Zap, Clock, BarChart3 } from 'lucide-react';

interface Props {
  user: UserProfile;
}

const ProgressView: React.FC<Props> = ({ user }) => {
  // Fix: Explicitly type masteryAvg as number to resolve 'unknown' inference in arithmetic operations where it acts as left-hand operand
  const masteryValues = Object.values(user.skillMastery) as number[];
  const masteryAvg: number = masteryValues.length > 0 
    ? masteryValues.reduce((a: number, b: number) => a + b, 0) / masteryValues.length 
    : 0;
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in duration-500">
      <header className="mb-12">
        <p className="text-indigo-500 font-bold text-xs uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
          <BarChart3 size={14} />
          Analytics
        </p>
        <h1 className="text-3xl font-bold text-slate-900 font-heading mb-2">Growth <span className="gradient-text">Analytics</span></h1>
        <p className="text-slate-500 font-medium">Tracking your journey to Band {user.targetBand}.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Main Readiness Meter */}
        <div className="bg-white/80 backdrop-blur-sm p-10 rounded-[2.5rem] shadow-premium border border-slate-100/50 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-200 rounded-full blur-[80px] opacity-30"></div>
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-6 relative z-10">Current Readiness</p>
          <div className="relative w-48 h-48 mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="50%" stopColor="#7C3AED" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
              <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
              <circle cx="96" cy="96" r="88" stroke="url(#progressGradient)" strokeWidth="12" fill="transparent" strokeDasharray={552} strokeDashoffset={552 - (552 * masteryAvg)} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center transform rotate-0">
              <span className="text-5xl font-bold font-heading gradient-text">{Math.round(masteryAvg * 100)}%</span>
              <span className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Ready</span>
            </div>
          </div>
          <p className="text-slate-600 font-medium px-4 relative z-10">You've mastered <span className="text-indigo-600 font-semibold">{Math.round(masteryAvg * Object.keys(user.skillMastery).length)}</span> core skills. Ready for intermediate tasks.</p>
        </div>

        {/* Momentum Grid */}
        <div className="space-y-5">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-3xl border border-emerald-100/50 flex items-center gap-6 card-hover">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-md shadow-emerald-100">
              <Zap size={28} fill="currentColor" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-500/70 uppercase tracking-widest mb-1">Momentum</p>
              <h4 className="text-2xl font-bold text-emerald-900 font-heading">4 Day Streak 🔥</h4>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-3xl border border-indigo-100/50 flex items-center gap-6 card-hover">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-500 shadow-md shadow-indigo-100">
              <Clock size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-500/70 uppercase tracking-widest mb-1">Time Spent</p>
              <h4 className="text-2xl font-bold text-indigo-900 font-heading">3.5 Hours</h4>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-3xl flex items-center gap-6 text-white relative overflow-hidden card-hover shadow-lg shadow-slate-200">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500 rounded-full blur-[60px] opacity-30"></div>
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white shadow-inner relative z-10">
              <Target size={28} />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-1">Next Milestone</p>
              <h4 className="text-2xl font-bold font-heading bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">Band 6.0</h4>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
        <Award size={14} className="text-indigo-400" />
        Detailed Skill Graph
      </h3>
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] shadow-premium border border-slate-100/50 space-y-6">
        {Object.entries(user.skillMastery).map(([skillId, masteryValue], index) => {
          const mastery = masteryValue as number;
          const colors = [
            { gradient: 'from-blue-500 to-cyan-400', bg: 'bg-blue-50', text: 'text-blue-600' },
            { gradient: 'from-purple-500 to-pink-400', bg: 'bg-purple-50', text: 'text-purple-600' },
            { gradient: 'from-amber-500 to-orange-400', bg: 'bg-amber-50', text: 'text-amber-600' },
            { gradient: 'from-emerald-500 to-teal-400', bg: 'bg-emerald-50', text: 'text-emerald-600' }
          ];
          const color = colors[index % colors.length];
          return (
            <div key={skillId} className="space-y-3 p-4 rounded-2xl hover:bg-slate-50/50 transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color.gradient}`}></div>
                  <span className="font-bold text-slate-700">{skillId.toUpperCase()} Skills</span>
                </div>
                <span className={`text-xs font-bold ${color.text} ${color.bg} px-3 py-1 rounded-full`}>{Math.round(mastery * 100)}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${color.gradient} rounded-full transition-all duration-1000`} style={{ width: `${mastery * 100}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressView;
