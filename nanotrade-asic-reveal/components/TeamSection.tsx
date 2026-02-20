
import React from 'react';
import { motion } from 'framer-motion';
import { TEAM } from '../constants';
import { InteractiveText } from './Hero';

const TeamSection: React.FC = () => {
  return (
    <div className="py-40 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32 pointer-events-auto">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 flex flex-wrap justify-center">
            <InteractiveText text="The Core" className="mr-4" />
            <InteractiveText text="Architects." className="text-purple-500" hoverColor="#FFFFFF" />
          </h2>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium tracking-tight leading-relaxed">
            A fusion of High-Frequency Trading experts and Silicon Engineering veterans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-default"
            >
              <div className="relative aspect-[3/4] mb-10 overflow-hidden rounded-[48px] bg-[#111] border border-white/5 shadow-2xl">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                
                {/* Neon Hover Accent */}
                <div className="absolute inset-0 border-2 border-purple-500 opacity-0 group-hover:opacity-40 transition-opacity rounded-[48px] pointer-events-none shadow-[inset_0_0_50px_rgba(168,85,247,0.3)]" />
              </div>
              
              <div className="px-4">
                <h3 className="text-3xl font-black text-white mb-2 leading-none group-hover:text-purple-400 transition-colors">{member.name}</h3>
                <p className="text-purple-500 font-black text-xs tracking-[0.3em] uppercase">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
