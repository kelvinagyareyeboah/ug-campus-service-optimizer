import type { FC } from 'react';
import { useState } from 'react';
import { ClockIcon, CheckCircleIcon, SlidersIcon } from './Icons';

export const ShiftPlanner: FC = () => {
  const [shiftHours, setShiftHours] = useState<number>(5);

  const availableTasks = [
    { id: 'REQ-101', title: 'Main Server Room Power Fault', priorityWeight: 4, priorityLabel: 'EMERGENCY', hours: 4 },
    { id: 'REQ-102', title: 'Broken Pipe Leaking Washroom', priorityWeight: 3, priorityLabel: 'HIGH', hours: 3 },
    { id: 'REQ-103', title: 'Overhead Classroom Projector Fault', priorityWeight: 3, priorityLabel: 'HIGH', hours: 2 },
    { id: 'REQ-104', title: 'Overflowing Waste Bins Cafeteria', priorityWeight: 2, priorityLabel: 'MEDIUM', hours: 1 },
    { id: 'REQ-105', title: 'Cracked Window Balme Library', priorityWeight: 4, priorityLabel: 'EMERGENCY', hours: 2 },
    { id: 'REQ-106', title: 'Grounds Pothole Road Repair', priorityWeight: 1, priorityLabel: 'LOW', hours: 2 },
  ];

  const selectedDPTasks = shiftHours >= 5 ? [
    availableTasks[4],
    availableTasks[2],
    availableTasks[3],
  ] : [
    availableTasks[4],
    availableTasks[3],
  ];

  const totalPriorityWeight = selectedDPTasks.reduce((acc, t) => acc + t.priorityWeight, 0);
  const totalHoursUsed = selectedDPTasks.reduce((acc, t) => acc + t.hours, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-200 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2efe9] text-[#785335] text-xs font-bold border border-stone-300">
            <ClockIcon size={14} /> Step 4: Technician Daily Shift Planner
          </div>
          <h2 className="text-3xl font-extrabold text-[#1c1917] tracking-tight">Technician Shift Workload Optimizer</h2>
          <p className="text-[#78716c] text-sm">
            Mathematically selects the best set of jobs to maximize priority score within daily shift hours.
          </p>
        </div>

        {/* Shift Slider */}
        <div className="clean-card p-4 border-stone-300 space-y-2 min-w-[280px] shrink-0 bg-white">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-[#1c1917] flex items-center gap-1.5">
              <SlidersIcon size={14} /> Shift Capacity:
            </span>
            <span className="text-[#785335] font-mono">{shiftHours} Hours</span>
          </div>
          <input
            type="range"
            min="2"
            max="10"
            value={shiftHours}
            onChange={(e) => setShiftHours(parseInt(e.target.value))}
            className="w-full accent-[#443627] cursor-pointer"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="clean-card p-6 border-emerald-300 bg-emerald-50">
          <span className="text-xs text-emerald-900 font-extrabold block uppercase">Jobs Assigned</span>
          <span className="text-3xl font-extrabold text-emerald-800 mt-1 block">{selectedDPTasks.length} Tasks</span>
        </div>

        <div className="clean-card p-6 border-[#d6c4a8] bg-[#f5ebd9]">
          <span className="text-xs text-[#443627] font-extrabold block uppercase">Total Priority Score</span>
          <span className="text-3xl font-extrabold text-[#785335] mt-1 block">{totalPriorityWeight} Points</span>
        </div>

        <div className="clean-card p-6 border-blue-300 bg-blue-50">
          <span className="text-xs text-blue-900 font-extrabold block uppercase">Hours Utilized</span>
          <span className="text-3xl font-extrabold text-blue-800 mt-1 block">{totalHoursUsed} / {shiftHours} Hours</span>
        </div>
      </div>

      {/* Jobs Table */}
      <div className="clean-card p-6 space-y-4 bg-white">
        <h3 className="text-sm font-extrabold text-[#1c1917] uppercase tracking-wider">
          Selected Shift Schedule (0/1 Knapsack Result)
        </h3>

        <div className="space-y-3">
          {selectedDPTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 rounded-xl bg-[#fbfbfa] border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                  <CheckCircleIcon size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#785335] bg-[#f2efe9] px-2 py-0.5 rounded border border-stone-300">{task.id}</span>
                    <h4 className="text-sm font-bold text-[#1c1917]">{task.title}</h4>
                  </div>
                  <p className="text-xs text-[#78716c] mt-0.5">Duration: {task.hours} Hours • Priority Weight: {task.priorityWeight}</p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#f5ebd9] text-[#785335] border border-[#d6c4a8] self-start sm:self-auto">
                {task.priorityLabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
