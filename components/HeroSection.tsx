"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Spline Background */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://my.spline.design/retrofuturisticcircuitloop-hevOt46BsTdpsAKiQYQRXTGD/"
          frameBorder="0"
          width="100%"
          height="100%"
          className="absolute inset-0 w-full h-full scale-110"
          title="Spline circuit background"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Main title */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter drop-shadow-2xl">
          NANOTRADE
        </h1>
        <p className="text-4xl md:text-5xl lg:text-6xl font-black text-[#a855f7] tracking-tighter mt-2 drop-shadow-lg">
          ASIC
        </p>

        {/* Tagline */}
        <p className="text-white/90 text-base md:text-lg max-w-2xl mt-6 font-medium">
          The first AI-Powered Stock Exchange Matching Engine built on Sky130 Open-Silicon.
        </p>

        {/* Key metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-12 max-w-4xl">
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white">10M+</div>
            <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Orders / Second</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white">&lt;100ns</div>
            <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Matching Latency</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white">&lt;250ns</div>
            <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Anomaly Detection</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white">8mW</div>
            <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Active Power</div>
          </div>
        </div>

        {/* CTA */}
        <Link
          href="#architecture"
          className="mt-12 inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#a855f7] hover:from-[#6d28d9] hover:to-[#9333ea] transition-all shadow-[0_0_30px_rgba(168,85,247,0.4)]"
        >
          Explore Architecture
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      {/* Process node badge - bottom left */}
      <div className="absolute bottom-8 left-6 md:left-12 z-10 flex items-center gap-3">
        <span className="text-5xl md:text-6xl font-black text-amber-500/90">130</span>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
          <div className="text-[10px] text-white/50 uppercase tracking-widest">Process Node</div>
          <div className="text-sm font-semibold text-white">Skywater Technology</div>
        </div>
      </div>
    </section>
  );
}
