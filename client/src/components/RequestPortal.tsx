import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { PlusCircleIcon, CheckCircleIcon, ArrowRightIcon } from './Icons';

interface RequestPortalProps {
  onSubmitSuccess: () => void;
}

export const RequestPortal: FC<RequestPortalProps> = ({ onSubmitSuccess }) => {
  const { locations, addRequest } = useData();
  const [email, setEmail] = useState('student1@st.ug.edu.gh');
  const [locationId, setLocationId] = useState('L001');
  const [category, setCategory] = useState('ELECTRICAL');
  const [priority, setPriority] = useState('HIGH');
  const [estimatedHours, setEstimatedHours] = useState('2');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const targetLoc = locations.find(l => l.id === locationId)?.name || 'Legon Campus';

    // Add request to shared global context
    addRequest({
      title: description || `${category} Service Complaint at ${targetLoc}`,
      category: category,
      location: targetLoc,
      priority: priority,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedMessage(true);
      setTimeout(() => {
        setSubmittedMessage(false);
        onSubmitSuccess();
      }, 1200);
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4 font-sans text-[#0c4a6e]">
      {/* Header */}
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0077be]/10 text-[#0077be] text-xs font-bold border border-[#0077be]/20">
          <PlusCircleIcon size={14} /> Issue Submission Portal
        </div>
        <h2 className="text-3xl font-heading font-extrabold text-[#0c4a6e] tracking-tight">Report Campus Problem</h2>
        <p className="text-[#0369a1] text-sm">
          Submit maintenance requests directly to the University of Ghana Smart Service Operations Engine.
        </p>
      </div>

      {submittedMessage && (
        <div className="p-4 rounded-xl bg-[#0077be]/15 border border-[#0077be]/30 text-[#0c4a6e] text-sm font-bold flex items-center justify-center gap-2">
          <CheckCircleIcon size={18} className="text-[#0077be]" />
          Ticket submitted successfully! Live synced to Dashboard and Priority Queue.
        </div>
      )}

      <form onSubmit={handleSubmit} className="clean-card bg-white p-8 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0c4a6e] uppercase tracking-wider">
            Requester Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="clean-input w-full"
            placeholder="student@st.ug.edu.gh / staff@ug.edu.gh"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0c4a6e] uppercase tracking-wider">
              Campus Landmark Location ({locations.length} Locations)
            </label>
            <select
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              className="clean-input w-full cursor-pointer"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.id})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0c4a6e] uppercase tracking-wider">
              Service Domain Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="clean-input w-full cursor-pointer"
            >
              <option value="ELECTRICAL">Electrical Services</option>
              <option value="PLUMBING">Plumbing & Water</option>
              <option value="FACILITY">Building & Facility</option>
              <option value="ICT">ICT & Equipment Support</option>
              <option value="SANITATION">Waste & Sanitation</option>
              <option value="GROUNDS">Outdoor Maintenance</option>
              <option value="EMERGENCY">Emergency Maintenance</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0c4a6e] uppercase tracking-wider">
              Urgency Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['LOW', 'MEDIUM', 'HIGH', 'EMERGENCY'].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    priority === p
                      ? 'bg-[#0077be] text-white border-[#0077be]'
                      : 'bg-white border-[#e8dcc4] text-[#0c4a6e] hover:bg-[#f5efe4]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#0c4a6e] uppercase tracking-wider">
              Estimated Resolution Time (Hours)
            </label>
            <input
              type="number"
              min="1"
              max="12"
              value={estimatedHours}
              onChange={(e) => setEstimatedHours(e.target.value)}
              className="clean-input w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-[#0c4a6e] uppercase tracking-wider">
            Issue Description
          </label>
          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="clean-input w-full"
            placeholder="Describe the issue clearly..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl bg-[#0077be] hover:bg-[#006994] text-white font-heading font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>{isSubmitting ? 'Submitting...' : 'Submit Maintenance Ticket'}</span>
          <ArrowRightIcon size={16} />
        </button>
      </form>
    </div>
  );
};
