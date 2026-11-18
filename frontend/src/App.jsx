import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LoanSearchSection from './components/LoanSearchSection';
import FeaturedLoanProducts from './components/FeaturedLoanProducts';
import WhyChooseUs from './components/WhyChooseUs';
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
import ServicesPage from './components/ServicesPage';
import { API_BASE_URL } from './config/api';
import logoImg from './assets/Logo.jpeg';

const defaultMedicalLoanProduct = {
  id: 'prod-medical-comprehensive',
  name: 'Medical & Healthcare Loan Solutions',
  categoryName: 'Medical Loan',
  categoryId: 'cat-doctor',
  badge: '🏥 Specialized Healthcare & Medical Financing',
  tagline: 'Comprehensive financing for emergency medical treatments, health insurance bills, clinic setups, and diagnostic equipment.',
  description: 'Our Medical & Healthcare Loan program offers swift financial relief when health emergencies arise or when medical practitioners need capital to expand their practice. Covering everything from immediate surgical admissions and insurance co-pay deductibles to doctor clinic setups and advanced medical equipment acquisitions.',
  interestRate: 9.50,
  minAmount: 50000,
  maxAmount: 20000000,
  minTenure: 12,
  maxTenure: 84,
  processingFee: '0.75% + GST',
  features: [
    'Fast 2-hour hospital clearance & direct hospital NEFT disbursal',
    'Covers health insurance co-pays, deductibles & non-covered therapies',
    'Special high-ticket unsecured capital up to ₹75 Lakhs for Doctors & Dentists',
    'Up to 85% machinery invoice financing up to ₹2 Crores for medical diagnostic equipment',
    'Minimal documentation with paperless digital KYC verification',
    'Flexible repayment tenures from 12 to 84 months with zero prepayment penalties'
  ],
  subOptions: [
    {
      id: 'opt-emergency',
      title: 'Emergency Medical Treatment Loan',
      icon: '🚑',
      tag: 'FAST 2-HR CLEARANCE',
      description: 'Immediate funds for urgent hospital admissions, surgeries, critical care, and medical procedures with direct hospital disbursal.',
      rate: 'From 9.50% p.a.',
      limit: 'Up to ₹ 15 Lakhs',
      tenure: '12 - 48 Months',
      defaultAmount: 300000,
      benefits: ['Direct Hospital NEFT Disbursal', 'Minimal Paperwork in 2 Hours', 'Zero Prepayment Penalty']
    },
    {
      id: 'opt-insurance',
      title: 'Health Insurance & Hospitalization Loan',
      icon: '🛡️',
      tag: 'COVERS DEDUCTIBLES',
      description: 'Financing for insurance co-pays, hospital room upgrades, non-covered therapies, post-discharge medicines, and deductibles.',
      rate: 'From 9.00% p.a.',
      limit: 'Up to ₹ 10 Lakhs',
      tenure: '12 - 36 Months',
      defaultAmount: 200000,
      benefits: ['No Collateral Required', 'Cashless Hospital Assistance', 'Low Pocket-Friendly EMIs']
    },
    {
      id: 'opt-doctor',
      title: 'Doctor & Clinic Practice Loan',
      icon: '🩺',
      tag: 'FOR DOCTORS & DENTISTS',
      description: 'High-ticket unsecured capital for MBBS, MD, MS, BDS practitioners to establish, expand, or renovate private clinics.',
      rate: 'From 9.99% p.a.',
      limit: 'Up to ₹ 75 Lakhs',
      tenure: '12 - 84 Months',
      defaultAmount: 1500000,
      benefits: ['Exclusive Practitioner Rates', 'Doorstep Document Pickup', 'Fast-Track Sanctions']
    },
    {
      id: 'opt-equipment',
      title: 'Medical Equipment & Diagnostic Loan',
      icon: '🔬',
      tag: 'MACHINERY & LAB ASSETS',
      description: 'Asset financing for ultrasound units, digital X-Ray machines, dental chairs, pathology lab tools, and ICU monitors.',
      rate: 'From 10.25% p.a.',
      limit: 'Up to ₹ 2 Crores',
      tenure: '24 - 84 Months',
      defaultAmount: 2500000,
      benefits: ['Up to 85% Machine Invoice Value', 'Flexible Balloon EMIs', 'OEM Dealer Partnerships']
    }
  ],
  eligibility: {
    minAge: 21,
    maxAge: 68,
    minIncome: 25000,
    employmentType: 'Salaried, Self-Employed & Registered Doctors',
    minCibilScore: 680
  },
  documentsRequired: [
    'Aadhaar Card, PAN Card & Current Address Proof',
    'Hospital Admission Estimate / Proforma Invoice / Medical Treatment Bills',
    'Last 6 Months Bank Statement & Latest 3 Months Salary Slips (for salaried)',
    'Medical Degree / MCI / DCI State Registration Certificate (for Doctor loans)',
    'Equipment Quotation / Proforma Invoice from authorized OEM dealer (for Equipment loans)'
  ]
};

function App() {
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#admin' || window.location.search.includes('view=admin')) {
        return 'admin';
      }
      if (window.location.hash === '#services' || window.location.search.includes('view=services')) {
        return 'services';
      }
      if (window.location.hash === '#loan-details' || window.location.hash === '#details' || window.location.search.includes('view=details')) {
        return 'loan-details';
      }
    }
    return 'website';
  });
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

  // Sync hash changes with currentView
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else if (window.location.hash === '#services') {
        setCurrentView('services');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#loan-details' || window.location.hash === '#details') {
        setCurrentView('loan-details');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#website' || window.location.hash === '' || (!window.location.hash.includes('admin') && !window.location.hash.includes('services') && !window.location.hash.includes('details'))) {
        setCurrentView((prev) => (prev === 'admin' || prev === 'services' || prev === 'loan-details' ? 'website' : prev));
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSwitchView = (view) => {
    setCurrentView(view);
    if (view === 'admin') {
      window.location.hash = 'admin';
    } else if (view === 'services') {
      window.location.hash = 'services';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'loan-details') {
      window.location.hash = 'loan-details';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (window.location.hash === '#admin' || window.location.hash === '#services' || window.location.hash === '#loan-details' || window.location.hash === '#details') {
        window.location.hash = '';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Fetch landing page bundle
  const fetchLandingData = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/public/landing-data`);
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
    // Auto-sync MySQL database tables in production if needed
    if (!import.meta.env.DEV) {
      fetch('/init-db.php').catch(() => {});
    }
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
    scrollToSection('featured-products');
  };

  const handleSearchFilter = (filter) => {
    setSearchFilterData(filter);
    if (filter.selectedCat && filter.selectedCat !== 'ALL') {
      setSelectedCategoryFilter(filter.selectedCat);
    }
    handleSwitchView('services');
  };

  const handleQuickApply = ({ categoryId, requestedAmount, searchTerm, productName }) => {
    let catName = productName || 'Personal Loan';
    if (!productName) {
      if (categoryId && categoryId !== 'ALL') {
        const found = landingData.categories?.find(c => c.id === categoryId);
        if (found) catName = found.name;
      } else if (searchTerm) {
        const s = String(searchTerm).toLowerCase();
        if (['kia', 'car', 'auto', 'vehicle', 'maruti', 'hyundai', 'tata'].some(w => s.includes(w))) catName = 'Car Loan';
        else if (['home', 'house', 'flat', 'villa', 'plot', 'apartment'].some(w => s.includes(w))) catName = 'Home Loan';
        else if (['gold', 'jewel', 'ornament'].some(w => s.includes(w))) catName = 'Gold Loan';
        else if (['doctor', 'clinic', 'dentist', 'hospital', 'medical', 'emergency', 'health insurance'].some(w => s.includes(w))) catName = 'Medical Loan';
        else if (['business', 'working capital', 'msme', 'gst'].some(w => s.includes(w))) catName = 'Business Loan';
        else if (['education', 'college', 'study', 'university'].some(w => s.includes(w))) catName = 'Education Loan';
        else if (['truck', 'lorry', 'commercial vehicle'].some(w => s.includes(w))) catName = 'Commercial Vehicle Loan';
      }
    }

    setPrefillData({
      requestedAmount,
      categoryId,
      productName: catName,
      source: 'discovery_engine'
    });
    scrollToSection('quick-enquiry');
  };

  // If Admin view is active
  if (currentView === 'admin') {
    return <AdminDashboard onSwitchToWebsite={() => handleSwitchView('website')} />;
  }

  // If Services view is active
  if (currentView === 'services') {
    return (
      <ServicesPage
        categories={landingData.categories || []}
        products={landingData.products || []}
        onSwitchToHome={() => handleSwitchView('website')}
        onSwitchToAdmin={() => handleSwitchView('admin')}
        onSelectProduct={handleSelectProduct}
        onViewDetails={(prod) => {
          setDetailedProduct(prod);
          handleSwitchView('loan-details');
        }}
        onApplyClick={handleApplyClick}
        onLeadSubmitted={fetchLandingData}
        initialSearchFilter={searchFilterData}
        initialCategoryId={selectedCategoryFilter}
      />
    );
  }

  // If Dedicated Loan Details Page view is active
  if (currentView === 'loan-details') {
    return (
      <LoanDetailsPage
        product={detailedProduct || defaultMedicalLoanProduct}
        categories={landingData.categories || []}
        onSwitchToHome={() => handleSwitchView('website')}
        onSwitchToServices={() => handleSwitchView('services')}
        onSwitchToAdmin={() => handleSwitchView('admin')}
        onClose={() => handleSwitchView('website')}
        onApplyNow={(data) => {
          setSelectedProduct(data.product);
          setPrefillData({
            requestedAmount: data.requestedAmount,
            tenureMonths: data.tenureMonths,
            monthlyEmi: data.monthlyEmi,
            productName: data.product?.name
          });
          handleSwitchView('website');
          setTimeout(() => scrollToSection('contact-enquiry'), 100);
        }}
        onEnquireNow={(data) => {
          setPrefillData({
            requestedAmount: data?.requestedAmount,
            productName: data?.product?.name || (detailedProduct || defaultMedicalLoanProduct).name
          });
          handleSwitchView('website');
          setTimeout(() => scrollToSection('quick-enquiry'), 100);
        }}
      />
    );
  }

  // Public Landing Website view (Home Page Scope)
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#6EA928] selection:text-white">
      
      {/* Top Header & Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={handleSwitchView}
        onApplyClick={handleApplyClick}
      />

      {/* Main Home Page Content */}
      <main className="flex-1 space-y-0 bg-white">
        
        {/* 1. Hero Banner */}
        <HeroSection
          onApplyClick={handleApplyClick}
          onCalcClick={() => scrollToSection('emi-calc')}
          onSelectCategory={handleCategorySelect}
          onSelectProduct={handleSelectProduct}
          onGoToServices={() => handleSwitchView('services')}
          onQuickApply={handleQuickApply}
          onViewDetails={(prod) => {
            setDetailedProduct(prod);
            handleSwitchView('loan-details');
          }}
        />

        {/* 2. Loan Search / Enquiry Section */}
        <LoanSearchSection
          categories={landingData.categories || []}
          onSearchFilter={handleSearchFilter}
          onQuickApply={handleQuickApply}
        />


        {/* 4. Featured Loan Products */}
        <FeaturedLoanProducts
          products={landingData.products || []}
          onApplyProduct={handleSelectProduct}
          onViewDetails={(prod) => {
            setDetailedProduct(prod);
            handleSwitchView('loan-details');
          }}
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
          onSelectProductClick={() => scrollToSection('featured-products')}
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
          prefillData={prefillData}
          categories={landingData.categories || []}
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
      <footer className="border-t border-[#0A5C80]/30 bg-[#041E2B] py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <img
                src={logoImg}
                alt="VGS Finance Logo"
                className="w-9 h-9 object-contain rounded-xl bg-white p-1 border border-[#0A5C80]/40 shadow-sm shrink-0"
              />
              <span className="font-extrabold text-white text-base tracking-tight">VGS FINANCE</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              A comprehensive Loan Supermarket & Financial Services aggregation platform. Providing transparent financing solutions across personal, business, vehicle, gold, and housing loans.
            </p>
          </div>

          <div>
            <div className="font-bold text-white uppercase tracking-wider text-xs mb-3">Quick Navigation</div>
            <ul className="space-y-2">
              <li><a href="#products" className="hover:text-[#6EA928] transition-colors">Loan Supermarket</a></li>
              <li><a href="#emi-calc" className="hover:text-[#6EA928] transition-colors">EMI Calculator</a></li>
              <li><a href="#eligibility" className="hover:text-[#6EA928] transition-colors">Eligibility Criteria</a></li>
              <li><a href="#documents" className="hover:text-[#6EA928] transition-colors">Required Documents</a></li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-white uppercase tracking-wider text-xs mb-3">Regulatory & Compliance</div>
            <ul className="space-y-2">
              <li className="hover:text-[#6EA928] transition-colors cursor-pointer">RBI Regulations & Disclosures</li>
              <li className="hover:text-[#6EA928] transition-colors cursor-pointer">Privacy & Data Protection Policy</li>
              <li className="hover:text-[#6EA928] transition-colors cursor-pointer">Terms & Conditions (T&C)</li>
              <li className="hover:text-[#6EA928] transition-colors cursor-pointer">Fair Practices Code (FPC)</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-xs mb-3">Management Portal</div>
            <p>Access loan administration and lead processing desk:</p>
            <button
              onClick={() => handleSwitchView('admin')}
              className="mt-1 px-4 py-2 bg-[#0A5C80]/20 hover:bg-[#0A5C80]/40 text-[#85C7DF] hover:text-white border border-[#0A5C80]/50 rounded-xl font-bold cursor-pointer transition-all"
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

    </div>
  );
}

export default App;
