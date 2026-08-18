import type { FC } from 'react';
import { useState } from 'react';
import {
  DashboardIcon,
  PlusCircleIcon,
  ShieldAlertIcon,
  MapPinIcon,
  ClockIcon,
  ActivityIcon,
} from './Icons';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [activeRole, setActiveRole] = useState<string>('EXAMINER');

  const navItems = [
    { id: 'landing', label: 'Home', icon: DashboardIcon },
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'portal', label: 'Report Issue', icon: PlusCircleIcon },
    { id: 'dispatch', label: 'Priority Dispatch', icon: ShieldAlertIcon },
    { id: 'map', label: 'Campus Map', icon: MapPinIcon },
    { id: 'shift', label: 'Shift Planner', icon: ClockIcon },
    { id: 'benchmark', label: 'Benchmarks', icon: ActivityIcon },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0b0f19]/80 backdrop-blur-xl border-b border-[#1f2937] shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Title */}
          <div 
            className="flex items-center space-x-3 cursor-pointer shrink-0 group"
            onClick={() => setActiveTab('landing')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-heading font-extrabold text-xs shadow-md group-hover:scale-105 transition-transform">
              UG
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-heading font-extrabold text-white tracking-tight leading-none group-hover:text-blue-400 transition-colors">
                UG Service Optimizer
              </span>
              <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase pt-0.5">
                DCIT 204/308 DSA Project
              </span>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="flex items-center space-x-1 overflow-x-auto scrollbar-none py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold shadow-sm shadow-blue-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#111827]'
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Role Selector Badge */}
          <div className="hidden lg:flex items-center space-x-2 bg-[#111827] border border-[#1f2937] p-1 rounded-xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">Role:</span>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value)}
              className="bg-transparent text-xs font-bold text-blue-400 focus:outline-none cursor-pointer pr-2"
            >
              <option value="EXAMINER" className="bg-[#111827] text-white">👨‍🏫 Examiner (Demo)</option>
              <option value="DISPATCHER" className="bg-[#111827] text-white">🛡️ Dispatcher</option>
              <option value="TECHNICIAN" className="bg-[#111827] text-white">🔧 Technician</option>
              <option value="STUDENT" className="bg-[#111827] text-white">🎓 Student / Reporter</option>
            </select>
          </div>

        </div>
      </div>
    </header>
  );
};
