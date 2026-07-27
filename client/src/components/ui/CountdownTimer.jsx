import React, { useState, useEffect } from 'react';

export const CountdownTimer = ({ targetDate, onExpire, label = 'PREORDER DROP WINDOW CLOSES IN' }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (remaining.expired && onExpire) {
        onExpire();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.expired) {
    return (
      <div className="text-center py-2 font-mono text-xs uppercase tracking-[0.2em] text-amber-400" aria-live="polite">
        PREORDER WINDOW CLOSED // DROP IN REVIEW
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3" aria-live="polite" aria-atomic="true">
      <span className="text-[10px] uppercase tracking-[0.3em] text-[#8E9192] font-sans font-semibold">
        {label}
      </span>
      <div className="flex items-center gap-4 font-mono text-2xl sm:text-4xl font-bold tracking-widest text-white">
        <div className="flex flex-col items-center bg-[#1A1A1A] border border-[#27272A] px-4 py-3 min-w-[70px]">
          <span>{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="text-[9px] text-[#8E9192] font-sans font-medium tracking-[0.2em] mt-1">DAYS</span>
        </div>
        <span className="text-[#444748]">:</span>
        <div className="flex flex-col items-center bg-[#1A1A1A] border border-[#27272A] px-4 py-3 min-w-[70px]">
          <span>{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-[9px] text-[#8E9192] font-sans font-medium tracking-[0.2em] mt-1">HRS</span>
        </div>
        <span className="text-[#444748]">:</span>
        <div className="flex flex-col items-center bg-[#1A1A1A] border border-[#27272A] px-4 py-3 min-w-[70px]">
          <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-[9px] text-[#8E9192] font-sans font-medium tracking-[0.2em] mt-1">MIN</span>
        </div>
        <span className="text-[#444748]">:</span>
        <div className="flex flex-col items-center bg-[#1A1A1A] border border-[#27272A] px-4 py-3 min-w-[70px]">
          <span className="text-white">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="text-[9px] text-[#8E9192] font-sans font-medium tracking-[0.2em] mt-1">SEC</span>
        </div>
      </div>
    </div>
  );
};
