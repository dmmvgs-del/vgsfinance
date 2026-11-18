export default function TestimonialsSection({ testimonials }) {
  return (
    <section id="testimonials" className="py-16 bg-white border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-[#6EA928]">
            Customer Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Over 12,500+ Borrowers
          </h2>
          <p className="text-sm text-slate-600">
            Discover why entrepreneurs, salaried professionals, and families rely on VGS Finance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials?.map((t) => (
            <div
              key={t.id}
              className="bg-slate-50 border border-slate-200/90 p-6 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-xl space-y-4 hover:border-[#6EA928] hover:bg-white transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500 text-sm">
                    {'★'.repeat(t.rating)}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E8F5D4] text-[#466E18] border border-[#6EA928]/30">
                    {t.amount} Sanctioned
                  </span>
                </div>

                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0A5C80] to-[#6EA928] flex items-center justify-center font-bold text-white text-sm shadow-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.location} • <span className="text-[#0A5C80] font-semibold">{t.loanType}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
