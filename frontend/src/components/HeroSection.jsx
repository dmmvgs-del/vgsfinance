import { useState, useEffect, useRef } from 'react';
import loanHome from '../assets/loan-home.jpg';
import loanEducation from '../assets/loan-education.jpg';
import loanBusiness from '../assets/loan-business.jpg';
import loanHealth from '../assets/loan-health.jpg';
import loanPersonal from '../assets/loan-personal.jpg';
import cardHealthDoctor from '../assets/card-health-doctor.jpg';
import cardHomeLoan from '../assets/card-home-loan.jpg';
import cardPersonalLoan from '../assets/card-personal-loan.jpg';
import cardBusinessLoan from '../assets/card-business-loan.jpg';
import cardEducationLoan from '../assets/card-education-loan.jpg';
import cardPropertyLoan from '../assets/card-property-loan.jpg';
import cardCarLoan from '../assets/card-car-loan.jpg';
import cardGoldLoan from '../assets/card-gold-loan.jpg';

export default function HeroSection({
  onApplyClick,
  onCalcClick,
  onSelectCategory,
  onSelectProduct
}) {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerFormData, setPartnerFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Visakhapatnam',
    experience: '1-3 Years',
    profession: 'Financial Advisor / DSA'
  });
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  // Carousel state
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-increment metrics state (triggers on scrolling up and down)
  const metricsBarRef = useRef(null);
  const [metricCounts, setMetricCounts] = useState({
    banks: 0,
    categories: 0,
    experts: 0,
    quickHours: 0
  });

  useEffect(() => {
    const el = metricsBarRef.current;
    if (!el) return;

    let animId = null;

    const runCountUp = () => {
      const startTime = performance.now();
      const duration = 1200; // 1.2s smooth animation

      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: easeOutCubic
        const ease = 1 - Math.pow(1 - progress, 3);

        setMetricCounts({
          banks: Math.round(ease * 15),
          categories: Math.round(ease * 16),
          experts: Math.round(ease * 100),
          quickHours: Math.round(ease * 2)
        });

        if (progress < 1) {
          animId = requestAnimationFrame(step);
        }
      };

      setMetricCounts({ banks: 0, categories: 0, experts: 0, quickHours: 0 });
      animId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger auto-increment whenever scrolled into view (from above or below)
            runCountUp();
          } else {
            // Reset when scrolled out of view so it auto-increments again when scrolling back
            if (animId) cancelAnimationFrame(animId);
            setMetricCounts({ banks: 0, categories: 0, experts: 0, quickHours: 0 });
          }
        });
      },
      {
        threshold: 0.25
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const handleAvailLoan = (loanType, categoryId) => {
    if (onSelectCategory && categoryId && categoryId !== 'all') {
      onSelectCategory(categoryId);
    } else {
      const el = document.getElementById('contact-enquiry') || document.getElementById('featured-products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else if (onApplyClick) onApplyClick();
    }
  };

  const carouselSlides = [
    {
      id: 'home',
      name: 'Home Loan',
      icon: '🏠',
      image: loanHome,
      catId: 'cat-home',
      tag: 'For The Happy Life',
      preAccent: 'Join In A ',
      highlightWord1: 'Trustable',
      highlightColor1: 'text-[#0A5C80]',
      highlightWord2: 'Home Finance',
      highlightColor2: 'text-[#6EA928]',
      description:
        'Our reliable housing loan services are designed to safeguard your family and turn your dream home into reality. With interest rates starting from 8.4% p.a., up to 30 years flexible tenure, and 15+ partner banks, secure your future with complete confidence.',
      rate: 'From 8.40% p.a.',
      featureTag: 'Up to ₹5 Cr • 30 Yrs Tenure',
      primaryCta: 'Apply for Home Loan ➔'
    },
    {
      id: 'education',
      name: 'Education Loan',
      icon: '🎓',
      image: loanEducation,
      catId: 'cat-education',
      tag: 'Fuel Academic Dreams',
      preAccent: 'Empower Your ',
      highlightWord1: 'Global',
      highlightColor1: 'text-[#0A5C80]',
      highlightWord2: 'Education',
      highlightColor2: 'text-[#6EA928]',
      description:
        'Fund higher education across top premier universities in India and abroad. Enjoy 100% tuition coverage, collateral-free sanctions up to ₹50 Lakhs, and student-friendly moratorium repayments.',
      rate: 'From 9.50% p.a.',
      featureTag: '100% Tuition & Living Expenses',
      primaryCta: 'Apply for Education Loan ➔'
    },
    {
      id: 'business',
      name: 'Business Loan',
      icon: '💼',
      image: loanBusiness,
      catId: 'cat-business',
      tag: 'Scale Your Enterprise',
      preAccent: 'Grow With ',
      highlightWord1: 'Smart',
      highlightColor1: 'text-[#0A5C80]',
      highlightWord2: 'Business Capital',
      highlightColor2: 'text-[#6EA928]',
      description:
        'Supercharge your business with collateral-free working capital, equipment finance, and MSME trade credit lines up to ₹50 Lakhs with 48-hour digital approval and minimal paperwork.',
      rate: 'From 11.50% p.a.',
      featureTag: 'Collateral-Free up to ₹50L',
      primaryCta: 'Apply for Business Loan ➔'
    },
    {
      id: 'health',
      name: 'Health Related Loan',
      icon: '🏥',
      image: loanHealth,
      catId: 'cat-professional',
      tag: 'Care When It Matters',
      preAccent: 'Protect With ',
      highlightWord1: 'Emergency',
      highlightColor1: 'text-[#0A5C80]',
      highlightWord2: 'Medical Loans',
      highlightColor2: 'text-[#6EA928]',
      description:
        'Never compromise on healthcare, emergency medical procedures, or clinic equipment financing. Benefit from fast 2-hour digital clearance, preferential APR, and flexible repayment EMIs.',
      rate: 'Special Medical APR',
      featureTag: 'Instant 2-Hr Clearance',
      primaryCta: 'Apply for Medical Loan ➔'
    },
    {
      id: 'personal',
      name: 'Personal Loan',
      icon: '👤',
      image: loanPersonal,
      catId: 'cat-personal',
      tag: 'Celebrate Life Milestones',
      preAccent: 'Achieve With ',
      highlightWord1: 'Instant',
      highlightColor1: 'text-[#0A5C80]',
      highlightWord2: 'Personal Finance',
      highlightColor2: 'text-[#6EA928]',
      description:
        'Instant paperless personal loans for weddings, travel, renovations, or unexpected life needs. Get digital KYC approval with rates from 10.5% p.a. and direct bank transfer in 2 hours.',
      rate: 'From 10.50% p.a.',
      featureTag: 'Paperless Digital KYC',
      primaryCta: 'Apply for Personal Loan ➔'
    }
  ];

  // Carousel Autoplay Timer (3 seconds for faster, dynamic transitions)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, carouselSlides.length]);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    if (!partnerFormData.name || !partnerFormData.phone) return;
    setPartnerSubmitted(true);
    setTimeout(() => {
      setPartnerSubmitted(false);
      setPartnerModalOpen(false);
    }, 2500);
  };

  // 6 Core loan cards matching reference image
  // 6 Core loan cards matching centered reference design (media_1794984519245_3f603f31.png)
  const loanCards = [
    {
      title: 'Health & Doctor Loan',
      description: 'Health insurance and emergency medical loans provide coverage for hospital expenses, treatments, and clinical equipment without financial stress.',
      catId: 'cat-professional',
      imgSrc: cardHealthDoctor,
      iconSvg: (
        <svg className="w-12 h-12" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Caring Hand holding Heart */}
          <path d="M12 37C12 37 18 33 24 35L33 39C36 40.5 40 38.5 41 35C41.8 32 39 29.5 36 29L29 28" stroke="#FDBA74" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="#FED7AA" />
          {/* Pink/Coral Heart */}
          <path d="M28 12C24.5 7.5 17 8 15 13C12.5 19 22 27 28 32C34 27 43.5 19 41 13C39 8 31.5 7.5 28 12Z" fill="#F43F5E" />
          {/* White Heartbeat Pulse ECG */}
          <path d="M20 18H23L25 15L27 21L29 17L31 18H36" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Green Medical Plus Badge */}
          <circle cx="39" cy="11" r="5" fill="#10B981" />
          <path d="M39 8.5V13.5M36.5 11H41.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: 'Home Loan',
      description: 'Home loans protect your property and personal belongings, offering flexible 30-year EMIs and subsidized interest rates across 15+ partner banks.',
      catId: 'cat-home',
      imgSrc: cardHomeLoan,
      iconSvg: (
        <svg className="w-12 h-12" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Caring Hand holding House */}
          <path d="M14 42C14 42 20 38 26 40L36 43C39 44 43 42 44 38C44.5 35 41.5 33 38 33L31 32" stroke="#FDBA74" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="#FED7AA" />
          {/* Red House Roof */}
          <path d="M28 10L14 22H18V36H38V22H42L28 10Z" fill="#EF4444" />
          {/* Chimney */}
          <rect x="34" y="13" width="4" height="6" fill="#DC2626" />
          {/* House Body */}
          <rect x="18" y="22" width="20" height="14" rx="1" fill="#E0F2FE" />
          {/* Blue Door */}
          <rect x="25" y="27" width="6" height="9" rx="1" fill="#0A5C80" />
          {/* Gold Coin on Front */}
          <circle cx="28" cy="20" r="5" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5" />
          <text x="28" y="23" textAnchor="middle" fill="#92400E" fontSize="7" fontWeight="bold">₹</text>
        </svg>
      )
    },
    {
      title: 'Personal Loan',
      description: 'Personal loans for weddings, travel, education, and unexpected life goals with instant paperless verification and same-day direct disbursement.',
      catId: 'cat-personal',
      imgSrc: cardPersonalLoan,
      iconSvg: (
        <svg className="w-12 h-12" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Soft Circle Background */}
          <circle cx="28" cy="28" r="22" fill="#E8F5D4" />
          {/* Modern Wallet Body in Royal Teal */}
          <rect x="12" y="20" width="32" height="22" rx="5" fill="#0A5C80" />
          <path d="M12 25H44" stroke="#074460" strokeWidth="2" />
          {/* Leaf Green Flap with Button */}
          <rect x="32" y="27" width="12" height="8" rx="3" fill="#6EA928" />
          <circle cx="36" cy="31" r="2" fill="white" />
          {/* Gold Rupee Coin floating */}
          <circle cx="24" cy="15" r="7" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5" />
          <text x="24" y="18.5" textAnchor="middle" fill="#92400E" fontSize="9" fontWeight="bold">₹</text>
          {/* Floating Heart Accent */}
          <path d="M38 12C36.5 10 33 10.5 32 12.5C31 10.5 27.5 10 26 12C24.5 14 27 18 32 20.5C37 18 39.5 14 38 12Z" fill="#F43F5E" />
        </svg>
      )
    },
    {
      title: 'Business Loan',
      description: 'Tailored financial solutions, MSME collateral-free working capital, and equipment credit lines to scale your commercial enterprise smoothly.',
      catId: 'cat-business',
      imgSrc: cardBusinessLoan,
      iconSvg: (
        <svg className="w-12 h-12" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background Soft Glow */}
          <circle cx="28" cy="28" r="22" fill="#E0F2FE" />
          {/* Corporate Towers */}
          <rect x="14" y="20" width="12" height="22" rx="2" fill="#0A5C80" />
          <rect x="30" y="14" width="12" height="28" rx="2" fill="#073D54" />
          {/* Windows */}
          <rect x="17" y="24" width="2" height="3" fill="#7DD3FC" />
          <rect x="21" y="24" width="2" height="3" fill="#7DD3FC" />
          <rect x="17" y="30" width="2" height="3" fill="#7DD3FC" />
          <rect x="21" y="30" width="2" height="3" fill="#7DD3FC" />
          <rect x="33" y="18" width="2" height="3" fill="#38BDF8" />
          <rect x="37" y="18" width="2" height="3" fill="#38BDF8" />
          <rect x="33" y="24" width="2" height="3" fill="#38BDF8" />
          <rect x="37" y="24" width="2" height="3" fill="#38BDF8" />
          {/* Upward Green Growth Trend Arrow */}
          <path d="M12 36L26 24L34 28L44 14" stroke="#6EA928" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M38 14H44V20" stroke="#6EA928" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'Education Loan',
      description: 'Fund higher education in premier institutions across India and abroad with 100% fee coverage, living expenses, and student-friendly moratoriums.',
      catId: 'cat-education',
      imgSrc: cardEducationLoan,
      iconSvg: (
        <svg className="w-12 h-12" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background Circle */}
          <circle cx="28" cy="28" r="22" fill="#E8F5D4" />
          {/* Graduation Cap */}
          <polygon points="28,12 46,20 28,28 10,20" fill="#0A5C80" />
          <path d="M16 23.5V33C16 33 21 37 28 37C35 37 40 33 40 33V23.5" stroke="#0A5C80" strokeWidth="3" fill="none" />
          {/* Gold Tassel */}
          <line x1="43" y1="21" x2="43" y2="32" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="43" cy="33" r="2.5" fill="#D97706" />
          {/* Diploma Scroll */}
          <rect x="18" y="38" width="20" height="6" rx="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
          <rect x="26" y="37" width="4" height="8" rx="1" fill="#EF4444" />
        </svg>
      )
    },
    {
      title: 'Loan Against Property',
      description: 'Unlock substantial liquidity against your residential or commercial real estate with competitive interest rates and extended repayment horizons.',
      catId: 'cat-mortgage',
      imgSrc: cardPropertyLoan,
      iconSvg: (
        <svg className="w-12 h-12" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background Circle */}
          <circle cx="28" cy="28" r="22" fill="#F0FDF4" />
          {/* Property Document Sheet */}
          <rect x="14" y="12" width="22" height="30" rx="3" fill="white" stroke="#94A3B8" strokeWidth="2" />
          <line x1="20" y1="18" x2="30" y2="18" stroke="#0A5C80" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="24" x2="30" y2="24" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="30" x2="26" y2="30" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          {/* Protection Shield in Logo Green */}
          <path d="M38 20L44 23V30C44 35 41 39 38 41C35 39 32 35 32 30V23L38 20Z" fill="#6EA928" />
          <path d="M35 30L37 32L41 27" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'Car & Vehicle Loan',
      description: 'Drive home your dream car or two-wheeler with 90% on-road funding, zero foreclosure charges, and fast 24-hour sanctions.',
      catId: 'cat-vehicle',
      imgSrc: cardCarLoan,
      iconSvg: (
        <svg className="w-12 h-12" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="22" fill="#E0F2FE" />
          <path d="M16 34L20 24H36L40 34H16Z" fill="#0A5C80" />
          <circle cx="21" cy="36" r="4" fill="#041E2B" />
          <circle cx="35" cy="36" r="4" fill="#041E2B" />
          <rect x="23" y="26" width="10" height="5" rx="1" fill="#7DD3FC" />
        </svg>
      )
    },
    {
      title: 'Gold Loan',
      description: 'Get immediate high-value cash against gold jewelry with doorstep evaluation, lowest per-gram interest rates, and bank-grade vault security.',
      catId: 'cat-gold',
      imgSrc: cardGoldLoan,
      iconSvg: (
        <svg className="w-12 h-12" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="22" fill="#FEF3C7" />
          <rect x="18" y="24" width="20" height="12" rx="2" fill="#F59E0B" />
          <circle cx="28" cy="20" r="6" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          <text x="28" y="24" textAnchor="middle" fill="#78350F" fontSize="8" fontWeight="bold">₹</text>
        </svg>
      )
    }
  ];

  const currentSlideData = carouselSlides[activeSlide];

  return (
    <section id="hero" className="relative font-sans select-none overflow-hidden">

      {/* =========================================================================
          1. HERO SECTION: CLEAN MODERN 2-COLUMN DESIGN (Matching Reference Image)
             Left: Two-Tone Headline in Brand Blue & Green, Benefits, Action Buttons
             Right: Logo Brand Colors (Teal Blue & Leaf Green) Circular Photo Frame with 5 Loan Visuals
         ========================================================================= */}
      <div
        className="relative bg-gradient-to-b from-white via-[#F0F7FA]/70 to-white pt-8 sm:pt-12 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="max-w-7xl mx-auto relative z-10">

          {/* MAIN 2-COLUMN HERO GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* -----------------------------------------------------------------
                LEFT COLUMN (7 cols): TYPOGRAPHY, BENEFITS & ACTION BUTTONS
               ----------------------------------------------------------------- */}
            <div className="lg:col-span-7 space-y-6 animate-fade-in text-center sm:text-left">

              {/* Tag / Pre-Title */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-xs font-black tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-[#6EA928] animate-ping"></span>
                <span>{currentSlideData.tag}</span>
              </div>

              {/* Main Two-Tone Headline (Matches Reference Image) */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.14] text-[#041E2B]">
                <span>{currentSlideData.preAccent}</span>
                <span className={currentSlideData.highlightColor1}>{currentSlideData.highlightWord1} </span>
                <span className={currentSlideData.highlightColor2}>{currentSlideData.highlightWord2}</span>
              </h1>

              {/* Description Paragraph */}
              <p className="text-sm sm:text-base text-slate-600 font-medium max-w-xl leading-relaxed mx-auto sm:mx-0">
                {currentSlideData.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
                {/* Primary Button */}
                <button
                  onClick={() => handleAvailLoan(currentSlideData.name, currentSlideData.catId)}
                  className="px-7 sm:px-8 py-3.5 rounded-full text-sm sm:text-base font-black bg-[#6EA928] hover:bg-[#5A8B1F] text-white shadow-lg shadow-[#6EA928]/35 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <span>{currentSlideData.primaryCta}</span>
                </button>

                {/* Secondary Button */}
                <button
                  onClick={onCalcClick || (() => { })}
                  className="px-6 sm:px-7 py-3.5 rounded-full text-sm sm:text-base font-bold bg-white hover:bg-slate-50 text-[#0A5C80] border-2 border-[#0A5C80] shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <span>🧮 Calculate EMI</span>
                </button>
              </div>

              {/* SLIDE PROGRESS CONTROLS (Positioned directly under CTA buttons) */}
              <div className="flex items-center justify-center sm:justify-start gap-3 pt-3">
                <button
                  onClick={handlePrevSlide}
                  aria-label="Previous Slide"
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#0A5C80] hover:text-white text-[#0A5C80] flex items-center justify-center text-xs font-bold transition-all border border-[#0A5C80]/30 cursor-pointer shadow-sm hover:scale-105"
                >
                  ❮
                </button>

                <div className="flex items-center gap-1.5">
                  {carouselSlides.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeSlide === idx
                          ? 'w-7 bg-gradient-to-r from-[#0A5C80] to-[#6EA928]'
                          : 'w-2 bg-slate-300 hover:bg-[#0A5C80]/50'
                        }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextSlide}
                  aria-label="Next Slide"
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#6EA928] hover:text-white text-[#0A5C80] flex items-center justify-center text-xs font-bold transition-all border border-[#0A5C80]/30 cursor-pointer shadow-sm hover:scale-105"
                >
                  ❯
                </button>

                <span className="text-xs text-[#0A5C80] font-bold font-mono ml-2">
                  0{activeSlide + 1} / 0{carouselSlides.length}
                </span>
              </div>



            </div>

            {/* -----------------------------------------------------------------
                RIGHT COLUMN (5 cols): LOGO BRAND COLORS OVAL PHOTO FRAME WITH FLANKING CURVES
               ----------------------------------------------------------------- */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">

              {/* Decorative Flanking Curved Lines (ONLY FOR THE IMAGE - As Circled in Reference) */}

              {/* Left Flanking Curved Lines (Green #6EA928 Duo) */}
              <svg
                className="absolute -left-6 sm:-left-12 md:-left-16 top-1/2 -translate-y-8 sm:-translate-y-4 w-28 sm:w-40 md:w-48 h-48 sm:h-60 pointer-events-none z-0"
                viewBox="0 0 160 220"
                fill="none"
              >
                {/* Primary Left Curved Line */}
                <path
                  d="M 155,65 C 120,115 70,165 15,188"
                  stroke="#6EA928"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Secondary Left Parallel Curved Line */}
                <path
                  d="M 142,30 C 105,80 55,128 8,148"
                  stroke="#6EA928"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </svg>

              {/* Right Flanking Curved Lines (Teal Blue #0A5C80 & Green #6EA928 Duo) */}
              <svg
                className="absolute -right-6 sm:-right-12 md:-right-16 top-1/2 -translate-y-24 sm:-translate-y-20 w-28 sm:w-40 md:w-48 h-48 sm:h-60 pointer-events-none z-0"
                viewBox="0 0 170 200"
                fill="none"
              >
                {/* Primary Right Curved Line (Connects to Oval Mid-Right Edge) */}
                <path
                  d="M 5,95 C 45,98 85,55 155,18"
                  stroke="#0A5C80"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Secondary Right Curved Line */}
                <path
                  d="M 22,130 C 65,130 105,85 165,38"
                  stroke="#6EA928"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  opacity="0.85"
                />
              </svg>

              {/* The Soft Oval Ring Frame with Highlighted Top Curve (Matches Reference Image) */}
              <div className="relative z-10 w-80 h-64 sm:w-[420px] sm:h-[340px] md:w-[480px] md:h-[390px] rounded-[50%] pt-6 sm:pt-7 md:pt-8 px-3.5 sm:px-4 md:px-5 pb-2.5 sm:pb-3 bg-gradient-to-tr from-[#0A5C80] via-[#0E7490] to-[#6EA928] shadow-2xl shadow-[#0A5C80]/30 transition-transform duration-500 hover:scale-[1.02]">

                {/* Top Curve Highlight Arc / Sheen */}
                <div className="absolute top-1 sm:top-1.5 left-1/4 right-1/4 h-1.5 sm:h-2 bg-white/40 rounded-full blur-[0.5px] pointer-events-none"></div>

                {/* Inner White Ring & Oval Photo Viewport */}
                <div className="relative w-full h-full rounded-[50%] overflow-hidden bg-white border-4 border-white shadow-inner">
                  {carouselSlides.map((slide, idx) => {
                    const isActive = activeSlide === idx;
                    return (
                      <div
                        key={slide.id}
                        className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${isActive
                            ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                            : 'opacity-0 scale-95 z-0 pointer-events-none'
                          }`}
                      >
                        <img
                          src={slide.image}
                          alt={slide.name}
                          className="w-full h-full object-cover object-center"
                          loading="eager"
                        />
                      </div>
                    );
                  })}
                </div>



                {/* Floating Top-Right Rate Pill Badge */}
                <div className="absolute -top-2 right-2 sm:top-1 sm:right-4 z-20 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#0A5C80] text-white text-xs sm:text-sm font-black shadow-xl border-2 border-white flex items-center gap-1.5 animate-bounce">
                  <span>💰</span>
                  <span>{currentSlideData.rate}</span>
                </div>

                {/* Floating Bottom-Left Feature Pill Badge */}
                <div className="absolute -bottom-2 left-2 sm:bottom-1 sm:left-4 z-20 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white text-[#041E2B] text-xs sm:text-sm font-bold shadow-xl border border-slate-200/90 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#6EA928] animate-ping"></span>
                  <span>{currentSlideData.featureTag}</span>
                </div>

              </div>



            </div>

          </div>



        </div>

      </div>

      {/* =========================================================================
          2. FOUR METRICS PILL BAR (Auto-increments on scrolling up & down)
         ========================================================================= */}
      <div ref={metricsBarRef} className="bg-white px-4 sm:px-6 lg:px-8 pb-8 pt-2">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#041E2B] border border-[#0A5C80]/35 rounded-2xl shadow-xl p-3 sm:p-4 backdrop-blur-md">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#0A5C80]/30 text-center">

              {/* Metric 1 */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-3 py-1 px-2">
                <span className="text-xl sm:text-2xl text-[#6EA928]">🏛️</span>
                <span className="text-xs sm:text-sm font-black text-white tracking-wide flex items-center">
                  <span className="font-mono text-sm sm:text-base font-black text-[#6EA928] mr-1 min-w-[28px] inline-block text-right">
                    {metricCounts.banks}+
                  </span>
                  <span>Banking Partners</span>
                </span>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-3 py-1 px-2">
                <span className="text-xl sm:text-2xl text-[#6EA928]">📚</span>
                <span className="text-xs sm:text-sm font-black text-white tracking-wide flex items-center">
                  <span className="font-mono text-sm sm:text-base font-black text-[#6EA928] mr-1 min-w-[28px] inline-block text-right">
                    {metricCounts.categories}+
                  </span>
                  <span>Loan Categories</span>
                </span>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-3 py-1 px-2 pt-2 md:pt-1">
                <span className="text-xl sm:text-2xl text-[#6EA928]">🧑‍💼</span>
                <span className="text-xs sm:text-sm font-black text-white tracking-wide flex items-center">
                  <span className="font-mono text-sm sm:text-base font-black text-[#6EA928] mr-1 min-w-[38px] inline-block text-right">
                    {metricCounts.experts}%
                  </span>
                  <span>Expert Assistance</span>
                </span>
              </div>

              {/* Metric 4 */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-3 py-1 px-2 pt-2 md:pt-1">
                <span className="text-xl sm:text-2xl text-[#6EA928]">⚡</span>
                <span className="text-xs sm:text-sm font-black text-white tracking-wide flex items-center">
                  <span className="font-mono text-sm sm:text-base font-black text-[#6EA928] mr-1 min-w-[34px] inline-block text-right">
                    {metricCounts.quickHours}-Hr
                  </span>
                  <span>Quick In-Principle Decisions</span>
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. SUB-HERO SECTION: "Find a loan that fits your goals" (Brand Surfaces)
         ========================================================================= */}
      <div className="bg-[#F4F8FA] text-slate-800 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-7">

          {/* Section Header (Left-Aligned, Clean & Modern) */}
          <div className="text-left max-w-2xl space-y-2 mb-2 sm:mb-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-xs font-black tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#6EA928] animate-ping"></span>
              <span>Our Loan Products</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#041E2B] tracking-tight">
              Find a Loan That Fits <span className="text-[#0A5C80]">Your Goals</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Explore our core lending solutions designed for your personal, business, and health financial milestones.
            </p>
          </div>

          {/* Loan Cards Grid (4 Cards Per Row: 2 Rows x 4 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
            {loanCards.map((card, idx) => (
              <div
                key={idx}
                onClick={() => handleAvailLoan(card.title, card.catId)}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-md shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60 hover:-translate-y-2 transition-all duration-300 border border-slate-100/90 flex flex-col items-center text-center cursor-pointer group"
              >
                {/* Centered Large Friendly 3D Illustration Icon */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300">
                  {card.imgSrc ? (
                    <img
                      src={card.imgSrc}
                      alt={card.title}
                      className="w-full h-full object-contain rounded-2xl drop-shadow-sm"
                    />
                  ) : (
                    card.iconSvg
                  )}
                </div>

                {/* Centered Bold Title */}
                <h3 className="text-base sm:text-lg font-black text-[#041E2B] group-hover:text-[#0A5C80] transition-colors mb-2 text-center leading-snug">
                  {card.title}
                </h3>

                {/* Centered Description Paragraph */}
                <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal text-center">
                  {card.description}
                </p>
              </div>
            ))}
          </div>



        </div>
      </div>



      {/* =========================================================================
          5. MODAL: JOIN AS FREELANCER / DSA PARTNER
         ========================================================================= */}
      {partnerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-scale-up">

            <div className="flex justify-between items-start">
              <div>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider">
                  Partner with VGS Finance
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Join as Freelancer / DSA Partner
                </h3>
                <p className="text-xs text-slate-400">
                  Earn competitive payouts by referring loan borrowers across 15+ banks.
                </p>
              </div>
              <button
                onClick={() => setPartnerModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {partnerSubmitted ? (
              <div className="p-6 text-center space-y-2 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
                <span className="text-3xl">✅</span>
                <h4 className="text-sm font-bold text-emerald-400">Partner Application Registered!</h4>
                <p className="text-xs text-slate-300">Our channel manager will contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Sharma"
                    value={partnerFormData.name}
                    onChange={(e) => setPartnerFormData({ ...partnerFormData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Mobile (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={partnerFormData.phone}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Email ID</label>
                    <input
                      type="email"
                      placeholder="partner@example.com"
                      value={partnerFormData.email}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">City / Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Visakhapatnam, Hyderabad"
                      value={partnerFormData.city}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, city: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Experience in Finance</label>
                    <select
                      value={partnerFormData.experience}
                      onChange={(e) => setPartnerFormData({ ...partnerFormData, experience: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="Fresher">Fresher (New to Loans)</option>
                      <option value="1-3 Years">1 - 3 Years</option>
                      <option value="3-5 Years">3 - 5 Years</option>
                      <option value="5+ Years">5+ Years (Established DSA)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/20 cursor-pointer transition-all"
                >
                  🚀 Submit Partner Application
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
