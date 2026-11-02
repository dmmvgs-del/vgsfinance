import { useState, useEffect } from 'react';

export default function EmiCalculator({ onApplyWithCalculation }) {
  // Steps 1, 2, 3: Inputs
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(11.5);
  const [tenureValue, setTenureValue] = useState(36);
  const [tenureUnit, setTenureUnit] = useState('months'); // 'months' | 'years'

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
    const p = parseFloat(loanAmount) || 0;
    const r = (parseFloat(interestRate) || 0) / 12 / 100;
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
    <section id="emi-calc" className="py-16 bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider">
            <span>🧮</span> Phase 5: EMI Calculator Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Financial EMI Calculator
          </h2>
          <p className="text-sm text-slate-400">
            Follow the 7-step calculation workflow below to determine your exact monthly installment and interest schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Steps 1, 2, 3: Input Controls */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
            
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between border-b border-slate-800 pb-3">
              <span>Calculator Inputs</span>
              <span className="text-emerald-400">Live Mathematical Formula</span>
            </div>

            {/* Step 1: Enter Loan Amount */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold">1</span>
                  Enter Loan Amount (₹)
                </label>
                <div className="relative w-44">
                  <span className="absolute left-3 top-2 text-slate-500 text-xs font-bold">₹</span>
                  <input
                    type="number"
                    min="10000"
                    max="10000000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-7 pr-3 py-1.5 text-xs font-bold text-emerald-400 text-right focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <input
                type="range"
                min="25000"
                max="5000000"
                step="25000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>₹ 25,000</span>
                <span>₹ 25 Lakhs</span>
                <span>₹ 50 Lakhs</span>
              </div>
            </div>

            {/* Step 2: Enter Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 text-xs flex items-center justify-center font-bold">2</span>
                  Enter Interest Rate (% p.a.)
                </label>
                <div className="relative w-28">
                  <input
                    type="number"
                    min="5"
                    max="30"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-3 pr-7 py-1.5 text-xs font-bold text-sky-400 text-right focus:outline-none focus:border-sky-500"
                  />
                  <span className="absolute right-3 top-2 text-slate-500 text-xs font-bold">%</span>
                </div>
              </div>
              <input
                type="range"
                min="7"
                max="24"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>7% (Home Loan)</span>
                <span>11.5% (Personal)</span>
                <span>24%</span>
              </div>
            </div>

            {/* Step 3: Select Loan Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 text-xs flex items-center justify-center font-bold">3</span>
                  Select Loan Tenure
                </label>
                
                {/* Months vs Years Unit Switcher */}
                <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-xl border border-slate-700 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      if (tenureUnit === 'years') {
                        setTenureValue(tenureValue * 12);
                        setTenureUnit('months');
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                      tenureUnit === 'months' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
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
                      tenureUnit === 'years' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
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
                className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />

              <div className="flex justify-between text-xs text-slate-400 font-medium">
                <span>Selected: <strong className="text-indigo-300">{tenureValue} {tenureUnit} ({tenureInMonths} Months)</strong></span>
                <span>Max: {tenureUnit === 'years' ? '20 Years' : '84 Months'}</span>
              </div>
            </div>

            {/* Step 4 Trigger Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={calculateEmi}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                🔄 4. Recalculate Estimated EMI
              </button>
            </div>

          </div>

          {/* Steps 5, 6, 7: Output Displays */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/80 border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div className="text-xs uppercase font-bold tracking-wider text-slate-400 border-b border-slate-800 pb-3 flex justify-between items-center">
                <span>Output Breakdown</span>
                <span className="text-emerald-400 font-bold">Standard Reducing Rate</span>
              </div>

              {/* Step 5: Display Estimated Monthly EMI */}
              <div className="p-6 rounded-2xl bg-black/50 border border-amber-500/30 text-center space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-bold flex items-center justify-center gap-1">
                  <span>💰</span> 5. Estimated Monthly EMI
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                  {formatCurrency(calculation.monthlyEmi)}
                </div>
                <div className="text-[11px] text-slate-400">Payable every month for {tenureInMonths} months</div>
              </div>

              {/* Steps 6 & 7: Total Interest & Estimated Total Payment */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Step 6: Display Total Interest */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    6. Total Interest
                  </span>
                  <div className="text-lg font-black text-rose-400">
                    {formatCurrency(calculation.totalInterest)}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    ({calculation.interestPercent}% of payment)
                  </div>
                </div>

                {/* Step 7: Display Estimated Total Payment */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    7. Total Payment
                  </span>
                  <div className="text-lg font-black text-sky-400">
                    {formatCurrency(calculation.totalPayment)}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Principal + Interest
                  </div>
                </div>
              </div>

              {/* Visual Proportion Bar (Principal vs Interest) */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>Principal: {calculation.principalPercent}%</span>
                  <span>Interest: {calculation.interestPercent}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden flex">
                  <div
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${calculation.principalPercent}%` }}
                    title="Principal"
                  ></div>
                  <div
                    className="bg-rose-500 h-full transition-all duration-300"
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
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Apply with this Calculated EMI ({formatCurrency(calculation.monthlyEmi)}) ➔
            </button>

            {/* Statutory Indicative Calculation Notice */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
              <span className="text-sm mt-0.5">⚠️</span>
              <p className="leading-relaxed text-[11px] sm:text-xs">
                <strong>Important:</strong> EMI calculations and loan information displayed on the website are indicative. Final interest rates, eligibility, approval, sanction, tenure, processing fees and loan terms are subject to the respective lender / financial institution.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
