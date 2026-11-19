import { useState } from 'react';

export default function DocumentsInfo() {
  const [activeTab, setActiveTab] = useState('salaried');

  const docCategories = {
    salaried: {
      title: 'Salaried Employees',
      icon: '💼',
      docs: [
        { id: 'pan', name: 'PAN Card', iconType: 'pan', hint: 'Mandatory ID' },
        { id: 'aadhaar', name: 'Aadhaar card', iconType: 'aadhaar', hint: 'UIDAI e-KYC' },
        { id: 'address', name: 'Address Proof', iconType: 'address', hint: 'Electricity / Rent' },
        { id: 'bank', name: 'Bank Details', iconType: 'bank', hint: 'Last 6M Salary A/C' },
        { id: 'income', name: 'Salary Slips', iconType: 'salary', hint: 'Latest 3 Months' },
        { id: 'photo', name: 'Passport size photo', iconType: 'photo', hint: 'Recent 2 Photos' }
      ]
    },
    business: {
      title: 'Business & Self-Employed',
      icon: '🏢',
      docs: [
        { id: 'pan', name: 'PAN Card', iconType: 'pan', hint: 'Promoter / Firm' },
        { id: 'aadhaar', name: 'Aadhaar card', iconType: 'aadhaar', hint: 'Promoter KYC' },
        { id: 'business-reg', name: 'Business Proof', iconType: 'business', hint: 'GST / MSME Udyam' },
        { id: 'bank', name: 'Bank Details', iconType: 'bank', hint: '12M Current A/C' },
        { id: 'income', name: 'ITR & P&L', iconType: 'salary', hint: 'Past 2-3 Years' },
        { id: 'photo', name: 'Passport size photo', iconType: 'photo', hint: 'Recent Photos' }
      ]
    },
    gold: {
      title: 'Gold Loan Applicants',
      icon: '🪙',
      docs: [
        { id: 'pan', name: 'PAN Card', iconType: 'pan', hint: 'Mandatory ID' },
        { id: 'aadhaar', name: 'Aadhaar card', iconType: 'aadhaar', hint: 'Instant e-KYC' },
        { id: 'address', name: 'Address Proof', iconType: 'address', hint: 'Current Residence' },
        { id: 'bank', name: 'Bank Details', iconType: 'bank', hint: 'For Quick Disbursal' },
        { id: 'gold', name: 'Gold Ornaments', iconType: 'gold', hint: '18K to 22K Purity' },
        { id: 'photo', name: 'Passport size photo', iconType: 'photo', hint: '2 Passport Photos' }
      ]
    },
    home: {
      title: 'Home & Mortgage Loans',
      icon: '🏡',
      docs: [
        { id: 'pan', name: 'PAN Card', iconType: 'pan', hint: 'All Borrowers' },
        { id: 'aadhaar', name: 'Aadhaar card', iconType: 'aadhaar', hint: 'Identity Proof' },
        { id: 'property', name: 'Property Deeds', iconType: 'property', hint: 'Title & EC Copies' },
        { id: 'bank', name: 'Bank Details', iconType: 'bank', hint: 'Last 12M Statements' },
        { id: 'income', name: 'Income Proof', iconType: 'salary', hint: 'Salary / 3Y ITR' },
        { id: 'photo', name: 'Passport size photo', iconType: 'photo', hint: 'Recent Photos' }
      ]
    },
    doctors: {
      title: 'Doctors & Medical Clinics',
      icon: '🩺',
      docs: [
        { id: 'pan', name: 'PAN Card', iconType: 'pan', hint: 'Doctor Personal ID' },
        { id: 'aadhaar', name: 'Aadhaar card', iconType: 'aadhaar', hint: 'Identity Proof' },
        { id: 'doctor-reg', name: 'MCI Registration', iconType: 'doctor', hint: 'Medical Council Reg.' },
        { id: 'bank', name: 'Bank Details', iconType: 'bank', hint: '12M Clinic A/C' },
        { id: 'degree', name: 'Medical Degree', iconType: 'business', hint: 'MBBS / MD / BDS' },
        { id: 'photo', name: 'Passport size photo', iconType: 'photo', hint: 'Passport Photos' }
      ]
    }
  };

  // Render Illustrated Vector Icons matching User Reference Image
  const renderIcon = (type) => {
    switch (type) {
      case 'pan':
        return (
          <svg className="w-24 h-16 sm:w-28 sm:h-18 drop-shadow-xs" viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Card Background */}
            <rect x="3" y="3" width="104" height="64" rx="10" fill="#F8FAFC" stroke="#93C5FD" strokeWidth="2.5" />
            {/* Avatar Circle */}
            <circle cx="26" cy="27" r="12" fill="#DBEAFE" />
            <circle cx="26" cy="23" r="5" fill="#3B82F6" />
            <path d="M17 36C17 31 21 29 26 29C31 29 35 31 35 36" fill="#3B82F6" />
            {/* Card Data Lines */}
            <rect x="46" y="20" width="46" height="4" rx="2" fill="#BFDBFE" />
            <rect x="46" y="28" width="32" height="4" rx="2" fill="#E2E8F0" />
            <rect x="16" y="47" width="38" height="4" rx="2" fill="#E2E8F0" />
            {/* PAN Label */}
            <text x="70" y="52" fill="#2563EB" fontSize="13" fontWeight="900" fontFamily="system-ui, sans-serif" letterSpacing="0.5">PAN</text>
          </svg>
        );

      case 'aadhaar':
        return (
          <svg className="w-24 h-16 sm:w-28 sm:h-18 drop-shadow-xs" viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="104" height="64" rx="10" fill="#F8FAFC" stroke="#93C5FD" strokeWidth="2.5" />
            <circle cx="26" cy="27" r="12" fill="#DBEAFE" />
            <circle cx="26" cy="23" r="5" fill="#3B82F6" />
            <path d="M17 36C17 31 21 29 26 29C31 29 35 31 35 36" fill="#3B82F6" />
            <rect x="46" y="20" width="46" height="4" rx="2" fill="#BFDBFE" />
            <rect x="46" y="28" width="30" height="4" rx="2" fill="#E2E8F0" />
            <rect x="16" y="47" width="36" height="4" rx="2" fill="#E2E8F0" />
            {/* Aadhaar Fingerprint / Sun Emblem */}
            <g transform="translate(68, 33)">
              <circle cx="16" cy="11" r="9" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.2" />
              <path d="M16 6C13.5 6 11 8 11 10.5C11 12.5 13 14 16 14C19 14 21 12.5 21 10.5C21 8 18.5 6 16 6Z" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M16 8C14.5 8 13.5 9 13.5 10.5C13.5 11.5 14.5 12.5 16 12.5C17.5 12.5 18.5 11.5 18.5 10.5" stroke="#3B82F6" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <text x="16" y="25" textAnchor="middle" fill="#64748B" fontSize="6.5" fontWeight="bold" fontFamily="system-ui, sans-serif" letterSpacing="0.5">AADHAAR</text>
            </g>
          </svg>
        );

      case 'address':
        return (
          <svg className="w-24 h-16 sm:w-28 sm:h-18 drop-shadow-xs" viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="104" height="64" rx="10" fill="#F8FAFC" stroke="#93C5FD" strokeWidth="2.5" />
            <circle cx="26" cy="27" r="12" fill="#DBEAFE" />
            <circle cx="26" cy="23" r="5" fill="#3B82F6" />
            <path d="M17 36C17 31 21 29 26 29C31 29 35 31 35 36" fill="#3B82F6" />
            <rect x="46" y="20" width="46" height="4" rx="2" fill="#BFDBFE" />
            <rect x="46" y="28" width="32" height="4" rx="2" fill="#E2E8F0" />
            <rect x="16" y="47" width="36" height="4" rx="2" fill="#E2E8F0" />
            {/* House Badge in bottom right */}
            <circle cx="82" cy="46" r="14" fill="#3B82F6" />
            <path d="M82 38L74 44.5V53H79V48H85V53H90V44.5L82 38Z" fill="white" />
          </svg>
        );

      case 'bank':
        return (
          <svg className="w-24 h-16 sm:w-28 sm:h-18 drop-shadow-xs" viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Classical Bank Pillars & Building */}
            <path d="M50 14L24 25H76L50 14Z" fill="#93C5FD" />
            <rect x="23" y="25" width="54" height="4" rx="1" fill="#60A5FA" />
            {/* 3 Pillars */}
            <rect x="28" y="31" width="8" height="19" rx="2" fill="#93C5FD" />
            <rect x="46" y="31" width="8" height="19" rx="2" fill="#93C5FD" />
            <rect x="64" y="31" width="8" height="19" rx="2" fill="#93C5FD" />
            {/* Steps Foundation */}
            <rect x="20" y="52" width="60" height="4" rx="1" fill="#60A5FA" />
            <rect x="16" y="57" width="68" height="4" rx="1" fill="#93C5FD" />
            {/* Rupee Circle Badge */}
            <circle cx="78" cy="48" r="14" fill="#3B82F6" />
            <text x="78" y="53" textAnchor="middle" fill="white" fontSize="13" fontWeight="900" fontFamily="system-ui, sans-serif">₹</text>
          </svg>
        );

      case 'photo':
        return (
          <svg className="w-24 h-16 sm:w-28 sm:h-18 drop-shadow-xs" viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Back photo frame */}
            <g transform="translate(26, 8)">
              <rect x="0" y="0" width="38" height="48" rx="6" fill="#F8FAFC" stroke="#BFDBFE" strokeWidth="2.5" />
              <circle cx="19" cy="18" r="7" fill="#BFDBFE" />
              <path d="M8 38C8 30 13 28 19 28C25 28 30 30 30 38" fill="#BFDBFE" />
            </g>
            {/* Front photo frame */}
            <g transform="translate(42, 14)">
              <rect x="0" y="0" width="38" height="48" rx="6" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="2.5" />
              <circle cx="19" cy="17" r="7.5" fill="#FCD34D" />
              <path d="M13 14C13 10 16 7 19 7C22 7 25 10 25 14C23 13 21 13 19 13C17 13 15 13 13 14Z" fill="#1E293B" />
              <path d="M7 40C7 31 12 28 19 28C26 28 31 31 31 40" fill="#3B82F6" />
              <polygon points="19,34 16,28 22,28" fill="#FFFFFF" />
            </g>
          </svg>
        );

      case 'salary':
        return (
          <svg className="w-24 h-16 sm:w-28 sm:h-18 drop-shadow-xs" viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="22" y="8" width="56" height="54" rx="8" fill="#F8FAFC" stroke="#86EFAC" strokeWidth="2.5" />
            <rect x="30" y="16" width="40" height="4" rx="2" fill="#4ADE80" />
            <rect x="30" y="24" width="30" height="3" rx="1.5" fill="#CBD5E1" />
            <rect x="30" y="31" width="34" height="3" rx="1.5" fill="#CBD5E1" />
            <rect x="30" y="38" width="22" height="3" rx="1.5" fill="#CBD5E1" />
            <circle cx="76" cy="46" r="14" fill="#22C55E" />
            <text x="76" y="51" textAnchor="middle" fill="white" fontSize="13" fontWeight="900" fontFamily="system-ui, sans-serif">₹</text>
          </svg>
        );

      case 'business':
        return (
          <svg className="w-24 h-16 sm:w-28 sm:h-18 drop-shadow-xs" viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="18" y="10" width="62" height="50" rx="8" fill="#F8FAFC" stroke="#93C5FD" strokeWidth="2.5" />
            <rect x="28" y="18" width="42" height="4" rx="2" fill="#60A5FA" />
            <rect x="28" y="26" width="32" height="3" rx="1.5" fill="#CBD5E1" />
            <rect x="28" y="33" width="36" height="3" rx="1.5" fill="#CBD5E1" />
            <circle cx="76" cy="46" r="14" fill="#3B82F6" />
            <path d="M72 46L75 49L81 43" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        );

      case 'gold':
        return (
          <svg className="w-24 h-16 sm:w-28 sm:h-18 drop-shadow-xs" viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="35" r="23" stroke="#FDE047" strokeWidth="3" strokeDasharray="3 3" fill="none" />
            <circle cx="50" cy="35" r="17" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
            <circle cx="50" cy="35" r="11" fill="#FEF08A" />
            <text x="50" y="40" textAnchor="middle" fill="#B45309" fontSize="13" fontWeight="900" fontFamily="system-ui, sans-serif">22K</text>
            <circle cx="76" cy="46" r="12" fill="#EAB308" />
            <path d="M76 41V51M71 46H81" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'property':
        return (
          <svg className="w-24 h-16 sm:w-28 sm:h-18 drop-shadow-xs" viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="22" y="8" width="54" height="54" rx="8" fill="#F8FAFC" stroke="#93C5FD" strokeWidth="2.5" />
            <rect x="30" y="16" width="38" height="4" rx="2" fill="#60A5FA" />
            <rect x="30" y="24" width="28" height="3" rx="1.5" fill="#CBD5E1" />
            <rect x="30" y="31" width="34" height="3" rx="1.5" fill="#CBD5E1" />
            <circle cx="76" cy="46" r="14" fill="#3B82F6" />
            <path d="M76 40L69 45.5V52H74V48H78V52H83V45.5L76 40Z" fill="white" />
          </svg>
        );

      case 'doctor':
        return (
          <svg className="w-24 h-16 sm:w-28 sm:h-18 drop-shadow-xs" viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="8" width="58" height="54" rx="8" fill="#F8FAFC" stroke="#93C5FD" strokeWidth="2.5" />
            <rect x="28" y="16" width="42" height="4" rx="2" fill="#38BDF8" />
            <rect x="28" y="24" width="28" height="3" rx="1.5" fill="#CBD5E1" />
            <rect x="28" y="31" width="34" height="3" rx="1.5" fill="#CBD5E1" />
            <circle cx="76" cy="46" r="14" fill="#0EA5E9" />
            <path d="M76 39V53M69 46H83" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      default:
        return (
          <svg className="w-24 h-16 sm:w-28 sm:h-18 drop-shadow-xs" viewBox="0 0 110 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="104" height="64" rx="10" fill="#F8FAFC" stroke="#93C5FD" strokeWidth="2.5" />
            <circle cx="55" cy="35" r="14" fill="#DBEAFE" />
            <path d="M55 27V43M47 35H63" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <section id="documents" className="py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-200/80 relative overflow-hidden">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 space-y-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
          <div className="space-y-2 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-xs font-black tracking-wide uppercase">
              <span>📋 Verification Checklist</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#041E2B] tracking-tight">
              Required Documents for Loan Processing
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Keep these simple, essential documents ready for instant paperless verification and swift disbursal across 15+ partner banks.
            </p>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs shrink-0 self-start md:self-end">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6EA928] animate-pulse"></span>
            <span>Digital e-KYC & Digilocker Upload Supported</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-white p-2 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {Object.entries(docCategories).map(([key, data]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`px-4 py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer text-center ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-[#0A5C80] to-[#0D749E] text-white shadow-md shadow-[#0A5C80]/20 scale-[1.01]'
                    : 'bg-transparent text-slate-600 hover:text-[#0A5C80] hover:bg-slate-50'
                }`}
              >
                <span className="text-base sm:text-lg">{data.icon}</span>
                <span className="truncate">{data.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* =========================================================================
            CLEAN MINIMALIST DOCUMENTS ROW (MATCHING USER'S EXACT REFERENCE DESIGN)
           ========================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6 sm:gap-10 items-center justify-items-center">
            {docCategories[activeTab].docs.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col items-center text-center group cursor-default transition-all"
              >
                {/* Clean Vector Illustrated Document Card */}
                <div className="w-24 h-18 sm:w-28 sm:h-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-1">
                  {renderIcon(doc.iconType)}
                </div>

                {/* Bold Document Name Label */}
                <span className="font-bold text-slate-800 text-xs sm:text-sm sm:text-base mt-3 group-hover:text-[#0A5C80] transition-colors leading-tight">
                  {doc.name}
                </span>

                {/* Subtle Hint */}
                {doc.hint && (
                  <span className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {doc.hint}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
