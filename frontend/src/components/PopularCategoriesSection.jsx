import { useState } from 'react';

export default function PopularCategoriesSection({ categories, onSelectCategory }) {
  const [activeFamily, setActiveFamily] = useState('ALL');

  const allCategories = [
    {
      id: 'cat-personal',
      family: 'RETAIL',
      name: 'Personal Loan',
      icon: '👤',
      badge: 'QUICK DISBURSAL',
      rate: 'From 10.5% p.a.',
      maxAmount: 'Up to ₹ 15 Lakhs',
      tenure: '12 - 60 Months',
      perk: 'Instant unsecured credit for weddings, holidays, medical emergencies, or debt consolidation.'
    },
    {
      id: 'cat-business',
      family: 'BUSINESS',
      name: 'Business Loan',
      icon: '🏢',
      badge: 'WORKING CAPITAL',
      rate: 'From 11.5% p.a.',
      maxAmount: 'Up to ₹ 50 Lakhs',
      tenure: '12 - 84 Months',
      perk: 'Collateral-free trade financing, inventory restocking, and retail enterprise expansion.'
    },
    {
      id: 'cat-home',
      family: 'PROPERTY',
      name: 'Home Loan',
      icon: '🏠',
      badge: 'LOWEST MONTHLY EMI',
      rate: 'From 8.4% p.a.',
      maxAmount: 'Up to ₹ 1.5 Crores',
      tenure: 'Up to 30 Years',
      perk: 'Competitive housing purchase, flat construction, and plot loan solutions with tax benefits.'
    },
    {
      id: 'cat-car',
      family: 'RETAIL',
      name: 'Car Loan',
      icon: '🚗',
      badge: '95% ON-ROAD',
      rate: 'From 8.85% p.a.',
      maxAmount: 'Up to ₹ 50 Lakhs',
      tenure: '12 - 84 Months',
      perk: 'Fast-track financing for new and pre-owned personal cars with dealer tie-up discounts.'
    },
    {
      id: 'cat-gold',
      family: 'RETAIL',
      name: 'Gold Loan',
      icon: '🪙',
      badge: 'LOWEST INTEREST',
      rate: 'From 8.5% p.a.',
      maxAmount: 'Up to ₹ 30 Lakhs',
      tenure: '3 - 36 Months',
      perk: 'Instant 15-minute cash or NEFT against gold jewelry with bank locker grade security.'
    },
    {
      id: 'cat-education',
      family: 'RETAIL',
      name: 'Education Loan',
      icon: '🎓',
      badge: 'OVERSEAS & DOMESTIC',
      rate: 'From 9.25% p.a.',
      maxAmount: 'Up to ₹ 1 Crore',
      tenure: 'Up to 15 Years',
      perk: '100% course fee and living costs coverage for university studies in India and 30+ countries.'
    },
    {
      id: 'cat-mortgage',
      family: 'PROPERTY',
      name: 'Mortgage Loan',
      icon: '🏛️',
      badge: 'HIGH VALUE CAPITAL',
      rate: 'From 9.0% p.a.',
      maxAmount: 'Up to ₹ 5 Crores',
      tenure: 'Up to 15 Years',
      perk: 'Structured high-ticket real estate mortgage lines against residential or commercial assets.'
    },
    {
      id: 'cat-lap',
      family: 'PROPERTY',
      name: 'Loan Against Property (LAP)',
      icon: '🏢',
      badge: 'MAX LTV',
      rate: 'From 9.15% p.a.',
      maxAmount: 'Up to ₹ 3 Crores',
      tenure: 'Up to 15 Years',
      perk: 'Unlock locked equity from your residential or commercial real estate at lower rates.'
    },
    {
      id: 'cat-professional',
      family: 'PROFESSIONAL',
      name: 'Professional Loan',
      icon: '💼',
      badge: 'FOR CA / CS / ARCHITECT',
      rate: 'From 10.75% p.a.',
      maxAmount: 'Up to ₹ 40 Lakhs',
      tenure: '12 - 60 Months',
      perk: 'Unsecured customized credit lines for practicing Chartered Accountants, CS, and Architects.'
    },
    {
      id: 'cat-doctor',
      family: 'PROFESSIONAL',
      name: 'Doctor Loan',
      icon: '🩺',
      badge: 'HEALTHCARE SPECIAL',
      rate: 'From 9.99% p.a.',
      maxAmount: 'Up to ₹ 75 Lakhs',
      tenure: '12 - 84 Months',
      perk: 'Pre-approved high-ticket funding for Doctors, Dentists, and Surgeons for clinic expansion.'
    },
    {
      id: 'cat-equipment',
      family: 'EQUIPMENT',
      name: 'Equipment Loan',
      icon: '⚙️',
      badge: 'MACHINERY ASSETS',
      rate: 'From 10.95% p.a.',
      maxAmount: 'Up to ₹ 3 Crores',
      tenure: '12 - 84 Months',
      perk: 'Finance industrial machinery, diagnostic systems, and manufacturing plant tools.'
    },
    {
      id: 'cat-commercial-vehicle',
      family: 'EQUIPMENT',
      name: 'Commercial Vehicle Loan',
      icon: '🚛',
      badge: 'FLEET & TRUCKS',
      rate: 'From 10.5% p.a.',
      maxAmount: 'Up to ₹ 1.5 Crores',
      tenure: '12 - 60 Months',
      perk: 'Affordable financing for heavy trucks, buses, tippers, tankers, and light commercial vehicles.'
    },
    {
      id: 'cat-working-capital',
      family: 'BUSINESS',
      name: 'Working Capital Loan',
      icon: '📈',
      badge: 'CC / OD LIMITS',
      rate: 'From 11.25% p.a.',
      maxAmount: 'Up to ₹ 5 Crores',
      tenure: '12 - 36 Months',
      perk: 'Revolving Cash Credit (CC) and Overdraft (OD) to maintain business liquidity and inventory.'
    },
    {
      id: 'cat-sep',
      family: 'PROFESSIONAL',
      name: 'Self-Employed Professional Loan',
      icon: '👔',
      badge: 'FREELANCE / CONSULTANT',
      rate: 'From 11.75% p.a.',
      maxAmount: 'Up to ₹ 30 Lakhs',
      tenure: '12 - 60 Months',
      perk: 'Quick unsecured funding for independent consultants, engineers, tech leads, and designers.'
    },
    {
      id: 'cat-construction-equipment',
      family: 'EQUIPMENT',
      name: 'Construction Equipment Loan',
      icon: '🏗️',
      badge: 'HEAVY INFRA',
      rate: 'From 10.75% p.a.',
      maxAmount: 'Up to ₹ 5 Crores',
      tenure: '12 - 60 Months',
      perk: 'Asset loans for excavators, road rollers, cranes, backhoe loaders, and heavy earthmovers.'
    },
    {
      id: 'cat-other',
      family: 'RETAIL',
      name: 'Other Financial Products',
      icon: '💳',
      badge: 'BALANCE TRANSFER & TOP-UP',
      rate: 'From 9.75% p.a.',
      maxAmount: 'Up to ₹ 1 Crore',
      tenure: '12 - 84 Months',
      perk: 'Debt consolidation, balance transfers with top-up, microfinance, and bespoke credit products.'
    }
  ];

  const families = [
    { id: 'ALL', label: 'All Financial Products (16)' },
    { id: 'RETAIL', label: '👤 Retail & Personal' },
    { id: 'BUSINESS', label: '🏢 Business & Working Capital' },
    { id: 'PROPERTY', label: '🏠 Property & Mortgage' },
    { id: 'PROFESSIONAL', label: '🩺 Doctors & Professionals' },
    { id: 'EQUIPMENT', label: '🚛 Commercial & Equipment' }
  ];

  const filteredCategories = activeFamily === 'ALL'
    ? allCategories
    : allCategories.filter(c => c.family === activeFamily);

  const handleCardClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="popular-categories" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Comprehensive Financial Supermarket
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore All 16 Loan Categories
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            From retail and housing finance to medical, enterprise working capital, and heavy machinery — discover tailored loan solutions across India.
          </p>
        </div>

        {/* Category Family Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {families.map((fam) => (
            <button
              key={fam.id}
              onClick={() => setActiveFamily(fam.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFamily === fam.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {fam.label}
            </button>
          ))}
        </div>

        {/* 16 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredCategories.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item.id)}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-emerald-500/10 cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-xl group-hover:bg-emerald-600 transition-colors shadow-md">
                    {item.icon}
                  </div>
                  <span className="text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.perk}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase font-bold">Interest Rate</span>
                    <span className="font-extrabold text-emerald-400">{item.rate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase font-bold">Sanction Limit</span>
                    <span className="font-extrabold text-white">{item.maxAmount}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-slate-300 group-hover:text-emerald-400 pt-1">
                  <span>Explore Loans</span>
                  <span className="transform group-hover:translate-x-1 transition-transform text-xs">➔</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
