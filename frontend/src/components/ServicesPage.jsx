import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import PopularCategoriesSection from './PopularCategoriesSection';
import LoanProducts from './LoanProducts';
import QuickEnquirySection from './QuickEnquirySection';
import Footer from './Footer';
import logoImg from '../assets/Logo.jpeg';

export default function ServicesPage({
  categories = [],
  products = [],
  onSwitchToHome,
  onSwitchToAdmin,
  onSelectProduct,
  onViewDetails,
  onApplyClick,
  onLeadSubmitted,
  initialSearchFilter = null,
  initialCategoryId = 'all'
}) {
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(initialCategoryId || 'all');
  const [searchFilterData, setSearchFilterData] = useState(initialSearchFilter);

  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategoryFilter(initialCategoryId);
    }
  }, [initialCategoryId]);

  useEffect(() => {
    if (initialSearchFilter) {
      setSearchFilterData(initialSearchFilter);
      if (initialSearchFilter.selectedCat && initialSearchFilter.selectedCat !== 'ALL') {
        setSelectedCategoryFilter(initialSearchFilter.selectedCat);
      }
      setTimeout(() => {
        const el = document.getElementById('products');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  }, [initialSearchFilter]);

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
        onViewDetails={onViewDetails || onSelectProduct}
        initialCategoryId={selectedCategoryFilter}
        searchFilter={searchFilterData}
      />

      {/* 5. SECTION C: QUICK ENQUIRY ASSISTANCE DESK */}
      <QuickEnquirySection
        categories={categories}
        onLeadSubmitted={onLeadSubmitted}
      />

      {/* 6. SERVICES PAGE PREMIUM MODULAR FOOTER */}
      <Footer onSwitchView={onSwitchToAdmin} />
    </div>
  );
}

