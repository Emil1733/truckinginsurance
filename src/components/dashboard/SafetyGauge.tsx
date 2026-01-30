"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Smartphone } from "lucide-react";

interface SafetyGaugeProps {
  score: number; // 0-100
  label: string;
  isAlert?: boolean;
}

export function SafetyGauge({ score, label, isAlert }: SafetyGaugeProps) {
  /* Safe handling for NaN or bad data */
  const safeScore = (typeof score === 'number' && !isNaN(score)) ? score : 0;

  // 0 = -90deg (Left), 100 = 90deg (Right)
  // Max rotation range is 180 degrees
  const rotation = -90 + (Math.min(safeScore, 100) / 100) * 180;

  const getColor = (s: number) => {
    if (s < 50) return "#22c55e"; // Green
    if (s < 75) return "#eab308"; // Yellow
    return "#ef4444"; // Red
  };

  const color = getColor(safeScore);

  return (
  return (
    <div className="relative flex flex-col items-center justify-center p-2 sm:p-4">
      {/* GAUGE BACKGROUND - Scaled down on mobile */}
      <div className="relative w-[200px] h-[100px] sm:w-64 sm:h-32 overflow-hidden mb-2 sm:mb-4">
        <div className="w-[200px] h-[200px] sm:w-64 sm:h-64 rounded-full border-[16px] sm:border-[20px] border-industrial-800 border-b-0 box-border absolute top-0 left-0"></div>
        
        {/* NEEDLE */}
        <motion.div 
          className="w-[200px] h-[200px] sm:w-64 sm:h-64 rounded-full absolute top-0 left-0 flex justify-center items-start"
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 50, damping: 10 }}
        >
           <div className="w-1.5 sm:w-2 h-[50%] bg-white origin-bottom mt-2 rounded-full shadow-[0_0_10px_white]"></div>
        </motion.div>
        
        {/* CENTER HUB */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
      </div>

      <div className="text-center">
        <div className="text-4xl sm:text-5xl font-mono font-bold text-white mb-1" style={{ textShadow: `0 0 20px ${color}40` }}>
            {Math.round(safeScore)}%
        </div>
        <div className={`text-xs sm:text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 ${isAlert ? 'text-red-500 animate-pulse' : 'text-industrial-400'}`}>
            {isAlert && <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4" />}
            {label}
        </div>
      </div>
    </div>
  );
}
