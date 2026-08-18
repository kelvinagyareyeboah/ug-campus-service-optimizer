import type { FC } from 'react';
import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { ShieldAlertIcon, ZapIcon, CheckCircleIcon } from './Icons';

export const PriorityDispatch: FC = () => {
  const { requests, dispatchTopJob, simulateEmergency } = useData();
  const [preemptionAlert, setPreemptionAlert] = useState<string | null>(null);

  // Max-Heap Priority Queue ordering (sorted by priorityWeight descending)
  const heapQueue = [...requests].sort((a, b) => b.priorityWeight - a.priorityWeight);

  // Standard FIFO Queue ordering (order of submission time)
  const fifoQueue = [...requests];

  const handleSimulateEmergency = () => {
    const emgId = simulateEmergency();
    setPreemptionAlert(`Emergency Triggered: ${emgId} jumped directly to Position #1 in Max-Heap Priority Queue!`);
    setTimeout(() => setPreemptionAlert(null), 4500);
  };

  return (
    <div className="space-y-6 font-sans text-[#0c4a6e] max-w-5xl mx-auto py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e8dcc4]">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#0c4a6e] tracking-tight">
            Priority Dispatch Queue
          </h1>
          <p className="text-xs text-[#0369a1] mt-0.5">Emergency calls jump to Position #1 using Max-Binary Heap</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleSimulateEmergency}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0077be] hover:bg-[#006994] text-white font-bold text-xs shadow-sm transition-colors"
          >
            <ZapIcon size={14} /> Emergency Call
          </button>

          <button
            onClick={dispatchTopJob}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0c4a6e] hover:bg-[#072b42] text-white font-bold text-xs shadow-sm transition-colors"
          >
            <CheckCircleIcon size={14} /> Dispatch Top
          </button>
        </div>
      </div>

      {preemptionAlert && (
        <div className="p-3 rounded-lg bg-[#0077be]/10 border border-[#0077be]/30 text-[#0c4a6e] text-xs font-bold text-center flex items-center justify-center gap-2">
          <ShieldAlertIcon size={16} className="text-[#0077be]" />
          {preemptionAlert}
        </div>
      )}

      {/* 2-Column Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Max-Heap Priority Queue */}
        <div className="clean-card bg-white p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#e8dcc4]">
            <h3 className="text-xs font-heading font-bold text-[#0c4a6e] uppercase">
              Max-Heap Priority Queue
            </h3>
            <span className="text-[11px] font-mono text-[#0077be] bg-[#f5efe4] px-2 py-0.5 rounded border border-[#e8dcc4]">
              {heapQueue.length} jobs
            </span>
          </div>

          <div className="space-y-2">
            {heapQueue.map((ticket, index) => (
              <div
                key={ticket.id}
                className={`p-3 rounded-lg border flex items-center justify-between text-xs transition-colors ${
                  index === 0
                    ? 'bg-[#f5efe4] border-[#0077be]'
                    : 'bg-white border-[#e8dcc4]'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className={`w-6 h-6 rounded flex items-center justify-center text-[11px] font-mono font-bold ${
                    index === 0 ? 'bg-[#0077be] text-white' : 'bg-[#f5efe4] text-[#0c4a6e] border border-[#e8dcc4]'
                  }`}>
                    #{index + 1}
                  </span>
                  <div>
                    <span className="font-mono font-bold text-[#0077be]">{ticket.id}</span>
                    <h4 className="font-heading font-semibold text-[#0c4a6e]">{ticket.title}</h4>
                    <p className="text-[11px] text-[#0369a1]">📍 {ticket.location}</p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  ticket.priorityWeight === 4 ? 'badge-emergency' :
                  ticket.priorityWeight === 3 ? 'badge-high' :
                  ticket.priorityWeight === 2 ? 'badge-medium' :
                  'badge-low'
                }`}>
                  {ticket.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Standard FIFO Line */}
        <div className="clean-card bg-white p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#e8dcc4]">
            <h3 className="text-xs font-heading font-bold text-[#0c4a6e] uppercase">
              Standard Queue (FIFO)
            </h3>
            <span className="text-[11px] font-mono text-[#0369a1] bg-[#f5efe4] px-2 py-0.5 rounded border border-[#e8dcc4]">
              {fifoQueue.length} jobs
            </span>
          </div>

          <div className="space-y-2">
            {fifoQueue.map((ticket, index) => (
              <div
                key={ticket.id}
                className="p-3 rounded-lg bg-white border border-[#e8dcc4] flex items-center justify-between text-xs"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="w-6 h-6 rounded bg-[#f5efe4] text-[#0c4a6e] border border-[#e8dcc4] text-[11px] font-mono font-bold flex items-center justify-center">
                    #{index + 1}
                  </span>
                  <div>
                    <span className="font-mono text-[#0369a1]">{ticket.id}</span>
                    <h4 className="font-heading text-[#0c4a6e]">{ticket.title}</h4>
                    <p className="text-[11px] text-[#0369a1]">📍 {ticket.location}</p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#f5efe4] text-[#0c4a6e] border border-[#e8dcc4]">
                  {ticket.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
