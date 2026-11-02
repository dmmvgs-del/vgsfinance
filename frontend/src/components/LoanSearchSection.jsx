import { useState } from 'react';

export default function LoanSearchSection({ categories, onSearchFilter, onQuickApply }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [amountRange, setAmountRange] = useState(500000);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchFilter) {
      onSearchFilter({ searchTerm, selectedCat, amountRange });
    }
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInstantEnquiry = () => {
    if (onQuickApply) {
      onQuickApply({ categoryId: selectedCat !== 'ALL' ? selectedCat : 'cat-personal', requestedAmount: amountRange });
    }
    const el = document.getElementById('quick-enquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="loan-search" className="relative -mt-8 z-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-1.5">
              <span>🔍</span> Intelligent Loan Discovery Engine
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Find & Compare Your Ideal Loan in Seconds
            </h2>
          </div>
          <div className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700">
            ⚡ Instant Indicative Match across 15+ Lending Partners
          </div>
        </div>

        <form onSubmit={handleSearchSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Search by Keywords */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                1. Search by Keyword or Purpose
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="e.g. Personal, Business, Gold, Home..."
                  className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl px-4 py-3.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <span className="absolute right-4 top-3.5 text-slate-400">🔍</span>
              </div>
            </div>

            {/* Select Loan Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                2. Select Loan Category
              </label>
              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-2xl px-4 py-3.5 text-xs text-white font-semibold focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
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
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  3. Required Amount
                </label>
                <span className="font-extrabold text-emerald-400 text-sm font-mono">
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
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>₹50K</span>
                  <span>₹25L</span>
                  <span>₹50L</span>
                  <span>₹1Cr</span>
                </div>
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:w-2/3 py-3.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>🔎</span> Search & Compare Loan Rates in Supermarket
            </button>
            <button
              type="button"
              onClick={handleInstantEnquiry}
              className="w-full sm:w-1/3 py-3.5 rounded-xl font-bold text-xs bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white shadow-lg shadow-indigo-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>⚡</span> Fast 1-Minute Loan Enquiry
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}

