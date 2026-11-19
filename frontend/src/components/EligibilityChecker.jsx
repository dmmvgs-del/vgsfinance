import { useState } from 'react';

export default function EligibilityChecker({ onApplyWithEligibleAmount }) {
  const [income, setIncome] = useState(45000);
  const [existingEmi, setExistingEmi] = useState(5000);
  const [tenureYears, setTenureYears] = useState(3);
  const [loanCategory, setLoanCategory] = useState('personal'); // 'personal' | 'home' | 'business' | 'car'

  // Standard benchmark bank interest rates by category
  const categoryRates = {
    personal: { label: 'Personal Loan', rate: 11.5 },
    home: { label: 'Home Loan', rate: 8.5 },
    business: { label: 'Business Loan', rate: 12.0 },
    car: { label: 'Car / Vehicle Loan', rate: 9.0 }
  };

  const currentRate = categoryRates[loanCategory]?.rate || 11.5;

  // Actuarial Reducing Balance Loan Eligibility Engine (FOIR 50% Benchmark)
  const calculateEligibility = () => {
    const monthlyInc = parseFloat(income) || 0;
    const existing = parseFloat(existingEmi) || 0;
    
    // 50% Fixed Obligation to Income Ratio (FOIR)
    const foirMaxEmi = monthlyInc * 0.50;
    const maxAllowedEmi = Math.max(0, foirMaxEmi - existing);

    const tenureMonths = tenureYears * 12;
    const r = (currentRate / 12) / 100;

    let maxLoan = 0;
    if (maxAllowedEmi > 0 && r > 0 && tenureMonths > 0) {
      // Present Value of Ordinary Annuity formula: PV = EMI * [(1+r)^n - 1] / [r * (1+r)^n]
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

  const { foirMaxEmi, maxAllowedEmi, maxLoan, totalRepayment, estimatedInterest, tenureMonths } = calculateEligibility();

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  // Pre-fill sample values for user walkthrough
  const handleLoadSample = (sampleType = 'standard') => {
    if (sampleType === 'entry') {
      setIncome(10000);
      setExistingEmi(0);
      setTenureYears(1);
      setLoanCategory('personal');
    } else {
      setIncome(30000);
      setExistingEmi(5000);
      setTenureYears(3);
      setLoanCategory('personal');
    }
  };

  return (
    <section id="eligibility" className="py-16 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Section Header */}
        <div className="text-left max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-xs font-black tracking-wide uppercase">
            <span>🛡️ Credit Capacity Assessment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#041E2B] tracking-tight">
            Check Your Maximum Loan Eligibility
          </h2>
          <p className="text-sm text-slate-600">
            Estimate your maximum borrowing capacity based on standard bank FOIR (50% Fixed Obligation to Income Ratio) norms.
          </p>
        </div>

        {/* Main 3-Column Container */}
        <div className="w-full bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Column 1: Input Controls (5 Cols on LG) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 pb-2.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#E8F5D4] text-[#466E18] text-xs flex items-center justify-center font-bold">1</span>
                  Enter Your Income Details
                </span>
                <span className="text-slate-400 text-[11px] font-normal">Step 1 of 2</span>
              </div>

              {/* Monthly Net Income */}
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
                    onChange={(e) => setIncome(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-4 py-2 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#6EA928] focus:bg-white shadow-sm"
                  />
                </div>
                {/* Quick income selector chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[10000, 25000, 45000, 75000, 100000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setIncome(val)}
                      className={`text-[10px] px-2 py-0.5 rounded-md font-bold transition-colors cursor-pointer border ${
                        income === val
                          ? 'bg-[#0A5C80] text-white border-[#0A5C80]'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
                      }`}
                    >
                      ₹{val >= 100000 ? `${val / 100000}L` : `${val / 1000}K`}
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
                    onChange={(e) => setExistingEmi(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-4 py-2 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#6EA928] focus:bg-white shadow-sm"
                  />
                </div>
                {/* Quick existing EMI chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {[0, 2500, 5000, 10000].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setExistingEmi(val)}
                      className={`text-[10px] px-2 py-0.5 rounded-md font-bold transition-colors cursor-pointer border ${
                        existingEmi === val
                          ? 'bg-[#0A5C80] text-white border-[#0A5C80]'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200'
                      }`}
                    >
                      {val === 0 ? 'No EMIs (₹0)' : `₹${val / 1000}K`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Loan Category Selector */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-bold uppercase text-slate-700">
                    Loan Type & Interest Rate
                  </label>
                  <span className="text-[11px] text-[#6EA928] font-bold">{currentRate}% p.a.</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(categoryRates).map(([key, item]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setLoanCategory(key)}
                      className={`px-2.5 py-1.5 rounded-xl text-left border text-xs font-bold transition-all cursor-pointer flex justify-between items-center ${
                        loanCategory === key
                          ? 'bg-[#E8F5D4] border-[#6EA928] text-[#0A5C80] shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="truncate">{item.label}</span>
                      <span className="text-[10px] text-slate-500 ml-1 shrink-0">{item.rate}%</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Tenure */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase text-slate-700">
                  Preferred Tenure (Repayment Period)
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[1, 2, 3, 5, 7].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setTenureYears(yr)}
                      className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border text-center ${
                        tenureYears === yr
                          ? 'bg-[#0A5C80] border-[#0A5C80] text-white shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      {yr} {yr === 1 ? 'Year' : 'Yrs'}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-slate-500 text-right">
                  Selected: <strong className="text-[#0A5C80]">{tenureYears} Years ({tenureYears * 12} Months)</strong>
                </div>
              </div>

            </div>

            {/* Column 2: Eligibility Result Box (4 Cols on LG) */}
            <div className="lg:col-span-4 bg-gradient-to-b from-[#E8F5D4]/50 to-white border border-[#6EA928]/40 p-6 rounded-3xl text-center space-y-5 shadow-md flex flex-col justify-between">
              
              <div className="space-y-4">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black bg-[#E8F5D4] text-[#466E18] border border-[#6EA928]/40 uppercase tracking-wide">
                  ✓ Standard Bank FOIR 50%
                </span>

                <div className="space-y-1.5 py-1">
                  <div className="text-xs font-semibold text-slate-600">Estimated Maximum Loan Amount:</div>
                  <div className="text-3xl sm:text-4xl font-black text-[#466E18] font-mono tracking-tight">
                    {formatCurrency(maxLoan)}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Max Safe EMI: <strong className="text-[#0A5C80] text-sm font-bold">{formatCurrency(maxAllowedEmi)} / month</strong>
                  </div>
                </div>

                {/* Mathematical FOIR Step Breakdown */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 text-left space-y-2 text-xs">
                  <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider border-b border-slate-100 pb-1.5 flex justify-between">
                    <span>How This is Calculated:</span>
                    <span className="text-[#6EA928]">FOIR 50%</span>
                  </div>
                  <div className="space-y-1 text-slate-600 text-[11px]">
                    <div className="flex justify-between">
                      <span>Monthly Net Income:</span>
                      <span className="font-semibold text-slate-900">{formatCurrency(income)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Allowed for Loans (50%):</span>
                      <span className="font-semibold text-slate-900">{formatCurrency(foirMaxEmi)}</span>
                    </div>
                    <div className="flex justify-between text-rose-600">
                      <span>Less: Existing EMIs:</span>
                      <span className="font-semibold">- {formatCurrency(existingEmi)}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-100 pt-1 text-[#0A5C80] font-bold">
                      <span>Available EMI Capacity:</span>
                      <span>{formatCurrency(maxAllowedEmi)} / mo</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-100 pt-1 text-slate-700">
                      <span>Total Repayment ({tenureMonths}m):</span>
                      <span className="font-semibold">{formatCurrency(totalRepayment)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onApplyWithEligibleAmount({ amount: maxLoan, tenureMonths })}
                  className="w-full py-3.5 rounded-xl font-bold text-xs bg-[#6EA928] hover:bg-[#5A8B1F] text-white shadow-lg shadow-[#6EA928]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Apply with this Eligible Amount</span>
                  <span>➔</span>
                </button>
              </div>

            </div>

            {/* Column 3: How to Fill Guide & Live Sample Walkthrough (3 Cols on LG) */}
            <div className="lg:col-span-3 bg-slate-50 border border-slate-200 p-5 sm:p-6 rounded-3xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">💡</span>
                  <h3 className="text-xs sm:text-sm font-bold text-[#041E2B] uppercase tracking-wide">
                    How to Fill & Sample
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-[#0A5C80] bg-[#E8F5D4] px-2 py-0.5 rounded-md">
                  Guide
                </span>
              </div>

              {/* Simple Step-by-Step explanation in English & Telugu */}
              <div className="space-y-2.5 text-xs text-slate-600">
                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 space-y-1">
                  <strong className="text-slate-900 block text-[11px]">1. Net Income (శాలరీ):</strong>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    మీ చేతికి వచ్చే నెట్ నెలసరి జీతం లేదా వ్యాపార లాభాన్ని ఎంటర్ చేయండి.
                  </p>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 space-y-1">
                  <strong className="text-slate-900 block text-[11px]">2. Existing EMI (ప్రస్తుత లోన్లు):</strong>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    ఇప్పటికే ఉన్న బైక్, కార్ లేదా పర్సనల్ లోన్ల నెలసరి EMI లు. ఏమీ లేకపోతే ₹0 ఉంచండి.
                  </p>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200/80 space-y-1">
                  <strong className="text-slate-900 block text-[11px]">3. Tenure (కాలపరిమితి):</strong>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    ఎక్కువ కాలపరిమితి (3-5 సం||లు) ఎంచుకుంటే ఎక్కువ లోన్ అమౌంట్ ఎలిజిబిలిటీ వస్తుంది.
                  </p>
                </div>
              </div>

              {/* Sample Calculation Card */}
              <div className="bg-white p-3 rounded-xl border border-[#0A5C80]/30 shadow-xs space-y-2">
                <div className="flex justify-between items-center text-[11px] font-bold text-[#0A5C80] border-b border-slate-100 pb-1">
                  <span>📌 Sample Example:</span>
                  <span className="text-[#6EA928] font-mono">₹30K Salary</span>
                </div>
                <div className="text-[11px] space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>Income: ₹30,000</span>
                    <span>EMI: ₹5,000</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Available Capacity:</span>
                    <span className="text-[#0A5C80]">₹10,000/mo</span>
                  </div>
                  <div className="flex justify-between font-black text-[#466E18] border-t border-slate-100 pt-1">
                    <span>Eligible (3 Yrs):</span>
                    <span>₹ 3,03,374</span>
                  </div>
                </div>
              </div>

              {/* 1-Click Try Sample Buttons */}
              <div className="space-y-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleLoadSample('standard')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#E8F5D4] border border-[#6EA928]/50 text-[#466E18] text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                >
                  <span>⚡ Load ₹30K Sample</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadSample('entry')}
                  className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                >
                  <span>⚡ Load ₹10K Sample (1 Yr)</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
