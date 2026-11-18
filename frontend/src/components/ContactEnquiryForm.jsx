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
        requestedAmount: prefillData.requestedAmount || prefillData.amount || prev.requestedAmount,
        productName: prefillData.productName || prev.productName,
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
    <section id="contact-enquiry" className="py-20 bg-white border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Section Header */}
        <div className="text-left max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-xs font-black tracking-wide uppercase">
            <span>📝</span> <span>Phase 3: Loan Enquiry Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#041E2B] tracking-tight">
            Customer Loan Enquiry Portal
          </h2>
          <p className="text-sm text-slate-600">
            Submit your loan requirements below. Your application is directly stored in our secure database for instant review.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">

          {/* Main Form Box */}
          <div className="lg:col-span-8 bg-white border border-slate-200/90 p-6 sm:p-10 rounded-3xl shadow-xl">

            {/* Step 8 & 9 Result Screen: Saved in database with Lead Tracking ID */}
            {submittedLead ? (
              <div className="p-8 rounded-3xl bg-slate-50 border border-[#6EA928]/40 text-center space-y-5 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#466E18] text-3xl flex items-center justify-center mx-auto shadow-md">
                  ✓
                </div>
                <div>
                  <span className="px-3 py-1 rounded-full bg-[#E8F5D4] text-[#466E18] text-xs font-bold uppercase tracking-wider">
                    Step 9: Enquiry Stored in Database
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-2">
                    Thank you, {submittedLead.customerName}!
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Your enquiry has been registered in the system. The business team can now contact you.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2 shadow-sm">
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Lead Tracking ID:</span>
                    <span className="font-mono font-bold text-[#0A5C80] text-sm">{submittedLead.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Loan Type:</span>
                    <span className="font-bold text-slate-900">{submittedLead.productName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Requested Amount:</span>
                    <span className="font-bold text-[#6EA928]">{formatCurrency(submittedLead.requestedAmount)}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-100 pb-2">
                    <span className="text-slate-500">Location:</span>
                    <span className="font-bold text-slate-700">{submittedLead.city}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Assigned Lending Officer:</span>
                    <span className="font-bold text-[#0A5C80]">{submittedLead.assignedTo}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-[#0A5C80] text-xs max-w-md mx-auto">
                  📞 <strong>Step 13 in progress:</strong> Our loan officer is reviewing your profile and will call you on <strong>{submittedLead.phone}</strong>.
                </div>

                {/* Statutory Indicative Notice */}
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-left text-xs max-w-md mx-auto flex items-start gap-2">
                  <span className="text-xs mt-0.5">⚠️</span>
                  <p className="text-[11px] leading-relaxed">
                    <strong className="text-amber-950">Important:</strong> EMI calculations and loan information displayed on the website are indicative. Final interest rates, eligibility, approval, sanction, tenure, processing fees and loan terms are subject to the respective lender / financial institution.
                  </p>
                </div>

                <div className="flex justify-center gap-3 flex-wrap">
                  <a
                    href="#workflow"
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#6EA928] hover:bg-[#5A8B1F] text-white shadow-lg shadow-[#6EA928]/20 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    🔍 Track Loan Journey (Phase 6)
                  </a>
                  <button
                    onClick={() => setSubmittedLead(null)}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 cursor-pointer"
                  >
                    + Submit Another Loan Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                {errorMessage && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-800 text-xs">
                    ⚠️ {errorMessage}
                  </div>
                )}

                {/* Pre-fill banner */}
                {(selectedProduct || prefillData) && (
                  <div className="p-3 rounded-2xl bg-[#E8F5D4] border border-[#6EA928]/40 text-[#466E18] text-xs flex items-center justify-between">
                    <span>
                      🎯 Pre-selected: <strong>{formData.productName}</strong>
                      {formData.requestedAmount ? ` — ${formatCurrency(formData.requestedAmount)}` : ''}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, productName: 'Personal Loan', requestedAmount: '' }));
                      }}
                      className="text-[11px] underline text-[#0A5C80] hover:text-[#062A3B] cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                )}

                {/* Step 1: Customer selects Loan Type */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#0A5C80] mb-1.5">
                    1. Select Loan Type *
                  </label>
                  <select
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 text-sm font-semibold focus:outline-none focus:border-[#6EA928] focus:bg-white"
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
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      2. Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#6EA928] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      3. Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98480 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#6EA928] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Step 4 & 5: Email & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      4. Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#6EA928] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      5. Select Location *
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#6EA928] focus:bg-white cursor-pointer"
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
                    <label className="block text-xs font-bold uppercase text-[#0A5C80] mb-1">
                      6. Required Loan Amount (₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 500000"
                        value={formData.requestedAmount}
                        onChange={(e) => setFormData({ ...formData, requestedAmount: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-8 pr-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#6EA928] focus:bg-white font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Preferred Tenure (Months)
                    </label>
                    <input
                      type="number"
                      value={formData.tenureMonths}
                      onChange={(e) => setFormData({ ...formData, tenureMonths: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 text-sm focus:outline-none focus:border-[#6EA928] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Step 7: Employment / Business information */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#0A5C80]">
                    7. Employment & Income Information
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Employment Type
                      </label>
                      <select
                        value={formData.employmentType}
                        onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-[#6EA928]"
                      >
                        <option value="Salaried">Salaried (Private / Govt Employee)</option>
                        <option value="Business Owner">Business Owner (Sole Prop / LLP / Pvt Ltd)</option>
                        <option value="Self-Employed">Self-Employed Professional (Doctor, CA, etc.)</option>
                        <option value="Agriculture">Agriculture & Farming</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Monthly Net Income / Turnover (₹)
                      </label>
                      <input
                        type="number"
                        placeholder="e.g. 50000"
                        value={formData.monthlyIncome}
                        onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-[#6EA928] font-semibold"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Purpose of Loan / Remarks
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Briefly describe your loan requirement (e.g. working capital, home renovation, medical)..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-slate-900 text-xs focus:outline-none focus:border-[#6EA928] focus:bg-white"
                  ></textarea>
                </div>

                {/* Statutory Regulatory Notice */}
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5">
                  <span className="text-sm mt-0.5">⚠️</span>
                  <p className="leading-relaxed text-[11px]">
                    <strong className="text-amber-950">Important:</strong> EMI calculations and loan information displayed on the website are indicative. Final interest rates, eligibility, approval, sanction, tenure, processing fees and loan terms are subject to the respective lender / financial institution.
                  </p>
                </div>

                {/* Step 8: Customer submits enquiry */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-[#6EA928] hover:bg-[#5A8B1F] text-white font-black text-sm rounded-xl shadow-xl shadow-[#6EA928]/25 transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Submitting Enquiry to Database...' : '🚀 8. Submit Loan Enquiry'}
                </button>

              </form>
            )}

          </div>

          {/* Quick Help & Branch Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50 border border-slate-200/90 p-6 rounded-3xl space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>📞</span> Step 13: Instant Business Desk
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our financial advisory and business development team reaches out promptly upon enquiry submission:
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-3 shadow-sm">
                  <span className="text-lg">📱</span>
                  <div>
                    <div className="text-slate-500">Direct Loan Hotline:</div>
                    <a href="tel:+919848012345" className="font-bold text-[#0A5C80] text-sm hover:underline">
                      +91 98480 12345
                    </a>
                  </div>
                </div>

                {/* Step 5: WhatsApp Integration */}
                <div className="p-3 rounded-xl bg-[#E8F5D4] border border-[#6EA928]/30 flex items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">💬</span>
                    <div>
                      <div className="text-slate-600 text-[11px]">Instant WhatsApp Desk:</div>
                      <div className="font-bold text-[#466E18] text-xs">+91 98480 12345</div>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/919848012345?text=Hello%20VGS%20Finance,%20I%20would%20like%20to%20enquire%20about%20a%20loan%20scheme."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#6EA928] hover:bg-[#5A8B1F] text-white font-bold text-[11px] rounded-lg shadow cursor-pointer transition-all"
                  >
                    Chat Now ➔
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-3 shadow-sm">
                  <span className="text-lg">✉️</span>
                  <div>
                    <div className="text-slate-500">Email Desk:</div>
                    <a href="mailto:loans@vgsfinance.in" className="font-bold text-[#0A5C80] text-sm hover:underline">
                      loans@vgsfinance.in
                    </a>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-3 shadow-sm">
                  <span className="text-lg">📍</span>
                  <div>
                    <div className="text-slate-500">Corporate Headquarters:</div>
                    <div className="font-bold text-slate-800">
                      VGS Towers, Plot No 42, Jubilee Hills, Hyderabad - 500033
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-sky-50 border border-sky-200 p-5 rounded-3xl text-xs text-slate-700 space-y-2 shadow-sm">
              <div className="font-bold text-[#0A5C80] text-sm">🔒 Step 9 Guarantee</div>
              <p>Every lead is cryptographically hashed, validated, and stored in our production database with auto-assigned loan officer routing.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
