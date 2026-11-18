import { useState, useEffect } from 'react';
import heroDigitalBank from '../assets/hero-digital-bank.jpg';
import heroHomeFamily from '../assets/hero-home-family.jpg';
import heroBusinessGrowth from '../assets/hero-business-growth.jpg';
import heroCorporateCapital from '../assets/hero-corporate-capital.jpg';

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

  const handleAvailLoan = (loanType, categoryId) => {
    if (onSelectCategory && categoryId && categoryId !== 'all') {
      onSelectCategory(categoryId);
    } else {
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else if (onApplyClick) onApplyClick();
    }
  };

  const carouselSlides = [
    {
      id: 'supermarket',
      image: heroDigitalBank,
      tag: "India's #1 Multi-Bank Marketplace",
      headlinePrefix: 'The ',
      headlineAccent: 'Right Loan.',
      headlineSuffix: ' The Right Bank.',
      headlineSecondLine: 'The Right Way.',
      accentColor: 'text-[#6EA928]',
      description:
        'Compare 16+ loan categories and offers from 15+ partner banks — with expert guidance at every step.',
      primaryCta: 'Explore Loan Options ➔',
      primaryAction: () => handleAvailLoan('Loan Supermarket', 'all'),
      primaryBg: 'bg-[#6EA928] hover:bg-[#5A8B1F] text-white font-black shadow-lg shadow-[#6EA928]/30',
      secondaryCta: 'Talk to an Expert',
      secondaryIcon: '🎧',
      secondaryAction: () => setPartnerModalOpen(true),
      badgeText: 'Instant In-Principle Sanction in 2 Hours',
      badgeColor: 'bg-[#6EA928]/20 text-[#94CF45] border-[#6EA928]/40',
      highlightTag: '15+ Partner Banks',
      floatingBadge1: { icon: '🏛️', title: '15+ Banking Partners', subtitle: 'SBI, HDFC, ICICI, Axis' },
      floatingBadge2: { icon: '⚡', title: '2 Hr In-Principle', subtitle: '100% Paperless KYC' }
    },
    {
      id: 'home-loans',
      image: heroHomeFamily,
      tag: 'Dream Home & Construction Loans',
      headlinePrefix: 'Your Dream Home. ',
      headlineAccent: 'Lowest Rates.',
      headlineSuffix: '',
      headlineSecondLine: 'Starting @ 8.4% p.a.',
      accentColor: 'text-[#94CF45]',
      description:
        'Make your dream home a reality with transparent sanctions up to ₹5 Crores, up to 30 years tenure & doorstep advisor support.',
      primaryCta: 'Check Home Loan Rates ➔',
      primaryAction: () => handleAvailLoan('Home Loan', 'cat-home'),
      primaryBg: 'bg-[#6EA928] hover:bg-[#5A8B1F] text-white font-black shadow-lg shadow-[#6EA928]/30',
      secondaryCta: 'Calculate EMI',
      secondaryIcon: '🧮',
      secondaryAction: onCalcClick || (() => { }),
      badgeText: 'Tenure up to 30 Yrs • PMAY Subsidy Support',
      badgeColor: 'bg-[#6EA928]/20 text-[#94CF45] border-[#6EA928]/40',
      highlightTag: 'Home Loan @ 8.4%',
      floatingBadge1: { icon: '🏡', title: 'Home Loans', subtitle: 'Starting From 8.40% p.a.' },
      floatingBadge2: { icon: '🔑', title: 'Sanction up to ₹5 Cr', subtitle: 'Doorstep Documentation' }
    },
    {
      id: 'business-growth',
      image: heroBusinessGrowth,
      tag: 'MSME & Business Growth Capital',
      headlinePrefix: 'Scale Your Business. ',
      headlineAccent: 'Fuel Vision.',
      headlineSuffix: '',
      headlineSecondLine: 'Collateral-Free up to ₹50L.',
      accentColor: 'text-[#6EA928]',
      description:
        'Working capital limits, equipment purchase, and machinery loans designed for modern entrepreneurs and SMEs with 48-hr fast disbursal.',
      primaryCta: 'Avail Business Loan ➔',
      primaryAction: () => handleAvailLoan('Business Loan', 'cat-business'),
      primaryBg: 'bg-[#0A5C80] hover:bg-[#084E6D] text-white font-black shadow-lg shadow-[#0A5C80]/30',
      secondaryCta: 'Join as Freelancer',
      secondaryIcon: '🤝',
      secondaryAction: () => setPartnerModalOpen(true),
      badgeText: 'Over ₹250+ Crores Disbursed to MSMEs',
      badgeColor: 'bg-[#0A5C80]/20 text-[#85C7DF] border-[#0A5C80]/40',
      highlightTag: 'Collateral-Free MSME',
      floatingBadge1: { icon: '📈', title: 'Up to ₹50 Lakhs', subtitle: 'Unsecured Business Loan' },
      floatingBadge2: { icon: '🚀', title: '48 Hr Disbursal', subtitle: 'CGTMSE Coverage' }
    },
    {
      id: 'corporate-capital',
      image: heroCorporateCapital,
      tag: 'High-Value Corporate & Property Finance',
      headlinePrefix: 'Unlock High Value ',
      headlineAccent: 'Property & Corporate',
      headlineSuffix: '',
      headlineSecondLine: 'Loans Up To ₹10 Cr.',
      accentColor: 'text-[#85C7DF]',
      description:
        'Tailored mortgages, loan against commercial/residential property, and debt syndication with maximum loan-to-value and multi-bank sanction options.',
      primaryCta: 'Avail Mortgage Loan ➔',
      primaryAction: () => handleAvailLoan('Loan Against Property', 'cat-mortgage'),
      primaryBg: 'bg-gradient-to-r from-[#0A5C80] to-[#6EA928] hover:opacity-90 text-white font-black shadow-lg shadow-[#0A5C80]/30',
      secondaryCta: 'Talk to an Expert',
      secondaryIcon: '🎧',
      secondaryAction: () => setPartnerModalOpen(true),
      badgeText: 'PSU, Private & NBFC Consortium',
      badgeColor: 'bg-[#0A5C80]/20 text-[#94CF45] border-[#6EA928]/40',
      highlightTag: 'Up to ₹10 Crores',
      floatingBadge1: { icon: '🏢', title: 'Mortgage Loan', subtitle: 'LAP Up to ₹10 Cr' },
      floatingBadge2: { icon: '📊', title: 'Lowest Spreads', subtitle: 'Consortium Sanctions' }
    }
  ];

  // Carousel Autoplay Timer (5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
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
  const loanCards = [
    {
      title: 'Personal Loan',
      description: 'For your personal needs like medical, travel, marriage & more.',
      catId: 'cat-personal',
      rate: 'From 10.5%',
      iconSvg: (
        <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" fill="#FEF3C7" />
          <path d="M16 19C16 14.5817 19.5817 11 24 11C28.4183 11 32 14.5817 32 19V20H16V19Z" fill="#D97706" />
          <path d="M12 21C12 20.4477 12.4477 20 13 20H35C35.5523 20 36 20.4477 36 21V33C36 37.4183 32.4183 41 28 41H20C15.5817 41 12 37.4183 12 33V21Z" fill="#F59E0B" />
          <circle cx="24" cy="30" r="4.5" fill="#FEF3C7" />
          <path d="M22 28H26M22 30H26M23 28V32" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    },
    {
      title: 'Business Loan',
      description: 'Tailored financial solutions to grow and expand your business.',
      catId: 'cat-business',
      rate: 'From 11.5%',
      iconSvg: (
        <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="16" width="32" height="24" rx="4" fill="#92400E" />
          <rect x="6" y="20" width="36" height="20" rx="4" fill="#B45309" />
          <path d="M18 16V12C18 10.8954 18.8954 10 20 10H28C29.1046 10 30 10.8954 30 12V16" stroke="#78350F" strokeWidth="3" />
          <rect x="22" y="24" width="4" height="4" rx="1" fill="#FEF3C7" />
          <line x1="6" y1="26" x2="42" y2="26" stroke="#78350F" strokeWidth="2" />
        </svg>
      )
    },
    {
      title: 'Home Loan',
      description: 'Make your dream home a reality with attractive loan offers.',
      catId: 'cat-home',
      rate: 'From 8.4%',
      iconSvg: (
        <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24 8L8 22H14V38H34V22H40L24 8Z" fill="#EF4444" />
          <rect x="18" y="26" width="12" height="12" rx="1" fill="#FEF2F2" />
          <rect x="20" y="28" width="8" height="10" fill="#DC2626" />
          <path d="M24 8L8 22H14L24 13L34 22H40L24 8Z" fill="#B91C1C" />
          <rect x="30" y="12" width="4" height="7" fill="#7F1D1D" />
        </svg>
      )
    },
    {
      title: 'Doctor Loan',
      description: 'Special loan solutions for doctors and healthcare professionals.',
      catId: 'cat-professional',
      rate: 'Special APR',
      iconSvg: (
        <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="20" fill="#E0F2FE" />
          <path d="M16 14V24C16 28.4183 19.5817 32 24 32C28.4183 32 32 28.4183 32 24V14" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="16" cy="14" r="2.5" fill="#0369A1" />
          <circle cx="32" cy="14" r="2.5" fill="#0369A1" />
          <path d="M24 32V38C24 39.1046 24.8954 40 26 40H28" stroke="#0284C7" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="30" cy="40" r="3" fill="#0369A1" />
        </svg>
      )
    },
    {
      title: 'Education Loan',
      description: 'Fund higher education in India or abroad with ease.',
      catId: 'cat-education',
      rate: 'From 9.5%',
      iconSvg: (
        <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="24,10 42,19 24,28 6,19" fill="#1E40AF" />
          <path d="M12 22.5V32C12 32 17 37 24 37C31 37 36 32 36 32V22.5" stroke="#1E40AF" strokeWidth="3" fill="none" />
          <line x1="39" y1="20.5" x2="39" y2="34" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="39" cy="35" r="2" fill="#D97706" />
        </svg>
      )
    },
    {
      title: 'Loan Against Property',
      description: 'Unlock the value of your property for business or personal needs.',
      catId: 'cat-mortgage',
      rate: 'From 8.9%',
      iconSvg: (
        <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="8" width="24" height="32" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          <line x1="18" y1="16" x2="30" y2="16" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="22" x2="30" y2="22" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
          <line x1="18" y1="28" x2="26" y2="28" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
          <path d="M26 26L36 35H32V42H28V37H24V42H20V35H16L26 26Z" fill="#10B981" />
        </svg>
      )
    }
  ];

  const currentSlideData = carouselSlides[activeSlide];

  return (
    <section id="hero" className="relative font-sans select-none overflow-hidden">

      {/* =========================================================================
          1. HERO CAROUSEL BANNER (Company Logo Palette: Deep Marine Blue & Growth Green)
         ========================================================================= */}
      <div
        className="relative bg-gradient-to-r from-[#031824] via-[#062A3B] to-[#0A415A] text-white pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 shadow-2xl transition-all duration-700 overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle glowing ambient background orbs & mesh */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0A5C80]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#6EA928]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Main Hero Grid: Left Content (Carousel Slides) + Right 3D Visual */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* -------------------------------------------------------------------
                LEFT COLUMN: DYNAMIC CAROUSEL SLIDE CONTENT
               ------------------------------------------------------------------- */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7 animate-fade-in">

              {/* Category / Supermarket Live Badge */}
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black tracking-wide border uppercase backdrop-blur-md ${currentSlideData.badgeColor}`}>
                  <span className="w-2 h-2 rounded-full bg-current animate-ping"></span>
                  {currentSlideData.tag}
                </span>
                <span className="text-[11px] text-slate-300 hidden sm:inline">
                  • {currentSlideData.badgeText}
                </span>
              </div>

              {/* Main Headline with dynamic logo accents */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.15] text-white drop-shadow-md">
                  <span>{currentSlideData.headlinePrefix}</span>
                  <span className={currentSlideData.accentColor}>
                    {currentSlideData.headlineAccent}
                  </span>
                  <span>{currentSlideData.headlineSuffix}</span>
                  <br />
                  <span className="text-white">{currentSlideData.headlineSecondLine}</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-200 font-medium max-w-xl pt-2 sm:pt-3 leading-relaxed">
                  {currentSlideData.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                {/* Primary Action Button */}
                <button
                  onClick={currentSlideData.primaryAction}
                  className={`px-6 sm:px-8 py-3.5 rounded-xl text-sm sm:text-base font-black transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 ${currentSlideData.primaryBg}`}
                >
                  <span>{currentSlideData.primaryCta}</span>
                </button>

                {/* Secondary Action Button (Headset / Outlined Pill) */}
                <button
                  onClick={currentSlideData.secondaryAction}
                  className="px-5 sm:px-7 py-3.5 rounded-xl text-sm sm:text-base font-bold text-white bg-[#041E2B]/80 hover:bg-[#0A5C80]/40 border border-[#0A5C80]/60 backdrop-blur-md transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 shadow-md"
                >
                  <span className="text-base text-[#6EA928]">{currentSlideData.secondaryIcon}</span>
                  <span>{currentSlideData.secondaryCta}</span>
                </button>
              </div>

              {/* Carousel Navigation Controls (Dots & Arrows) */}
              <div className="flex items-center gap-4 pt-2">
                {/* Arrow Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevSlide}
                    aria-label="Previous Slide"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#6EA928] hover:text-white text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer border border-white/10"
                  >
                    ❮
                  </button>
                  <button
                    onClick={handleNextSlide}
                    aria-label="Next Slide"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#6EA928] hover:text-white text-white flex items-center justify-center text-xs font-bold transition-colors cursor-pointer border border-white/10"
                  >
                    ❯
                  </button>
                </div>

                {/* Slide Indicators (Pills & Dots) */}
                <div className="flex items-center gap-2">
                  {carouselSlides.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${activeSlide === idx
                          ? 'w-7 bg-[#6EA928]'
                          : 'w-2 bg-white/30 hover:bg-white/60'
                        }`}
                    />
                  ))}
                </div>

                <span className="text-[11px] text-slate-300 font-mono ml-2">
                  0{activeSlide + 1} / 0{carouselSlides.length}
                </span>
              </div>

            </div>

            {/* -------------------------------------------------------------------
                RIGHT COLUMN: ANIMATED FINTECH VISUAL SHOWCASE (4 HERO IMAGES + ANIMATIONS)
               ------------------------------------------------------------------- */}
            <div className="lg:col-span-5 relative flex items-center justify-center">

              {/* Outer Glowing Stage Container */}
              <div className="relative w-full max-w-lg aspect-[4/3] sm:aspect-[5/4] md:aspect-square flex items-center justify-center">

                {/* Ambient Animated Glows (Breathing Logo colors: Marine Blue & Growth Green) */}
                <div className="absolute inset-2 bg-gradient-to-tr from-[#0A5C80]/40 via-[#6EA928]/30 to-[#94CF45]/20 rounded-3xl blur-2xl animate-pulse-glow"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-[#6EA928]/20 via-[#0A5C80]/30 to-[#6EA928]/20 rounded-3xl blur-xl opacity-60"></div>

                {/* Glassmorphic 3D Showcase Card Frame */}
                <div className="relative w-full h-full rounded-3xl bg-gradient-to-b from-[#0A5C80]/30 via-[#062A3B]/80 to-[#031824]/95 border-2 border-[#0A5C80]/50 backdrop-blur-xl p-3 sm:p-4 shadow-2xl flex flex-col justify-between overflow-hidden group">

                  {/* Stack of 4 Slide Images with Smooth Crossfade & Ken Burns Zoom */}
                  <div className="relative w-full flex-1 rounded-2xl overflow-hidden shadow-inner bg-[#02111A]">
                    {carouselSlides.map((slide, idx) => {
                      const isActive = activeSlide === idx;
                      return (
                        <div
                          key={slide.id}
                          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                            isActive
                              ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                              : 'opacity-0 scale-105 z-0 pointer-events-none'
                          }`}
                        >
                          {/* Ken Burns Animated Image */}
                          <div className={`w-full h-full overflow-hidden ${isActive ? 'animate-ken-burns' : ''}`}>
                            <img
                              src={slide.image}
                              alt={slide.tag}
                              className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.05]"
                              loading="eager"
                            />
                          </div>

                          {/* Gradient Overlays for Readability & High-Tech Look */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#031824]/90 via-[#031824]/20 to-transparent"></div>
                          <div className="absolute inset-0 bg-gradient-to-b from-[#031824]/50 via-transparent to-transparent"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#0A5C80]/20 to-transparent mix-blend-overlay"></div>
                        </div>
                      );
                    })}

                    {/* Floating Glassmorphic Badge 1 (Top Left) - Slow Float Animation */}
                    <div className="absolute top-3.5 left-3.5 z-20 animate-float-slow">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#041E2B]/85 backdrop-blur-md border border-[#6EA928]/60 shadow-lg shadow-[#041E2B]/50 text-white">
                        <span className="text-lg">{currentSlideData.floatingBadge1?.icon || '🏛️'}</span>
                        <div className="leading-tight">
                          <p className="text-[11px] font-black text-[#94CF45] tracking-wide">
                            {currentSlideData.floatingBadge1?.title || '15+ Banking Partners'}
                          </p>
                          <p className="text-[9px] text-slate-300 font-medium">
                            {currentSlideData.floatingBadge1?.subtitle || 'SBI, HDFC, ICICI, Axis'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Floating Rupee Hologram Token (Top Right) - Bouncing Glow */}
                    <div className="absolute top-3.5 right-3.5 z-20">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#6EA928] to-[#94CF45] border-2 border-white/90 text-[#031824] font-black text-xl flex items-center justify-center shadow-xl shadow-[#6EA928]/50 animate-bounce">
                        ₹
                      </div>
                    </div>

                    {/* Floating Glassmorphic Badge 2 (Bottom Right) - Reverse Float Animation */}
                    <div className="absolute bottom-4 right-3.5 z-20 animate-float-reverse">
                      <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#041E2B]/85 backdrop-blur-md border border-[#0A5C80]/70 shadow-lg shadow-[#041E2B]/50 text-white">
                        <span className="text-lg">{currentSlideData.floatingBadge2?.icon || '⚡'}</span>
                        <div className="leading-tight text-right">
                          <p className="text-[11px] font-black text-[#85C7DF] tracking-wide">
                            {currentSlideData.floatingBadge2?.title || 'Fast Digital Approval'}
                          </p>
                          <p className="text-[9px] text-slate-300 font-medium">
                            {currentSlideData.floatingBadge2?.subtitle || '100% Paperless KYC'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Left Live Tag Pill */}
                    <div className="absolute bottom-4 left-3.5 z-20 hidden sm:block">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#6EA928]/90 text-white shadow-md backdrop-blur-sm border border-white/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                        {currentSlideData.highlightTag || 'Verified Rates'}
                      </span>
                    </div>

                  </div>

                  {/* Interactive Bottom Control & Thumbnail Preview Bar */}
                  <div className="pt-2.5 px-1 flex items-center justify-between text-xs">
                    
                    {/* Interactive 4-Thumbnail Switcher */}
                    <div className="flex items-center gap-2">
                      {carouselSlides.map((slide, idx) => (
                        <button
                          key={slide.id}
                          onClick={() => setActiveSlide(idx)}
                          className={`group/thumb relative rounded-lg overflow-hidden border transition-all duration-300 cursor-pointer ${
                            activeSlide === idx
                              ? 'border-[#6EA928] ring-2 ring-[#6EA928]/50 scale-105'
                              : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                          }`}
                          title={slide.tag}
                        >
                          <img
                            src={slide.image}
                            alt={slide.tag}
                            className="w-10 h-7 sm:w-12 sm:h-8 object-cover"
                          />
                          {activeSlide === idx && (
                            <div className="absolute inset-0 bg-[#6EA928]/20 pointer-events-none"></div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Status / Compliance Pill */}
                    <div className="flex items-center gap-1 text-[11px] text-slate-300 font-semibold font-mono">
                      <span className="text-[#6EA928]">✓</span>
                      <span className="hidden sm:inline">100% Verified Partners</span>
                      <span className="text-white/40">•</span>
                      <span className="text-[#85C7DF]">0{activeSlide + 1}/0{carouselSlides.length}</span>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =========================================================================
              2. FOUR METRICS PILL BAR (Directly under Hero Carousel)
             ========================================================================= */}
          <div className="mt-8 sm:mt-12 bg-[#041E2B] border border-[#0A5C80]/35 rounded-2xl shadow-xl p-3 sm:p-4 backdrop-blur-md">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#0A5C80]/30 text-center">

              {/* Metric 1 */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-3 py-1 px-2">
                <span className="text-xl sm:text-2xl text-[#6EA928]">🏛️</span>
                <span className="text-xs sm:text-sm font-black text-white tracking-wide">
                  15+ Banking Partners
                </span>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-3 py-1 px-2">
                <span className="text-xl sm:text-2xl text-[#6EA928]">📚</span>
                <span className="text-xs sm:text-sm font-black text-white tracking-wide">
                  16+ Loan Categories
                </span>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-3 py-1 px-2 pt-2 md:pt-1">
                <span className="text-xl sm:text-2xl text-[#6EA928]">🧑‍💼</span>
                <span className="text-xs sm:text-sm font-black text-white tracking-wide">
                  Expert Assistance
                </span>
              </div>

              {/* Metric 4 */}
              <div className="flex items-center justify-center gap-2.5 sm:gap-3 py-1 px-2 pt-2 md:pt-1">
                <span className="text-xl sm:text-2xl text-[#6EA928]">⚡</span>
                <span className="text-xs sm:text-sm font-black text-white tracking-wide">
                  Quick In-Principle Decisions
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

          {/* Section Header */}
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-7 sm:h-8 bg-[#6EA928] rounded-full inline-block"></span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#041E2B] tracking-tight">
              Find a loan that fits{' '}
              <span className="text-[#0A5C80] underline decoration-[#6EA928] decoration-4 underline-offset-4">
                your goals
              </span>
            </h2>
          </div>

          {/* Dual-Panel Grid: 6 Loan Cards (Left) + Compare Loan Options Widget (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">

            {/* -------------------------------------------------------------------
                LEFT PANEL (8 Cols): 6 WHITE ROUNDED LOAN CARDS (2 rows x 3 cols)
               ------------------------------------------------------------------- */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {loanCards.map((card, idx) => (
                <div
                  key={idx}
                  onClick={() => handleAvailLoan(card.title, card.catId)}
                  className="bg-white rounded-2xl sm:rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-[#0A5C80]/50 hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    {/* Icon & Title Row */}
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                        {card.iconSvg}
                      </div>
                      <h3 className="text-base font-black text-slate-900 group-hover:text-[#0A5C80] transition-colors leading-tight">
                        {card.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {card.description}
                    </p>
                  </div>

                  {/* Card Footer: Rate tag & Circular Arrow Button */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#0A5C80] bg-[#E0F1F6] px-2.5 py-0.5 rounded-full">
                      {card.rate}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#6EA928] text-slate-600 group-hover:text-white flex items-center justify-center text-xs font-black transition-colors shadow-sm">
                      ➔
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* -------------------------------------------------------------------
                RIGHT PANEL (4 Cols): DEEP MARINE "COMPARE LOAN OPTIONS" WIDGET
               ------------------------------------------------------------------- */}
            <div className="lg:col-span-4 bg-[#072C3E] rounded-3xl p-6 sm:p-7 text-white shadow-xl border border-[#0A5C80]/50 flex flex-col justify-between space-y-5">

              {/* Widget Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl text-[#6EA928]">📊</span>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    Compare loan options
                  </h3>
                </div>
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  Check interest rates, eligibility and benefits across top banks — all in one place.
                </p>
              </div>

              {/* 3 Vibrant Rounded Gradient Action Buttons in Brand Colors */}
              <div className="space-y-3">

                {/* 1. Personal Loan (Brand Growth Green) */}
                <button
                  onClick={() => handleAvailLoan('Personal Loan', 'cat-personal')}
                  className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#6EA928] to-[#508018] hover:opacity-95 text-white shadow-lg shadow-[#6EA928]/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-black">
                      👤
                    </div>
                    <div className="text-left">
                      <div className="text-xs sm:text-sm font-black">Personal Loan</div>
                      <div className="text-[11px] text-[#E8F5D4] font-medium">From 10.5% p.a.</div>
                    </div>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-white group-hover:text-[#508018] flex items-center justify-center text-xs font-black transition-colors">
                    ➔
                  </span>
                </button>

                {/* 2. Business Loan (Brand Marine Blue) */}
                <button
                  onClick={() => handleAvailLoan('Business Loan', 'cat-business')}
                  className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#0A5C80] to-[#073D54] hover:opacity-95 text-white shadow-lg shadow-[#0A5C80]/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-black">
                      💼
                    </div>
                    <div className="text-left">
                      <div className="text-xs sm:text-sm font-black">Business Loan</div>
                      <div className="text-[11px] text-[#B8E0ED] font-medium">From 11.5% p.a.</div>
                    </div>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-white group-hover:text-[#0A5C80] flex items-center justify-center text-xs font-black transition-colors">
                    ➔
                  </span>
                </button>

                {/* 3. Doctor Loan (Brand Teal-Green Gradient) */}
                <button
                  onClick={() => handleAvailLoan('Doctor Loan', 'cat-professional')}
                  className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-[#0D749E] to-[#6EA928] hover:opacity-95 text-white shadow-lg shadow-[#0D749E]/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-black">
                      🩺
                    </div>
                    <div className="text-left">
                      <div className="text-xs sm:text-sm font-black">Doctor Loan</div>
                      <div className="text-[11px] text-[#E0F1F6] font-medium">Special APR</div>
                    </div>
                  </div>
                  <span className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-white group-hover:text-[#0D749E] flex items-center justify-center text-xs font-black transition-colors">
                    ➔
                  </span>
                </button>

              </div>

              {/* Bottom Supermarket Footnote */}
              <div className="pt-3 border-t border-[#0A5C80]/40 text-center">
                <a
                  href="#products"
                  className="text-xs text-[#6EA928] hover:text-[#94CF45] font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>🛒 View All 16+ Categories in Supermarket</span>
                  <span>»</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* =========================================================================
          4. FLOATING ACTION BADGES (WhatsApp on Left & AI Assistant on Right)
         ========================================================================= */}

      {/* Floating WhatsApp Desk on Bottom Left */}
      <a
        href="https://wa.me/917675852618?text=Hello%20VGS%20Finance,%20I%20am%20looking%20for%20loan%20options%20in%20the%20Loan%20Supermarket."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-[#6EA928] hover:bg-[#5A8B1F] text-white flex items-center justify-center text-3xl shadow-2xl hover:scale-110 transition-all cursor-pointer group"
        title="Chat with Loan Advisor on WhatsApp"
      >
        <span className="animate-bounce">💬</span>
        <span className="absolute left-16 top-2.5 px-3 py-1 rounded-xl bg-[#041E2B] text-white text-[11px] font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity border border-[#0A5C80]/50 pointer-events-none">
          WhatsApp Advisory Desk
        </span>
      </a>

      {/* Floating AI Assistant on Bottom Right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={onApplyClick}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#0A5C80] to-[#6EA928] hover:opacity-90 text-white flex items-center justify-center text-2xl shadow-2xl hover:scale-110 transition-all cursor-pointer group relative"
          title="Instant Loan Assistant"
        >
          <span>🤖</span>
          <span className="absolute right-16 top-2.5 px-3 py-1 rounded-xl bg-[#041E2B] text-white text-[11px] font-bold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity border border-[#0A5C80]/50 pointer-events-none">
            Instant Loan Assistant
          </span>
        </button>
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
