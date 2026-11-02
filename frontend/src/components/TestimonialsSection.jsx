export default function TestimonialsSection({ testimonials }) {
  return (
    <section id="testimonials" className="py-16 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Customer Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Trusted by Over 12,500+ Borrowers
          </h2>
          <p className="text-sm text-slate-400">
            Discover why entrepreneurs, salaried professionals, and families rely on VGS Finance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials?.map((t) => (
            <div
              key={t.id}
              className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between shadow-xl space-y-4 hover:border-amber-500/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 text-sm">
                    {'★'.repeat(t.rating)}
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {t.amount} Sanctioned
                  </span>
                </div>

                <p className="text-sm text-slate-300 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-sky-500 flex items-center justify-center font-bold text-white text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-bold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-slate-400">{t.location} • <span className="text-indigo-400">{t.loanType}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
