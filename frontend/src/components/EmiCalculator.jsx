import { useState, useEffect } from 'react';

export default function EmiCalculator({ onApplyWithCalculation }) {
  // Steps 1, 2, 3: Inputs
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(11.5);
  const [tenureValue, setTenureValue] = useState(36);
  const [tenureUnit, setTenureUnit] = useState('months'); // 'months' | 'years'
  const [isRecalculated, setIsRecalculated] = useState(false);
  const [pulseOutput, setPulseOutput] = useState(false);

  // Steps 4, 5, 6, 7: Calculation State
  const [calculation, setCalculation] = useState({
    monthlyEmi: 0,
    totalInterest: 0,
    totalPayment: 0,
    principalPercent: 0,
    interestPercent: 0
  });

  // Step 4: Calculate Estimated EMI Function
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
      // 0% interest edge case
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

  const handleManualRecalculate = () => {
    calculateEmi();
    setIsRecalculated(true);
    setPulseOutput(true);
    setTimeout(() => {
      setIsRecalculated(false);
      setPulseOutput(false);
    }, 1200);
  };

  // Recalculate automatically on input change
  useEffect(() => {
    calculateEmi();
  }, [loanAmount, interestRate, tenureValue, tenureUnit]);

  const tenureInMonths = tenureUnit === 'years' ? tenureValue * 12 : tenureValue;

  const formatCurrency = (amt) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt || 0);
  };

  return (
    <section id="emi-calc" className="py-16 bg-white border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-left max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-xs font-black tracking-wide uppercase">
            <span>🧮</span> <span>Interactive EMI Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#041E2B] tracking-tight">
            Financial EMI Calculator
          </h2>
          <p className="text-sm text-slate-600">
            Determine your exact monthly installment, principal portion, and interest schedule across 15+ partner banks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
          
          {/* Steps 1, 2, 3: Input Controls */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
            
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between border-b border-slate-200 pb-3">
              <span>Calculator Inputs</span>
              <span className="text-[#6EA928] font-bold">Reducing Balance Formula</span>
            </div>

            {/* Step 1: Enter Loan Amount */}
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
              {/* Quick Amount Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[100000, 300000, 500000, 1000000, 2500000, 5000000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setLoanAmount(amt)}
                    className={`text-[10px] px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer border ${
                      loanAmount === amt
                        ? 'bg-[#0A5C80] text-white border-[#0A5C80]'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    ₹{amt >= 10000000 ? `${amt / 10000000}Cr` : amt >= 100000 ? `${amt / 100000}L` : `${amt / 1000}K`}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Enter Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-[#0A5C80] text-xs flex items-center justify-center font-bold">2</span>
                  Enter Interest Rate (% p.a.)
                </label>
                <div className="relative w-28">
                  <input
                    type="number"
                    min="1"
                    max="36"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl pl-3 pr-7 py-1.5 text-xs font-bold text-[#0A5C80] text-right focus:outline-none focus:border-[#0A5C80] shadow-sm"
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
                <span>1% (Low Rate)</span>
                <span>8.5% (Home)</span>
                <span>11.5% (Personal)</span>
                <span>36%</span>
              </div>
              {/* Quick Rate Preset Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  { label: 'Home: 8.5%', val: 8.5 },
                  { label: 'Personal: 11.5%', val: 11.5 },
                  { label: 'Business: 14%', val: 14 },
                  { label: '₹1 Vaddi = 12% p.a.', val: 12 }
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setInterestRate(item.val)}
                    className={`text-[10px] px-2 py-0.5 rounded-md font-bold transition-all cursor-pointer border ${
                      interestRate === item.val
                        ? 'bg-[#6EA928] text-white border-[#6EA928]'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                💡 Note: Bank rates are annual (% per annum). ₹1 per month vaddi = 12% p.a.
              </p>
            </div>

            {/* Step 3: Select Loan Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-[#E8F5D4] text-[#466E18] text-xs flex items-center justify-center font-bold">3</span>
                  Select Loan Tenure
                </label>
                
                {/* Months vs Years Unit Switcher */}
                <div className="flex items-center gap-1 bg-white p-0.5 rounded-xl border border-slate-300 text-xs shadow-sm">
                  <button
                    type="button"
                    onClick={() => {
                      if (tenureUnit === 'years') {
                        setTenureValue(tenureValue * 12);
                        setTenureUnit('months');
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      tenureUnit === 'months' ? 'bg-[#0A5C80] text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Months
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (tenureUnit === 'months') {
                        setTenureValue(Math.max(1, Math.round(tenureValue / 12)));
                        setTenureUnit('years');
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      tenureUnit === 'years' ? 'bg-[#0A5C80] text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Years
                  </button>
                </div>
              </div>

              <input
                type="range"
                min={tenureUnit === 'years' ? 1 : 6}
                max={tenureUnit === 'years' ? 20 : 84}
                step={tenureUnit === 'years' ? 1 : 6}
                value={tenureValue}
                onChange={(e) => setTenureValue(Number(e.target.value))}
                className="w-full accent-[#0A5C80] cursor-pointer h-2 bg-slate-200 rounded-lg"
              />

              <div className="flex justify-between text-xs text-slate-500 font-medium">
                <span>Selected: <strong className="text-[#0A5C80]">{tenureValue} {tenureUnit} ({tenureInMonths} Months)</strong></span>
                <span>Max: {tenureUnit === 'years' ? '20 Years' : '84 Months'}</span>
              </div>

              {/* Quick Tenure Chips */}
              <div className="flex gap-1.5 pt-1">
                {[1, 2, 3, 5, 7].map((yr) => {
                  const val = tenureUnit === 'years' ? yr : yr * 12;
                  const isSelected = tenureUnit === 'years' ? tenureValue === yr : tenureValue === yr * 12;
                  return (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setTenureValue(val)}
                      className={`text-[10px] px-2.5 py-0.5 rounded-md font-bold transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#0A5C80] text-white border-[#0A5C80]'
                          : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {yr} {yr === 1 ? 'Year' : 'Yrs'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4 Trigger Button with Dynamic Feedback */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleManualRecalculate}
                className={`w-full py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm ${
                  isRecalculated
                    ? 'bg-[#E8F5D4] text-[#466E18] border-2 border-[#6EA928] scale-[1.01] shadow-md'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 active:scale-95'
                }`}
              >
                {isRecalculated ? (
                  <>
                    <span className="text-base text-[#6EA928]">✓</span>
                    <span className="text-[#466E18]">4. EMI Recalculated Successfully!</span>
                  </>
                ) : (
                  <>
                    <span className="text-sm">🔄</span>
                    <span>4. Recalculate Estimated EMI</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Steps 5, 6, 7: Output Displays */}
          <div className={`lg:col-span-5 bg-white border rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 flex flex-col justify-between transition-all duration-300 ${
            pulseOutput ? 'border-[#6EA928] ring-4 ring-[#6EA928]/25 scale-[1.01]' : 'border-slate-200/90'
          }`}>
            
            <div className="space-y-4">
              <div className="text-xs uppercase font-bold tracking-wider text-slate-700 border-b border-slate-200 pb-3 flex justify-between items-center">
                <span>Output Breakdown</span>
                <span className="text-[#6EA928] font-bold">Standard Reducing Rate</span>
              </div>

              {/* Step 5: Display Estimated Monthly EMI */}
              <div className="p-6 rounded-2xl bg-[#E8F5D4]/70 border border-[#6EA928]/40 text-center space-y-1 shadow-sm">
                <span className="text-[11px] uppercase tracking-wider text-[#466E18] font-bold flex items-center justify-center gap-1">
                  <span>💰</span> 5. Estimated Monthly EMI
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[#466E18] tracking-tight font-mono">
                  {formatCurrency(calculation.monthlyEmi)}
                </div>
                <div className="text-[11px] text-slate-600">Payable every month for {tenureInMonths} months</div>
              </div>

              {/* Steps 6 & 7: Total Interest & Estimated Total Payment */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Step 6: Display Total Interest */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1 flex flex-col justify-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    6. Total Interest
                  </span>
                  <div className="text-lg font-black text-[#0A5C80]">
                    {formatCurrency(calculation.totalInterest)}
                  </div>
                </div>

                {/* Step 7: Display Estimated Total Payment */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1 flex flex-col justify-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">
                    7. Total Payment
                  </span>
                  <div className="text-lg font-black text-slate-900">
                    {formatCurrency(calculation.totalPayment)}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Principal + Interest
                  </div>
                </div>
              </div>

              {/* Visual Proportion Bar (Principal vs Interest) */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#0A5C80]"></span> Principal: {calculation.principalPercent}%</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#6EA928]"></span> Interest: {calculation.interestPercent}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-200 overflow-hidden flex border border-slate-300">
                  <div
                    className="bg-[#0A5C80] h-full transition-all duration-300"
                    style={{ width: `${calculation.principalPercent}%` }}
                    title="Principal"
                  ></div>
                  <div
                    className="bg-[#6EA928] h-full transition-all duration-300"
                    style={{ width: `${calculation.interestPercent}%` }}
                    title="Interest"
                  ></div>
                </div>
              </div>

            </div>

            {/* Direct Transition to Loan Enquiry */}
            <button
              onClick={() => onApplyWithCalculation({
                amount: loanAmount,
                tenureMonths: tenureInMonths,
                interestRate: interestRate
              })}
              className="w-full py-3.5 bg-[#6EA928] hover:bg-[#5A8B1F] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-[#6EA928]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Apply with this Calculated EMI ({formatCurrency(calculation.monthlyEmi)}) ➔
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
