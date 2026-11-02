import { useState } from 'react';

export default function HeroSection({
  onApplyClick,
  onCalcClick,
  onSelectCategory,
  onSelectProduct
}) {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerFormData, setPartnerFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Hyderabad',
    experience: '1-3 Years',
    profession: 'Financial Advisor / DSA'
  });
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  const [activeSupermarketShelf, setActiveSupermarketShelf] = useState(null);

  const handleAvailLoan = (loanType, categoryId) => {
    if (onSelectCategory && categoryId) {
      onSelectCategory(categoryId);
    } else if (onApplyClick) {
      onApplyClick();
    }
  };

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    if (!partnerFormData.name || !partnerFormData.phone) return;
    setPartnerSubmitted(true);
    setTimeout(() => {
      setPartnerSubmitted(false);
      setPartnerModalOpen(false);
    }, 2500);
  };

  return (
    <section id="hero" className="relative overflow-hidden font-sans">
      
      {/* =========================================================================
          HERO ROYAL BLUE BACKGROUND WITH SUBTLE SUPERMARKET PATTERN
         ========================================================================= */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 relative shadow-2xl">
        
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto space-y-8 relative z-10">
          
          {/* =========================================================================
              1. SUB-HERO ACTION BUTTONS (Join as Freelancer / Apply Now)
             ========================================================================= */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setPartnerModalOpen(true)}
              className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold border-2 border-white/80 hover:bg-white hover:text-blue-700 text-white transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>🤝</span> Join as Freelancer
            </button>
            <button
              onClick={onApplyClick}
              className="px-6 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white text-blue-800 hover:bg-slate-100 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>🚀</span> Apply Now
            </button>
          </div>

          {/* =========================================================================
              2. HERO MAIN HEADLINE (VGS is a Loans Super Market!)
             ========================================================================= */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-md">
              VGS is a{' '}
              <span className="relative inline-block text-amber-300">
                Loans Super Market!
                {/* Curved underline brush accent stroke */}
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-3 text-amber-300"
                  viewBox="0 0 250 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8.5C65.5 2.5 160.5 1.5 247 9.5"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 font-medium max-w-2xl mx-auto pt-2">
              Explore 16+ loan categories, compare interest rates across 15+ partner banks, and get 2-hour in-principle sanction.
            </p>
          </div>

          {/* =========================================================================
              3. SPLIT HERO CONTENT: 4 LOAN CARDS (LEFT) + 3D SUPERMARKET VISUAL (RIGHT)
             ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            
            {/* ---------------------------------------------------------------------
                LEFT SIDE: 4 CORE LOAN CARDS (White Cards with Circular Blue Icons)
               --------------------------------------------------------------------- */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card 1: Personal Loan */}
              <div
                onClick={() => handleAvailLoan('Personal Loan', 'cat-personal')}
                className="bg-white rounded-3xl p-5 sm:p-6 text-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer border border-blue-100 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    💰
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      Personal Loan
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      For all your needs upto 1cr
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-black text-blue-700 group-hover:text-blue-800 uppercase tracking-wider flex items-center gap-1">
                    AVAIL PERSONAL NOW! <span className="font-bold">»</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">From 10.5%</span>
                </div>
              </div>

              {/* Card 2: Business Loan */}
              <div
                onClick={() => handleAvailLoan('Business Loan', 'cat-business')}
                className="bg-white rounded-3xl p-5 sm:p-6 text-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer border border-blue-100 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    💼
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      Business Loan
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      Tailored financial solutions for your business needs
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-black text-blue-700 group-hover:text-blue-800 uppercase tracking-wider flex items-center gap-1">
                    AVAIL BUSINESS NOW! <span className="font-bold">»</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">From 11.5%</span>
                </div>
              </div>

              {/* Card 3: Professional Loan (Doctor/CA) */}
              <div
                onClick={() => handleAvailLoan('Professional Loan', 'cat-professional')}
                className="bg-white rounded-3xl p-5 sm:p-6 text-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer border border-blue-100 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    🩺
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                      Professional Loan <span className="text-xs font-bold text-blue-600 block">(Doctor/CA)</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      Financial Solution for Professional needs.
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-black text-blue-700 group-hover:text-blue-800 uppercase tracking-wider flex items-center gap-1">
                    AVAIL PROFESSIONAL NOW! <span className="font-bold">»</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">From 9.99%</span>
                </div>
              </div>

              {/* Card 4: Home Loan */}
              <div
                onClick={() => handleAvailLoan('Home Loan', 'cat-home')}
                className="bg-white rounded-3xl p-5 sm:p-6 text-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer border border-blue-100 flex flex-col justify-between space-y-3"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl shrink-0 shadow-md group-hover:scale-110 transition-transform">
                    🏠
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      Home Loan
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      Make your dream home a reality
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-black text-blue-700 group-hover:text-blue-800 uppercase tracking-wider flex items-center gap-1">
                    AVAIL HOME NOW! <span className="font-bold">»</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">From 8.4%</span>
                </div>
              </div>

            </div>

            {/* ---------------------------------------------------------------------
                RIGHT SIDE: ISOMETRIC 3D LOAN SUPERMARKET STORE VISUALIZATION
               --------------------------------------------------------------------- */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              
              {/* Store Wrapper Box */}
              <div className="relative w-full max-w-lg bg-gradient-to-b from-blue-500/20 to-blue-900/60 p-6 rounded-3xl border border-white/20 backdrop-blur-md shadow-2xl">
                
                {/* Top Badge */}
                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                    <span>🛒</span> Physical & Digital Supermarket Walk-Through
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold">
                    Multi-Aisle Comparison
                  </span>
                </div>

                {/* Isometric Department Aisles Showcase Grid */}
                <div className="py-6 grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
                  
                  {/* Shelf 1: Personal Loan */}
                  <div
                    onClick={() => setActiveSupermarketShelf('Personal')}
                    className="p-3 rounded-2xl bg-gradient-to-b from-emerald-600 to-emerald-800 border-2 border-emerald-400 text-white shadow-lg cursor-pointer hover:scale-105 transition-all space-y-1"
                  >
                    <span className="text-xl block">👤</span>
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider block">
                      PERSONAL LOAN
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/30 font-mono block">From 10.5%</span>
                  </div>

                  {/* Shelf 2: Business Loan */}
                  <div
                    onClick={() => setActiveSupermarketShelf('Business')}
                    className="p-3 rounded-2xl bg-gradient-to-b from-rose-600 to-rose-800 border-2 border-rose-400 text-white shadow-lg cursor-pointer hover:scale-105 transition-all space-y-1"
                  >
                    <span className="text-xl block">🏢</span>
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider block">
                      BUSINESS LOAN
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/30 font-mono block">From 11.5%</span>
                  </div>

                  {/* Shelf 3: Doctor Loan */}
                  <div
                    onClick={() => setActiveSupermarketShelf('Doctor')}
                    className="p-3 rounded-2xl bg-gradient-to-b from-fuchsia-600 to-purple-800 border-2 border-fuchsia-400 text-white shadow-lg cursor-pointer hover:scale-105 transition-all space-y-1"
                  >
                    <span className="text-xl block">🩺</span>
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider block">
                      DOCTOR LOAN
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/30 font-mono block">Special APR</span>
                  </div>

                  {/* Shelf 4: Home Loan */}
                  <div
                    onClick={() => setActiveSupermarketShelf('Home')}
                    className="p-3 rounded-2xl bg-gradient-to-b from-cyan-600 to-blue-800 border-2 border-cyan-400 text-white shadow-lg cursor-pointer hover:scale-105 transition-all space-y-1"
                  >
                    <span className="text-xl block">🏠</span>
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider block">
                      HOME LOAN
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/30 font-mono block">From 8.4%</span>
                  </div>

                  {/* Shelf 5: Mortgage Loan */}
                  <div
                    onClick={() => setActiveSupermarketShelf('Mortgage')}
                    className="p-3 rounded-2xl bg-gradient-to-b from-amber-600 to-amber-800 border-2 border-amber-400 text-white shadow-lg cursor-pointer hover:scale-105 transition-all space-y-1"
                  >
                    <span className="text-xl block">🏛️</span>
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider block">
                      MORTGAGE LOAN
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/30 font-mono block">High Quantum</span>
                  </div>

                  {/* Shelf 6: Overdraft / CC */}
                  <div
                    onClick={() => setActiveSupermarketShelf('Overdraft')}
                    className="p-3 rounded-2xl bg-gradient-to-b from-teal-600 to-emerald-800 border-2 border-teal-400 text-white shadow-lg cursor-pointer hover:scale-105 transition-all space-y-1"
                  >
                    <span className="text-xl block">📈</span>
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider block">
                      OVER DRAFT LOAN
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-black/30 font-mono block">Revolving Limit</span>
                  </div>

                </div>

                {/* Shopper & Cart Graphic Banner */}
                <div className="bg-slate-900/90 rounded-2xl p-4 border border-white/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center text-2xl font-bold shadow-md">
                      🛒
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-white">
                        VGS LOAN SUPER MARKET
                      </h4>
                      <p className="text-[11px] text-slate-300">
                        Add preferred loans to your cart & compare sanction rates
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onCalcClick}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shrink-0 cursor-pointer transition-all shadow-md"
                  >
                    Calculate 🧮
                  </button>
                </div>

                {activeSupermarketShelf && (
                  <div className="mt-3 p-3 rounded-xl bg-blue-900/90 border border-amber-300/40 text-xs text-white flex justify-between items-center animate-fade-in">
                    <span>Selected Aisle: <strong>{activeSupermarketShelf} Loan</strong></span>
                    <button
                      onClick={() => handleAvailLoan(activeSupermarketShelf)}
                      className="px-2.5 py-1 rounded bg-amber-400 text-slate-950 font-bold text-[10px] cursor-pointer"
                    >
                      Avail Now ➔
                    </button>
                  </div>
                )}

              </div>

            </div>

          </div>

          {/* =========================================================================
              4. BOTTOM CATEGORY ICONS RIBBON (Quick Loan Category Icons)
             ========================================================================= */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-center text-xs text-blue-100 font-bold">
            
            <a
              href="#products"
              className="flex items-center gap-2 p-2 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-base">🏠</span>
              <span>Property Finance</span>
            </a>

            <a
              href="#partners"
              className="flex items-center gap-2 p-2 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-base">🏦</span>
              <span>15+ Partner Banks</span>
            </a>

            <a
              href="#products"
              className="flex items-center gap-2 p-2 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-base">💻</span>
              <span>100% Digital Process</span>
            </a>

            <a
              href="#products"
              className="flex items-center gap-2 p-2 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-base">📝</span>
              <span>Instant Cheque Disbursal</span>
            </a>

            <a
              href="#products"
              className="flex items-center gap-2 p-2 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-base">🪙</span>
              <span>Gold & Asset Pledge</span>
            </a>

          </div>

        </div>

      </div>

      {/* =========================================================================
          5. FLOATING ACTION BADGES (WhatsApp on Left & AI Assistant on Right)
         ========================================================================= */}
      
      {/* Floating WhatsApp Desk on Bottom Left */}
      <a
        href="https://wa.me/917675852618?text=Hello%20VGS%20Finance,%20I%20am%20looking%20for%20loan%20options%20in%20the%20Loan%20Supermarket."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center text-3xl shadow-2xl hover:scale-110 transition-all cursor-pointer group"
        title="Chat with Loan Advisor on WhatsApp"
      >
        <span className="animate-bounce">💬</span>
        <span className="absolute left-16 top-2.5 px-3 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700 pointer-events-none">
          WhatsApp Advisory Desk
        </span>
      </a>

      {/* Floating AI Assistant on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={onApplyClick}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white flex items-center justify-center text-2xl shadow-2xl hover:scale-110 transition-all cursor-pointer group relative"
          title="Instant Loan Assistant"
        >
          <span>🤖</span>
          <span className="absolute right-16 top-2.5 px-3 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity border border-slate-700 pointer-events-none">
            Instant Loan Assistant
          </span>
        </button>
      </div>

      {/* =========================================================================
          6. MODAL: JOIN AS FREELANCER / DSA PARTNER
         ========================================================================= */}
      {partnerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-scale-up">
            
            <div className="flex justify-between items-start">
              <div>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  Partner with VGS Finance
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Join as Freelancer / DSA Partner
                </h3>
                <p className="text-xs text-slate-400">
                  Earn competitive payouts by referring loan borrowers across 15+ banks.
                </p>
              </div>
              <button
                onClick={() => setPartnerModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {partnerSubmitted ? (
              <div className="p-6 text-center space-y-2 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                <span className="text-3xl">✅</span>
                <h4 className="text-sm font-bold text-emerald-400">Partner Application Registered!</h4>
                <p className="text-xs text-slate-300">Our channel manager will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={partnerFormData.name}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Mobile (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={partnerFormData.phone}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Email ID</label>
                    <input
                      type="email"
                      placeholder="partner@example.com"
                      value={partnerFormData.email}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">City / Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Visakhapatnam, Hyderabad"
                      value={partnerFormData.city}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, city: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Experience in Finance</label>
                    <select
                      value={partnerFormData.experience}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, experience: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Fresher">Fresher (New to Loans)</option>
                      <option value="1-3 Years">1 - 3 Years</option>
                      <option value="3-5 Years">3 - 5 Years</option>
                      <option value="5+ Years">5+ Years (Established DSA)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/20 cursor-pointer transition-all"
                >
                  🚀 Submit Partner Application
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
