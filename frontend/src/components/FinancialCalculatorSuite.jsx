import { useState, useEffect } from 'react';

export default function FinancialCalculatorSuite({ onApplyWithCalculation, onApplyWithEligibleAmount }) {
  // Active Tab: 'emi' | 'eligibility' | 'transfer'
  const [activeTab, setActiveTab] = useState('emi');

  // Check URL hash on load
  useEffect(() => {
    if (window.location.hash === '#eligibility') {
      setActiveTab('eligibility');
    } else if (window.location.hash === '#emi-calc') {
      setActiveTab('emi');
    }
  }, []);

  const formatCurrency = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt || 0);
  };

  // =========================================================================
  // 1. EMI CALCULATOR ENGINE STATE
  // =========================================================================
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(9);
  const [tenureValue, setTenureValue] = useState(9);
  const [tenureUnit, setTenureUnit] = useState('months'); // 'months' | 'years'
  const [showValuesIn, setShowValuesIn] = useState('percentage'); // 'percentage' | 'amount'
  const [isRecalculated, setIsRecalculated] = useState(false);
  const [pulseOutput, setPulseOutput] = useState(false);

  const [calculation, setCalculation] = useState({
    monthlyEmi: 0,
    totalInterest: 0,
    totalPayment: 0,
    principalPercent: 0,
    interestPercent: 0
  });

  const calculateEmi = () => {
    const p = Math.max(0, parseFloat(loanAmount) || 0);
    const r = (Math.max(0, parseFloat(interestRate) || 0)) / 12 / 100;
    const n = tenureUnit === 'years' ? (parseInt(tenureValue, 10) || 1) * 12 : parseInt(tenureValue, 10) || 1;

    if (p > 0 && r > 0 && n > 0) {
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = Math.max(0, totalPayment - p);

      const principalPct = Math.round((p / totalPayment) * 100);
      const interestPct = 100 - principalPct;

      setCalculation({
        monthlyEmi: Math.round(emi),
        totalInterest: Math.round(totalInterest),
        totalPayment: Math.round(totalPayment),
        principalPercent: principalPct,
        interestPercent: interestPct
      });
    } else if (p > 0 && r === 0 && n > 0) {
      const emi = p / n;
      setCalculation({
        monthlyEmi: Math.round(emi),
        totalInterest: 0,
        totalPayment: Math.round(p),
        principalPercent: 100,
        interestPercent: 0
      });
    } else {
      setCalculation({
        monthlyEmi: 0,
        totalInterest: 0,
        totalPayment: 0,
        principalPercent: 0,
        interestPercent: 0
      });
    }
  };

  useEffect(() => {
    calculateEmi();
  }, [loanAmount, interestRate, tenureValue, tenureUnit]);

  const handleManualRecalculate = () => {
    calculateEmi();
    setIsRecalculated(true);
    setPulseOutput(true);
    setTimeout(() => {
      setIsRecalculated(false);
      setPulseOutput(false);
    }, 1200);
  };

  const tenureInMonths = tenureUnit === 'years' ? tenureValue * 12 : tenureValue;

  // =========================================================================
  // 2. ELIGIBILITY CALCULATOR (FOIR 50%) ENGINE STATE
  // =========================================================================
  const [income, setIncome] = useState(45000);
  const [existingEmi, setExistingEmi] = useState(5000);
  const [tenureYears, setTenureYears] = useState(3);
  const [loanCategory, setLoanCategory] = useState('personal');

  const categoryRates = {
    personal: { label: 'Personal Loan', rate: 11.5 },
    home: { label: 'Home Loan', rate: 8.5 },
    business: { label: 'Business Loan', rate: 12.0 },
    car: { label: 'Car / Vehicle Loan', rate: 9.0 }
  };

  const currentRate = categoryRates[loanCategory]?.rate || 11.5;

  const calculateEligibility = () => {
    const monthlyInc = parseFloat(income) || 0;
    const existing = parseFloat(existingEmi) || 0;
    const foirMaxEmi = monthlyInc * 0.50;
    const maxAllowedEmi = Math.max(0, foirMaxEmi - existing);
    const tenureMonths = tenureYears * 12;
    const r = (currentRate / 12) / 100;

    let maxLoan = 0;
    if (maxAllowedEmi > 0 && r > 0 && tenureMonths > 0) {
      maxLoan = Math.round((maxAllowedEmi * (Math.pow(1 + r, tenureMonths) - 1)) / (r * Math.pow(1 + r, tenureMonths)));
    }

    const totalRepayment = maxAllowedEmi * tenureMonths;
    const estimatedInterest = Math.max(0, totalRepayment - maxLoan);

    return {
      foirMaxEmi: Math.round(foirMaxEmi),
      maxAllowedEmi: Math.round(maxAllowedEmi),
      maxLoan: Math.round(maxLoan),
      totalRepayment: Math.round(totalRepayment),
      estimatedInterest: Math.round(estimatedInterest),
      tenureMonths
    };
  };

  const { foirMaxEmi, maxAllowedEmi, maxLoan, totalRepayment, estimatedInterest } = calculateEligibility();

  // =========================================================================
  // 3. BALANCE TRANSFER SAVINGS CALCULATOR STATE
  // =========================================================================
  const [btLoanAmount, setBtLoanAmount] = useState(2500000);
  const [btCurrentRate, setBtCurrentRate] = useState(11.5);
  const [btNewRate, setBtNewRate] = useState(8.5);
  const [btRemainingTenureYears, setBtRemainingTenureYears] = useState(15);

  const calculateBtSavings = () => {
    const p = parseFloat(btLoanAmount) || 0;
    const n = (parseInt(btRemainingTenureYears, 10) || 1) * 12;
    const rOld = (parseFloat(btCurrentRate) || 0) / 12 / 100;
    const rNew = (parseFloat(btNewRate) || 0) / 12 / 100;

    if (p > 0 && n > 0 && rOld > 0 && rNew > 0) {
      const emiOld = (p * rOld * Math.pow(1 + rOld, n)) / (Math.pow(1 + rOld, n) - 1);
      const emiNew = (p * rNew * Math.pow(1 + rNew, n)) / (Math.pow(1 + rNew, n) - 1);

      const totalOld = emiOld * n;
      const totalNew = emiNew * n;
      const totalSavings = Math.max(0, totalOld - totalNew);
      const monthlySavings = Math.max(0, emiOld - emiNew);

      return {
        emiOld: Math.round(emiOld),
        emiNew: Math.round(emiNew),
        monthlySavings: Math.round(monthlySavings),
        totalSavings: Math.round(totalSavings),
        percentageSaved: Math.round((totalSavings / totalOld) * 100)
      };
    }

    return { emiOld: 0, emiNew: 0, monthlySavings: 0, totalSavings: 0, percentageSaved: 0 };
  };

  const btResult = calculateBtSavings();

  return (
    <section id="emi-calc" className="py-10 sm:py-14 bg-slate-50/50 border-t border-b border-slate-200/80 relative">
      <span id="eligibility" className="absolute -top-24"></span>

      {/* Compact Centered Container (max-w-5xl) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Section Header */}
        <div className="text-center space-y-1.5 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-[11px] font-black tracking-wide uppercase">
            <span>📊 Financial Calculation Suite</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#041E2B] tracking-tight">
            Interactive Financial & Loan Calculators
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Estimate monthly EMIs, maximum loan eligibility (50% FOIR), or balance transfer savings in one click.
          </p>
        </div>

        {/* UNIFIED SWITCHER TABS (Compact, Centered & Sleek) */}
        <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-xs max-w-2xl mx-auto w-full">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('emi')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                activeTab === 'emi'
                  ? 'bg-gradient-to-r from-[#0A5C80] to-[#0D749E] text-white shadow-xs'
                  : 'bg-transparent text-slate-600 hover:text-[#0A5C80] hover:bg-slate-50'
              }`}
            >
              <span className="text-base">🧮</span>
              <span>1. EMI Calculator</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('eligibility')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                activeTab === 'eligibility'
                  ? 'bg-gradient-to-r from-[#0A5C80] to-[#0D749E] text-white shadow-xs'
                  : 'bg-transparent text-slate-600 hover:text-[#0A5C80] hover:bg-slate-50'
              }`}
            >
              <span className="text-base">🛡️</span>
              <span>2. Loan Eligibility</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('transfer')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                activeTab === 'transfer'
                  ? 'bg-gradient-to-r from-[#0A5C80] to-[#0D749E] text-white shadow-xs'
                  : 'bg-transparent text-slate-600 hover:text-[#0A5C80] hover:bg-slate-50'
              }`}
            >
              <span className="text-base">🔄</span>
              <span>3. Balance Transfer</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: MONTHLY EMI CALCULATOR (Finance Buddha Layout - Compact)
           ========================================================================= */}
        {activeTab === 'emi' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6 transition-opacity duration-300">
            {/* Clean Sub-Header */}
            <div className="text-center space-y-0.5">
              <h3 className="text-xl sm:text-2xl font-bold text-[#041E2B] tracking-tight">
                Calculate EMI Online
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Accurate loan installment estimation powered by reducing balance formula.
              </p>
            </div>

            {/* 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left Column: Calculator Inputs */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* 1. Loan Amount */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      Loan Amount
                    </label>
                    <span className="text-slate-400 hover:text-blue-600 cursor-help" title="Enter the total loan principal amount you wish to borrow">
                      <svg className="w-3.5 h-3.5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="9" strokeWidth="2" />
                        <path strokeLinecap="round" strokeWidth="2" d="M12 8v.01M12 11v5" />
                      </svg>
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={loanAmount ? Number(loanAmount).toLocaleString('en-IN') : ''}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^0-9]/g, '');
                        setLoanAmount(raw ? Math.min(100000000, Number(raw)) : 0);
                      }}
                      placeholder="10,00,000"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-slate-900 font-bold text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 shadow-2xs transition-all"
                    />
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="10000000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  {/* Quick Amount Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {[100000, 300000, 500000, 1000000, 2500000, 5000000, 10000000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setLoanAmount(amt)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
                          loanAmount === amt
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        ₹{amt >= 10000000 ? `${amt / 10000000}Cr` : amt >= 100000 ? `${amt / 100000}L` : `${amt / 1000}K`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Interest Rate */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      Interest Rate
                    </label>
                    <span className="text-slate-400 hover:text-blue-600 cursor-help" title="Annual reducing balance interest rate offered by the lender">
                      <svg className="w-3.5 h-3.5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="9" strokeWidth="2" />
                        <path strokeLinecap="round" strokeWidth="2" d="M12 8v.01M12 11v5" />
                      </svg>
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="36"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      placeholder="9"
                      className="w-full bg-white border border-slate-300 rounded-lg pl-3.5 pr-8 py-2 text-slate-900 font-bold text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 shadow-2xs transition-all"
                    />
                    <span className="absolute right-3.5 top-2.5 text-slate-400 font-extrabold text-xs sm:text-sm">%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.25"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  {/* Preset Rates */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {[
                      { label: 'Home: 8.5%', rate: 8.5 },
                      { label: 'Personal: 9%', rate: 9.0 },
                      { label: 'Personal: 11.5%', rate: 11.5 },
                      { label: 'Business: 14%', rate: 14.0 },
                      { label: 'Car: 9%', rate: 9.0 }
                    ].map((p, idx) => (
                      <button
                        key={`${p.rate}-${idx}`}
                        type="button"
                        onClick={() => setInterestRate(p.rate)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
                          interestRate === p.rate
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Tenure */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      Tenure
                    </label>
                    <span className="text-slate-400 hover:text-blue-600 cursor-help" title="Repayment duration in months">
                      <svg className="w-3.5 h-3.5 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <circle cx="12" cy="12" r="9" strokeWidth="2" />
                        <path strokeLinecap="round" strokeWidth="2" d="M12 8v.01M12 11v5" />
                      </svg>
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="360"
                      value={tenureValue}
                      onChange={(e) => {
                        setTenureValue(Number(e.target.value));
                        setTenureUnit('months');
                      }}
                      placeholder="9"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-slate-900 font-bold text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100 shadow-2xs transition-all"
                    />
                  </div>

                  {/* Tenure Range Slider */}
                  <input
                    type="range"
                    min="3"
                    max="84"
                    step="1"
                    value={tenureInMonths}
                    onChange={(e) => {
                      setTenureValue(Number(e.target.value));
                      setTenureUnit('months');
                    }}
                    className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />

                  {/* Quick Tenure Pills (Matching Reference Picture Exactly) */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[3, 6, 9, 12, 24, 36, 60].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setTenureValue(m);
                          setTenureUnit('months');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          tenureValue === m && tenureUnit === 'months'
                            ? 'border-blue-600 bg-blue-50/90 text-blue-700 font-bold shadow-2xs ring-1 ring-blue-500'
                            : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {m} Months
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Output Breakdown Card (Compact) */}
              <div className="lg:col-span-5 bg-white border border-slate-200/90 p-4 sm:p-5 rounded-2xl shadow-sm space-y-4">
                
                {/* Top Soft Blue Highlight Card */}
                <div className="bg-[#EBF5FB] border border-[#D4E6F1] p-3.5 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl sm:text-2xl select-none">🪙</span>
                    <span className="font-bold text-slate-800 text-xs sm:text-sm">EMI Amount</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold text-[#0B3B60] tracking-tight">
                    {formatCurrency(calculation.monthlyEmi)}
                  </div>
                </div>

                {/* Show Values In Radio Toggle */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <span className="font-semibold text-slate-600">Show Values in:</span>
                  <div className="flex items-center gap-4 font-medium text-slate-700">
                    <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="showValuesIn"
                        checked={showValuesIn === 'percentage'}
                        onChange={() => setShowValuesIn('percentage')}
                        className="w-3.5 h-3.5 accent-blue-600 cursor-pointer"
                      />
                      <span>Percentage</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="showValuesIn"
                        checked={showValuesIn === 'amount'}
                        onChange={() => setShowValuesIn('amount')}
                        className="w-3.5 h-3.5 accent-blue-600 cursor-pointer"
                      />
                      <span>Amount</span>
                    </label>
                  </div>
                </div>

                {/* Dual-color Progress Bar */}
                <div className="w-full h-6 rounded-full overflow-hidden flex bg-slate-100 shadow-inner my-1.5 border border-slate-200/60">
                  <div
                    style={{ width: `${calculation.principalPercent}%` }}
                    className="bg-[#D9F99D] h-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-slate-800 transition-all duration-300"
                  >
                    {showValuesIn === 'percentage'
                      ? `${calculation.principalPercent}%`
                      : formatCurrency(loanAmount)}
                  </div>
                  <div
                    style={{ width: `${calculation.interestPercent}%` }}
                    className="bg-[#FEF08A] h-full flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-slate-800 transition-all duration-300 min-w-[28px]"
                  >
                    {showValuesIn === 'percentage'
                      ? `${calculation.interestPercent}%`
                      : formatCurrency(calculation.totalInterest)}
                  </div>
                </div>

                {/* Breakup Section */}
                <div className="space-y-2 pt-1 text-xs sm:text-sm">
                  <h4 className="font-bold text-slate-800 text-xs">Breakup:</h4>
                  
                  <div className="flex items-center justify-between py-0.5">
                    <div className="flex items-center gap-2 text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-[#16A34A] shrink-0"></span>
                      <span className="font-medium">Principal Amount</span>
                    </div>
                    <span className="font-bold text-slate-800">{formatCurrency(loanAmount)}</span>
                  </div>

                  <div className="flex items-center justify-between py-0.5">
                    <div className="flex items-center gap-2 text-slate-700">
                      <span className="w-2 h-2 rounded-full bg-[#EAB308] shrink-0"></span>
                      <span className="font-medium">Interest Amount</span>
                    </div>
                    <span className="font-bold text-slate-800">{formatCurrency(calculation.totalInterest)}</span>
                  </div>

                  <div className="border-t border-slate-200 pt-2 flex items-center justify-between text-xs sm:text-sm font-extrabold text-slate-900">
                    <span>Total Amount Payable</span>
                    <span>{formatCurrency(calculation.totalPayment)}</span>
                  </div>
                </div>

                {/* Apply Now Button with Circle Arrow */}
                <button
                  type="button"
                  onClick={() => {
                    if (onApplyWithCalculation) {
                      onApplyWithCalculation({
                        loanAmount,
                        interestRate,
                        tenureMonths: tenureInMonths,
                        monthlyEmi: calculation.monthlyEmi
                      });
                    } else {
                      const el = document.getElementById('contact-enquiry');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs sm:text-sm flex items-center justify-between shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  <span>Apply Now</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-black">➔</span>
                </button>
              </div>

            </div>

            {/* Bottom Disclaimer Box */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-left space-y-1 mt-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <span>⚠️</span>
                <span>Disclaimer</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-normal">
                The Personal Loan EMI Calculator is a free online tool designed to help users estimate their potential monthly installments based on the loan amount, interest rate, and tenure entered. Results are indicative and not a guarantee of loan approval or final terms from lenders.
              </p>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: MAXIMUM LOAN ELIGIBILITY (FOIR 50% - Compact)
           ========================================================================= */}
        {activeTab === 'eligibility' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-5 transition-opacity duration-300">
            {/* Clean Sub-Header */}
            <div className="text-center space-y-0.5">
              <h3 className="text-xl sm:text-2xl font-bold text-[#041E2B] tracking-tight">
                Check Maximum Loan Eligibility
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Estimate your maximum borrowing capacity under standard bank 50% FOIR norms.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full">
              {/* Input Controls */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Monthly Income */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      Monthly Net Take-Home Income
                    </label>
                    <span className="text-[11px] text-slate-400 font-medium">In-Hand Salary</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-xs">₹</span>
                    <input
                      type="number"
                      min="5000"
                      step="1000"
                      value={income}
                      onChange={(e) => setIncome(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-2 text-slate-900 font-bold text-sm sm:text-base focus:outline-none focus:border-blue-500 shadow-2xs"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {[25000, 45000, 75000, 150000, 300000].map((inc) => (
                      <button
                        key={inc}
                        type="button"
                        onClick={() => setIncome(inc)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
                          income === inc
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        ₹{inc >= 100000 ? `${inc / 100000}L` : `${inc / 1000}K`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Existing EMIs */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      Current Existing EMIs / Obligations
                    </label>
                    <span className="text-[11px] text-slate-400 font-medium">Ongoing Loans</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-xs">₹</span>
                    <input
                      type="number"
                      min="0"
                      step="500"
                      value={existingEmi}
                      onChange={(e) => setExistingEmi(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-8 pr-3 py-2 text-slate-900 font-bold text-sm sm:text-base focus:outline-none focus:border-blue-500 shadow-2xs"
                    />
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {[0, 5000, 15000, 25000].map((eAmt) => (
                      <button
                        key={eAmt}
                        type="button"
                        onClick={() => setExistingEmi(eAmt)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all cursor-pointer ${
                          existingEmi === eAmt
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {eAmt === 0 ? 'No EMIs (₹0)' : `₹${eAmt / 1000}K`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Loan Category Selector */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      Loan Type & Interest Rate
                    </label>
                    <span className="text-xs font-extrabold text-blue-600">{currentRate}% p.a.</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                    {Object.entries(categoryRates).map(([key, data]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setLoanCategory(key)}
                        className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                          loanCategory === key
                            ? 'bg-blue-50/80 border-blue-500 text-blue-700 font-bold shadow-2xs ring-1 ring-blue-500'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-[11px] font-semibold">{data.label}</div>
                        <div className="text-xs font-black mt-0.5">{data.rate}%</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preferred Tenure */}
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 block">
                    Preferred Tenure (Repayment Period)
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[1, 2, 3, 5, 7].map((yr) => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setTenureYears(yr)}
                        className={`py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          tenureYears === yr
                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {yr} {yr === 1 ? 'Year' : 'Yrs'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output Display */}
              <div className="lg:col-span-5 bg-white border border-slate-200/90 p-4 sm:p-5 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3.5">
                  {/* Top Highlight Card */}
                  <div className="bg-[#EBF5FB] border border-[#D4E6F1] p-3.5 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl sm:text-2xl select-none">🛡️</span>
                      <span className="font-bold text-slate-800 text-xs sm:text-sm">Max Loan Capacity</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-[#0B3B60] tracking-tight">
                      {formatCurrency(maxLoan)}
                    </div>
                  </div>

                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-center text-xs text-emerald-800 font-bold">
                    Safe Max EMI: {formatCurrency(maxAllowedEmi)} / month
                  </div>

                  {/* Calculation Breakdown */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <div className="font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1.5 flex justify-between">
                      <span>FOIR Calculation:</span>
                      <span className="text-blue-600 font-bold">50% Benchmark</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Monthly Net Income:</span>
                      <span className="font-bold text-slate-800">{formatCurrency(income)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Max Allowed (50%):</span>
                      <span className="font-bold text-slate-800">{formatCurrency(foirMaxEmi)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Less Obligations:</span>
                      <span className="font-bold text-rose-600">- {formatCurrency(existingEmi)}</span>
                    </div>
                    <div className="flex justify-between text-slate-800 border-t border-slate-200 pt-1.5 font-bold">
                      <span>Net EMI Capacity:</span>
                      <span className="text-blue-600">{formatCurrency(maxAllowedEmi)} / mo</span>
                    </div>
                    <div className="flex justify-between text-slate-600 pt-0.5 text-[11px]">
                      <span>Total Repayment ({tenureYears} Yrs):</span>
                      <span className="font-mono text-slate-800">{formatCurrency(totalRepayment)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (onApplyWithEligibleAmount) {
                      onApplyWithEligibleAmount({
                        income,
                        existingEmi,
                        tenureYears,
                        loanCategory,
                        maxLoan,
                        maxAllowedEmi
                      });
                    } else {
                      const el = document.getElementById('contact-enquiry');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs sm:text-sm flex items-center justify-between shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                >
                  <span>Apply with Eligible Amount</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-black">➔</span>
                </button>
              </div>
            </div>

            {/* Bottom Disclaimer */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-left space-y-1 mt-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <span>⚠️</span>
                <span>Eligibility Disclosure</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-normal">
                Eligibility estimates are based on the standard 50% FOIR banking guideline. Actual sanction amounts depend on your credit bureau CIBIL score (750+ preferred), employer category, income tax returns (ITR), and individual lender underwriting criteria.
              </p>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: BALANCE TRANSFER & SAVINGS CALCULATOR (Compact)
           ========================================================================= */}
        {activeTab === 'transfer' && (
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-5 transition-opacity duration-300">
            {/* Clean Sub-Header */}
            <div className="text-center space-y-0.5">
              <h3 className="text-xl sm:text-2xl font-bold text-[#041E2B] tracking-tight">
                Loan Balance Transfer & Interest Savings Calculator
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Calculate interest savings by transferring your loan to lower partner bank rates.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start w-full">
              {/* Input Controls */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Outstanding Loan Principal */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="text-xs sm:text-sm font-bold text-slate-800">
                      Existing Outstanding Loan Amount (₹)
                    </label>
                    <span className="font-bold text-blue-600 text-xs sm:text-sm">{formatCurrency(btLoanAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min="200000"
                    max="20000000"
                    step="50000"
                    value={btLoanAmount}
                    onChange={(e) => setBtLoanAmount(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                    <span>₹ 2 Lakhs</span>
                    <span>₹ 1 Crore</span>
                    <span>₹ 2 Crores</span>
                  </div>
                </div>

                {/* Rate Comparison Slider */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1 bg-rose-50/50 p-3 rounded-xl border border-rose-200">
                    <label className="block text-[11px] font-bold text-rose-900">
                      Current Bank Rate:
                    </label>
                    <div className="text-base font-black text-rose-700">{btCurrentRate}% p.a.</div>
                    <input
                      type="range"
                      min="9"
                      max="24"
                      step="0.25"
                      value={btCurrentRate}
                      onChange={(e) => setBtCurrentRate(Number(e.target.value))}
                      className="w-full accent-rose-600 cursor-pointer h-1.5 bg-rose-200 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1 bg-emerald-50/50 p-3 rounded-xl border border-emerald-200">
                    <label className="block text-[11px] font-bold text-emerald-900">
                      New VGS Partner Rate:
                    </label>
                    <div className="text-base font-black text-emerald-700">{btNewRate}% p.a.</div>
                    <input
                      type="range"
                      min="7.5"
                      max="18"
                      step="0.25"
                      value={btNewRate}
                      onChange={(e) => setBtNewRate(Number(e.target.value))}
                      className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-emerald-200 rounded-lg"
                    />
                  </div>
                </div>

                {/* Remaining Tenure */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-800">
                    <span>Remaining Tenure:</span>
                    <span className="text-blue-600">{btRemainingTenureYears} Years ({btRemainingTenureYears * 12} Months)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="1"
                    value={btRemainingTenureYears}
                    onChange={(e) => setBtRemainingTenureYears(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Savings Output */}
              <div className="lg:col-span-5 bg-white border border-slate-200/90 p-4 sm:p-5 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3.5">
                  {/* Top Savings Card */}
                  <div className="bg-[#EBF5FB] border border-[#D4E6F1] p-3.5 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl sm:text-2xl select-none">🎉</span>
                      <span className="font-bold text-slate-800 text-xs sm:text-sm">Interest Saved</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 tracking-tight">
                      {formatCurrency(btResult.totalSavings)}
                    </div>
                  </div>

                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-center text-xs text-emerald-800 font-bold">
                    Save up to {btResult.percentageSaved}% on total interest payout!
                  </div>

                  {/* Monthly Comparison */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
                      <span className="text-slate-500 block mb-0.5 text-[11px]">Old Monthly EMI:</span>
                      <span className="font-extrabold text-rose-600 text-xs sm:text-sm font-mono line-through">
                        {formatCurrency(btResult.emiOld)}
                      </span>
                    </div>

                    <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200 text-center">
                      <span className="text-emerald-800 font-bold block mb-0.5 text-[11px]">New Monthly EMI:</span>
                      <span className="font-extrabold text-emerald-700 text-xs sm:text-sm font-mono">
                        {formatCurrency(btResult.emiNew)}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-center text-xs text-blue-800 font-bold">
                    Monthly Cashflow Relief: +{formatCurrency(btResult.monthlySavings)} / month
                  </div>
                </div>

                {/* Action Button */}
                <a
                  href="#contact-enquiry"
                  className="w-full mt-2 py-2.5 px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs sm:text-sm flex items-center justify-between shadow-2xs hover:shadow-xs transition-all cursor-pointer text-center block"
                >
                  <span>Apply for Balance Transfer</span>
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-black">➔</span>
                </a>
              </div>
            </div>

            {/* Bottom Disclaimer */}
            <div className="p-3 sm:p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-left space-y-1 mt-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <span>⚠️</span>
                <span>Balance Transfer Note</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-normal">
                Balance transfer savings are calculated assuming a continuous reducing balance schedule without premature part-prepayments. Processing fees and foreclosure charges (if applicable for non-individual borrowers) may apply per RBI / lender guidelines.
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
