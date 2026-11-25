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
  return (
    <section id="workflow" className="py-16 sm:py-20 bg-white border-t border-b border-slate-200/80 relative">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-10 sm:space-y-12">
        
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

      </div>
    </section>
  );
}
