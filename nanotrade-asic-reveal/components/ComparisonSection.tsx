
import React from 'react';
import { motion } from 'framer-motion';
import { COMPARISON_DATA } from '../constants';
import { InteractiveText } from './Hero';

const ComparisonSection: React.FC = () => {
  const maxLatency = Math.max(...COMPARISON_DATA.map(d => d.latency));

  return (
    <div className="py-40 px-6 bg-[#050505] border-y border-white/5 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-32 pointer-events-auto">
          <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.85] flex flex-wrap justify-center">
            <InteractiveText text="Hardware Is" className="mr-4" />
            <InteractiveText text="Inevitability." className="text-purple-500" hoverColor="#FFFFFF" />
          </h2>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium tracking-tight">
            Stop competing for cache. Start competing at the speed of silicon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {COMPARISON_DATA.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-[40px] border relative overflow-hidden flex flex-col ${
                item.name.includes('ASIC') 
                ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_60px_rgba(168,85,247,0.25)]' 
                : 'bg-[#111] border-white/5 text-slate-300'
              }`}
            >
              {item.name.includes('ASIC') && (
                <div className="absolute top-8 right-10 text-[10px] font-black uppercase tracking-[0.3em] bg-white text-purple-600 px-4 py-1.5 rounded-full shadow-lg">
                  Winner
                </div>
              )}
              
              <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-12 opacity-50">Solution Tier {i+1}</div>
              <h3 className="text-3xl font-black mb-12 leading-none">{item.name}</h3>

              <div className="space-y-10 mt-auto">
                <div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-4 opacity-70">
                    <span>Latency Response</span>
                    <span className="mono">{item.latency}µs</span>
                  </div>
                  <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(item.latency / maxLatency) * 100}%` }}
                      className={`h-full ${item.name.includes('ASIC') ? 'bg-white shadow-[0_0_15px_white]' : 'bg-purple-500'}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-[10px] font-black uppercase opacity-40 mb-2">Power Draw</div>
                    <div className="text-xl font-black mono">{item.power >= 1 ? `${item.power}W` : `${item.power * 1000}mW`}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase opacity-40 mb-2">OpEx/Unit</div>
                    <div className="text-xl font-black">{item.cost}</div>
                  </div>
                </div>

                <div className={`pt-10 border-t ${item.name.includes('ASIC') ? 'border-white/20' : 'border-white/5'}`}>
                  <div className="text-[10px] font-black uppercase opacity-50 mb-4 tracking-widest">Architectural Flaw</div>
                  <div className="text-lg font-bold tracking-tight italic">"{item.visual}"</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComparisonSection;
