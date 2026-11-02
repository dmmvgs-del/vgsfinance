import { useState } from 'react';

export default function DocumentsInfo() {
  const [activeTab, setActiveTab] = useState('salaried');

  const docCategories = {
    salaried: {
      title: 'Salaried Employees',
      icon: '💼',
      docs: [
        { name: 'Identity Proof', desc: 'PAN Card (Mandatory) along with Aadhaar Card or Passport' },
        { name: 'Address Proof', desc: 'Aadhaar Card, Utility Bill, or Registered Rental Agreement' },
        { name: 'Income Proof', desc: 'Latest 3 months salary slips with company seal/digital signature' },
        { name: 'Bank Statement', desc: 'Last 6 months salary account bank statement showing regular pay credits' },
        { name: 'Employment Proof', desc: 'Official Company ID card or Employment Offer Letter' },
        { name: 'Tax Documents', desc: 'Latest Form 16 or Income Tax Returns (ITR) for the past 2 years' }
      ]
    },
    business: {
      title: 'Business & Self-Employed',
      icon: '🏢',
      docs: [
        { name: 'KYC Documents', desc: 'Promoter / Partner PAN Card and Aadhaar Card' },
        { name: 'Business Registration Proof', desc: 'GST Certificate, MSME/Udyam Registration, or Trade License' },
        { name: 'Income Tax Returns (ITR)', desc: 'Past 2 to 3 years ITR with Computation of Income and Audited Balance Sheets' },
        { name: 'Current Account Bank Statement', desc: 'Last 12 months primary business current bank account statement' },
        { name: 'Business Address Proof', desc: 'Commercial property electricity bill or registered lease agreement' },
        { name: 'GST Returns (GSTR-3B / 1)', desc: 'Filed GST return copies for the last 12 months' }
      ]
    },
    gold: {
      title: 'Gold Loan Applicants',
      icon: '🪙',
      docs: [
        { name: 'Basic KYC Verification', desc: 'Aadhaar Card and PAN Card (or Form 60)' },
        { name: 'Passport Photographs', desc: '2 recent passport-size color photographs' },
        { name: 'Gold Ornaments', desc: 'Physical presentation of 18k to 24k gold jewelry for appraisal and purity check' },
        { name: 'Bank Account Proof', desc: 'Cancelled cheque or passbook copy for instant NEFT/IMPS disbursement' }
      ]
    },
    property: {
      title: 'Home & Mortgage Loans',
      icon: '🏠',
      docs: [
        { name: 'Property Title Deeds', desc: 'Registered Sale Deed and 30-year link chain documents' },
        { name: 'Encumbrance Certificate (EC)', desc: 'Form 15/16 Encumbrance Certificate for past 15 to 30 years from Sub-Registrar' },
        { name: 'Approved Building Plan', desc: 'Municipal/Gram Panchayat approved layout and building plan sanction' },
        { name: 'Property Tax Receipts', desc: 'Latest property tax and municipal cess payment receipts' },
        { name: 'Income Verification', desc: 'Applicant and Co-applicant income documents & CIBIL report' }
      ]
    }
  };

  return (
    <section id="documents" className="py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            Documentation Guide
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Required Documents for Loan Processing
          </h2>
          <p className="text-sm text-slate-400">
            Keep these essential documents ready to accelerate your verification and loan sanction.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
          {Object.entries(docCategories).map(([key, data]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === key
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{data.icon}</span>
              <span>{data.title}</span>
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {docCategories[activeTab].docs.map((doc, idx) => (
            <div
              key={idx}
              className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex items-start gap-4 hover:border-indigo-500/40 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 font-bold flex items-center justify-center shrink-0 border border-indigo-500/20 text-xs">
                {idx + 1}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">{doc.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{doc.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
