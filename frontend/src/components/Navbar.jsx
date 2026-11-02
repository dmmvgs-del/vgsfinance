import { useState } from 'react';

export default function Navbar({ currentView, setCurrentView, onApplyClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const loanServices = [
    { name: 'Personal Loan', href: '#products', icon: '👤' },
    { name: 'Business Loan', href: '#products', icon: '🏢' },
    { name: 'Professional Loan (Doctor/CA)', href: '#products', icon: '💼' },
    { name: 'Home Loan', href: '#products', icon: '🏠' },
    { name: 'Gold Loan', href: '#products', icon: '🪙' },
    { name: 'Commercial Vehicle Loan', href: '#products', icon: '🚛' },
    { name: 'Mortgage Loan (LAP)', href: '#products', icon: '🏛️' },
    { name: 'Working Capital / Overdraft', href: '#products', icon: '📈' }
  ];

  return (
    <header className="sticky top-0 z-50 shadow-xl font-sans">
      
      {/* =========================================================================
          1. TOP UTILITY BAR (Angled Contact Info Banner)
         ========================================================================= */}
      <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center py-2 gap-2">
          
          <div className="hidden md:flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>India's Leading Multi-Bank Loan Supermarket & Financial Services</span>
          </div>

          {/* Right contact details */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6 text-[11px]">
            <a
              href="mailto:reachus@ascendmedialabs.com"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span>✉️</span>
              <span>reachus@ascendmedialabs.com</span>
            </a>
            <a
              href="tel:18004259988"
              className="flex items-center gap-1.5 hover:text-emerald-400 font-bold transition-colors"
            >
              <span>📞</span>
              <span>1800-425-9988</span>
            </a>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-400">
              <span>📍</span>
              <span>Visakhapatnam, Andhra Pradesh</span>
            </span>
          </div>

        </div>
      </div>

      {/* =========================================================================
          2. MAIN NAVIGATION BAR (Dual-Tone Supermarket Branded)
         ========================================================================= */}
      <nav className="bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Brand Logo & Title */}
            <div
              className="flex items-center gap-3 cursor-pointer select-none"
              onClick={() => setCurrentView('website')}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-500 border border-sky-400/30 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-600/30">
                ₹
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    VGS <span className="text-sky-400">FINANCIAL SERVICES</span>
                  </span>
                </div>
                <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                  PRIVATE LIMITED • LOAN SUPER MARKET
                </div>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-7 text-xs font-bold text-slate-200">
              
              <a
                href="#hero"
                className="hover:text-sky-400 transition-colors py-2 border-b-2 border-sky-500 text-sky-400"
              >
                Home
              </a>

              <a href="#about" className="hover:text-sky-400 transition-colors py-2">
                About us
              </a>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="hover:text-sky-400 transition-colors py-2 flex items-center gap-1 cursor-pointer"
                >
                  <span>Services</span>
                  <span className="text-[10px]">▼</span>
                </button>

                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-slate-900 border border-slate-800 rounded-2xl p-2.5 shadow-2xl space-y-1 z-50">
                    {loanServices.map((srv, idx) => (
                      <a
                        key={idx}
                        href={srv.href}
                        onClick={() => setServicesDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <span className="text-base">{srv.icon}</span>
                        <span>{srv.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="#products" className="hover:text-sky-400 transition-colors py-2">
                Gallery / Products
              </a>

              <a href="#contact-enquiry" className="hover:text-sky-400 transition-colors py-2">
                Contact us
              </a>

              <a href="#emi-calc" className="hover:text-sky-400 transition-colors py-2">
                EMI Calculator
              </a>

              {/* Login As Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setLoginDropdownOpen(true)}
                onMouseLeave={() => setLoginDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-sky-500 text-slate-200 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Login as</span>
                  <span className="text-[10px] text-sky-400">▼</span>
                </button>

                {loginDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-52 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl space-y-1 z-50 animate-scale-up">
                    <button
                      onClick={() => {
                        setLoginDropdownOpen(false);
                        setCurrentView('admin');
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold text-sky-400 hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>🔒</span> Admin Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setLoginDropdownOpen(false);
                        setCurrentView('admin');
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <span>👔</span> Loan Officer Login
                    </button>
                    <a
                      href="#contact-enquiry"
                      onClick={() => setLoginDropdownOpen(false)}
                      className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors flex items-center gap-2 block"
                    >
                      <span>🤝</span> DSA Partner / Freelancer
                    </a>
                  </div>
                )}
              </div>

            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setCurrentView(currentView === 'website' ? 'admin' : 'website')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-sky-400 border border-slate-700"
              >
                {currentView === 'website' ? '🔒 Admin' : '🌐 Website'}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-sky-400 font-bold">Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-300 font-medium">About us</a>
            <a href="#products" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-300 font-medium">Services & Products</a>
            <a href="#emi-calc" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-300 font-medium">EMI Calculator</a>
            <a href="#contact-enquiry" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-slate-300 font-medium">Contact us</a>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentView('admin');
                }}
                className="w-full py-2.5 rounded-xl font-bold bg-slate-800 border border-slate-700 text-sky-400 text-xs"
              >
                🔒 Login as Admin / Officer
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onApplyClick();
                }}
                className="w-full py-2.5 rounded-xl font-bold bg-sky-600 text-white text-xs"
              >
                🚀 Apply Now
              </button>
            </div>
          </div>
        )}

      </nav>
    </header>
  );
}
