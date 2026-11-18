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
    <section id="why-choose-us" className="py-20 bg-slate-50 border-t border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-[#6EA928]">
            Trust & Customer Pillars
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose VGS Finance?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            We bridge the gap between borrowers and India's premier lending institutions with complete transparency, high speed, and unbiased comparisons.
          </p>
        </div>

        {/* 6 Value Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200/90 p-6 sm:p-7 rounded-3xl hover:border-[#6EA928] transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl space-y-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl group-hover:bg-[#6EA928] group-hover:text-white transition-colors shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0A5C80] transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Performance Metric Banner */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#6EA928] font-mono">₹ 150+ Cr</div>
              <div className="text-xs text-slate-600 font-medium">Cumulative Capital Disbursed</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#0A5C80] font-mono">12,500+</div>
              <div className="text-xs text-slate-600 font-medium">Satisfied Borrowers Across India</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#6EA928] font-mono">99.2%</div>
              <div className="text-xs text-slate-600 font-medium">In-Principle Sanction Rate</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#0A5C80] font-mono">15+ Banks</div>
              <div className="text-xs text-slate-600 font-medium">Premier Lending Institution Tie-ups</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

