import type { FC } from 'react';
import { useState } from 'react';
import { SearchIcon, SlidersIcon } from './Icons';

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
    <div className="space-y-6 font-sans text-[#0c4a6e] max-w-5xl mx-auto py-2">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e8dcc4]">
        <div>
          <h1 className="text-2xl font-heading font-extrabold text-[#0c4a6e] tracking-tight">
            Algorithm Performance Benchmarks
          </h1>
          <p className="text-xs text-[#0369a1] mt-0.5">Empirical execution time scaling across dataset sizes (N=100 to 10,000)</p>
        </div>

        <div className="flex items-center space-x-1 clean-card bg-white p-1 border-[#e8dcc4]">
          <button
            onClick={() => setActiveBenchmark('search')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeBenchmark === 'search'
                ? 'bg-[#0077be] text-white shadow-sm'
                : 'text-[#0c4a6e] hover:bg-[#f5efe4]'
            }`}
          >
            <SearchIcon size={14} />
            <span>Searching</span>
          </button>
          <button
            onClick={() => setActiveBenchmark('sort')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeBenchmark === 'sort'
                ? 'bg-[#0077be] text-white shadow-sm'
                : 'text-[#0c4a6e] hover:bg-[#f5efe4]'
            }`}
          >
            <SlidersIcon size={14} />
            <span>Sorting</span>
          </button>
        </div>
      </div>

      {activeBenchmark === 'search' && (
        <div className="clean-card bg-white p-4 space-y-3">
          <h3 className="text-xs font-heading font-bold text-[#0c4a6e] uppercase pb-2 border-b border-[#e8dcc4]">
            Search Scaling: Linear Search vs Binary Search (ns)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#0c4a6e]">
              <thead className="bg-[#f5efe4] text-[#0369a1] uppercase font-bold text-[11px]">
                <tr>
                  <th className="p-3">Dataset Size (N)</th>
                  <th className="p-3">Linear Search</th>
                  <th className="p-3">Binary Search</th>
                  <th className="p-3">Empirical Speedup</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8dcc4] font-mono text-xs">
                {searchData.map((row, i) => (
                  <tr key={i} className="hover:bg-[#f5efe4]">
                    <td className="p-3 font-bold text-[#0c4a6e]">{row.size} items</td>
                    <td className="p-3 text-[#be123c]">{row.linearNs}</td>
                    <td className="p-3 text-[#0c4a6e] font-bold">{row.binaryNs}</td>
                    <td className="p-3 text-[#0077be] font-bold">{row.speedup}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeBenchmark === 'sort' && (
        <div className="clean-card bg-white p-4 space-y-3">
          <h3 className="text-xs font-heading font-bold text-[#0c4a6e] uppercase pb-2 border-b border-[#e8dcc4]">
            Sorting Scaling: O(n²) vs O(n log n) Algorithms (ms)
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#0c4a6e]">
              <thead className="bg-[#f5efe4] text-[#0369a1] uppercase font-bold text-[11px]">
                <tr>
                  <th className="p-3">Dataset Size (N)</th>
                  <th className="p-3">Selection Sort</th>
                  <th className="p-3">Insertion Sort</th>
                  <th className="p-3">Merge Sort</th>
                  <th className="p-3">QuickSort</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8dcc4] font-mono text-xs">
                {sortData.map((row, i) => (
                  <tr key={i} className="hover:bg-[#f5efe4]">
                    <td className="p-3 font-bold text-[#0c4a6e]">{row.size} items</td>
                    <td className="p-3 text-[#0369a1]">{row.selection}</td>
                    <td className="p-3 text-[#0369a1]">{row.insertion}</td>
                    <td className="p-3 text-[#0077be] font-bold">{row.merge}</td>
                    <td className="p-3 text-[#0c4a6e] font-bold">{row.quick}</td>
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
