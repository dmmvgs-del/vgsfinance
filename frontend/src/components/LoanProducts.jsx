import { useState, useEffect } from 'react';

export default function LoanProducts({ products, categories, onSelectProduct, initialCategoryId, searchFilter, onViewDetails }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  // Basic Filtering States
  const [maxRateFilter, setMaxRateFilter] = useState('ALL');
  const [maxTenureFilter, setMaxTenureFilter] = useState('ALL');
  const [selectedLoanType, setSelectedLoanType] = useState(null);

  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategory(initialCategoryId);
    }
  }, [initialCategoryId]);

  useEffect(() => {
    if (searchFilter) {
      if (searchFilter.selectedCat && searchFilter.selectedCat !== 'ALL') {
        setSelectedCategory(searchFilter.selectedCat);
      }
      if (searchFilter.searchTerm) {
        setSearchQuery(searchFilter.searchTerm);
      }
    }
  }, [searchFilter]);

  // Phase 2: Loan Details Modal State
  const [detailModalProduct, setDetailModalProduct] = useState(null);

  // In-Modal Quick EMI Calculator state
  const [modalAmount, setModalAmount] = useState(500000);
  const [modalTenure, setModalTenure] = useState(36);
  const [modalEmiResult, setModalEmiResult] = useState({ emi: 0, totalInterest: 0 });

  // When modal product changes, initialize the sliders
  useEffect(() => {
    if (detailModalProduct) {
      setModalAmount(detailModalProduct.minAmount || 100000);
      setModalTenure(Math.min(36, detailModalProduct.maxTenure || 36));
    }
  }, [detailModalProduct]);

  // Calculate in-modal EMI
  useEffect(() => {
    if (!detailModalProduct) return;
    const p = parseFloat(modalAmount) || 0;
    const r = (parseFloat(detailModalProduct.interestRate) || 12) / 12 / 100;
    const n = parseInt(modalTenure, 10) || 12;

    if (p > 0 && r > 0 && n > 0) {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayable = emi * n;
      setModalEmiResult({
        emi: Math.round(emi),
        totalInterest: Math.round(totalPayable - p)
      });
    }
  }, [modalAmount, modalTenure, detailModalProduct]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  // Filter & Search Engine
  let filtered = products.filter(p => {
    // 1. Category Matching
    const matchCat = selectedCategory === 'all' || p.categoryId === selectedCategory;

    // 2. Keyword Search
    const query = searchQuery.toLowerCase().trim();
    const matchSearch = query === '' ||
      p.name.toLowerCase().includes(query) ||
      (p.tagline && p.tagline.toLowerCase().includes(query)) ||
      (p.processingFee && p.processingFee.toLowerCase().includes(query)) ||
      (p.eligibility?.employmentType && p.eligibility.employmentType.toLowerCase().includes(query));

    // 3. Rate Filter
    let matchRate = true;
    if (maxRateFilter === 'UNDER_9') matchRate = p.interestRate <= 9.0;
    else if (maxRateFilter === 'UNDER_10_5') matchRate = p.interestRate <= 10.5;
    else if (maxRateFilter === 'UNDER_11_5') matchRate = p.interestRate <= 11.5;

    // 4. Tenure Filter
    let matchTenure = true;
    if (maxTenureFilter === 'SHORT') matchTenure = p.maxTenure <= 36;
    else if (maxTenureFilter === 'MEDIUM') matchTenure = p.maxTenure > 36 && p.maxTenure <= 84;
    else if (maxTenureFilter === 'LONG') matchTenure = p.maxTenure > 84;

    return matchCat && matchSearch && matchRate && matchTenure;
  });

  // Sort Engine
  if (sortBy === 'rate-low') {
    filtered.sort((a, b) => a.interestRate - b.interestRate);
  } else if (sortBy === 'amount-high') {
    filtered.sort((a, b) => b.maxAmount - a.maxAmount);
  } else if (sortBy === 'tenure-high') {
    filtered.sort((a, b) => b.maxTenure - a.maxTenure);
  }

  const selectedCategoryObj = categories.find(c => c.id === selectedCategory);

  const handleSelectLoanType = (prod) => {
    setSelectedLoanType(prod.id);
    if (onSelectProduct) {
      onSelectProduct(prod);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxRateFilter('ALL');
    setMaxTenureFilter('ALL');
    setSortBy('recommended');
  };

  return (
    <section id="products" className="py-20 bg-slate-900/60 border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span>🛒</span> Centralized Loan Supermarket
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Loan Category Listing & Product Marketplace
          </h2>
          <p className="text-sm text-slate-300">
            Browse loan categories, filter interest rates, compare limits, select your loan type, and enquire with 1-click submission.
          </p>
        </div>

        {/* =========================================================================
            1. LOAN CATEGORY LISTING (All 16 Categories)
           ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider gap-2">
            <span className="flex items-center gap-2">
              <span>📋</span> 1. Loan Category Listing
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                {categories.length} Categories
              </span>
            </span>
            <span className="text-slate-500 text-[11px] font-normal lowercase">
              Click any category card to filter applicable products
            </span>
          </div>

          {/* Category Carousel / Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2.5">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${selectedCategory === 'all'
                  ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
            >
              <span className="text-xl">🌟</span>
              <span className="text-xs font-bold">All Loans</span>
              <span className="text-[9px] text-slate-500">{products.length} Products</span>
            </button>

            {categories.map((cat) => {
              const count = products.filter(p => p.categoryId === cat.id).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${isSelected
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                >
                  <span className="text-xl">{cat.icon || '📄'}</span>
                  <span className="text-xs font-bold truncate max-w-full">{cat.name}</span>
                  <span className="text-[9px] text-slate-500">{count > 0 ? `${count} Available` : 'Available'}</span>
                </button>
              );
            })}
          </div>

          {selectedCategoryObj && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-xs text-slate-300 flex items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{selectedCategoryObj.icon}</span>
                <div>
                  <span className="font-bold text-white text-sm mr-2">{selectedCategoryObj.name}:</span>
                  <span className="text-slate-400 text-xs">{selectedCategoryObj.description}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCategory('all')}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 font-bold shrink-0 cursor-pointer"
              >
                Reset Filter ✕
              </button>
            </div>
          )}
        </div>

        {/* =========================================================================
            2. SEARCH & BASIC FILTERING CONTROLS
           ========================================================================= */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-xl space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

            {/* Search Input */}
            <div className="w-full lg:w-1/3 relative">
              <span className="absolute left-3.5 top-3 text-slate-500 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search by loan name, purpose, eligibility..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Basic Filtering Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-2/3 justify-start lg:justify-end text-xs">

              {/* Filter: Interest Rate */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-medium text-[11px]">Rate:</span>
                <select
                  value={maxRateFilter}
                  onChange={(e) => setMaxRateFilter(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-white font-medium focus:outline-none focus:border-emerald-500 cursor-pointer text-xs"
                >
                  <option value="ALL">All Rates</option>
                  <option value="UNDER_9">≤ 9.0% p.a. (Prime Lowest)</option>
                  <option value="UNDER_10_5">≤ 10.5% p.a.</option>
                  <option value="UNDER_11_5">≤ 11.5% p.a.</option>
                </select>
              </div>

              {/* Filter: Tenure Range */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-medium text-[11px]">Tenure:</span>
                <select
                  value={maxTenureFilter}
                  onChange={(e) => setMaxTenureFilter(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-white font-medium focus:outline-none focus:border-emerald-500 cursor-pointer text-xs"
                >
                  <option value="ALL">Any Tenure</option>
                  <option value="SHORT">Short (Up to 3 Yrs)</option>
                  <option value="MEDIUM">Medium (3 to 7 Yrs)</option>
                  <option value="LONG">Long (7+ Yrs)</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-medium text-[11px]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-2 text-white font-medium focus:outline-none focus:border-emerald-500 cursor-pointer text-xs"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rate-low">Lowest Interest Rate</option>
                  <option value="amount-high">Highest Loan Limit</option>
                  <option value="tenure-high">Longest Tenure</option>
                </select>
              </div>

              {(searchQuery || selectedCategory !== 'all' || maxRateFilter !== 'ALL' || maxTenureFilter !== 'ALL') && (
                <button
                  onClick={handleClearFilters}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 font-bold text-xs cursor-pointer flex items-center gap-1"
                >
                  Clear Filters ✕
                </button>
              )}

            </div>

          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80 pt-3">
            <span>
              Showing <strong className="text-emerald-400">{filtered.length}</strong> loan products matching your criteria
            </span>
            <span className="text-slate-500 hidden sm:inline">
              Instant indicative loan terms • Subject to lender verification
            </span>
          </div>
        </div>

        {/* =========================================================================
            3. LOAN PRODUCT CARDS & LOAN TYPE SELECTION
           ========================================================================= */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
            <span className="text-3xl">🔍</span>
            <h3 className="text-lg font-bold text-white">No loan products match your current filters</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Try adjusting your search keyword, resetting the interest rate filter, or browsing all categories.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((prod) => {
              const isSelected = selectedLoanType === prod.id;
              return (
                <div
                  key={prod.id}
                  onClick={() => setSelectedLoanType(prod.id)}
                  className={`bg-slate-900 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 group relative border cursor-pointer ${isSelected
                      ? 'border-emerald-500 shadow-xl shadow-emerald-500/20 ring-2 ring-emerald-500/40'
                      : 'border-slate-800 hover:border-slate-700'
                    }`}
                >
                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider shadow-md flex items-center gap-1">
                      <span>✓</span> Selected Loan Type
                    </div>
                  )}

                  <div className="space-y-4">

                    {/* Header: Name and Interest Rate */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
                          {categories.find(c => c.id === prod.categoryId)?.name || 'Loan'}
                        </span>
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {prod.name}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1 leading-relaxed">
                          {prod.tagline}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black block">
                          {prod.interestRate}% p.a.
                        </span>
                        <span className="text-[10px] text-slate-500 block mt-0.5 font-medium">Reducing Rate</span>
                      </div>
                    </div>

                    {/* Amount Limits & Tenure Grid */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[11px] font-medium">Loan Limit:</span>
                        <span className="font-black text-white mt-0.5 block text-xs font-mono">
                          {formatCurrency(prod.minAmount)} - {formatCurrency(prod.maxAmount)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[11px] font-medium">Tenure Window:</span>
                        <span className="font-black text-sky-400 mt-0.5 block text-xs">
                          {prod.minTenure}m to {prod.maxTenure}m ({(prod.maxTenure / 12).toFixed(0)} Yrs)
                        </span>
                      </div>
                    </div>

                    {/* Eligibility & Features */}
                    <div className="space-y-2 pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] border border-slate-700">
                          Age: {prod.eligibility?.minAge || 21}-{prod.eligibility?.maxAge || 60} Yrs
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 text-[10px] border border-slate-700">
                          Min Income: {formatCurrency(prod.eligibility?.minIncome || 25000)}/m
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-sky-300 text-[10px] border border-slate-700">
                          CIBIL: {prod.eligibility?.minCibilScore || '680+'}
                        </span>
                      </div>

                      {prod.features?.slice(0, 2).map((feat, i) => (
                        <div key={i} className="text-xs text-slate-300 flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Processing Fee */}
                    <div className="text-xs text-slate-400 pt-2 flex justify-between border-t border-slate-800/80">
                      <span>Processing Fee:</span>
                      <span className="text-slate-200 font-semibold">{prod.processingFee}</span>
                    </div>

                  </div>

                  {/* =========================================================================
                      4. LOAN TYPE SELECTION & APPLY / ENQUIRE NOW ACTION BUTTONS
                     ========================================================================= */}
                  <div className="pt-5 grid grid-cols-2 gap-2 border-t border-slate-800/60 mt-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onViewDetails) {
                          onViewDetails(prod);
                        } else {
                          setDetailModalProduct(prod);
                        }
                      }}
                      className="py-3 px-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer text-center"
                    >
                      🔍 View Details & EMI
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectLoanType(prod);
                      }}
                      className="py-3 px-3 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/20 transition-all cursor-pointer text-center"
                    >
                      🚀 Apply / Enquire Now
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Statutory Regulatory Disclaimer */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-3 shadow-md">
          <span className="text-base mt-0.5">⚠️</span>
          <p className="leading-relaxed">
            <strong>Important:</strong> EMI calculations and loan information displayed on the website are indicative. Final interest rates, eligibility, approval, sanction, tenure, processing fees and loan terms are subject to the respective lender / financial institution.
          </p>
        </div>

      </div>

      {/* =========================================================================
          DETAILED LOAN MODAL (In-Depth Terms, Documents & In-Modal Simulator)
         ========================================================================= */}
      {detailModalProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 max-w-3xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  Detailed Loan Specification
                </span>
                <h3 className="text-2xl font-black text-white mt-2">{detailModalProduct.name}</h3>
                <p className="text-xs text-slate-400">{detailModalProduct.tagline}</p>
              </div>
              <button
                onClick={() => setDetailModalProduct(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Interest Rate</span>
                <span className="font-extrabold text-emerald-400 text-base">{detailModalProduct.interestRate}% p.a.</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Loan Limit</span>
                <span className="font-extrabold text-white text-xs">{formatCurrency(detailModalProduct.maxAmount)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Max Tenure</span>
                <span className="font-extrabold text-sky-400 text-xs">{detailModalProduct.maxTenure} Months</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Processing Fee</span>
                <span className="font-extrabold text-amber-400 text-xs">{detailModalProduct.processingFee}</span>
              </div>
            </div>

            {/* In-Modal Mini EMI Calculator */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-200">🧮 Indicative EMI Simulator for this Loan:</span>
                <span className="text-emerald-400 font-mono text-sm">{formatCurrency(modalEmiResult.emi)} / month</span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Borrowing Amount:</span>
                    <span className="text-white font-bold">{formatCurrency(modalAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min={detailModalProduct.minAmount || 50000}
                    max={detailModalProduct.maxAmount || 2000000}
                    step="25000"
                    value={modalAmount}
                    onChange={(e) => setModalAmount(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Tenure (Months):</span>
                    <span className="text-white font-bold">{modalTenure} Months</span>
                  </div>
                  <input
                    type="range"
                    min={detailModalProduct.minTenure || 12}
                    max={detailModalProduct.maxTenure || 60}
                    step="6"
                    value={modalTenure}
                    onChange={(e) => setModalTenure(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Categorized Required Documents Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                📑 Categorized Checklist of Required Documents:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {(detailModalProduct.documentsRequired || [
                  'Proof of Identity: PAN Card / Aadhaar Card',
                  'Proof of Address: Passport / Utility Bill',
                  'Income Proof: Last 3 months Salary Slips / ITR',
                  'Banking Track: Last 6 months operative bank statements'
                ]).map((doc, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✔</span>
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setDetailModalProduct(null)}
                className="w-1/3 py-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const prod = detailModalProduct;
                  setDetailModalProduct(null);
                  handleSelectLoanType(prod);
                }}
                className="w-2/3 py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🚀</span> Confirm Selection & Proceed to Enquiry
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
