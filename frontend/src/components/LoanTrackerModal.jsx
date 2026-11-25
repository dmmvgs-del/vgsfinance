import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

export default function LoanTrackerModal({ isOpen, onClose, initialQuery = '' }) {
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');
  const [trackedLead, setTrackedLead] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState('');

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Set initial query if passed
  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
      fetchTrackData(initialQuery);
    }
  }, [initialQuery]);

  const fetchTrackData = async (queryVal) => {
    const clean = (queryVal || searchQuery).trim();
    if (!clean) return;

    setTrackingLoading(true);
    setTrackingError('');
    setTrackedLead(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/leads/track/${encodeURIComponent(clean)}`);
      const json = await res.json();

      if (res.ok && json.success) {
        setTrackedLead(json.data);
      } else {
        setTrackingError(json.message || `No loan enquiry found matching "${clean}". Please verify your Lead ID or registered phone number.`);
      }
    } catch (err) {
      setTrackingError('Unable to connect to tracking server. Please verify your connection.');
    } finally {
      setTrackingLoading(false);
    }
  };

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    fetchTrackData(searchQuery);
  };

  const handleSampleClick = (sampleId) => {
    setSearchQuery(sampleId);
    fetchTrackData(sampleId);
  };

  const getBankBadge = (bankName) => {
    if (!bankName || bankName === 'Not Assigned Yet') return 'bg-slate-100 text-slate-700 border-slate-300';
    if (bankName.includes('HDFC')) return 'bg-blue-50 text-blue-700 border-blue-300';
    if (bankName.includes('SBI') || bankName.includes('State Bank')) return 'bg-sky-50 text-sky-700 border-sky-300';
    if (bankName.includes('ICICI')) return 'bg-amber-50 text-amber-700 border-amber-300';
    if (bankName.includes('Bajaj')) return 'bg-purple-50 text-purple-700 border-purple-300';
    return 'bg-emerald-50 text-emerald-700 border-emerald-300';
  };

  const getStageDisplay = (stage) => {
    switch (stage) {
      case 'SUBMITTED_TO_BANK':
        return { label: 'Lodged with Financial Institution', color: 'text-amber-700 bg-amber-50 border-amber-300' };
      case 'DOC_VERIFICATION':
        return { label: 'Bank Document Verification & Credit Evaluation', color: 'text-blue-700 bg-blue-50 border-blue-300' };
      case 'SANCTION_APPROVED':
        return { label: 'Sanction Letter Issued by Institution', color: 'text-indigo-700 bg-indigo-50 border-indigo-300' };
      case 'DISBURSED':
      case 'CONVERTED_DISBURSED':
        return { label: 'Loan Disbursed to Account ✔', color: 'text-emerald-700 bg-emerald-50 border-emerald-300' };
      default:
        return { label: 'Awaiting Bank Routing', color: 'text-slate-600 bg-slate-100 border-slate-300' };
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#020e16]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-4xl bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer z-10 shadow-sm"
          aria-label="Close Tracker Modal"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-200 pb-5 pr-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6EA928] uppercase tracking-wider mb-1">
              <span>🔍 Live Database Tracker</span>
              <span>•</span>
              <span>Real-Time Phase 6 Status</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Track Your Loan Application & Financial Institution Status
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Enter your unique Lead ID (e.g. <span className="font-mono text-[#0A5C80] font-bold">LD-2026-101</span>) or registered 10-digit mobile number.
            </p>
          </div>

          {/* Quick try sample chips */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap shrink-0">
            <span className="text-xs text-slate-500 font-medium">Try Sample:</span>
            <button
              type="button"
              onClick={() => handleSampleClick('LD-2026-101')}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-[#0A5C80] font-mono border border-slate-300 cursor-pointer shadow-sm font-semibold transition-colors"
            >
              LD-2026-101
            </button>
            <button
              type="button"
              onClick={() => handleSampleClick('LD-2026-102')}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-[#0A5C80] font-mono border border-slate-300 cursor-pointer shadow-sm font-semibold transition-colors"
            >
              LD-2026-102
            </button>
            <button
              type="button"
              onClick={() => handleSampleClick('LD-2026-103')}
              className="text-xs px-2.5 py-1 rounded-lg bg-[#E8F5D4] hover:bg-[#d8edbe] text-[#466E18] font-mono border border-[#6EA928]/40 cursor-pointer shadow-sm font-bold transition-colors"
            >
              LD-2026-103
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter Lead ID (e.g. LD-2026-101) or Mobile Number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6EA928] focus:bg-white focus:ring-2 focus:ring-[#6EA928]/20 transition-all shadow-sm font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={trackingLoading}
            className="px-6 py-3 bg-[#6EA928] hover:bg-[#5A8B1F] disabled:opacity-50 text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#6EA928]/25 cursor-pointer flex items-center justify-center gap-2 text-sm shrink-0"
          >
            {trackingLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Searching...</span>
              </>
            ) : (
              <>
                <span>🔍</span>
                <span>Track My Loan Progress</span>
              </>
            )}
          </button>
        </form>

        {/* Error Message */}
        {trackingError && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2 animate-fadeIn">
            <span className="text-base shrink-0">⚠️</span>
            <div>{trackingError}</div>
          </div>
        )}

        {/* Tracked Result Details */}
        {trackedLead && (
          <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-6 shadow-sm animate-fadeIn">
            
            {/* Summary Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#E8F5D4] text-[#466E18] border border-[#6EA928]/30">
                    {trackedLead.lead.id}
                  </span>
                  <span className="text-base sm:text-lg font-black text-slate-900">
                    {trackedLead.lead.customerName}
                  </span>
                  <span className="text-xs text-slate-500">
                    • 📍 {trackedLead.lead.city || 'India'}
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  Applied Scheme: <span className="text-[#0A5C80] font-semibold">{trackedLead.lead.productName}</span> • Requested:{' '}
                  <span className="text-[#466E18] font-bold">
                    ₹ {Number(trackedLead.lead.requestedAmount || 0).toLocaleString('en-IN')}
                  </span>{' '}
                  ({trackedLead.lead.tenureMonths || 36} Months)
                </div>
              </div>

              {/* Assigned Institution Badge */}
              <div className="flex flex-col items-start md:items-end">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">
                  Applicable Financial Institution
                </div>
                <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 shadow-sm ${getBankBadge(trackedLead.lead.assignedBank)}`}>
                  <span>🏦</span>
                  <span>{trackedLead.lead.assignedBank || 'Evaluating Institution'}</span>
                </div>
              </div>
            </div>

            {/* 6-Stage Visual Stepper */}
            <div className="space-y-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
                <span>Current Milestone: <span className="text-[#466E18]">{trackedLead.stepName}</span></span>
                <span>Step {trackedLead.currentStep} of 6</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-[#0A5C80] via-[#6EA928] to-[#94CF45] transition-all duration-700"
                  style={{ width: `${(trackedLead.currentStep / 6) * 100}%` }}
                />
              </div>

              {/* Stepper items */}
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5 pt-2">
                {trackedLead.journey?.map((item) => (
                  <div
                    key={item.step}
                    className={`p-2.5 rounded-xl border text-left space-y-1 transition-all ${
                      item.step === trackedLead.currentStep
                        ? 'bg-[#E8F5D4]/40 border-[#6EA928] shadow-sm'
                        : item.completed
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-white border-slate-100 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-slate-500">0{item.step}</span>
                      {item.completed ? (
                        <span className="text-[#466E18] text-xs font-bold">✔</span>
                      ) : item.step === trackedLead.currentStep ? (
                        <span className="text-amber-500 text-xs animate-pulse">●</span>
                      ) : (
                        <span className="text-slate-300 text-xs">○</span>
                      )}
                    </div>
                    <div className="font-bold text-slate-900 text-xs truncate">{item.title}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-2 leading-tight">{item.status}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Institution Details & Follow-up remarks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
              
              {/* Bank / Loan Processing details */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
                <div className="text-xs font-bold text-[#0A5C80] uppercase tracking-wide flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                  <span>🏦 Financial Institution Status</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Partner Bank / NBFC:</span>
                    <span className="font-bold text-slate-900">{trackedLead.lead.assignedBank || 'Not Assigned'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Bank Application Ref:</span>
                    <span className="font-mono text-[#0A5C80] font-bold">
                      {trackedLead.lead.bankApplicationNo || 'In Generation'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Process Milestone:</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-md border font-bold ${getStageDisplay(trackedLead.lead.bankProcessStage).color}`}>
                      {getStageDisplay(trackedLead.lead.bankProcessStage).label}
                    </span>
                  </div>
                  {trackedLead.lead.sanctionedAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Sanctioned Loan Amount:</span>
                      <span className="font-bold text-[#466E18]">
                        ₹ {Number(trackedLead.lead.sanctionedAmount).toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}
                  {trackedLead.lead.sanctionedRate > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Sanctioned Interest Rate:</span>
                      <span className="font-bold text-[#466E18]">{trackedLead.lead.sanctionedRate}% p.a.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Follow-up & Advisory notes */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 shadow-sm">
                <div className="text-xs font-bold text-[#0A5C80] uppercase tracking-wide flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                  <span>📞 Loan Officer Consultation</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Assigned Officer:</span>
                    <span className="font-bold text-slate-900">{trackedLead.lead.assignedTo || 'Unassigned'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Lead Stage:</span>
                    <span className="font-bold text-amber-700">{trackedLead.lead.status}</span>
                  </div>
                  <div className="text-slate-500 pt-1 text-[11px]">
                    <span className="font-semibold text-slate-600 block mb-0.5">Latest Remarks:</span>
                    <span className="text-slate-700 italic bg-slate-50 p-2 rounded-lg block border border-slate-100">
                      "{trackedLead.lead.bankRemarks ||
                        (trackedLead.lead.followUps && trackedLead.lead.followUps.length > 0
                          ? trackedLead.lead.followUps[trackedLead.lead.followUps.length - 1].notes
                          : 'Documents under review. Our customer representative will assist you with sanction formalities.')}"
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
