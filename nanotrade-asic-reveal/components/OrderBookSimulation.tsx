
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ShieldAlert, Zap, Radio } from 'lucide-react';

const OrderBookSimulation: React.FC = () => {
  const [anomaly, setAnomaly] = useState(false);
  const [tickerPrice, setTickerPrice] = useState(150.25);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (!anomaly) {
        setTickerPrice(p => p + (Math.random() - 0.5) * 0.1);
      } else {
        setTickerPrice(p => p - 1.25);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [anomaly]);

  return (
    <div className="py-40 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
      <div className="lg:w-1/2 space-y-12">
        <div className="space-y-6">
          <div className="text-purple-500 font-bold tracking-[0.3em] uppercase text-[10px] flex items-center gap-3">
            <Radio className="w-4 h-4 animate-pulse" />
            Active Real-Time Simulation
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tight">
            Matching <br />at <span className="text-purple-500 neon-purple">Zero.</span>
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed max-w-md">
            Our hardware logic handles order matching in <span className="text-white">deterministic cycles</span>. No OS, no interrupts, no compromise.
          </p>
        </div>

        <button 
          onClick={() => setAnomaly(!anomaly)}
          className={`w-full py-6 px-10 rounded-full font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-4 ${
            anomaly 
            ? 'bg-amber-600 text-white shadow-[0_0_30px_rgba(245,158,11,0.4)] animate-pulse' 
            : 'bg-white text-black hover:bg-purple-500 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]'
          }`}
        >
          {anomaly ? <ShieldAlert /> : <Zap />}
          {anomaly ? 'NEUTRALIZING ATTACK...' : 'TRIGGER FLASH ATTACK'}
        </button>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-8 bg-[#111] border border-white/5 rounded-3xl">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Price Index</div>
            <div className={`text-4xl font-black mono ${anomaly ? 'text-amber-500 neon-orange' : 'text-white'}`}>
              ${tickerPrice.toFixed(2)}
            </div>
          </div>
          <div className="p-8 bg-[#111] border border-white/5 rounded-3xl">
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Core Status</div>
            <div className={`text-2xl font-black flex items-center gap-3 ${anomaly ? 'text-amber-500' : 'text-purple-500'}`}>
              <div className={`w-3 h-3 rounded-full ${anomaly ? 'bg-amber-500 animate-ping' : 'bg-purple-500 shadow-[0_0_10px_#A855F7]'}`} />
              {anomaly ? 'HALTED' : 'NOMINAL'}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 w-full h-[650px] relative perspective-1000">
        <div 
          className="w-full h-full glass rounded-[60px] shadow-[0_0_100px_rgba(0,0,0,1)] p-12 overflow-hidden transform-3d transition-transform duration-1000 border-white/10"
          style={{ transform: `rotateY(${anomaly ? '20deg' : '-10deg'}) rotateX(15deg)` }}
        >
          {/* Depth Lines */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          <div className="flex flex-col h-full gap-4 relative z-10">
            {/* Sells (Neon Orange) */}
            <div className="flex-1 flex flex-col-reverse gap-2 mb-8">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`sell-${i}`}
                  animate={{ width: `${50 + (anomaly ? Math.random() * 40 : Math.random() * 10)}%` }}
                  className="h-8 bg-amber-500/10 border-l-4 border-amber-500 self-end rounded-r-lg"
                />
              ))}
            </div>

            <div className="h-px bg-white/20 w-full flex items-center justify-center">
              <div className="px-6 py-1.5 bg-white text-black text-[10px] font-black rounded-full tracking-widest uppercase shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                LOB SPREAD_ACTIVE
              </div>
            </div>

            {/* Buys (Neon Purple) */}
            <div className="flex-1 flex flex-col gap-2 mt-8">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`buy-${i}`}
                  animate={{ width: `${40 + (anomaly ? 5 : Math.random() * 30)}%` }}
                  className="h-8 bg-purple-500/10 border-r-4 border-purple-500 self-start rounded-l-lg"
                />
              ))}
            </div>
          </div>

          <AnimatePresence>
            {anomaly && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-amber-900/40 backdrop-blur-md flex items-center justify-center p-12"
              >
                <div className="bg-[#111] p-12 rounded-[48px] border-2 border-amber-500 text-center shadow-[0_0_50px_rgba(245,158,11,0.5)]">
                  <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <AlertCircle className="w-12 h-12 text-amber-500" />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-4">INTRUSION LOCKED</h3>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">Circuit breaker tripped at <span className="text-amber-500 font-bold">cycle 1,482</span>. Trading halted to prevent liquidity drain.</p>
                  <div className="mono text-[10px] text-amber-500 font-bold bg-amber-500/10 py-2 px-6 rounded-full inline-block border border-amber-500/20">
                    DETECTION_LATENCY: 140ns
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OrderBookSimulation;