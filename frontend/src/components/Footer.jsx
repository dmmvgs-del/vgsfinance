import logoImg from '../assets/Logo.jpeg';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#02131D] via-[#020E16] to-[#01080D] text-slate-300 font-sans relative border-t border-[#0A5C80]/40 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-[#6EA928]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* =========================================================================
          1. PRE-FOOTER EXPRESS ADVISORY & HOTLINE RIBBON
      ========================================================================= */}
      <div className="border-b border-[#0A5C80]/30 bg-gradient-to-r from-[#031B27]/90 via-[#06293B]/90 to-[#031B27]/90 relative z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Left Advisory Prompt */}
          <div className="flex items-center gap-3 text-center lg:text-left">
            <div className="relative flex items-center justify-center shrink-0">
              <span className="w-3.5 h-3.5 rounded-full bg-[#6EA928] animate-ping absolute opacity-75"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#6EA928] relative flex items-center justify-center text-[9px] text-white font-bold">✔</span>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 justify-center lg:justify-start">
                <span>Looking for the Right Loan Scheme?</span>
                <span className="text-[10px] uppercase tracking-wider bg-[#6EA928]/20 text-[#8CE22F] px-2 py-0.5 rounded-full border border-[#6EA928]/30 font-extrabold hidden sm:inline-block">
                  Free Advisory
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Speak directly with certified financial advisors comparing 15+ banks for instant sanction & zero processing fees.
              </p>
            </div>
          </div>

          {/* Right Action Contact Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 shrink-0">
            <a
              href="tel:18004259988"
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#6EA928]/50 text-white text-xs font-bold transition-all flex items-center gap-2 group"
            >
              <span className="text-base group-hover:scale-110 transition-transform">📞</span>
              <div>
                <span className="text-[9px] text-slate-400 block font-normal leading-none uppercase">Toll-Free Helpline</span>
                <span className="text-xs text-[#8CE22F] font-mono font-bold leading-tight">1800-425-9988</span>
              </div>
            </a>

            <a
              href="https://wa.me/919848012345?text=Hello%20VGS%20Finance,%20I%20would%20like%20to%20consult%20about%20a%20loan."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span className="text-sm">💬</span>
              <span>WhatsApp Priority Desk</span>
            </a>

            <a
              href="#quick-enquiry"
              className="px-4 py-2 rounded-xl bg-[#6EA928] hover:bg-[#5A8B1F] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>⚡</span>
              <span>15-Min Callback</span>
            </a>
          </div>

        </div>
      </div>

      {/* =========================================================================
          2. MAIN FOOTER CONTENT GRID
      ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Column 1: Brand & Corporate Profile (Span 5) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Logo & Corporate Tag */}
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="VGS Financial Services"
                className="w-11 h-11 object-contain rounded-xl bg-white p-1 border border-[#0A5C80]/50 shadow-lg shrink-0"
              />
              <div>
                <div className="text-base sm:text-lg font-black tracking-tight text-white leading-tight">
                  VGS <span className="text-[#6EA928]">FINANCIAL SERVICES</span>
                </div>
                <div className="text-[9px] font-extrabold tracking-widest uppercase text-slate-400 mt-0.5">
                  PRIVATE LIMITED • LOAN SUPER MARKET
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              VGS Financial Services is India's leading digital loan comparison and financial distribution supermarket. We bridge the gap between borrowers and 15+ premier lending institutions with total transparency, algorithmic matching, zero advance fees, and rapid in-principle sanction.
            </p>

            {/* Corporate Registered Credentials */}
            <div className="p-3.5 rounded-2xl bg-[#041C29] border border-[#0A5C80]/40 space-y-2 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <span className="text-sm text-[#6EA928] mt-0.5">🏢</span>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Corporate Headquarters</span>
                  <span className="font-medium text-slate-200">
                    VGS Towers, Plot No 42, Road No. 36, Jubilee Hills, Hyderabad - 500033
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800 text-[11px]">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Loan Hotline</span>
                  <a href="tel:+919848012345" className="text-slate-300 hover:text-[#6EA928] font-bold font-mono">
                    +91 98480 12345
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Official Email</span>
                  <a href="mailto:loans@vgsfinance.in" className="text-slate-300 hover:text-[#6EA928] font-medium truncate block">
                    loans@vgsfinance.in
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300">
                <span>🛡️</span> RBI Co-Lending Aligned
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-300">
                <span>🔒</span> 256-Bit SSL Encrypted
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-bold text-[#8CE22F]">
                <span>✓</span> Zero Advance Fees
              </span>
            </div>
          </div>

          {/* Column 2: Loan Supermarket Products (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-[#6EA928]"></span>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">Loan Products</h4>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#featured-products" className="hover:text-[#6EA928] transition-colors flex items-center justify-between group">
                  <span>Personal Loan</span>
                  <span className="text-[10px] text-slate-600 group-hover:text-[#6EA928] opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-[#6EA928] transition-colors flex items-center justify-between group">
                  <span>Business & MSME Loan</span>
                  <span className="text-[10px] text-slate-600 group-hover:text-[#6EA928] opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-[#6EA928] transition-colors flex items-center justify-between group">
                  <span>Home & Housing Loan</span>
                  <span className="text-[10px] text-slate-600 group-hover:text-[#6EA928] opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-[#6EA928] transition-colors flex items-center justify-between group">
                  <span>Car & Auto Finance</span>
                  <span className="text-[10px] text-slate-600 group-hover:text-[#6EA928] opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-[#6EA928] transition-colors flex items-center justify-between group">
                  <span>Gold Loan (Doorstep)</span>
                  <span className="text-[10px] text-slate-600 group-hover:text-[#6EA928] opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-[#6EA928] transition-colors flex items-center justify-between group">
                  <span>Loan Against Property</span>
                  <span className="text-[10px] text-slate-600 group-hover:text-[#6EA928] opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-[#6EA928] transition-colors flex items-center justify-between group">
                  <span>Medical Care Loan</span>
                  <span className="text-[10px] text-slate-600 group-hover:text-[#6EA928] opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-[#6EA928] transition-colors flex items-center justify-between group">
                  <span>Doctor & Clinic Loan</span>
                  <span className="text-[10px] text-slate-600 group-hover:text-[#6EA928] opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Calculators & Tools (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-[#0A5C80]"></span>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">Calculators & Tools</h4>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#emi-calc" className="hover:text-[#6EA928] transition-colors flex items-center justify-between group">
                  <span>Monthly EMI Calculator</span>
                  <span className="text-[10px] text-slate-600 group-hover:text-[#6EA928] opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                </a>
              </li>
              <li>
                <a href="#emi-calc" className="hover:text-[#6EA928] transition-colors flex items-center justify-between group">
                  <span>Eligibility (FOIR 50%)</span>
                  <span className="text-[10px] text-slate-600 group-hover:text-[#6EA928] opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                </a>
              </li>
              <li>
                <a href="#emi-calc" className="hover:text-[#6EA928] transition-colors flex items-center justify-between group">
                  <span>Balance Transfer Savings</span>
                  <span className="text-[10px] text-slate-600 group-hover:text-[#6EA928] opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                </a>
              </li>
              <li>
                <a href="#documents" className="hover:text-[#6EA928] transition-colors flex items-center justify-between group">
                  <span>Required Documents</span>
                  <span className="text-[10px] text-slate-600 group-hover:text-[#6EA928] opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-[#6EA928] transition-colors flex items-center justify-between group">
                  <span>6-Step Loan Journey</span>
                  <span className="text-[10px] text-slate-600 group-hover:text-[#6EA928] opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                </a>
              </li>
              <li>
                <a href="#quick-enquiry" className="hover:text-[#6EA928] transition-colors flex items-center justify-between group">
                  <span>Instant Lead Registration</span>
                  <span className="text-[10px] text-slate-600 group-hover:text-[#6EA928] opacity-0 group-hover:opacity-100 transition-opacity">➔</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Regulatory, Legal & Compliance (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-amber-500"></span>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">Compliance & Legal</h4>
            </div>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="hover:text-[#6EA928] transition-colors cursor-pointer flex items-center gap-1.5">
                <span>⚖️</span>
                <span>RBI Fair Practices Code</span>
              </li>
              <li className="hover:text-[#6EA928] transition-colors cursor-pointer flex items-center gap-1.5">
                <span>🛡️</span>
                <span>Grievance Redressal</span>
              </li>
              <li className="hover:text-[#6EA928] transition-colors cursor-pointer flex items-center gap-1.5">
                <span>🔒</span>
                <span>Privacy & Data Policy</span>
              </li>
              <li className="hover:text-[#6EA928] transition-colors cursor-pointer flex items-center gap-1.5">
                <span>📜</span>
                <span>Terms & Conditions (T&C)</span>
              </li>
              <li className="hover:text-[#6EA928] transition-colors cursor-pointer flex items-center gap-1.5">
                <span>📊</span>
                <span>Interest Rate Benchmark</span>
              </li>
              <li className="hover:text-[#6EA928] transition-colors cursor-pointer flex items-center gap-1.5">
                <span>⚠️</span>
                <span>Anti-Fraud Advisory</span>
              </li>
            </ul>
          </div>

        </div>

        {/* =========================================================================
            BOTTOM COPYRIGHT & LEGAL MINI-LINKS SUB-FOOTER
        ========================================================================= */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs text-slate-500">
          
          {/* Left: Copyright */}
          <div>
            © 2026 <strong className="text-slate-300">VGS Financial Services Private Limited</strong>. All rights reserved.
          </div>

          {/* Right: Legal Mini-Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-[11px] text-slate-400">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#security" className="hover:text-white transition-colors">Data Security</a>
            <span>•</span>
            <a href="#sitemap" className="hover:text-white transition-colors">Sitemap</a>
          </div>

        </div>

      </div>

    </footer>
  );
}
