import React from 'react';

export default function LoanProcessSteps({ onApplyClick }) {
  const steps = [
    {
      number: '01',
      title: 'Online Application Process',
      subtitle: 'Process',
      splitTitle: true,
      borderColor: 'border-[#7C3AED]', // Purple
      shadowColor: 'shadow-[0_22px_45px_-8px_rgba(124,58,237,0.32)]',
      glowColor: 'bg-purple-500/10',
      icon: (
        <svg className="w-12 h-12 sm:w-16 sm:h-16 text-slate-800" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Globe Mesh */}
          <circle cx="27" cy="27" r="16" stroke="#94A3B8" strokeWidth="1.8" />
          <ellipse cx="27" cy="27" rx="7" ry="16" stroke="#94A3B8" strokeWidth="1.8" />
          <line x1="11" y1="27" x2="43" y2="27" stroke="#94A3B8" strokeWidth="1.8" />
          
          {/* Online Application Form Sheet */}
          <rect x="26" y="18" width="26" height="34" rx="3.5" fill="white" stroke="#1E293B" strokeWidth="2.2" />
          {/* Form Header Bar */}
          <line x1="31" y1="24" x2="47" y2="24" stroke="#7C3AED" strokeWidth="2.5" />
          {/* Input fields */}
          <line x1="31" y1="31" x2="47" y2="31" stroke="#334155" strokeWidth="2" />
          <line x1="31" y1="37" x2="47" y2="37" stroke="#334155" strokeWidth="2" />
          <line x1="31" y1="43" x2="41" y2="43" stroke="#334155" strokeWidth="2" />
          {/* Checkmark pin */}
          <circle cx="45" cy="44" r="3" fill="#7C3AED" stroke="none" />
        </svg>
      )
    },
    {
      number: '02',
      title: 'Document submission',
      splitTitle: false,
      borderColor: 'border-[#F59E0B]', // Golden Yellow
      shadowColor: 'shadow-[0_22px_45px_-8px_rgba(245,158,11,0.35)]',
      glowColor: 'bg-amber-400/10',
      icon: (
        <svg className="w-12 h-12 sm:w-16 sm:h-16 text-slate-800" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Document Sheet */}
          <path d="M19 12h18l13 13v25a3.5 3.5 0 0 1-3.5 3.5H19a3.5 3.5 0 0 1-3.5-3.5V15.5A3.5 3.5 0 0 1 19 12z" fill="white" stroke="#1E293B" strokeWidth="2.2" />
          <path d="M37 12v13h13" stroke="#1E293B" strokeWidth="2" />
          <line x1="22" y1="23" x2="31" y2="23" stroke="#94A3B8" strokeWidth="2" />
          <line x1="22" y1="30" x2="30" y2="30" stroke="#94A3B8" strokeWidth="2" />
          
          {/* Verification Magnifying Glass */}
          <circle cx="34" cy="39" r="10.5" fill="white" stroke="#1E293B" strokeWidth="2.4" />
          {/* Scan rays inside */}
          <path d="M29 39l3.5 3.5 7-7" stroke="#F59E0B" strokeWidth="2.6" />
          {/* Glass Handle */}
          <line x1="42" y1="46.5" x2="52" y2="56.5" stroke="#1E293B" strokeWidth="3.2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      number: '03',
      title: 'Instant Approval & Disbursals',
      subtitle: '& Disbursals',
      splitTitle: true,
      borderColor: 'border-[#7C3AED]', // Purple
      shadowColor: 'shadow-[0_22px_45px_-8px_rgba(124,58,237,0.32)]',
      glowColor: 'bg-purple-500/10',
      icon: (
        <svg className="w-12 h-12 sm:w-16 sm:h-16 text-slate-800" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Sanction Agreement Card */}
          <rect x="13" y="15" width="38" height="38" rx="4" fill="white" stroke="#1E293B" strokeWidth="2.2" />
          <line x1="19" y1="23" x2="33" y2="23" stroke="#7C3AED" strokeWidth="2.4" />
          <line x1="19" y1="29" x2="30" y2="29" stroke="#94A3B8" strokeWidth="2" />
          
          {/* Thumbs Up Hand / Approval */}
          <path
            d="M31 38h9a2.5 2.5 0 0 0 2.5-2.5v-1.8a2.5 2.5 0 0 0-2.5-2.5h-5.5l1.2-5.5a2.5 2.5 0 0 0-2.5-3l-4 7.5v9a2 2 0 0 0 1.8 1.8z"
            fill="white"
            stroke="#1E293B"
            strokeWidth="2.2"
          />
          {/* Wrist cuff */}
          <rect x="25" y="32" width="4.5" height="12" rx="1.2" fill="#7C3AED" stroke="#1E293B" strokeWidth="1.8" />
        </svg>
      )
    }
  ];

  return (
    <section id="loan-process-flow" className="py-20 sm:py-28 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-3 mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            How we make loans happen in{' '}
            <span className="text-[#6B21A8]">30 Mins – 6 hours*?</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-3xl mx-auto font-normal leading-relaxed">
            We make loans possible in just 3 simple steps to provide a fast, flexible and friendly customer experience
          </p>
        </div>

        {/* 3 Steps V-Shape Process Container */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* SVG Connecting Path (Visible on Desktop / Tablets) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none -z-0">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 900 380" 
              fill="none" 
              preserveAspectRatio="none"
            >
              {/* Soft Thick Road/Pathway */}
              <path
                d="M 180 120 L 450 240 L 720 120"
                stroke="#F3F4F6"
                strokeWidth="68"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Subtle inner runway stripe */}
              <path
                d="M 180 120 L 450 240 L 720 120"
                stroke="#E5E7EB"
                strokeWidth="2"
                strokeDasharray="8 8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Stepper Grid (3 Columns with Center Shifted Down) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start relative z-10">
            
            {/* Step 01 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                {/* Slanted Number 01 */}
                <span className="absolute -top-7 -left-7 sm:-top-9 sm:-left-9 text-4xl sm:text-5xl font-black italic text-[#6B21A8] tracking-tighter select-none drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                  01
                </span>
                
                {/* Isometric Rounded Diamond Tile */}
                <div 
                  onClick={onApplyClick}
                  className={`w-32 h-32 sm:w-36 sm:h-36 rounded-3xl sm:rounded-[32px] bg-white border-2 ${steps[0].borderColor} ${steps[0].shadowColor} flex items-center justify-center transform rotate-45 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2 cursor-pointer relative overflow-hidden`}
                >
                  {/* Subtle Inner Glow */}
                  <div className={`absolute inset-0 ${steps[0].glowColor} opacity-70`}></div>
                  {/* Icon counter-rotated to stay level */}
                  <div className="transform -rotate-45 relative z-10">
                    {steps[0].icon}
                  </div>
                </div>
              </div>
              
              {/* Step Label */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug tracking-tight">
                Online Application<br />Process
              </h3>
            </div>

            {/* Step 02 (Dipped Downwards for the "V" shape layout) */}
            <div className="flex flex-col items-center text-center group md:translate-y-28">
              <div className="relative mb-6">
                {/* Slanted Number 02 */}
                <span className="absolute -top-7 -left-7 sm:-top-9 sm:-left-9 text-4xl sm:text-5xl font-black italic text-[#6B21A8] tracking-tighter select-none drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                  02
                </span>
                
                {/* Isometric Rounded Diamond Tile (Golden Amber Accent) */}
                <div 
                  onClick={onApplyClick}
                  className={`w-32 h-32 sm:w-36 sm:h-36 rounded-3xl sm:rounded-[32px] bg-white border-2 ${steps[1].borderColor} ${steps[1].shadowColor} flex items-center justify-center transform rotate-45 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2 cursor-pointer relative overflow-hidden`}
                >
                  {/* Subtle Inner Glow */}
                  <div className={`absolute inset-0 ${steps[1].glowColor} opacity-70`}></div>
                  {/* Icon counter-rotated to stay level */}
                  <div className="transform -rotate-45 relative z-10">
                    {steps[1].icon}
                  </div>
                </div>
              </div>
              
              {/* Step Label */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug tracking-tight">
                Document submission
              </h3>
            </div>

            {/* Step 03 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                {/* Slanted Number 03 */}
                <span className="absolute -top-7 -left-7 sm:-top-9 sm:-left-9 text-4xl sm:text-5xl font-black italic text-[#6B21A8] tracking-tighter select-none drop-shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                  03
                </span>
                
                {/* Isometric Rounded Diamond Tile */}
                <div 
                  onClick={onApplyClick}
                  className={`w-32 h-32 sm:w-36 sm:h-36 rounded-3xl sm:rounded-[32px] bg-white border-2 ${steps[2].borderColor} ${steps[2].shadowColor} flex items-center justify-center transform rotate-45 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2 cursor-pointer relative overflow-hidden`}
                >
                  {/* Subtle Inner Glow */}
                  <div className={`absolute inset-0 ${steps[2].glowColor} opacity-70`}></div>
                  {/* Icon counter-rotated to stay level */}
                  <div className="transform -rotate-45 relative z-10">
                    {steps[2].icon}
                  </div>
                </div>
              </div>
              
              {/* Step Label */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug tracking-tight">
                Instant Approval<br />& Disbursals
              </h3>
            </div>

          </div>

          {/* Bottom spacing spacer for desktop translate-y */}
          <div className="hidden md:block h-32"></div>

        </div>

      </div>
    </section>
  );
}
