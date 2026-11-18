import React from 'react';

export default function LoanProcessSteps({ onApplyClick }) {
  const steps = [
    {
      number: '01',
      title: 'Online Application Process',
      line1: 'Online Application',
      line2: 'Process',
      numberColor: 'text-[#0A5C80]',
      numberShadow: 'drop-shadow-[0_4px_6px_rgba(10,92,128,0.25)]',
      borderColor: 'border-[#0A5C80]', // VGS Deep Teal Blue
      shadow3D: 'shadow-[0_7px_0_0_#05364C,0_16px_28px_rgba(10,92,128,0.28)]',
      hoverShadow3D: 'hover:shadow-[0_10px_0_0_#05364C,0_22px_36px_rgba(10,92,128,0.38)]',
      glowColor: 'bg-[#0A5C80]/10',
      icon: (
        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-slate-800" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Globe Mesh */}
          <circle cx="27" cy="27" r="15" stroke="#0A5C80" strokeWidth="1.6" opacity="0.6" />
          <ellipse cx="27" cy="27" rx="6.5" ry="15" stroke="#0A5C80" strokeWidth="1.6" opacity="0.6" />
          <line x1="12" y1="27" x2="42" y2="27" stroke="#0A5C80" strokeWidth="1.6" opacity="0.6" />
          
          {/* Online Application Form Sheet */}
          <rect x="26" y="18" width="25" height="33" rx="3.5" fill="white" stroke="#041E2B" strokeWidth="2.2" />
          {/* Form Header Bar */}
          <line x1="31" y1="24" x2="46" y2="24" stroke="#0A5C80" strokeWidth="2.5" />
          {/* Input fields */}
          <line x1="31" y1="30" x2="46" y2="30" stroke="#334155" strokeWidth="2" />
          <line x1="31" y1="36" x2="46" y2="36" stroke="#334155" strokeWidth="2" />
          <line x1="31" y1="42" x2="40" y2="42" stroke="#334155" strokeWidth="2" />
          {/* Checkmark pin */}
          <circle cx="44" cy="42" r="2.8" fill="#6EA928" stroke="none" />
        </svg>
      )
    },
    {
      number: '02',
      title: 'Document submission',
      line1: 'Document submission',
      line2: '',
      numberColor: 'text-[#6EA928]',
      numberShadow: 'drop-shadow-[0_4px_6px_rgba(110,169,40,0.25)]',
      borderColor: 'border-[#6EA928]', // VGS Leaf Green
      shadow3D: 'shadow-[0_7px_0_0_#466E18,0_16px_28px_rgba(110,169,40,0.3)]',
      hoverShadow3D: 'hover:shadow-[0_10px_0_0_#466E18,0_22px_36px_rgba(110,169,40,0.4)]',
      glowColor: 'bg-[#E8F5D4]/80',
      icon: (
        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-slate-800" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Document Sheet */}
          <path d="M19 13h17l12 12v24a3.5 3.5 0 0 1-3.5 3.5H19a3.5 3.5 0 0 1-3.5-3.5V16.5A3.5 3.5 0 0 1 19 13z" fill="white" stroke="#041E2B" strokeWidth="2.2" />
          <path d="M36 13v12h12" stroke="#041E2B" strokeWidth="2" />
          <line x1="22" y1="23" x2="30" y2="23" stroke="#94A3B8" strokeWidth="2" />
          <line x1="22" y1="29" x2="29" y2="29" stroke="#94A3B8" strokeWidth="2" />
          
          {/* Verification Magnifying Glass */}
          <circle cx="34" cy="38" r="9.5" fill="white" stroke="#041E2B" strokeWidth="2.4" />
          {/* Checkmark scan inside */}
          <path d="M30 38l3 3 6-6" stroke="#6EA928" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Glass Handle */}
          <line x1="41" y1="45" x2="50" y2="54" stroke="#041E2B" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )
    },
    {
      number: '03',
      title: 'Instant Approval & Disbursals',
      line1: 'Instant Approval',
      line2: '& Disbursals',
      numberColor: 'text-[#0A5C80]',
      numberShadow: 'drop-shadow-[0_4px_6px_rgba(10,92,128,0.25)]',
      borderColor: 'border-[#0A5C80]', // VGS Deep Teal Blue
      shadow3D: 'shadow-[0_7px_0_0_#05364C,0_16px_28px_rgba(10,92,128,0.28)]',
      hoverShadow3D: 'hover:shadow-[0_10px_0_0_#05364C,0_22px_36px_rgba(10,92,128,0.38)]',
      glowColor: 'bg-[#0A5C80]/10',
      icon: (
        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-slate-800" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {/* Sanction Agreement Card */}
          <rect x="14" y="16" width="36" height="36" rx="4" fill="white" stroke="#041E2B" strokeWidth="2.2" />
          <line x1="20" y1="23" x2="33" y2="23" stroke="#6EA928" strokeWidth="2.4" />
          <line x1="20" y1="29" x2="30" y2="29" stroke="#94A3B8" strokeWidth="2" />
          
          {/* Thumbs Up Hand / Approval */}
          <path
            d="M31 37h8.5a2.4 2.4 0 0 0 2.4-2.4v-1.6a2.4 2.4 0 0 0-2.4-2.4H34l1.1-5a2.4 2.4 0 0 0-2.4-2.8l-3.8 6.8v8.2a2 2 0 0 0 1.8 1.8z"
            fill="white"
            stroke="#041E2B"
            strokeWidth="2.2"
          />
          {/* Wrist cuff in VGS Green */}
          <rect x="25" y="32" width="4" height="11" rx="1" fill="#6EA928" stroke="#041E2B" strokeWidth="1.8" />
        </svg>
      )
    }
  ];

  return (
    <section id="loan-process-flow" className="py-12 sm:py-16 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Left-Aligned Header Section in VGS Logo Colors */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 sm:mb-16 text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8F5D4] border border-[#6EA928]/30 text-[#0A5C80] text-xs font-black uppercase tracking-wider">
              <span>⚡ Fast-Track Disbursal Flow</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#041E2B] tracking-tight">
              How we make loans happen in{' '}
              <span className="text-[#6EA928]">30 Mins – 6 hours*?</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl font-normal leading-relaxed">
              We make loans possible in just 3 simple steps to provide a fast, flexible and friendly customer experience
            </p>
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-[#0A5C80] bg-[#E8F5D4]/40 px-3.5 py-2 rounded-xl border border-[#6EA928]/30 shrink-0 self-start md:self-end">
            <span className="w-2 h-2 rounded-full bg-[#6EA928] animate-pulse"></span>
            <span>100% Digital & Paperless Approval</span>
          </div>
        </div>

        {/* Compact 3-Step V-Shape Process Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* SVG Connecting V-Path (Soft Light Greenish Tone Matching Logo) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none -z-0">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 800 240" 
              fill="none" 
              preserveAspectRatio="none"
            >
              {/* Soft 3D-Look Road/Pathway */}
              <path
                d="M 140 70 L 400 150 L 660 70"
                stroke="#F4F8F1"
                strokeWidth="48"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Inner subtle guide track */}
              <path
                d="M 140 70 L 400 150 L 660 70"
                stroke="#6EA928"
                strokeWidth="1.8"
                strokeDasharray="6 6"
                strokeOpacity="0.35"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Stepper Grid (Compact Size with Real 3D Extruded Tiles) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-start relative z-10">
            
            {/* Step 01 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-5 pt-3">
                {/* Slanted Bold 3D Number 01 in Teal Blue */}
                <span className={`absolute -top-3 -left-5 sm:-top-4 sm:-left-6 text-3xl sm:text-4xl font-black italic ${steps[0].numberColor} tracking-tighter select-none ${steps[0].numberShadow} transition-transform duration-300 group-hover:-translate-y-1 z-20`}>
                  01
                </span>
                
                {/* 3D Isometric Diamond Tile in Logo Teal */}
                <div 
                  onClick={onApplyClick}
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-white border-2 ${steps[0].borderColor} ${steps[0].shadow3D} ${steps[0].hoverShadow3D} flex items-center justify-center transition-all duration-300 cursor-pointer relative overflow-hidden group-hover:-translate-y-1.5`}
                  style={{
                    transform: 'scaleY(0.76) rotate(45deg)',
                    transformOrigin: 'center center'
                  }}
                >
                  {/* Subtle Inner Floor Gradient */}
                  <div className={`absolute inset-0 ${steps[0].glowColor} opacity-80`}></div>
                  
                  {/* Icon Wrapper: Counter-rotated & scaled to remain upright and crisp */}
                  <div 
                    className="relative z-10 flex items-center justify-center filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)]"
                    style={{
                      transform: 'rotate(-45deg) scaleY(1.31)',
                      transformOrigin: 'center center'
                    }}
                  >
                    {steps[0].icon}
                  </div>
                </div>
              </div>
              
              {/* Step Title Label */}
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight tracking-tight mt-1">
                {steps[0].line1}<br />{steps[0].line2}
              </h3>
            </div>

            {/* Step 02 (Dipped Downwards for the "V" shape layout) */}
            <div className="flex flex-col items-center text-center group md:translate-y-16">
              <div className="relative mb-5 pt-3">
                {/* Slanted Bold 3D Number 02 in Logo Green */}
                <span className={`absolute -top-3 -left-5 sm:-top-4 sm:-left-6 text-3xl sm:text-4xl font-black italic ${steps[1].numberColor} tracking-tighter select-none ${steps[1].numberShadow} transition-transform duration-300 group-hover:-translate-y-1 z-20`}>
                  02
                </span>
                
                {/* 3D Isometric Diamond Tile in Logo Green */}
                <div 
                  onClick={onApplyClick}
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-white border-2 ${steps[1].borderColor} ${steps[1].shadow3D} ${steps[1].hoverShadow3D} flex items-center justify-center transition-all duration-300 cursor-pointer relative overflow-hidden group-hover:-translate-y-1.5`}
                  style={{
                    transform: 'scaleY(0.76) rotate(45deg)',
                    transformOrigin: 'center center'
                  }}
                >
                  {/* Subtle Inner Floor Gradient */}
                  <div className={`absolute inset-0 ${steps[1].glowColor} opacity-90`}></div>
                  
                  {/* Icon Wrapper */}
                  <div 
                    className="relative z-10 flex items-center justify-center filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)]"
                    style={{
                      transform: 'rotate(-45deg) scaleY(1.31)',
                      transformOrigin: 'center center'
                    }}
                  >
                    {steps[1].icon}
                  </div>
                </div>
              </div>
              
              {/* Step Title Label */}
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight tracking-tight mt-1">
                {steps[1].line1}
              </h3>
            </div>

            {/* Step 03 */}
            <div className="flex flex-col items-center text-center group">
              <div className="relative mb-5 pt-3">
                {/* Slanted Bold 3D Number 03 in Teal Blue */}
                <span className={`absolute -top-3 -left-5 sm:-top-4 sm:-left-6 text-3xl sm:text-4xl font-black italic ${steps[2].numberColor} tracking-tighter select-none ${steps[2].numberShadow} transition-transform duration-300 group-hover:-translate-y-1 z-20`}>
                  03
                </span>
                
                {/* 3D Isometric Diamond Tile in Logo Teal */}
                <div 
                  onClick={onApplyClick}
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-white border-2 ${steps[2].borderColor} ${steps[2].shadow3D} ${steps[2].hoverShadow3D} flex items-center justify-center transition-all duration-300 cursor-pointer relative overflow-hidden group-hover:-translate-y-1.5`}
                  style={{
                    transform: 'scaleY(0.76) rotate(45deg)',
                    transformOrigin: 'center center'
                  }}
                >
                  {/* Subtle Inner Floor Gradient */}
                  <div className={`absolute inset-0 ${steps[2].glowColor} opacity-80`}></div>
                  
                  {/* Icon Wrapper */}
                  <div 
                    className="relative z-10 flex items-center justify-center filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)]"
                    style={{
                      transform: 'rotate(-45deg) scaleY(1.31)',
                      transformOrigin: 'center center'
                    }}
                  >
                    {steps[2].icon}
                  </div>
                </div>
              </div>
              
              {/* Step Title Label */}
              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight tracking-tight mt-1">
                {steps[2].line1}<br />{steps[2].line2}
              </h3>
            </div>

          </div>

          {/* Compact bottom spacing spacer for desktop translate-y */}
          <div className="hidden md:block h-16"></div>

        </div>

      </div>
    </section>
  );
}
