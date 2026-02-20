
import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveText } from './Hero';

const ProblemSection: React.FC = () => {
  return (
    <div className="py-40 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
      <div className="lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3 text-amber-500 font-bold tracking-[0.2em] uppercase text-xs">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_#F59E0B]" />
            Structural Vulnerability
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[0.95] flex flex-wrap">
            <InteractiveText text="Legacy Engines Are" className="justify-start mr-4" hoverColor="#F59E0B" />
            <InteractiveText text="Failing." className="text-amber-500 neon-orange justify-start" hoverColor="#FFFFFF" />
          </h2>
          <div className="space-y-6 text-slate-400 text-lg leading-relaxed pointer-events-auto">
            <p>
              Software exchanges are prone to <span className="text-white italic">Non-Deterministic Latency</span>. Cache misses and context switching create the "detection gap" that flash-crashes exploit.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
              <div className="p-6 bg-[#111] rounded-2xl border border-white/5 group hover:border-amber-500/30 transition-colors">
                <div className="text-white font-bold mb-2 uppercase text-xs tracking-widest">The CPU Bottleneck</div>
                <p className="text-sm opacity-60">Interrupt handling adds ~40µs of jitter per trade. Markets move faster than the kernel.</p>
              </div>
              <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10 group hover:border-amber-500/50 transition-colors">
                <div className="text-amber-500 font-bold mb-2 uppercase text-xs tracking-widest">Surveillance Lag</div>
                <p className="text-sm text-amber-100/40">Soft-surveillance reactions take milliseconds. By then, liquidity has already evaporated.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="lg:w-1/2 w-full h-[500px] bg-[#0A0A0A] rounded-[40px] border border-white/5 relative overflow-hidden flex items-end justify-center p-12 shadow-2xl">
        {/* Animated Candlestick Chart */}
        <div className="flex items-end gap-2 w-full h-full relative z-10">
          {[...Array(24)].map((_, i) => {
            const isCrash = i > 16;
            const height = isCrash ? (90 - (i - 16) * 12) : (30 + Math.random() * 40);
            return (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${height}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.5 }}
                className={`flex-1 flex flex-col items-center justify-end relative rounded-full ${isCrash ? 'bg-amber-500 shadow-[0_0_15px_#F59E0B]' : 'bg-slate-800'}`}
              >
                {isCrash && i === 17 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -top-16 bg-amber-600 text-white text-[8px] px-3 py-1.5 rounded-full font-black tracking-widest uppercase border border-white/20"
                  >
                    THREAT
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
        
        {/* Radar Pulse Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1a_1px,_transparent_1px)] background-size-[30px_30px] opacity-10" />
      </div>
    </div>
  );
};

export default ProblemSection;
