
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface Props {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    examDate: '',
    targetBand: 7.0,
    dailyTimeBudget: 25 as 15 | 25 | 40
  });

  const next = () => setStep(s => s + 1);

  const finish = () => {
    onComplete({
      ...data,
      currentBand: 5.5,
      skillMastery: {
        'g1': 0.3,
        'v1': 0.2,
        'r1': 0.1,
        'l1': 0.1
      },
      engagementHistory: []
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      
      <div className="max-w-md w-full glass rounded-[2.5rem] p-10 shadow-2xl shadow-indigo-100/30 relative z-10 border border-white/60">
        {/* Progress indicator */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'gradient-bg' : 'bg-slate-200'}`}></div>
          ))}
        </div>
        
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
            <div>
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2 block">Step 1 of 3</span>
              <h1 className="text-3xl font-bold text-slate-800 font-heading">Welcome to <span className="gradient-text">AIEE</span></h1>
            </div>
            <p className="text-slate-500 leading-relaxed">Let's build your adaptive IELTS plan. When is your exam?</p>
            <input 
              type="date" 
              className="w-full p-4 rounded-2xl border border-slate-200/80 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-indigo-200"
              onChange={e => setData({...data, examDate: e.target.value})}
            />
            <button onClick={next} className="w-full py-4 gradient-bg text-white rounded-2xl font-semibold shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
            <div>
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2 block">Step 2 of 3</span>
              <h1 className="text-3xl font-bold text-slate-800 font-heading">Target <span className="gradient-text">Band</span></h1>
            </div>
            <p className="text-slate-500 leading-relaxed">What is your dream score?</p>
            <div className="flex justify-between gap-2">
              {[6, 6.5, 7, 7.5, 8, 8.5].map(b => (
                <button 
                  key={b}
                  onClick={() => setData({...data, targetBand: b})}
                  className={`flex-1 py-3.5 rounded-xl border-2 font-semibold transition-all duration-300 ${data.targetBand === b ? 'gradient-bg text-white border-transparent shadow-lg shadow-indigo-200/50 scale-105' : 'bg-white/70 text-slate-600 border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/50'}`}
                >
                  {b}
                </button>
              ))}
            </div>
            <button onClick={next} className="w-full py-4 gradient-bg text-white rounded-2xl font-semibold shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
              Almost there
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
            <div>
              <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2 block">Step 3 of 3</span>
              <h1 className="text-3xl font-bold text-slate-800 font-heading">Daily <span className="gradient-text">Availability</span></h1>
            </div>
            <p className="text-slate-500 leading-relaxed">How much time can you commit daily?</p>
            <div className="space-y-3">
              {[15, 25, 40].map(m => (
                <button 
                  key={m}
                  onClick={() => setData({...data, dailyTimeBudget: m as any})}
                  className={`w-full p-5 text-left rounded-2xl border-2 flex justify-between items-center transition-all duration-300 ${data.dailyTimeBudget === m ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-300 ring-2 ring-indigo-500/20 shadow-md' : 'bg-white/70 border-slate-200 hover:border-indigo-200 hover:bg-indigo-50/30'}`}
                >
                  <span className="font-semibold text-slate-700">{m} Minutes</span>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${data.dailyTimeBudget === m ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>{m === 15 ? 'Lite' : m === 25 ? 'Balanced' : 'Intensive'}</span>
                </button>
              ))}
            </div>
            <button onClick={finish} className="w-full py-4 gradient-bg text-white rounded-2xl font-semibold shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-300/50 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
              <span>Build My Plan</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
