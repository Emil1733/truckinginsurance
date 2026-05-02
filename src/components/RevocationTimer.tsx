"use client";

import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function RevocationTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setIsExpired(true);
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  if (isExpired) {
    return (
      <div className="bg-red-900/20 border-2 border-red-500 rounded-xl p-8 text-center animate-pulse">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-3xl font-black text-red-500 uppercase tracking-wider">Authority Revoked</h2>
        <p className="text-red-200 mt-2 font-medium">The deadline has passed. Immediate reinstatement required.</p>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 md:p-10 shadow-2xl text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-red-600 animate-pulse"></div>
      
      <div className="flex items-center justify-center gap-3 mb-6">
        <AlertTriangle className="w-8 h-8 text-red-600" />
        <h3 className="text-xl md:text-2xl font-bold text-red-900 uppercase tracking-wide">
          Federal Shutdown Countdown
        </h3>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-7xl font-black text-red-600 tabular-nums">{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="text-sm md:text-base font-bold text-red-800/70 uppercase mt-2">Days</span>
        </div>
        <div className="text-4xl md:text-6xl font-black text-red-300 mt-2 hidden md:block">:</div>
        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-7xl font-black text-red-600 tabular-nums">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-sm md:text-base font-bold text-red-800/70 uppercase mt-2">Hours</span>
        </div>
        <div className="text-4xl md:text-6xl font-black text-red-300 mt-2 hidden md:block">:</div>
        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-7xl font-black text-red-600 tabular-nums">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-sm md:text-base font-bold text-red-800/70 uppercase mt-2">Minutes</span>
        </div>
        <div className="text-4xl md:text-6xl font-black text-red-300 mt-2 hidden md:block">:</div>
        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-7xl font-black text-red-600 tabular-nums animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="text-sm md:text-base font-bold text-red-800/70 uppercase mt-2">Seconds</span>
        </div>
      </div>
    </div>
  );
}
