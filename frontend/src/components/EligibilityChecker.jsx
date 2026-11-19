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
    <section id="eligibility" className="py-16 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        <div className="text-left max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-xs font-black tracking-wide uppercase">
            <span>Credit Assessment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#041E2B] tracking-tight">
            Check Your Maximum Loan Eligibility
          </h2>
          <p className="text-sm text-slate-600">
            Estimate your loan borrowing capacity based on your monthly income and current commitments.
          </p>
        </div>

        <div className="w-full bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* Input Controls */}
            <div className="space-y-5">

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Monthly Net Take-Home Income
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-4 py-2.5 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#6EA928] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Current Existing EMIs / Obligations
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    value={existingEmi}
                    onChange={(e) => setExistingEmi(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-4 py-2.5 text-slate-900 font-bold text-sm focus:outline-none focus:border-[#6EA928] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Preferred Tenure
                </label>
                <select
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 font-medium text-sm focus:outline-none focus:border-[#6EA928] focus:bg-white cursor-pointer"
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
            <div className="bg-[#E8F5D4]/40 border border-[#6EA928]/40 p-6 rounded-2xl text-center space-y-4 shadow-sm">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#E8F5D4] text-[#466E18] border border-[#6EA928]/40">
                ✓ Eligibility Criteria (Standard FOIR 50%)
              </span>

              <div className="space-y-1">
                <div className="text-xs text-slate-600">Estimated Maximum Loan Amount:</div>
                <div className="text-3xl sm:text-4xl font-black text-[#466E18] font-mono">
                  {formatCurrency(maxLoan)}
                </div>
                <div className="text-xs text-slate-600">
                  Max Allowable EMI: <span className="text-[#0A5C80] font-bold">{formatCurrency(maxAllowedEmi)} / month</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onApplyWithEligibleAmount({ amount: maxLoan, tenureMonths: tenureYears * 12 })}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-[#6EA928] hover:bg-[#5A8B1F] text-white shadow-lg shadow-[#6EA928]/30 transition-all cursor-pointer"
                >
                  Apply with this Eligible Amount ➔
                </button>
              </div>

              {/* Indicative Notice */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-left flex items-start gap-2">
                <span className="text-xs mt-0.5">⚠️</span>
                <p className="text-[11px] leading-relaxed">
                  <strong className="text-amber-950">Important:</strong> EMI calculations and loan information displayed on the website are indicative. Final interest rates, eligibility, approval, sanction, tenure, processing fees and loan terms are subject to the respective lender / financial institution.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
