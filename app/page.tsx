"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import React from 'react';
import seeronImg from '@/app/team/seeron.jpg';
import betulimg from '@/app/team/betul.jpg';
import sehreenimg from '@/app/team/sehreen.jpg';
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import HeroSection from "@/components/HeroSection";

import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { TextScramble } from "@/components/ui/text-scramble";
import { ArrowRight, Cpu, Activity, Zap, ShieldAlert, Fingerprint, Loader2 } from "lucide-react";

export default function Home() {

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (res.ok) {
        setFormStatus("success");
        setName("");
        setEmail("");
      } else {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit request.");
      }
    } catch (err: any) {
      console.error(err);
      setFormStatus("error");
      setErrorMessage(err.message || "An unknown error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const parallaxImages = [
    { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1280&h=720&fit=crop', alt: 'Circuitry' },
    { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1280&h=720&fit=crop', alt: 'Earth from Space' },
    { src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1280&h=720&fit=crop', alt: 'Matrix Code' },
    { src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1280&h=720&fit=crop', alt: 'Cyber Security' },
    { src: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1280&h=720&fit=crop', alt: 'Coding' },
    { src: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=600&fit=crop', alt: 'Abstract Tech' },
    { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1280&h=720&fit=crop', alt: 'Servers' },
  ];

  // Preload images for smoother parallax
  useEffect(() => {
    parallaxImages.forEach((img) => {
      const image = new Image();
      image.src = img.src;
    });
  }, []);

  return (
    <main className="relative min-h-screen selection:bg-primary/20 bg-black">

      {/* 1. Hero Section with Spline Background - Cropped at bottom */}
      <div className="relative overflow-hidden h-[85vh]">
        <HeroSection />
      </div>

      {/* Technical Highlights - Ultra Low Latency & Anomaly Detection cards */}
      <section className="relative py-24 bg-black/95 z-10 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.2} duration={1.5}>
              <div className="relative rounded-3xl border border-white/5 p-2 group max-w-lg">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} className="z-0" />
                <div className="relative z-10 glass backdrop-blur-3xl bg-white/5 border border-white/10 p-8 md:p-10 rounded-2xl">
                  <h3 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Ultra Low Latency</h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    We removed the operating system overhead. Every rule is etched into the target Sky130 silicon layer for &lt;100ns matching latency.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.5} duration={1.5}>
              <div className="relative rounded-3xl border border-white/5 p-2 group max-w-lg md:ml-auto">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} className="z-0" />
                <div className="relative z-10 glass backdrop-blur-3xl bg-white/5 border border-white/10 p-8 md:p-10 rounded-2xl">
                  <h3 className="text-primary font-bold tracking-widest uppercase text-sm mb-4">Real-Time Anomaly Detection</h3>
                  <p className="text-white/90 text-lg leading-relaxed">
                    An onboard multi-layer perceptron analyzes quoting behavior in real-time, autonomously triggering the hardware circuit breaker.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Zoom Parallax + Key Specs - UPDATED FOR SMOOTHER SCROLLING */}
      <div className="relative bg-black py-12 z-10">
        <ScrollReveal>
          <div className="container mx-auto px-6 text-center max-w-4xl mb-8">
            <TextScramble
              className="text-primary font-bold tracking-widest uppercase text-sm mb-4"
              duration={1.5}
              characterSet="01"
            >
              HFT ASIC HACKATHON
            </TextScramble>
            <h2 className="text-4xl md:text-5xl font-black text-white">AI-Powered Matching Engine.</h2>
          </div>
        </ScrollReveal>
        <ZoomParallax images={parallaxImages} />
        {/* Key specs strip - fills blank space */}
        <div className="container mx-auto px-6 max-w-6xl mt-8">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
              <div className="relative rounded-xl border border-white/5 p-1 group">
                <GlowingEffect spread={30} glow={true} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={1} className="z-0" />
                <div className="relative z-10 bg-white/5 rounded-lg py-4 px-3 border border-white/10">
                  <div className="text-primary font-bold text-lg">{'<'}100ns</div>
                  <div className="text-white/60 text-xs uppercase tracking-wider">Matching Latency</div>
                </div>
              </div>
              <div className="relative rounded-xl border border-white/5 p-1 group">
                <GlowingEffect spread={30} glow={true} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={1} className="z-0" />
                <div className="relative z-10 bg-white/5 rounded-lg py-4 px-3 border border-white/10">
                  <div className="text-primary font-bold text-lg">10M+/s</div>
                  <div className="text-white/60 text-xs uppercase tracking-wider">Throughput</div>
                </div>
              </div>
              <div className="relative rounded-xl border border-white/5 p-1 group">
                <GlowingEffect spread={30} glow={true} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={1} className="z-0" />
                <div className="relative z-10 bg-white/5 rounded-lg py-4 px-3 border border-white/10">
                  <div className="text-primary font-bold text-lg">400 MHz</div>
                  <div className="text-white/60 text-xs uppercase tracking-wider">Clock</div>
                </div>
              </div>
              <div className="relative rounded-xl border border-white/5 p-1 group">
                <GlowingEffect spread={30} glow={true} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={1} className="z-0" />
                <div className="relative z-10 bg-white/5 rounded-lg py-4 px-3 border border-white/10">
                  <div className="text-primary font-bold text-lg">8-15 mW</div>
                  <div className="text-white/60 text-xs uppercase tracking-wider">Power</div>
                </div>
              </div>
              <div className="relative rounded-xl border border-white/5 p-1 group">
                <GlowingEffect spread={30} glow={true} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={1} className="z-0" />
                <div className="relative z-10 bg-white/5 rounded-lg py-4 px-3 border border-white/10">
                  <div className="text-primary font-bold text-lg">$500</div>
                  <div className="text-white/60 text-xs uppercase tracking-wider">Unit Cost</div>
                </div>
              </div>
              <div className="relative rounded-xl border border-white/5 p-1 group">
                <GlowingEffect spread={30} glow={true} disabled={false} proximity={48} inactiveZone={0.01} borderWidth={1} className="z-0" />
                <div className="relative z-10 bg-white/5 rounded-lg py-4 px-3 border border-white/10">
                  <div className="text-primary font-bold text-lg">Sky130</div>
                  <div className="text-white/60 text-xs uppercase tracking-wider">TinyTapeout</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16 bg-black relative z-20" />

      {/* Problem Statement */}
      <section className="py-16 bg-[#050505] border-t border-white/5 relative z-30">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-white">The Problem</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative rounded-xl border border-white/5 p-2 group">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} className="z-0" />
                <div className="relative z-10 bg-black/60 rounded-lg p-6 border border-white/10">
                  <h3 className="text-primary font-bold mb-3">Speed Bottleneck</h3>
                  <p className="text-white/70 text-sm leading-relaxed">Exchanges process 500M+ orders daily. Software engines take 50–100 microseconds per order—creating unfair advantages and bottlenecks.</p>
                </div>
              </div>
              <div className="relative rounded-xl border border-white/5 p-2 group">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} className="z-0" />
                <div className="relative z-10 bg-black/60 rounded-lg p-6 border border-white/10">
                  <h3 className="text-red-400 font-bold mb-3">Market Manipulation</h3>
                  <p className="text-white/70 text-sm leading-relaxed">Flash Crash 2010: $1T erased in 15 minutes. Knight Capital 2012: $440M lost in 45 minutes. Current systems detect anomalies hours or days too late.</p>
                </div>
              </div>
              <div className="relative rounded-xl border border-white/5 p-2 group">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} className="z-0" />
                <div className="relative z-10 bg-black/60 rounded-lg p-6 border border-white/10">
                  <h3 className="text-amber-400 font-bold mb-3">Cost & Power</h3>
                  <p className="text-white/70 text-sm leading-relaxed">FPGAs cost $50,000+ per unit and consume 15W+. $5M+ capital costs for large exchanges.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Bento Grid Architecture Showcase */}
      <section id="architecture" className="py-20 bg-black relative z-30 overflow-hidden">
        {/* Background Globe - smaller, contained accent */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-0 w-[400px] h-[400px] opacity-10 pointer-events-none -mr-20 hidden lg:block">
          <RotatingEarth width={400} height={400} className="w-full h-full" />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16 relative group cursor-default">
              <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">Core ASIC Subsystems</h2>
              <TextScramble
                className="text-white/70 text-lg max-w-2xl mx-auto block"
                duration={1.2}
                characterSet=". "
              >
                Discover the three critical hardware modules integrated onto a single monolithic die for absolute execution determinism.
              </TextScramble>
            </div>
          </ScrollReveal>

          {/* Aceternity GlowingEffect Grid Integration */}
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {/* Card 1 */}
            <ScrollReveal delay={0.1} direction="up" className="col-span-1 lg:col-span-2 h-full">
              <li className="relative h-full rounded-2xl border border-white/5 p-2 md:p-3 group">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} className="z-0" />
                <div className="relative z-10 flex flex-col h-full bg-black/80 backdrop-blur-md rounded-xl p-8 shadow-md border border-white/10 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-125" />
                  <Cpu className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-white">Order Matching Engine</h3>
                  <code className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-md inline-block w-max mb-4 border border-primary/20">order_book.v</code>
                  <p className="text-white/70 leading-relaxed mb-4 flex-grow">
                    Binary heap-based order books with content-addressable memory (CAM) for instant lookup. Price-time priority algorithm with pipeline processing. 13-cycle pipeline = 32.5ns per match.
                  </p>
                  <ul className="text-white/50 text-sm space-y-1">
                    <li>• 256 KB SRAM for order books</li>
                    <li>• 64-bit input, 128-bit output</li>
                  </ul>
                  <div className="mt-auto flex items-center justify-between text-sm font-bold border-t border-white/10 pt-4">
                    <span className="text-white/50">Execution Latency</span>
                    <span className="text-primary">{'<'} 50ns</span>
                  </div>
                </div>
              </li>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal delay={0.2} direction="up" className="h-full">
              <li className="relative h-full rounded-2xl border border-white/5 p-2 md:p-3 group">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} className="z-0" />
                <div className="relative z-10 flex flex-col h-full bg-black/80 backdrop-blur-md rounded-xl p-8 shadow-md border border-white/10 overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-125" />
                  <Activity className="w-8 h-8 text-white mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-white">ML Anomaly Detection</h3>
                  <code className="text-xs text-white bg-white/10 px-2 py-1 rounded inline-block w-max mb-4 border border-white/20">16→8→6 MLP</code>
                  <p className="text-white/70 leading-relaxed flex-grow">
                    16-input → 8-hidden → 6-output neural network. Monitors 16+ market metrics. 95%+ sensitivity, 98%+ specificity. 50–62.5ns inference. Fixed-point weights in ROM.
                  </p>
                  <div className="mt-auto border-t border-white/10 pt-4">
                    <div className="flex items-center gap-2 text-xs font-mono text-primary bg-primary/5 p-2 rounded w-max">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      400 MHz Target
                    </div>
                  </div>
                </div>
              </li>
            </ScrollReveal>

            <ScrollReveal delay={0.3} direction="up" className="md:col-span-2 lg:col-span-3">
              <li className="relative h-full rounded-2xl border border-white/5 p-2 md:p-3 group">
                <GlowingEffect spread={60} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} className="z-0" />
                <div className="relative z-10 flex flex-col md:flex-row h-full bg-black/80 backdrop-blur-md rounded-xl p-8 md:p-10 border border-white/10 overflow-hidden items-center gap-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent z-0 pointer-events-none" />
                  <div className="relative z-10 basis-1/2 w-full">
                    <ShieldAlert className="w-10 h-10 text-red-500 mb-4" />
                    <h3 className="text-3xl font-bold mb-3 text-white">Automated Circuit Breaker</h3>
                    <p className="text-white/70 leading-relaxed max-w-lg mb-4">
                      Tiered alert system (green/yellow/orange/red). Automatic trading halts with 5-minute cooling periods. Regulatory compliance logging. Stops the next Flash Crash in microseconds, not minutes.
                    </p>
                    <code className="text-xs text-red-400 bg-red-400/10 px-3 py-1.5 rounded inline-block font-bold">tt_um_nanotrade.v</code>
                  </div>
                  <div className="relative z-10 basis-1/2 w-full text-left">
                    <div className="bg-[#0f0f11] rounded-xl p-6 border border-white/5 shadow-2xl">
                      <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-white/40 rounded-full" /> Logic Flow Visualization
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center bg-black p-3 rounded-lg text-sm border border-white/5 shadow-sm">
                          <span className="font-semibold text-white/80">Market Data In</span>
                          <span className="text-white font-mono font-bold bg-white/10 px-2 py-1 rounded">L1 Cache</span>
                        </div>
                        <div className="flex justify-center -my-1"><ArrowRight className="w-4 h-4 text-white/30 rotate-90" /></div>
                        <div className="flex justify-between items-center bg-primary/10 p-3 rounded-lg text-sm border border-primary/20 shadow-sm relative overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                          <span className="text-primary font-bold pl-2">ML Confidence Gate</span>
                          <span className="font-mono text-white">99% Anomaly</span>
                        </div>
                        <div className="flex justify-center -my-1"><ArrowRight className="w-4 h-4 text-white/30 rotate-90" /></div>
                        <div className="flex justify-between items-center bg-red-950/40 p-3 rounded-lg text-sm border border-red-500/20 shadow-sm relative overflow-hidden">
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
                          <span className="text-red-400 font-bold pl-2">Circuit Breaker</span>
                          <span className="font-mono text-xs bg-red-500/20 text-red-200 px-2 py-0.5 rounded">EXECUTION_HALT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ScrollReveal>
          </ul>
        </div>
      </section>

      {/* 4. Six Anomaly Types */}
      <section className="py-16 bg-black relative z-30 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-white">Six Detected Anomaly Types</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-[#0f0f11] rounded-xl overflow-hidden border border-white/5 text-sm">
                <thead>
                  <tr className="bg-white/5">
                    <th className="py-3 px-4 font-bold text-white/60 uppercase text-xs">Anomaly</th>
                    <th className="py-3 px-4 font-bold text-white/60 uppercase text-xs">Description</th>
                    <th className="py-3 px-4 font-bold text-white/60 uppercase text-xs hidden md:table-cell">Detection</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  <tr><td className="py-3 px-4 font-medium">Flash Crash</td><td className="py-3 px-4">Rapid price decline</td><td className="py-3 px-4 hidden md:table-cell text-white/60">Price drops &gt;5% in &lt;10s</td></tr>
                  <tr><td className="py-3 px-4 font-medium">Pump and Dump</td><td className="py-3 px-4">Artificial price inflation</td><td className="py-3 px-4 hidden md:table-cell text-white/60">Volume spike + rapid reversal</td></tr>
                  <tr><td className="py-3 px-4 font-medium">Spoofing</td><td className="py-3 px-4">Fake order manipulation</td><td className="py-3 px-4 hidden md:table-cell text-white/60">Large orders with &gt;80% cancel rate</td></tr>
                  <tr><td className="py-3 px-4 font-medium">Wash Trading</td><td className="py-3 px-4">Self-trading for fake volume</td><td className="py-3 px-4 hidden md:table-cell text-white/60">Same counterparties trading repeatedly</td></tr>
                  <tr><td className="py-3 px-4 font-medium">Liquidity Crisis</td><td className="py-3 px-4">Extreme order imbalance</td><td className="py-3 px-4 hidden md:table-cell text-white/60">Order book &gt;95% on one side</td></tr>
                  <tr><td className="py-3 px-4 font-medium">Volatility Spike</td><td className="py-3 px-4">Unusual price variation</td><td className="py-3 px-4 hidden md:table-cell text-white/60">Std dev exceeds 5× historical</td></tr>
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. Market Applications + Value Prop */}
      <section id="applications" className="py-20 bg-[#050505] relative z-30 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal>
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">Why NanoTrade Wins</h2>
              <p className="text-white/80 text-lg max-w-3xl leading-relaxed">
                Current exchanges choose between speed (FPGAs for matching) and safety (slow software for monitoring). We&apos;re the first ASIC that delivers both on a single chip—faster matching than any FPGA, with real-time AI anomaly detection that can stop the next Flash Crash in microseconds instead of minutes.
              </p>
            </div>
            <h3 className="text-xl font-bold mb-6 text-white">Target Market — $5B+ Trading Infrastructure Annually</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <ScrollReveal delay={0.1}>
                <div className="relative rounded-2xl border border-white/5 p-2 group h-full">
                  <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} className="z-0" />
                  <div className="relative z-10 bg-black border border-white/10 rounded-xl p-8 h-full shadow-[0_0_30px_rgba(239,68,68,0.05)] overflow-hidden group-hover:border-red-500/30 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-red-500/20 transition-colors" />
                    <h3 className="text-2xl font-bold text-white mb-4">Stock Exchanges</h3>
                    <p className="text-white/60 leading-relaxed">NASDAQ, NYSE, CME. Co-located matching with built-in surveillance. Sub-100ns latency with real-time anomaly detection.</p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="relative rounded-2xl border border-white/5 p-2 group h-full">
                  <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} className="z-0" />
                  <div className="relative z-10 bg-black border border-white/10 rounded-xl p-8 h-full shadow-[0_0_30px_rgba(59,130,246,0.05)] overflow-hidden group-hover:border-blue-500/30 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-blue-500/20 transition-colors" />
                    <h3 className="text-2xl font-bold text-white mb-4">Crypto Exchanges</h3>
                    <p className="text-white/60 leading-relaxed">Binance, Coinbase, Kraken. High-frequency order flow with built-in manipulation detection. 1000× faster, 100× cheaper than FPGAs.</p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="relative rounded-2xl border border-white/5 p-2 group h-full">
                  <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} className="z-0" />
                  <div className="relative z-10 bg-black border border-white/10 rounded-xl p-8 h-full shadow-[0_0_30px_rgba(168,85,247,0.05)] overflow-hidden group-hover:border-purple-500/30 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-purple-500/20 transition-colors" />
                    <h3 className="text-2xl font-bold text-white mb-4">HFT Firms</h3>
                    <p className="text-white/60 leading-relaxed">Co-located matching with built-in surveillance. Detects spoofing, wash trades, and flash crashes in real-time at hardware speed.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Performance Matrix */}
      <section id="metrics" className="py-20 bg-black relative z-30 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black mb-4 border-l-4 border-primary pl-4 text-white">Sub-Microsecond Advantage</h2>
            <p className="text-white/70 mb-10 max-w-3xl text-lg">
              Our custom silicon provides a <strong className="text-primary font-bold">1000&times;</strong> speed improvement over software and is significantly higher efficiency than traditional FPGA solutions. It is <strong className="text-white">100&times; cheaper</strong> and <strong className="text-white">100&times; more efficient</strong> than current market alternatives.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse bg-[#0f0f11] rounded-xl overflow-hidden shadow-sm border border-white/5">
                <thead>
                  <tr className="bg-white/5 text-white">
                    <th className="py-4 px-6 font-bold text-white/60 uppercase tracking-wider text-xs">Metric</th>
                    <th className="py-4 px-6 font-bold text-white/60 uppercase tracking-wider text-xs">Legacy Software</th>
                    <th className="py-4 px-6 font-bold text-primary uppercase tracking-wider text-xs relative">
                      NanoTrade ASIC
                      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 pointer-events-none" />
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm text-white">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-medium">Matching Latency</td>
                    <td className="py-4 px-6 font-mono text-white/60">50-100 μs</td>
                    <td className="py-4 px-6 font-mono font-bold text-primary">0.05-0.1 μs</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-medium">Throughput</td>
                    <td className="py-4 px-6 font-mono text-white/60">~100K/s</td>
                    <td className="py-4 px-6 font-mono font-bold text-primary">10M+/s</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-medium">Anomaly Detection</td>
                    <td className="py-4 px-6 font-mono text-white/60">200,000ns+ (Network hop)</td>
                    <td className="py-4 px-6 font-mono font-bold text-white">80ns (On-chip INT8)</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-medium">Jitter Profile</td>
                    <td className="py-4 px-6 text-white/60">OS Thread Scheduling Noise</td>
                    <td className="py-4 px-6 font-bold text-white">Zero-Jitter Determinism</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-medium">Power Envelope</td>
                    <td className="py-4 px-6 font-mono text-white/60">15-25W (FPGA)</td>
                    <td className="py-4 px-6 font-mono font-bold text-white">8-15 mW</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-6 font-medium">Unit Cost</td>
                    <td className="py-4 px-6 font-mono text-white/60">$50,000 (FPGA)</td>
                    <td className="py-4 px-6 font-mono font-bold text-white">$500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 7. Contact / Winner Form */}
      <section id="alpha" className="py-24 relative z-30 bg-black border-t border-primary/10 overflow-hidden">
        {/* Abstract geometric background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #0071e3 0%, transparent 60%)' }} />

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12 max-w-6xl">

          <div className="basis-1/2 text-left">
            <ScrollReveal>
              <Zap className="w-10 h-10 text-primary mb-6" />
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-white">Apply for FPGA <br />Simulation Access</h2>
              <p className="text-lg text-white/70 mb-8 max-w-md">
                Get early access to our chip simulation. Fill out the form below and we&apos;ll be in touch.
              </p>
              <div className="flex items-center gap-3 text-sm font-mono text-white/50">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> TARGET: TINYTAPEOUT 400MHZ
              </div>
            </ScrollReveal>
          </div>

          <div className="basis-1/2 w-full">
            <ScrollReveal delay={0.2} direction="up">
              <div className="relative rounded-2xl border border-white/5 p-2 group">
                <GlowingEffect spread={50} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} className="z-0" />
                <div className="relative z-10 glass-dark rounded-xl p-8 md:p-10 shadow-2xl border border-white/10 overflow-hidden bg-[#0A0A0A]">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#005bb5] to-primary" />

                  <h3 className="text-2xl font-bold mb-6 flex justify-between items-center text-white">
                    Alpha Application
                    {formStatus === "success" && <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded">DELIVERED</span>}
                  </h3>

                  {formStatus === "success" ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 text-center text-white/80">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/50">
                        <ArrowRight className="text-green-400 rotate-45" />
                      </div>
                      <p className="font-medium text-lg text-white mb-2">Application Received.</p>
                      <p className="text-sm">We've contacted the engineering team and will be in touch shortly.</p>
                      <button onClick={() => setFormStatus("idle")} className="mt-6 text-sm underline text-white/50 hover:text-white">Submit another request</button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">

                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-sm font-bold text-white/70">Legal Name</label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-black/80 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                          placeholder="Jane Doe"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-sm font-bold text-white/70">Corporate Email</label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-black/80 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                          placeholder="jane@fund.vc"
                          disabled={isSubmitting}
                        />
                      </div>

                      {formStatus === "error" && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded text-sm break-words">
                          {errorMessage}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-primary hover:bg-[#005bb5] text-white mt-2 flex justify-center items-center py-4 rounded-lg font-bold tracking-wide relative overflow-hidden group transition-colors"
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            Submit Application
                            <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 pointer-events-none" />
                          </>
                        )}
                      </button>

                    </form>
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* 8. Engineering Team */}
      <section id="team" className="py-20 bg-[#050505] relative z-30 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-6xl text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">The Engineering Team</h2>
            <p className="text-white/60 mb-16 max-w-xl mx-auto">
              Our multidisciplinary team built the ASIC architecture, machine learning models, and real-time simulators in an accelerated 7-day development sprint.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">

            <ScrollReveal delay={0.1}>
              <div className="flex flex-col items-center group">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/10 mb-4 group-hover:border-primary transition-colors relative bg-white/5">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent animate-pulse" />
                  <img src={sehreenimg.src} alt="Sehreen Basara" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Sehreen Basara</h3>
                <p className="text-primary text-sm font-mono tracking-tight mb-3">Data and Simulations Engineer</p>
                <p className="text-white/60 text-sm text-center max-w-xs leading-relaxed">Builds real-time order book visualizations and market simulations. Expertise in data pipelines and latency analysis for the NanoTrade architecture.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-col items-center group mt-8 md:mt-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-primary/50 mb-4 group-hover:border-primary transition-colors relative bg-white/5 shadow-[0_0_30px_rgba(0,113,227,0.3)]">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent animate-pulse" />
                  <img src={seeronImg.src} alt="Seeron Sivashankar" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Seeron Sivashankar</h3>
                <p className="text-primary text-sm font-mono tracking-tight mb-3">Core Product Engineer</p>
                <p className="text-white/60 text-sm text-center max-w-xs leading-relaxed">Initiated the concept design, the ASIC design, and Verilog implementation. Architected the order matching engine, CAM, and pipeline for sub-100ns execution.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="flex flex-col items-center group mt-8 md:mt-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-white/10 mb-4 group-hover:border-primary transition-colors relative bg-white/5">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent animate-pulse" />
                  <img src={betulimg.src} alt="Betul Cetintas" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 relative z-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Betul Cetintas</h3>
                <p className="text-primary text-sm font-mono tracking-tight mb-3">Machine Learning and QA Engineer</p>
                <p className="text-white/60 text-sm text-center max-w-xs leading-relaxed">Designed the on-chip MLP for anomaly detection. Trained models on historical market data and validated 95%+ sensitivity across all 6 anomaly types.</p>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      <footer className="py-12 bg-[#050505] border-t border-white/10 relative z-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm font-medium">
          <div className="flex items-center gap-3">
            <Fingerprint className="w-5 h-5 text-primary" />
            <span className="font-bold tracking-widest uppercase text-white">NanoTrade</span>
          </div>
          <div className="text-white/50 mt-4 md:mt-0">© 2026 NanoTrade ASIC. Built for HFT Hackathon.</div>
        </div>
      </footer>

    </main>
  );
}