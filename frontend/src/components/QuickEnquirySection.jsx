import { useState } from 'react';
import { API_BASE_URL } from '../config/api';

export default function QuickEnquirySection({ onLeadSubmitted }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    productName: 'VGS Express Personal Loan',
    requestedAmount: 300000,
    city: 'Hyderabad',
    callbackTime: 'Immediate (Within 15 Mins)'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName,
          phone: formData.phone,
          productName: formData.productName,
          requestedAmount: formData.requestedAmount,
          city: formData.city,
          notes: `Quick Enquiry via Home Page widget. Preferred callback: ${formData.callbackTime}.`,
          leadSource: 'Home Page Quick Enquiry Widget'
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedLead(data.data);
        if (onLeadSubmitted) onLeadSubmitted();
      } else {
        setErrorMsg(data.message || 'Failed to submit quick enquiry.');
      }
    } catch (err) {
      setErrorMsg('Server connection failed. Please check network.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="quick-enquiry" className="py-20 bg-slate-50 border-t border-b border-slate-200/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">

          {submittedLead ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E8F5D4] text-[#466E18] border border-[#6EA928]/40 flex items-center justify-center text-3xl mx-auto">
                ✔
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Quick Enquiry Submitted Successfully!
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Thank you, <strong>{submittedLead.customerName}</strong>. Your enquiry has been registered in the database.
              </p>

              <div className="inline-block bg-slate-50 border border-[#6EA928]/40 rounded-2xl p-4 shadow-sm">
                <span className="text-xs text-slate-500 block uppercase font-bold">Your Tracking Lead ID:</span>
                <span className="text-2xl font-black text-[#0A5C80] font-mono tracking-wider">{submittedLead.id}</span>
              </div>

              <div className="text-xs text-slate-500">
                A senior loan officer will call you at <strong className="text-slate-900">{submittedLead.phone}</strong> shortly.
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <a
                  href={`https://wa.me/919848012345?text=Hi%20VGS%20Finance,%20I%20just%20submitted%20Quick%20Enquiry%20${submittedLead.id}%20for%20₹${submittedLead.requestedAmount}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg inline-flex items-center gap-2"
                >
                  💬 Connect on WhatsApp for Instant Priority
                </a>
                <button
                  onClick={() => setSubmittedLead(null)}
                  className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">

              <div className="text-left max-w-2xl space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-xs font-black tracking-wide uppercase">
                  <span>⚡ Express Assistance Desk</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#041E2B] tracking-tight">
                  Get a Loan Callback in 15 Minutes
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Short on time? Fill out this 30-second form and our senior financial advisor will connect with customized sanction options.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-bold">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Raghavendra Rao"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6EA928] focus:bg-white"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98480 XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6EA928] focus:bg-white"
                    />
                  </div>

                  {/* Required Loan Amount */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Required Loan Amount (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="25000"
                      step="10000"
                      value={formData.requestedAmount}
                      onChange={(e) => setFormData({ ...formData, requestedAmount: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 focus:outline-none focus:border-[#6EA928] focus:bg-white font-bold"
                    />
                  </div>

                  {/* Loan Product Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Loan Category *
                    </label>
                    <select
                      value={formData.productName}
                      onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#6EA928] focus:bg-white cursor-pointer"
                    >
                      <option value="Personal Loan">Personal Loan (Instant Cash)</option>
                      <option value="Business Loan">Business Loan (Working Capital)</option>
                      <option value="Home Loan">Home Loan (Housing Purchase & Construction)</option>
                      <option value="Car Loan">Car Loan (New & Used Automobile)</option>
                      <option value="Gold Loan">Gold Loan (Doorstep & Lowest Interest)</option>
                      <option value="Education Loan">Education Loan (Global Higher Studies)</option>
                      <option value="Mortgage Loan">Mortgage Loan (Real Estate Backed)</option>
                      <option value="Loan Against Property">Loan Against Property (LAP)</option>
                      <option value="Professional Loan">Professional Loan (CA / CS / Architect)</option>
                      <option value="Doctor Loan">Doctor Loan (Clinics & Equipment)</option>
                      <option value="Equipment Loan">Equipment Loan (Machinery & Tools)</option>
                      <option value="Commercial Vehicle Loan">Commercial Vehicle Loan (Trucks & Fleet)</option>
                      <option value="Working Capital Loan">Working Capital Loan (CC / OD)</option>
                      <option value="Self-Employed Professional Loan">Self-Employed Professional Loan</option>
                      <option value="Construction Equipment Loan">Construction Equipment Loan</option>
                      <option value="Other Financial Products">Other Financial Products (Debt Consolidation / BT)</option>
                    </select>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your City / Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hyderabad, Vijayawada, Vizag"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#6EA928] focus:bg-white"
                    />
                  </div>

                  {/* Preferred Callback Time */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Preferred Callback Time
                    </label>
                    <select
                      value={formData.callbackTime}
                      onChange={(e) => setFormData({ ...formData, callbackTime: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 text-xs text-slate-900 focus:outline-none focus:border-[#6EA928] focus:bg-white cursor-pointer"
                    >
                      <option value="Immediate (Within 15 Mins)">Immediate (Within 15 Mins)</option>
                      <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                      <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                      <option value="Evening (5:00 PM - 7:30 PM)">Evening (5:00 PM - 7:30 PM)</option>
                    </select>
                  </div>

                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl font-bold text-sm bg-[#6EA928] hover:bg-[#5A8B1F] text-white shadow-xl shadow-[#6EA928]/25 cursor-pointer transition-all flex items-center justify-center gap-2"
                  >
                    {submitting ? 'Registering Enquiry...' : '⚡ Request Free Callback & Indicative Loan Sanction'}
                  </button>
                </div>
              </form>

              <div className="text-center text-[11px] text-slate-500">
                🔒 Your privacy is secured with 256-bit encryption. No spam calls. No advance charges.
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}

