
import React from 'react';
import { motion } from 'framer-motion';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { InteractiveText } from './Hero';

const data = [
  { time: '0ms', load: 12 },
  { time: '1ms', load: 15 },
  { time: '2ms', load: 8 },
  { time: '3ms', load: 45 },
  { time: '4ms', load: 120 },
  { time: '5ms', load: 85 },
  { time: '6ms', load: 150 },
  { time: '7ms', load: 160 },
];

const DashboardSection: React.FC = () => {
  return (
    <div className="py-40 px-6 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 pointer-events-auto">
          <InteractiveText text="Live Telemetry" className="text-4xl md:text-7xl font-black text-white tracking-tight" />
          <p className="text-slate-500 mt-6 font-medium uppercase tracking-[0.3em] text-[10px]">NanoTrade DevKit_v1.2 Stream</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-[#111] p-12 rounded-[48px] border border-white/5 relative overflow-hidden">
            {/* Background Lines */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#FFF 1px, transparent 1px)', backgroundSize: '100% 40px' }} />
            
            <div className="flex justify-between items-center mb-12 relative z-10">
              <h3 className="font-black text-white uppercase tracking-widest text-xs">Matching Throughput (msg/cycle)</h3>
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_#A855F7] animate-pulse" />
                <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">In-Sync</span>
              </div>
            </div>
            <div className="h-[350px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
                  <XAxis dataKey="time" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '16px', color: '#FFF' }}
                    itemStyle={{ color: '#A855F7' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="load" 
                    stroke="#A855F7" 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorLoad)" 
                    dot={{ fill: '#A855F7', strokeWidth: 2, r: 4, stroke: '#111' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-10">
            <div className="bg-[#111] p-10 rounded-[40px] border border-white/5 flex flex-col justify-between h-full group hover:border-purple-500/30 transition-all">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8">Pipeline Integrity</div>
                <div className="text-6xl font-black mb-4 mono text-white">99<span className="text-purple-500">.99</span></div>
                <div className="text-purple-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <span>No Jitter Detected</span>
                </div>
              </div>
              <div className="mt-12 space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Active Gates</span>
                  <span className="font-black mono text-sm text-white">78,412</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Heat Profile</span>
                  <span className="font-black mono text-sm text-purple-400">OPTIMAL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Memory Bus</span>
                  <span className="font-black mono text-sm text-purple-500">O(1) CAM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { label: 'Jitter Response', val: '<1ns', color: 'text-purple-500' },
            { label: 'Queue Pressure', val: '0.00%', color: 'text-amber-500' },
            { label: 'Clock Freq', val: '400MHz', color: 'text-white' },
            { label: 'ML Inference', val: '50ns', color: 'text-amber-500' }
          ].map((stat, i) => (
            <div key={stat.label} className="bg-[#111] p-10 rounded-[32px] border border-white/5">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-3">{stat.label}</div>
              <div className={`text-2xl font-black ${stat.color} mono`}>{stat.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
