
import React from 'react';
import { Home, Zap, BarChart3, Search, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'today', icon: Zap, label: 'Today' },
    { id: 'progress', icon: BarChart3, label: 'Progress' },
    { id: 'hub', icon: Search, label: 'Explore' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-white/80 backdrop-blur-xl border-r border-slate-100/50 p-6 sticky top-0 h-screen shadow-xl shadow-slate-100/20">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-11 h-11 gradient-bg rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200/50 animate-float">
            <span className="text-lg">A</span>
          </div>
          <div>
            <span className="font-heading font-bold text-xl tracking-tight gradient-text block">AIEE</span>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Smart Prep</span>
          </div>
        </div>
        <nav className="flex-1 space-y-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium group ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 shadow-sm border border-indigo-100/50' 
                  : 'text-slate-500 hover:bg-slate-50/80 hover:text-slate-700'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-indigo-100 text-indigo-600' 
                  : 'group-hover:bg-slate-100'
              }`}>
                <tab.icon size={18} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
              </div>
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="p-5 gradient-bg-subtle rounded-2xl border border-indigo-100/50 mt-auto">
          <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2">Target Score</p>
          <div className="flex items-baseline gap-1">
            <p className="text-2xl font-bold gradient-text font-heading">7.5</p>
            <span className="text-sm font-medium text-slate-400">Band</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 md:pb-0">
        {children}
      </main>

      {/* Bottom Nav Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100/50 px-2 py-3 flex justify-around items-center z-50 shadow-lg shadow-slate-200/20">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center p-2.5 rounded-2xl transition-all duration-300 ${
              activeTab === tab.id 
                ? 'text-indigo-600 bg-indigo-50 scale-105' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            <span className={`text-[9px] font-bold mt-1.5 uppercase tracking-wider transition-all ${
              activeTab === tab.id ? 'opacity-100' : 'opacity-70'
            }`}>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
