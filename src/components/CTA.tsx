import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTA() {
  const navigate = useNavigate();
  return (
    <section className="relative py-32 bg-[#030303] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-purple-900/20 via-cyan-900/10 to-pink-900/20 rounded-full blur-[200px]" />
        
        {/* Animated gradient ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-purple-500/10"
          style={{
            background: 'conic-gradient(from 0deg, transparent, rgba(147,51,234,0.1), transparent, rgba(6,182,212,0.1), transparent)',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-8"
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-purple-300">
              Start Creating Today
            </span>
          </motion.div>

          {/* Heading */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white tracking-[-2px] leading-[1.1] mb-8">
            Stop thinking.
            <br />
            <span className="text-gradient">Start creating.</span>
          </h2>

          {/* Subtext */}
          <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed">
            Join thousands of creators who organize their content pipeline with
            CreatorFlow. Your best work starts with a clear workflow.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={() => navigate('/auth')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group px-10 py-5 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold text-base flex items-center gap-3 hover:shadow-[0_0_60px_rgba(147,51,234,0.4)] transition-all duration-300 animate-pulse-glow"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 rounded-full border border-white/20 text-white font-medium text-base hover:bg-white/5 hover:border-white/30 transition-all duration-300"
            >
              View Pricing
            </motion.button>
          </div>

          {/* Trust badge */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 text-sm text-zinc-500"
          >
            Free forever plan available. No credit card required.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
