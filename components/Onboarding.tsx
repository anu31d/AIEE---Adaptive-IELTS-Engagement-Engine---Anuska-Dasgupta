
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full glass rounded-3xl p-8 shadow-xl step-transition">
        {step === 1 && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Welcome to AIEE</h1>
            <p className="text-slate-600">Let's build your adaptive IELTS plan. When is your exam?</p>
            <input 
              type="date" 
              className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={e => setData({...data, examDate: e.target.value})}
            />
            <button onClick={next} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition">
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Target Band</h1>
            <p className="text-slate-600">What is your dream score?</p>
            <div className="flex justify-between gap-2">
              {[6, 6.5, 7, 7.5, 8, 8.5].map(b => (
                <button 
                  key={b}
                  onClick={() => setData({...data, targetBand: b})}
                  className={`flex-1 py-3 rounded-xl border ${data.targetBand === b ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200'}`}
                >
                  {b}
                </button>
              ))}
            </div>
            <button onClick={next} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition">
              Almost there
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Daily Availability</h1>
            <p className="text-slate-600">How much time can you commit daily?</p>
            <div className="space-y-3">
              {[15, 25, 40].map(m => (
                <button 
                  key={m}
                  onClick={() => setData({...data, dailyTimeBudget: m as any})}
                  className={`w-full p-4 text-left rounded-xl border flex justify-between items-center ${data.dailyTimeBudget === m ? 'bg-indigo-50 border-indigo-200 ring-2 ring-indigo-500' : 'bg-white border-slate-200'}`}
                >
                  <span className="font-medium text-slate-700">{m} Minutes</span>
                  <span className="text-sm text-slate-400">{m === 15 ? 'Lite' : m === 25 ? 'Balanced' : 'Intensive'}</span>
                </button>
              ))}
            </div>
            <button onClick={finish} className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition">
              Build My Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
