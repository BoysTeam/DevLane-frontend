import { motion } from 'framer-motion';
import { Layout, Calendar, BarChart3, Zap, Users, Shield, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Layout,
    title: 'Visual Content Workflow',
    description: 'See your entire content pipeline at a glance. Drag cards between stages from Ideas to Published.',
    gradient: 'from-purple-500/20 to-violet-500/20',
    border: 'border-purple-500/20',
    glow: 'group-hover:shadow-[0_0_40px_rgba(147,51,234,0.15)]',
  },
  {
    icon: Zap,
    title: 'Drag & Drop Pipeline',
    description: 'Move content through your workflow with intuitive drag-and-drop. No complex setup required.',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/20',
    glow: 'group-hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]',
  },
  {
    icon: Users,
    title: 'Creator-Focused Planning',
    description: 'Built by creators, for creators. Plan videos, podcasts, blogs, and social posts in one place.',
    gradient: 'from-pink-500/20 to-rose-500/20',
    border: 'border-pink-500/20',
    glow: 'group-hover:shadow-[0_0_40px_rgba(236,72,153,0.15)]',
  },
  {
    icon: BarChart3,
    title: 'Publishing Tracker',
    description: 'Track your publishing consistency. See streaks, analytics, and content performance at a glance.',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/20',
    glow: 'group-hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]',
  },
  {
    icon: Calendar,
    title: 'Calendar Scheduling',
    description: 'Schedule your content calendar visually. Never miss a publishing date again.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    border: 'border-amber-500/20',
    glow: 'group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]',
  },
  {
    icon: Shield,
    title: 'Content Backup',
    description: 'All your drafts, scripts, and ideas safely stored. Never lose a content idea again.',
    gradient: 'from-indigo-500/20 to-blue-500/20',
    border: 'border-indigo-500/20',
    glow: 'group-hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Features() {
  return (
    <section id="features" className="relative py-32 bg-[#030303]">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-cyan-300">
              Features
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-[-1.5px] mb-6">
            Everything you need to{' '}
            <span className="text-gradient">create consistently</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            A complete toolkit designed specifically for content creators who want
            to stay organized and publish consistently.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className={`group relative glass-card p-8 border ${feature.border} ${feature.glow} transition-all duration-500 hover:border-white/20`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3 tracking-[-0.5px]">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Hover glow effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
