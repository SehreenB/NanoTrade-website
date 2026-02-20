
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, LayoutDashboard, Cpu, Activity, Zap, Info } from 'lucide-react';

// Components
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import ArchitectureSection from './components/ArchitectureSection';
import OrderBookSimulation from './components/OrderBookSimulation';
import ComparisonSection from './components/ComparisonSection';
import SiliconSection from './components/SiliconSection';
import DashboardSection from './components/DashboardSection';
import TeamSection from './components/TeamSection';

export type ViewType = 'home' | 'vision' | 'architecture' | 'simulation' | 'sky130';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Simple Router Sync
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validViews: ViewType[] = ['vision', 'architecture', 'simulation', 'sky130'];
      if (validViews.includes(hash as ViewType)) {
        setCurrentView(hash as ViewType);
      } else {
        setCurrentView('home');
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (view: ViewType) => {
    window.location.hash = view === 'home' ? '' : view;
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const navLinks = [
    { name: 'Vision', id: 'vision' as ViewType, icon: <Info className="w-3 h-3" /> },
    { name: 'Architecture', id: 'architecture' as ViewType, icon: <Cpu className="w-3 h-3" /> },
    { name: 'Simulation', id: 'simulation' as ViewType, icon: <Activity className="w-3 h-3" /> },
    { name: 'Sky130', id: 'sky130' as ViewType, icon: <Zap className="w-3 h-3" /> },
  ];

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const TabHeader = ({ title, subtitle, colorClass }: { title: string, subtitle: string, colorClass: string }) => (
    <div className="max-w-7xl mx-auto px-6 pt-32 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-4">
        <button 
          onClick={() => navigate('home')}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>
        <div className="space-y-1">
          <div className={`text-[10px] font-black uppercase tracking-[0.4em] ${colorClass}`}>{subtitle}</div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">{title}</h1>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="px-6 py-4 glass rounded-2xl border border-white/5">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Status</div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE_DATA_STREAM
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case 'vision':
        return (
          <motion.div key="vision-view" {...pageVariants} className="pb-32">
            <TabHeader title="System Vision" subtitle="Technical Analysis" colorClass="text-amber-500" />
            <ProblemSection />
            <ComparisonSection />
          </motion.div>
        );
      case 'architecture':
        return (
          <motion.div key="arch-view" {...pageVariants} className="pb-32">
            <TabHeader title="Hardware Core" subtitle="Silicon Pipeline" colorClass="text-purple-500" />
            <ArchitectureSection />
            <DashboardSection />
          </motion.div>
        );
      case 'simulation':
        return (
          <motion.div key="sim-view" {...pageVariants} className="pb-32">
            <TabHeader title="LOB Simulator" subtitle="Real-time Execution" colorClass="text-purple-500" />
            <OrderBookSimulation />
          </motion.div>
        );
      case 'sky130':
        return (
          <motion.div key="sky-view" {...pageVariants} className="pb-32">
            <TabHeader title="SkyWater Node" subtitle="Foundry Specification" colorClass="text-amber-500" />
            <SiliconSection />
            <TeamSection />
          </motion.div>
        );
      default:
        return (
          <motion.div key="home-view" {...pageVariants}>
            <Hero onNavigate={navigate} />
            <ProblemSection />
            <ArchitectureSection />
            <OrderBookSimulation />
            <ComparisonSection />
            <SiliconSection />
            <DashboardSection />
            <TeamSection />
          </motion.div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-purple-500 selection:text-white overflow-x-hidden">
      {/* High-Z Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-purple-500 origin-left z-[200] shadow-[0_0_20px_#A855F7]"
        style={{ scaleX }}
      />

      {/* Persistent Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[150] p-4 flex justify-center pointer-events-none">
        <div className="w-full max-w-7xl glass rounded-3xl p-3 flex justify-between items-center pointer-events-auto shadow-2xl border border-white/10 backdrop-blur-2xl">
          <button onClick={() => navigate('home')} className="flex items-center gap-3 group px-3">
            <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center text-white font-black shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform">N</div>
            <div className="hidden sm:block text-left">
              <span className="block font-black tracking-tight text-white uppercase text-xs">NANOTRADE</span>
              <span className="block text-purple-500 font-black text-[8px] tracking-[0.3em] uppercase">SYSTEMS_ASIC</span>
            </div>
          </button>
          
          <div className="flex gap-2 md:gap-4">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all relative ${
                  currentView === link.id 
                  ? 'bg-purple-500/10 text-purple-400 shadow-[inset_0_0_10px_rgba(168,85,247,0.2)]' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                }`}
              >
                {link.icon}
                <span className="hidden lg:inline">{link.name}</span>
                {currentView === link.id && (
                  <motion.div layoutId="nav-glow" className="absolute inset-0 rounded-2xl border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)] pointer-events-none" />
                )}
              </button>
            ))}
          </div>

          <button className="hidden md:flex bg-white text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all shadow-xl active:scale-95">
            Whitepaper
          </button>
        </div>
      </nav>

      {/* Main Viewport */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {renderCurrentView()}
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <footer className="bg-[#080808] border-t border-white/5 py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-purple-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black">N</div>
              <span className="font-black tracking-tight text-white uppercase text-sm">NANOTRADE ASIC</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-sm font-medium">
              Hardware-native matching engines for institutional finance. Zero-jitter, deterministic execution at the gate level.
            </p>
          </div>
          <div className="space-y-6">
            <div className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Module Index</div>
            <div className="flex flex-col gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
              {navLinks.map(l => (
                <button key={l.id} onClick={() => navigate(l.id)} className="text-left hover:text-purple-400 transition-colors flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-800 rounded-full" />
                  {l.name}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Resource Hub</div>
            <div className="flex flex-col gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
              <button onClick={() => navigate('home')} className="text-left hover:text-white transition-colors flex items-center gap-2">
                <LayoutDashboard className="w-3 h-3" />
                Experience Home
              </button>
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">Technical Support</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-600 text-[10px] mono uppercase tracking-[0.2em]">Verified SkyWater 130nm GDSII</div>
          <div className="text-slate-600 text-[10px] font-black uppercase tracking-widest">© 2024 NANOTRADE ASIC TECHNOLOGIES.</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
