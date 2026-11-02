export default function PartnersSection({ partners }) {
  return (
    <section id="partners" className="py-16 bg-slate-900/40 border-t border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Lending Network
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Partner Banks & NBFCs
          </h2>
          <p className="text-sm text-slate-400">
            Proudly associated with India’s leading public, private banks, and non-banking financial institutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners?.map((partner) => (
            <div
              key={partner.id}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 p-5 rounded-2xl flex flex-col items-center text-center justify-between transition-all group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-white text-base tracking-wider group-hover:bg-emerald-600 transition-colors shadow-md">
                {partner.logoText}
              </div>

              <div className="mt-4 space-y-1">
                <div className="font-bold text-white text-xs sm:text-sm">{partner.name}</div>
                <div className="text-[10px] text-slate-400 font-medium">{partner.type}</div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800/80 w-full flex justify-between text-[11px]">
                <span className="text-slate-400">Max LTV:</span>
                <span className="font-bold text-emerald-400">{partner.maxLtv}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Co-lending disclaimer */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center text-xs text-slate-400 max-w-2xl mx-auto">
          🤝 VGS Finance operates in co-lending alignment with RBI guidelines and premier partner banks and NBFCs.
        </div>

      </div>
    </section>
  );
}
