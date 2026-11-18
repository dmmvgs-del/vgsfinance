export default function PartnersSection({ partners }) {
  return (
    <section id="partners" className="py-16 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-left max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-xs font-black tracking-wide uppercase">
            <span>Lending Network</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#041E2B] tracking-tight">
            Our Partner Banks & NBFCs
          </h2>
          <p className="text-sm text-slate-600">
            Proudly associated with India’s leading public, private banks, and non-banking financial institutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {partners?.map((partner) => (
            <div
              key={partner.id}
              className="bg-white border border-slate-200/90 hover:border-[#6EA928] p-5 rounded-2xl flex flex-col items-center text-center justify-between transition-all group hover:-translate-y-1 shadow-sm hover:shadow-md"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center font-black text-[#0A5C80] text-base tracking-wider group-hover:bg-[#6EA928] group-hover:text-white transition-colors shadow-sm">
                {partner.logoText}
              </div>

              <div className="mt-4 space-y-1">
                <div className="font-bold text-slate-900 text-xs sm:text-sm">{partner.name}</div>
                <div className="text-[10px] text-slate-500 font-medium">{partner.type}</div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 w-full flex justify-between text-[11px]">
                <span className="text-slate-500">Max LTV:</span>
                <span className="font-bold text-[#6EA928]">{partner.maxLtv}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Co-lending disclaimer */}
        <div className="p-4 rounded-xl bg-white border border-slate-200 text-center text-xs text-slate-600 max-w-2xl mx-auto shadow-sm">
          🤝 VGS Finance operates in co-lending alignment with RBI guidelines and premier partner banks and NBFCs.
        </div>

      </div>
    </section>
  );
}
