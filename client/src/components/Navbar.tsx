import type { FC } from 'react';
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
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'portal', label: 'Report Issue', icon: PlusCircleIcon },
    { id: 'dispatch', label: 'Priority Dispatch', icon: ShieldAlertIcon },
    { id: 'map', label: 'Campus Map', icon: MapPinIcon },
    { id: 'shift', label: 'Shift Planner', icon: ClockIcon },
    { id: 'benchmark', label: 'Benchmarks', icon: ActivityIcon },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer shrink-0"
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white font-black text-sm shadow-sm">
              UG
            </div>
            <span className="text-base font-extrabold text-slate-900 tracking-tight">
              UG Service Optimizer
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto scrollbar-none py-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white font-bold shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
