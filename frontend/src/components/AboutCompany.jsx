export default function AboutCompany() {
  return (
    <section className="py-20 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main About VGS Finance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#466E18] text-xs font-bold uppercase tracking-wider">
              <span>🏛️</span> About VGS Finance & Loans
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              A Modern Loan Supermarket Built on{' '}
              <span className="bg-gradient-to-r from-[#0A5C80] to-[#6EA928] bg-clip-text text-transparent">
                Trust & Speed
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              VGS Finance is a customer-first financial technology and loan aggregation platform. We democratize access to formal credit across India by bridging borrowers with over 15+ premier public banks, private lenders, and NBFCs through a unified, paperless marketplace.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-2xl font-black text-[#6EA928] font-mono">₹ 150+ Cr</div>
                <div className="text-xs text-slate-500 mt-1">Disbursed to Date</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-2xl font-black text-[#0A5C80] font-mono">12,500+</div>
                <div className="text-xs text-slate-500 mt-1">Happy Borrowers</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5D4] text-[#466E18] flex items-center justify-center font-bold text-lg">
                🛡️
              </div>
              <h4 className="font-bold text-slate-900 text-sm">100% Transparent</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Clear interest rates, zero hidden charges, and transparent pre-closure terms.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0A5C80] flex items-center justify-center font-bold text-lg">
                ⚡
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Instant Processing</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Digital verification ensures sanction notes are generated in as little as 2 hours.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5D4] text-[#466E18] flex items-center justify-center font-bold text-lg">
                🤝
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Dedicated Loan Desk</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Assigned loan managers handle documentation, bank liaising, and disbursement.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0A5C80] flex items-center justify-center font-bold text-lg">
                🔒
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Bank-Grade Privacy</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                256-bit encryption protects all applicant records in accordance with RBI IT standards.
              </p>
            </div>
          </div>

        </div>

        {/* Technology & Digital Transformation Partner: Ascend Media Labs */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#466E18] text-xs font-bold uppercase tracking-wider">
                <span>🚀</span> Technology Architecture & Engineering Partner
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Ascend Media Labs — Visakhapatnam
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Enterprise full-stack engineering, cloud infrastructure, algorithmic loan matching engines, and regulatory fintech automation developed and maintained by Ascend Media Labs.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-600">
                <a
                  href="https://www.ascendmedialabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#0A5C80] hover:text-[#6EA928] font-bold underline"
                >
                  🌐 www.ascendmedialabs.com
                </a>
                <a
                  href="mailto:reachus@ascendmedialabs.com"
                  className="inline-flex items-center gap-1.5 hover:text-slate-900"
                >
                  ✉️ reachus@ascendmedialabs.com
                </a>
                <a
                  href="tel:+917675852618"
                  className="inline-flex items-center gap-1.5 hover:text-slate-900 font-mono"
                >
                  📞 +91 7675852618
                </a>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center shrink-0 w-full md:w-auto">
              <span className="text-xs text-slate-500 block font-medium">Headquarters</span>
              <span className="text-sm font-bold text-slate-800 block mt-0.5">Visakhapatnam, AP, India</span>
              <a
                href="https://www.ascendmedialabs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 px-4 py-2 rounded-xl bg-[#6EA928] hover:bg-[#5A8B1F] text-white font-bold text-xs inline-block shadow-md transition-all"
              >
                Visit Ascend Media Labs ➔
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
