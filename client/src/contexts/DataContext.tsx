import type { FC, ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface LocationItem {
  id: string;
  name: string;
  category: string;
}

export interface TicketItem {
  id: string;
  title: string;
  category: string;
  location: string;
  priority: string;
  priorityWeight: number;
  status: string;
  time: string;
}

// 51 Complete University of Ghana Landmarks (matching locations_template.csv)
export const ALL_UG_LOCATIONS: LocationItem[] = [
  { id: 'L001', name: 'Balme Library', category: 'Library' },
  { id: 'L002', name: 'Great Hall', category: 'Administrative' },
  { id: 'L003', name: 'Commonwealth Hall', category: 'Accommodation' },
  { id: 'L004', name: 'Legon Hall', category: 'Accommodation' },
  { id: 'L005', name: 'Volta Hall', category: 'Accommodation' },
  { id: 'L006', name: 'Mensah Sarbah Hall', category: 'Accommodation' },
  { id: 'L007', name: 'Akuafo Hall', category: 'Accommodation' },
  { id: 'L008', name: 'Jubilee Hall', category: 'Accommodation' },
  { id: 'L009', name: 'Pentagon Hostels (Block A, B, C)', category: 'Accommodation' },
  { id: 'L010', name: 'UG Hospital', category: 'Health' },
  { id: 'L011', name: 'JQB (Jones Quartey Building)', category: 'Academic' },
  { id: 'L012', name: 'N-Block Lecture Complex', category: 'Academic' },
  { id: 'L013', name: 'Faculty of Law', category: 'Academic' },
  { id: 'L014', name: 'UG Business School (UGBS)', category: 'Academic' },
  { id: 'L015', name: 'Department of Computer Science', category: 'Academic' },
  { id: 'L016', name: 'Physical Sciences Building', category: 'Academic' },
  { id: 'L017', name: 'Estate Development Unit', category: 'Services' },
  { id: 'L018', name: 'Central Cafeteria', category: 'Services' },
  { id: 'L019', name: 'Banking Complex', category: 'Commercial' },
  { id: 'L020', name: 'Night Market', category: 'Commercial' },
  { id: 'L021', name: 'UG Fire Station', category: 'Emergency' },
  { id: 'L022', name: 'UG Police Station', category: 'Emergency' },
  { id: 'L023', name: 'UG Sports Stadium & Arena', category: 'Sports' },
  { id: 'L024', name: 'Electrical Substation', category: 'Utilities' },
  { id: 'L025', name: 'Dr. Hilla Limann Hall', category: 'Accommodation' },
  { id: 'L026', name: 'Alexander Kwapong Hall', category: 'Accommodation' },
  { id: 'L027', name: 'Elizabeth Frances Sey Hall', category: 'Accommodation' },
  { id: 'L028', name: 'Jean Nelson Aka Hall', category: 'Accommodation' },
  { id: 'L029', name: 'TF Hostels (Evandy & Bani)', category: 'Accommodation' },
  { id: 'L030', name: 'International Students Hostel (ISH)', category: 'Accommodation' },
  { id: 'L031', name: 'Noguchi Memorial Institute', category: 'Research' },
  { id: 'L032', name: 'School of Performing Arts', category: 'Arts' },
  { id: 'L033', name: 'School of Engineering Sciences', category: 'Academic' },
  { id: 'L034', name: 'Department of Mathematics', category: 'Academic' },
  { id: 'L035', name: 'Department of Physics', category: 'Academic' },
  { id: 'L036', name: 'Department of Chemistry', category: 'Academic' },
  { id: 'L037', name: 'Balme Library Knowledge Commons', category: 'Library' },
  { id: 'L038', name: 'School of Pharmacy', category: 'Health' },
  { id: 'L039', name: 'School of Nursing & Midwifery', category: 'Health' },
  { id: 'L040', name: 'School of Public Health', category: 'Health' },
  { id: 'L041', name: 'Legon Shuttle Terminal', category: 'Transport' },
  { id: 'L042', name: 'Commonwealth Hall Annex', category: 'Accommodation' },
  { id: 'L043', name: 'Mensah Sarbah Hall Annex', category: 'Accommodation' },
  { id: 'L044', name: 'Akuafo Hall Quadrangle', category: 'Landmark' },
  { id: 'L045', name: 'Legon Botanical Gardens', category: 'Recreation' },
  { id: 'L046', name: 'UG Golf Course', category: 'Sports' },
  { id: 'L047', name: 'University Guest Center', category: 'Hospitality' },
  { id: 'L048', name: 'Staff Village Primary School', category: 'Community' },
  { id: 'L049', name: 'Basic School Complex', category: 'Community' },
  { id: 'L050', name: 'Water Works & Pumping Station', category: 'Utilities' },
  { id: 'L051', name: 'Main University Gate', category: 'Landmark' },
];

const INITIAL_SEEDED_TICKETS: TicketItem[] = [
  { id: 'REQ-101', title: 'Main Server Room Power Outage', category: 'EMERGENCY', location: 'Department of Computer Science', priority: 'EMERGENCY', priorityWeight: 4, status: 'IN_PROGRESS', time: '10 mins ago' },
  { id: 'REQ-102', title: 'Leaking Pipe in Restroom', category: 'PLUMBING', location: 'JQB (Jones Quartey Building)', priority: 'HIGH', priorityWeight: 3, status: 'ASSIGNED', time: '25 mins ago' },
  { id: 'REQ-103', title: 'Flickering Lights in Reading Room', category: 'ELECTRICAL', location: 'Balme Library', priority: 'MEDIUM', priorityWeight: 2, status: 'PENDING', time: '45 mins ago' },
  { id: 'REQ-104', title: 'Broken Reading Desk Chairs', category: 'FACILITY', location: 'Commonwealth Hall', priority: 'LOW', priorityWeight: 1, status: 'PENDING', time: '1 hour ago' },
  { id: 'REQ-105', title: 'Overflowing Waste Bins', category: 'SANITATION', location: 'Central Cafeteria', priority: 'MEDIUM', priorityWeight: 2, status: 'PENDING', time: '2 hours ago' },
  { id: 'REQ-106', title: 'Wi-Fi Access Point Reset', category: 'ICT', location: 'Pentagon Hostels (Block A, B, C)', priority: 'HIGH', priorityWeight: 3, status: 'IN_PROGRESS', time: '2 hours ago' },
];

interface DataContextType {
  requests: TicketItem[];
  locations: LocationItem[];
  isLiveConnected: boolean;
  addRequest: (newReq: { title: string; category: string; location: string; priority: string }) => void;
  dispatchTopJob: () => void;
  simulateEmergency: () => string;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<TicketItem[]>(INITIAL_SEEDED_TICKETS);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);

  const getPriorityWeight = (priority: string): number => {
    switch (priority.toUpperCase()) {
      case 'EMERGENCY': return 4;
      case 'HIGH': return 3;
      case 'MEDIUM': return 2;
      default: return 1;
    }
  };

  const fetchLiveDatabase = async () => {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const formatted: TicketItem[] = data.map((item: any) => ({
          id: item.request_id || item.id || `REQ-${Math.floor(Math.random() * 900 + 100)}`,
          title: item.title || item.description || 'Maintenance Request',
          category: item.category || 'ELECTRICAL',
          location: item.location_name || item.location_id || 'Balme Library',
          priority: item.urgency_level || item.priority || 'MEDIUM',
          priorityWeight: getPriorityWeight(item.urgency_level || item.priority || 'MEDIUM'),
          status: item.status || 'PENDING',
          time: item.created_at ? new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
        }));
        setRequests(formatted);
        setIsLiveConnected(true);
      }
    } catch {
      setIsLiveConnected(false);
    }
  };

  const addRequest = (newReq: { title: string; category: string; location: string; priority: string }) => {
    const tempId = `REQ-${Math.floor(Math.random() * 899 + 100)}`;
    const newItem: TicketItem = {
      id: tempId,
      title: newReq.title,
      category: newReq.category,
      location: newReq.location,
      priority: newReq.priority,
      priorityWeight: getPriorityWeight(newReq.priority),
      status: 'PENDING',
      time: 'Just now',
    };

    // Update global state immediately
    setRequests((prev) => [newItem, ...prev]);

    // Optional Supabase insert
    if (isLiveConnected && supabase) {
      (async () => {
        try {
          await supabase.from('service_requests').insert([
            {
              request_id: tempId,
              title: newReq.title,
              category: newReq.category,
              location_id: newReq.location,
              urgency_level: newReq.priority,
              status: 'PENDING',
            },
          ]);
        } catch {}
      })();
    }
  };

  const dispatchTopJob = () => {
    setRequests((prev) => {
      if (prev.length === 0) return prev;
      // Sort by priority weight descending (Max-Heap order)
      const sorted = [...prev].sort((a, b) => b.priorityWeight - a.priorityWeight);
      const topId = sorted[0].id;
      return prev.filter((r) => r.id !== topId);
    });
  };

  const simulateEmergency = () => {
    const id = `EMG-${Math.floor(Math.random() * 899 + 100)}`;
    const newEmergency: TicketItem = {
      id,
      title: 'Pipe Burst Flooding Basement Restrooms',
      category: 'EMERGENCY',
      location: 'UG Hospital',
      priority: 'EMERGENCY',
      priorityWeight: 4,
      status: 'PENDING',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setRequests((prev) => [newEmergency, ...prev]);
    return id;
  };

  useEffect(() => {
    fetchLiveDatabase();
  }, []);

  return (
    <DataContext.Provider
      value={{
        requests,
        locations: ALL_UG_LOCATIONS,
        isLiveConnected,
        addRequest,
        dispatchTopJob,
        simulateEmergency,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
