import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';
import quickCallbackAdvisor from '../assets/quick-callback-advisor.jpg';

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
    <section id="quick-enquiry" className="py-8 sm:py-10 bg-slate-50 border-t border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Master Card with 2-Column Split: Form on Left, Image on Right */}
        <div className="bg-white border border-slate-200/90 rounded-3xl shadow-xl relative overflow-hidden">

          {submittedLead ? (
            <div className="text-center p-6 sm:p-10 space-y-3.5">
              <div className="w-14 h-14 rounded-full bg-[#E8F5D4] text-[#466E18] border border-[#6EA928]/40 flex items-center justify-center text-2xl mx-auto">
                ✔
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Quick Enquiry Submitted Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                Thank you, <strong>{submittedLead.customerName}</strong>. Your enquiry has been registered in the database.
              </p>

              <div className="inline-block bg-slate-50 border border-[#6EA928]/40 rounded-xl p-3 shadow-sm">
                <span className="text-[11px] text-slate-500 block uppercase font-bold">Your Tracking Lead ID:</span>
                <span className="text-xl font-black text-[#0A5C80] font-mono tracking-wider">{submittedLead.id}</span>
              </div>

              <div className="text-xs text-slate-500">
                A senior loan officer will call you at <strong className="text-slate-900">{submittedLead.phone}</strong> shortly.
              </div>

              <div className="pt-1 flex justify-center gap-3">
                <a
                  href={`https://wa.me/919848012345?text=Hi%20VGS%20Finance,%20I%20just%20submitted%20Quick%20Enquiry%20${submittedLead.id}%20for%20₹${submittedLead.requestedAmount}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md inline-flex items-center gap-2"
                >
                  💬 Connect on WhatsApp for Instant Priority
                </a>
                <button
                  onClick={() => setSubmittedLead(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">

              {/* =========================================================================
                  LEFT COLUMN (7 COLS): COMPACT & SLEEK ENQUIRY FORM
                 ========================================================================= */}
              <div className="lg:col-span-7 p-4 sm:p-6 lg:p-7 flex flex-col justify-between space-y-3">

                {/* Header */}
                <div className="text-left space-y-1 border-b border-slate-100 pb-2.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-[10px] font-black tracking-wide uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6EA928] animate-ping"></span>
                    <span>⚡ Express Assistance Desk</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#041E2B] tracking-tight leading-tight">
                    Get a Loan Callback in 15 Minutes
                  </h2>
                  <p className="text-xs text-slate-600 line-clamp-1 sm:line-clamp-none">
                    Short on time? Fill out this 30-second form and our senior financial advisor will connect with customized sanction options.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-bold">
                    {errorMsg}
                  </div>
                )}

                {prefillData && (
                  <div className="p-2.5 rounded-xl bg-[#E8F5D4] border border-[#6EA928]/40 text-xs text-[#0A5C80] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm animate-fade-in">
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <span className="text-sm text-[#6EA928]">⚡</span>
                      <span>
                        Pre-filled: <strong>{formData.productName}</strong> for <strong>₹ {Number(formData.requestedAmount).toLocaleString('en-IN')}</strong>.
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-[#466E18] uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border border-[#6EA928]/30 shrink-0">
                      Ready
                    </span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-2.5">
                  
                  {/* 2-Column Responsive Compact Input Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">

                    {/* Field 1: Full Name */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Your Full Name *
                        </label>
                        {formData.customerName.trim().length >= 3 && !errors.customerName && (
                          <span className="text-[10px] font-semibold text-emerald-600">✔ Valid</span>
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
                        className={`w-full rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-colors ${
                          touched.customerName && errors.customerName
                            ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                            : formData.customerName.trim().length >= 3 && !errors.customerName
                            ? 'border border-emerald-500 bg-emerald-50/20'
                            : 'border border-slate-300 bg-slate-50 focus:border-[#6EA928]'
                        }`}
                      />
                      {touched.customerName && errors.customerName && (
                        <p className="mt-0.5 text-[10px] font-medium text-rose-600 flex items-center gap-1">
                          <span>⚠️</span> {errors.customerName}
                        </p>
                      )}
                    </div>

                    {/* Field 2: Mobile Number */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Mobile Number *
                        </label>
                        {formData.phone ? (
                          <span className={`text-[10px] font-bold ${
                            formData.phone.length === 10 && /^[6-9]\d{9}$/.test(formData.phone)
                              ? 'text-emerald-600'
                              : 'text-amber-600'
                          }`}>
                            {formData.phone.length === 10 && /^[6-9]\d{9}$/.test(formData.phone)
                              ? '✔ Valid 10-digit'
                              : `${formData.phone.length}/10 digits`}
                          </span>
                        ) : (
                          <span className="text-[9px] text-slate-400 font-medium">10 Digits Only</span>
                        )}
                      </div>
                      <div className="relative flex rounded-xl shadow-sm overflow-hidden">
                        <span className="inline-flex items-center px-2.5 bg-slate-100 border border-r-0 border-slate-300 text-slate-700 font-bold text-xs select-none gap-1 shrink-0">
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
                          className={`w-full rounded-r-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 font-semibold tracking-wider focus:outline-none focus:bg-white transition-colors ${
                            touched.phone && errors.phone
                              ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                              : formData.phone.length === 10 && /^[6-9]\d{9}$/.test(formData.phone)
                              ? 'border border-emerald-500 bg-emerald-50/20 text-emerald-900 font-bold'
                              : 'border border-slate-300 bg-slate-50 focus:border-[#6EA928]'
                          }`}
                        />
                        {formData.phone.length === 10 && /^[6-9]\d{9}$/.test(formData.phone) && (
                          <span className="absolute right-2.5 top-2.5 text-emerald-600 font-bold text-xs pointer-events-none">
                            ✔
                          </span>
                        )}
                      </div>
                      {touched.phone && errors.phone ? (
                        <p className="mt-0.5 text-[10px] font-medium text-rose-600 flex items-center gap-1">
                          <span>⚠️</span> {errors.phone}
                        </p>
                      ) : (
                        <p className="mt-0.5 text-[9px] text-slate-500">
                          Only numbers • Starts with 6, 7, 8, or 9
                        </p>
                      )}
                    </div>

                    {/* Field 3: Required Loan Amount */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Required Loan Amount (₹) *
                        </label>
                        {formData.requestedAmount > 0 && (
                          <span className="text-[10px] font-bold text-[#466E18]">
                            {formatLakhsHelper(formData.requestedAmount)}
                          </span>
                        )}
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs select-none">₹</span>
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
                          className={`w-full rounded-xl pl-7 pr-3 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white font-bold transition-colors ${
                            touched.requestedAmount && errors.requestedAmount
                              ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                              : 'border border-slate-300 bg-slate-50 focus:border-[#6EA928]'
                          }`}
                        />
                      </div>
                      {touched.requestedAmount && errors.requestedAmount ? (
                        <p className="mt-0.5 text-[10px] font-medium text-rose-600 flex items-center gap-1">
                          <span>⚠️</span> {errors.requestedAmount}
                        </p>
                      ) : (
                        <p className="mt-0.5 text-[9px] text-slate-500">
                          Min: ₹25,000 • Max: ₹10 Crores
                        </p>
                      )}
                    </div>

                    {/* Field 4: Loan Category */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Loan Category *
                      </label>
                      <select
                        value={formData.productName}
                        onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-semibold focus:outline-none focus:border-[#6EA928] focus:bg-white cursor-pointer"
                      >
                        <option value="Personal Loan">Personal Loan (Instant Cash)</option>
                        <option value="Business Loan">Business Loan (Working Capital)</option>
                        <option value="Home Loan">Home Loan (Housing Purchase)</option>
                        <option value="Car Loan">Car Loan (New & Used Automobile)</option>
                        <option value="Gold Loan">Gold Loan (Doorstep & Lowest Interest)</option>
                        <option value="Education Loan">Education Loan (Higher Studies)</option>
                        <option value="Medical Loan">Medical Loan (Healthcare Emergency)</option>
                        <option value="Emergency Medical Treatment Loan">Emergency Medical Treatment Loan</option>
                        <option value="Health Insurance & Hospitalization Loan">Health Insurance & Hospitalization Loan</option>
                        <option value="Doctor & Clinic Practice Loan">Doctor & Clinic Practice Loan</option>
                        <option value="Medical Equipment & Diagnostic Loan">Medical Equipment & Diagnostic Loan</option>
                        <option value="Mortgage Loan">Mortgage Loan (Real Estate Backed)</option>
                        <option value="Loan Against Property">Loan Against Property (LAP)</option>
                        <option value="Professional Loan">Professional Loan (CA / CS / Architect)</option>
                        <option value="Commercial Vehicle Loan">Commercial Vehicle Loan</option>
                        <option value="Working Capital Loan">Working Capital Loan (CC / OD)</option>
                        <option value="Other Financial Products">Other Financial Products</option>
                        {/* Fallback for custom prefilled sub-options */}
                        {![
                          'Personal Loan', 'Business Loan', 'Home Loan', 'Car Loan', 'Gold Loan',
                          'Education Loan', 'Medical Loan', 'Emergency Medical Treatment Loan',
                          'Health Insurance & Hospitalization Loan', 'Doctor & Clinic Practice Loan',
                          'Medical Equipment & Diagnostic Loan', 'Mortgage Loan', 'Loan Against Property',
                          'Professional Loan', 'Commercial Vehicle Loan', 'Working Capital Loan', 'Other Financial Products'
                        ].includes(formData.productName) && (
                          <option value={formData.productName}>{formData.productName}</option>
                        )}
                      </select>
                    </div>

                    {/* Field 5: City / Location */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Your City / Location *
                        </label>
                        {formData.city.trim().length >= 2 && !errors.city && (
                          <span className="text-[10px] font-semibold text-emerald-600">✔</span>
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
                        className={`w-full rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white transition-colors ${
                          touched.city && errors.city
                            ? 'border-2 border-rose-400 bg-rose-50/40 focus:border-rose-500'
                            : 'border border-slate-300 bg-slate-50 focus:border-[#6EA928]'
                        }`}
                      />
                      {touched.city && errors.city && (
                        <p className="mt-0.5 text-[10px] font-medium text-rose-600 flex items-center gap-1">
                          <span>⚠️</span> {errors.city}
                        </p>
                      )}
                    </div>

                    {/* Field 6: Preferred Callback Time */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Preferred Callback Time
                      </label>
                      <select
                        value={formData.callbackTime}
                        onChange={(e) => setFormData({ ...formData, callbackTime: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#6EA928] focus:bg-white cursor-pointer"
                      >
                        <option value="Immediate (Within 15 Mins)">Immediate (Within 15 Mins)</option>
                        <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                        <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                        <option value="Evening (5:00 PM - 7:30 PM)">Evening (5:00 PM - 7:30 PM)</option>
                      </select>
                    </div>

                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#6EA928] hover:bg-[#5A8B1F] text-white shadow-md shadow-[#6EA928]/25 cursor-pointer transition-all flex items-center justify-center gap-2"
                    >
                      {submitting ? 'Registering Enquiry...' : '⚡ Request Free Callback & Indicative Loan Sanction'}
                    </button>
                  </div>
                </form>

                <div className="text-center text-[10px] text-slate-500 pt-0.5">
                  🔒 Your privacy is secured with 256-bit encryption. No spam calls. No advance charges.
                </div>

              </div>

              {/* =========================================================================
                  RIGHT COLUMN (5 COLS): COMPACT & SLEEK LOAN ADVISOR PHOTOGRAPH
                 ========================================================================= */}
              <div className="lg:col-span-5 relative bg-gradient-to-br from-[#02131D] via-[#041E2B] to-[#0A5C80] min-h-[260px] lg:min-h-full flex flex-col justify-between p-4 sm:p-5 overflow-hidden group">
                
                {/* Background Advisor Photograph */}
                <img
                  src={quickCallbackAdvisor}
                  alt="VGS Senior Financial Advisor"
                  className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />

                {/* Ambient Dark Gradient Vignette for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020e16]/90 via-[#041E2B]/30 to-black/25 pointer-events-none" />

                {/* Top Floating Badges */}
                <div className="relative z-10 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#041E2B] text-[11px] font-black shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6EA928] animate-ping" />
                    <span>⚡ 15-Min Callback Desk</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#6EA928] text-white text-[10px] font-bold shadow-md">
                    <span>★ 4.9/5 Rating</span>
                  </span>
                </div>

                {/* Bottom Glassmorphism Advisor Trust Card */}
                <div className="relative z-10 bg-slate-900/85 backdrop-blur-md border border-white/15 rounded-xl p-3 sm:p-3.5 text-white space-y-1.5 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#6EA928]/20 border border-[#6EA928]/40 flex items-center justify-center text-sm text-[#8CE22F] shrink-0">
                      📞
                    </div>
                    <div>
                      <div className="text-[9px] font-black uppercase tracking-wider text-[#8CE22F]">
                        Certified Loan Specialists
                      </div>
                      <div className="text-xs font-bold text-white leading-tight">
                        Instant In-Principle Sanction Guidance
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-300 leading-tight">
                    Our advisors negotiate directly with 15+ premier lending institutions to unlock maximum loan eligibility with zero advance fees.
                  </p>

                  {/* Partner Banks Strip */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-[9px] text-slate-300 font-bold uppercase tracking-wider">
                    <span>SBI</span>
                    <span>•</span>
                    <span>HDFC</span>
                    <span>•</span>
                    <span>ICICI</span>
                    <span>•</span>
                    <span>BAJAJ</span>
                    <span>•</span>
                    <span>KOTAK</span>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
