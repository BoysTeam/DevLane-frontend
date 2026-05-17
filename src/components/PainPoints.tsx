import { motion } from 'framer-motion';
import { Brain, Shuffle, FileX2, AlertTriangle, CheckCircle2 } from 'lucide-react';

const painPoints = [
  {
    icon: Brain,
    problem: 'Scattered Ideas',
    description: 'Your content ideas are spread across notes apps, voice memos, and random scraps of paper.',
    solution: 'Centralize every idea in one visual board. Capture inspiration instantly.',
  },
  {
    icon: Shuffle,
    problem: 'Inconsistent Posting',
    description: 'You post when you feel like it, leading to unpredictable growth and engagement.',
    solution: 'Build a consistent publishing schedule with visual pipeline tracking.',
  },
  {
    icon: FileX2,
    problem: 'Lost Content Drafts',
    description: 'Half-finished scripts and video files get lost in folders you forget exist.',
    solution: 'Every draft lives in its stage. Nothing falls through the cracks.',
  },
  {
    icon: AlertTriangle,
    problem: 'Planning Stress',
    description: 'The mental overhead of planning content drains your creative energy.',
    solution: 'Visual planning removes the mental load. Just drag, drop, and create.',
  },
];

export default function PainPoints() {
  return (
    <section id="why-us" className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 mb-6">
            <Brain className="w-3 h-3 text-pink-400" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-pink-300">
              Why Creators Love It
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-[-1.5px] mb-6">
            Built for{' '}
            <span className="text-gradient">creator pain points</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            We understand the struggle. Devlane was built to solve the specific
            challenges content creators face every day.
          </p>
        </motion.div>

        {/* Pain Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.problem}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group glass-card p-8 border border-white/5 hover:border-white/15 transition-all duration-500"
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center border border-pink-500/20 group-hover:border-pink-500/40 transition-colors">
                    <Icon className="w-7 h-7 text-pink-300" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 tracking-[-0.5px]">
                      {point.problem}
                    </h3>
                    <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                      {point.description}
                    </p>

                    {/* Solution */}
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-green-500/5 border border-green-500/10">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-green-300/80">{point.solution}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom testimonial-style stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 glass-panel p-10 border border-white/5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">3x</div>
              <p className="text-sm text-zinc-400">More consistent publishing</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">-70%</div>
              <p className="text-sm text-zinc-400">Less planning stress</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">0</div>
              <p className="text-sm text-zinc-400">Lost content drafts</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
