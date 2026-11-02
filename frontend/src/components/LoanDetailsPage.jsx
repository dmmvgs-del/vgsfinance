import { useState, useEffect } from 'react';

export default function LoanDetailsPage({
  product,
  categories = [],
  onClose,
  onApplyNow,
  onEnquireNow
}) {
  if (!product) return null;

  const category = categories.find(c => c.id === product.categoryId) || {
    name: 'Retail Loan',
    icon: '💼'
  };

  // State for Embedded Live EMI Calculator
  const [calcAmount, setCalcAmount] = useState(
    Math.max(product.minAmount, Math.min(product.maxAmount, 500000))
  );
  const [calcRate, setCalcRate] = useState(product.interestRate || 10.5);
  const [calcTenureMonths, setCalcTenureMonths] = useState(
    Math.min(product.maxTenure || 36, Math.max(product.minTenure || 12, 36))
  );

  const [emiResults, setEmiResults] = useState({
    monthlyEmi: 0,
    totalInterest: 0,
    totalPayment: 0,
    principalPercent: 0,
    interestPercent: 0
  });

  // State for active Document Tab ('salaried' | 'business' | 'collateral' | 'kyc')
  const [activeDocTab, setActiveDocTab] = useState('salaried');

  // State for Quick Enquiry Modal inside Loan Details
  const [showQuickModal, setShowQuickModal] = useState(false);
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickCity, setQuickCity] = useState('');
  const [quickSubmitted, setQuickSubmitted] = useState(false);

  // Recalculate EMI whenever inputs change
  useEffect(() => {
    const p = parseFloat(calcAmount) || 0;
    const annualR = parseFloat(calcRate) || 0;
    const r = annualR / 12 / 100;
    const n = parseInt(calcTenureMonths, 10) || 12;

    if (p > 0 && r > 0 && n > 0) {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - p;
      const principalPct = Math.round((p / totalPayment) * 100);
      const interestPct = 100 - principalPct;

      setEmiResults({
        monthlyEmi: Math.round(emi),
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(totalPayment),
        principalPercent: principalPct,
        interestPercent: interestPct
      });
    }
  }, [calcAmount, calcRate, calcTenureMonths]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  // Generate 6 sample months amortization preview
  const generateAmortizationPreview = () => {
    const preview = [];
    let balance = calcAmount;
    const monthlyRate = calcRate / 12 / 100;
    const emi = emiResults.monthlyEmi;

    for (let month = 1; month <= Math.min(6, calcTenureMonths); month++) {
      const interestComp = Math.round(balance * monthlyRate);
      const principalComp = Math.max(0, emi - interestComp);
      const endingBalance = Math.max(0, balance - principalComp);

      preview.push({
        month,
        beginningBalance: balance,
        emi,
        principalComp,
        interestComp,
        endingBalance
      });
      balance = endingBalance;
    }
    return preview;
  };

  const amortizationData = generateAmortizationPreview();

  const handleApplyClick = () => {
    if (onApplyNow) {
      onApplyNow({
        product,
        requestedAmount: calcAmount,
        tenureMonths: calcTenureMonths,
        monthlyEmi: emiResults.monthlyEmi
      });
    }
    if (onClose) onClose();
  };

  const handleQuickEnquirySubmit = (e) => {
    e.preventDefault();
    if (!quickName || !quickPhone) return;
    
    // Fire to backend lead creation API
    fetch('http://localhost:5000/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: quickName,
        phone: quickPhone,
        city: quickCity || 'Visakhapatnam',
        productName: product.name,
        requestedAmount: calcAmount,
        tenureMonths: calcTenureMonths,
        notes: `Enquiry generated from Loan Details Page for ${product.name}`
      })
    }).catch(err => console.warn('Lead submission error:', err));

    setQuickSubmitted(true);
    setTimeout(() => {
      setQuickSubmitted(false);
      setShowQuickModal(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-xl animate-fade-in flex flex-col">
      
      {/* =========================================================================
          TOP STICKY HEADER & BREADCRUMB
         ========================================================================= */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
          >
            <span>←</span> Back to Loan Marketplace
          </button>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span>/</span>
            <span>{category.name}</span>
            <span>/</span>
            <span className="text-white font-bold truncate max-w-xs">{product.name}</span>
          </div>
        </div>

        {/* Quick Conversion CTA in Header */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowQuickModal(true)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 border border-sky-500/30 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
          >
            <span>📞</span> Enquire Now
          </button>
          <button
            onClick={handleApplyClick}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black shadow-lg shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-1"
          >
            <span>🚀</span> Apply Now
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer ml-1"
            title="Close Loan Details"
          >
            ✕
          </button>
        </div>
      </header>

      {/* =========================================================================
          MAIN LOAN DETAILS CONTENT WRAPPER (13 SECTIONS)
         ========================================================================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* =========================================================================
            SECTION 1: LOAN NAME & PRODUCT BANNER
           ========================================================================= */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider flex items-center gap-1">
                  <span>{category.icon || '📄'}</span> {category.name}
                </span>
                <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold">
                  Product ID: {product.id}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold">
                  Verified Lending Partner Network
                </span>
              </div>

              {/* 1. LOAN NAME */}
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Tagline / Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
                {product.tagline || 'Flexible financing designed to support your personal, professional, and commercial capital requirements.'}
              </p>
            </div>

            {/* Quick Hero Financial Metrics Badge */}
            <div className="bg-slate-950/80 border border-emerald-500/30 rounded-3xl p-6 text-center shrink-0 w-full lg:w-72 shadow-xl space-y-3">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Interest Rate from
                </span>
                <span className="text-4xl font-black text-emerald-400 block tracking-tight">
                  {product.interestRate}% <span className="text-sm font-normal text-slate-300">p.a.</span>
                </span>
                <span className="text-[10px] text-emerald-500/90 font-medium block mt-0.5">
                  Monthly Reducing Balance Formula
                </span>
              </div>
              
              <div className="pt-3 border-t border-slate-800 flex justify-around text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">Processing Fee</span>
                  <span className="text-white font-bold">{product.processingFee || '1.0% + GST'}</span>
                </div>
                <div className="border-r border-slate-800"></div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Sanction Turnaround</span>
                  <span className="text-sky-400 font-bold">24-48 Hours</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleApplyClick}
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 cursor-pointer transition-all"
                >
                  🚀 Instant Application
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2 & 3: LOAN DESCRIPTION & KEY BENEFITS
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 2. LOAN DESCRIPTION */}
          <section className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-emerald-500 rounded-full"></span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                2. Loan Description & Comprehensive Overview
              </h2>
            </div>
            
            <div className="text-sm text-slate-300 space-y-4 leading-relaxed font-normal">
              <p>
                The <strong className="text-white">{product.name}</strong> is structured by VGS Finance & Loans to cater to eligible borrowers seeking immediate, transparent capital. Backed by top-tier banking partners and premier Non-Banking Financial Companies (NBFCs), this loan product ensures transparent pricing with no hidden charges.
              </p>
              <p>
                Whether you need funds for emergency financial needs, debt consolidation, business working capital, capacity expansion, medical treatments, or asset acquisition, this facility offers swift processing with minimal documentation and customizable repayment tenures.
              </p>
              
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  🎯 Primary Borrowing Purposes:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400">✔</span> Working Capital
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400">✔</span> Asset Purchase
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400">✔</span> Debt Consolidation
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400">✔</span> Business Expansion
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400">✔</span> Emergency Medical
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400">✔</span> Home Renovation
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. KEY BENEFITS */}
          <section className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-sky-500 rounded-full"></span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                3. Key Benefits & Value Highlights
              </h2>
            </div>

            <div className="space-y-3">
              {(product.features && product.features.length > 0 ? product.features : [
                'Competitive interest rates starting at lowest market benchmarks',
                'Minimal documentation with 100% paperless verification',
                'Fast digital approval and disbursement within 24-48 business hours',
                'Flexible repayment tenure options from 12 to 360 months',
                'Pre-closure and part-prepayment options with transparent terms',
                'Doorstep service & dedicated relationship manager support'
              ]).map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 flex items-start gap-3 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm text-slate-200 font-medium">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* =========================================================================
            SECTION 4, 5, 6: LOAN AMOUNT, INTEREST RATE, AND TENURE INFORMATION
           ========================================================================= */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-amber-500 rounded-full"></span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Financial Specifications (Amount, Rates & Tenure)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 4. LOAN AMOUNT INFORMATION */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  4. Loan Amount Info
                </span>
                <span className="text-lg">💰</span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-black text-white block">
                  {formatCurrency(product.minAmount)} - {formatCurrency(product.maxAmount)}
                </span>
                <span className="text-xs text-slate-400 block">
                  Sanction quantum based on income profile & eligibility
                </span>
              </div>
              <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Minimum Quantum:</span>
                  <span className="font-bold text-white">{formatCurrency(product.minAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Maximum Limit:</span>
                  <span className="font-bold text-white">{formatCurrency(product.maxAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Indicative LTV:</span>
                  <span className="font-bold text-emerald-400">Up to 85% - 95%</span>
                </div>
              </div>
            </div>

            {/* 5. INTEREST RATE INFORMATION */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  5. Interest Rate Info
                </span>
                <span className="text-lg">📈</span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-black text-emerald-400 block">
                  {product.interestRate}% <span className="text-xs font-normal text-slate-300">p.a.</span>
                </span>
                <span className="text-xs text-slate-400 block">
                  Monthly Reducing Balance Calculation Method
                </span>
              </div>
              <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Rate Structure:</span>
                  <span className="font-bold text-white">Floating / Fixed (Repo-Linked)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Processing Fee:</span>
                  <span className="font-bold text-amber-400">{product.processingFee || '1.0% + GST'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Foreclosure Charges:</span>
                  <span className="font-bold text-slate-300">Nil for individual floating</span>
                </div>
              </div>
            </div>

            {/* 6. TENURE INFORMATION */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  6. Tenure Information
                </span>
                <span className="text-lg">⏳</span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-black text-sky-400 block">
                  {product.minTenure} - {product.maxTenure} Months
                </span>
                <span className="text-xs text-slate-400 block">
                  Flexible tenure window ({(product.minTenure / 12).toFixed(1)} to {(product.maxTenure / 12).toFixed(0)} Years)
                </span>
              </div>
              <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Repayment Mode:</span>
                  <span className="font-bold text-white">Monthly NACH / Auto-Debit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tenure Extension:</span>
                  <span className="font-bold text-white">Available on request</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Part-Prepayment:</span>
                  <span className="font-bold text-emerald-400">Allowed anytime</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 7 & 8: BASIC ELIGIBILITY & REQUIRED DOCUMENTS
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 7. BASIC ELIGIBILITY */}
          <section className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 bg-teal-500 rounded-full"></span>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  7. Basic Eligibility Criteria
                </h2>
              </div>
              <p className="text-xs text-slate-400">
                Lenders evaluate your credit capacity and repaying ability based on these parameters:
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Eligible Age Bracket</span>
                  <span className="font-bold text-white">
                    {product.eligibility?.minAge || 21} - {product.eligibility?.maxAge || 65} Years
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Minimum Monthly Net Income</span>
                  <span className="font-bold text-emerald-400">
                    {formatCurrency(product.eligibility?.minIncome || 25000)} / Month
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Employment Profiles</span>
                  <span className="font-bold text-slate-200 text-right max-w-[55%] truncate">
                    {product.eligibility?.employmentType || 'Salaried / Self-Employed'}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Minimum CIBIL Score</span>
                  <span className="font-extrabold text-sky-400">
                    {product.eligibility?.minCibilScore ? `${product.eligibility.minCibilScore}+` : '680+ (Good Track)'}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">FOIR Capacity (Fixed Obligation)</span>
                  <span className="font-bold text-amber-300">
                    Up to 50% of Monthly Net Income
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-[11px] text-slate-400">
              💡 <em>Pro Tip: Co-borrowers (spouse or parents) can be added to enhance your eligible loan amount.</em>
            </div>
          </section>

          {/* 8. REQUIRED DOCUMENTS */}
          <section className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-indigo-500 rounded-full"></span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                8. Required Documents Checklist
              </h2>
            </div>

            {/* Document Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
              {[
                { id: 'salaried', label: '💼 Salaried Applicants' },
                { id: 'business', label: '🏢 Self-Employed / Business' },
                { id: 'collateral', label: '🏠 Collateral / Property' },
                { id: 'kyc', label: '🪪 Standard KYC' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDocTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeDocTab === tab.id
                      ? 'bg-emerald-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Document Tab Content */}
            <div className="space-y-2.5 min-h-[220px]">
              {activeDocTab === 'salaried' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'PAN Card & Aadhaar Card (Identity & DOB Proof)',
                    'Latest 3 months salary slips with deductions',
                    'Latest 6 months salary account bank statements',
                    'Form 16 / Income Tax Returns for last 2 years',
                    'Employer ID card or appointment letter',
                    'Current residential address proof (Utility bill/Rent agreement)'
                  ].map((doc, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✔</span>
                      <span className="text-slate-300">{doc}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeDocTab === 'business' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Business entity PAN & promoter PAN/Aadhaar',
                    'Last 2 to 3 years audited ITR with computation & P&L',
                    'Last 12 months primary operative bank statements',
                    'GST registration certificate & last 12 months returns',
                    'Udyam Registration / Shop & Establishment Certificate',
                    'Memorandum of Association (MoA) / Partnership Deed'
                  ].map((doc, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✔</span>
                      <span className="text-slate-300">{doc}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeDocTab === 'collateral' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Registered Sale Deed / Title Deed of property',
                    'Prior chain deeds (13 to 30 years unbroken track)',
                    'Approved building sanction plan & NOC from municipality',
                    'Latest Property Tax receipts & Electricity bill',
                    'Vehicle proforma invoice (for auto/commercial vehicle)',
                    'Gold purity hallmarking slip (for Gold loans)'
                  ].map((doc, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✔</span>
                      <span className="text-slate-300">{doc}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeDocTab === 'kyc' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Permanent Account Number (PAN) Card',
                    'Aadhaar Card (Linked with active mobile number for e-KYC)',
                    'Passport / Voter ID / Valid Driving License',
                    'Recent passport-size color photographs',
                    'Cancelled cheque for NACH e-mandate registration',
                    'Signature verification from bank if signature mismatch'
                  ].map((doc, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">✔</span>
                      <span className="text-slate-300">{doc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Product-Specific Document Requirements */}
            {product.documentsRequired && product.documentsRequired.length > 0 && (
              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  📌 Specific Requirements for {product.name}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.documentsRequired.map((doc, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium">
                      • {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

        </div>

        {/* =========================================================================
            SECTION 9: LOAN PROCESS INFORMATION (5-STEP ROADMAP)
           ========================================================================= */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span>⚡</span> Fast-Track Loan Workflow
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              9. Loan Process Information & Journey Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              From online enquiry to direct account credit in 5 seamless, transparent steps:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                step: '01',
                title: 'Online Enquiry',
                badge: 'Instant',
                desc: 'Select loan product, enter required amount & submit contact details.',
                icon: '📝'
              },
              {
                step: '02',
                title: 'Document Pickup',
                badge: 'Same Day',
                desc: 'Relationship officer verifies documents via digital upload or doorstep.',
                icon: '📁'
              },
              {
                step: '03',
                title: 'Underwriting',
                badge: '4-8 Hours',
                desc: 'Lender evaluates CIBIL track, income capacity & FOIR guidelines.',
                icon: '🔍'
              },
              {
                step: '04',
                title: 'Sanction Letter',
                badge: 'Transparent',
                desc: 'Formal sanction issued with approved rate, tenure & fee schedule.',
                icon: '📜'
              },
              {
                step: '05',
                title: 'Direct Disbursal',
                badge: '24-48 Hours',
                desc: 'Sign loan agreement, register NACH e-mandate & funds credited to bank.',
                icon: '💳'
              }
            ].map((st, idx) => (
              <div
                key={idx}
                className="bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 space-y-3 relative group transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{st.icon}</span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                    Step {st.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {st.title}
                  </h3>
                  <span className="text-[10px] font-bold text-sky-400 block mt-0.5">
                    {st.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: INTERACTIVE EMI CALCULATOR WITH AMORTIZATION BREAKDOWN
           ========================================================================= */}
        <section id="details-emi-calc" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>🧮</span> Mathematical Reducing Engine
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                10. Interactive EMI Calculator for {product.name}
              </h2>
              <p className="text-xs text-slate-400">
                Simulate monthly installment, interest liability, and complete repayment summary:
              </p>
            </div>
            
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-medium">Estimated Monthly EMI</span>
              <span className="text-3xl font-black text-emerald-400 font-mono tracking-tight">
                {formatCurrency(emiResults.monthlyEmi)} <span className="text-xs font-normal text-slate-300">/ mo</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sliders Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Slider 1: Loan Amount */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-300">1. Required Loan Amount:</label>
                  <span className="font-black text-white font-mono text-sm bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                    {formatCurrency(calcAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min={product.minAmount || 50000}
                  max={product.maxAmount || 5000000}
                  step="25000"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Min: {formatCurrency(product.minAmount)}</span>
                  <span>Max: {formatCurrency(product.maxAmount)}</span>
                </div>
              </div>

              {/* Slider 2: Interest Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-300">2. Annual Interest Rate (% p.a.):</label>
                  <span className="font-black text-emerald-400 font-mono text-sm bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                    {calcRate}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min="6.5"
                  max="24.0"
                  step="0.1"
                  value={calcRate}
                  onChange={(e) => setCalcRate(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>6.5% p.a.</span>
                  <span>Product Rate: {product.interestRate}%</span>
                  <span>24.0% p.a.</span>
                </div>
              </div>

              {/* Slider 3: Loan Tenure */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-300">3. Repayment Tenure:</label>
                  <span className="font-black text-sky-400 font-mono text-sm bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                    {calcTenureMonths} Months ({(calcTenureMonths / 12).toFixed(1)} Years)
                  </span>
                </div>
                <input
                  type="range"
                  min={product.minTenure || 12}
                  max={product.maxTenure || 60}
                  step="6"
                  value={calcTenureMonths}
                  onChange={(e) => setCalcTenureMonths(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Min: {product.minTenure} Months</span>
                  <span>Max: {product.maxTenure} Months</span>
                </div>
              </div>

              {/* Visual Breakdown Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-emerald-400">Principal: {emiResults.principalPercent}%</span>
                  <span className="text-amber-400">Total Interest: {emiResults.interestPercent}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${emiResults.principalPercent}%` }}
                  ></div>
                  <div
                    className="bg-amber-500 h-full transition-all duration-300"
                    style={{ width: `${emiResults.interestPercent}%` }}
                  ></div>
                </div>
              </div>

            </div>

            {/* Repayment Summary Column */}
            <div className="lg:col-span-5 bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block border-b border-slate-800 pb-2">
                  Payment Summary Breakdown
                </span>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Monthly EMI:</span>
                    <span className="text-lg font-black text-emerald-400 font-mono">
                      {formatCurrency(emiResults.monthlyEmi)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-slate-800/60">
                    <span className="text-slate-400">Principal Borrowing:</span>
                    <span className="font-bold text-white font-mono">
                      {formatCurrency(calcAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-slate-800/60">
                    <span className="text-slate-400">Total Interest Payable:</span>
                    <span className="font-bold text-amber-400 font-mono">
                      {formatCurrency(emiResults.totalInterest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-slate-800/60">
                    <span className="text-slate-300 font-bold">Total Payment (Principal + Interest):</span>
                    <span className="text-base font-black text-white font-mono">
                      {formatCurrency(emiResults.totalPayment)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons in Calculator */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <button
                  onClick={handleApplyClick}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <span>🚀</span> Apply with this EMI ({formatCurrency(emiResults.monthlyEmi)}/mo)
                </button>
                <button
                  onClick={() => setShowQuickModal(true)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs cursor-pointer transition-colors"
                >
                  💬 Have Questions? Request Callback
                </button>
              </div>
            </div>

          </div>

          {/* Indicative Amortization Schedule Table Preview */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                📊 Indicative Initial Amortization Schedule Preview (First 6 Months)
              </span>
              <span className="text-slate-500 text-[11px]">Formula: Reducing Balance</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full text-xs text-left text-slate-300">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-3">Month</th>
                    <th className="px-4 py-3">Opening Balance</th>
                    <th className="px-4 py-3 text-emerald-400">Monthly EMI</th>
                    <th className="px-4 py-3">Principal</th>
                    <th className="px-4 py-3 text-amber-400">Interest</th>
                    <th className="px-4 py-3">Closing Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {amortizationData.map((row) => (
                    <tr key={row.month} className="hover:bg-slate-800/40">
                      <td className="px-4 py-2.5 font-sans font-bold text-white">Month {row.month}</td>
                      <td className="px-4 py-2.5">{formatCurrency(row.beginningBalance)}</td>
                      <td className="px-4 py-2.5 font-bold text-emerald-400">{formatCurrency(row.emi)}</td>
                      <td className="px-4 py-2.5 text-white">{formatCurrency(row.principalComp)}</td>
                      <td className="px-4 py-2.5 text-amber-400">{formatCurrency(row.interestComp)}</td>
                      <td className="px-4 py-2.5 text-slate-200">{formatCurrency(row.endingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11, 12, 13: APPLY NOW, ENQUIRE NOW, & CONTACT INFORMATION
           ========================================================================= */}
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              11 & 12. Apply or Enquire for {product.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Choose your preferred channel: complete application online or request an immediate call back from our loan officer.
            </p>
          </div>

          {/* Action Cards: Apply Now (11) and Enquire Now (12) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            
            {/* 11. APPLY NOW ACTION CARD */}
            <div className="bg-slate-950/80 border border-emerald-500/40 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  Recommended Choice
                </span>
                <h3 className="text-2xl font-black text-white">
                  11. Apply Now (Full Application)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Proceed with the calculated loan amount ({formatCurrency(calcAmount)}) and tenure ({calcTenureMonths} Months). Fills in all details automatically at the Application Desk for faster sanction.
                </p>
                <div className="space-y-1.5 text-xs text-slate-400 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✔</span> Instant Lead ID generation
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✔</span> Dedicated loan processing officer assigned
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">✔</span> Direct bank routing to highest approval lender
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleApplyClick}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/25 cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <span>🚀</span> Proceed to Full Application Desk
                </button>
              </div>
            </div>

            {/* 12. ENQUIRE NOW ACTION CARD */}
            <div className="bg-slate-950/80 border border-sky-500/40 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
                  Quick Callback
                </span>
                <h3 className="text-2xl font-black text-white">
                  12. Enquire Now (1-Click Callback)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Short on time or have questions before applying? Submit just your name and mobile number. Our loan specialist will call you within 15 minutes.
                </p>
                <div className="space-y-1.5 text-xs text-slate-400 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sky-400 font-bold">✔</span> 15-Minute Guaranteed Callback
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sky-400 font-bold">✔</span> Free personalized eligibility counseling
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sky-400 font-bold">✔</span> Doorstep document pickup coordination
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setShowQuickModal(true)}
                  className="w-full py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-sky-400 border border-sky-500/50 font-black text-sm uppercase tracking-wider cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <span>📞</span> Request Instant Callback
                </button>
              </div>
            </div>

          </div>

          {/* =========================================================================
              13. CONTACT INFORMATION & ADVISORY DESK
             ========================================================================= */}
          <div className="border-t border-slate-800 pt-8 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-emerald-500 rounded-full"></span>
              <h3 className="text-xl font-black text-white">
                13. Dedicated Loan Desk & Contact Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <span className="text-2xl block">📞</span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Toll-Free Loan Helpline
                </span>
                <a
                  href="tel:18004259988"
                  className="text-base font-black text-emerald-400 hover:text-emerald-300 font-mono block"
                >
                  1800-425-9988
                </a>
                <span className="text-[10px] text-slate-500 block">Mon - Sat: 9:00 AM - 7:00 PM</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <span className="text-2xl block">💬</span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  WhatsApp Advisory Desk
                </span>
                <a
                  href="https://wa.me/917675852618?text=Hello%20VGS%20Finance,%20I%20am%20interested%20in%20learning%20more%20about%20the%20loan%20options."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-black text-teal-400 hover:text-teal-300 font-mono block"
                >
                  +91 7675852618
                </a>
                <span className="text-[10px] text-slate-500 block">Instant Chat & Status Inquiries</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <span className="text-2xl block">✉️</span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Email Support Desk
                </span>
                <a
                  href="mailto:reachus@ascendmedialabs.com"
                  className="text-xs font-bold text-sky-400 hover:text-sky-300 block truncate"
                >
                  reachus@ascendmedialabs.com
                </a>
                <span className="text-[10px] text-slate-500 block">loans@vgsfinance.com</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <span className="text-2xl block">🏢</span>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Regional Operations Hub
                </span>
                <span className="text-xs font-bold text-white block">
                  Ascend Media Labs Hub
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Visakhapatnam, Andhra Pradesh, India
                </span>
              </div>

            </div>

            {/* Statutory Disclaimer */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-3">
              <span className="text-base shrink-0">⚠️</span>
              <p className="leading-relaxed text-[11px]">
                <strong>Important Compliance Disclosure:</strong> EMI calculations and loan information displayed on the website are indicative. Final interest rates, eligibility, approval, sanction, tenure, processing fees and loan terms are subject to the respective lender / financial institution.
              </p>
            </div>
          </div>

        </section>

      </main>

      {/* =========================================================================
          QUICK ENQUIRY MODAL (Triggered by 'Enquire Now')
         ========================================================================= */}
      {showQuickModal && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 max-w-md w-full rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 relative animate-scale-up">
            
            <div className="flex justify-between items-start">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[10px] font-bold uppercase tracking-wider">
                  Quick Callback Request
                </span>
                <h3 className="text-lg font-black text-white mt-1">Enquire for {product.name}</h3>
                <p className="text-xs text-slate-400">Our loan manager will call you within 15 minutes.</p>
              </div>
              <button
                onClick={() => setShowQuickModal(false)}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            {quickSubmitted ? (
              <div className="p-6 text-center space-y-2 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                <span className="text-3xl">✅</span>
                <h4 className="text-sm font-bold text-emerald-400">Enquiry Submitted Successfully!</h4>
                <p className="text-xs text-slate-300">A loan officer has been assigned and will call you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleQuickEnquirySubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Varma"
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Mobile Number (with WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Visakhapatnam, Vijayawada"
                    value={quickCity}
                    onChange={(e) => setQuickCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Selected Loan:</span>
                    <span className="text-white font-bold">{product.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Calculated EMI:</span>
                    <span className="text-emerald-400 font-bold">{formatCurrency(emiResults.monthlyEmi)}/mo</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 cursor-pointer transition-all"
                >
                  🚀 Submit Quick Callback Request
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

