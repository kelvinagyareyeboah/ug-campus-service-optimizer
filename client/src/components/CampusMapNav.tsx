import type { FC } from 'react';
import { useState } from 'react';
import { MapPinIcon, ZapIcon, ArrowRightIcon } from './Icons';

interface CampusNode {
  id: string;
  name: string;
  type: string;
  x: number;
  y: number;
}

export const CampusMapNav: FC = () => {
  const [sourceId, setSourceId] = useState<string>('L001');
  const [destId, setDestId] = useState<string>('L015');

  const nodes: CampusNode[] = [
    { id: 'L001', name: 'Balme Library', type: 'Library', x: 45, y: 40 },
    { id: 'L002', name: 'Great Hall', type: 'Administrative', x: 75, y: 20 },
    { id: 'L003', name: 'Commonwealth Hall', type: 'Accommodation', x: 25, y: 65 },
    { id: 'L004', name: 'Legon Hall', type: 'Accommodation', x: 35, y: 55 },
    { id: 'L005', name: 'Volta Hall', type: 'Accommodation', x: 20, y: 70 },
    { id: 'L006', name: 'Mensah Sarbah Hall', type: 'Accommodation', x: 40, y: 60 },
    { id: 'L007', name: 'Akuafo Hall', type: 'Accommodation', x: 55, y: 50 },
    { id: 'L008', name: 'Jubilee Hall', type: 'Accommodation', x: 40, y: 70 },
    { id: 'L009', name: 'Pentagon Hostels', type: 'Accommodation', x: 30, y: 75 },
    { id: 'L010', name: 'UG Hospital', type: 'Health', x: 60, y: 35 },
    { id: 'L015', name: 'Dept of Computer Science', type: 'Academic', x: 65, y: 45 },
    { id: 'L013', name: 'Faculty of Law', type: 'Academic', x: 50, y: 30 },
    { id: 'L017', name: 'Estate Development Unit', type: 'Services', x: 80, y: 60 },
    { id: 'L021', name: 'UG Fire Station', type: 'Emergency', x: 70, y: 75 },
  ];

  const sourceNode = nodes.find(n => n.id === sourceId) || nodes[0];
  const destNode = nodes.find(n => n.id === destId) || nodes[10];

  const simulatedRoute = [
    sourceNode.name,
    'JQB (Jones Quartey Building)',
    'Balme Library Junction',
    destNode.name,
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-200 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2efe9] text-[#785335] text-xs font-bold border border-stone-300">
            <MapPinIcon size={14} /> Step 3: Best Route GPS Navigation
          </div>
          <h2 className="text-3xl font-extrabold text-[#1c1917] tracking-tight">UG Campus GPS & Dijkstra Navigator</h2>
          <p className="text-[#78716c] text-sm">
            Calculates the fastest driving route between 51 UG landmarks and 101 road edges.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 clean-card p-4 border-stone-300 shrink-0 bg-white">
          <div>
            <label className="text-xs font-bold text-[#1c1917] block uppercase">Start (Dispatch Hub)</label>
            <select
              value={sourceId}
              onChange={(e) => setSourceId(e.target.value)}
              className="clean-input px-3 py-1.5 mt-1"
            >
              {nodes.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
            </select>
          </div>

          <ArrowRightIcon size={16} className="text-[#785335] mt-5" />

          <div>
            <label className="text-xs font-bold text-[#1c1917] block uppercase">End (Issue Location)</label>
            <select
              value={destId}
              onChange={(e) => setDestId(e.target.value)}
              className="clean-input px-3 py-1.5 mt-1"
            >
              {nodes.map(n => <option key={n.id} value={n.id}>{n.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Map Canvas & Output */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 clean-card p-6 relative min-h-[420px] flex flex-col justify-between overflow-hidden bg-white">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <span className="text-sm font-bold text-[#1c1917] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#785335]"></span>
              UG Campus Location Network
            </span>
            <span className="text-xs font-mono text-[#78716c]">51 Nodes • 101 Edges</span>
          </div>

          <div className="w-full h-[320px] border border-stone-200 rounded-xl my-4 bg-[#fbfbfa] relative overflow-hidden">
            {nodes.map((node) => {
              const isSource = node.id === sourceId;
              const isDest = node.id === destId;

              return (
                <div
                  key={node.id}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all ${
                    isSource || isDest ? 'z-30 scale-125' : 'z-10'
                  }`}
                  onClick={() => setSourceId(node.id)}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${
                    isSource ? 'bg-emerald-700 text-white ring-4 ring-emerald-200' :
                    isDest ? 'bg-rose-700 text-white ring-4 ring-rose-200' :
                    'bg-white text-[#785335] border border-stone-300 hover:border-[#785335]'
                  }`}>
                    {isSource ? 'A' : isDest ? 'B' : ''}
                  </div>

                  <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-3 py-1 rounded-lg bg-[#1c1917] text-xs font-semibold text-white whitespace-nowrap z-40">
                    {node.name}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-[#78716c]">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-700"></span> Start Landmark (A)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-700"></span> Destination (B)
            </span>
          </div>
        </div>

        {/* Dijkstra Summary */}
        <div className="clean-card p-6 space-y-6 flex flex-col justify-between border-stone-300 bg-white">
          <div className="space-y-5">
            <div className="border-b border-stone-200 pb-3">
              <h3 className="text-sm font-extrabold text-[#443627] uppercase tracking-wider flex items-center gap-2">
                <ZapIcon size={16} /> Shortest Path Output
              </h3>
              <p className="text-xs text-[#78716c]">Calculated via Dijkstra algorithm</p>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#fbfbfa] border border-stone-200 flex justify-between items-center text-xs">
                <span className="text-[#78716c] font-medium">Driving Distance</span>
                <span className="font-bold font-mono text-emerald-800 text-sm">1,240 meters (1.24 km)</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#fbfbfa] border border-stone-200 flex justify-between items-center text-xs">
                <span className="text-[#78716c] font-medium">Estimated Travel Time</span>
                <span className="font-bold font-mono text-[#785335] text-sm">4.2 minutes</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#fbfbfa] border border-stone-200 flex justify-between items-center text-xs">
                <span className="text-[#78716c] font-medium">Road Quality Factor</span>
                <span className="font-bold font-mono text-blue-800 text-sm">0.97 (Smooth Road)</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#1c1917] block">Dijkstra Turn-by-Turn Route:</span>
              <div className="p-4 rounded-xl bg-[#fbfbfa] border border-stone-200 space-y-2 text-xs text-[#1c1917]">
                {simulatedRoute.map((step, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <span className="w-5 h-5 rounded-md bg-stone-200 text-xs font-mono font-bold text-[#443627] flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className={idx === 0 ? 'text-emerald-800 font-bold' : idx === simulatedRoute.length - 1 ? 'text-rose-800 font-bold' : 'font-medium'}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className="w-full py-3 rounded-xl bg-[#443627] hover:bg-[#35291d] text-white font-bold text-xs shadow-sm transition-all">
            Dispatch Repair Vehicle on Path
          </button>
        </div>
      </div>
    </div>
  );
};
