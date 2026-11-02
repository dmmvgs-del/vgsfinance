import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

export default function ContactEnquiryForm({ selectedProduct, prefillData, onLeadSubmitted }) {
  const [formData, setFormData] = useState({
    productName: 'Personal Loan',
    customerName: '',
    phone: '',
    email: '',
    city: 'Hyderabad',
    requestedAmount: '',
    employmentType: 'Salaried',
    monthlyIncome: '',
    tenureMonths: 36,
    notes: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        productName: selectedProduct.name,
        requestedAmount: selectedProduct.minAmount || prev.requestedAmount,
        tenureMonths: selectedProduct.defaultTenure || prev.tenureMonths
      }));
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (prefillData) {
      setFormData(prev => ({
        ...prev,
        requestedAmount: prefillData.amount || prev.requestedAmount,
        tenureMonths: prefillData.tenureMonths || prev.tenureMonths
      }));
    }
  }, [prefillData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok) {
        setSubmittedLead(data.data);
        setFormData({
          productName: 'Personal Loan',
          customerName: '',
          phone: '',
          email: '',
          city: 'Hyderabad',
          requestedAmount: '',
          employmentType: 'Salaried',
          monthlyIncome: '',
          tenureMonths: 36,
          notes: ''
        });
        if (onLeadSubmitted) onLeadSubmitted();
      } else {
        setErrorMessage(data.message || 'An error occurred while submitting your enquiry.');
      }
    } catch {
      setErrorMessage('Unable to connect to the backend server. Please verify the backend is running.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  const popularLocations = [
    'Hyderabad',
    'Bangalore',
    'Chennai',
    'Vijayawada',
    'Visakhapatnam',
    'Guntur',
    'Tirupati',
    'Warangal',
    'Mumbai',
    'Delhi NCR',
    'Pune',
    'Other City'
  ];

  return (
    <section id="contact-enquiry" className="py-16 bg-slate-900/80 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span>📝</span> Phase 3: Loan Enquiry Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Customer Loan Enquiry Portal
          </h2>
          <p className="text-sm text-slate-400">
            Submit your loan requirements below. Your application is directly stored in our secure database for instant review.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Main Form Box */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 p-6 sm:p-10 rounded-3xl shadow-2xl">
            
            {/* Step 8 & 9 Result Screen: Saved in database with Lead Tracking ID */}
            {submittedLead ? (
              <div className="p-8 rounded-3xl bg-slate-950 border border-emerald-500/40 text-center space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-3xl flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  ✓
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    Step 9: Enquiry Stored in Database
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">
                    Thank you, {submittedLead.customerName}!
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Your enquiry has been registered in the system. The business team can now contact you.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 max-w-md mx-auto text-left text-xs space-y-2">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Lead Tracking ID:</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">{submittedLead.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Loan Type:</span>
                    <span className="font-bold text-white">{submittedLead.productName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Requested Amount:</span>
                    <span className="font-bold text-emerald-400">{formatCurrency(submittedLead.requestedAmount)}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-bold text-slate-300">{submittedLead.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Assigned Lending Officer:</span>
                    <span className="font-bold text-sky-400">{submittedLead.assignedTo}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs max-w-md mx-auto">
                  📞 <strong>Step 13 in progress:</strong> Our loan officer is reviewing your profile and will call you on <strong>{submittedLead.phone}</strong>.
                </div>

                {/* Statutory Indicative Notice */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-left text-xs max-w-md mx-auto flex items-start gap-2">
                  <span className="text-xs mt-0.5">⚠️</span>
                  <p className="text-[11px] leading-relaxed">
                    <strong>Important:</strong> EMI calculations and loan information displayed on the website are indicative. Final interest rates, eligibility, approval, sanction, tenure, processing fees and loan terms are subject to the respective lender / financial institution.
                  </p>
                </div>

                <div className="flex justify-center gap-3 flex-wrap">
                  <a
                    href="#workflow"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    🔍 Track Loan Journey (Phase 6)
                  </a>
                  <button
                    onClick={() => setSubmittedLead(null)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
                  >
                    + Submit Another Loan Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMessage && (
                  <div className="p-4 rounded-2xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-xs">
                    ⚠️ {errorMessage}
                  </div>
                )}

                {/* Pre-fill banner */}
                {(selectedProduct || prefillData) && (
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
                    <span>
                      🎯 Pre-selected: <strong>{formData.productName}</strong>
                      {formData.requestedAmount ? ` — ${formatCurrency(formData.requestedAmount)}` : ''}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, productName: 'Personal Loan', requestedAmount: '' }));
                      }}
                      className="text-[11px] underline text-slate-400 hover:text-white cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                )}

                {/* Step 1: Customer selects Loan Type */}
                <div>
                  <label className="block text-xs font-bold uppercase text-emerald-400 mb-1.5">
                    1. Select Loan Type *
                  </label>
                  <select
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm font-semibold focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Personal Loan">Personal Loan (Quick Unsecured)</option>
                    <option value="Business Loan">Business Loan (Working Capital)</option>
                    <option value="Home Loan">Home Loan (Housing Purchase & Construction)</option>
                    <option value="Car Loan">Car Loan (New & Used Automobile)</option>
                    <option value="Gold Loan">Gold Loan (Instant Collateral Credit)</option>
                    <option value="Education Loan">Education Loan (Domestic & Overseas Studies)</option>
                    <option value="Mortgage Loan">Mortgage Loan (High-Value Real Estate)</option>
                    <option value="Loan Against Property">Loan Against Property (LAP)</option>
                    <option value="Professional Loan">Professional Loan (CA / CS / Architect)</option>
                    <option value="Doctor Loan">Doctor Loan (Clinics & Medical Equipment)</option>
                    <option value="Equipment Loan">Equipment Loan (Machinery & Tools)</option>
                    <option value="Commercial Vehicle Loan">Commercial Vehicle Loan (Trucks & Fleet)</option>
                    <option value="Working Capital Loan">Working Capital Loan (CC / OD)</option>
                    <option value="Self-Employed Professional Loan">Self-Employed Professional Loan</option>
                    <option value="Construction Equipment Loan">Construction Equipment Loan (Heavy Machinery)</option>
                    <option value="Other Financial Products">Other Financial Products (Debt Consolidation / BT)</option>
                  </select>
                </div>

                {/* Step 2 & 3: Name & Mobile Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      2. Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      3. Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98480 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Step 4 & 5: Email & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      4. Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      5. Select Location *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {popularLocations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Step 6: Required Loan Amount */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-emerald-400 mb-1">
                      6. Required Loan Amount (₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-500 font-bold">₹</span>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 500000"
                        value={formData.requestedAmount}
                        onChange={(e) => setFormData({ ...formData, requestedAmount: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-300 mb-1">
                      Preferred Tenure (Months)
                    </label>
                    <input
                      type="number"
                      value={formData.tenureMonths}
                      onChange={(e) => setFormData({ ...formData, tenureMonths: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Step 7: Employment / Business information */}
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    7. Employment & Income Information
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Employment Type
                      </label>
                      <select
                        value={formData.employmentType}
                        onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                      >
                        <option value="Salaried">Salaried (Private / Govt Employee)</option>
                        <option value="Business Owner">Business Owner (Sole Prop / LLP / Pvt Ltd)</option>
                        <option value="Self-Employed">Self-Employed Professional (Doctor, CA, etc.)</option>
                        <option value="Agriculture">Agriculture & Farming</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Monthly Net Income / Turnover (₹)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 50000"
                        value={formData.monthlyIncome}
                        onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-emerald-500 font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                    Purpose of Loan / Remarks
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe your loan requirement (e.g. working capital, home renovation, medical)..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white text-xs focus:outline-none focus:border-emerald-500"
                  ></textarea>
                </div>

                {/* Statutory Regulatory Notice */}
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
                  <span className="text-sm mt-0.5">⚠️</span>
                  <p className="leading-relaxed text-[11px]">
                    <strong>Important:</strong> EMI calculations and loan information displayed on the website are indicative. Final interest rates, eligibility, approval, sanction, tenure, processing fees and loan terms are subject to the respective lender / financial institution.
                  </p>
                </div>

                {/* Step 8: Customer submits enquiry */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm rounded-xl shadow-xl shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Submitting Enquiry to Database...' : '🚀 8. Submit Loan Enquiry'}
                </button>

              </form>
            )}

          </div>

          {/* Quick Help & Branch Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>📞</span> Step 13: Instant Business Desk
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our financial advisory and business development team reaches out promptly upon enquiry submission:
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
                  <span className="text-lg">📱</span>
                  <div>
                    <div className="text-slate-400">Direct Loan Hotline:</div>
                    <a href="tel:+919848012345" className="font-bold text-emerald-400 text-sm hover:underline">
                      +91 98480 12345
                    </a>
                  </div>
                </div>

                {/* Step 5: WhatsApp Integration */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">💬</span>
                    <div>
                      <div className="text-slate-400 text-[11px]">Instant WhatsApp Desk:</div>
                      <div className="font-bold text-emerald-300 text-xs">+91 98480 12345</div>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/919848012345?text=Hello%20VGS%20Finance,%20I%20would%20like%20to%20enquire%20about%20a%20loan%20scheme."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] rounded-lg shadow cursor-pointer transition-all"
                  >
                    Chat Now ➔
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
                  <span className="text-lg">✉️</span>
                  <div>
                    <div className="text-slate-400">Email Desk:</div>
                    <a href="mailto:loans@vgsfinance.in" className="font-bold text-sky-400 text-sm hover:underline">
                      loans@vgsfinance.in
                    </a>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
                  <span className="text-lg">📍</span>
                  <div>
                    <div className="text-slate-400">Corporate Headquarters:</div>
                    <div className="font-bold text-slate-200">
                      VGS Towers, Plot No 42, Jubilee Hills, Hyderabad - 500033
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/20 p-5 rounded-3xl text-xs text-slate-300 space-y-2">
              <div className="font-bold text-indigo-300 text-sm">🔒 Step 9 Guarantee</div>
              <p>Every lead is cryptographically hashed, validated, and stored in our production database with auto-assigned loan officer routing.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
