import { useState } from 'react';
import Navbar from './Navbar';
import PopularCategoriesSection from './PopularCategoriesSection';
import LoanProducts from './LoanProducts';
import QuickEnquirySection from './QuickEnquirySection';
import logoImg from '../assets/Logo.jpeg';

export default function ServicesPage({
  categories = [],
  products = [],
  onSwitchToHome,
  onSwitchToAdmin,
  onSelectProduct,
  onApplyClick,
  onLeadSubmitted
}) {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [searchFilterData, setSearchFilterData] = useState(null);

  const handleCategorySelect = (catId) => {
    setSelectedCategoryFilter(catId);
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSwitchView = (view) => {
    if (view === 'website') onSwitchToHome();
    else if (view === 'admin') onSwitchToAdmin();
    else if (view === 'services') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#6EA928] selection:text-white">
      {/* 1. TOP NAVBAR */}
      <Navbar
        currentView="services"
        setCurrentView={handleSwitchView}
        onApplyClick={onApplyClick}
      />

      {/* 2. SERVICES PAGE HERO BANNER */}
      <div className="bg-gradient-to-b from-[#041E2B] via-[#073347] to-[#0A5C80] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#0A5C80]/30 relative overflow-hidden">
        {/* Ambient Glow Ribbons */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#6EA928]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#0A5C80]/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-6 relative z-10 text-center sm:text-left">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-slate-300">
            <button
              onClick={onSwitchToHome}
              className="hover:text-[#6EA928] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>🏠 Home</span>
            </button>
            <span className="text-[#6EA928]">➔</span>
            <span className="text-white bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
              Services & All Loan Categories
            </span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/40 text-[#0A5C80] text-xs font-black tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#6EA928] animate-ping"></span>
              <span>Centralized Financial Supermarket</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              All Financial Services &{' '}
              <span className="bg-gradient-to-r from-[#6EA928] to-[#9CD94E] bg-clip-text text-transparent">
                Loan Categories
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-2xl">
              Explore our full multi-bank lending catalog across all 16 retail, commercial, medical, property, and MSME loan categories. Compare transparent rates, check eligibility, and submit 1-click applications.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 max-w-4xl">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl sm:text-3xl font-black text-[#6EA928]">16+</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Loan Categories</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl sm:text-3xl font-black text-[#6EA928]">15+</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Partner Banks & NBFCs</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl sm:text-3xl font-black text-[#6EA928]">8.40%</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Rates Starting From</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="text-2xl sm:text-3xl font-black text-[#6EA928]">2-Hour</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">In-Principle Sanctions</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SECTION A: EXPLORE ALL 16 CATEGORIES */}
      <PopularCategoriesSection
        categories={categories}
        onSelectCategory={handleCategorySelect}
      />

      {/* 4. SECTION B: CENTRALIZED PRODUCT MARKETPLACE & COMPARISON ENGINE */}
      <LoanProducts
        products={products}
        categories={categories}
        onSelectProduct={onSelectProduct}
        onViewDetails={onSelectProduct}
        initialCategoryId={selectedCategoryFilter}
        searchFilter={searchFilterData}
      />

      {/* 5. SECTION C: QUICK ENQUIRY ASSISTANCE DESK */}
      <QuickEnquirySection
        onLeadSubmitted={onLeadSubmitted}
      />

      {/* 6. SERVICES PAGE FOOTER */}
      <footer className="bg-[#041E2B] text-slate-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-[#0A5C80]/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="VGS Finance" className="w-12 h-12 object-contain rounded-xl bg-white p-1" />
            <div>
              <div className="text-base font-black text-white">VGS FINANCIAL SERVICES</div>
              <div className="text-xs text-[#6EA928] font-bold">LOAN SUPER MARKET • ISO COMPLIANT</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-300">
            <button onClick={onSwitchToHome} className="hover:text-[#6EA928] transition-colors cursor-pointer">
              Home
            </button>
            <a href="#popular-categories" className="hover:text-[#6EA928] transition-colors">
              16 Categories
            </a>
            <a href="#products" className="hover:text-[#6EA928] transition-colors">
              Loan Supermarket
            </a>
            <button onClick={onSwitchToAdmin} className="hover:text-[#6EA928] transition-colors cursor-pointer">
              Admin Portal
            </button>
          </div>

          <div className="text-xs text-slate-400 text-center md:text-right">
            © {new Date().getFullYear()} VGS Financial Services Pvt. Ltd. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
