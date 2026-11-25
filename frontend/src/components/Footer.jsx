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

            {/* Official Social Media Channels with Original Brand Colors */}
            <div className="pt-2 flex items-center gap-2 flex-wrap">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mr-0.5">
                Connect:
              </span>

              {/* WhatsApp (Official Brand Green) */}
              <a
                href="https://wa.me/919848012345"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect on WhatsApp"
                className="w-8 h-8 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center text-white transition-all shadow-md shadow-[#25D366]/30 hover:scale-110 active:scale-95 cursor-pointer"
                title="WhatsApp Assistance (+91 98480 12345)"
              >
                <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.07c-.24.68-1.4 1.26-1.92 1.31-.5.05-1.15.08-3.72-.98-3.28-1.35-5.38-4.66-5.54-4.88-.16-.22-1.33-1.77-1.33-3.37 0-1.6 1.05-2.39 1.42-2.73.37-.34.8-.42 1.07-.42.27 0 .53.01.76.02.24.01.56-.09.87.66.32.77 1.08 2.65 1.18 2.84.1.2.16.43.03.68-.13.25-.2.4-.4.63-.2.23-.42.51-.6.69-.2.2-.41.42-.18.82.23.4 1.02 1.68 2.19 2.72 1.5 1.33 2.76 1.75 3.16 1.95.4.2.63.17.86-.1.23-.27.99-1.15 1.25-1.55.27-.4.53-.33.9-.2.37.13 2.34 1.1 2.74 1.3.4.2.67.3.77.47.1.17.1.99-.14 1.67z" />
                </svg>
              </a>

              {/* LinkedIn (Official Brand Blue) */}
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow VGS Finance on LinkedIn"
                className="w-8 h-8 rounded-lg bg-[#0A66C2] hover:bg-[#095196] flex items-center justify-center text-white transition-all shadow-md shadow-[#0A66C2]/30 hover:scale-110 active:scale-95 cursor-pointer"
                title="Official LinkedIn"
              >
                <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.76v8.37H6.46V10.9M7.84 6.2a1.62 1.62 0 1 0 1.62 1.62c0-.9-.72-1.62-1.62-1.62z" />
                </svg>
              </a>

              {/* Facebook (Official Brand Blue) */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow VGS Finance on Facebook"
                className="w-8 h-8 rounded-lg bg-[#1877F2] hover:bg-[#1567d3] flex items-center justify-center text-white transition-all shadow-md shadow-[#1877F2]/30 hover:scale-110 active:scale-95 cursor-pointer"
                title="Official Facebook Page"
              >
                <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95C18.05 21.45 22 17.19 22 12z" />
                </svg>
              </a>

              {/* Instagram (Official Sunset Gradient) */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow VGS Finance on Instagram"
                className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-95 flex items-center justify-center text-white transition-all shadow-md shadow-[#dc2743]/30 hover:scale-110 active:scale-95 cursor-pointer"
                title="Official Instagram"
              >
                <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* X (formerly Twitter - Pitch Black with Border) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow VGS Finance on X"
                className="w-8 h-8 rounded-lg bg-[#000000] border border-slate-700 hover:border-slate-400 flex items-center justify-center text-white transition-all shadow-md shadow-black/50 hover:scale-110 active:scale-95 cursor-pointer"
                title="Official X Channel"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube (Official Brand Red) */}
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to VGS Finance on YouTube"
                className="w-8 h-8 rounded-lg bg-[#FF0000] hover:bg-[#d90000] flex items-center justify-center text-white transition-all shadow-md shadow-[#FF0000]/30 hover:scale-110 active:scale-95 cursor-pointer"
                title="Official YouTube Channel"
              >
                <svg className="w-4.5 h-4.5 fill-white" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
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
