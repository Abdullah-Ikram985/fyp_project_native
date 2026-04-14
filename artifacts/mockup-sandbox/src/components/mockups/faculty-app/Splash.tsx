import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export function Splash() {
  return (
    <div className="max-w-[390px] mx-auto min-h-[844px] h-screen bg-gradient-to-b from-indigo-950 via-[#2e1065] to-violet-950 text-white relative overflow-hidden flex flex-col items-center justify-between py-12 px-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
      
      {/* Subtle Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-violet-600/30 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="flex-1 flex flex-col items-center justify-center w-full z-10 space-y-8">
        <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl relative animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 to-indigo-500 rounded-2xl opacity-20 blur-md"></div>
          <Sparkles className="w-10 h-10 text-violet-300" />
        </div>
        
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-violet-200">
            EduMatch AI
          </h1>
          <p className="text-lg text-violet-200/80 font-medium max-w-[260px] mx-auto leading-snug">
            Find Your Academic Future with AI
          </p>
        </div>
      </div>

      <div className="w-full space-y-4 z-10 pb-8">
        <button className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-lg shadow-[0_0_20px_rgba(124,58,237,0.4)] flex items-center justify-center gap-2 transition-transform active:scale-95">
          Get Started
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="text-center">
          <span className="text-violet-300/60 text-sm">Already have an account? </span>
          <button className="text-white text-sm font-semibold hover:underline">Sign In</button>
        </div>
      </div>
    </div>
  );
}
