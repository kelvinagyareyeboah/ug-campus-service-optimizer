import type { FC } from 'react';
import {
  DashboardIcon,
  ShieldAlertIcon,
  MapPinIcon,
  ClockIcon,
  ActivityIcon,
  ArrowRightIcon,
  PlusCircleIcon,
} from './Icons';

interface LandingPageProps {
  onNavigate: (tab: string) => void;
}

export const LandingPage: FC<LandingPageProps> = ({ onNavigate }) => {
  const modules = [
    { id: 'dashboard', title: 'Dashboard', desc: 'Live ticket feed & campus service monitoring.', dsa: 'Hash Table', icon: DashboardIcon },
    { id: 'dispatch', title: 'Priority Dispatch', desc: 'Max-Heap emergency queue line jumping.', dsa: 'Max Heap', icon: ShieldAlertIcon },
    { id: 'map', title: 'Campus Map', desc: 'Shortest path GPS driving router.', dsa: 'Dijkstra', icon: MapPinIcon },
    { id: 'shift', title: 'Shift Planner', desc: 'Optimal work schedule within shift hours.', dsa: '0/1 Knapsack', icon: ClockIcon },
    { id: 'benchmark', title: 'Benchmarks', desc: 'Algorithm search and sort speed profiling.', dsa: 'Profiler', icon: ActivityIcon },
  ];

  return (
    <div className="space-y-8 font-sans text-[#0c4a6e] max-w-5xl mx-auto py-2">
      
      {/* Header */}
      <div className="space-y-3 pb-6 border-b border-[#e8dcc4]">
        <span className="text-xs font-bold text-[#0077be] uppercase tracking-wider bg-[#0077be]/10 px-3 py-1 rounded-full">
          UG Campus Operations
        </span>
        <h1 className="text-3xl font-heading font-extrabold text-[#0c4a6e] tracking-tight">
          Campus Service Operations Optimizer
        </h1>
        <p className="text-sm text-[#0369a1] max-w-2xl leading-relaxed">
          An algorithmic platform for University of Ghana maintenance operations, graph routing, priority dispatching, and shift scheduling.
        </p>
        
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2.5 rounded-lg bg-[#0077be] text-white font-bold text-xs hover:bg-[#006994] transition-colors flex items-center gap-2 shadow-sm"
          >
            <span>Open Dashboard</span>
            <ArrowRightIcon size={14} />
          </button>
          <button
            onClick={() => onNavigate('portal')}
            className="px-4 py-2.5 rounded-lg bg-white border border-[#e8dcc4] text-[#0c4a6e] font-bold text-xs hover:bg-[#f5efe4] transition-colors flex items-center gap-2"
          >
            <PlusCircleIcon size={14} />
            <span>Report Issue</span>
          </button>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-4">
        <h2 className="text-base font-heading font-extrabold text-[#0c4a6e]">System Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => onNavigate(m.id)}
                className="clean-card bg-white p-5 space-y-3 cursor-pointer hover:border-[#0077be] transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-[#0077be]/10 text-[#0077be] flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-[#0369a1] bg-[#f5efe4] px-2 py-0.5 rounded border border-[#e8dcc4]">
                    {m.dsa}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-heading font-bold text-[#0c4a6e] group-hover:text-[#0077be] transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs text-[#0369a1] mt-1">{m.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
