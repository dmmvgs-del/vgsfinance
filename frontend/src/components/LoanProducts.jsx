import { useState, useEffect, useRef } from 'react';

export default function LoanProducts({ products, categories, onSelectProduct, initialCategoryId, searchFilter, onViewDetails }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');

  // Basic & Advanced Filtering States
  const [maxRateFilter, setMaxRateFilter] = useState('ALL');
  const [maxTenureFilter, setMaxTenureFilter] = useState('ALL');
  const [budgetFilter, setBudgetFilter] = useState('ALL');
  const [employmentFilter, setEmploymentFilter] = useState('ALL');
  const [selectedLoanType, setSelectedLoanType] = useState(null);

  // Comparison State
  const [compareList, setCompareList] = useState([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  // Ref for auto-scrolling to results when category is clicked
  const resultsRef = useRef(null);

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

    // 2. Comprehensive Keyword & Alias Search
    const query = searchQuery.toLowerCase().trim();
    const featuresStr = Array.isArray(p.features) ? p.features.join(' ').toLowerCase() : '';
    const docsStr = Array.isArray(p.documentsRequired) ? p.documentsRequired.join(' ').toLowerCase() : '';
    const descStr = (p.description || '').toLowerCase();
    const catName = categories.find(c => c.id === p.categoryId)?.name?.toLowerCase() || '';

    // Smart aliases
    const isCarAlias = ['kia', 'car', 'auto', 'vehicle', 'maruti', 'hyundai', 'tata', 'mahindra', 'honda', 'toyota'].some(w => query.includes(w));
    const isHomeAlias = ['home', 'house', 'flat', 'villa', 'plot', 'apartment', 'property', 'housing'].some(w => query.includes(w));
    const isGoldAlias = ['gold', 'jewel', 'ornament', 'sovereign'].some(w => query.includes(w));
    const isDoctorAlias = ['doctor', 'clinic', 'hospital', 'dentist', 'surgeon', 'medical', 'emergency', 'health insurance', 'health'].some(w => query.includes(w));
    const isBusinessAlias = ['business', 'trade', 'gst', 'msme', 'working capital', 'firm', 'shop', 'retail'].some(w => query.includes(w));
    const isEduAlias = ['education', 'college', 'university', 'study', 'abroad', 'degree', 'student'].some(w => query.includes(w));
    const isCvAlias = ['truck', 'lorry', 'commercial vehicle', 'bus', 'tipper', 'fleet'].some(w => query.includes(w));

    let matchAlias = false;
    if (isCarAlias && (p.categoryId === 'cat-car' || p.categoryId === 'cat-commercial-vehicle')) matchAlias = true;
    if (isHomeAlias && (p.categoryId === 'cat-home' || p.categoryId === 'cat-mortgage' || p.categoryId === 'cat-lap')) matchAlias = true;
    if (isGoldAlias && p.categoryId === 'cat-gold') matchAlias = true;
    if (isDoctorAlias && (p.categoryId === 'cat-doctor' || p.categoryId === 'cat-professional')) matchAlias = true;
    if (isBusinessAlias && (p.categoryId === 'cat-business' || p.categoryId === 'cat-working-capital')) matchAlias = true;
    if (isEduAlias && p.categoryId === 'cat-education') matchAlias = true;
    if (isCvAlias && (p.categoryId === 'cat-commercial-vehicle' || p.categoryId === 'cat-construction-equipment')) matchAlias = true;

    const matchSearch = query === '' ||
      p.name.toLowerCase().includes(query) ||
      (p.tagline && p.tagline.toLowerCase().includes(query)) ||
      descStr.includes(query) ||
      featuresStr.includes(query) ||
      docsStr.includes(query) ||
      catName.includes(query) ||
      (p.processingFee && p.processingFee.toLowerCase().includes(query)) ||
      (p.eligibility?.employmentType && p.eligibility.employmentType.toLowerCase().includes(query)) ||
      matchAlias;

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

    // 5. Budget Filter
    let matchBudget = true;
    if (budgetFilter === 'UNDER_5L') matchBudget = p.minAmount <= 500000;
    else if (budgetFilter === '5L_TO_25L') matchBudget = p.maxAmount >= 500000 && p.minAmount <= 2500000;
    else if (budgetFilter === '25L_PLUS') matchBudget = p.maxAmount >= 2500000;

    // 6. Employment Type Filter
    let matchEmployment = true;
    if (employmentFilter === 'SALARIED') {
      const emp = (p.eligibility?.employmentType || '').toLowerCase();
      matchEmployment = emp.includes('salaried') || emp.includes('all') || emp === '';
    } else if (employmentFilter === 'SELF_EMPLOYED') {
      const emp = (p.eligibility?.employmentType || '').toLowerCase();
      matchEmployment = emp.includes('self') || emp.includes('business') || emp.includes('all') || emp === '';
    }

    return matchCat && matchSearch && matchRate && matchTenure && matchBudget && matchEmployment;
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

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const toggleCompare = (prod, e) => {
    e.stopPropagation();
    if (compareList.find(p => p.id === prod.id)) {
      setCompareList(compareList.filter(p => p.id !== prod.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare up to 3 loan products simultaneously.');
        return;
      }
      setCompareList([...compareList, prod]);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxRateFilter('ALL');
    setMaxTenureFilter('ALL');
    setBudgetFilter('ALL');
    setEmploymentFilter('ALL');
    setSortBy('recommended');
  };

  return (
    <section id="products" className="py-20 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-10">

        {/* Section Header */}
        <div className="text-left max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-xs font-black tracking-wide uppercase">
            <span>🛒</span> <span>Centralized Loan Supermarket</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#041E2B] tracking-tight">
            Loan Category Listing & Product Marketplace
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Browse loan categories, filter interest rates, compare limits, select your loan type, and enquire with 1-click submission.
          </p>
        </div>

        {/* =========================================================================
            1. LOAN CATEGORY LISTING (All Categories - Full Width & Clean Multi-line Names)
           ========================================================================= */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold text-slate-700 uppercase tracking-wider gap-2">
            <span className="flex items-center gap-2">
              <span>📋</span> 1. Loan Category Listing
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#E8F5D4] text-[#466E18] border border-[#6EA928]/35 font-bold">
                {categories.length} Categories
              </span>
            </span>
            <span className="text-slate-500 text-[11px] font-normal lowercase">
              Click any category card to instantly filter & scroll to products
            </span>
          </div>

          {/* Category Carousel / Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-3">
            <button
              onClick={() => handleCategoryClick('all')}
              className={`p-3 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between gap-1.5 group relative hover:-translate-y-0.5 ${
                selectedCategory === 'all'
                  ? 'bg-[#F4F9EC] border-[#6EA928] text-[#0A5C80] shadow-md shadow-[#6EA928]/20 ring-2 ring-[#6EA928]'
                  : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-[#6EA928] hover:shadow-md'
              }`}
            >
              {selectedCategory === 'all' && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#6EA928] text-white rounded-full text-[10px] flex items-center justify-center font-bold shadow-sm">
                  ✓
                </span>
              )}
              <span className="text-2xl transform group-hover:scale-110 transition-transform">🌟</span>
              <span className="text-xs font-bold leading-snug line-clamp-2 text-center h-8 flex items-center justify-center">
                All Loans
              </span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                selectedCategory === 'all'
                  ? 'bg-[#E8F5D4] text-[#466E18] border-[#6EA928]/40'
                  : 'bg-slate-50 text-slate-500 border-slate-200'
              }`}>
                {products.length} Products
              </span>
            </button>

            {categories.map((cat) => {
              const count = products.filter(p => p.categoryId === cat.id).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`p-3 rounded-2xl border text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-between gap-1.5 group relative hover:-translate-y-0.5 ${
                    isSelected
                      ? 'bg-[#F4F9EC] border-[#6EA928] text-[#0A5C80] shadow-md shadow-[#6EA928]/20 ring-2 ring-[#6EA928]'
                      : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-[#6EA928] hover:shadow-md'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#6EA928] text-white rounded-full text-[10px] flex items-center justify-center font-bold shadow-sm">
                      ✓
                    </span>
                  )}
                  <span className="text-2xl transform group-hover:scale-110 transition-transform">{cat.icon || '📄'}</span>
                  <span className="text-xs font-bold leading-snug line-clamp-2 text-center h-8 flex items-center justify-center">
                    {cat.name}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    isSelected
                      ? 'bg-[#E8F5D4] text-[#466E18] border-[#6EA928]/40'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}>
                    {count > 0 ? `${count} Available` : 'Available'}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedCategoryObj && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-white to-[#F4F9EC] border border-[#6EA928]/40 text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5D4] border border-[#6EA928]/30 flex items-center justify-center text-2xl shrink-0">
                  {selectedCategoryObj.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm sm:text-base">{selectedCategoryObj.name}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E8F5D4] text-[#466E18] text-[10px] font-bold border border-[#6EA928]/30">
                      {filtered.length} Loan Available
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5 max-w-4xl leading-relaxed">{selectedCategoryObj.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  onClick={() => handleCategoryClick('all')}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-xs text-slate-700 font-bold shrink-0 cursor-pointer shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>✕</span> <span>Reset Category Filter</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* =========================================================================
            2. SEARCH & ADVANCED FILTERING CONTROLS
           ========================================================================= */}
        <div ref={resultsRef} className="bg-white border border-slate-200/90 p-5 rounded-3xl shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

            {/* Search Input */}
            <div className="w-full lg:w-1/4 relative">
              <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                placeholder="Search by loan name, purpose, bank..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6EA928] focus:bg-white transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Basic & Advanced Filtering Controls */}
            <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-3/4 justify-start lg:justify-end text-xs">

              {/* Filter: Interest Rate */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600 font-medium text-[11px]">Rate:</span>
                <select
                  value={maxRateFilter}
                  onChange={(e) => setMaxRateFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-slate-800 font-medium focus:outline-none focus:border-[#6EA928] cursor-pointer text-xs"
                >
                  <option value="ALL">All Rates</option>
                  <option value="UNDER_9">≤ 9.0% p.a. (Prime Lowest)</option>
                  <option value="UNDER_10_5">≤ 10.5% p.a.</option>
                  <option value="UNDER_11_5">≤ 11.5% p.a.</option>
                </select>
              </div>

              {/* Filter: Tenure Range */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600 font-medium text-[11px]">Tenure:</span>
                <select
                  value={maxTenureFilter}
                  onChange={(e) => setMaxTenureFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-slate-800 font-medium focus:outline-none focus:border-[#6EA928] cursor-pointer text-xs"
                >
                  <option value="ALL">Any Tenure</option>
                  <option value="SHORT">Short (Up to 3 Yrs)</option>
                  <option value="MEDIUM">Medium (3 to 7 Yrs)</option>
                  <option value="LONG">Long (7+ Yrs)</option>
                </select>
              </div>

              {/* Filter: Budget / Required Amount */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600 font-medium text-[11px]">Budget:</span>
                <select
                  value={budgetFilter}
                  onChange={(e) => setBudgetFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-slate-800 font-medium focus:outline-none focus:border-[#6EA928] cursor-pointer text-xs"
                >
                  <option value="ALL">All Amounts</option>
                  <option value="UNDER_5L">Up to ₹5 Lakhs</option>
                  <option value="5L_TO_25L">₹5L to ₹25 Lakhs</option>
                  <option value="25L_PLUS">₹25 Lakhs & Above</option>
                </select>
              </div>

              {/* Filter: Borrower Employment */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600 font-medium text-[11px]">Borrower:</span>
                <select
                  value={employmentFilter}
                  onChange={(e) => setEmploymentFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-slate-800 font-medium focus:outline-none focus:border-[#6EA928] cursor-pointer text-xs"
                >
                  <option value="ALL">All Borrowers</option>
                  <option value="SALARIED">Salaried Employee</option>
                  <option value="SELF_EMPLOYED">Business / Self-Employed</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-600 font-medium text-[11px]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-slate-800 font-medium focus:outline-none focus:border-[#6EA928] cursor-pointer text-xs"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rate-low">Lowest Interest Rate</option>
                  <option value="amount-high">Highest Loan Limit</option>
                  <option value="tenure-high">Longest Tenure</option>
                </select>
              </div>

              {(searchQuery || selectedCategory !== 'all' || maxRateFilter !== 'ALL' || maxTenureFilter !== 'ALL' || budgetFilter !== 'ALL' || employmentFilter !== 'ALL') && (
                <button
                  onClick={handleClearFilters}
                  className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-300 font-bold text-xs cursor-pointer flex items-center gap-1"
                >
                  Clear Filters ✕
                </button>
              )}

            </div>

          </div>


          <div className="text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-100 pt-3 gap-2">
            <span>
              Showing <strong className="text-[#0A5C80] font-bold">{filtered.length}</strong> loan products
              {searchQuery && (
                <> matching <strong className="text-[#6EA928] bg-[#E8F5D4] px-2 py-0.5 rounded-full border border-[#6EA928]/30">"{searchQuery}"</strong></>
              )}
            </span>
            <span className="text-slate-400 hidden sm:inline">
              Instant indicative loan terms • Subject to lender verification
            </span>
          </div>
        </div>

        {/* =========================================================================
            3. LOAN PRODUCT CARDS & LOAN TYPE SELECTION
           ========================================================================= */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl space-y-3 shadow-sm">
            <span className="text-3xl">🔍</span>
            <h3 className="text-lg font-bold text-slate-800">No loan products match your current filters</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your search keyword, resetting the interest rate filter, or browsing all categories.
            </p>
            <button
              onClick={handleClearFilters}
              className="mt-2 px-4 py-2 rounded-xl bg-[#6EA928] hover:bg-[#5A8B1F] text-white font-bold text-xs cursor-pointer"
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
                  className={`bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-[#6EA928]/10 group relative border cursor-pointer ${isSelected
                      ? 'border-[#6EA928] shadow-lg shadow-[#6EA928]/20 ring-2 ring-[#6EA928]'
                      : 'border-slate-200/90 hover:border-[#6EA928]'
                    }`}
                >
                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#6EA928] text-white font-black text-[10px] uppercase tracking-wider shadow-md flex items-center gap-1">
                      <span>✓</span> Selected Loan Type
                    </div>
                  )}

                  <div className="space-y-4">

                    {/* Header: Name and Interest Rate */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6EA928] block mb-0.5">
                          {categories.find(c => c.id === prod.categoryId)?.name || 'Loan'}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0A5C80] transition-colors">
                          {prod.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-1 leading-relaxed">
                          {prod.tagline}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="px-2.5 py-1 rounded-full bg-[#E8F5D4] border border-[#6EA928]/40 text-[#466E18] text-xs font-black block">
                          {prod.interestRate}% p.a.
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">Reducing Rate</span>
                      </div>
                    </div>

                    {/* Amount Limits & Tenure Grid */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
                      <div>
                        <span className="text-slate-500 block text-[11px] font-medium">Loan Limit:</span>
                        <span className="font-black text-slate-900 mt-0.5 block text-xs font-mono">
                          {formatCurrency(prod.minAmount)} - {formatCurrency(prod.maxAmount)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[11px] font-medium">Tenure Window:</span>
                        <span className="font-black text-[#0A5C80] mt-0.5 block text-xs">
                          {prod.minTenure}m to {prod.maxTenure}m ({(prod.maxTenure / 12).toFixed(0)} Yrs)
                        </span>
                      </div>
                    </div>

                    {/* Eligibility & Features */}
                    <div className="space-y-2 pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] border border-slate-200">
                          Age: {prod.eligibility?.minAge || 21}-{prod.eligibility?.maxAge || 60} Yrs
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#E8F5D4] text-[#466E18] text-[10px] border border-[#6EA928]/30 font-bold">
                          Min Income: {formatCurrency(prod.eligibility?.minIncome || 25000)}/m
                        </span>
                        <span className="px-2 py-0.5 rounded bg-sky-50 text-[#0A5C80] text-[10px] border border-sky-200 font-bold">
                          CIBIL: {prod.eligibility?.minCibilScore || '680+'}
                        </span>
                      </div>

                      {prod.features?.slice(0, 2).map((feat, i) => (
                        <div key={i} className="text-xs text-slate-600 flex items-center gap-2">
                          <span className="text-[#6EA928] font-bold">✓</span>
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Processing Fee */}
                    <div className="text-xs text-slate-500 pt-2 flex justify-between border-t border-slate-100">
                      <span>Processing Fee:</span>
                      <span className="text-slate-800 font-semibold">{prod.processingFee}</span>
                    </div>

                  </div>

                  {/* =========================================================================
                      4. LOAN ACTION BUTTONS (Details, Apply, Compare & WhatsApp)
                     ========================================================================= */}
                  <div className="pt-5 space-y-2.5 border-t border-slate-100 mt-4">
                    <div className="grid grid-cols-2 gap-2">
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
                        className="py-2.5 px-3 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-[#0A5C80] border border-slate-300 transition-all cursor-pointer text-center flex items-center justify-center gap-1"
                      >
                        <span>🔍</span> <span>Details & EMI</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectLoanType(prod);
                        }}
                        className="py-2.5 px-3 rounded-xl font-bold text-xs bg-[#6EA928] hover:bg-[#5A8B1F] text-white shadow-md shadow-[#6EA928]/25 transition-all cursor-pointer text-center flex items-center justify-center gap-1"
                      >
                        <span>🚀</span> <span>Apply Now</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={(e) => toggleCompare(prod, e)}
                        className={`py-2 px-3 rounded-xl text-[11px] font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          compareList.find(p => p.id === prod.id)
                            ? 'bg-[#0A5C80] text-white border-[#0A5C80] shadow-sm'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                        }`}
                      >
                        <span>⚖️</span>
                        <span>{compareList.find(p => p.id === prod.id) ? 'Selected (Compare)' : 'Add to Compare'}</span>
                      </button>
                      
                      <a
                        href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi VGS Finance, I am interested in applying for ${prod.name} (${prod.interestRate}% p.a.). Please provide more details.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="py-2 px-3 rounded-xl text-[11px] font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>💬</span> <span>WhatsApp Desk</span>
                      </a>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* =========================================================================
          DETAILED LOAN MODAL (In-Depth Terms, Documents & In-Modal Simulator)
         ========================================================================= */}
      {detailModalProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 max-w-3xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#466E18] text-xs font-bold uppercase tracking-wider">
                  Detailed Loan Specification
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">{detailModalProduct.name}</h3>
                <p className="text-xs text-slate-500">{detailModalProduct.tagline}</p>
              </div>
              <button
                onClick={() => setDetailModalProduct(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block text-[11px]">Interest Rate</span>
                <span className="font-extrabold text-[#6EA928] text-base">{detailModalProduct.interestRate}% p.a.</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Loan Limit</span>
                <span className="font-extrabold text-slate-900 text-xs">{formatCurrency(detailModalProduct.maxAmount)}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Max Tenure</span>
                <span className="font-extrabold text-[#0A5C80] text-xs">{detailModalProduct.maxTenure} Months</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Processing Fee</span>
                <span className="font-extrabold text-amber-700 text-xs">{detailModalProduct.processingFee}</span>
              </div>
            </div>

            {/* In-Modal Mini EMI Calculator */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-800">🧮 Indicative EMI Simulator for this Loan:</span>
                <span className="text-[#466E18] bg-[#E8F5D4] px-3 py-1 rounded-lg font-mono text-sm border border-[#6EA928]/30">{formatCurrency(modalEmiResult.emi)} / month</span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>Borrowing Amount:</span>
                    <span className="text-slate-900 font-bold">{formatCurrency(modalAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min={detailModalProduct.minAmount || 50000}
                    max={detailModalProduct.maxAmount || 2000000}
                    step="25000"
                    value={modalAmount}
                    onChange={(e) => setModalAmount(Number(e.target.value))}
                    className="w-full accent-[#6EA928] cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 mb-1">
                    <span>Tenure (Months):</span>
                    <span className="text-slate-900 font-bold">{modalTenure} Months</span>
                  </div>
                  <input
                    type="range"
                    min={detailModalProduct.minTenure || 12}
                    max={detailModalProduct.maxTenure || 60}
                    step="6"
                    value={modalTenure}
                    onChange={(e) => setModalTenure(Number(e.target.value))}
                    className="w-full accent-[#0A5C80] cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Categorized Required Documents Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                📑 Categorized Checklist of Required Documents:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {(detailModalProduct.documentsRequired || [
                  'Proof of Identity: PAN Card / Aadhaar Card',
                  'Proof of Address: Passport / Utility Bill',
                  'Income Proof: Last 3 months Salary Slips / ITR',
                  'Banking Track: Last 6 months operative bank statements'
                ]).map((doc, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                    <span className="text-[#6EA928] font-bold">✔</span>
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setDetailModalProduct(null)}
                className="w-1/3 py-3 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
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
                className="w-2/3 py-3 rounded-xl font-bold text-xs bg-[#6EA928] hover:bg-[#5A8B1F] text-white shadow-lg shadow-[#6EA928]/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🚀</span> Confirm Selection & Proceed to Enquiry
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          FLOATING COMPARISON TRIGGER BAR
         ========================================================================= */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#041E2B] text-white px-5 sm:px-7 py-3.5 rounded-full shadow-2xl border border-[#6EA928]/50 flex items-center gap-4 sm:gap-6 animate-pulse-subtle">
          <div className="flex items-center gap-2.5 text-xs font-bold">
            <span className="w-6 h-6 rounded-full bg-[#6EA928] text-white flex items-center justify-center text-xs font-black shadow-sm">
              {compareList.length}
            </span>
            <span className="hidden sm:inline">Loans in Compare Queue</span>
            <span className="sm:hidden">Comparing</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCompareModalOpen(true)}
              className="px-4 py-2 rounded-full bg-[#6EA928] hover:bg-[#5A8B1F] text-white text-xs font-bold shadow-md cursor-pointer transition-all flex items-center gap-1.5"
            >
              <span>⚖️</span> <span>Compare Side-by-Side</span>
            </button>
            <button
              type="button"
              onClick={() => setCompareList([])}
              className="px-2.5 py-1 text-slate-400 hover:text-white text-xs font-bold cursor-pointer transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          LOAN COMPARISON MODAL (Side-by-Side Specifications)
         ========================================================================= */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 max-w-5xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-200 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#466E18] text-xs font-bold uppercase tracking-wider">
                  Live Loan Comparison Matrix
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">Comparing {compareList.length} Loan Products</h3>
              </div>
              <button
                type="button"
                onClick={() => setCompareModalOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Comparison Grid Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="p-3.5 font-bold text-slate-600 w-1/4">Feature / Parameter</th>
                    {compareList.map((prod) => (
                      <th key={prod.id} className="p-3.5 bg-white font-extrabold text-[#041E2B] text-sm w-1/4 border-l border-slate-200">
                        <div className="text-[10px] font-bold text-[#6EA928] uppercase tracking-wider">
                          {categories.find(c => c.id === prod.categoryId)?.name || 'Loan'}
                        </div>
                        {prod.name}
                        <span className="block text-[11px] font-normal text-slate-500 mt-0.5 line-clamp-1">{prod.tagline}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-600 bg-slate-50">Annual Interest Rate</td>
                    {compareList.map((prod) => (
                      <td key={prod.id} className="p-3.5 font-extrabold text-[#6EA928] text-sm border-l border-slate-200">
                        {prod.interestRate}% p.a. <span className="text-[10px] text-slate-400 font-normal">(Reducing)</span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-600 bg-slate-50">Loan Borrowing Limit</td>
                    {compareList.map((prod) => (
                      <td key={prod.id} className="p-3.5 font-mono font-bold text-slate-900 border-l border-slate-200">
                        {formatCurrency(prod.minAmount)} - {formatCurrency(prod.maxAmount)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-600 bg-slate-50">Tenure Window</td>
                    {compareList.map((prod) => (
                      <td key={prod.id} className="p-3.5 font-bold text-[#0A5C80] border-l border-slate-200">
                        {prod.minTenure}m to {prod.maxTenure}m ({(prod.maxTenure / 12).toFixed(0)} Yrs)
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-600 bg-slate-50">Processing Fee</td>
                    {compareList.map((prod) => (
                      <td key={prod.id} className="p-3.5 text-slate-700 border-l border-slate-200">
                        {prod.processingFee}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-600 bg-slate-50">Min Net Income Required</td>
                    {compareList.map((prod) => (
                      <td key={prod.id} className="p-3.5 font-semibold text-slate-800 border-l border-slate-200">
                        {formatCurrency(prod.eligibility?.minIncome || 25000)}/month
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-600 bg-slate-50">Minimum CIBIL Score</td>
                    {compareList.map((prod) => (
                      <td key={prod.id} className="p-3.5 font-bold text-sky-700 border-l border-slate-200">
                        {prod.eligibility?.minCibilScore || '680+'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-600 bg-slate-50">Sample EMI (₹5L for 3 Yrs)</td>
                    {compareList.map((prod) => {
                      const r = (parseFloat(prod.interestRate) || 12) / 12 / 100;
                      const emi = (500000 * r * Math.pow(1 + r, 36)) / (Math.pow(1 + r, 36) - 1);
                      return (
                        <td key={prod.id} className="p-3.5 font-black text-[#466E18] text-sm bg-emerald-50/50 border-l border-slate-200">
                          {formatCurrency(Math.round(emi))} / month
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-slate-600 bg-slate-50">Enquire & Apply</td>
                    {compareList.map((prod) => (
                      <td key={prod.id} className="p-3.5 border-l border-slate-200 space-y-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setCompareModalOpen(false);
                            handleSelectLoanType(prod);
                          }}
                          className="w-full py-2 px-3 rounded-xl bg-[#6EA928] hover:bg-[#5A8B1F] text-white font-bold text-xs shadow-md transition-all cursor-pointer text-center"
                        >
                          🚀 Select & Apply
                        </button>
                        <a
                          href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hi VGS Finance, I am comparing loans and interested in ${prod.name}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-1.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold flex items-center justify-center gap-1"
                        >
                          <span>💬 WhatsApp</span>
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setCompareList([])}
                className="text-xs text-rose-600 hover:text-rose-700 font-bold cursor-pointer"
              >
                Clear Comparison Selection
              </button>
              <button
                type="button"
                onClick={() => setCompareModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
