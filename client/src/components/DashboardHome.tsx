import type { FC } from 'react';
import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import {
  DashboardIcon,
  ZapIcon,
  DropletsIcon,
  MonitorIcon,
  BuildingIcon,
  TrashIcon,
  TreeIcon,
  ShieldAlertIcon,
  SearchIcon,
  PlusCircleIcon,
} from './Icons';

interface DashboardHomeProps {
  onNavigate: (tab: string) => void;
}

export const DashboardHome: FC<DashboardHomeProps> = ({ onNavigate }) => {
  const { requests, locations } = useData();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'ALL', name: 'All', icon: DashboardIcon },
    { id: 'ELECTRICAL', name: 'Electrical', icon: ZapIcon },
    { id: 'PLUMBING', name: 'Plumbing', icon: DropletsIcon },
    { id: 'ICT', name: 'ICT Support', icon: MonitorIcon },
    { id: 'FACILITY', name: 'Facility', icon: BuildingIcon },
    { id: 'SANITATION', name: 'Sanitation', icon: TrashIcon },
    { id: 'GROUNDS', name: 'Outdoor', icon: TreeIcon },
    { id: 'EMERGENCY', name: 'Emergency', icon: ShieldAlertIcon },
  ];

  const filteredTickets = requests.filter(t => {
    const matchesCat = selectedCategory === 'ALL' || t.category === selectedCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans text-[#0c4a6e] max-w-5xl mx-auto py-2">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e8dcc4]">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#0c4a6e] tracking-tight">
            Service Operations Dashboard
          </h1>
          <p className="text-xs text-[#0369a1] mt-0.5">Live campus ticket feed and status monitoring</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('portal')}
            className="px-3.5 py-2 rounded-lg bg-[#0077be] text-white font-bold text-xs hover:bg-[#006994] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <PlusCircleIcon size={14} />
            <span>Report Issue</span>
          </button>
          <button
            onClick={() => onNavigate('dispatch')}
            className="px-3.5 py-2 rounded-lg bg-white border border-[#e8dcc4] text-[#0c4a6e] font-bold text-xs hover:bg-[#f5efe4] transition-colors flex items-center gap-1.5"
          >
            <ShieldAlertIcon size={14} />
            <span>Priority Queue</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="clean-card bg-white p-4 space-y-1">
          <span className="text-[11px] font-bold text-[#0369a1] uppercase">Total Active Requests</span>
          <p className="text-2xl font-heading font-extrabold text-[#0c4a6e]">{requests.length}</p>
        </div>
        <div className="clean-card bg-white p-4 space-y-1">
          <span className="text-[11px] font-bold text-[#0369a1] uppercase">Emergency Priority</span>
          <p className="text-2xl font-heading font-extrabold text-[#be123c]">
            {requests.filter(r => r.priority === 'EMERGENCY').length}
          </p>
        </div>
        <div className="clean-card bg-white p-4 space-y-1">
          <span className="text-[11px] font-bold text-[#0369a1] uppercase">UG Landmarks</span>
          <p className="text-2xl font-heading font-extrabold text-[#0c4a6e]">{locations.length} Locations</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'bg-[#0077be] text-white font-bold'
                      : 'bg-white text-[#0c4a6e] border border-[#e8dcc4] hover:bg-[#f5efe4]'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <SearchIcon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0077be]" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="clean-input w-full pl-9 pr-3 py-1.5 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Ticket List */}
      <div className="clean-card bg-white p-4 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#e8dcc4] text-xs font-bold text-[#0369a1]">
          <span>{filteredTickets.length} Tickets</span>
          <span className="font-mono text-[#0077be]">Sorted by Urgency</span>
        </div>

        <div className="space-y-2">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-3 rounded-lg bg-[#f5efe4] border border-[#e8dcc4] flex items-center justify-between text-xs"
            >
              <div className="flex items-center space-x-3">
                <span className="font-mono font-bold text-[#0077be] bg-white px-2 py-0.5 rounded border border-[#e8dcc4]">
                  {ticket.id}
                </span>
                <div>
                  <h4 className="font-heading font-bold text-[#0c4a6e]">{ticket.title}</h4>
                  <p className="text-[#0369a1] text-[11px] mt-0.5 flex items-center gap-2">
                    <span>📍 {ticket.location}</span>
                    <span>•</span>
                    <span>🕒 {ticket.time}</span>
                  </p>
                </div>
              </div>

              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                ticket.priority === 'EMERGENCY' ? 'badge-emergency' :
                ticket.priority === 'HIGH' ? 'badge-high' :
                ticket.priority === 'MEDIUM' ? 'badge-medium' :
                'badge-low'
              }`}>
                {ticket.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
