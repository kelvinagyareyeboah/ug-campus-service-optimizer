import { useState } from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { DashboardHome } from './components/DashboardHome';
import { RequestPortal } from './components/RequestPortal';
import { PriorityDispatch } from './components/PriorityDispatch';
import { CampusMapNav } from './components/CampusMapNav';
import { ShiftPlanner } from './components/ShiftPlanner';
import { AlgorithmBenchmarkView } from './components/AlgorithmBenchmarkView';

function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#1c1917] flex flex-col font-sans">
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <DashboardHome onNavigate={setActiveTab} />}
        {activeTab === 'portal' && <RequestPortal onSubmitSuccess={() => setActiveTab('dashboard')} />}
        {activeTab === 'dispatch' && <PriorityDispatch />}
        {activeTab === 'map' && <CampusMapNav />}
        {activeTab === 'shift' && <ShiftPlanner />}
        {activeTab === 'benchmark' && <AlgorithmBenchmarkView />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 py-6 text-center text-xs text-[#78716c]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-[#443627]">UG Campus Service Optimizer</span>
            <span>•</span>
            <span>University of Ghana, Legon</span>
          </div>
          <div>DCIT 204/308 Data Structures and Algorithms Joint Project</div>
        </div>
      </footer>
    </div>
  );
}

export default App;
