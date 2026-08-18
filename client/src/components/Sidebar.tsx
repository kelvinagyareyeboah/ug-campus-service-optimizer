import type { FC } from 'react';
import { useState } from 'react';
import {
  HomeIcon,
  DashboardIcon,
  PlusCircleIcon,
  ShieldAlertIcon,
  MapPinIcon,
  ClockIcon,
  ActivityIcon,
  MenuIcon,
  XIcon,
} from './Icons';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const navItems = [
  { id: 'landing', label: 'Overview', icon: HomeIcon },
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
  { id: 'portal', label: 'Report Issue', icon: PlusCircleIcon },
  { id: 'dispatch', label: 'Priority Dispatch', icon: ShieldAlertIcon },
  { id: 'map', label: 'Campus Map', icon: MapPinIcon },
  { id: 'shift', label: 'Shift Planner', icon: ClockIcon },
  { id: 'benchmark', label: 'Benchmarks', icon: ActivityIcon },
];

export const Sidebar: FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <aside className="hidden md:flex w-60 bg-[#0c4a6e] border-r border-[#0369a1] flex-col justify-between h-screen sticky top-0 shrink-0 text-[#faf6ee] p-5">
      <div className="space-y-6">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-lg bg-[#0077be] text-white flex items-center justify-center font-heading font-bold text-xs shadow-sm">
            UG
          </div>
          <div>
            <h1 className="text-sm font-heading font-bold text-white tracking-tight">
              UG Operations
            </h1>
            <p className="text-[10px] text-[#f5efe4]/70 font-medium">Campus Optimizer</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#faf6ee] text-[#0c4a6e] font-bold shadow-sm'
                    : 'text-[#f5efe4]/80 hover:text-white hover:bg-[#0369a1]/40'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-[#0369a1]/60 text-[11px] text-[#f5efe4]/70 text-center font-medium">
        Univ. of Ghana • DCIT 204/308
      </div>
    </aside>
  );
};

export const MobileNavbar: FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const activeItem = navItems.find((i) => i.id === activeTab) || navItems[0];

  const handleSelectTab = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <header className="md:hidden sticky top-0 z-50 bg-[#0c4a6e] border-b border-[#0369a1] text-[#faf6ee]">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <div 
          onClick={() => handleSelectTab('landing')}
          className="flex items-center space-x-2.5 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-[#0077be] text-white flex items-center justify-center font-heading font-bold text-xs shadow-sm">
            UG
          </div>
          <div>
            <h1 className="text-xs font-heading font-bold text-white leading-tight">UG Operations</h1>
            <p className="text-[10px] text-[#f5efe4]/70">{activeItem.label}</p>
          </div>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-[#0369a1]/50 text-white hover:bg-[#0369a1] transition-colors focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </div>

      {/* Mobile Slide-down Menu Drawer */}
      {isOpen && (
        <div className="border-t border-[#0369a1] bg-[#0c4a6e] p-4 space-y-1 shadow-lg">
          <p className="text-[10px] font-bold text-[#f5efe4]/60 uppercase tracking-wider px-2 mb-2">
            Mobile Navigation Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#faf6ee] text-[#0c4a6e] font-bold shadow-sm'
                    : 'text-[#f5efe4]/80 hover:text-white hover:bg-[#0369a1]/40'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
