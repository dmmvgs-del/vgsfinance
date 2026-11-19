import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';

export default function QuickEnquirySection({ onLeadSubmitted, prefillData, categories }) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    productName: 'Personal Loan',
    requestedAmount: 500000,
    city: 'Hyderabad',
    callbackTime: 'Immediate (Within 15 Mins)'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validatePhone = (num) => {
    if (!num || !num.trim()) return 'Mobile number is required';
    if (!/^[6-9]/.test(num)) return 'Indian mobile must start with 6, 7, 8, or 9';
    if (num.length < 10) return `Enter all 10 digits (${num.length}/10 entered)`;
    if (!/^[6-9]\d{9}$/.test(num)) return 'Please enter a valid 10-digit mobile number';
    return '';
  };

  const validateName = (name) => {
    if (!name || !name.trim()) return 'Full name is required';
    if (name.trim().length < 3) return 'Name must be at least 3 characters';
    if (!/^[a-zA-Z\s.]+$/.test(name.trim())) return 'Name can only contain letters and spaces';
    return '';
  };

  const validateAmount = (amt) => {
    const n = Number(amt);
    if (!amt || isNaN(n) || n <= 0) return 'Loan amount is required';
    if (n < 25000) return 'Minimum loan amount is ₹25,000';
    if (n > 100000000) return 'Maximum loan amount is ₹10 Crores';
    return '';
  };

  const validateCity = (cityName) => {
    if (!cityName || !cityName.trim()) return 'City / Location is required';
    if (cityName.trim().length < 2) return 'Please enter a valid city name';
    return '';
  };

  const formatLakhsHelper = (amt) => {
    const n = Number(amt);
    if (!n || isNaN(n)) return '';
    if (n >= 10000000) return `(₹ ${(n / 10000000).toFixed(2)} Cr)`;
    if (n >= 100000) return `(₹ ${(n / 100000).toFixed(2)} Lakhs)`;
    if (n >= 1000) return `(₹ ${(n / 1000).toFixed(0)} K)`;
    return '';
  };

  const handlePhoneChange = (e) => {
    // Strip all non-digit characters immediately! No letters or special chars can be typed!
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, phone: digitsOnly }));
    if (errorMsg) setErrorMsg('');
    if (touched.phone || digitsOnly.length > 0) {
      setErrors(prev => ({ ...prev, phone: validatePhone(digitsOnly) }));
    }
  };

  const handleNameChange = (e) => {
    // Allow letters, spaces, and periods only
    const clean = e.target.value.replace(/[^a-zA-Z\s.]/g, '');
    setFormData(prev => ({ ...prev, customerName: clean }));
    if (errorMsg) setErrorMsg('');
    if (touched.customerName || clean.length > 0) {
      setErrors(prev => ({ ...prev, customerName: validateName(clean) }));
    }
  };

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '');
    const num = raw === '' ? '' : parseInt(raw, 10);
    setFormData(prev => ({ ...prev, requestedAmount: num }));
    if (errorMsg) setErrorMsg('');
    if (touched.requestedAmount || raw.length > 0) {
      setErrors(prev => ({ ...prev, requestedAmount: validateAmount(num) }));
    }
  };

  const handleCityChange = (e) => {
    const clean = e.target.value.replace(/[^a-zA-Z\s,.-]/g, '');
    setFormData(prev => ({ ...prev, city: clean }));
    if (errorMsg) setErrorMsg('');
    if (touched.city || clean.length > 0) {
      setErrors(prev => ({ ...prev, city: validateCity(clean) }));
    }
  };

  useEffect(() => {
    if (prefillData) {
      setFormData(prev => ({
        ...prev,
        requestedAmount: prefillData.requestedAmount || prefillData.amount || prev.requestedAmount,
        productName: prefillData.productName || (prefillData.categoryId && categories ? (categories.find(c => c.id === prefillData.categoryId)?.name || prev.productName) : prev.productName)
      }));
    }
  }, [prefillData, categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      customerName: true,
      phone: true,
      requestedAmount: true,
      city: true
    });

    const phoneErr = validatePhone(formData.phone);
    const nameErr = validateName(formData.customerName);
    const amountErr = validateAmount(formData.requestedAmount);
    const cityErr = validateCity(formData.city);

    const newErrors = {
      phone: phoneErr,
      customerName: nameErr,
      requestedAmount: amountErr,
      city: cityErr
    };
    setErrors(newErrors);

    if (phoneErr || nameErr || amountErr || cityErr) {
      const firstError = phoneErr || nameErr || amountErr || cityErr;
      setErrorMsg(`⚠️ Validation Error: ${firstError}`);
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName.trim(),
          phone: formData.phone.trim(),
          productName: formData.productName,
          requestedAmount: Number(formData.requestedAmount),
          city: formData.city.trim(),
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

              {prefillData && (
                <div className="p-3.5 rounded-2xl bg-[#E8F5D4] border border-[#6EA928]/40 text-xs text-[#0A5C80] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm animate-fade-in">
                  <div className="flex items-center gap-2">
                    <span className="text-base text-[#6EA928]">⚡</span>
                    <span>
                      Pre-filled from Loan Search: <strong>{formData.productName}</strong> for <strong>₹ {Number(formData.requestedAmount).toLocaleString('en-IN')}</strong>. Enter your details below to submit in 1 click!
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#466E18] uppercase tracking-wider bg-white px-2.5 py-1 rounded-full border border-[#6EA928]/30 shrink-0 self-start sm:self-auto">
                    Ready to Submit
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                  {/* Full Name */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Your Full Name *
                      </label>
                      {formData.customerName.trim().length >= 3 && !errors.customerName && (
                        <span className="text-[11px] font-semibold text-emerald-600">✔ Valid</span>
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Raghavendra Rao"
                      value={formData.customerName}
                      onChange={handleNameChange}
                      onBlur={() => {
                        setTouched(prev => ({ ...prev, customerName: true }));
                        setErrors(prev => ({ ...prev, customerName: validateName(formData.customerName) }));
                      }}
                      className={`w-full rounded-xl px-3.5 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-colors ${
                        touched.customerName && errors.customerName
                          ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                          : formData.customerName.trim().length >= 3 && !errors.customerName
                          ? 'border border-emerald-500 bg-emerald-50/20'
                          : 'border border-slate-300 bg-slate-50 focus:border-[#6EA928]'
                      }`}
                    />
                    {touched.customerName && errors.customerName && (
                      <p className="mt-1 text-[11px] font-medium text-rose-600 flex items-center gap-1">
                        <span>⚠️</span> {errors.customerName}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Mobile Number *
                      </label>
                      {formData.phone ? (
                        <span className={`text-[11px] font-bold ${
                          formData.phone.length === 10 && /^[6-9]\d{9}$/.test(formData.phone)
                            ? 'text-emerald-600'
                            : 'text-amber-600'
                        }`}>
                          {formData.phone.length === 10 && /^[6-9]\d{9}$/.test(formData.phone)
                            ? '✔ Valid 10-digit'
                            : `${formData.phone.length}/10 digits`}
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-medium">10 Digits Only</span>
                      )}
                    </div>
                    <div className="relative flex rounded-xl shadow-sm overflow-hidden">
                      <span className="inline-flex items-center px-3 bg-slate-100 border border-r-0 border-slate-300 text-slate-700 font-bold text-xs select-none gap-1 shrink-0">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[6-9][0-9]{9}"
                        maxLength={10}
                        required
                        placeholder="98480 12345"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        onBlur={() => {
                          setTouched(prev => ({ ...prev, phone: true }));
                          setErrors(prev => ({ ...prev, phone: validatePhone(formData.phone) }));
                        }}
                        className={`w-full rounded-r-xl px-3.5 py-3 text-xs text-slate-900 placeholder-slate-400 font-semibold tracking-wider focus:outline-none focus:bg-white transition-colors ${
                          touched.phone && errors.phone
                            ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                            : formData.phone.length === 10 && /^[6-9]\d{9}$/.test(formData.phone)
                            ? 'border border-emerald-500 bg-emerald-50/20 text-emerald-900 font-bold'
                            : 'border border-slate-300 bg-slate-50 focus:border-[#6EA928]'
                        }`}
                      />
                      {formData.phone.length === 10 && /^[6-9]\d{9}$/.test(formData.phone) && (
                        <span className="absolute right-3 top-3 text-emerald-600 font-bold text-sm pointer-events-none">
                          ✔
                        </span>
                      )}
                    </div>
                    {touched.phone && errors.phone ? (
                      <p className="mt-1 text-[11px] font-medium text-rose-600 flex items-center gap-1">
                        <span>⚠️</span> {errors.phone}
                      </p>
                    ) : (
                      <p className="mt-1 text-[10px] text-slate-500">
                        Only numbers • Starts with 6, 7, 8, or 9
                      </p>
                    )}
                  </div>

                  {/* Required Loan Amount */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Required Loan Amount (₹) *
                      </label>
                      {formData.requestedAmount > 0 && (
                        <span className="text-[11px] font-bold text-[#466E18]">
                          {formatLakhsHelper(formData.requestedAmount)}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-slate-400 font-bold text-xs select-none">₹</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        required
                        placeholder="5,00,000"
                        value={formData.requestedAmount ? Number(formData.requestedAmount).toLocaleString('en-IN') : ''}
                        onChange={handleAmountChange}
                        onBlur={() => {
                          setTouched(prev => ({ ...prev, requestedAmount: true }));
                          setErrors(prev => ({ ...prev, requestedAmount: validateAmount(formData.requestedAmount) }));
                        }}
                        className={`w-full rounded-xl pl-8 pr-3.5 py-3 text-xs text-slate-900 focus:outline-none focus:bg-white font-bold transition-colors ${
                          touched.requestedAmount && errors.requestedAmount
                            ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                            : 'border border-slate-300 bg-slate-50 focus:border-[#6EA928]'
                        }`}
                      />
                    </div>
                    {touched.requestedAmount && errors.requestedAmount ? (
                      <p className="mt-1 text-[11px] font-medium text-rose-600 flex items-center gap-1">
                        <span>⚠️</span> {errors.requestedAmount}
                      </p>
                    ) : (
                      <p className="mt-1 text-[10px] text-slate-500">
                        Min: ₹25,000 • Max: ₹10 Crores
                      </p>
                    )}
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
                      <option value="Medical Loan">Medical Loan (Healthcare & Emergency)</option>
                      <option value="Emergency Medical Treatment Loan">Emergency Medical Treatment Loan (Surgeries / ICU)</option>
                      <option value="Health Insurance & Hospitalization Loan">Health Insurance & Hospitalization Loan</option>
                      <option value="Doctor & Clinic Practice Loan">Doctor & Clinic Practice Loan (Doctors/Dentists)</option>
                      <option value="Medical Equipment & Diagnostic Loan">Medical Equipment & Diagnostic Loan</option>
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
                      {/* Fallback for custom prefilled sub-options */}
                      {![
                        'Medical Loan', 'Emergency Medical Treatment Loan', 'Health Insurance & Hospitalization Loan',
                        'Doctor & Clinic Practice Loan', 'Medical Equipment & Diagnostic Loan',
                        'Personal Loan', 'Business Loan', 'Home Loan', 'Car Loan', 'Gold Loan', 'Education Loan',
                        'Mortgage Loan', 'Loan Against Property', 'Professional Loan', 'Doctor Loan', 'Equipment Loan',
                        'Commercial Vehicle Loan', 'Working Capital Loan', 'Self-Employed Professional Loan',
                        'Construction Equipment Loan', 'Other Financial Products'
                      ].includes(formData.productName) && (
                        <option value={formData.productName}>{formData.productName}</option>
                      )}
                    </select>
                  </div>

                  {/* City */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Your City / Location *
                      </label>
                      {formData.city.trim().length >= 2 && !errors.city && (
                        <span className="text-[11px] font-semibold text-emerald-600">✔</span>
                      )}
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hyderabad, Vijayawada, Vizag"
                      value={formData.city}
                      onChange={handleCityChange}
                      onBlur={() => {
                        setTouched(prev => ({ ...prev, city: true }));
                        setErrors(prev => ({ ...prev, city: validateCity(formData.city) }));
                      }}
                      className={`w-full rounded-xl px-3.5 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-colors ${
                        touched.city && errors.city
                          ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                          : 'border border-slate-300 bg-slate-50 focus:border-[#6EA928]'
                      }`}
                    />
                    {touched.city && errors.city && (
                      <p className="mt-1 text-[11px] font-medium text-rose-600 flex items-center gap-1">
                        <span>⚠️</span> {errors.city}
                      </p>
                    )}
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

