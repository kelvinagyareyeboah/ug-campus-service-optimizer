import { useState } from 'react';
import './App.css';
import { DataProvider } from './contexts/DataContext';
import { Sidebar, MobileNavbar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { DashboardHome } from './components/DashboardHome';
import { RequestPortal } from './components/RequestPortal';
import { PriorityDispatch } from './components/PriorityDispatch';
import { CampusMapNav } from './components/CampusMapNav';
import { ShiftPlanner } from './components/ShiftPlanner';
import { AlgorithmBenchmarkView } from './components/AlgorithmBenchmarkView';

function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');

  return (
    <DataProvider>
      <div className="min-h-screen bg-[#faf6ee] text-[#0c4a6e] flex flex-col md:flex-row font-sans">
        {/* Mobile Top Header & Dropdown Menu */}
        <MobileNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Desktop Left Navigation Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Right Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {activeTab === 'landing' && <LandingPage onNavigate={setActiveTab} />}
            {activeTab === 'dashboard' && <DashboardHome onNavigate={setActiveTab} />}
            {activeTab === 'portal' && <RequestPortal onSubmitSuccess={() => setActiveTab('dashboard')} />}
            {activeTab === 'dispatch' && <PriorityDispatch />}
            {activeTab === 'map' && <CampusMapNav />}
            {activeTab === 'shift' && <ShiftPlanner />}
            {activeTab === 'benchmark' && <AlgorithmBenchmarkView />}
          </main>

          {/* Minimal Footer */}
          <footer className="bg-[#0c4a6e] border-t border-[#0369a1] py-4 text-center text-xs text-[#faf6ee]">
            <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span className="font-bold text-[#faf6ee]">UG Campus Service Optimizer</span>
              <span className="text-[#f5efe4]/80">DCIT 204/308 Data Structures & Algorithms Project</span>
            </div>
          </footer>
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
