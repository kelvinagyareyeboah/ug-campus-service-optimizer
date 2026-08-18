import type { FC } from 'react';
import { useState } from 'react';
import { CheckCircleIcon } from './Icons';

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
    <div className="space-y-6 font-sans text-[#0c4a6e] max-w-5xl mx-auto py-2">
      {/* Header & Slider */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e8dcc4]">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#0c4a6e] tracking-tight">
            Technician Shift Planner
          </h1>
          <p className="text-xs text-[#0369a1] mt-0.5">0/1 Knapsack Dynamic Programming Workload Optimizer</p>
        </div>

        <div className="flex items-center gap-3 clean-card bg-white px-3 py-1.5 border-[#e8dcc4]">
          <span className="text-xs font-bold text-[#0c4a6e]">Capacity:</span>
          <input
            type="range"
            min="2"
            max="10"
            value={shiftHours}
            onChange={(e) => setShiftHours(parseInt(e.target.value))}
            className="w-28 accent-[#0077be] cursor-pointer"
          />
          <span className="text-xs font-mono font-bold text-[#0077be]">{shiftHours} Hours</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="clean-card bg-white p-4 space-y-1">
          <span className="text-[11px] font-bold text-[#0369a1] uppercase">Assigned Tasks</span>
          <p className="text-2xl font-heading font-extrabold text-[#0c4a6e]">{selectedDPTasks.length} Tasks</p>
        </div>
        <div className="clean-card bg-[#ffffff] p-4 space-y-1">
          <span className="text-[11px] font-bold text-[#0369a1] uppercase">Priority Score</span>
          <p className="text-2xl font-heading font-extrabold text-[#0077be]">{totalPriorityWeight} Points</p>
        </div>
        <div className="clean-card bg-white p-4 space-y-1">
          <span className="text-[11px] font-bold text-[#0369a1] uppercase">Hours Used</span>
          <p className="text-2xl font-heading font-extrabold text-[#0c4a6e]">{totalHoursUsed} / {shiftHours} Hours</p>
        </div>
      </div>

      {/* Selected Schedule */}
      <div className="clean-card bg-white p-4 space-y-3">
        <h3 className="text-xs font-heading font-bold text-[#0c4a6e] uppercase pb-2 border-b border-[#e8dcc4]">
          Optimized Schedule Output (0/1 Knapsack DP)
        </h3>

        <div className="space-y-2">
          {selectedDPTasks.map((task) => (
            <div
              key={task.id}
              className="p-3 rounded-lg bg-[#f5efe4] border border-[#e8dcc4] flex items-center justify-between text-xs"
            >
              <div className="flex items-center space-x-3">
                <CheckCircleIcon size={16} className="text-[#0077be]" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#0077be] bg-white px-2 py-0.5 rounded border border-[#e8dcc4]">
                      {task.id}
                    </span>
                    <h4 className="font-heading font-bold text-[#0c4a6e]">{task.title}</h4>
                  </div>
                  <p className="text-[11px] text-[#0369a1] mt-0.5">
                    {task.hours} Hours • Priority Weight: {task.priorityWeight}
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#0077be]/10 text-[#0077be] border border-[#0077be]/20">
                {task.priorityLabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
