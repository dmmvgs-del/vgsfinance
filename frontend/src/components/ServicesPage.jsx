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

      {/* 2. SECTION A: EXPLORE ALL 16 CATEGORIES */}
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

