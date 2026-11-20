import { useState, useRef, useEffect } from 'react';

export default function WhyChooseUs({ onApplyClick }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-increment / Count-up animation for performance metric banner on scroll up and down
  const bannerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState({
    capital: 0,
    borrowers: 0,
    rate: 0,
    banks: 0
  });

  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          // Reset to 0 when user scrolls away (up or down), so it re-increments every time user scrolls to it
          setInView(false);
          setCounts({ capital: 0, borrowers: 0, rate: 0, banks: 0 });
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) {
      setCounts({ capital: 0, borrowers: 0, rate: 0, banks: 0 });
      return;
    }

    let startTime = null;
    let animationFrameId;
    const duration = 1600; // 1.6s smooth easing duration

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts({
        capital: Math.round(150 * eased),
        borrowers: Math.round(12500 * eased),
        rate: Number((99.2 * eased).toFixed(1)),
        banks: Math.round(15 * eased)
      });

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCounts({
          capital: 150,
          borrowers: 12500,
          rate: 99.2,
          banks: 15
        });
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [inView]);

  const pillars = [
    {
      icon: '🏪',
      badge: 'Aggregator Advantage',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: 'Multi-Bank Supermarket',
      desc: 'Compare loan interest rates, sanction limits, and tenures across 15+ premier banks and NBFCs in one unified digital portal.'
    },
    {
      icon: '⚡',
      badge: 'Fast Track Sanction',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      title: '2-Hour Digital Sanction',
      desc: 'Automated underwriting algorithms and electronic credit evaluation deliver instant in-principle approval without days of waiting.'
    },
    {
      icon: '📉',
      badge: 'Lowest Interest',
      badgeColor: 'bg-sky-50 text-sky-700 border-sky-200',
      title: 'Lowest Interest Rates',
      desc: 'Competitive reducing-balance interest rates starting at just 8.4% p.a., with zero prepayment penalties on select institutional loans.'
    },
    {
      icon: '📑',
      badge: 'Digilocker & e-KYC',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      title: '100% Paperless Process',
      desc: 'Digital Aadhaar e-KYC, online PAN verification, and direct electronic bank statement parsing with banking-grade 256-bit encryption.'
    },
    {
      icon: '🛡️',
      badge: '100% Free Advisory',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      title: 'Zero Upfront Fees',
      desc: 'Completely free loan discovery, credit capacity evaluation, and expert advisory. We never ask for advance cash payments or upfront fees.'
    },
    {
      icon: '👨‍💼',
      badge: 'Personal Officer',
      badgeColor: 'bg-[#E8F5D4] text-[#466E18] border-[#6EA928]/30',
      title: 'Dedicated Loan Advisor',
      desc: 'Get assigned a senior financial advisor who manages document collection, bank coordination, negotiation, and swift disbursement.'
    },
    {
      icon: '🎯',
      badge: 'Pre-Approval Filter',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      title: '99.2% Sanction Track',
      desc: 'Our proprietary credit eligibility pre-check ensures your application goes only to lenders whose underwriting criteria you completely fulfill.'
    },
    {
      icon: '🤝',
      badge: 'Doorstep & Online',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
      title: 'Complete Lifecycle Support',
      desc: 'From initial application to final bank account credit and post-disbursal query resolution, we stay by your side at every step.'
    }
  ];

  const checkScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
      const cardWidth = 360;
      setActiveIndex(Math.min(pillars.length - 1, Math.max(0, Math.round(scrollLeft / cardWidth))));
    }
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      const cardWidth = 370;
      scrollRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    }
  };

  // Continuous / Interval Auto-Scrolling Carousel
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft >= scrollWidth - clientWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 380, behavior: 'smooth' });
        }
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section id="why-choose-us" className="py-20 bg-slate-50 border-t border-b border-slate-200/80 relative overflow-hidden">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 space-y-12">
        
        {/* Section Header with Left/Right Scrolling Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-xs font-black tracking-wide uppercase">
              <span>🛡️ Trust & Customer Pillars</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#041E2B] tracking-tight">
              Why Choose VGS Finance?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-justify">
              We bridge the gap between borrowers and India's premier lending institutions with complete transparency, high speed, and unbiased comparisons.
            </p>
          </div>

          {/* Interactive Scroll Controls */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
              Scroll Features ➔
            </span>

            {/* Left Button */}
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              className={`w-11 h-11 rounded-2xl border flex items-center justify-center text-lg font-black transition-all cursor-pointer ${
                canScrollLeft
                  ? 'bg-white border-slate-300 text-slate-800 hover:bg-[#6EA928] hover:text-white hover:border-[#6EA928] shadow-sm hover:shadow-md'
                  : 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
              }`}
              title="Scroll Left"
            >
              ‹
            </button>

            {/* Right Button */}
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              className={`w-11 h-11 rounded-2xl border flex items-center justify-center text-lg font-black transition-all cursor-pointer ${
                canScrollRight
                  ? 'bg-white border-slate-300 text-slate-800 hover:bg-[#6EA928] hover:text-white hover:border-[#6EA928] shadow-sm hover:shadow-md'
                  : 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed'
              }`}
              title="Scroll Right"
            >
              ›
            </button>
          </div>
        </div>

        {/* =========================================================================
            HORIZONTAL SCROLLING TRACK / CAROUSEL
           ========================================================================= */}
        <div 
          className="relative group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Scrollable Track */}
          <div
            ref={scrollRef}
            onScroll={checkScrollState}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-6 pt-2 px-1 snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {pillars.map((item, idx) => (
              <div
                key={idx}
                className="w-[300px] sm:w-[350px] lg:w-[380px] shrink-0 snap-start bg-white border border-slate-200/90 hover:border-[#6EA928] p-7 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 shadow-xs hover:shadow-xl space-y-4 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Hover Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0A5C80] to-[#6EA928] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="space-y-4">
                  {/* Icon & Badge Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-2xl group-hover:bg-[#E8F5D4] group-hover:border-[#6EA928]/40 transition-colors shadow-xs">
                      {item.icon}
                    </div>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#0A5C80] transition-colors tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Verification Track */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1.5 font-semibold text-[#6EA928]">
                    <span>✓</span> Verified Feature
                  </span>
                  <span className="text-slate-300 font-bold group-hover:text-[#0A5C80] transition-colors">
                    0{idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Fade edges indicators on wide screens */}
          {canScrollLeft && (
            <div className="hidden lg:block absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none"></div>
          )}
          {canScrollRight && (
            <div className="hidden lg:block absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>
          )}
        </div>

        {/* Carousel Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-2 pt-1">
          {pillars.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => scrollToIndex(dotIdx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeIndex === dotIdx
                  ? 'w-8 bg-[#6EA928]'
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
              title={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>

        {/* Performance Metric Banner with Auto-Increment on scroll up & down */}
        <div ref={bannerRef} className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm transition-all duration-500">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#6EA928] font-mono tracking-tight tabular-nums">
                ₹ {counts.capital}+ Cr
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Cumulative Capital Disbursed</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#0A5C80] font-mono tracking-tight tabular-nums">
                {counts.borrowers.toLocaleString('en-IN')}+
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Satisfied Borrowers Across India</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#6EA928] font-mono tracking-tight tabular-nums">
                {counts.rate.toFixed(1)}%
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">In-Principle Sanction Rate</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-[#0A5C80] font-mono tracking-tight tabular-nums">
                {counts.banks}+ Banks
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-medium">Premier Lending Institution Tie-ups</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
