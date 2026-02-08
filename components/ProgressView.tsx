
import React from 'react';
import { UserProfile } from '../types';
import { Award, Target, Zap, Clock } from 'lucide-react';

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
        <h1 className="text-3xl font-bold text-slate-900 font-heading mb-2">Growth Analytics</h1>
        <p className="text-slate-500 font-medium">Tracking your journey to Band {user.targetBand}.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Main Readiness Meter */}
        <div className="bg-white p-10 rounded-[2.5rem] shadow-premium border border-slate-50 flex flex-col items-center text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Current Readiness</p>
          <div className="relative w-48 h-48 mb-8">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
              {/* masteryAvg is now correctly typed as a number, allowing for arithmetic operations */}
              <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552} strokeDashoffset={552 - (552 * masteryAvg)} className="text-indigo-600 transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center transform rotate-0">
              {/* Fixed: masteryAvg is now confirmed as number for multiplication */}
              <span className="text-5xl font-bold font-heading text-slate-900">{Math.round(masteryAvg * 100)}%</span>
            </div>
          </div>
          {/* Fixed: masteryAvg is now confirmed as number for multiplication */}
          <p className="text-slate-600 font-medium px-4">You've mastered {Math.round(masteryAvg * Object.keys(user.skillMastery).length)} core skills. Ready for intermediate tasks.</p>
        </div>

        {/* Momentum Grid */}
        <div className="space-y-6">
          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
              <Zap size={28} fill="currentColor" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-600/60 uppercase tracking-widest mb-1">Momentum</p>
              <h4 className="text-2xl font-bold text-emerald-900 font-heading">4 Day Streak</h4>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
              <Clock size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-indigo-600/60 uppercase tracking-widest mb-1">Time Spent</p>
              <h4 className="text-2xl font-bold text-indigo-900 font-heading">3.5 Hours</h4>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl flex items-center gap-6 text-white">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white shadow-sm">
              <Target size={28} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Next Milestone</p>
              <h4 className="text-2xl font-bold font-heading">Band 6.0</h4>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Detailed Skill Graph</h3>
      <div className="bg-white p-8 rounded-[2rem] shadow-premium border border-slate-50 space-y-8">
        {Object.entries(user.skillMastery).map(([skillId, masteryValue]) => {
          // Fix: Explicitly cast masteryValue to number to resolve 'unknown' inference in arithmetic operations
          const mastery = masteryValue as number;
          return (
            <div key={skillId} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-700">{skillId.toUpperCase()} Skills</span>
                <span className="text-xs font-bold text-indigo-600">{Math.round(mastery * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transition-all duration-700" style={{ width: `${mastery * 100}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressView;
