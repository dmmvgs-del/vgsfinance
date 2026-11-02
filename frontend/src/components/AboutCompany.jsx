export default function AboutCompany() {
  return (
    <section className="py-20 bg-slate-900/30 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main About VGS Finance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <span>🏛️</span> About VGS Finance & Loans
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              A Modern Loan Supermarket Built on{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
                Trust & Speed
              </span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              VGS Finance is a customer-first financial technology and loan aggregation platform. We democratize access to formal credit across India by bridging borrowers with over 15+ premier public banks, private lenders, and NBFCs through a unified, paperless marketplace.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-2xl font-black text-emerald-400">₹ 150+ Cr</div>
                <div className="text-xs text-slate-400 mt-1">Disbursed to Date</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-2xl font-black text-sky-400">12,500+</div>
                <div className="text-xs text-slate-400">Happy Borrowers</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg">
                🛡️
              </div>
              <h4 className="font-bold text-white text-sm">100% Transparent</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clear interest rates, zero hidden charges, and transparent pre-closure terms.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-lg">
                ⚡
              </div>
              <h4 className="font-bold text-white text-sm">Instant Processing</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Digital verification ensures sanction notes are generated in as little as 2 hours.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg">
                🤝
              </div>
              <h4 className="font-bold text-white text-sm">Dedicated Loan Desk</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Assigned loan managers handle documentation, bank liaising, and disbursement.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-lg">
                🔒
              </div>
              <h4 className="font-bold text-white text-sm">Bank-Grade Privacy</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                256-bit encryption protects all applicant records in accordance with RBI IT standards.
              </p>
            </div>
          </div>

        </div>

        {/* Technology & Digital Transformation Partner: Ascend Media Labs */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <span>🚀</span> Technology Architecture & Engineering Partner
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Ascend Media Labs — Visakhapatnam
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Enterprise full-stack engineering, cloud infrastructure, algorithmic loan matching engines, and regulatory fintech automation developed and maintained by Ascend Media Labs.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-300">
                <a
                  href="https://www.ascendmedialabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold underline"
                >
                  🌐 www.ascendmedialabs.com
                </a>
                <a
                  href="mailto:reachus@ascendmedialabs.com"
                  className="inline-flex items-center gap-1.5 hover:text-white"
                >
                  ✉️ reachus@ascendmedialabs.com
                </a>
                <a
                  href="tel:+917675852618"
                  className="inline-flex items-center gap-1.5 hover:text-white font-mono"
                >
                  📞 +91 7675852618
                </a>
              </div>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl text-center shrink-0 w-full md:w-auto">
              <span className="text-xs text-slate-400 block font-medium">Headquarters</span>
              <span className="text-sm font-bold text-white block mt-0.5">Visakhapatnam, AP, India</span>
              <a
                href="https://www.ascendmedialabs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-bold text-xs inline-block transition-all"
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
