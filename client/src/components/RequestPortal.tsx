import type { FC, FormEvent } from 'react';
import { useState } from 'react';
import { PlusCircleIcon, CheckCircleIcon, ArrowRightIcon } from './Icons';

interface RequestPortalProps {
  onSubmitSuccess: () => void;
}

export const RequestPortal: FC<RequestPortalProps> = ({ onSubmitSuccess }) => {
  const [email, setEmail] = useState('student1@st.ug.edu.gh');
  const [locationId, setLocationId] = useState('L001');
  const [category, setCategory] = useState('ELECTRICAL');
  const [priority, setPriority] = useState('HIGH');
  const [estimatedHours, setEstimatedHours] = useState('2');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const locations = [
    { id: 'L001', name: 'Balme Library (Legon)' },
    { id: 'L002', name: 'Great Hall' },
    { id: 'L003', name: 'Commonwealth Hall' },
    { id: 'L004', name: 'Legon Hall' },
    { id: 'L005', name: 'Volta Hall' },
    { id: 'L006', name: 'Mensah Sarbah Hall' },
    { id: 'L007', name: 'Akuafo Hall' },
    { id: 'L008', name: 'Jubilee Hall' },
    { id: 'L009', name: 'Pentagon Hostels' },
    { id: 'L010', name: 'UG Hospital' },
    { id: 'L015', name: 'Department of Computer Science' },
    { id: 'L013', name: 'Faculty of Law' },
    { id: 'L017', name: 'Estate Development Unit' },
    { id: 'L020', name: 'Night Market' },
    { id: 'L021', name: 'UG Fire Station' },
    { id: 'L024', name: 'Electrical Substation' },
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedMessage(true);
      setTimeout(() => {
        setSubmittedMessage(false);
        onSubmitSuccess();
      }, 1500);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      {/* Header */}
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2efe9] text-[#785335] text-xs font-bold border border-stone-300">
          <PlusCircleIcon size={14} /> Step 1: Issue Submission
        </div>
        <h2 className="text-3xl font-extrabold text-[#1c1917] tracking-tight">Report Campus Problem</h2>
        <p className="text-[#78716c] text-sm">
          Submit maintenance requests directly to the University of Ghana Smart Service Operations Engine.
        </p>
      </div>

      {submittedMessage && (
        <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-sm font-bold flex items-center justify-center gap-2">
          <CheckCircleIcon size={18} />
          Ticket successfully submitted and enqueued into the priority queue! Redirecting to Dashboard...
        </div>
      )}

      <form onSubmit={handleSubmit} className="clean-card p-8 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">
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
            <label className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">
              Campus Landmark Location
            </label>
            <select
              value={locationId}
              onChange={(e) => setLocationId(e.target.value)}
              className="clean-input w-full"
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.id})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">
              Service Domain Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="clean-input w-full"
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
            <label className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">
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
                      ? p === 'EMERGENCY'
                        ? 'bg-rose-700 text-white border-rose-700'
                        : 'bg-[#443627] text-white border-[#443627]'
                      : 'bg-white border-stone-300 text-[#57534e] hover:bg-[#f5f4f0]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">
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
          <label className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">
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
          className="w-full py-3.5 rounded-xl bg-[#443627] hover:bg-[#35291d] text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span>{isSubmitting ? 'Submitting...' : 'Submit Maintenance Ticket'}</span>
          <ArrowRightIcon size={16} />
        </button>
      </form>
    </div>
  );
};
