import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Google Drive Logo Image */}
      <img
        src="https://drive.google.com/thumbnail?id=1eDrKb47N5-s1CflsRdyXiaBbnWnoVBDY&sz=w500"
        alt="Feline Care Logo"
        className="w-12 h-12 object-contain shrink-0"
        referrerPolicy="no-referrer"
        onError={(e) => {
          // If image fails to load, we can hide it or show a fallback
          // For now, let's just make it subtle or keep the text
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      {showText && (
        <div className="flex flex-col select-none">
          <div className="flex items-center">
            <span className="text-2xl font-display font-bold text-brand-navy tracking-tight leading-none">FELINE</span>
          </div>
          <div className="h-[2px] bg-brand-navy w-full my-1 rounded-full opacity-30" />
          <span className="text-xl font-display font-semibold text-brand-orange tracking-[0.1em] leading-none ml-0.5">CARE</span>
        </div>
      )}
    </div>
  );
}
