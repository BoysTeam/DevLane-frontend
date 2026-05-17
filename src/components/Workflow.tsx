import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, FileText, Video, Wand2, Calendar, CheckCircle2, GripVertical, ArrowRight } from 'lucide-react';

interface Card {
  id: string;
  title: string;
  tag: string;
  tagColor: string;
  date?: string;
  done?: boolean;
}

const stages: { id: string; title: string; icon: React.ElementType; color: string; borderColor: string; headerGradient: string; cards: Card[] }[] = [
  {
    id: 'ideas',
    title: 'Ideas',
    icon: Lightbulb,
    color: 'bg-amber-500',
    borderColor: 'border-amber-500/30',
    headerGradient: 'from-amber-500/20 to-orange-500/20',
    cards: [
      { id: 'i1', title: 'Tokyo Night Vlog', tag: 'Travel', tagColor: 'bg-amber-500/20 text-amber-300' },
      { id: 'i2', title: 'React Tutorial 2024', tag: 'Tech', tagColor: 'bg-blue-500/20 text-blue-300' },
      { id: 'i3', title: 'Morning Routine', tag: 'Lifestyle', tagColor: 'bg-pink-500/20 text-pink-300' },
    ],
  },
  {
    id: 'script',
    title: 'Script',
    icon: FileText,
    color: 'bg-blue-500',
    borderColor: 'border-blue-500/30',
    headerGradient: 'from-blue-500/20 to-cyan-500/20',
    cards: [
      { id: 's1', title: 'Tech Review Q2', tag: 'Tech', tagColor: 'bg-blue-500/20 text-blue-300' },
      { id: 's2', title: 'Productivity Hacks', tag: 'Self-Dev', tagColor: 'bg-emerald-500/20 text-emerald-300' },
    ],
  },
  {
    id: 'recording',
    title: 'Recording',
    icon: Video,
    color: 'bg-red-500',
    borderColor: 'border-red-500/30',
    headerGradient: 'from-red-500/20 to-pink-500/20',
    cards: [
      { id: 'r1', title: 'Podcast Episode 42', tag: 'Audio', tagColor: 'bg-purple-500/20 text-purple-300' },
    ],
  },
  {
    id: 'editing',
    title: 'Editing',
    icon: Wand2,
    color: 'bg-purple-500',
    borderColor: 'border-purple-500/30',
    headerGradient: 'from-purple-500/20 to-violet-500/20',
    cards: [
      { id: 'e1', title: 'Tutorial Series Ep.3', tag: 'Education', tagColor: 'bg-cyan-500/20 text-cyan-300' },
      { id: 'e2', title: 'Behind the Scenes', tag: 'Vlog', tagColor: 'bg-amber-500/20 text-amber-300' },
    ],
  },
  {
    id: 'scheduled',
    title: 'Scheduled',
    icon: Calendar,
    color: 'bg-emerald-500',
    borderColor: 'border-emerald-500/30',
    headerGradient: 'from-emerald-500/20 to-teal-500/20',
    cards: [
      { id: 'sc1', title: 'Weekly Recap', tag: 'Weekly', tagColor: 'bg-emerald-500/20 text-emerald-300', date: 'Mon, 9 AM' },
    ],
  },
  {
    id: 'published',
    title: 'Published',
    icon: CheckCircle2,
    color: 'bg-green-500',
    borderColor: 'border-green-500/30',
    headerGradient: 'from-green-500/20 to-emerald-500/20',
    cards: [
      { id: 'p1', title: 'Day in the Life', tag: 'Vlog', tagColor: 'bg-green-500/20 text-green-300', done: true },
      { id: 'p2', title: 'Gear Review', tag: 'Tech', tagColor: 'bg-green-500/20 text-green-300', done: true },
    ],
  },
];

export default function Workflow() {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="workflow" className="relative py-32 bg-[#030303] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 mb-6">
            <ArrowRight className="w-3 h-3 text-purple-400" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-purple-300">
              The Workflow
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-[-1.5px] mb-6">
            From <span className="text-gradient">idea</span> to{' '}
            <span className="text-gradient">published</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Your content moves through a clear, visual pipeline. Every stage is
            designed to keep you moving forward.
          </p>
        </motion.div>

        {/* Kanban Board */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Horizontal scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {stages.map((stage, stageIndex) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: stageIndex * 0.1 }}
                  className="flex-shrink-0 w-[280px]"
                >
                  {/* Column */}
                  <div className={`glass-panel border ${stage.borderColor} overflow-hidden`}>
                    {/* Column Header */}
                    <div className={`px-4 py-3 border-b border-white/5 bg-gradient-to-r ${stage.headerGradient}`}>
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 text-white`} />
                        <span className="text-sm font-semibold text-white">{stage.title}</span>
                        <span className="ml-auto text-xs text-zinc-500 bg-white/5 px-2 py-0.5 rounded-full">
                          {stage.cards.length}
                        </span>
                      </div>
                    </div>

                    {/* Cards */}
                    <div className="p-3 space-y-2 min-h-[120px]">
                      {stage.cards.map((card, cardIndex) => (
                        <motion.div
                          key={card.id}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: cardIndex * 0.05 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
                          className={`group relative p-3 rounded-xl bg-white/[0.03] border border-white/5 cursor-pointer transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] ${
                            activeCard === card.id ? 'ring-1 ring-purple-500/50' : ''
                          }`}
                        >
                          {/* Drag handle */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <GripVertical className="w-3 h-3 text-zinc-600" />
                          </div>

                          {/* Card content */}
                          <div className="flex items-start gap-2">
                            {card.done && (
                              <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white font-medium truncate pr-4">
                                {card.title}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${card.tagColor}`}>
                                  {card.tag}
                                </span>
                                {card.date && (
                                  <span className="text-[10px] text-zinc-500">{card.date}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Add card placeholder */}
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-dashed border-white/5 text-zinc-600 hover:text-zinc-400 hover:border-white/10 cursor-pointer transition-all duration-300">
                        <span className="text-lg leading-none">+</span>
                        <span className="text-xs">Add card</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Scroll hint */}
          <div className="flex items-center justify-center gap-2 mt-6 text-zinc-600 md:hidden">
            <span className="text-xs">Swipe to see all stages</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </motion.div>

        {/* Workflow arrows - desktop only */}
        <div className="hidden lg:flex items-center justify-center gap-2 mt-8">
          {stages.slice(0, -1).map((stage, i) => (
            <div key={stage.id} className="flex items-center">
              <div className="w-8 h-px bg-gradient-to-r from-purple-500/50 to-cyan-500/50" />
              <ArrowRight className="w-3 h-3 text-zinc-600 -ml-1" />
              {i < stages.length - 2 && <div className="w-16" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
