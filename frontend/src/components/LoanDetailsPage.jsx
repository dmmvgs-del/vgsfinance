import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import logoImg from '../assets/Logo.jpeg';
import { API_BASE_URL } from '../config/api';

// Default Healthcare & Medical Loan Options (Emergency, Health Insurance, Doctor Clinic, Equipment)
const defaultHealthcareSubOptions = [
  {
    id: 'opt-emergency',
    title: 'Emergency Medical Treatment Loan',
    icon: '🚑',
    tag: 'FAST 2-HR CLEARANCE',
    description: 'Immediate funds for urgent hospital admissions, surgeries, critical care, and medical procedures with direct hospital disbursal.',
    rate: 'From 9.50% p.a.',
    limit: 'Up to ₹ 15 Lakhs',
    tenure: '12 - 48 Months',
    defaultAmount: 300000,
    benefits: ['Direct Hospital NEFT Disbursal', 'Minimal Paperwork in 2 Hours', 'Zero Prepayment Penalty']
  },
  {
    id: 'opt-insurance',
    title: 'Health Insurance & Hospitalization Loan',
    icon: '🛡️',
    tag: 'COVERS DEDUCTIBLES',
    description: 'Financing for insurance co-pays, hospital room rent upgrades, non-covered therapies, post-discharge medicines, and deductibles.',
    rate: 'From 9.00% p.a.',
    limit: 'Up to ₹ 10 Lakhs',
    tenure: '12 - 36 Months',
    defaultAmount: 200000,
    benefits: ['No Collateral Required', 'Cashless Hospital Assistance', 'Low Pocket-Friendly EMIs']
  },
  {
    id: 'opt-doctor',
    title: 'Doctor & Clinic Practice Loan',
    icon: '🩺',
    tag: 'FOR DOCTORS & DENTISTS',
    description: 'High-ticket unsecured capital for MBBS, MD, MS, BDS practitioners to establish, expand, or renovate private clinics.',
    rate: 'From 9.99% p.a.',
    limit: 'Up to ₹ 75 Lakhs',
    tenure: '12 - 84 Months',
    defaultAmount: 1500000,
    benefits: ['Exclusive Practitioner Rates', 'Doorstep Document Pickup', 'Fast-Track Sanctions']
  },
  {
    id: 'opt-equipment',
    title: 'Medical Equipment & Diagnostic Loan',
    icon: '🔬',
    tag: 'MACHINERY & LAB ASSETS',
    description: 'Asset financing for ultrasound units, digital X-Ray machines, dental chairs, pathology lab tools, and ICU monitors.',
    rate: 'From 10.25% p.a.',
    limit: 'Up to ₹ 2 Crores',
    tenure: '24 - 84 Months',
    defaultAmount: 2500000,
    benefits: ['Up to 85% Machine Invoice Value', 'Flexible Balloon EMIs', 'OEM Dealer Partnerships']
  }
];

export default function LoanDetailsPage({
  product = {},
  categories = [],
  onClose,
  onApplyNow,
  onEnquireNow,
  onSwitchToHome,
  onSwitchToServices,
  onSwitchToAdmin
}) {
  // Normalize fields so nothing can ever be blank or missing!
  const rawProduct = product || {};
  const prodName = rawProduct.name || rawProduct.title || 'Doctor & Medical Loan Solutions';
  const prodTagline = rawProduct.tagline || rawProduct.description || 'Specialized financing for doctors, emergency medical treatments, health insurance bills, and clinic setups.';
  const prodRate = typeof rawProduct.interestRate === 'number' ? rawProduct.interestRate : 9.50;
  const prodMinAmount = Number(rawProduct.minAmount) || 50000;
  const prodMaxAmount = Number(rawProduct.maxAmount) || 20000000;
  const prodMinTenure = Number(rawProduct.minTenure) || 12;
  const prodMaxTenure = Number(rawProduct.maxTenure) || 84;
  const prodProcessingFee = rawProduct.processingFee || '0.75% + GST';
  const prodTurnaround = rawProduct.turnaroundTime || '2 - 24 Hours';
  const prodId = rawProduct.id || 'VGS-DOC-MED-01';

  // Category determination
  const isDoctorOrMedical = prodName.toLowerCase().includes('doctor') || prodName.toLowerCase().includes('medical') || rawProduct.categoryId === 'cat-doctor' || rawProduct.catId === 'cat-doctor';

  const category = categories.find(c => c.id === (rawProduct.categoryId || rawProduct.catId)) || {
    name: isDoctorOrMedical ? 'Doctor & Medical Loan' : (rawProduct.categoryName || 'Doctor & Medical Loan'),
    icon: isDoctorOrMedical ? '🩺' : '💼'
  };

  // Sub options list: if provided on product, use it; otherwise fallback to defaultHealthcareSubOptions
  const prodSubOptions = (rawProduct.subOptions && rawProduct.subOptions.length > 0)
    ? rawProduct.subOptions
    : (rawProduct.options && rawProduct.options.length > 0)
      ? rawProduct.options
      : defaultHealthcareSubOptions;

  const prodFeatures = (rawProduct.features && rawProduct.features.length > 0)
    ? rawProduct.features
    : [
      'Fast 2-hour hospital clearance & direct hospital NEFT disbursal',
      'Covers health insurance co-pays, deductibles & non-covered therapies',
      'Special high-ticket unsecured capital up to ₹75 Lakhs for Doctors & Dentists',
      'Up to 85% machinery invoice financing up to ₹2 Crores for medical diagnostic equipment',
      'Minimal documentation with paperless digital KYC verification',
      'Flexible repayment tenures from 12 to 84 months with zero prepayment penalties'
    ];

  const prodEligibility = rawProduct.eligibility || {
    minAge: 21,
    maxAge: 68,
    minIncome: 25000,
    employmentType: 'Salaried, Self-Employed & Registered Doctors',
    minCibilScore: 680
  };

  const prodDocuments = (rawProduct.documentsRequired && rawProduct.documentsRequired.length > 0)
    ? rawProduct.documentsRequired
    : [
      'Aadhaar Card, PAN Card & Current Address Proof',
      'Hospital Admission Estimate / Proforma Invoice / Medical Treatment Bills',
      'Last 6 Months Bank Statement & Latest 3 Months Salary Slips (for salaried)',
      'Medical Degree / MCI / DCI State Registration Certificate (for Doctor loans)',
      'Equipment Quotation / Proforma Invoice from authorized OEM dealer (for Equipment loans)'
    ];

  // State for Embedded Live EMI Calculator
  const [calcAmount, setCalcAmount] = useState(
    Math.max(prodMinAmount, Math.min(prodMaxAmount, 300000))
  );
  const [calcRate, setCalcRate] = useState(prodRate);
  const [calcTenureMonths, setCalcTenureMonths] = useState(
    Math.min(prodMaxTenure || 36, Math.max(prodMinTenure || 12, 36))
  );

  // Sync state if product prop changes
  useEffect(() => {
    if (rawProduct && Object.keys(rawProduct).length > 0) {
      if (typeof rawProduct.interestRate === 'number') setCalcRate(rawProduct.interestRate);
      if (rawProduct.minAmount && rawProduct.maxAmount) {
        setCalcAmount(Math.max(rawProduct.minAmount, Math.min(rawProduct.maxAmount, 300000)));
      }
    }
  }, [product]);

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
        product: { ...rawProduct, name: prodName, id: prodId, interestRate: prodRate },
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
    fetch(`${API_BASE_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: quickName,
        phone: quickPhone,
        city: quickCity || 'Visakhapatnam',
        productName: prodName,
        requestedAmount: calcAmount,
        tenureMonths: calcTenureMonths,
        notes: `Enquiry generated from Loan Details Page for ${prodName}`
      })
    }).catch(err => console.warn('Lead submission error:', err));

    setQuickSubmitted(true);
    setTimeout(() => {
      setQuickSubmitted(false);
      setShowQuickModal(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans selection:bg-[#6EA928] selection:text-white">

      {/* 1. TOP NAVBAR */}
      <Navbar
        currentView="loan-details"
        setCurrentView={(view) => {
          if (view === 'website') (onSwitchToHome || onClose)();
          else if (view === 'services') (onSwitchToServices || onClose)();
          else if (view === 'admin') (onSwitchToAdmin || onClose)();
        }}
        onApplyClick={handleApplyClick}
      />

      {/* 2. SUB-NAV / BREADCRUMB STRIP */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={onSwitchToHome || onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0A5C80] hover:bg-[#6EA928] text-white font-bold transition-all shadow-sm cursor-pointer"
          >
            <span>←</span> Back to Home
          </button>
          <button
            onClick={onSwitchToServices || onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200 transition-colors cursor-pointer"
          >
            <span>🏪</span> All Loan Services
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <span className="text-[#6EA928] font-bold">VGS Finance</span>
          <span>/</span>
          <span className="text-slate-600 font-medium">{category.name || 'Doctor & Medical Loan'}</span>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate max-w-xs">{prodName}</span>
        </div>
      </div>

      {/* =========================================================================
          MAIN LOAN DETAILS CONTENT WRAPPER (13 SECTIONS)
         ========================================================================= */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

        {/* =========================================================================
            SECTION 1: LOAN NAME & PRODUCT BANNER
           ========================================================================= */}
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#466E18] text-xs font-black uppercase tracking-wider flex items-center gap-1">
                  <span>{category.icon || '🩺'}</span> {category.name}
                </span>
                <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0A5C80] text-xs font-bold">
                  Product ID: {prodId}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
                  Verified Lending Partner Network
                </span>
              </div>

              {/* 1. LOAN NAME */}
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {prodName}
              </h1>

              {/* Tagline / Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                {prodTagline}
              </p>
            </div>

            {/* Quick Hero Financial Metrics Badge */}
            <div className="bg-gradient-to-br from-emerald-50/80 via-white to-sky-50/60 border border-emerald-200 rounded-3xl p-6 text-center shrink-0 w-full lg:w-72 shadow-md space-y-3">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Interest Rate from
                </span>
                <span className="text-4xl font-black text-[#466E18] block tracking-tight">
                  {prodRate}% <span className="text-sm font-normal text-slate-600">p.a.</span>
                </span>
                <span className="text-[10px] text-emerald-800 font-semibold block mt-0.5">
                  Monthly Reducing Balance Formula
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-around text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">Processing Fee</span>
                  <span className="text-slate-900 font-bold">{prodProcessingFee}</span>
                </div>
                <div className="border-r border-slate-200"></div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Sanction Turnaround</span>
                  <span className="text-[#0A5C80] font-bold">{prodTurnaround}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleApplyClick}
                  className="w-full py-3 rounded-xl bg-[#6EA928] hover:bg-[#5A8B1F] text-white font-black text-xs uppercase tracking-wider shadow-md shadow-[#6EA928]/30 cursor-pointer transition-all"
                >
                  🚀 Instant Application
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SPECIALIZED LOAN SUB-OPTIONS SHOWCASE (e.g. Medical: Emergency, Health Insurance, Doctor Clinic, Equipment)
           ========================================================================= */}
        {prodSubOptions && prodSubOptions.length > 0 && (
          <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-slate-200 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5D4] text-[#466E18] text-[11px] font-black uppercase tracking-wider mb-2">
                  <span>🏥</span> Specialized Variants & Purpose-Specific Financing
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Related Specialized Loan Options
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Select your specific requirement below to simulate live EMIs or request instant fast-track callback:
                </p>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-[#466E18] border border-slate-200 shrink-0">
                {prodSubOptions.length} Specialized Facilities
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {prodSubOptions.map((opt) => (
                <div
                  key={opt.id}
                  className="bg-slate-50/70 hover:bg-white border border-slate-200 hover:border-[#6EA928] rounded-2xl p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs group-hover:scale-110 transition-transform">
                          {opt.icon}
                        </span>
                        <div>
                          <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-[#466E18] transition-colors leading-tight">
                            {opt.title}
                          </h3>
                          <span className="text-[10px] font-black text-[#6EA928] uppercase tracking-wide">
                            {opt.tag}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {opt.description}
                    </p>

                    {/* Financial Specs */}
                    <div className="grid grid-cols-3 gap-2 bg-white rounded-xl p-3 border border-slate-200 text-[11px]">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">Interest Rate</span>
                        <span className="font-black text-[#466E18]">{opt.rate}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">Sanction Limit</span>
                        <span className="font-black text-slate-900">{opt.limit}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-slate-500 block">Tenure</span>
                        <span className="font-bold text-slate-700">{opt.tenure}</span>
                      </div>
                    </div>

                    {/* Bullet Benefits */}
                    <div className="space-y-1.5 pt-1">
                      {opt.benefits.map((b, bIdx) => (
                        <div key={bIdx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                          <span className="text-[#6EA928] font-bold">✔</span>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sub-option Actions */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                    <button
                      onClick={() => {
                        if (opt.defaultAmount) setCalcAmount(opt.defaultAmount);
                        const el = document.getElementById('details-emi-calc');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="py-2.5 px-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-bold text-xs border border-slate-300 shadow-xs transition-colors cursor-pointer text-center"
                    >
                      🧮 Calculate EMI
                    </button>
                    <button
                      onClick={() => {
                        if (opt.defaultAmount) setCalcAmount(opt.defaultAmount);
                        setShowQuickModal(true);
                      }}
                      className="py-2.5 px-2 rounded-xl bg-[#0A5C80] hover:bg-[#6EA928] text-white font-bold text-xs shadow-md shadow-[#0A5C80]/15 hover:shadow-[#6EA928]/30 transition-all cursor-pointer text-center"
                    >
                      ⚡ 1-Click Fast Enquiry
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* =========================================================================
            SECTION 2 & 3: LOAN DESCRIPTION & KEY BENEFITS
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* 2. LOAN DESCRIPTION */}
          <section className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#6EA928] rounded-full"></span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                2. Loan Description & Comprehensive Overview
              </h2>
            </div>

            <div className="text-sm text-slate-600 space-y-4 leading-relaxed font-normal">
              <p>
                The <strong className="text-slate-900">{prodName}</strong> is structured by VGS Finance & Loans to cater to eligible borrowers seeking immediate, transparent capital. Backed by top-tier banking partners and premier Non-Banking Financial Companies (NBFCs), this loan product ensures transparent pricing with no hidden charges.
              </p>
              <p>
                Whether you need funds for emergency financial needs, debt consolidation, business working capital, capacity expansion, medical treatments, or asset acquisition, this facility offers swift processing with minimal documentation and customizable repayment tenures.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#466E18]">
                  🎯 Primary Borrowing Purposes:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#6EA928] font-bold">✔</span> Working Capital
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#6EA928] font-bold">✔</span> Asset Purchase
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#6EA928] font-bold">✔</span> Debt Consolidation
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#6EA928] font-bold">✔</span> Business Expansion
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#6EA928] font-bold">✔</span> Emergency Medical
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#6EA928] font-bold">✔</span> Home Renovation
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. KEY BENEFITS */}
          <section className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#0A5C80] rounded-full"></span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                3. Key Benefits & Value Highlights
              </h2>
            </div>

            <div className="space-y-3">
              {prodFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 flex items-start gap-3 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-200 text-[#466E18] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 font-medium">
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
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-amber-500 rounded-full"></span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Financial Specifications (Amount, Rates & Tenure)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* 4. LOAN AMOUNT INFORMATION */}
            <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  4. Loan Amount Info
                </span>
                <span className="text-lg">💰</span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-black text-slate-900 block">
                  {formatCurrency(prodMinAmount)} - {formatCurrency(prodMaxAmount)}
                </span>
                <span className="text-xs text-slate-500 block">
                  Sanction quantum based on income profile & eligibility
                </span>
              </div>
              <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-500">Minimum Quantum:</span>
                  <span className="font-bold text-slate-900">{formatCurrency(prodMinAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Maximum Limit:</span>
                  <span className="font-bold text-slate-900">{formatCurrency(prodMaxAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Indicative LTV:</span>
                  <span className="font-bold text-[#466E18]">Up to 85% - 95%</span>
                </div>
              </div>
            </div>

            {/* 5. INTEREST RATE INFORMATION */}
            <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  5. Interest Rate Info
                </span>
                <span className="text-lg">📈</span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-black text-[#466E18] block">
                  {prodRate}% <span className="text-xs font-normal text-slate-600">p.a.</span>
                </span>
                <span className="text-xs text-slate-500 block">
                  Monthly Reducing Balance Calculation Method
                </span>
              </div>
              <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-500">Rate Structure:</span>
                  <span className="font-bold text-slate-900">Floating / Fixed (Repo-Linked)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Processing Fee:</span>
                  <span className="font-bold text-amber-600">{prodProcessingFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Foreclosure Charges:</span>
                  <span className="font-bold text-slate-700">Nil for individual floating</span>
                </div>
              </div>
            </div>

            {/* 6. TENURE INFORMATION */}
            <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  6. Tenure Information
                </span>
                <span className="text-lg">⏳</span>
              </div>
              <div className="space-y-1">
                <span className="text-2xl font-black text-[#0A5C80] block">
                  {prodMinTenure} - {prodMaxTenure} Months
                </span>
                <span className="text-xs text-slate-500 block">
                  Flexible tenure window ({(prodMinTenure / 12).toFixed(1)} to {(prodMaxTenure / 12).toFixed(0)} Years)
                </span>
              </div>
              <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-500">Repayment Mode:</span>
                  <span className="font-bold text-slate-900">Monthly NACH / Auto-Debit</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tenure Extension:</span>
                  <span className="font-bold text-slate-900">Available on request</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Part-Prepayment:</span>
                  <span className="font-bold text-[#466E18]">Allowed anytime</span>
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
          <section className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 bg-teal-600 rounded-full"></span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  7. Basic Eligibility Criteria
                </h2>
              </div>
              <p className="text-xs text-slate-600">
                Lenders evaluate your credit capacity and repaying ability based on these parameters:
              </p>

              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-slate-600 font-medium">Eligible Age Bracket</span>
                  <span className="font-bold text-slate-900">
                    {prodEligibility?.minAge || 21} - {prodEligibility?.maxAge || 65} Years
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-slate-600 font-medium">Minimum Monthly Net Income</span>
                  <span className="font-bold text-[#466E18]">
                    {formatCurrency(prodEligibility?.minIncome || 25000)} / Month
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-slate-600 font-medium">Employment Profiles</span>
                  <span className="font-bold text-slate-800 text-right max-w-[55%] truncate">
                    {prodEligibility?.employmentType || 'Salaried / Self-Employed'}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-slate-600 font-medium">Minimum CIBIL Score</span>
                  <span className="font-extrabold text-[#0A5C80]">
                    {prodEligibility?.minCibilScore ? `${prodEligibility.minCibilScore}+` : '680+ (Good Track)'}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-slate-600 font-medium">FOIR Capacity (Fixed Obligation)</span>
                  <span className="font-bold text-amber-700">
                    Up to 50% of Monthly Net Income
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800">
              💡 <em>Pro Tip: Co-borrowers (spouse or parents) can be added to enhance your eligible loan amount.</em>
            </div>
          </section>

          {/* 8. REQUIRED DOCUMENTS */}
          <section className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-indigo-600 rounded-full"></span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                8. Required Documents Checklist
              </h2>
            </div>

            {/* Document Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
              {[
                { id: 'salaried', label: '💼 Salaried Applicants' },
                { id: 'business', label: '🏢 Self-Employed / Business' },
                { id: 'collateral', label: '🏠 Collateral / Property' },
                { id: 'kyc', label: '🪪 Standard KYC' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveDocTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeDocTab === tab.id
                      ? 'bg-[#0A5C80] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
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
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                      <span className="text-[#6EA928] font-bold">✔</span>
                      <span className="text-slate-700">{doc}</span>
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
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                      <span className="text-[#6EA928] font-bold">✔</span>
                      <span className="text-slate-700">{doc}</span>
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
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                      <span className="text-[#6EA928] font-bold">✔</span>
                      <span className="text-slate-700">{doc}</span>
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
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
                      <span className="text-[#6EA928] font-bold">✔</span>
                      <span className="text-slate-700">{doc}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Custom Product-Specific Document Requirements */}
            {prodDocuments && prodDocuments.length > 0 && (
              <div className="pt-3 border-t border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  📌 Specific Requirements for {prodName}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {prodDocuments.map((doc, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[#466E18] text-xs font-medium">
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
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="text-left max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#466E18] text-xs font-bold uppercase tracking-wider">
              <span>⚡</span> Fast-Track Loan Workflow
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              9. Loan Process Information & Journey Roadmap
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
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
                className="bg-slate-50 border border-slate-200 hover:border-[#6EA928] hover:bg-white rounded-2xl p-5 space-y-3 relative group transition-all shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{st.icon}</span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 border border-slate-300">
                    Step {st.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#466E18] transition-colors">
                    {st.title}
                  </h3>
                  <span className="text-[10px] font-bold text-[#0A5C80] block mt-0.5">
                    {st.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: INTERACTIVE EMI CALCULATOR WITH AMORTIZATION BREAKDOWN
           ========================================================================= */}
        <section id="details-emi-calc" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E8F5D4] text-[#466E18] text-xs font-bold uppercase tracking-wider mb-2">
                <span>🧮</span> Mathematical Reducing Engine
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                10. Interactive EMI Calculator for {prodName}
              </h2>
              <p className="text-xs text-slate-600">
                Simulate monthly installment, interest liability, and complete repayment summary:
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-500 block font-medium">Estimated Monthly EMI</span>
              <span className="text-3xl font-black text-[#466E18] font-mono tracking-tight">
                {formatCurrency(emiResults.monthlyEmi)} <span className="text-xs font-normal text-slate-500">/ mo</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Sliders Column */}
            <div className="lg:col-span-7 space-y-6">

              {/* Slider 1: Loan Amount */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-700">1. Required Loan Amount:</label>
                  <span className="font-black text-slate-900 font-mono text-sm bg-slate-100 px-3 py-1 rounded-xl border border-slate-200">
                    {formatCurrency(calcAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min={prodMinAmount}
                  max={prodMaxAmount}
                  step="25000"
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  className="w-full accent-[#6EA928] cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Min: {formatCurrency(prodMinAmount)}</span>
                  <span>Max: {formatCurrency(prodMaxAmount)}</span>
                </div>
              </div>

              {/* Slider 2: Interest Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-700">2. Annual Interest Rate (% p.a.):</label>
                  <span className="font-black text-[#466E18] font-mono text-sm bg-slate-100 px-3 py-1 rounded-xl border border-slate-200">
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
                  className="w-full accent-[#6EA928] cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>6.5% p.a.</span>
                  <span>Product Rate: {prodRate}%</span>
                  <span>24.0% p.a.</span>
                </div>
              </div>

              {/* Slider 3: Loan Tenure */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-slate-700">3. Repayment Tenure:</label>
                  <span className="font-black text-[#0A5C80] font-mono text-sm bg-slate-100 px-3 py-1 rounded-xl border border-slate-200">
                    {calcTenureMonths} Months ({(calcTenureMonths / 12).toFixed(1)} Years)
                  </span>
                </div>
                <input
                  type="range"
                  min={prodMinTenure}
                  max={prodMaxTenure}
                  step="6"
                  value={calcTenureMonths}
                  onChange={(e) => setCalcTenureMonths(Number(e.target.value))}
                  className="w-full accent-[#0A5C80] cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Min: {prodMinTenure} Months</span>
                  <span>Max: {prodMaxTenure} Months</span>
                </div>
              </div>

              {/* Visual Breakdown Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#466E18]">Principal: {emiResults.principalPercent}%</span>
                  <span className="text-amber-700">Total Interest: {emiResults.interestPercent}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden flex">
                  <div
                    className="bg-[#6EA928] h-full transition-all duration-300"
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
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block border-b border-slate-200 pb-2">
                  Payment Summary Breakdown
                </span>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-600">Monthly EMI:</span>
                    <span className="text-lg font-black text-[#466E18] font-mono">
                      {formatCurrency(emiResults.monthlyEmi)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-slate-200">
                    <span className="text-slate-600">Principal Borrowing:</span>
                    <span className="font-bold text-slate-900 font-mono">
                      {formatCurrency(calcAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-slate-200">
                    <span className="text-slate-600">Total Interest Payable:</span>
                    <span className="font-bold text-amber-700 font-mono">
                      {formatCurrency(emiResults.totalInterest)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-slate-200">
                    <span className="text-slate-700 font-bold">Total Payment (Principal + Interest):</span>
                    <span className="text-base font-black text-slate-900 font-mono">
                      {formatCurrency(emiResults.totalPayment)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons in Calculator */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <button
                  onClick={handleApplyClick}
                  className="w-full py-3.5 rounded-xl bg-[#6EA928] hover:bg-[#5A8B1F] text-white font-bold text-xs shadow-md shadow-[#6EA928]/25 cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <span>🚀</span> Apply with this EMI ({formatCurrency(emiResults.monthlyEmi)}/mo)
                </button>
                <button
                  onClick={() => setShowQuickModal(true)}
                  className="w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs cursor-pointer transition-colors"
                >
                  💬 Have Questions? Request Callback
                </button>
              </div>
            </div>

          </div>

          {/* Indicative Amortization Schedule Table Preview */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider">
                📊 Indicative Initial Amortization Schedule Preview (First 6 Months)
              </span>
              <span className="text-slate-500 text-[11px]">Formula: Reducing Balance</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Month</th>
                    <th className="px-4 py-3">Opening Balance</th>
                    <th className="px-4 py-3 text-[#466E18]">Monthly EMI</th>
                    <th className="px-4 py-3">Principal</th>
                    <th className="px-4 py-3 text-amber-700">Interest</th>
                    <th className="px-4 py-3">Closing Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono">
                  {amortizationData.map((row) => (
                    <tr key={row.month} className="hover:bg-slate-50">
                      <td className="px-4 py-2.5 font-sans font-bold text-slate-900">Month {row.month}</td>
                      <td className="px-4 py-2.5">{formatCurrency(row.beginningBalance)}</td>
                      <td className="px-4 py-2.5 font-bold text-[#466E18]">{formatCurrency(row.emi)}</td>
                      <td className="px-4 py-2.5 text-slate-900">{formatCurrency(row.principalComp)}</td>
                      <td className="px-4 py-2.5 text-amber-700">{formatCurrency(row.interestComp)}</td>
                      <td className="px-4 py-2.5 text-slate-700">{formatCurrency(row.endingBalance)}</td>
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
        <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">

          <div className="text-left max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              11 & 12. Apply or Enquire for {prodName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Choose your preferred channel: complete application online or request an immediate call back from our loan officer.
            </p>
          </div>

          {/* Action Cards: Apply Now (11) and Enquire Now (12) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">

            {/* 11. APPLY NOW ACTION CARD */}
            <div className="bg-gradient-to-br from-emerald-50/40 via-white to-white border-2 border-emerald-400/50 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-[#466E18] text-xs font-bold uppercase tracking-wider">
                  Recommended Choice
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  11. Apply Now (Full Application)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Proceed with the calculated loan amount ({formatCurrency(calcAmount)}) and tenure ({calcTenureMonths} Months). Fills in all details automatically at the Application Desk for faster sanction.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#6EA928] font-bold">✔</span> Instant Lead ID generation
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#6EA928] font-bold">✔</span> Dedicated loan processing officer assigned
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#6EA928] font-bold">✔</span> Direct bank routing to highest approval lender
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleApplyClick}
                  className="w-full py-4 rounded-2xl bg-[#6EA928] hover:bg-[#5A8B1F] text-white font-black text-sm uppercase tracking-wider shadow-md shadow-[#6EA928]/30 cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <span>🚀</span> Proceed to Full Application Desk
                </button>
              </div>
            </div>

            {/* 12. ENQUIRE NOW ACTION CARD */}
            <div className="bg-gradient-to-br from-sky-50/40 via-white to-white border-2 border-[#0A5C80]/40 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs flex flex-col justify-between">
              <div className="space-y-3">
                <span className="px-3 py-1 rounded-full bg-sky-100 border border-sky-300 text-[#0A5C80] text-xs font-bold uppercase tracking-wider">
                  Quick Callback
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  12. Enquire Now (1-Click Callback)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Short on time or have questions before applying? Submit just your name and mobile number. Our loan specialist will call you within 15 minutes.
                </p>
                <div className="space-y-1.5 text-xs text-slate-700 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#0A5C80] font-bold">✔</span> 15-Minute Guaranteed Callback
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#0A5C80] font-bold">✔</span> Free personalized eligibility counseling
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#0A5C80] font-bold">✔</span> Doorstep document pickup coordination
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setShowQuickModal(true)}
                  className="w-full py-4 rounded-2xl bg-[#0A5C80] hover:bg-[#074763] text-white font-black text-sm uppercase tracking-wider shadow-md shadow-[#0A5C80]/25 cursor-pointer transition-all flex items-center justify-center gap-2"
                >
                  <span>📞</span> Request Instant Callback
                </button>
              </div>
            </div>

          </div>

          {/* =========================================================================
              13. CONTACT INFORMATION & ADVISORY DESK
             ========================================================================= */}
          <div className="border-t border-slate-200 pt-8 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#6EA928] rounded-full"></span>
              <h3 className="text-xl font-black text-slate-900">
                13. Dedicated Loan Desk & Contact Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-2xl block">📞</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Toll-Free Loan Helpline
                </span>
                <a
                  href="tel:18004259988"
                  className="text-base font-black text-[#466E18] hover:underline font-mono block"
                >
                  1800-425-9988
                </a>
                <span className="text-[10px] text-slate-500 block">Mon - Sat: 9:00 AM - 7:00 PM</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-2xl block">💬</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  WhatsApp Advisory Desk
                </span>
                <a
                  href="https://wa.me/917675852618?text=Hello%20VGS%20Finance,%20I%20am%20interested%20in%20learning%20more%20about%20the%20loan%20options."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-black text-teal-700 hover:underline font-mono block"
                >
                  +91 7675852618
                </a>
                <span className="text-[10px] text-slate-500 block">Instant Chat & Status Inquiries</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-2xl block">✉️</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Email Support Desk
                </span>
                <a
                  href="mailto:reachus@ascendmedialabs.com"
                  className="text-xs font-bold text-[#0A5C80] hover:underline block truncate"
                >
                  reachus@ascendmedialabs.com
                </a>
                <span className="text-[10px] text-slate-500 block">loans@vgsfinance.com</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-2xl block">🏢</span>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Regional Operations Hub
                </span>
                <span className="text-xs font-bold text-slate-900 block">
                  Ascend Media Labs Hub
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Visakhapatnam, Andhra Pradesh, India
                </span>
              </div>

            </div>

            {/* Statutory Disclaimer */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
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
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 max-w-md w-full rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 relative animate-scale-up text-slate-900">

            <div className="flex justify-between items-start">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-100 border border-sky-300 text-[#0A5C80] text-[10px] font-bold uppercase tracking-wider">
                  Quick Callback Request
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">Enquire for {prodName}</h3>
                <p className="text-xs text-slate-500">Our loan manager will call you within 15 minutes.</p>
              </div>
              <button
                onClick={() => setShowQuickModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center text-sm cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            {quickSubmitted ? (
              <div className="p-6 text-center space-y-2 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <span className="text-3xl">✅</span>
                <h4 className="text-sm font-bold text-[#466E18]">Enquiry Submitted Successfully!</h4>
                <p className="text-xs text-slate-600">A loan officer has been assigned and will call you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleQuickEnquirySubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Varma"
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6EA928] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Mobile Number (with WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6EA928] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Visakhapatnam, Vijayawada"
                    value={quickCity}
                    onChange={(e) => setQuickCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6EA928] focus:bg-white"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Selected Loan:</span>
                    <span className="text-slate-900 font-bold">{prodName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Calculated EMI:</span>
                    <span className="text-[#466E18] font-bold">{formatCurrency(emiResults.monthlyEmi)}/mo</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#6EA928] hover:bg-[#5A8B1F] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-[#6EA928]/25 cursor-pointer transition-all"
                >
                  🚀 Submit Quick Callback Request
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Corporate Footer */}
      <footer className="bg-[#041E2B] text-slate-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-[#0A5C80]/30 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="VGS Finance" className="w-12 h-12 object-contain rounded-xl bg-white p-1" />
            <div>
              <div className="text-base font-black text-white">VGS FINANCIAL SERVICES</div>
              <div className="text-xs text-[#6EA928] font-bold">LOAN SUPER MARKET • ISO COMPLIANT</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-300">
            <button onClick={onSwitchToHome || onClose} className="hover:text-[#6EA928] transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={onSwitchToServices || onClose} className="hover:text-[#6EA928] transition-colors cursor-pointer">
              All Loan Services
            </button>
            <button onClick={onSwitchToAdmin} className="hover:text-[#6EA928] transition-colors cursor-pointer">
              Admin Portal
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <div>© 2026 VGS Finance & Loans Management System. All rights reserved.</div>
          <div className="text-slate-400">
            Engineered & Maintained by{' '}
            <a
              href="https://www.ascendmedialabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#6EA928] hover:underline"
            >
              Ascend Media Labs (Visakhapatnam)
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

