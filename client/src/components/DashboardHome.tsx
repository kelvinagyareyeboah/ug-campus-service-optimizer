import type { FC } from 'react';
import { useState } from 'react';
import {
  DashboardIcon,
  AlertTriangleIcon,
  MapPinIcon,
  ActivityIcon,
  ZapIcon,
  DropletsIcon,
  MonitorIcon,
  BuildingIcon,
  TrashIcon,
  TreeIcon,
  ShieldAlertIcon,
  SearchIcon,
  ArrowRightIcon,
} from './Icons';

interface DashboardHomeProps {
  onNavigate: (tab: string) => void;
}

export const DashboardHome: FC<DashboardHomeProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const stats = [
    { title: 'Total Maintenance Tickets', value: '301', subtitle: 'Registered across campus', icon: DashboardIcon, color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { title: 'Emergency Alerts', value: '12', subtitle: 'Dispatched immediately', icon: AlertTriangleIcon, color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { title: 'Campus Landmarks', value: '51', subtitle: 'Connected via Dijkstra map', icon: MapPinIcon, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { title: 'Shift Productivity', value: '94.8%', subtitle: 'DP Knapsack optimized', icon: ActivityIcon, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  ];

  const categories = [
    { id: 'ALL', name: 'All Categories', icon: DashboardIcon },
    { id: 'ELECTRICAL', name: 'Electrical', icon: ZapIcon },
    { id: 'PLUMBING', name: 'Plumbing', icon: DropletsIcon },
    { id: 'ICT', name: 'ICT Support', icon: MonitorIcon },
    { id: 'FACILITY', name: 'Building & Facility', icon: BuildingIcon },
    { id: 'SANITATION', name: 'Sanitation', icon: TrashIcon },
    { id: 'GROUNDS', name: 'Outdoor', icon: TreeIcon },
    { id: 'EMERGENCY', name: 'Emergency', icon: ShieldAlertIcon },
  ];

  const sampleTickets = [
    { id: 'REQ-101', title: 'Main Server Room Power Outage', category: 'EMERGENCY', location: 'CS Dept, Lab 1', priority: 'EMERGENCY', status: 'IN_PROGRESS', time: '10 mins ago' },
    { id: 'REQ-102', title: 'Leaking Pipe in Restroom', category: 'PLUMBING', location: 'JQB, Ground Floor', priority: 'HIGH', status: 'ASSIGNED', time: '25 mins ago' },
    { id: 'REQ-103', title: 'Flickering Lights in Lecture Hall', category: 'ELECTRICAL', location: 'Balme Library', priority: 'MEDIUM', status: 'PENDING', time: '45 mins ago' },
    { id: 'REQ-104', title: 'Broken Reading Desk Chairs', category: 'FACILITY', location: 'Commonwealth Hall', priority: 'LOW', status: 'PENDING', time: '1 hour ago' },
    { id: 'REQ-105', title: 'Overflowing Waste Bins', category: 'SANITATION', location: 'Central Cafeteria', priority: 'MEDIUM', status: 'PENDING', time: '2 hours ago' },
    { id: 'REQ-106', title: 'Wi-Fi Access Point Reset', category: 'ICT', location: 'Pentagon Hostels', priority: 'HIGH', status: 'IN_PROGRESS', time: '2 hours ago' },
  ];

  const filteredTickets = sampleTickets.filter(t => {
    const matchesCat = selectedCategory === 'ALL' || t.category === selectedCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Hero Welcome Banner */}
      <div className="clean-card p-8 bg-slate-900 border-slate-800 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
        <div className="space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            University of Ghana • Legon Campus
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Campus Service Operations Center
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Manage campus repairs, prioritize emergency calls ahead of routine maintenance, navigate shortest driving routes, and plan technician shifts across 51 UG landmarks.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <button
            onClick={() => onNavigate('portal')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm transition-all flex items-center gap-2"
          >
            <span>Report New Issue</span>
            <ArrowRightIcon size={14} />
          </button>
          <button
            onClick={() => onNavigate('map')}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all"
          >
            View Campus Map
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="clean-card p-6 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.title}</span>
                <div className={`p-2.5 rounded-xl border ${stat.color}`}>
                  <Icon size={18} />
                </div>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-1">{stat.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Pills */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase">Filter by Domain</h2>
          <span className="text-xs text-slate-500 font-medium">{filteredTickets.length} Tickets Found</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <Icon size={14} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Maintenance Ticket List */}
      <div className="clean-card p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Active Maintenance Tickets</h3>
            <p className="text-xs text-slate-500">Live operational feed from database</p>
          </div>

          <div className="relative w-full sm:w-72">
            <SearchIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by ID, title, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="clean-input w-full pl-10 pr-4"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-4 rounded-xl bg-slate-50/60 border border-slate-200 hover:border-amber-500/50 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0 shadow-xs">
                  {ticket.category === 'EMERGENCY' ? <ShieldAlertIcon size={20} className="text-rose-600" /> :
                   ticket.category === 'PLUMBING' ? <DropletsIcon size={20} className="text-cyan-600" /> :
                   ticket.category === 'ELECTRICAL' ? <ZapIcon size={20} className="text-amber-600" /> :
                   <MonitorIcon size={20} className="text-indigo-600" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">{ticket.id}</span>
                    <h4 className="text-sm font-extrabold text-slate-900">{ticket.title}</h4>
                  </div>
                  <p className="text-xs text-slate-500 flex items-center gap-3">
                    <span>📍 {ticket.location}</span>
                    <span>•</span>
                    <span>🕒 {ticket.time}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 self-end md:self-auto shrink-0">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  ticket.priority === 'EMERGENCY' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                  ticket.priority === 'HIGH' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  ticket.priority === 'MEDIUM' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {ticket.priority}
                </span>

                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  ticket.status === 'IN_PROGRESS' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  ticket.status === 'ASSIGNED' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                  'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {ticket.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
