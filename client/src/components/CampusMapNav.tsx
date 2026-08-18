import type { FC } from 'react';
import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { ZapIcon, ArrowRightIcon } from './Icons';

export const CampusMapNav: FC = () => {
  const { locations } = useData();
  const [sourceId, setSourceId] = useState<string>('L001');
  const [destId, setDestId] = useState<string>('L015');

  // Interactive map nodes subset (top key locations)
  const mapNodes = locations.slice(0, 14).map((l, i) => ({
    ...l,
    x: [45, 75, 25, 35, 20, 40, 55, 40, 30, 60, 65, 50, 80, 70][i] || 50,
    y: [40, 20, 65, 55, 70, 60, 50, 70, 75, 35, 45, 30, 60, 75][i] || 50,
  }));

  const sourceNode = locations.find(n => n.id === sourceId) || locations[0];
  const destNode = locations.find(n => n.id === destId) || locations[14] || locations[1];

  const simulatedRoute = [
    sourceNode.name,
    'JQB (Jones Quartey Building)',
    'Balme Library Junction',
    destNode.name,
  ];

  return (
    <div className="space-y-6 font-sans text-[#0c4a6e] max-w-5xl mx-auto py-2">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e8dcc4]">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#0c4a6e] tracking-tight">
            UG Campus GPS Navigator
          </h1>
          <p className="text-xs text-[#0369a1] mt-0.5">Dijkstra Shortest Path Finder ({locations.length} Locations • 101 Edges)</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={sourceId}
            onChange={(e) => setSourceId(e.target.value)}
            className="clean-input px-2.5 py-1.5 text-xs font-semibold max-w-[200px]"
          >
            {locations.map(n => <option key={n.id} value={n.id}>Start: {n.name}</option>)}
          </select>

          <ArrowRightIcon size={14} className="text-[#0077be]" />

          <select
            value={destId}
            onChange={(e) => setDestId(e.target.value)}
            className="clean-input px-2.5 py-1.5 text-xs font-semibold max-w-[200px]"
          >
            {locations.map(n => <option key={n.id} value={n.id}>End: {n.name}</option>)}
          </select>
        </div>
      </div>

      {/* Map & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 clean-card bg-white p-4 min-h-[360px] relative flex flex-col justify-between">
          <div className="w-full h-[280px] border border-[#e8dcc4] rounded-lg bg-[#f5efe4] relative overflow-hidden">
            {mapNodes.map((node) => {
              const isSource = node.id === sourceId;
              const isDest = node.id === destId;
              return (
                <div
                  key={node.id}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  onClick={() => setSourceId(node.id)}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm ${
                    isSource ? 'bg-[#0c4a6e] text-white ring-2 ring-[#0077be]' :
                    isDest ? 'bg-[#0077be] text-white ring-2 ring-[#0077be]' :
                    'bg-white text-[#0c4a6e] border border-[#e8dcc4]'
                  }`}>
                    {isSource ? 'A' : isDest ? 'B' : ''}
                  </div>
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded bg-[#0c4a6e] text-[10px] font-semibold text-white whitespace-nowrap z-40">
                    {node.name}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#0369a1] pt-2">
            <span>🔵 (A) Start Landmark</span>
            <span>🔷 (B) Destination</span>
          </div>
        </div>

        {/* Output */}
        <div className="clean-card bg-white p-4 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-xs font-heading font-bold text-[#0c4a6e] uppercase flex items-center gap-1.5 border-b border-[#e8dcc4] pb-2">
              <ZapIcon size={14} className="text-[#0077be]" /> Shortest Path Output
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#f5efe4] border border-[#e8dcc4] flex justify-between">
                <span className="text-[#0369a1]">Distance:</span>
                <span className="font-bold font-mono text-[#0c4a6e]">1,240m (1.24 km)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#f5efe4] border border-[#e8dcc4] flex justify-between">
                <span className="text-[#0369a1]">Est. Time:</span>
                <span className="font-bold font-mono text-[#0077be]">4.2 mins</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-[#0c4a6e]">Turn-by-Turn Route:</span>
              <div className="p-3 rounded-lg bg-[#f5efe4] border border-[#e8dcc4] space-y-1 text-[11px]">
                {simulatedRoute.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-[#0077be] text-white text-[9px] font-mono font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className={idx === 0 || idx === simulatedRoute.length - 1 ? 'font-bold text-[#0c4a6e]' : 'text-[#0369a1]'}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className="w-full py-2 rounded-lg bg-[#0077be] hover:bg-[#006994] text-white font-bold text-xs transition-colors">
            Dispatch Vehicle
          </button>
        </div>
      </div>
    </div>
  );
};
