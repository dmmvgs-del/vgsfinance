export default function FeaturedLoanProducts({ products, onApplyProduct, onViewDetails }) {
  // Select 3-4 top featured products
  const featured = products?.slice(0, 3) || [];

  return (
    <section id="featured-products" className="py-20 bg-white border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-xs font-black tracking-wide uppercase">
              <span>Curated Market Offerings</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#041E2B] tracking-tight">
              Featured Loan Products
            </h2>
            <p className="text-sm text-slate-600">
              Hand-picked high-approval loan products with transparent terms, low processing charges, and instant sanction facilities.
            </p>
          </div>
          <a
            href="#contact-enquiry"
            className="text-xs font-bold text-[#0A5C80] hover:text-[#6EA928] flex items-center gap-1.5 transition-colors"
          >
            <span>Apply or Enquire for Any Loan</span>
            <span>➔</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((product, idx) => (
            <div
              key={product.id || idx}
              className="bg-white border border-slate-200/90 hover:border-[#6EA928] rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl flex flex-col justify-between space-y-6 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
            >
              {/* Top Accent Gradient Bar in Logo Palette */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 ${idx === 0 ? 'bg-gradient-to-r from-[#0A5C80] to-[#6EA928]' :
                  idx === 1 ? 'bg-gradient-to-r from-[#6EA928] to-[#94CF45]' :
                    'bg-gradient-to-r from-[#0D749E] to-[#0A5C80]'
                }`}></div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-[#E8F5D4] text-[#466E18] border border-[#6EA928]/30">
                    {idx === 0 ? '⭐ Best Seller' : idx === 1 ? '🔥 Zero Collateral' : '🪙 Instant Disbursal'}
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block font-medium">Interest Rate</span>
                    <span className="text-lg font-black text-[#6EA928]">{product.interestRate}% <span className="text-xs font-normal text-slate-500">p.a.</span></span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0A5C80] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {product.tagline || 'Quick approval with flexible repayment tenures.'}
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Loan Amount:</span>
                    <span className="font-bold text-slate-900">₹ {(product.minAmount / 100000).toFixed(1)}L - ₹ {(product.maxAmount / 100000).toFixed(0)}L</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Tenure Window:</span>
                    <span className="font-bold text-slate-700">{product.minTenure} to {product.maxTenure} Months</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Processing Fee:</span>
                    <span className="font-bold text-[#0A5C80]">{product.processingFee || '1.5% + GST'}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Highlights:</div>
                  <ul className="text-xs text-slate-600 space-y-1">
                    {(product.features || ['Paperless approval', 'No hidden charges', 'Direct NEFT transfer']).slice(0, 3).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-1.5">
                        <span className="text-[#6EA928] text-xs">✔</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onViewDetails && onViewDetails(product)}
                  className="py-3 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-[#0A5C80] border border-slate-300 transition-all cursor-pointer text-center"
                >
                  🔍 View Details
                </button>
                <button
                  type="button"
                  onClick={() => onApplyProduct && onApplyProduct(product)}
                  className="py-3 rounded-xl font-bold text-xs bg-[#6EA928] hover:bg-[#5A8B1F] text-white shadow-lg shadow-[#6EA928]/25 cursor-pointer transition-all flex items-center justify-center gap-1.5"
                >
                  <span>🚀</span> Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

