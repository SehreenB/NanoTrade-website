
import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveText } from './Hero';

const SiliconSection: React.FC = () => {
  return (
    <div className="relative py-40 px-6 overflow-hidden bg-[#050505]">
      {/* Background Silicon Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#FFF" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-24">
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* 3D Wafer Representation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[#111] shadow-[0_0_100px_rgba(0,0,0,1)] flex items-center justify-center p-8 border border-white/10 relative"
            >
              <div className="w-full h-full rounded-full bg-slate-900/50 flex flex-wrap gap-2 p-4 overflow-hidden opacity-30">
                {[...Array(200)].map((_, i) => (
                  <div key={i} className="w-10 h-10 border border-white/20 rounded-sm" />
                ))}
              </div>
              
              {/* Core Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.1)_0%,_transparent_70%)]" />
            </motion.div>

            {/* Floorplan Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-[350px] h-[350px] glass rounded-3xl p-8 border border-purple-500/40 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
                <div className="grid grid-cols-3 grid-rows-3 gap-3 h-full">
                  <div className="bg-amber-500/10 border border-amber-500/40 rounded-xl flex items-center justify-center text-[10px] font-black text-amber-400">SRAM</div>
                  <div className="col-span-2 bg-purple-500/10 border border-purple-500/40 rounded-xl flex items-center justify-center text-[10px] font-black text-purple-400">LOGIC CORE_V1</div>
                  <div className="row-span-2 bg-orange-500/10 border border-orange-500/40 rounded-xl flex items-center justify-center text-[10px] font-black text-orange-400">AI_IP</div>
                  <div className="bg-amber-500/10 border border-amber-500/40 rounded-xl" />
                  <div className="bg-purple-500/10 border border-purple-500/40 rounded-xl" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <div className="lg:w-1/2 space-y-12 pointer-events-auto">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tight leading-[0.85] flex flex-col items-start">
              <InteractiveText text="Real Open" className="justify-start" />
              <InteractiveText text="Silicon." className="text-purple-400 neon-purple justify-start" hoverColor="#FFFFFF" />
            </h2>
            <p className="text-slate-400 text-xl leading-relaxed">
              Optimized for <span className="text-white font-bold">SkyWater 130nm</span>. Every gate and trace verified for deterministic matching execution.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Foundry', val: 'SkyWater' },
              { label: 'Target', val: 'Sky130' },
              { label: 'Area', val: '2.5mm²' },
              { label: 'Voltage', val: '1.8V' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#111] p-8 rounded-[32px] border border-white/5"
              >
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-2">{stat.label}</div>
                <div className="text-2xl font-black text-white mono">{stat.val}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="p-10 bg-white text-black rounded-[48px] shadow-[0_0_50px_rgba(255,255,255,0.15)] group hover:scale-[1.02] transition-transform">
            <h4 className="text-2xl font-black mb-4 uppercase tracking-tighter">Tape-Out Ready</h4>
            <p className="text-slate-700 text-sm leading-relaxed mb-8">
              Full GDSII generated. DRC/LVS clean with 100% test coverage using the Cognichip flow.
            </p>
            <div className="flex items-center gap-3 text-purple-600 font-black text-xs uppercase tracking-widest">
              <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_#A855F7] animate-pulse" />
              Verified Architecture
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiliconSection;
