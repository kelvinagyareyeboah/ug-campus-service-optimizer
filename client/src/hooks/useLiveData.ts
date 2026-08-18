import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface ServiceRequestItem {
  id: string;
  title: string;
  category: string;
  location: string;
  priority: string;
  status: string;
  time: string;
}

const DEFAULT_SAMPLE_REQUESTS: ServiceRequestItem[] = [
  { id: 'REQ-101', title: 'Main Server Room Power Outage', category: 'EMERGENCY', location: 'CS Dept, Lab 1', priority: 'EMERGENCY', status: 'IN_PROGRESS', time: '10 mins ago' },
  { id: 'REQ-102', title: 'Leaking Pipe in Restroom', category: 'PLUMBING', location: 'JQB, Ground Floor', priority: 'HIGH', status: 'ASSIGNED', time: '25 mins ago' },
  { id: 'REQ-103', title: 'Flickering Lights in Lecture Hall', category: 'ELECTRICAL', location: 'Balme Library', priority: 'MEDIUM', status: 'PENDING', time: '45 mins ago' },
  { id: 'REQ-104', title: 'Broken Reading Desk Chairs', category: 'FACILITY', location: 'Commonwealth Hall', priority: 'LOW', status: 'PENDING', time: '1 hour ago' },
  { id: 'REQ-105', title: 'Overflowing Waste Bins', category: 'SANITATION', location: 'Central Cafeteria', priority: 'MEDIUM', status: 'PENDING', time: '2 hours ago' },
  { id: 'REQ-106', title: 'Wi-Fi Access Point Reset', category: 'ICT', location: 'Pentagon Hostels', priority: 'HIGH', status: 'IN_PROGRESS', time: '2 hours ago' },
];

export const useLiveData = () => {
  const [requests, setRequests] = useState<ServiceRequestItem[]>(DEFAULT_SAMPLE_REQUESTS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);

  const fetchRequests = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setIsLiveConnected(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        setIsLiveConnected(false);
      } else {
        const formatted: ServiceRequestItem[] = data.map((item: any) => ({
          id: item.request_id || item.id,
          title: item.title || item.description || 'Service Maintenance Request',
          category: item.category || 'ELECTRICAL',
          location: item.location_name || item.location_id || 'Legon Main Campus',
          priority: item.urgency_level || item.priority || 'MEDIUM',
          status: item.status || 'PENDING',
          time: item.created_at ? new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently',
        }));
        setRequests(formatted);
        setIsLiveConnected(true);
      }
    } catch (err) {
      setIsLiveConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewRequest = async (newReq: Omit<ServiceRequestItem, 'id' | 'status' | 'time'>) => {
    const tempId = `REQ-${Math.floor(Math.random() * 900 + 100)}`;
    const newItem: ServiceRequestItem = {
      ...newReq,
      id: tempId,
      status: 'PENDING',
      time: 'Just now',
    };

    // Optimistically update UI
    setRequests((prev) => [newItem, ...prev]);

    try {
      if (isLiveConnected && supabase) {
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
      }
    } catch (err) {
      console.warn('Error inserting request:', err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return {
    requests,
    isLoading,
    isLiveConnected,
    refreshData: fetchRequests,
    addNewRequest,
  };
};
