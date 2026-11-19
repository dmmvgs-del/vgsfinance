import { useState } from 'react';
import { API_BASE_URL } from '../config/api';

const workflowSteps = [
  {
    step: 1,
    title: 'Customer',
    subtitle: 'Self-Service Discovery',
    icon: '👤',
    accent: 'from-blue-600 to-cyan-500',
    description: 'Borrower visits the platform, explores loan categories, checks basic eligibility and uses the live EMI calculator to plan financing.'
  },
  {
    step: 2,
    title: 'Loan Product',
    subtitle: 'Tailored Scheme Selection',
    icon: '📑',
    accent: 'from-cyan-500 to-emerald-500',
    description: 'Selects the exact product suited to needs: Personal, Business, Gold, Vehicle, or Housing Loan with lowest interest rates.'
  },
  {
    step: 3,
    title: 'Enquiry',
    subtitle: 'Digital Application Lodged',
    icon: '📝',
    accent: 'from-emerald-500 to-green-500',
    description: 'Enters name, phone, email, income, and requested amount. An official Lead ID is instantly generated and stored in the database.'
  },
  {
    step: 4,
    title: 'Admin Desk',
    subtitle: 'Centralized Lead Triage',
    icon: '🛡️',
    accent: 'from-amber-500 to-orange-500',
    description: 'VGS Finance administrative desk verifies applicant details, FOIR (50%) capacity, assigns a Senior Loan Officer, and initiates contact.'
  },
  {
    step: 5,
    title: 'Follow-up',
    subtitle: 'Customer Outreach & KYC',
    icon: '📞',
    accent: 'from-purple-500 to-indigo-500',
    description: 'Loan officer calls borrower, logs conversation remarks, collects required documents (PAN, Aadhaar, salary/ITR), and prepares credit note.'
  },
  {
    step: 6,
    title: 'Financial Institution',
    subtitle: 'Bank Process & Disbursement',
    icon: '🏦',
    accent: 'from-emerald-600 to-teal-500',
    description: 'VGS routes application to the optimal partner Bank or NBFC (SBI, HDFC, ICICI, Bajaj, Tata, Kotak) for fast underwriting and direct disbursement.'
  }
];

export default function CustomerContactWorkflow({ onSelectProductClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [trackedLead, setTrackedLead] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackingError, setTrackingError] = useState('');

  const handleTrackLead = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setTrackingLoading(true);
    setTrackingError('');
    setTrackedLead(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/leads/track/${encodeURIComponent(searchQuery.trim())}`);
      const json = await res.json();

      if (res.ok && json.success) {
        setTrackedLead(json.data);
      } else {
        setTrackingError(json.message || 'No enquiry found with that Lead ID or mobile number.');
      }
    } catch (err) {
      setTrackingError('Unable to connect to tracking server. Please verify your connection.');
    } finally {
      setTrackingLoading(false);
    }
  };

  const getBankBadge = (bankName) => {
    if (!bankName || bankName === 'Not Assigned Yet') return 'bg-slate-800 text-slate-400 border-slate-700';
    if (bankName.includes('HDFC')) return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    if (bankName.includes('SBI') || bankName.includes('State Bank')) return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
    if (bankName.includes('ICICI')) return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    if (bankName.includes('Bajaj')) return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  };

  const getStageDisplay = (stage) => {
    switch (stage) {
      case 'SUBMITTED_TO_BANK':
        return { label: 'Lodged with Financial Institution', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
      case 'DOC_VERIFICATION':
        return { label: 'Bank Document Verification & Credit Evaluation', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' };
      case 'SANCTION_APPROVED':
        return { label: 'Sanction Letter Issued by Institution', color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' };
      case 'DISBURSED':
        return { label: 'Loan Disbursed to Account ✔', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
      default:
        return { label: 'Awaiting Bank Routing', color: 'text-slate-400 bg-slate-800 border-slate-700' };
    }
  };

  return (
    <section id="workflow" className="py-20 bg-white border-t border-b border-slate-200/80 relative">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-12">
        
        {/* Header */}
        <div className="text-left max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-xs font-black tracking-wide uppercase">
            <span>Workflow</span>
            <span>•</span>
            <span>End-to-End Customer Contact Journey</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-[#041E2B] tracking-tight">
            How Your Loan Journey Moves from <span className="text-[#6EA928]">Enquiry to Bank Disbursement</span>
          </h2>
        </div>

        {/* 6-Step Workflow Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowSteps.map((ws) => (
            <div
              key={ws.step}
              className="relative bg-slate-50 border border-slate-200/90 hover:border-[#6EA928] rounded-3xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${ws.accent} flex items-center justify-center text-2xl shadow-md text-white`}>
                  {ws.icon}
                </div>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-white text-slate-600 border border-slate-200 group-hover:text-[#6EA928] group-hover:border-[#6EA928]/40 transition-colors shadow-sm">
                  Step 0{ws.step}
                </span>
              </div>

              <div className="space-y-1.5 mb-3">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0A5C80] transition-colors">
                  {ws.title}
                </h3>
                <div className="text-xs font-semibold text-[#6EA928] uppercase tracking-wide">
                  {ws.subtitle}
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {ws.description}
              </p>

              {/* Connecting arrow visual */}
              {ws.step < 6 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-slate-300 font-black text-lg z-10">
                  ➔
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Live Customer Loan Journey Tracker Box */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6EA928] uppercase tracking-wider mb-1">
                <span>🔍 Live Database Tracker</span>
                <span>•</span>
                <span>Real-Time Phase 6 Status</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Track Your Loan Application & Financial Institution Status
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Enter your unique Lead ID (e.g. <span className="font-mono text-[#0A5C80] font-bold">LD-2026-101</span>) or registered 10-digit mobile number.
              </p>
            </div>

            {/* Quick try sample chips */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-500">Try Sample:</span>
              <button
                type="button"
                onClick={() => setSearchQuery('LD-2026-101')}
                className="text-xs px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-[#0A5C80] font-mono border border-slate-300 cursor-pointer shadow-sm"
              >
                LD-2026-101
              </button>
              <button
                type="button"
                onClick={() => setSearchQuery('LD-2026-102')}
                className="text-xs px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-[#0A5C80] font-mono border border-slate-300 cursor-pointer shadow-sm"
              >
                LD-2026-102
              </button>
              <button
                type="button"
                onClick={() => setSearchQuery('LD-2026-103')}
                className="text-xs px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-[#6EA928] font-mono border border-slate-300 cursor-pointer shadow-sm"
              >
                LD-2026-103
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleTrackLead} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Enter Lead ID (e.g. LD-2026-101) or Mobile Number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-2xl px-5 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6EA928] focus:ring-1 focus:ring-[#6EA928] shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={trackingLoading}
              className="px-6 py-3.5 bg-[#6EA928] hover:bg-[#5A8B1F] disabled:opacity-50 text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#6EA928]/20 cursor-pointer flex items-center justify-center gap-2 text-sm"
            >
              {trackingLoading ? 'Searching...' : '🔍 Track My Loan Progress'}
            </button>
          </form>

          {/* Error Message */}
          {trackingError && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm">
              ⚠️ {trackingError}
            </div>
          )}

          {/* Tracked Result Details */}
          {trackedLead && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-8 shadow-md animate-fadeIn">
              
              {/* Summary Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#E8F5D4] text-[#466E18] border border-[#6EA928]/30">
                      {trackedLead.lead.id}
                    </span>
                    <span className="text-lg font-black text-slate-900">
                      {trackedLead.lead.customerName}
                    </span>
                    <span className="text-xs text-slate-500">
                      • 📍 {trackedLead.lead.city}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">
                    Applied Scheme: <span className="text-[#0A5C80] font-semibold">{trackedLead.lead.productName}</span> • Requested:{' '}
                    <span className="text-[#6EA928] font-bold">
                      ₹ {trackedLead.lead.requestedAmount?.toLocaleString('en-IN')}
                    </span>{' '}
                    ({trackedLead.lead.tenureMonths} Months)
                  </div>
                </div>

                {/* Assigned Institution Badge */}
                <div className="flex flex-col items-start md:items-end">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">
                    Applicable Financial Institution
                  </div>
                  <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 ${getBankBadge(trackedLead.lead.assignedBank)}`}>
                    <span>🏦</span>
                    <span>{trackedLead.lead.assignedBank || 'Evaluating Institution'}</span>
                  </div>
                </div>
              </div>

              {/* 6-Stage Visual Stepper */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Current Milestone: <span className="text-[#6EA928]">{trackedLead.stepName}</span></span>
                  <span>Step {trackedLead.currentStep} of 6</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0A5C80] via-[#6EA928] to-[#94CF45] transition-all duration-700"
                    style={{ width: `${(trackedLead.currentStep / 6) * 100}%` }}
                  />
                </div>

                {/* Stepper items */}
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-2">
                  {trackedLead.journey?.map((item) => (
                    <div
                      key={item.step}
                      className={`p-3 rounded-xl border text-left space-y-1 transition-all ${
                        item.step === trackedLead.currentStep
                          ? 'bg-slate-50 border-[#6EA928] shadow-sm'
                          : item.completed
                          ? 'bg-white border-slate-200'
                          : 'bg-slate-50/50 border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-500">0{item.step}</span>
                        {item.completed ? (
                          <span className="text-[#6EA928] text-xs font-bold">✔</span>
                        ) : item.step === trackedLead.currentStep ? (
                          <span className="text-amber-500 text-xs animate-pulse">●</span>
                        ) : (
                          <span className="text-slate-400 text-xs">○</span>
                        )}
                      </div>
                      <div className="font-bold text-slate-900 text-xs truncate">{item.title}</div>
                      <div className="text-[10px] text-slate-500 line-clamp-2">{item.status}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Institution Details & Follow-up remarks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                
                {/* Bank / Loan Processing details */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-[#0A5C80] uppercase tracking-wide flex items-center gap-1.5">
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
                        <span className="font-bold text-[#6EA928]">
                          ₹ {trackedLead.lead.sanctionedAmount?.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                    {trackedLead.lead.sanctionedRate > 0 && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Sanctioned Interest Rate:</span>
                        <span className="font-bold text-[#6EA928]">{trackedLead.lead.sanctionedRate}% p.a.</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Follow-up & Advisory notes */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="text-xs font-bold text-[#0A5C80] uppercase tracking-wide flex items-center gap-1.5">
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
                    <div className="text-slate-500 pt-1">
                      Latest Notes:{' '}
                      <span className="text-slate-700 italic">
                        {trackedLead.lead.bankRemarks ||
                          (trackedLead.lead.followUps && trackedLead.lead.followUps.length > 0
                            ? trackedLead.lead.followUps[trackedLead.lead.followUps.length - 1].notes
                            : 'Documents under review. Our customer representative will assist you with sanction formalities.')}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}

