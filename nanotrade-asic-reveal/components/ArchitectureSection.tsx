
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ARCHITECTURE_BLOCKS } from '../constants';
import { ArchitectureBlock } from '../types';
import { X, ChevronRight, Cpu } from 'lucide-react';
import { InteractiveText } from './Hero';

const ArchitectureSection: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<ArchitectureBlock | null>(null);

  const getThemeColor = (id: string) => {
    switch(id) {
      case 'matching-engine': return '#A855F7';
      case 'feature-extractor': return '#F59E0B';
      case 'ml-classifier': return '#A855F7';
      case 'circuit-breaker': return '#F59E0B';
      default: return '#A855F7';
    }
  };

  return (
    <div className="bg-[#050505] py-40 px-6 overflow-hidden border-y border-white/5 pointer-events-auto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-purple-500 font-bold tracking-[0.4em] uppercase text-[10px] mb-6"
          >
            Silicon Blueprint
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tight flex flex-wrap justify-center">
            <InteractiveText text="Nano-Second" className="mr-4" />
            <InteractiveText text="Pipelining." className="text-purple-500" hoverColor="#FFFFFF" />
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {ARCHITECTURE_BLOCKS.map((block, i) => (
            <motion.div
              key={block.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedBlock(block)}
              className="group cursor-pointer bg-[#111] p-10 rounded-[32px] border border-white/5 hover:border-purple-500/50 transition-all hover:bg-[#161616] relative overflow-hidden pointer-events-auto"
            >
              <div 
                className="absolute top-0 right-0 w-32 h-32 blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity"
                style={{ backgroundColor: getThemeColor(block.id) }}
              />
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-black text-xl text-white mb-2 group-hover:text-purple-400 transition-colors">{block.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{block.description}</p>
              
              <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                Learn More <ChevronRight className="w-3 h-3" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedBlock && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl pointer-events-auto"
            onClick={() => setSelectedBlock(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#111] rounded-[48px] p-12 border border-white/10 relative overflow-hidden shadow-2xl pointer-events-auto"
            >
              <div 
                className="absolute top-0 left-0 w-full h-2"
                style={{ backgroundColor: getThemeColor(selectedBlock.id) }}
              />
              <button 
                onClick={() => setSelectedBlock(null)}
                className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors p-2"
              >
                <X className="w-8 h-8" />
              </button>

              <h2 className="text-4xl font-black text-white mb-4">{selectedBlock.title}</h2>
              <p className="text-slate-400 text-lg mb-12">{selectedBlock.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedBlock.details.map((detail, idx) => (
                  <div key={idx} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getThemeColor(selectedBlock.id) }} />
                    <span className="text-white font-medium text-sm">{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArchitectureSection;
