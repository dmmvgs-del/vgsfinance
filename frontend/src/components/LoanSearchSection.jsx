import { useState, useMemo } from 'react';

export default function LoanSearchSection({ categories, onSearchFilter, onQuickApply }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [amountRange, setAmountRange] = useState(500000);

  // Live Indicative Match Calculation
  const indicativeMatch = useMemo(() => {
    const s = searchTerm.toLowerCase().trim();
    let catId = selectedCat;
    let label = 'Personal Loan';
    let rate = 10.5;
    let tenureMonths = 48;

    if (catId === 'cat-car' || ['kia', 'car', 'auto', 'vehicle', 'maruti', 'hyundai', 'tata'].some(w => s.includes(w))) {
      catId = 'cat-car';
      label = 'Car Loan (VGS Prime Car Loan)';
      rate = 8.85;
      tenureMonths = 60;
    } else if (catId === 'cat-home' || ['home', 'house', 'flat', 'villa', 'plot', 'apartment'].some(w => s.includes(w))) {
      catId = 'cat-home';
      label = 'Home Loan (VGS Prime Housing Loan)';
      rate = 8.4;
      tenureMonths = 120;
    } else if (catId === 'cat-business' || ['business', 'working capital', 'msme', 'gst', 'shop'].some(w => s.includes(w))) {
      catId = 'cat-business';
      label = 'Business Loan (VGS Business Growth Loan)';
      rate = 11.5;
      tenureMonths = 48;
    } else if (catId === 'cat-gold' || ['gold', 'jewel', 'ornament'].some(w => s.includes(w))) {
      catId = 'cat-gold';
      label = 'Gold Loan (VGS Super Fast Gold Loan)';
      rate = 8.5;
      tenureMonths = 12;
    } else if (catId === 'cat-doctor' || ['doctor', 'clinic', 'dentist', 'hospital', 'medical', 'emergency', 'health', 'insurance'].some(w => s.includes(w))) {
      catId = 'cat-doctor';
      label = 'Medical Loan (Emergency / Health / Doctor)';
      rate = 9.5;
      tenureMonths = 48;
    } else if (catId === 'cat-education' || ['education', 'college', 'study', 'university'].some(w => s.includes(w))) {
      catId = 'cat-education';
      label = 'Education Loan (Global Scholar)';
      rate = 9.25;
      tenureMonths = 84;
    } else if (catId !== 'ALL') {
      const found = categories?.find(c => c.id === catId);
      if (found) {
        label = found.name;
        rate = 10.0;
      }
    }

    // Approx reducing balance EMI
    const r = (rate / 12) / 100;
    const n = tenureMonths;
    const emi = (amountRange * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    return {
      catId,
      label,
      rate,
      tenureMonths,
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

  return (
    <section id="loan-search" className="relative -mt-10 z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-slate-300/50 space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#6EA928] flex items-center gap-1.5">
              <span>🔍</span> Intelligent Loan Discovery Engine
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Find & Compare Your Ideal Loan in Seconds
            </h2>
          </div>
          <div className="text-xs text-[#0A5C80] bg-[#E8F5D4] px-3.5 py-1.5 rounded-full border border-[#6EA928]/30 font-semibold shadow-sm">
            ⚡ Instant Indicative Match across 15+ Lending Partners
          </div>
        </div>

        <form onSubmit={handleSearchSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Search by Keywords */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1. Search by Keyword or Purpose
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. Car, Kia, Personal, Business, Gold..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6EA928] focus:bg-white transition-all shadow-sm font-medium"
                />
                {searchTerm ? (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-700 text-xs cursor-pointer"
                  >
                    ✕
                  </button>
                ) : (
                  <span className="absolute right-4 top-3.5 text-slate-400">🔍</span>
                )}
              </div>
            </div>

            {/* Select Loan Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                2. Select Loan Category
              </label>
              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-4 py-3.5 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#6EA928] focus:bg-white transition-all cursor-pointer shadow-sm"
              >
                <option value="ALL">All Loan Categories (Supermarket)</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Slider & Display */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  3. Required Amount
                </label>
                <span className="font-extrabold text-[#0A5C80] text-sm font-mono bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                  ₹ {amountRange.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="py-2">
                <input
                  type="range"
                  min="50000"
                  max="10000000"
                  step="50000"
                  value={amountRange}
                  onChange={(e) => setAmountRange(Number(e.target.value))}
                  className="w-full accent-[#6EA928] cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1 font-semibold">
                  <span>₹50K</span>
                  <span>₹25L</span>
                  <span>₹50L</span>
                  <span>₹1Cr</span>
                </div>
              </div>
            </div>

          </div>

          {/* Live Indicative Match Result Pill */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#F0F8FA] to-[#E8F5D4] border border-[#6EA928]/35 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base text-[#6EA928]">🎯</span>
              <span className="text-slate-700 font-semibold">
                Indicative Match: <strong className="text-[#041E2B]">{indicativeMatch.label}</strong> • Starting from <strong className="text-[#6EA928]">{indicativeMatch.rate}% p.a.</strong>
              </span>
            </div>
            <div className="text-[#0A5C80] font-black text-xs sm:text-right shrink-0">
              Est. EMI: ~₹ {indicativeMatch.approxEmi.toLocaleString('en-IN')} / mo
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              type="submit"
              className="w-full sm:w-2/3 py-3.5 rounded-xl font-black text-xs bg-[#6EA928] hover:bg-[#5A8B1F] text-white shadow-lg shadow-[#6EA928]/30 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>🔎</span>
              <span>Search & Compare Loan Rates in Supermarket</span>
              <span className="group-hover:translate-x-1 transition-transform">➔</span>
            </button>
            <button
              type="button"
              onClick={handleInstantEnquiry}
              className="w-full sm:w-1/3 py-3.5 rounded-xl font-black text-xs bg-[#0A5C80] hover:bg-[#084E6D] text-white shadow-lg shadow-[#0A5C80]/20 hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>⚡</span>
              <span>Fast 1-Minute Loan Enquiry</span>
              <span className="group-hover:translate-x-1 transition-transform">➔</span>
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}

