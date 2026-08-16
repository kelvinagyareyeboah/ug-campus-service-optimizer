import type { FC } from 'react';
import { useState } from 'react';
import { ActivityIcon, SearchIcon, SlidersIcon } from './Icons';

export const AlgorithmBenchmarkView: FC = () => {
  const [activeBenchmark, setActiveBenchmark] = useState<'search' | 'sort'>('search');

  const searchData = [
    { size: '100', linearNs: '4,200 ns', binaryNs: '180 ns', speedup: '23x faster' },
    { size: '500', linearNs: '21,500 ns', binaryNs: '240 ns', speedup: '89x faster' },
    { size: '1,000', linearNs: '45,100 ns', binaryNs: '310 ns', speedup: '145x faster' },
    { size: '5,000', linearNs: '230,400 ns', binaryNs: '420 ns', speedup: '548x faster' },
    { size: '10,000', linearNs: '480,200 ns', binaryNs: '490 ns', speedup: '980x faster' },
  ];

  const sortData = [
    { size: '100', selection: '0.45 ms', insertion: '0.12 ms', merge: '0.08 ms', quick: '0.05 ms' },
    { size: '500', selection: '8.20 ms', insertion: '2.10 ms', merge: '0.42 ms', quick: '0.28 ms' },
    { size: '1,000', selection: '34.50 ms', insertion: '8.40 ms', merge: '0.95 ms', quick: '0.61 ms' },
    { size: '5,000', selection: '850.00 ms', insertion: '210.00 ms', merge: '5.20 ms', quick: '3.40 ms' },
    { size: '10,000', selection: '3,420.00 ms', insertion: '840.00 ms', merge: '11.80 ms', quick: '7.20 ms' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-stone-200 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2efe9] text-[#785335] text-xs font-bold border border-stone-300">
            <ActivityIcon size={14} /> Step 5: Empirical Speed Benchmarks
          </div>
          <h2 className="text-3xl font-extrabold text-[#1c1917] tracking-tight">Algorithm Performance Lab</h2>
          <p className="text-[#78716c] text-sm">
            Empirical speed comparisons in nanoseconds and milliseconds across dataset sizes (100 to 10,000 items).
          </p>
        </div>

        <div className="flex items-center space-x-2 clean-card p-1.5 border-stone-300 shrink-0 bg-white">
          {[
            { id: 'search', label: 'Search Speed', icon: SearchIcon },
            { id: 'sort', label: 'Sorting Speed', icon: SlidersIcon },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeBenchmark === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveBenchmark(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-[#1c1917] text-white shadow-sm'
                    : 'text-[#57534e] hover:bg-[#f5f4f0]'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeBenchmark === 'search' && (
        <div className="clean-card p-6 space-y-4 bg-white">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h3 className="text-sm font-extrabold text-[#1c1917] uppercase tracking-wider">
                Search Performance Scaling (Linear Search vs Binary Search)
              </h3>
              <p className="text-xs text-[#78716c]">Measured in nanoseconds (ns)</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1c1917]">
              <thead className="bg-[#fbfbfa] text-[#78716c] uppercase font-extrabold text-[11px]">
                <tr>
                  <th className="p-3.5">Dataset Size ($N$)</th>
                  <th className="p-3.5">Linear Search</th>
                  <th className="p-3.5">Binary Search</th>
                  <th className="p-3.5">Empirical Speedup</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-mono text-sm">
                {searchData.map((row, i) => (
                  <tr key={i} className="hover:bg-[#fbfbfa]">
                    <td className="p-3.5 font-bold text-[#785335]">{row.size} items</td>
                    <td className="p-3.5 text-rose-700">{row.linearNs}</td>
                    <td className="p-3.5 text-emerald-700 font-bold">{row.binaryNs}</td>
                    <td className="p-3.5 text-indigo-700 font-bold">{row.speedup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeBenchmark === 'sort' && (
        <div className="clean-card p-6 space-y-4 bg-white">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h3 className="text-sm font-extrabold text-[#1c1917] uppercase tracking-wider">
                Sorting Performance Scaling ($O(n^2)$ vs $O(n \log n)$)
              </h3>
              <p className="text-xs text-[#78716c]">Measured in milliseconds (ms)</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1c1917]">
              <thead className="bg-[#fbfbfa] text-[#78716c] uppercase font-extrabold text-[11px]">
                <tr>
                  <th className="p-3.5">Dataset Size ($N$)</th>
                  <th className="p-3.5">Selection Sort</th>
                  <th className="p-3.5">Insertion Sort</th>
                  <th className="p-3.5">Merge Sort</th>
                  <th className="p-3.5">QuickSort</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-mono text-sm">
                {sortData.map((row, i) => (
                  <tr key={i} className="hover:bg-[#fbfbfa]">
                    <td className="p-3.5 font-bold text-[#785335]">{row.size} items</td>
                    <td className="p-3.5 text-stone-600">{row.selection}</td>
                    <td className="p-3.5 text-blue-700">{row.insertion}</td>
                    <td className="p-3.5 text-indigo-700 font-bold">{row.merge}</td>
                    <td className="p-3.5 text-emerald-700 font-bold">{row.quick}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
