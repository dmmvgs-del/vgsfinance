import { useState, useMemo } from 'react';
import loanDiscoveryAdvisor from '../assets/loan-discovery-advisor.jpg';

export default function LoanSearchSection({ categories = [], onSearchFilter, onQuickApply }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [amountRange, setAmountRange] = useState(500000);

  // Quick preset loan purposes for 1-click discovery
  const quickPurposePresets = [
    { label: '🚗 Kia / Car Loan', term: 'Kia Seltos', catId: 'cat-car', amount: 800000 },
    { label: '🏠 Dream Home', term: 'Home Purchase', catId: 'cat-home', amount: 3500000 },
    { label: '💼 Business MSME', term: 'Working Capital', catId: 'cat-business', amount: 1500000 },
    { label: '🩺 Medical Emergency', term: 'Emergency Treatment', catId: 'cat-doctor', amount: 300000 },
    { label: '🪙 15-Min Gold Loan', term: 'Gold Loan', catId: 'cat-gold', amount: 200000 },
    { label: '⚡ Instant Personal', term: 'Personal Loan', catId: 'cat-personal', amount: 400000 }
  ];

  // Quick preset amount buttons
  const quickAmountPills = [
    { label: '₹1 Lakh', val: 100000 },
    { label: '₹5 Lakhs', val: 500000 },
    { label: '₹15 Lakhs', val: 1500000 },
    { label: '₹25 Lakhs', val: 2500000 },
    { label: '₹50 Lakhs', val: 5000000 },
    { label: '₹1 Crore', val: 10000000 }
  ];

  // Format currency in Indian Lakhs/Crores for crystal clear readability
  const formatAmountText = (val) => {
    if (val >= 10000000) return `₹ ${(val / 10000000).toFixed(val % 10000000 === 0 ? 0 : 2)} Crore`;
    if (val >= 100000) return `₹ ${(val / 100000).toFixed(val % 100000 === 0 ? 0 : 1)} Lakhs`;
    return `₹ ${val.toLocaleString('en-IN')}`;
  };

  // Live Indicative Match Calculation
  const indicativeMatch = useMemo(() => {
    const s = searchTerm.toLowerCase().trim();
    let catId = selectedCat;
    let label = 'Personal Loan';
    let rate = 10.5;
    let tenureMonths = 48;
    let icon = '⚡';

    if (catId === 'cat-car' || ['kia', 'car', 'auto', 'vehicle', 'maruti', 'hyundai', 'tata', 'ev'].some(w => s.includes(w))) {
      catId = 'cat-car';
      label = 'Car & Vehicle Loan (VGS Prime Auto)';
      rate = 8.85;
      tenureMonths = 60;
      icon = '🚗';
    } else if (catId === 'cat-home' || ['home', 'house', 'flat', 'villa', 'plot', 'apartment', 'housing'].some(w => s.includes(w))) {
      catId = 'cat-home';
      label = 'Home Loan (VGS Prime Housing Finance)';
      rate = 8.4;
      tenureMonths = 180;
      icon = '🏠';
    } else if (catId === 'cat-business' || ['business', 'working capital', 'msme', 'gst', 'shop', 'trade', 'commercial'].some(w => s.includes(w))) {
      catId = 'cat-business';
      label = 'Business Loan (VGS Business Growth Capital)';
      rate = 11.5;
      tenureMonths = 48;
      icon = '💼';
    } else if (catId === 'cat-gold' || ['gold', 'jewel', 'ornament', 'sovereign'].some(w => s.includes(w))) {
      catId = 'cat-gold';
      label = 'Gold Loan (VGS 15-Minute Instant Gold)';
      rate = 8.5;
      tenureMonths = 12;
      icon = '🪙';
    } else if (catId === 'cat-doctor' || ['doctor', 'clinic', 'dentist', 'hospital', 'medical', 'emergency', 'health', 'insurance'].some(w => s.includes(w))) {
      catId = 'cat-doctor';
      label = 'Medical & Healthcare Loan (2-Hour Clearance)';
      rate = 9.5;
      tenureMonths = 36;
      icon = '🩺';
    } else if (catId === 'cat-education' || ['education', 'college', 'study', 'university', 'abroad', 'degree'].some(w => s.includes(w))) {
      catId = 'cat-education';
      label = 'Education Loan (Global Scholar Financing)';
      rate = 9.25;
      tenureMonths = 84;
      icon = '🎓';
    } else if (catId === 'cat-mortgage' || ['mortgage', 'property', 'lap', 'rental', 'lrd'].some(w => s.includes(w))) {
      catId = 'cat-mortgage';
      label = 'Loan Against Property (LAP High-Equity)';
      rate = 9.15;
      tenureMonths = 120;
      icon = '🏢';
    } else if (catId !== 'ALL') {
      const found = categories?.find(c => c.id === catId);
      if (found) {
        label = found.name;
        rate = 10.0;
        icon = found.icon || '💼';
      }
    }

    // Live reducing balance EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const r = (rate / 12) / 100;
    const n = tenureMonths;
    const emi = (amountRange * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    return {
      catId,
      label,
      rate,
      tenureMonths,
      icon,
      approxEmi: Math.round(emi)
    };
  }, [searchTerm, selectedCat, amountRange, categories]);

  const handleSearchSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onSearchFilter) {
      onSearchFilter({
        searchTerm,
        selectedCat: selectedCat !== 'ALL' ? selectedCat : indicativeMatch.catId,
        amountRange
      });
    }
  };

  const handleInstantEnquiry = () => {
    if (onQuickApply) {
      onQuickApply({
        categoryId: selectedCat !== 'ALL' ? selectedCat : indicativeMatch.catId,
        requestedAmount: amountRange,
        searchTerm: searchTerm.trim() || indicativeMatch.label
      });
    }
  };

  const handleApplyPreset = (preset) => {
    setSearchTerm(preset.term);
    setSelectedCat(preset.catId);
    setAmountRange(preset.amount);
  };

  return (
    <section id="loan-search" className="relative -mt-6 sm:-mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      
      {/* Flagship Discovery Hub Card with Gradient Rim & Premium Box Shadow */}
      <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl shadow-slate-300/40 relative overflow-hidden transition-all duration-300 hover:border-[#6EA928]/40">
        
        {/* Soft Ambient Background Light Accents */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-sky-400/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* 2-COLUMN SPLIT LAYOUT: FORM ON LEFT, EXECUTIVE SIDE IMAGE ON RIGHT */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* =========================================================================
              LEFT COLUMN (7 cols): INTERACTIVE DISCOVERY & COMPARISON ENGINE
             ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* 1. Header Section */}
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-[11px] sm:text-xs font-black tracking-wide uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#6EA928] animate-ping"></span>
                  <span>🔍 Intelligent Loan Discovery Engine</span>
                </span>
                <span className="text-[11px] font-bold text-[#0A5C80] bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                  ⚡ 15+ Lending Partners Live
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#041E2B] tracking-tight leading-tight">
                Find & Compare Your Ideal Loan <span className="text-[#0A5C80]">in Seconds</span>
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Select your loan purpose or loan amount below to unlock instant pre-qualified rates and live monthly EMI simulations.
              </p>

              {/* Quick Purpose Tag Chips */}
              <div className="pt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Popular:</span>
                {quickPurposePresets.map((preset, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer border ${
                      searchTerm === preset.term || selectedCat === preset.catId
                        ? 'bg-[#0A5C80] text-white border-[#0A5C80] shadow-sm'
                        : 'bg-slate-50 hover:bg-[#E8F5D4] text-slate-700 border-slate-200 hover:border-[#6EA928]'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Interactive Discovery Form */}
            <form onSubmit={handleSearchSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Field 1: Search by Purpose / Keyword */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    1. Search by Keyword or Model
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="e.g. Kia, Car, Home, Doctor, Gold..."
                      className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6EA928] focus:bg-white focus:ring-2 focus:ring-[#6EA928]/20 transition-all shadow-xs font-medium"
                    />
                    {searchTerm ? (
                      <button
                        type="button"
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-700 text-xs cursor-pointer p-1"
                      >
                        ✕
                      </button>
                    ) : (
                      <span className="absolute right-3.5 top-3 text-slate-400 text-xs">🔍</span>
                    )}
                  </div>
                </div>

                {/* Field 2: Category Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    2. Select Loan Category
                  </label>
                  <select
                    value={selectedCat}
                    onChange={(e) => setSelectedCat(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#6EA928] focus:bg-white focus:ring-2 focus:ring-[#6EA928]/20 transition-all cursor-pointer shadow-xs"
                  >
                    <option value="ALL">🏪 All Loan Categories (Supermarket)</option>
                    <option value="cat-home">🏠 Home & Housing Loan (from 8.40% p.a.)</option>
                    <option value="cat-personal">👤 Personal Loan (from 10.50% p.a.)</option>
                    <option value="cat-business">💼 Business & Working Capital (from 11.50% p.a.)</option>
                    <option value="cat-car">🚗 Car & Auto Loan (from 8.85% p.a.)</option>
                    <option value="cat-gold">🪙 Gold Loan (from 8.50% p.a.)</option>
                    <option value="cat-doctor">🩺 Doctor & Medical Loan (from 9.50% p.a.)</option>
                    <option value="cat-education">🎓 Education Loan (from 9.25% p.a.)</option>
                    <option value="cat-mortgage">🏢 Loan Against Property (from 9.15% p.a.)</option>
                    {categories?.filter(c => !['cat-home', 'cat-personal', 'cat-business', 'cat-car', 'cat-gold', 'cat-doctor', 'cat-education', 'cat-mortgage'].includes(c.id)).map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon || '💼'} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Field 3: Required Loan Amount (Monospace Display + Quick Pills + Range Slider) */}
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3">
                <div className="flex flex-wrap justify-between items-center gap-2">
                  <div>
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      3. Required Loan Amount
                    </label>
                    <span className="text-[11px] font-bold text-[#6EA928]">
                      {formatAmountText(amountRange)}
                    </span>
                  </div>
                  
                  {/* Digital High-Contrast Amount Box */}
                  <div className="font-extrabold text-[#0A5C80] text-sm sm:text-base font-mono bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs">
                    ₹ {amountRange.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* Range Slider */}
                <div className="pt-1">
                  <input
                    type="range"
                    min="50000"
                    max="10000000"
                    step="50000"
                    value={amountRange}
                    onChange={(e) => setAmountRange(Number(e.target.value))}
                    className="w-full accent-[#6EA928] cursor-pointer h-2 bg-slate-200 rounded-lg transition-all"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1 font-semibold">
                    <span>₹50K</span>
                    <span>₹25L</span>
                    <span>₹50L</span>
                    <span>₹1Cr</span>
                  </div>
                </div>

                {/* Quick Amount Preset Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Quick:</span>
                  {quickAmountPills.map((pill, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAmountRange(pill.val)}
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                        amountRange === pill.val
                          ? 'bg-[#6EA928] text-white shadow-xs'
                          : 'bg-white hover:bg-slate-200 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Indicative Match Result Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#F0F8FA] via-white to-[#E8F5D4] border border-[#6EA928]/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl p-1.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                    {indicativeMatch.icon}
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-black text-slate-400 block tracking-wider">
                      Best Indicative Match
                    </span>
                    <span className="text-slate-900 font-extrabold text-sm sm:text-base leading-tight block">
                      {indicativeMatch.label}
                    </span>
                    <span className="text-slate-600 font-medium text-[11px]">
                      Starting from <strong className="text-[#466E18] font-bold">{indicativeMatch.rate}% p.a.</strong> • Tenure up to {indicativeMatch.tenureMonths} mos
                    </span>
                  </div>
                </div>

                <div className="sm:text-right shrink-0 bg-white sm:bg-transparent p-2.5 sm:p-0 rounded-xl border border-slate-200 sm:border-0 w-full sm:w-auto">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Calculated Monthly EMI
                  </span>
                  <span className="text-[#0A5C80] font-black text-base sm:text-lg block tracking-tight">
                    ₹ {indicativeMatch.approxEmi.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500">/mo</span>
                  </span>
                  <span className="text-[10px] text-emerald-800 font-semibold block">
                    Monthly Reducing Balance
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="submit"
                  className="w-full sm:w-7/12 py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm bg-[#6EA928] hover:bg-[#5A8B1F] text-white shadow-lg shadow-[#6EA928]/30 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 group tracking-wide"
                >
                  <span>🔎</span>
                  <span>Search & Compare Rates</span>
                  <span className="group-hover:translate-x-1 transition-transform">➔</span>
                </button>
                <button
                  type="button"
                  onClick={handleInstantEnquiry}
                  className="w-full sm:w-5/12 py-3.5 px-4 rounded-xl font-black text-xs sm:text-sm bg-[#0A5C80] hover:bg-[#084E6D] text-white shadow-lg shadow-[#0A5C80]/20 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 group tracking-wide"
                >
                  <span>⚡</span>
                  <span>Fast 1-Min Enquiry</span>
                  <span className="group-hover:translate-x-1 transition-transform">➔</span>
                </button>
              </div>

            </form>

          </div>

          {/* =========================================================================
              RIGHT COLUMN (5 cols): ULTRA-PREMIUM SIDE IMAGE & TRUST SHOWCASE
             ========================================================================= */}
          <div className="lg:col-span-5 relative flex flex-col justify-between">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-gradient-to-br from-slate-900 to-[#0A5C80] h-full min-h-[460px] lg:min-h-[540px] flex flex-col justify-end group">
              
              {/* Professional High-Resolution Financial Advisor Side Photograph */}
              <img
                src={loanDiscoveryAdvisor}
                alt="VGS Financial Advisor"
                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />

              {/* High-Contrast Gradient Shadows for Text & Floating Badges */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#041E2B] via-[#041E2B]/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#041E2B]/50 via-transparent to-transparent"></div>

              {/* 1. Top Floating Badge Row */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2">
                <div className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <span className="text-amber-500 text-sm">★★★★★</span>
                  <span>4.9/5 Rating</span>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-[#6EA928] text-white text-[11px] font-black shadow-lg flex items-center gap-1.5 border border-white/20">
                  <span>⚡</span>
                  <span>Instant Match</span>
                </div>
              </div>

              {/* 2. Middle Paperless Approval Tag */}
              <div className="absolute top-1/2 -translate-y-10 left-4 z-20 hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/60 text-xs font-bold text-slate-900 animate-pulse">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6EA928]"></span>
                <span>100% Digital Verification</span>
              </div>

              {/* 3. Bottom Glassmorphism Showcase Card */}
              <div className="relative z-20 p-5 m-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white shadow-2xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#A3E635] flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-[#6EA928] animate-ping"></span>
                    15+ Lending Partners
                  </span>
                  <span className="text-[10px] text-slate-300 font-mono bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
                    RBI REGULATED
                  </span>
                </div>
                
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  Compare verified loan offers across India&apos;s leading PSU & Private banks with zero impact on your CIBIL score.
                </p>

                {/* Partner Bank Micro-Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] font-bold text-slate-300">
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">🏛️ SBI</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">🏦 HDFC</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">💳 ICICI</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10">💼 AXIS</span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#6EA928]/30 border border-[#6EA928]/40 text-[#A3E635]">+10 More</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
