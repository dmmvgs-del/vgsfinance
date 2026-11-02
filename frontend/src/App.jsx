import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LoanSearchSection from './components/LoanSearchSection';
import PopularCategoriesSection from './components/PopularCategoriesSection';
import FeaturedLoanProducts from './components/FeaturedLoanProducts';
import WhyChooseUs from './components/WhyChooseUs';
import LoanProducts from './components/LoanProducts';
import EmiCalculator from './components/EmiCalculator';
import EligibilityChecker from './components/EligibilityChecker';
import DocumentsInfo from './components/DocumentsInfo';
import CustomerContactWorkflow from './components/CustomerContactWorkflow';
import PartnersSection from './components/PartnersSection';
import TestimonialsSection from './components/TestimonialsSection';
import QuickEnquirySection from './components/QuickEnquirySection';
import ContactEnquiryForm from './components/ContactEnquiryForm';
import AboutCompany from './components/AboutCompany';
import AdminDashboard from './components/AdminDashboard';
import LoanDetailsPage from './components/LoanDetailsPage';

function App() {
  const [currentView, setCurrentView] = useState('website'); // 'website' | 'admin'
  const [landingData, setLandingData] = useState({
    categories: [],
    products: [],
    partners: [],
    testimonials: []
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailedProduct, setDetailedProduct] = useState(null);
  const [prefillData, setPrefillData] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [searchFilterData, setSearchFilterData] = useState(null);

  // Fetch landing page bundle
  const fetchLandingData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/public/landing-data');
      if (res.ok) {
        const json = await res.json();
        setLandingData(json.data);
      }
    } catch (err) {
      console.warn('Backend not reached yet, using default landing dataset', err);
    }
  };

  useEffect(() => {
    fetchLandingData();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApplyClick = () => {
    scrollToSection('contact-enquiry');
  };

  const handleSelectProduct = (prod) => {
    setSelectedProduct(prod);
    scrollToSection('contact-enquiry');
  };

  const handleApplyWithCalculation = (calc) => {
    setPrefillData(calc);
    scrollToSection('contact-enquiry');
  };

  const handleApplyWithEligibleAmount = (elig) => {
    setPrefillData(elig);
    scrollToSection('contact-enquiry');
  };

  const handleCategorySelect = (catId) => {
    setSelectedCategoryFilter(catId);
    scrollToSection('products');
  };

  const handleSearchFilter = (filter) => {
    setSearchFilterData(filter);
    if (filter.selectedCat && filter.selectedCat !== 'ALL') {
      setSelectedCategoryFilter(filter.selectedCat);
    }
    scrollToSection('products');
  };

  const handleQuickApply = ({ categoryId, requestedAmount }) => {
    setPrefillData({ requestedAmount, categoryId });
    scrollToSection('quick-enquiry');
  };

  // If Admin view is active
  if (currentView === 'admin') {
    return <AdminDashboard onSwitchToWebsite={() => setCurrentView('website')} />;
  }

  // Public Landing Website view (Home Page Scope)
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Top Header & Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onApplyClick={handleApplyClick}
      />

      {/* Main Home Page Content */}
      <main className="flex-1 space-y-0">
        
        {/* 1. Hero Banner */}
        <HeroSection
          onApplyClick={handleApplyClick}
          onCalcClick={() => scrollToSection('emi-calc')}
        />

        {/* 2. Loan Search / Enquiry Section */}
        <LoanSearchSection
          categories={landingData.categories || []}
          onSearchFilter={handleSearchFilter}
          onQuickApply={handleQuickApply}
        />

        {/* 3. Popular Loan Categories */}
        <PopularCategoriesSection
          categories={landingData.categories || []}
          onSelectCategory={handleCategorySelect}
        />

        {/* 4. Featured Loan Products */}
        <FeaturedLoanProducts
          products={landingData.products || []}
          onApplyProduct={handleSelectProduct}
          onViewDetails={(prod) => setDetailedProduct(prod)}
        />

        {/* 5. Complete Loan Supermarket & Comparison Engine */}
        <LoanProducts
          products={landingData.products || []}
          categories={landingData.categories || []}
          onSelectProduct={handleSelectProduct}
          onViewDetails={(prod) => setDetailedProduct(prod)}
          initialCategoryId={selectedCategoryFilter}
          searchFilter={searchFilterData}
        />

        {/* Interactive Financial Decision Tools */}
        <EmiCalculator
          onApplyWithCalculation={handleApplyWithCalculation}
        />

        <EligibilityChecker
          onApplyWithEligibleAmount={handleApplyWithEligibleAmount}
        />

        <DocumentsInfo />

        {/* 5. Why Choose Us */}
        <WhyChooseUs
          onApplyClick={handleApplyClick}
        />

        {/* 6. Customer Contact & Loan Lifecycle Tracker */}
        <CustomerContactWorkflow
          onSelectProductClick={() => scrollToSection('products')}
        />

        {/* 6. Financial Partner Section */}
        <PartnersSection
          partners={landingData.partners || []}
        />

        {/* 7. Customer Testimonials */}
        <TestimonialsSection
          testimonials={landingData.testimonials || []}
        />

        {/* 8. Quick Enquiry Section */}
        <QuickEnquirySection
          onLeadSubmitted={fetchLandingData}
        />

        {/* 9. Contact Section & Detailed Application Desk */}
        <ContactEnquiryForm
          selectedProduct={selectedProduct}
          prefillData={prefillData}
          onLeadSubmitted={fetchLandingData}
        />

        {/* Corporate Profile & Transparency Disclosures */}
        <AboutCompany />

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-white text-base">
                ₹
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">VGS FINANCE</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              A comprehensive Loan Supermarket & Financial Services aggregation platform. Providing transparent financing solutions across personal, business, vehicle, gold, and housing loans.
            </p>
          </div>

          <div>
            <div className="font-bold text-white uppercase tracking-wider text-xs mb-3">Quick Navigation</div>
            <ul className="space-y-2">
              <li><a href="#products" className="hover:text-emerald-400">Loan Supermarket</a></li>
              <li><a href="#emi-calc" className="hover:text-emerald-400">EMI Calculator</a></li>
              <li><a href="#eligibility" className="hover:text-emerald-400">Eligibility Criteria</a></li>
              <li><a href="#documents" className="hover:text-emerald-400">Required Documents</a></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white uppercase tracking-wider text-xs mb-3">Regulatory & Compliance</div>
            <ul className="space-y-2">
              <li className="hover:text-emerald-400 cursor-pointer">RBI Regulations & Disclosures</li>
              <li className="hover:text-emerald-400 cursor-pointer">Privacy & Data Protection Policy</li>
              <li className="hover:text-emerald-400 cursor-pointer">Terms & Conditions (T&C)</li>
              <li className="hover:text-emerald-400 cursor-pointer">Fair Practices Code (FPC)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-xs mb-3">Management Portal</div>
            <p>Access loan administration and lead processing desk:</p>
            <button
              onClick={() => setCurrentView('admin')}
              className="mt-1 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-indigo-400 border border-slate-700 rounded-xl font-bold cursor-pointer transition-all"
            >
              🔒 Admin Dashboard Login
            </button>
          </div>

        </div>

        {/* Statutory Regulatory Disclaimer Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3 shadow-xl">
            <span className="text-base mt-0.5">⚠️</span>
            <p className="leading-relaxed text-[11px] sm:text-xs text-amber-200/90">
              <strong className="text-amber-400">Important:</strong> EMI calculations and loan information displayed on the website are indicative. Final interest rates, eligibility, approval, sanction, tenure, processing fees and loan terms are subject to the respective lender / financial institution.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-slate-500">
          <div>
            © 2026 VGS Finance & Loans Management System. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-xs text-slate-400">
            <span>Engineered & Maintained by</span>
            <a
              href="https://www.ascendmedialabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors underline"
            >
              Ascend Media Labs (Visakhapatnam)
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="mailto:reachus@ascendmedialabs.com" className="hover:text-white">
              reachus@ascendmedialabs.com
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="tel:+917675852618" className="hover:text-white font-mono">
              +91 7675852618
            </a>
          </div>
        </div>
      </footer>

      {/* Dedicated Loan Details Page & 13-Section Specification Modal */}
      {detailedProduct && (
        <LoanDetailsPage
          product={detailedProduct}
          categories={landingData.categories || []}
          onClose={() => setDetailedProduct(null)}
          onApplyNow={(data) => {
            setSelectedProduct(data.product);
            setPrefillData({
              requestedAmount: data.requestedAmount,
              tenureMonths: data.tenureMonths,
              monthlyEmi: data.monthlyEmi
            });
            setDetailedProduct(null);
            scrollToSection('contact-enquiry');
          }}
          onEnquireNow={() => {
            scrollToSection('quick-enquiry');
          }}
        />
      )}

    </div>
  );
}

export default App;
