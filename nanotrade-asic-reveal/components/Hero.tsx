
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { METRICS } from '../constants';
import { ViewType } from '../App';

export const InteractiveLetter = ({ char, className, delay, hoverColor = "#A855F7" }: { char: string; className?: string; delay: number; hoverColor?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: "spring",
        stiffness: 200
      }}
      whileHover={{ 
        scale: 1.2, 
        y: -10,
        color: hoverColor,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-block cursor-pointer select-none transition-colors duration-200 ${className} ${isHovered ? 'neon-purple' : ''}`}
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

export const InteractiveText = ({ text, className, delay = 0, hoverColor }: { text: string, className?: string, delay?: number, hoverColor?: string }) => {
  return (
    <div className={`flex flex-wrap justify-center ${className}`}>
      {text.split("").map((char, i) => (
        <InteractiveLetter key={i} char={char} delay={delay + i * 0.02} hoverColor={hoverColor} />
      ))}
    </div>
  );
};

interface HeroProps {
  onNavigate?: (view: ViewType) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505] perspective-1000 pt-60 pb-32"
    >
      {/* CINEMATIC SILICON CORE */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[800px] h-[800px] bg-purple-600/10 blur-[150px] rounded-full"
          />
          <div className="absolute w-[400px] h-[400px] bg-purple-500/5 border border-purple-500/10 rounded-[100px] rotate-45 animate-[pulse_6s_infinite]" />
          <div className="absolute w-[600px] h-[600px] bg-amber-500/5 border border-amber-500/10 rounded-[150px] -rotate-12 animate-[pulse_10s_infinite]" />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-20 z-[1]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)', backgroundSize: '80px 80px' }} />
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(circle_at_center,transparent_20%,#050505_90%)]" />

      <div className="relative z-10 text-center px-6 pointer-events-none w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mb-14 inline-block px-5 py-2.5 rounded-full bg-purple-500/10 text-purple-400 text-[11px] font-black tracking-[0.5em] uppercase border border-purple-500/30 backdrop-blur-xl relative z-20 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
        >
          Institutional Grade Exchange Core
        </motion.div>
        
        <div className="relative mb-14 transform-3d">
          <motion.div 
            style={{ 
              rotateX, 
              rotateY, 
              x: translateX, 
              y: translateY,
              transformStyle: "preserve-3d" 
            }} 
            className="relative pointer-events-auto"
          >
            <h1 className="text-6xl md:text-[9.5rem] font-black text-white tracking-tighter leading-[0.85] relative flex flex-col items-center">
              <InteractiveText text="NANOTRADE" delay={0.2} />
              <InteractiveText text="ASIC" delay={0.6} className="text-purple-500 neon-purple" />
            </h1>
          </motion.div>
        </div>
        
        <div className="mt-2 max-w-3xl mx-auto pointer-events-auto">
          <InteractiveText 
            text="The first AI-Powered Stock Exchange Matching Engine built on Sky130 Open-Silicon." 
            className="text-lg md:text-2xl text-slate-400 font-medium tracking-tight"
            delay={0.8}
            hoverColor="#F59E0B"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-24 max-w-5xl mx-auto">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className="flex flex-col items-center group pointer-events-auto cursor-default"
            >
              <div className="text-3xl md:text-5xl font-black text-white mb-2 mono group-hover:text-purple-500 transition-colors">
                {m.value}
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-300 transition-colors">
                {m.label}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-28 pointer-events-auto"
        >
          <button 
            onClick={() => onNavigate && onNavigate('architecture')}
            className="group relative inline-flex items-center gap-4 bg-purple-600 text-white px-16 py-7 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-purple-500 transition-all shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:scale-105 active:scale-95"
          >
            Explore Architecture
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-16 left-16 z-20 pointer-events-none hidden lg:block">
        <div className="flex items-center gap-5 glass px-8 py-6 rounded-[32px] border border-white/10 shadow-2xl">
          <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20">
            <span className="text-amber-500 font-bold text-sm">130</span>
          </div>
          <div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Process Node</div>
            <div className="text-base font-black text-white uppercase tracking-tight">SkyWater Technology</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
