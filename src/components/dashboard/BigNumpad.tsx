"use client";

import { Delete } from "lucide-react";

interface BigNumpadProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  maxLength?: number;
}

export function BigNumpad({ value, onChange, onSubmit, maxLength = 8 }: BigNumpadProps) {
  
  const handlePress = (num: string) => {
    if (value.length < maxLength) {
      onChange(value + num);
    }
  };

  const handleDelete = () => {
    onChange(value.slice(0, -1));
  };

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-sm mx-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => handlePress(num.toString())}
          className="bg-industrial-800 text-white text-3xl font-bold py-6 rounded-lg active:bg-industrial-700 active:scale-95 transition-all shadow-lg border border-industrial-700"
        >
          {num}
        </button>
      ))}
      
      <button
        onClick={handleDelete}
        className="bg-red-900/30 text-red-500 flex items-center justify-center rounded-lg active:bg-red-900/50 active:scale-95 transition-all border border-red-900/50"
      >
        <Delete className="w-8 h-8" />
      </button>

      <button
        onClick={() => handlePress("0")}
        className="bg-industrial-800 text-white text-3xl font-bold py-6 rounded-lg active:bg-industrial-700 active:scale-95 transition-all shadow-lg border border-industrial-700"
      >
        0
      </button>

      <button
        onClick={onSubmit}
        disabled={value.length < 5}
        className="bg-safety-orange text-black font-bold text-xl uppercase rounded-lg active:bg-orange-500 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,95,0,0.3)] disabled:opacity-50"
      >
        GO
      </button>
    </div>
  );
}
