import { useState } from 'react';

export default function EligibilityChecker({ onApplyWithEligibleAmount }) {
  const [income, setIncome] = useState(45000);
  const [existingEmi, setExistingEmi] = useState(5000);
  const [tenureYears, setTenureYears] = useState(3);
  const [interestRate] = useState(11.5);

  const calculateEligibility = () => {
    const monthlyInc = parseFloat(income) || 0;
    const existing = parseFloat(existingEmi) || 0;
    const maxAllowedEmi = Math.max(0, (monthlyInc * 0.50) - existing);

    const tenureMonths = tenureYears * 12;
    const r = (interestRate / 12) / 100;

    let maxLoan = 0;
    if (maxAllowedEmi > 0 && r > 0 && tenureMonths > 0) {
      maxLoan = Math.round((maxAllowedEmi * (Math.pow(1 + r, tenureMonths) - 1)) / (r * Math.pow(1 + r, tenureMonths)));
    }

    return {
      maxAllowedEmi: Math.round(maxAllowedEmi),
      maxLoan: Math.round(maxLoan)
    };
  };

  const { maxAllowedEmi, maxLoan } = calculateEligibility();

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="eligibility" className="py-16 bg-slate-900/60 border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Credit Assessment
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Check Your Maximum Loan Eligibility
          </h2>
          <p className="text-sm text-slate-400">
            Estimate your loan borrowing capacity based on your monthly income and current commitments.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Input Controls */}
            <div className="space-y-5">
              
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Monthly Net Take-Home Income
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 font-bold">₹</span>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-4 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Current Existing EMIs / Obligations
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 font-bold">₹</span>
                  <input
                    type="number"
                    value={existingEmi}
                    onChange={(e) => setExistingEmi(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-4 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Preferred Tenure
                </label>
                <select
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-medium text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value={1}>1 Year (12 Months)</option>
                  <option value={2}>2 Years (24 Months)</option>
                  <option value={3}>3 Years (36 Months)</option>
                  <option value={5}>5 Years (60 Months)</option>
                  <option value={7}>7 Years (84 Months)</option>
                </select>
              </div>

            </div>

            {/* Eligibility Result Box */}
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-700/80 p-6 rounded-2xl text-center space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                ✓ Eligibility Criteria (Standard FOIR 50%)
              </span>

              <div className="space-y-1">
                <div className="text-xs text-slate-400">Estimated Maximum Loan Amount:</div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                  {formatCurrency(maxLoan)}
                </div>
                <div className="text-xs text-slate-500">
                  Max Allowable EMI: <span className="text-slate-300 font-bold">{formatCurrency(maxAllowedEmi)} / month</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onApplyWithEligibleAmount({ amount: maxLoan, tenureMonths: tenureYears * 12 })}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  Apply with this Eligible Amount ➔
                </button>
              </div>

              {/* Indicative Notice */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-left flex items-start gap-2">
                <span className="text-xs mt-0.5">⚠️</span>
                <p className="text-[11px] leading-relaxed">
                  <strong>Important:</strong> EMI calculations and loan information displayed on the website are indicative. Final interest rates, eligibility, approval, sanction, tenure, processing fees and loan terms are subject to the respective lender / financial institution.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
