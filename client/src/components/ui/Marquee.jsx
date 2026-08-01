import React from 'react';

export const Marquee = ({ words = [], reverse = false }) => {
  // Repeat words to ensure the marquee container is fully filled for a seamless loop
  const repeatedWords = [...words, ...words, ...words, ...words];

  return (
    <div className="w-full overflow-hidden border-y border-rune-border py-8 sm:py-10 bg-rune-surface/20 select-none" role="marquee">
      <div className={reverse ? 'animate-rune-marquee-reverse' : 'animate-rune-marquee'}>
        <div className="flex gap-20 sm:gap-28 px-6 sm:px-8 whitespace-nowrap text-lg sm:text-2xl lg:text-3xl font-sans uppercase font-bold tracking-[0.25em] text-rune-primary">
          {repeatedWords.map((word, idx) => (
            <span key={idx} className="flex items-center gap-10 sm:gap-14">
              <span>{word}</span>
              <span className="text-rune-secondary/35">•</span>
            </span>
          ))}
        </div>
        <div className="flex gap-20 sm:gap-28 px-6 sm:px-8 whitespace-nowrap text-lg sm:text-2xl lg:text-3xl font-sans uppercase font-bold tracking-[0.25em] text-rune-primary" aria-hidden="true">
          {repeatedWords.map((word, idx) => (
            <span key={`dup-${idx}`} className="flex items-center gap-10 sm:gap-14">
              <span>{word}</span>
              <span className="text-rune-secondary/35">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Marquee;
