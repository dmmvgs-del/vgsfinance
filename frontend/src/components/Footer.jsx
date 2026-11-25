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
  BadgeCheck,
  Landmark,
  MapPin,
  MessageCircle,
  Globe
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#02131D] via-[#020E16] to-[#01080D] text-slate-300 font-sans relative border-t border-[#0A5C80]/50 overflow-hidden">
      
      {/* Top Accent Horizon Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#6EA928] to-transparent shadow-[0_0_12px_#6EA928]" />

      {/* Subtle Background Radial Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-32 bg-gradient-to-b from-[#6EA928]/10 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* =========================================================================
          1. PRE-FOOTER QUICK ASSISTANCE & SOCIAL CHANNELS BAR
         ========================================================================= */}
      <div className="border-b border-slate-800/80 bg-[#031520]/60 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          
          {/* Left: Instant Helpline & WhatsApp Support */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-300">
            <span className="flex items-center gap-1.5 text-[#6EA928] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#6EA928] animate-ping" />
              <span>24/7 Financial Advisory Helpline:</span>
            </span>
            <a
              href="tel:18004259988"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-white hover:text-[#6EA928] font-bold font-mono transition-colors shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#6EA928]" />
              <span>1800-425-9988</span>
              <span className="text-[10px] text-slate-400 font-sans font-normal">(Toll-Free)</span>
            </a>
            <a
              href="https://wa.me/919848012345"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] font-bold transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Priority Desk</span>
            </a>
          </div>

          {/* Right: Connect on Official Channels */}
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-[11px] font-semibold text-slate-400 mr-1">Official Channels:</span>
            
            {/* WhatsApp */}
            <a
              href="https://wa.me/919848012345"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-[#25D366]/20 border border-slate-800 hover:border-[#25D366] text-slate-400 hover:text-[#25D366] flex items-center justify-center transition-all shadow-sm"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>

            {/* Telephone Call */}
            <a
              href="tel:+919848012345"
              className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-[#6EA928]/20 border border-slate-800 hover:border-[#6EA928] text-slate-400 hover:text-[#6EA928] flex items-center justify-center transition-all shadow-sm"
              title="Call Direct Hotline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
            </a>

            {/* Email */}
            <a
              href="mailto:loans@vgsfinance.in"
              className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-[#0A5C80]/30 border border-slate-800 hover:border-[#0A5C80] text-slate-400 hover:text-[#38bdf8] flex items-center justify-center transition-all shadow-sm"
              title="Email Customer Support"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>

            {/* Website Portal */}
            <a
              href="#hero"
              className="w-7 h-7 rounded-lg bg-slate-900 hover:bg-[#6EA928]/20 border border-slate-800 hover:border-[#6EA928] text-slate-400 hover:text-[#6EA928] flex items-center justify-center transition-all shadow-sm"
              title="Website Home"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>

      {/* =========================================================================
          2. MAIN FOOTER CONTENT GRID
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-5 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-7 lg:gap-8">

          {/* Column 1: Brand & Corporate Headquarters (Span 5) */}
          <div className="lg:col-span-5 space-y-3.5">
            
            {/* Brand Logo & Title with Verified Seal */}
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <img
                  src={logoImg}
                  alt="VGS Financial Services"
                  className="w-11 h-11 object-contain rounded-xl bg-white p-1 border border-[#0A5C80]/50 shadow-lg shadow-[#0A5C80]/20"
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#6EA928] text-white flex items-center justify-center border-2 border-[#02131D]">
                  <CheckCircle2 className="w-2.5 h-2.5" />
                </span>
              </div>
              <div>
                <div className="text-lg font-black tracking-tight text-white leading-tight flex items-center gap-1.5">
                  <span>VGS</span>
                  <span className="text-[#6EA928]">FINANCIAL SERVICES</span>
                  <BadgeCheck className="w-4 h-4 text-[#6EA928] shrink-0" />
                </div>
                <div className="text-[9.5px] font-extrabold tracking-widest uppercase text-slate-400 mt-0.5">
                  PRIVATE LIMITED • LOAN SUPER MARKET
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              VGS Financial Services is India's leading digital loan comparison and financial distribution supermarket. We bridge the gap between borrowers and 15+ premier lending institutions with total transparency, algorithmic matching, zero advance fees, and rapid in-principle sanction.
            </p>

            {/* Corporate Registered Credentials Card */}
            <div className="p-3.5 rounded-2xl bg-[#041C29]/90 border border-[#0A5C80]/40 space-y-2.5 text-xs shadow-md">
              <div className="flex items-start gap-2.5 text-slate-300">
                <div className="w-8 h-8 rounded-xl bg-[#6EA928]/20 border border-[#6EA928]/40 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Building2 className="w-4 h-4 text-[#8CE22F]" />
                </div>
                <div>
                  <span className="text-[9px] text-[#6EA928] block uppercase font-bold tracking-wider">
                    Corporate Headquarters
                  </span>
                  <span className="font-medium text-slate-200 text-xs leading-snug block mt-0.5">
                    VGS Towers, Plot No 42, Road No. 36, Jubilee Hills, Hyderabad - 500033
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-800 text-[11px]">
                <div>
                  <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider mb-0.5">
                    Loan Hotline
                  </span>
                  <a
                    href="tel:+919848012345"
                    className="text-slate-200 hover:text-[#6EA928] font-bold font-mono transition-colors flex items-center gap-1.5"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-[#6EA928]" />
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
                    <Mail className="w-3.5 h-3.5 text-[#38bdf8]" />
                    <span className="truncate">loans@vgsfinance.in</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Badges with Original Vector Icons */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[10px] font-bold text-emerald-300 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>RBI Co-Lending Aligned</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-950/40 border border-sky-500/30 text-[10px] font-bold text-sky-300 shadow-sm">
                <Lock className="w-3.5 h-3.5 text-sky-400" />
                <span>256-Bit SSL Encrypted</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-lime-950/40 border border-[#6EA928]/40 text-[10px] font-bold text-[#8CE22F] shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8CE22F]" />
                <span>Zero Advance Fees</span>
              </span>
            </div>
          </div>

          {/* Column 2: Loan Supermarket Products (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-[#6EA928]"></span>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">Loan Products</h4>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <a href="#featured-products" className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <UserCheck className="w-3 h-3 text-blue-400" />
                    </span>
                    <span className="font-medium text-slate-300 group-hover:text-white">Personal Loan</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#featured-products" className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                      <Briefcase className="w-3 h-3 text-amber-400" />
                    </span>
                    <span className="font-medium text-slate-300 group-hover:text-white">Business Loan</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#featured-products" className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Home className="w-3 h-3 text-emerald-400" />
                    </span>
                    <span className="font-medium text-slate-300 group-hover:text-white">Home & Housing</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#featured-products" className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-sky-500/15 border border-sky-500/30 flex items-center justify-center shrink-0">
                      <Car className="w-3 h-3 text-sky-400" />
                    </span>
                    <span className="font-medium text-slate-300 group-hover:text-white">Car & Auto Loan</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#featured-products" className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center shrink-0">
                      <Coins className="w-3 h-3 text-yellow-400" />
                    </span>
                    <span className="font-medium text-slate-300 group-hover:text-white">Gold Loan (Doorstep)</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#featured-products" className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <Building2 className="w-3 h-3 text-purple-400" />
                    </span>
                    <span className="font-medium text-slate-300 group-hover:text-white">Loan Against Property</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#featured-products" className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shrink-0">
                      <Sparkles className="w-3 h-3 text-rose-400" />
                    </span>
                    <span className="font-medium text-slate-300 group-hover:text-white">Medical Care Loan</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#featured-products" className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-teal-500/15 border border-teal-500/30 flex items-center justify-center shrink-0">
                      <CreditCard className="w-3 h-3 text-teal-400" />
                    </span>
                    <span className="font-medium text-slate-300 group-hover:text-white">Doctor & Clinic Loan</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Calculators & Tools (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-[#0A5C80]"></span>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">Calculators & Tools</h4>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <a href="#emi-calc" className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Calculator className="w-3 h-3 text-emerald-400" />
                    </span>
                    <span className="font-medium text-slate-300 group-hover:text-white">EMI Calculator</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#emi-calc" className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <TrendingUp className="w-3 h-3 text-blue-400" />
                    </span>
                    <span className="font-medium text-slate-300 group-hover:text-white">FOIR (50%) Eligibility</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#emi-calc" className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                      <Coins className="w-3 h-3 text-amber-400" />
                    </span>
                    <span className="font-medium text-slate-300 group-hover:text-white">Balance Transfer Savings</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#documents" className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shrink-0">
                      <FileText className="w-3 h-3 text-indigo-400" />
                    </span>
                    <span className="font-medium text-slate-300 group-hover:text-white">Required Documents</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#workflow" className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                      <Compass className="w-3 h-3 text-purple-400" />
                    </span>
                    <span className="font-medium text-slate-300 group-hover:text-white">6-Step Loan Journey</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="#quick-enquiry" className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all flex items-center justify-between group">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-lime-500/15 border border-lime-500/30 flex items-center justify-center shrink-0">
                      <Clock className="w-3 h-3 text-[#8CE22F]" />
                    </span>
                    <span className="font-medium text-slate-300 group-hover:text-white">Instant Lead Enquiry</span>
                  </span>
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#6EA928] group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Regulatory, Legal & Compliance (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-amber-500"></span>
              <h4 className="text-xs font-black uppercase tracking-wider text-white">Compliance & Legal</h4>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all cursor-pointer flex items-center gap-2.5 group">
                <span className="w-6 h-6 rounded-md bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Scale className="w-3 h-3 text-amber-400 group-hover:scale-110 transition-transform" />
                </span>
                <span className="font-medium text-slate-300 group-hover:text-white">RBI Fair Practices Code</span>
              </li>
              <li className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all cursor-pointer flex items-center gap-2.5 group">
                <span className="w-6 h-6 rounded-md bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <LifeBuoy className="w-3 h-3 text-cyan-400 group-hover:scale-110 transition-transform" />
                </span>
                <span className="font-medium text-slate-300 group-hover:text-white">Grievance Redressal</span>
              </li>
              <li className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all cursor-pointer flex items-center gap-2.5 group">
                <span className="w-6 h-6 rounded-md bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Shield className="w-3 h-3 text-emerald-400 group-hover:scale-110 transition-transform" />
                </span>
                <span className="font-medium text-slate-300 group-hover:text-white">Privacy & Data Policy</span>
              </li>
              <li className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all cursor-pointer flex items-center gap-2.5 group">
                <span className="w-6 h-6 rounded-md bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <FileText className="w-3 h-3 text-indigo-400 group-hover:scale-110 transition-transform" />
                </span>
                <span className="font-medium text-slate-300 group-hover:text-white">Terms & Conditions (T&C)</span>
              </li>
              <li className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all cursor-pointer flex items-center gap-2.5 group">
                <span className="w-6 h-6 rounded-md bg-teal-500/15 border border-teal-500/30 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-3 h-3 text-teal-400 group-hover:scale-110 transition-transform" />
                </span>
                <span className="font-medium text-slate-300 group-hover:text-white">Interest Rate Benchmark</span>
              </li>
              <li className="p-1 -mx-1 rounded-lg hover:bg-slate-800/60 hover:text-white transition-all cursor-pointer flex items-center gap-2.5 group">
                <span className="w-6 h-6 rounded-md bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-3 h-3 text-rose-400 group-hover:scale-110 transition-transform" />
                </span>
                <span className="font-medium text-slate-300 group-hover:text-white">Anti-Fraud Advisory</span>
              </li>
            </ul>
          </div>

        </div>

        {/* =========================================================================
            3. INSTITUTIONAL LENDING PARTNERS MINI TRUST STRIP
           ========================================================================= */}
        <div className="mt-7 pt-4 pb-2 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 shrink-0">
              <Landmark className="w-4 h-4 text-[#6EA928]" />
              <span className="uppercase tracking-wider text-[11px] text-slate-400">Associated Premier Lending Network:</span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 text-[10px] font-bold text-slate-300">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-[#6EA928]/50 transition-colors">State Bank of India</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-[#6EA928]/50 transition-colors">HDFC Bank</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-[#6EA928]/50 transition-colors">ICICI Bank</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-[#6EA928]/50 transition-colors">Axis Bank</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-[#6EA928]/50 transition-colors">Bajaj Finserv</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-[#6EA928]/50 transition-colors">Kotak Mahindra</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-[#6EA928]/50 transition-colors">Tata Capital</span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-[#6EA928]/50 transition-colors">Bank of Baroda</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. BOTTOM COPYRIGHT & LEGAL MINI-LINKS SUB-FOOTER
           ========================================================================= */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left text-xs text-slate-500">
          
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
