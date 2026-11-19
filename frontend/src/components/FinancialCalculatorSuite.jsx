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
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(11.5);
  const [tenureValue, setTenureValue] = useState(36);
  const [tenureUnit, setTenureUnit] = useState('months'); // 'months' | 'years'
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
    <section id="emi-calc" className="py-20 bg-white border-t border-b border-slate-200/80 relative">
      <span id="eligibility" className="absolute -top-24"></span>

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
          <div className="space-y-2 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-xs font-black tracking-wide uppercase">
              <span>📊 Financial Calculation Suite</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#041E2B] tracking-tight">
              Interactive Financial & Loan Calculators
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Calculate your exact monthly installments, estimate your maximum borrowing capacity under 50% FOIR, or check balance transfer savings in one unified hub.
            </p>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs shrink-0 self-start md:self-end">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6EA928] animate-pulse"></span>
            <span>Live Mathematical Reducing Engine</span>
          </div>
        </div>

        {/* =========================================================================
            UNIFIED SWITCHER TABS (All 3 Calculators in One Section)
           ========================================================================= */}
        <div className="bg-slate-50 p-2 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('emi')}
              className={`px-5 py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer text-center ${
                activeTab === 'emi'
                  ? 'bg-gradient-to-r from-[#0A5C80] to-[#0D749E] text-white shadow-md shadow-[#0A5C80]/20 scale-[1.01]'
                  : 'bg-transparent text-slate-600 hover:text-[#0A5C80] hover:bg-white'
              }`}
            >
              <span className="text-lg">🧮</span>
              <span>1. Monthly EMI Calculator</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('eligibility')}
              className={`px-5 py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer text-center ${
                activeTab === 'eligibility'
                  ? 'bg-gradient-to-r from-[#0A5C80] to-[#0D749E] text-white shadow-md shadow-[#0A5C80]/20 scale-[1.01]'
                  : 'bg-transparent text-slate-600 hover:text-[#0A5C80] hover:bg-white'
              }`}
            >
              <span className="text-lg">🛡️</span>
              <span>2. Maximum Loan Eligibility (FOIR)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('transfer')}
              className={`px-5 py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer text-center ${
                activeTab === 'transfer'
                  ? 'bg-gradient-to-r from-[#0A5C80] to-[#0D749E] text-white shadow-md shadow-[#0A5C80]/20 scale-[1.01]'
                  : 'bg-transparent text-slate-600 hover:text-[#0A5C80] hover:bg-white'
              }`}
            >
              <span className="text-lg">🔄</span>
              <span>3. Balance Transfer & Savings</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: MONTHLY EMI CALCULATOR
           ========================================================================= */}
        {activeTab === 'emi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full transition-opacity duration-300">
            {/* Input Controls */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 pb-3">
                <span>Calculator Inputs</span>
                <span className="text-[#6EA928] font-bold">Standard Reducing Rate</span>
              </div>

              {/* Step 1: Loan Amount */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#E8F5D4] text-[#466E18] text-xs flex items-center justify-center font-bold">1</span>
                    Enter Loan Amount (₹)
                  </label>
                  <div className="relative w-44">
                    <span className="absolute left-3 top-2 text-slate-400 text-xs font-bold">₹</span>
                    <input
                      type="number"
                      min="10000"
                      max="10000000"
                      step="10000"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl pl-7 pr-3 py-1.5 text-xs font-bold text-[#0A5C80] text-right focus:outline-none focus:border-[#6EA928] shadow-sm"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-[#6EA928] cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>₹ 10,000</span>
                  <span>₹ 50 Lakhs</span>
                  <span>₹ 1 Crore</span>
                </div>
                {/* Preset Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[100000, 500000, 1000000, 2500000, 5000000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setLoanAmount(amt)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                        loanAmount === amt
                          ? 'bg-[#0A5C80] text-white border-[#0A5C80]'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      ₹{amt >= 10000000 ? `${amt / 10000000}Cr` : amt >= 100000 ? `${amt / 100000}L` : `${amt / 1000}K`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Interest Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#E8F5D4] text-[#466E18] text-xs flex items-center justify-center font-bold">2</span>
                    Enter Interest Rate (% p.a.)
                  </label>
                  <div className="relative w-28">
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="36"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-xl pr-7 pl-3 py-1.5 text-xs font-bold text-[#0A5C80] text-right focus:outline-none focus:border-[#6EA928] shadow-sm"
                    />
                    <span className="absolute right-3 top-2 text-slate-400 text-xs font-bold">%</span>
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="36"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#0A5C80] cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>1%</span>
                  <span>8.5% (Home)</span>
                  <span>11.5% (Personal)</span>
                  <span>36%</span>
                </div>
                {/* Rate Preset Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[
                    { label: 'Home: 8.5%', rate: 8.5 },
                    { label: 'Personal: 11.5%', rate: 11.5 },
                    { label: 'Business: 14%', rate: 14.0 },
                    { label: 'Car / Vehicle: 9%', rate: 9.0 }
                  ].map((p) => (
                    <button
                      key={p.rate}
                      type="button"
                      onClick={() => setInterestRate(p.rate)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                        interestRate === p.rate
                          ? 'bg-[#6EA928] text-white border-[#6EA928]'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Loan Tenure */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#E8F5D4] text-[#466E18] text-xs flex items-center justify-center font-bold">3</span>
                    Select Loan Tenure
                  </label>
                  <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-slate-100 text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => {
                        if (tenureUnit === 'years') {
                          setTenureUnit('months');
                          setTenureValue(Math.min(84, tenureValue * 12));
                        }
                      }}
                      className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                        tenureUnit === 'months' ? 'bg-[#0A5C80] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Months
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (tenureUnit === 'months') {
                          setTenureUnit('years');
                          setTenureValue(Math.max(1, Math.round(tenureValue / 12)));
                        }
                      }}
                      className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                        tenureUnit === 'years' ? 'bg-[#0A5C80] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Years
                    </button>
                  </div>
                </div>

                <input
                  type="range"
                  min={tenureUnit === 'years' ? 1 : 6}
                  max={tenureUnit === 'years' ? 30 : 84}
                  step={tenureUnit === 'years' ? 1 : 6}
                  value={tenureValue}
                  onChange={(e) => setTenureValue(Number(e.target.value))}
                  className="w-full accent-[#0A5C80] cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Selected: <strong className="text-[#0A5C80]">{tenureValue} {tenureUnit} ({tenureInMonths} Months)</strong></span>
                  <span>Max: {tenureUnit === 'years' ? '30 Years' : '84 Months'}</span>
                </div>
              </div>

              {/* Step 4 Trigger Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleManualRecalculate}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold border flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm ${
                    isRecalculated
                      ? 'bg-[#E8F5D4] text-[#466E18] border-[#6EA928]'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                  }`}
                >
                  <span>🔄</span> <span>4. Recalculate Estimated EMI</span>
                </button>
              </div>
            </div>

            {/* Output Displays */}
            <div className={`lg:col-span-5 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 flex flex-col justify-between transition-all duration-300 ${
              pulseOutput ? 'ring-2 ring-[#6EA928] scale-[1.01]' : ''
            }`}>
              <div className="space-y-4">
                <div className="text-xs uppercase font-bold tracking-wider text-slate-700 border-b border-slate-200 pb-3 flex justify-between items-center">
                  <span>Output Breakdown</span>
                  <span className="text-xs text-[#6EA928] font-bold">Standard Reducing Rate</span>
                </div>

                {/* Main EMI Highlight */}
                <div className="bg-gradient-to-br from-[#F4F9EC] to-white border border-[#6EA928]/40 p-5 rounded-2xl text-center shadow-xs">
                  <span className="text-xs text-slate-600 font-bold block mb-1">
                    💰 5. Estimated Monthly EMI
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#041E2B] font-mono tracking-tight">
                    {formatCurrency(calculation.monthlyEmi)}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium block mt-1">
                    Payable every month for {tenureInMonths} months
                  </span>
                </div>

                {/* Total Interest & Total Payment */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center">
                    <span className="text-[11px] text-slate-500 font-bold uppercase block mb-1">6. Total Interest</span>
                    <span className="text-base sm:text-lg font-black text-[#0A5C80] font-mono block">
                      {formatCurrency(calculation.totalInterest)}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">({calculation.interestPercent}% of payment)</span>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-center">
                    <span className="text-[11px] text-slate-500 font-bold uppercase block mb-1">7. Total Payment</span>
                    <span className="text-base sm:text-lg font-black text-slate-900 font-mono block">
                      {formatCurrency(calculation.totalPayment)}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Principal + Interest</span>
                  </div>
                </div>

                {/* Visual Ratio Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-[#0A5C80] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#0A5C80]"></span> Principal: {calculation.principalPercent}%
                    </span>
                    <span className="text-[#6EA928] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#6EA928]"></span> Interest: {calculation.interestPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                    <div style={{ width: `${calculation.principalPercent}%` }} className="bg-[#0A5C80] transition-all duration-500" />
                    <div style={{ width: `${calculation.interestPercent}%` }} className="bg-[#6EA928] transition-all duration-500" />
                  </div>
                </div>
              </div>

              {/* Action Apply Button */}
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
                className="w-full py-3.5 rounded-xl bg-[#6EA928] hover:bg-[#5A8B1F] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#6EA928]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Apply with this Calculated EMI ({formatCurrency(calculation.monthlyEmi)}) ➔</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: MAXIMUM LOAN ELIGIBILITY (FOIR 50%)
           ========================================================================= */}
        {activeTab === 'eligibility' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full transition-opacity duration-300">
            {/* Input Controls */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 pb-2.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#E8F5D4] text-[#466E18] text-xs flex items-center justify-center font-bold">1</span>
                  Enter Your Income Details
                </span>
                <span className="text-slate-400 text-[11px] font-normal">FOIR 50% Benchmark</span>
              </div>

              {/* Monthly Income */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase text-slate-700">
                    Monthly Net Take-Home Income
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">In-Hand Salary</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    min="5000"
                    step="1000"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-4 py-2.5 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#6EA928] shadow-sm"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[25000, 45000, 75000, 150000, 300000].map((inc) => (
                    <button
                      key={inc}
                      type="button"
                      onClick={() => setIncome(inc)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                        income === inc
                          ? 'bg-[#0A5C80] text-white border-[#0A5C80]'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
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
                  <label className="block text-xs font-bold uppercase text-slate-700">
                    Current Existing EMIs / Obligations
                  </label>
                  <span className="text-[11px] text-slate-500 font-medium">Ongoing Loans</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={existingEmi}
                    onChange={(e) => setExistingEmi(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-4 py-2.5 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#6EA928] shadow-sm"
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[0, 5000, 15000, 25000].map((eAmt) => (
                    <button
                      key={eAmt}
                      type="button"
                      onClick={() => setExistingEmi(eAmt)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors cursor-pointer ${
                        existingEmi === eAmt
                          ? 'bg-[#0A5C80] text-white border-[#0A5C80]'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {eAmt === 0 ? 'No EMIs (₹0)' : `₹${eAmt / 1000}K`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Loan Category Selector */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase text-slate-700">
                    Loan Type & Interest Rate
                  </label>
                  <span className="text-xs font-extrabold text-[#6EA928]">{currentRate}% p.a.</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(categoryRates).map(([key, data]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setLoanCategory(key)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        loanCategory === key
                          ? 'bg-[#E8F5D4] border-[#6EA928] text-[#466E18] font-bold shadow-xs'
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
                <label className="block text-xs font-bold uppercase text-slate-700">
                  Preferred Tenure (Repayment Period)
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 5, 7].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setTenureYears(yr)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        tenureYears === yr
                          ? 'bg-[#0A5C80] text-white border-[#0A5C80] shadow-xs'
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
            <div className="lg:col-span-5 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Credit Assessment Result
                  </span>
                  <span className="text-[11px] font-bold text-[#466E18] bg-[#E8F5D4] px-2.5 py-0.5 rounded-full border border-[#6EA928]/30">
                    Standard Bank FOIR 50%
                  </span>
                </div>

                {/* Highlight Result */}
                <div className="bg-gradient-to-br from-[#F4F9EC] to-white border border-[#6EA928]/40 p-5 rounded-2xl text-center shadow-xs">
                  <span className="text-xs text-slate-600 font-bold block mb-1">
                    Estimated Maximum Loan Amount:
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#041E2B] font-mono tracking-tight">
                    {formatCurrency(maxLoan)}
                  </div>
                  <span className="text-xs text-emerald-700 font-bold block mt-1.5">
                    Max Safe EMI: {formatCurrency(maxAllowedEmi)} / month
                  </span>
                </div>

                {/* Calculation Table */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-1.5 flex justify-between">
                    <span>How this is Calculated:</span>
                    <span className="text-[#6EA928]">FOIR 50%</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Monthly Net Income:</span>
                    <span className="font-bold text-slate-800">{formatCurrency(income)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Max Allowed for Loans (50%):</span>
                    <span className="font-bold text-slate-800">{formatCurrency(foirMaxEmi)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Less: Existing EMIs:</span>
                    <span className="font-bold text-rose-600">- {formatCurrency(existingEmi)}</span>
                  </div>
                  <div className="flex justify-between text-slate-700 border-t border-slate-200 pt-1.5 font-bold">
                    <span>Available EMI Capacity:</span>
                    <span className="text-[#0A5C80]">{formatCurrency(maxAllowedEmi)} / mo</span>
                  </div>
                  <div className="flex justify-between text-slate-600 pt-1">
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
                className="w-full py-3.5 rounded-xl bg-[#6EA928] hover:bg-[#5A8B1F] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#6EA928]/30 transition-all cursor-pointer text-center"
              >
                Apply with this Eligible Amount ({formatCurrency(maxLoan)}) ➔
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: BALANCE TRANSFER & SAVINGS CALCULATOR
           ========================================================================= */}
        {activeTab === 'transfer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full transition-opacity duration-300">
            {/* Input Controls */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 pb-3">
                <span>Existing Loan Parameters</span>
                <span className="text-[#6EA928] font-bold">Reduce Interest Payout</span>
              </div>

              {/* Outstanding Loan Principal */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs sm:text-sm font-bold text-slate-800">
                    Existing Outstanding Loan Amount (₹)
                  </label>
                  <span className="font-bold text-[#0A5C80] text-xs">{formatCurrency(btLoanAmount)}</span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="20000000"
                  step="50000"
                  value={btLoanAmount}
                  onChange={(e) => setBtLoanAmount(Number(e.target.value))}
                  className="w-full accent-[#0A5C80] cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>₹ 2 Lakhs</span>
                  <span>₹ 1 Crore</span>
                  <span>₹ 2 Crores</span>
                </div>
              </div>

              {/* Rate Comparison Slider */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 bg-rose-50/50 p-4 rounded-2xl border border-rose-200">
                  <label className="block text-xs font-bold text-rose-900">
                    Current Bank Interest Rate:
                  </label>
                  <div className="text-lg font-black text-rose-700">{btCurrentRate}% p.a.</div>
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

                <div className="space-y-1.5 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-200">
                  <label className="block text-xs font-bold text-emerald-900">
                    New VGS Partner Rate:
                  </label>
                  <div className="text-lg font-black text-emerald-700">{btNewRate}% p.a.</div>
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
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-800">
                  <span>Remaining Tenure:</span>
                  <span className="text-[#0A5C80]">{btRemainingTenureYears} Years ({btRemainingTenureYears * 12} Months)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="1"
                  value={btRemainingTenureYears}
                  onChange={(e) => setBtRemainingTenureYears(Number(e.target.value))}
                  className="w-full accent-[#6EA928] cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
              </div>
            </div>

            {/* Savings Output */}
            <div className="lg:col-span-5 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6 flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Interest Savings Summary
                  </span>
                  <span className="text-[11px] font-bold text-[#466E18] bg-[#E8F5D4] px-2.5 py-0.5 rounded-full border border-[#6EA928]/30">
                    Save up to {btResult.percentageSaved}%
                  </span>
                </div>

                {/* Big Total Savings Badge */}
                <div className="bg-gradient-to-br from-[#F4F9EC] to-white border border-[#6EA928]/40 p-5 rounded-2xl text-center shadow-xs">
                  <span className="text-xs text-slate-600 font-bold block mb-1">
                    🎉 Total Estimated Interest Saved:
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#466E18] font-mono tracking-tight">
                    {formatCurrency(btResult.totalSavings)}
                  </div>
                  <span className="text-xs text-slate-500 font-medium block mt-1.5">
                    Over remaining {btRemainingTenureYears} years tenure
                  </span>
                </div>

                {/* Monthly EMI Comparison */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-center">
                    <span className="text-slate-500 block mb-1">Old Monthly EMI:</span>
                    <span className="font-extrabold text-slate-800 text-sm font-mono line-through text-rose-600">
                      {formatCurrency(btResult.emiOld)}
                    </span>
                  </div>

                  <div className="bg-[#E8F5D4] p-3.5 rounded-2xl border border-[#6EA928]/40 text-center">
                    <span className="text-[#466E18] font-bold block mb-1">New Monthly EMI:</span>
                    <span className="font-extrabold text-[#466E18] text-sm font-mono">
                      {formatCurrency(btResult.emiNew)}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-center text-xs text-[#0A5C80] font-bold">
                  Monthly Cashflow Relief: +{formatCurrency(btResult.monthlySavings)} / month!
                </div>
              </div>

              {/* Action Button */}
              <a
                href="#contact-enquiry"
                className="w-full py-3.5 rounded-xl bg-[#6EA928] hover:bg-[#5A8B1F] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#6EA928]/30 transition-all cursor-pointer text-center block"
              >
                Apply for Loan Balance Transfer ➔
              </a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
