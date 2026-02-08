
import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { ChevronLeft, CheckCircle, Clock, Volume2, ShieldCheck } from 'lucide-react';

interface Props {
  task: Task;
  onComplete: () => void;
  onBack: () => void;
}

const TaskExecution: React.FC<Props> = ({ task, onComplete, onBack }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const totalDuration = task.timeEstimate * 60 * 1000;
    const intervalTime = 100;
    const step = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress(p => {
        const next = p + step;
        return next >= 100 ? 100 : next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [task]);

  const timeLeft = Math.max(0, task.timeEstimate * (1 - progress / 100));

  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col animate-in slide-in-from-right duration-300">
      {/* Top Header */}
      <nav className="p-6 flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition-colors">
          <ChevronLeft size={20} />
          <span>Leave Session</span>
        </button>
        <div className="px-4 py-1.5 bg-slate-100 rounded-full flex items-center gap-2 text-slate-600 text-xs font-bold uppercase tracking-widest">
          <Clock size={14} /> {timeLeft.toFixed(1)}m remaining
        </div>
      </nav>

      <div className="w-full h-1 bg-slate-50">
        <div className="h-full bg-indigo-600 transition-all duration-100 ease-linear" style={{ width: `${progress}%` }}></div>
      </div>

      <main className="flex-1 overflow-y-auto px-6 py-12 flex flex-col items-center">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.3em] mb-4 block">{task.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">{task.title}</h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">{task.description}</p>
          </div>

          <div className="aspect-video bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white bg-gradient-to-t from-slate-900 via-transparent to-transparent">
              {task.type === 'video' ? (
                <div className="flex flex-col items-center gap-6">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
                  </div>
                  <p className="font-medium opacity-60">Lesson content playing...</p>
                </div>
              ) : task.type === 'prompt' ? (
                <div className="flex flex-col items-center gap-6">
                   <div className="w-24 h-24 bg-indigo-500 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-indigo-500/20">
                     <Volume2 size={32} />
                   </div>
                   <p className="font-medium opacity-80 uppercase tracking-widest text-xs">Awaiting Audio Input</p>
                </div>
              ) : (
                <div className="p-8 space-y-4">
                  <ShieldCheck size={48} className="mx-auto text-indigo-400" />
                  <p className="text-xl font-bold font-heading">Active Practice Mode</p>
                  <p className="opacity-60 text-sm">Follow instructions and finish before time runs out.</p>
                </div>
              )}
            </div>
          </div>

          {progress >= 100 && (
            <div className="mt-12 animate-in zoom-in-95 fade-in duration-500">
               <button 
                onClick={onComplete}
                className="w-full py-6 bg-slate-900 text-white rounded-[2rem] text-xl font-bold shadow-2xl shadow-slate-200 hover:bg-black transition-all transform active:scale-[0.98] flex items-center justify-center gap-4"
              >
                <CheckCircle size={28} />
                Finish & Save Progress
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TaskExecution;
