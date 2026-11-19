import { useState } from 'react';

export default function DocumentsInfo() {
  const [activeTab, setActiveTab] = useState('salaried');

  const docCategories = {
    salaried: {
      title: 'Salaried Employees',
      subtitle: 'For IT, Corporate, MNC, and Government professionals',
      icon: '💼',
      highlightTag: 'Instant 2-Hour Approval with Net Banking PDF',
      docs: [
        {
          id: 'pan-aadhaar',
          name: 'Identity & PAN Verification',
          badge: 'Mandatory',
          badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
          desc: 'PAN Card (Mandatory for CIBIL check) along with Aadhaar Card, Passport, or Voter ID.',
          format: 'Digital e-KYC or Clear Color Scan',
          iconType: 'id'
        },
        {
          id: 'address-proof',
          name: 'Current Residence Proof',
          badge: 'Any One',
          badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
          desc: 'Aadhaar Card, latest Electricity bill, Water bill, Gas bill, or Registered Rent Agreement.',
          format: 'Recent (within last 2 months)',
          iconType: 'address'
        },
        {
          id: 'salary-slips',
          name: 'Income Proof (Salary Slips)',
          badge: 'Income Proof',
          badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          desc: 'Latest 3 months salary slips with company seal, digital signature, and PF/Tax deductions.',
          format: 'Official Company PDF',
          iconType: 'income'
        },
        {
          id: 'bank-statement',
          name: 'Salary Account Statement',
          badge: 'Primary Account',
          badgeColor: 'bg-[#E8F5D4] text-[#466E18] border-[#6EA928]/30',
          desc: 'Last 6 months salary bank account statement in original PDF (or net banking e-statement).',
          format: 'Bank Net-Banking PDF (no screenshots)',
          iconType: 'bank'
        },
        {
          id: 'employment-id',
          name: 'Employment Proof',
          badge: 'Company Verified',
          badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
          desc: 'Official Company ID Card, official corporate email ID verification, or latest Appointment Letter.',
          format: 'Physical Card or HR Offer Letter',
          iconType: 'employee'
        },
        {
          id: 'tax-form16',
          name: 'Form 16 / ITR Returns',
          badge: 'Tax Records',
          badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
          desc: 'Latest Form 16 (Part A & B) or Income Tax Return (ITR) acknowledgment for the last 1 to 2 years.',
          format: 'TRACES Form 16 PDF or ITR-V',
          iconType: 'tax'
        }
      ]
    },
    business: {
      title: 'Business & Self-Employed',
      subtitle: 'For Traders, Manufacturers, Retailers, and Service Enterprises',
      icon: '🏢',
      highlightTag: 'Collateral-Free MSME Sanction up to ₹50 Lakhs',
      docs: [
        {
          id: 'promoter-kyc',
          name: 'Promoter & Partner KYC',
          badge: 'Mandatory',
          badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
          desc: 'PAN Card and Aadhaar Card of all Proprietors, Directors, or Partners in the business entity.',
          format: 'Color Scan Copy',
          iconType: 'id'
        },
        {
          id: 'business-reg',
          name: 'Business Registration Proof',
          badge: 'Legal Entity',
          badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          desc: 'GST Certificate, Udyam MSME Registration, Shop & Establishment Act, or Trade License.',
          format: 'Government Certificate PDF',
          iconType: 'business'
        },
        {
          id: 'business-itr',
          name: '3-Year Audited ITR & Balance Sheets',
          badge: 'Financial Audit',
          badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          desc: 'Past 2 to 3 years Income Tax Returns with Computation of Income, CA Audited Balance Sheet & P&L.',
          format: 'CA Certified Copy',
          iconType: 'tax'
        },
        {
          id: 'current-account',
          name: '12 Months Current Bank Account',
          badge: 'Cash Flow',
          badgeColor: 'bg-[#E8F5D4] text-[#466E18] border-[#6EA928]/30',
          desc: 'Last 12 months primary operative current account statement reflecting actual business turnover.',
          format: 'Official Bank Statement PDF',
          iconType: 'bank'
        },
        {
          id: 'gst-returns',
          name: 'GST Returns (GSTR-3B & 1)',
          badge: 'Turnover Check',
          badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
          desc: 'Latest 12 months filed GSTR-3B monthly returns matching with bank credits and sales registers.',
          format: 'GST Portal Filed Receipts',
          iconType: 'income'
        },
        {
          id: 'business-address',
          name: 'Office / Shop Ownership Proof',
          badge: 'Premises Proof',
          badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
          desc: 'Commercial property tax receipt, electricity bill, or registered commercial lease agreement.',
          format: 'Recent Utility Bill or Lease',
          iconType: 'address'
        }
      ]
    },
    property: {
      title: 'Home & Mortgage (LAP)',
      subtitle: 'For Purchase, Construction, Balance Transfer, and Mortgage Loans',
      icon: '🏠',
      highlightTag: 'Lowest Interest Rates Starting from 8.40% p.a.',
      docs: [
        {
          id: 'title-deeds',
          name: 'Registered Title Deed Chain',
          badge: 'Legal Title',
          badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
          desc: 'Original Sale Deed, Gift Deed, Partition Deed, and complete 30-year antecedent link documents.',
          format: 'Certified Sub-Registrar Copies',
          iconType: 'property'
        },
        {
          id: 'ec-certificate',
          name: 'Encumbrance Certificate (EC)',
          badge: 'Nil Encumbrance',
          badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          desc: 'Form 15 & 16 Encumbrance Certificate for past 20 to 30 years reflecting zero outstanding disputes.',
          format: 'MeeSeva / IGRS Portal EC',
          iconType: 'tax'
        },
        {
          id: 'approved-plan',
          name: 'Approved Layout & Building Sanction',
          badge: 'Govt Approved',
          badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
          desc: 'Municipal Corporation, VMRDA, DTCP, or Gram Panchayat sanctioned building plan blueprint.',
          format: 'Town Planning Blueprint',
          iconType: 'business'
        },
        {
          id: 'property-tax',
          name: 'Latest Property Tax Receipts',
          badge: 'Clear Dues',
          badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
          desc: 'Paid municipal assessment tax receipts, water tax, and vacant land tax receipts for the current year.',
          format: 'Official Municipal Tax Receipt',
          iconType: 'address'
        },
        {
          id: 'applicant-income',
          name: 'Income & Repayment Track',
          badge: 'Eligibility',
          badgeColor: 'bg-[#E8F5D4] text-[#466E18] border-[#6EA928]/30',
          desc: 'Salary slips, Form 16, or 3-year Business ITR for main applicant and earning co-applicant.',
          format: 'Last 6 Months Bank Statement',
          iconType: 'income'
        },
        {
          id: 'possession-cert',
          name: 'Occupancy / Possession Letter',
          badge: 'Readiness',
          badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
          desc: 'Occupancy Certificate (OC), Completion Certificate (CC), or Allotment Letter from the builder.',
          format: 'Builder Letter / Municipal OC',
          iconType: 'id'
        }
      ]
    },
    gold: {
      title: 'Gold Loan Applicants',
      subtitle: 'For Instant 15-Minute Sanction against Gold Jewelry & Ornaments',
      icon: '🪙',
      highlightTag: 'Sanction Within 15 Minutes • Zero Paperwork Hassle',
      docs: [
        {
          id: 'gold-kyc',
          name: 'Single Identity & Address Proof',
          badge: 'Mandatory',
          badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
          desc: 'Aadhaar Card, PAN Card (or Form 60 if PAN is unavailable), or Voter ID card.',
          format: 'Original Card for Spot e-KYC',
          iconType: 'id'
        },
        {
          id: 'gold-ornaments',
          name: 'Gold Ornaments (18K to 24K)',
          badge: 'On-Spot Appraisal',
          badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
          desc: 'Physical presentation of gold jewelry, coins, or ornaments for certified carat meter evaluation.',
          format: 'Free In-Branch Purity Check',
          iconType: 'gold'
        },
        {
          id: 'gold-photos',
          name: 'Passport Size Photographs',
          badge: 'Applicant Photo',
          badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
          desc: '2 recent passport size color photos or instant digital web camera capture at branch desk.',
          format: 'Color Photo or Live Camera',
          iconType: 'employee'
        },
        {
          id: 'gold-bank',
          name: 'Bank Account Disbursement Proof',
          badge: 'Instant NEFT',
          badgeColor: 'bg-[#E8F5D4] text-[#466E18] border-[#6EA928]/30',
          desc: 'Cancelled bank cheque or bank passbook copy for direct instant credit of funds within 15 minutes.',
          format: 'Bank Account Passbook / Cheque',
          iconType: 'bank'
        }
      ]
    },
    doctor: {
      title: 'Doctors & Medical Clinics',
      subtitle: 'For MBBS, MD, MS, BDS practitioners, diagnostics, and nursing homes',
      icon: '🩺',
      highlightTag: 'Collateral-Free Professional Loans up to ₹75 Lakhs',
      docs: [
        {
          id: 'medical-reg',
          name: 'MCI / State Medical Council Registration',
          badge: 'Mandatory',
          badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
          desc: 'Medical Council of India (MCI) or State Council Registration Certificate proving valid license to practice.',
          format: 'Council Certificate Copy',
          iconType: 'id'
        },
        {
          id: 'qualification-degree',
          name: 'Highest Educational Degree',
          badge: 'Degree Verified',
          badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          desc: 'MBBS, MD, MS, BDS, MDS, or super-specialty diploma certificates from recognized universities.',
          format: 'Convocation / Degree Certificate',
          iconType: 'employee'
        },
        {
          id: 'clinic-setup',
          name: 'Clinic / Hospital Proof of Continuity',
          badge: 'Clinic Setup',
          badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
          desc: 'Clinical Establishment Act registration, pharmacy license, clinic lease deed, or letterhead.',
          format: 'Clinic Address / Tax Receipt',
          iconType: 'address'
        },
        {
          id: 'doctor-banking',
          name: '12 Months Bank Statements',
          badge: 'Turnover Track',
          badgeColor: 'bg-[#E8F5D4] text-[#466E18] border-[#6EA928]/30',
          desc: 'Primary clinic / hospital current account or savings bank statement showing consultation receipts.',
          format: 'Official Bank Statement PDF',
          iconType: 'bank'
        },
        {
          id: 'doctor-itr',
          name: '2 Years ITR & Audit Statement',
          badge: 'Tax Documents',
          badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          desc: 'Past 2 years Income Tax Returns with Computation of Income and balance sheets (where applicable).',
          format: 'ITR-V Acknowledgement',
          iconType: 'tax'
        },
        {
          id: 'doctor-kyc',
          name: 'Doctor Personal KYC',
          badge: 'Identity Proof',
          badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
          desc: 'PAN Card and Aadhaar Card along with 2 passport photographs of the consulting medical practitioner.',
          format: 'Digital e-KYC Supported',
          iconType: 'business'
        }
      ]
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'id':
        return (
          <svg className="w-5 h-5 text-[#0A5C80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="16" rx="3" />
            <circle cx="9" cy="10" r="2.5" />
            <path d="M15 8h2" />
            <path d="M15 12h2" />
            <path d="M6 16c0-1.5 1.5-2.5 3-2.5s3 1 3 2.5" />
          </svg>
        );
      case 'address':
        return (
          <svg className="w-5 h-5 text-[#0A5C80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        );
      case 'income':
        return (
          <svg className="w-5 h-5 text-[#6EA928]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="12" cy="12" r="3" />
            <path d="M6 12h.01M18 12h.01" />
          </svg>
        );
      case 'bank':
        return (
          <svg className="w-5 h-5 text-[#0A5C80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4" />
          </svg>
        );
      case 'employee':
        return (
          <svg className="w-5 h-5 text-[#0A5C80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'tax':
        return (
          <svg className="w-5 h-5 text-[#6EA928]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        );
      case 'business':
        return (
          <svg className="w-5 h-5 text-[#0A5C80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
          </svg>
        );
      case 'property':
        return (
          <svg className="w-5 h-5 text-[#6EA928]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        );
      case 'gold':
        return (
          <svg className="w-5 h-5 text-[#E5A823]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v10M9 9l6 6M15 9l-6 6" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-[#0A5C80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        );
    }
  };

  return (
    <section id="documents" className="py-16 sm:py-20 bg-slate-50 border-t border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">

        {/* Premium Section Header with Live Security Status Pill */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-xs font-black tracking-wide uppercase">
              <span>📋 Verification Checklist</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#041E2B] tracking-tight">
              Required Documents for Loan Processing
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Keep these simple documents ready to experience fast paperless verification and quick loan disbursal across 15+ partner banks.
            </p>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs shrink-0 self-start md:self-end">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6EA928] animate-pulse"></span>
            <span>Digital e-KYC & Paperless Upload Supported</span>
          </div>
        </div>

        {/* Premium Segmented Category Tabs (Single Smooth Unified Row) */}
        <div className="bg-white p-2 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
            {Object.entries(docCategories).map(([key, data]) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveTab(key)}
                className={`px-3 py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer text-center ${
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


        {/* Premium Documents Grid (Glassmorphism & Rich Visual Tiles) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {docCategories[activeTab].docs.map((doc, idx) => (
            <div
              key={doc.id || idx}
              className="bg-white border border-slate-200/90 hover:border-[#6EA928] p-6 rounded-3xl shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between group"
            >
              {/* Top Accent Gradient Bar on Hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0A5C80] to-[#6EA928] opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="space-y-4">
                {/* Header row: Icon & Status Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#E8F5D4] border border-[#6EA928]/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:shadow-sm transition-all">
                    {renderIcon(doc.iconType)}
                  </div>
                  
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${doc.badgeColor}`}>
                      {doc.badge}
                    </span>
                    <span className="text-xs font-bold text-slate-300 group-hover:text-[#6EA928] transition-colors">
                      0{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Document Title & Description */}
                <div className="space-y-1.5">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#0A5C80] transition-colors tracking-tight">
                    {doc.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {doc.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Format & Checklist Verification Indicator */}
              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <span className="text-[#6EA928]">✓</span>
                  <span className="truncate max-w-[190px]">{doc.format}</span>
                </span>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Ready
                </span>
              </div>
            </div>
          ))}
        </div>



      </div>
    </section>
  );
}
