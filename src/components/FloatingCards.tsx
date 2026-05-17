import { motion } from 'framer-motion';
import { Lightbulb, FileText, Video, Wand2, Calendar, CheckCircle2, Clock, Star } from 'lucide-react';

const cards = [
  {
    id: 1,
    title: 'Vlog Idea: Tokyo Night',
    stage: 'Ideas',
    icon: Lightbulb,
    color: 'from-amber-500/20 to-orange-500/20',
    borderColor: 'border-amber-500/30',
    position: { top: '8%', left: '5%' },
    delay: 0,
    duration: 6,
  },
  {
    id: 2,
    title: 'Script: Tech Review Q2',
    stage: 'Script',
    icon: FileText,
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    position: { top: '15%', right: '8%' },
    delay: 0.5,
    duration: 7,
  },
  {
    id: 3,
    title: 'Recording: Podcast #42',
    stage: 'Recording',
    icon: Video,
    color: 'from-red-500/20 to-pink-500/20',
    borderColor: 'border-red-500/30',
    position: { top: '45%', left: '2%' },
    delay: 1,
    duration: 5,
  },
  {
    id: 4,
    title: 'Edit: Tutorial Series',
    stage: 'Editing',
    icon: Wand2,
    color: 'from-purple-500/20 to-violet-500/20',
    borderColor: 'border-purple-500/30',
    position: { top: '55%', right: '3%' },
    delay: 1.5,
    duration: 8,
  },
  {
    id: 5,
    title: 'Schedule: Monday Post',
    stage: 'Scheduled',
    icon: Calendar,
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'border-emerald-500/30',
    position: { top: '78%', left: '10%' },
    delay: 2,
    duration: 6.5,
  },
  {
    id: 6,
    title: 'Published: Week Recap',
    stage: 'Published',
    icon: CheckCircle2,
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
    position: { bottom: '12%', right: '12%' },
    delay: 2.5,
    duration: 7.5,
  },
];

export default function FloatingCards() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: card.delay + 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute"
            style={card.position}
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: card.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: card.delay,
              }}
              className={`glass-card p-3 min-w-[180px] border ${card.borderColor} bg-gradient-to-br ${card.color} pointer-events-auto hover:scale-105 transition-transform duration-300 cursor-default`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                  <Icon className="w-3 h-3 text-white" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-medium">
                  {card.stage}
                </span>
              </div>
              <p className="text-xs text-white font-medium leading-tight">{card.title}</p>
              <div className="flex items-center gap-1 mt-2">
                <Clock className="w-2.5 h-2.5 text-zinc-500" />
                <span className="text-[10px] text-zinc-500">2h ago</span>
                <Star className="w-2.5 h-2.5 text-zinc-600 ml-auto" />
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
