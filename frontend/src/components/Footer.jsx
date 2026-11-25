import logoImg from '../assets/Logo.jpeg';
import {
  Building2,
  PhoneCall,
  Mail,
  ShieldCheck,
  Lock,
  CheckCircle2,
  ChevronRight,
  Scale,
  LifeBuoy,
  Shield,
  FileText,
  TrendingUp,
  AlertTriangle,
  Calculator,
  Compass,
  Coins,
  Clock,
  Home,
  Briefcase,
  UserCheck,
  Car,
  CreditCard,
  Sparkles,
  BadgeCheck
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#02131D] via-[#020E16] to-[#01080D] text-slate-300 font-sans relative border-t border-[#0A5C80]/40 overflow-hidden">
      
      {/* Top Accent Neon Horizon Rim */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#6EA928]/70 to-transparent" />

      {/* Subtle Background Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-24 bg-gradient-to-b from-[#6EA928]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* =========================================================================
          MAIN FOOTER CONTENT GRID
      ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 sm:pt-8 pb-3.5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">

          {/* Column 1: Brand & Corporate Headquarters (Span 5) */}
          <div className="lg:col-span-5 space-y-3">
            
            {/* Brand Logo & Title with Verified Seal */}
            <div className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="VGS Financial Services"
                className="w-10 h-10 object-contain rounded-xl bg-white p-1 border border-[#0A5C80]/50 shadow-md shrink-0"
              />
              <div>
                <div className="text-base sm:text-lg font-black tracking-tight text-white leading-tight flex items-center gap-1.5">
                  <span>VGS</span>
                  <span className="text-[#6EA928]">FINANCIAL SERVICES</span>
                  <BadgeCheck className="w-4 h-4 text-[#6EA928] shrink-0" />
                </div>
                <div className="text-[9px] font-extrabold tracking-widest uppercase text-slate-400 mt-0.5">
                  PRIVATE LIMITED • LOAN SUPER MARKET
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              VGS Financial Services is India's leading digital loan comparison and financial distribution supermarket. We bridge the gap between borrowers and 15+ premier lending institutions with total transparency, algorithmic matching, zero advance fees, and rapid in-principle sanction.
            </p>

            {/* Corporate Registered Credentials Card */}
            <div className="p-3 rounded-2xl bg-[#041C29]/90 border border-[#0A5C80]/40 space-y-2 text-xs shadow-sm">
              <div className="flex items-start gap-2.5 text-slate-300">
                <div className="w-7 h-7 rounded-lg bg-[#6EA928]/15 border border-[#6EA928]/30 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 className="w-3.5 h-3.5 text-[#6EA928]" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">
                    Corporate Headquarters
                  </span>
                  <span className="font-medium text-slate-200 text-[11px] leading-tight block mt-0.5">
                    VGS Towers, Plot No 42, Road No. 36, Jubilee Hills, Hyderabad - 500033
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px]">
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider mb-0.5">
                    Loan Hotline
                  </span>
                  <a
                    href="tel:+919848012345"
                    className="text-slate-200 hover:text-[#6EA928] font-bold font-mono transition-colors flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3 h-3 text-[#6EA928]" />
                    <span>+91 98480 12345</span>
                  </a>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider mb-0.5">
                    Official Email
                  </span>
                  <a
                    href="mailto:loans@vgsfinance.in"
                    className="text-slate-200 hover:text-[#6EA928] font-medium truncate block transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3 h-3 text-[#0A5C80]" />
                    <span className="truncate">loans@vgsfinance.in</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Badges with Original Vector Icons */}
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[10px] font-semibold text-slate-300 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>RBI Co-Lending Aligned</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[10px] font-semibold text-slate-300 shadow-sm">
                <Lock className="w-3.5 h-3.5 text-sky-400" />
                <span>256-Bit SSL Encrypted</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-[10px] font-semibold text-[#8CE22F] shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8CE22F]" />
                <span>Zero Advance Fees</span>
              </span>
            </div>
          </div>

          {/* Column 2: Loan Supermarket Products (Span 2) */}
          <div className="lg:col-span-2 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-[#6EA928]"></span>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">Loan Products</h4>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <a href="#featured-products" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#6EA928] transition-colors" />
                    <span>Personal Loan</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#6EA928] transition-colors" />
                    <span>Business & MSME Loan</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Home className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#6EA928] transition-colors" />
                    <span>Home & Housing Loan</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Car className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#6EA928] transition-colors" />
                    <span>Car & Auto Finance</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Coins className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#6EA928] transition-colors" />
                    <span>Gold Loan (Doorstep)</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#6EA928] transition-colors" />
                    <span>Loan Against Property</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#6EA928] transition-colors" />
                    <span>Medical Care Loan</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#featured-products" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#6EA928] transition-colors" />
                    <span>Doctor & Clinic Loan</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Calculators & Tools (Span 2) */}
          <div className="lg:col-span-2 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-[#0A5C80]"></span>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">Calculators & Tools</h4>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <a href="#emi-calc" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Calculator className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#6EA928] transition-colors" />
                    <span>Monthly EMI Calculator</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#emi-calc" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#6EA928] transition-colors" />
                    <span>Eligibility (FOIR 50%)</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#emi-calc" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Coins className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#6EA928] transition-colors" />
                    <span>Balance Transfer Savings</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#documents" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#6EA928] transition-colors" />
                    <span>Required Documents</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#6EA928] transition-colors" />
                    <span>6-Step Loan Journey</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#quick-enquiry" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#6EA928] transition-colors" />
                    <span>Instant Lead Registration</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Regulatory, Legal & Compliance (Span 3) */}
          <div className="lg:col-span-3 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-amber-500"></span>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">Compliance & Legal</h4>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                <Scale className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
                <span>RBI Fair Practices Code</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                <LifeBuoy className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform shrink-0" />
                <span>Grievance Redressal</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                <Shield className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
                <span>Privacy & Data Policy</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                <FileText className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform shrink-0" />
                <span>Terms & Conditions (T&C)</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                <TrendingUp className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition-transform shrink-0" />
                <span>Interest Rate Benchmark</span>
              </li>
              <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2 group">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 group-hover:scale-110 transition-transform shrink-0" />
                <span>Anti-Fraud Advisory</span>
              </li>
            </ul>
          </div>

        </div>

        {/* =========================================================================
            BOTTOM COPYRIGHT & LEGAL MINI-LINKS SUB-FOOTER
        ========================================================================= */}
        <div className="mt-5 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left text-xs text-slate-500">
          
          {/* Left: Copyright */}
          <div className="flex items-center gap-1.5 justify-center sm:justify-start">
            <span>© 2026</span>
            <strong className="text-slate-300 font-semibold">VGS Financial Services Private Limited</strong>
            <BadgeCheck className="w-3.5 h-3.5 text-[#6EA928] inline shrink-0" />
            <span>All rights reserved.</span>
          </div>

          {/* Right: Legal Mini-Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-[11px] text-slate-400">
            <a href="#privacy" className="hover:text-[#6EA928] transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" className="hover:text-[#6EA928] transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#security" className="hover:text-[#6EA928] transition-colors">Data Security</a>
            <span>•</span>
            <a href="#sitemap" className="hover:text-[#6EA928] transition-colors">Sitemap</a>
          </div>

        </div>

      </div>

    </footer>
  );
}
