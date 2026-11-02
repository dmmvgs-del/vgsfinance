export default function WhyChooseUs({ onApplyClick }) {
  const pillars = [
    {
      icon: '🏪',
      title: 'Multi-Bank Supermarket',
      desc: 'Compare loan interest rates, sanction limits, and tenures across 15+ top banks and NBFCs in one unified portal.'
    },
    {
      icon: '⚡',
      title: '2-Hour Digital Sanction',
      desc: 'Automated underwriting algorithms and electronic credit evaluation deliver instant in-principle approval.'
    },
    {
      icon: '📉',
      title: 'Lowest Interest Rates',
      desc: 'Competitive reducing-balance interest rates starting at just 8.4% p.a., with zero prepayment penalties on select loans.'
    },
    {
      icon: '📑',
      title: '100% Paperless Process',
      desc: 'Digital Aadhaar e-KYC, PAN verification, and electronic bank statement uploads with end-to-end encryption.'
    },
    {
      icon: '🛡️',
      title: 'Zero Upfront Fees',
      desc: 'Completely free loan discovery and advisory. We never ask for advance cash payments or processing deposits.'
    },
    {
      icon: '👨‍💼',
      title: 'Dedicated Loan Advisor',
      desc: 'Get assigned a senior financial officer who manages document collection, bank coordination, and disbursement.'
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-slate-950 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Trust & Customer Pillars
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Choose VGS Finance?
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            We bridge the gap between borrowers and India's premier lending institutions with complete transparency, high speed, and unbiased comparisons.
          </p>
        </div>

        {/* 6 Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 border border-slate-800 p-6 sm:p-7 rounded-3xl hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 shadow-xl space-y-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-2xl group-hover:bg-emerald-600 transition-colors shadow-md">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Performance Metric Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">₹ 150+ Cr</div>
              <div className="text-xs text-slate-400 font-medium">Cumulative Capital Disbursed</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-sky-400 font-mono">12,500+</div>
              <div className="text-xs text-slate-400 font-medium">Satisfied Borrowers Across India</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-indigo-400 font-mono">99.2%</div>
              <div className="text-xs text-slate-400 font-medium">In-Principle Sanction Rate</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">15+ Banks</div>
              <div className="text-xs text-slate-400 font-medium">Premier Lending Institution Tie-ups</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

