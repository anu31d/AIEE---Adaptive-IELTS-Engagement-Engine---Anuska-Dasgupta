
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
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 z-[100] flex flex-col animate-in slide-in-from-right duration-300">
      {/* Top Header */}
      <nav className="p-6 flex items-center justify-between backdrop-blur-sm">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-900 transition-colors bg-white/60 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-sm hover:shadow-md">
          <ChevronLeft size={18} />
          <span>Leave Session</span>
        </button>
        <div className="px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full flex items-center gap-2 text-slate-600 text-xs font-bold uppercase tracking-widest shadow-sm border border-slate-100/50">
          <Clock size={14} className="text-indigo-500" /> <span className="text-indigo-600">{timeLeft.toFixed(1)}m</span> remaining
        </div>
      </nav>

      <div className="w-full h-1.5 bg-slate-100">
        <div className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-cyan-400 transition-all duration-100 ease-linear relative" style={{ width: `${progress}%` }}>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md border-2 border-indigo-500"></div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-6 py-12 flex flex-col items-center">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-[0.3em] mb-4 bg-indigo-50 px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              {task.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-heading mb-6">{task.title}</h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">{task.description}</p>
          </div>

          <div className="aspect-video bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-300/50 overflow-hidden relative group">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500 rounded-full blur-[100px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 rounded-full blur-[80px] opacity-20"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center text-white bg-gradient-to-t from-slate-900/80 via-transparent to-transparent">
              {task.type === 'video' ? (
                <div className="flex flex-col items-center gap-6 relative z-10">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform cursor-pointer border border-white/20 hover:bg-white/20">
                    <div className="w-0 h-0 border-t-[14px] border-t-transparent border-l-[24px] border-l-white border-b-[14px] border-b-transparent ml-2"></div>
                  </div>
                  <p className="font-medium text-slate-300 text-sm">Lesson content playing...</p>
                </div>
              ) : task.type === 'prompt' ? (
                <div className="flex flex-col items-center gap-6 relative z-10">
                   <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse-slow shadow-lg shadow-indigo-500/30">
                     <Volume2 size={36} />
                   </div>
                   <p className="font-medium text-indigo-300 uppercase tracking-widest text-xs">Awaiting Audio Input</p>
                </div>
              ) : (
                <div className="p-8 space-y-4 relative z-10">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <ShieldCheck size={40} className="text-indigo-300" />
                  </div>
                  <p className="text-xl font-bold font-heading">Active Practice Mode</p>
                  <p className="text-slate-400 text-sm">Follow instructions and finish before time runs out.</p>
                </div>
              )}
            </div>
          </div>

          {progress >= 100 && (
            <div className="mt-12 animate-in zoom-in-95 fade-in duration-500">
               <button 
                onClick={onComplete}
                className="w-full py-6 bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white rounded-[2rem] text-xl font-bold shadow-2xl shadow-indigo-200/50 hover:shadow-indigo-300/60 transition-all transform active:scale-[0.98] flex items-center justify-center gap-4 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <CheckCircle size={28} className="relative z-10" />
                <span className="relative z-10">Finish & Save Progress</span>
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TaskExecution;
