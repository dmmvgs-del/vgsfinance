import { useState, useRef, useEffect } from 'react';

export default function AboutCompany() {
  const statsRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState({ capital: 0, borrowers: 0 });

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
          setCounts({ capital: 0, borrowers: 0 });
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) {
      setCounts({ capital: 0, borrowers: 0 });
      return;
    }

    let startTime = null;
    let frameId;
    const duration = 1600;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts({
        capital: Math.round(150 * eased),
        borrowers: Math.round(12500 * eased)
      });

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCounts({ capital: 150, borrowers: 12500 });
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [inView]);

  return (
    <section className="pt-12 sm:pt-14 pb-8 sm:pb-10 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Main About VGS Finance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#466E18] text-xs font-bold uppercase tracking-wider">
              <span>🏛️</span> About VGS Finance & Loans
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              A Modern Loan Supermarket Built on{' '}
              <span className="bg-gradient-to-r from-[#0A5C80] to-[#6EA928] bg-clip-text text-transparent">
                Trust & Speed
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              VGS Finance is a customer-first financial technology and loan aggregation platform. We democratize access to formal credit across India by bridging borrowers with over 15+ premier public banks, private lenders, and NBFCs through a unified, paperless marketplace.
            </p>

            <div ref={statsRef} className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-2xl font-black text-[#6EA928] font-mono tabular-nums">
                  ₹ {counts.capital}+ Cr
                </div>
                <div className="text-xs text-slate-500 mt-1">Disbursed to Date</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-2xl font-black text-[#0A5C80] font-mono tabular-nums">
                  {counts.borrowers.toLocaleString('en-IN')}+
                </div>
                <div className="text-xs text-slate-500 mt-1">Happy Borrowers</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5D4] text-[#466E18] flex items-center justify-center font-bold text-lg">
                🛡️
              </div>
              <h4 className="font-bold text-slate-900 text-sm">100% Transparent</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Clear interest rates, zero hidden charges, and transparent pre-closure terms.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0A5C80] flex items-center justify-center font-bold text-lg">
                ⚡
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Instant Processing</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Digital verification ensures sanction notes are generated in as little as 2 hours.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5D4] text-[#466E18] flex items-center justify-center font-bold text-lg">
                🤝
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Dedicated Loan Desk</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Assigned loan managers handle documentation, bank liaising, and disbursement.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-[#0A5C80] flex items-center justify-center font-bold text-lg">
                🔒
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Bank-Grade Privacy</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                256-bit encryption protects all applicant records in accordance with RBI IT standards.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
