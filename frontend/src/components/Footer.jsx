import logoImg from '../assets/Logo.jpeg';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#02131D] via-[#020E16] to-[#01080D] text-slate-300 font-sans relative border-t border-[#0A5C80]/40 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-24 bg-gradient-to-b from-[#6EA928]/10 via-transparent to-transparent blur-2xl pointer-events-none" />

      {/* =========================================================================
          MAIN FOOTER CONTENT GRID
      ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-7 pb-3.5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6">

          {/* Column 1: Brand & Corporate Profile (Span 5) */}
          <div className="lg:col-span-5 space-y-3">
            {/* Logo & Corporate Tag */}
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="VGS Financial Services"
                className="w-9 h-9 object-contain rounded-xl bg-white p-1 border border-[#0A5C80]/50 shadow-md shrink-0"
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
            <div className="p-2.5 rounded-2xl bg-[#041C29] border border-[#0A5C80]/40 space-y-1.5 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <span className="text-sm text-[#6EA928] mt-0.5">🏢</span>
                <div>
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">Corporate Headquarters</span>
                  <span className="font-medium text-slate-200 text-[11px]">
                    VGS Towers, Plot No 42, Road No. 36, Jubilee Hills, Hyderabad - 500033
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-800 text-[11px]">
                <div>
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">Loan Hotline</span>
                  <a href="tel:+919848012345" className="text-slate-300 hover:text-[#6EA928] font-bold font-mono">
                    +91 98480 12345
                  </a>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 block uppercase font-bold">Official Email</span>
                  <a href="mailto:loans@vgsfinance.in" className="text-slate-300 hover:text-[#6EA928] font-medium truncate block">
                    loans@vgsfinance.in
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-300">
                <span>🛡️</span> RBI Co-Lending Aligned
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-semibold text-slate-300">
                <span>🔒</span> 256-Bit SSL Encrypted
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-semibold text-[#8CE22F]">
                <span>✓</span> Zero Advance Fees
              </span>
            </div>
          </div>

          {/* Column 2: Loan Supermarket Products (Span 2) */}
          <div className="lg:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-[#6EA928]"></span>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">Loan Products</h4>
            </div>
            <ul className="space-y-1 text-xs text-slate-400">
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
          <div className="lg:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-[#0A5C80]"></span>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">Calculators & Tools</h4>
            </div>
            <ul className="space-y-1 text-xs text-slate-400">
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
          <div className="lg:col-span-3 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-amber-500"></span>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">Compliance & Legal</h4>
            </div>
            <ul className="space-y-1 text-xs text-slate-400">
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
            BOTTOM COPYRIGHT & LEGAL MINI-LINKS SUB-FOOTER (COMPACT & SEAMLESS)
        ========================================================================= */}
        <div className="mt-4 pt-2.5 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left text-xs text-slate-500">
          
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
