export default function HeroSection({ onApplyClick, onCalcClick }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-semibold shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            🇮🇳 India's #1 Fastest Growing Financial Services & Loan Platform
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none text-white">
            Your Trusted Partner for{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              Every Financial Need
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Personal, Business, Gold, Vehicle, and Home Loans — with competitive interest rates starting from 8.5% p.a. 
            Enjoy minimal documentation, rapid digital verification, and instant sanction within 2 hours.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onApplyClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              🚀 Apply for Instant Loan
            </button>
            <button
              onClick={onCalcClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              🧮 Calculate EMI & Check Eligibility
            </button>
          </div>

          {/* Value Badges */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80">
              <div className="text-xl">⚡</div>
              <div className="font-bold text-white text-sm mt-1">2 Hours</div>
              <div className="text-xs text-slate-400">Instant Sanction & Approval</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80">
              <div className="text-xl">📉</div>
              <div className="font-bold text-emerald-400 text-sm mt-1">From 8.5%</div>
              <div className="text-xs text-slate-400">Lowest Interest Rates</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80">
              <div className="text-xl">📑</div>
              <div className="font-bold text-sky-400 text-sm mt-1">Minimal Docs</div>
              <div className="text-xs text-slate-400">100% Digital & Paperless</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80">
              <div className="text-xl">🏦</div>
              <div className="font-bold text-indigo-400 text-sm mt-1">15+ Partners</div>
              <div className="text-xs text-slate-400">Top Banks & NBFCs</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
