import { useState } from 'react';
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

  const handleSearchSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (onSearchFilter) {
      onSearchFilter({
        searchTerm,
        selectedCat: selectedCat !== 'ALL' ? selectedCat : 'cat-personal',
        amountRange: amountRange || 500000
      });
    }
  };

  const handleInstantEnquiry = () => {
    if (onQuickApply) {
      onQuickApply({
        categoryId: selectedCat !== 'ALL' ? selectedCat : 'cat-personal',
        requestedAmount: amountRange || 500000,
        searchTerm: searchTerm.trim() || 'Loan Enquiry'
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

        {/* 2-COLUMN SPLIT LAYOUT: FORM ON LEFT, CLEAN SIDE IMAGE ON RIGHT */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* =========================================================================
              LEFT COLUMN (7 cols): CLEAN & CRISP DISCOVERY FORM
             ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Header Section */}
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
                Search by keyword, select a loan category, and enter your required amount to compare lowest rates across partner banks.
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

            {/* Clean & Sleek Discovery Form */}
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
                      className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6EA928] focus:bg-white focus:ring-2 focus:ring-[#6EA928]/20 transition-all shadow-xs font-medium"
                    />
                    {searchTerm ? (
                      <button
                        type="button"
                        onClick={() => setSearchTerm('')}
                        className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700 text-xs cursor-pointer p-1"
                      >
                        ✕
                      </button>
                    ) : (
                      <span className="absolute right-3.5 top-3.5 text-slate-400 text-xs">🔍</span>
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
                    className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#6EA928] focus:bg-white focus:ring-2 focus:ring-[#6EA928]/20 transition-all cursor-pointer shadow-xs"
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

              {/* Field 3: Required Loan Amount (Clean Input Field with Indian Rupee formatting) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  3. Required Loan Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-500 font-bold text-xs">₹</span>
                  <input
                    type="text"
                    value={amountRange ? Number(amountRange).toLocaleString('en-IN') : ''}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/[^0-9]/g, '');
                      setAmountRange(raw ? Number(raw) : 0);
                    }}
                    placeholder="e.g. 5,00,000"
                    className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-8 pr-28 py-3.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-[#6EA928] focus:bg-white focus:ring-2 focus:ring-[#6EA928]/20 transition-all shadow-xs font-mono"
                  />
                  <div className="absolute right-4 top-3 text-[11px] font-bold text-[#6EA928] pointer-events-none">
                    {amountRange >= 10000000
                      ? `₹ ${(amountRange / 10000000).toFixed(amountRange % 10000000 === 0 ? 0 : 2)} Crore`
                      : amountRange >= 100000
                        ? `₹ ${(amountRange / 100000).toFixed(amountRange % 100000 === 0 ? 0 : 1)} Lakhs`
                        : ''}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
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
              RIGHT COLUMN (5 cols): CLEAN, UNBLOCKED PROFESSIONAL SIDE IMAGE
             ========================================================================= */}
          <div className="lg:col-span-5 relative flex flex-col justify-between">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-gradient-to-br from-slate-900 to-[#0A5C80] h-full min-h-[380px] lg:min-h-full flex flex-col justify-between group">
              
              {/* Professional High-Resolution Financial Advisor Side Photograph */}
              <img
                src={loanDiscoveryAdvisor}
                alt="VGS Financial Advisor"
                className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />

              {/* Subtle Ambient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"></div>

              {/* Top Floating Badge Row */}
              <div className="relative z-20 p-4 flex items-center justify-between gap-2">
                <div className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <span className="text-amber-500 text-sm">★★★★★</span>
                  <span>4.9/5 Rating</span>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-[#6EA928] text-white text-[11px] font-black shadow-lg flex items-center gap-1.5 border border-white/20">
                  <span>⚡</span>
                  <span>Instant Match</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
