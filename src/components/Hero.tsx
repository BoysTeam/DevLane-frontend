import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { Play, ArrowRight } from 'lucide-react';
import VoidTunnel from './VoidTunnel';
import KineticTextSlide from './KineticTextSlide';
import FloatingCards from './FloatingCards';

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Shader Background */}
      <VoidTunnel />

      {/* Floating Cards */}
      <FloatingCards />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#030303] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#030303] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left: Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-purple-300">
              Visual Workflow for Creators
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-semibold text-white leading-[1.1] tracking-[-2px] mb-6">
            <KineticTextSlide text="Your ideas.\nVisualized." />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Drag, drop, and publish. The minimal kanban tool that keeps your
            content pipeline flowing from idea to published.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <button 
              onClick={() => navigate('/auth')}
              className="group px-8 py-4 rounded-full bg-white text-black font-semibold text-sm flex items-center gap-2 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group px-8 py-4 rounded-full border border-white/20 text-white font-medium text-sm flex items-center gap-2 hover:bg-white/5 hover:border-white/30 transition-all duration-300">
              <Play className="w-4 h-4" />
              Watch Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="flex items-center gap-8 mt-14 justify-center lg:justify-start"
          >
            {[
              { value: '10K+', label: 'Creators' },
              { value: '500K+', label: 'Videos Planned' },
              { value: '99%', label: 'Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="text-center lg:text-left">
                <div className="text-xl font-semibold text-white">{stat.value}</div>
                <div className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D Character */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 relative max-w-md lg:max-w-lg"
        >
          <div className="relative">
            {/* Glow behind character */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-cyan-500/20 to-pink-500/20 rounded-full blur-3xl scale-110" />
            
            {/* Character Image */}
            <motion.img
              src="/images/hero-character.png"
              alt="Devlane Creator Character"
              className="relative z-10 w-full h-auto drop-shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-4 z-20 glass-card px-4 py-3 border border-purple-500/30"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-zinc-300 font-medium">Pipeline Flowing</span>
              </div>
              <div className="text-[10px] text-zinc-500 mt-1">12 videos this week</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
