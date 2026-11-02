import { useState } from 'react';

export default function Navbar({ currentView, setCurrentView, onApplyClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Search Loans', href: '#loan-search' },
    { label: 'Categories', href: '#popular-categories' },
    { label: 'Featured', href: '#featured-products' },
    { label: 'Supermarket', href: '#products' },
    { label: 'EMI Calculator', href: '#emi-calc' },
    { label: 'Why Choose Us', href: '#why-choose-us' },
    { label: 'Partners', href: '#partners' },
    { label: 'Quick Enquiry', href: '#quick-enquiry' },
    { label: 'Contact', href: '#contact-enquiry' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('website')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-indigo-600 flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-400/30">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-amber-300 via-emerald-300 to-sky-300 bg-clip-text text-transparent">
                  VGS FINANCE
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Govt Regd NBFC
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Finance & Loan Management Platform</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
            {currentView === 'website' && navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-emerald-400 transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action & Admin Mode Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {currentView === 'website' ? (
              <>
                <button
                  onClick={onApplyClick}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  ⚡ Apply Now
                </button>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  🔒 Admin Login
                </button>
              </>
            ) : (
              <button
                onClick={() => setCurrentView('website')}
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white shadow-lg shadow-indigo-500/25 transition-all cursor-pointer flex items-center gap-2"
              >
                🌐 Customer Website
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setCurrentView(currentView === 'website' ? 'admin' : 'website')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700"
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && currentView === 'website' && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm text-slate-300 hover:text-emerald-400 font-medium"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onApplyClick();
              }}
              className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm"
            >
              ⚡ Apply Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
