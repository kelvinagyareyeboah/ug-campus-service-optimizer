import type { FC } from 'react';
import { useState } from 'react';
import { ShieldAlertIcon, ZapIcon, CheckCircleIcon } from './Icons';

interface Ticket {
  id: string;
  title: string;
  category: string;
  priorityWeight: number;
  priorityLabel: string;
  location: string;
  timestamp: string;
}

export const PriorityDispatch: FC = () => {
  const [heapQueue, setHeapQueue] = useState<Ticket[]>([
    { id: 'REQ-EMERGENCY', title: 'Main Power Outage Server Room', category: 'EMERGENCY', priorityWeight: 4, priorityLabel: 'EMERGENCY', location: 'CS Dept, Lab 1', timestamp: '10:02 AM' },
    { id: 'REQ-102', title: 'Leaking Pipe in Restroom', category: 'PLUMBING', priorityWeight: 3, priorityLabel: 'HIGH', location: 'JQB Ground Floor', timestamp: '09:45 AM' },
    { id: 'REQ-103', title: 'Wi-Fi Access Point Down', category: 'ICT', priorityWeight: 3, priorityLabel: 'HIGH', location: 'Balme Library', timestamp: '09:50 AM' },
    { id: 'REQ-104', title: 'Flickering Lights in Corridor', category: 'ELECTRICAL', priorityWeight: 2, priorityLabel: 'MEDIUM', location: 'Volta Hall', timestamp: '09:30 AM' },
    { id: 'REQ-105', title: 'Broken Chair Repair', category: 'FACILITY', priorityWeight: 1, priorityLabel: 'LOW', location: 'Commonwealth Hall', timestamp: '09:15 AM' },
  ]);

  const [fifoQueue, setFifoQueue] = useState<Ticket[]>([
    { id: 'REQ-105', title: 'Broken Chair Repair', category: 'FACILITY', priorityWeight: 1, priorityLabel: 'LOW', location: 'Commonwealth Hall', timestamp: '09:15 AM' },
    { id: 'REQ-104', title: 'Flickering Lights in Corridor', category: 'ELECTRICAL', priorityWeight: 2, priorityLabel: 'MEDIUM', location: 'Volta Hall', timestamp: '09:30 AM' },
    { id: 'REQ-102', title: 'Leaking Pipe in Restroom', category: 'PLUMBING', priorityWeight: 3, priorityLabel: 'HIGH', location: 'JQB Ground Floor', timestamp: '09:45 AM' },
    { id: 'REQ-103', title: 'Wi-Fi Access Point Down', category: 'ICT', priorityWeight: 3, priorityLabel: 'HIGH', location: 'Balme Library', timestamp: '09:50 AM' },
    { id: 'REQ-EMERGENCY', title: 'Main Power Outage Server Room', category: 'EMERGENCY', priorityWeight: 4, priorityLabel: 'EMERGENCY', location: 'CS Dept, Lab 1', timestamp: '10:02 AM' },
  ]);

  const [preemptionAlert, setPreemptionAlert] = useState<string | null>(null);

  const handleSimulateEmergency = () => {
    const newEmergencyTicket: Ticket = {
      id: `EMG-${Math.floor(Math.random() * 900 + 100)}`,
      title: 'Pipe Burst Flooding Basement',
      category: 'EMERGENCY',
      priorityWeight: 4,
      priorityLabel: 'EMERGENCY',
      location: 'UG Hospital Annex',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHeap = [newEmergencyTicket, ...heapQueue].sort((a, b) => b.priorityWeight - a.priorityWeight);
    setHeapQueue(updatedHeap);
    setFifoQueue([...fifoQueue, newEmergencyTicket]);

    setPreemptionAlert(`Emergency Triggered: ${newEmergencyTicket.id} jumped directly to Position #1 ahead of routine complaints!`);
    setTimeout(() => setPreemptionAlert(null), 4000);
  };

  const handleDispatchTop = () => {
    if (heapQueue.length === 0) return;
    setHeapQueue(heapQueue.slice(1));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-200 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2efe9] border border-stone-300 text-[#785335] text-xs font-bold">
            <ShieldAlertIcon size={14} /> Step 2: Emergency Line Jumping
          </div>
          <h2 className="text-3xl font-extrabold text-[#1c1917] tracking-tight">Smart Priority Dispatch Engine</h2>
          <p className="text-[#78716c] text-sm">
            Emergency calls automatically jump to Position #1, while routine repairs wait in order of arrival.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={handleSimulateEmergency}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-sm transition-all"
          >
            <ZapIcon size={16} /> Simulate Emergency Call
          </button>

          <button
            onClick={handleDispatchTop}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#443627] hover:bg-[#35291d] text-white font-bold text-xs shadow-sm transition-all"
          >
            <CheckCircleIcon size={16} /> Dispatch Top Job
          </button>
        </div>
      </div>

      {preemptionAlert && (
        <div className="p-4 rounded-xl bg-rose-100 border border-rose-300 text-rose-900 text-sm font-bold text-center flex items-center justify-center gap-2">
          <ShieldAlertIcon size={18} />
          {preemptionAlert}
        </div>
      )}

      {/* 2-Column Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Smart Priority Line */}
        <div className="clean-card p-6 space-y-4 border-stone-300 bg-white">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-[#443627] uppercase tracking-wider">
                Smart Priority Line (Priority Queue)
              </h3>
              <p className="text-xs text-[#78716c]">Emergency calls jump straight to Position #1</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#f2efe9] text-[#785335] text-xs font-mono font-bold border border-stone-300">
              {heapQueue.length} jobs
            </span>
          </div>

          <div className="space-y-3">
            {heapQueue.map((ticket, index) => (
              <div
                key={ticket.id}
                className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                  index === 0
                    ? 'bg-[#f5ebd9] border-[#c6a27e] text-[#1c1917] font-semibold shadow-sm'
                    : 'bg-[#fbfbfa] border-stone-200 text-[#1c1917]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${
                    index === 0 ? 'bg-[#443627] text-white' : 'bg-stone-200 text-stone-700'
                  }`}>
                    #{index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#785335]">{ticket.id}</span>
                      <h4 className="text-xs font-bold text-[#1c1917]">{ticket.title}</h4>
                    </div>
                    <p className="text-xs text-[#78716c] mt-0.5">📍 {ticket.location} • 🕒 {ticket.timestamp}</p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                  ticket.priorityWeight === 4 ? 'bg-rose-100 text-rose-800 border-rose-300' :
                  ticket.priorityWeight === 3 ? 'bg-[#f5ebd9] text-[#785335] border-[#d6c4a8]' :
                  ticket.priorityWeight === 2 ? 'bg-blue-100 text-blue-800 border-blue-300' :
                  'bg-stone-100 text-stone-700 border-stone-300'
                }`}>
                  {ticket.priorityLabel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Standard FIFO Line */}
        <div className="clean-card p-6 space-y-4 border-stone-300 bg-white">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <h3 className="text-sm font-extrabold text-[#1c1917] uppercase tracking-wider">
                Standard Line (First Come, First Served)
              </h3>
              <p className="text-xs text-[#78716c]">Processed strictly in order of submission time</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-mono font-bold border border-stone-300">
              {fifoQueue.length} jobs
            </span>
          </div>

          <div className="space-y-3">
            {fifoQueue.map((ticket, index) => (
              <div
                key={ticket.id}
                className="p-4 rounded-xl bg-[#fbfbfa] border border-stone-200 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-7 h-7 rounded-lg bg-stone-200 text-stone-700 text-xs font-mono font-bold flex items-center justify-center">
                    #{index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-semibold text-[#78716c]">{ticket.id}</span>
                      <h4 className="text-xs font-semibold text-[#1c1917]">{ticket.title}</h4>
                    </div>
                    <p className="text-xs text-[#78716c] mt-0.5">📍 {ticket.location} • 🕒 {ticket.timestamp}</p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-700 border border-stone-300">
                  {ticket.priorityLabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
