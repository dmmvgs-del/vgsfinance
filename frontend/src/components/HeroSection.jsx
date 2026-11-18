import { useState, useEffect } from 'react';

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

  const carouselSlides = [
    {
      id: 'supermarket',
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
      badgeColor: 'bg-[#6EA928]/20 text-[#94CF45] border-[#6EA928]/40'
    },
    {
      id: 'fast-approval',
      tag: 'Express Digital Disbursement',
      headlinePrefix: 'Fast Approvals. ',
      headlineAccent: 'Lowest Rates.',
      headlineSuffix: '',
      headlineSecondLine: 'Zero Hidden Charges.',
      accentColor: 'text-[#85C7DF]',
      description:
        'Get 100% paperless KYC approval with attractive rates starting from 8.4% p.a. and doorstep advisor support.',
      primaryCta: 'Check Instant Eligibility ➔',
      primaryAction: () => {
        const el = document.getElementById('eligibility-checker');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else if (onApplyClick) onApplyClick();
      },
      primaryBg: 'bg-[#0A5C80] hover:bg-[#084E6D] text-white font-black shadow-lg shadow-[#0A5C80]/30',
      secondaryCta: 'Calculate EMI',
      secondaryIcon: '🧮',
      secondaryAction: onCalcClick || (() => {}),
      badgeText: 'Over ₹250+ Crores Disbursed Nationwide',
      badgeColor: 'bg-[#0A5C80]/20 text-[#85C7DF] border-[#0A5C80]/40'
    },
    {
      id: 'high-value',
      tag: 'High Quantum Business & Property Loans',
      headlinePrefix: 'Unlock High Value ',
      headlineAccent: 'Property & Business',
      headlineSuffix: '',
      headlineSecondLine: 'Loans Up To ₹10 Cr.',
      accentColor: 'text-[#6EA928]',
      description:
        'Tailored mortgage and working capital limits with maximum tenure up to 30 years and multi-bank sanction options.',
      primaryCta: 'Avail Low Rate Loan ➔',
      primaryAction: () => handleAvailLoan('Loan Against Property', 'cat-mortgage'),
      primaryBg: 'bg-gradient-to-r from-[#0A5C80] to-[#6EA928] hover:opacity-90 text-white font-black shadow-lg shadow-[#0A5C80]/30',
      secondaryCta: 'Join as Freelancer',
      secondaryIcon: '🤝',
      secondaryAction: () => setPartnerModalOpen(true),
      badgeText: '15+ Top PSU, Private & NBFC Partners',
      badgeColor: 'bg-[#0A5C80]/20 text-[#94CF45] border-[#6EA928]/40'
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

  const handleAvailLoan = (loanType, categoryId) => {
    if (onSelectCategory && categoryId && categoryId !== 'all') {
      onSelectCategory(categoryId);
    } else {
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else if (onApplyClick) onApplyClick();
    }
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
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeSlide === idx
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
                RIGHT COLUMN: 3D HOLOGRAPHIC DIGITAL BANK + FINANCIAL ADVISOR
               ------------------------------------------------------------------- */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Outer Glowing Stage Container */}
              <div className="relative w-full max-w-md sm:max-w-lg aspect-[4/3] sm:aspect-square flex items-center justify-center">
                
                {/* Ambient Glows */}
                <div className="absolute inset-4 bg-gradient-to-tr from-[#0A5C80]/30 to-[#6EA928]/25 rounded-3xl blur-2xl"></div>

                {/* Glassmorphic 3D Holographic Showcase Card */}
                <div className="relative w-full h-full rounded-3xl bg-gradient-to-b from-[#0A5C80]/25 via-[#062A3B]/60 to-[#031824]/90 border border-[#0A5C80]/40 backdrop-blur-md p-4 sm:p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
                  
                  {/* Floating Rupee Hologram Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6EA928] to-[#94CF45] border-2 border-white/80 text-[#031824] font-black text-2xl flex items-center justify-center shadow-xl shadow-[#6EA928]/40 animate-bounce">
                      ₹
                    </div>
                  </div>

                  {/* 3D Bank Architecture Hologram Illustration */}
                  <div className="relative w-full flex-1 flex items-center justify-center">
                    
                    <svg
                      className="w-full h-full max-h-64 sm:max-h-72 drop-shadow-[0_10px_20px_rgba(10,92,128,0.4)]"
                      viewBox="0 0 400 300"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="bankGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#3D9EBF" stopOpacity="0.9" />
                          <stop offset="50%" stopColor="#0A5C80" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#041E2B" stopOpacity="0.9" />
                        </linearGradient>
                        <linearGradient id="brandCurve" x1="0" y1="1" x2="1" y2="0">
                          <stop offset="0%" stopColor="#0A5C80" />
                          <stop offset="50%" stopColor="#6EA928" />
                          <stop offset="100%" stopColor="#94CF45" />
                        </linearGradient>
                        <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                          <feGaussianBlur stdDeviation="6" result="blur" />
                          <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                      </defs>

                      {/* Holographic Platform / Isometric Grid Base */}
                      <ellipse cx="200" cy="250" rx="170" ry="40" fill="url(#bankGrad)" opacity="0.35" />
                      <ellipse cx="200" cy="250" rx="140" ry="30" stroke="#0A5C80" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />

                      {/* 3D Glass Screen Backdrop */}
                      <rect x="50" y="40" width="220" height="190" rx="16" fill="#062A3B" fillOpacity="0.6" stroke="#0A5C80" strokeWidth="1.5" />
                      <line x1="70" y1="70" x2="110" y2="70" stroke="#6EA928" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                      <line x1="70" y1="85" x2="130" y2="85" stroke="#3D9EBF" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

                      {/* 3D Bank Temple Building */}
                      <g transform="translate(60, 60)">
                        {/* Pediment (Triangle Roof) */}
                        <polygon points="100,20 180,60 20,60" fill="url(#bankGrad)" stroke="#3D9EBF" strokeWidth="2" />
                        <rect x="70" y="38" width="60" height="15" rx="3" fill="#0A5C80" />
                        <text x="100" y="49" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900" letterSpacing="1">
                          BANK
                        </text>

                        {/* Frieze & Architrave */}
                        <rect x="25" y="60" width="150" height="10" fill="#084E6D" stroke="#6EA928" strokeWidth="1" />

                        {/* Classical Greek Pillars */}
                        <rect x="35" y="70" width="16" height="70" rx="2" fill="#0A5C80" fillOpacity="0.85" stroke="#3D9EBF" strokeWidth="1" />
                        <rect x="70" y="70" width="16" height="70" rx="2" fill="#0A5C80" fillOpacity="0.85" stroke="#3D9EBF" strokeWidth="1" />
                        <rect x="110" y="70" width="16" height="70" rx="2" fill="#0A5C80" fillOpacity="0.85" stroke="#3D9EBF" strokeWidth="1" />
                        <rect x="145" y="70" width="16" height="70" rx="2" fill="#0A5C80" fillOpacity="0.85" stroke="#3D9EBF" strokeWidth="1" />

                        {/* Steps Base */}
                        <rect x="20" y="140" width="160" height="8" fill="#063D56" stroke="#0A5C80" strokeWidth="1" />
                        <rect x="10" y="148" width="180" height="10" fill="#041E2B" stroke="#6EA928" strokeWidth="1" />
                      </g>

                      {/* Upward Rising Trajectory Growth Chart Line */}
                      <path
                        d="M80 220 Q 150 190 200 150 T 320 80"
                        fill="none"
                        stroke="url(#brandCurve)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        filter="url(#neonGlow)"
                      />
                      {/* Arrowhead on chart */}
                      <polygon points="320,70 330,85 315,88" fill="#94CF45" />
                      
                      {/* Chart Data Node Bulbs */}
                      <circle cx="150" cy="180" r="4.5" fill="#0A5C80" stroke="#ffffff" strokeWidth="1.5" />
                      <circle cx="200" cy="150" r="4.5" fill="#6EA928" stroke="#ffffff" strokeWidth="1.5" />
                      <circle cx="260" cy="115" r="4.5" fill="#94CF45" stroke="#ffffff" strokeWidth="1.5" />

                      {/* Professional Female Financial Advisor Vector Rendering */}
                      <g transform="translate(250, 45)">
                        {/* Golden/Green Ambient Glow behind Advisor */}
                        <circle cx="65" cy="100" r="60" fill="#6EA928" opacity="0.25" filter="url(#neonGlow)" />
                        
                        {/* Advisor Hair (Back) */}
                        <path d="M40 50 C40 20, 90 20, 90 50 C95 85, 95 110, 85 130 C75 110, 45 110, 40 50 Z" fill="#1c1917" />
                        
                        {/* Advisor Neck & Collar */}
                        <rect x="58" y="70" width="14" height="20" rx="2" fill="#e0a98b" />
                        <polygon points="50,85 65,105 58,85" fill="#ffffff" />
                        <polygon points="80,85 65,105 72,85" fill="#ffffff" />

                        {/* Advisor Face */}
                        <ellipse cx="65" cy="55" rx="18" ry="22" fill="#f2bba2" />
                        {/* Eyes, Smile, Eyebrows */}
                        <ellipse cx="58" cy="52" rx="2" ry="1.5" fill="#292524" />
                        <ellipse cx="72" cy="52" rx="2" ry="1.5" fill="#292524" />
                        <path d="M60 64 Q65 70 70 64" stroke="#b91c1c" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        <path d="M54 47 Q58 45 62 47" stroke="#1c1917" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        <path d="M68 47 Q72 45 76 47" stroke="#1c1917" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                        
                        {/* Advisor Hair (Front Wave / Stylized) */}
                        <path d="M45 45 C50 30, 80 30, 85 45 C80 35, 55 35, 45 45 Z" fill="#292524" />

                        {/* Advisor Suit Jacket (Deep Marine Navy Blazer) */}
                        <path d="M40 85 C30 110, 30 170, 30 190 L100 190 C100 170, 100 110, 90 85 L75 105 L65 135 L55 105 Z" fill="#072C3E" />
                        {/* Lapels */}
                        <polygon points="40,85 55,105 52,145 35,130" fill="#0A5C80" />
                        <polygon points="90,85 75,105 78,145 95,130" fill="#0A5C80" />
                        
                        {/* Crossed Arms */}
                        <path d="M35 140 Q65 170 95 140 Q65 155 35 140" fill="#072C3E" stroke="#0A5C80" strokeWidth="1" />
                        
                        {/* Green Lapel Pin Badge */}
                        <circle cx="48" cy="115" r="3" fill="#6EA928" stroke="#ffffff" strokeWidth="0.5" />
                        {/* Watch */}
                        <rect x="42" y="152" width="7" height="4" rx="1" fill="#6EA928" />
                      </g>
                    </svg>

                  </div>

                  {/* Bottom Strip Inside 3D Card */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-300">
                    <span className="flex items-center gap-1.5 font-bold text-[#6EA928]">
                      <span>✓</span> ISO 9001:2015 Certified Advisory
                    </span>
                    <span className="text-[10px] text-[#85C7DF] font-mono font-bold">
                      15+ Partner Banks
                    </span>
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
