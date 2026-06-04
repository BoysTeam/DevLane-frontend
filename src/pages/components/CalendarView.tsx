import { motion } from 'framer-motion';
import type { Card } from '../../query/card';

interface CalendarViewProps {
  cardsList: Card[];
  onCardClick: (card: Card) => void;
}

export function CalendarView({ cardsList, onCardClick }: CalendarViewProps) {
  return (
    <motion.div
      key="calendar"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Publish Schedule</h2>
        <p className="text-sm text-zinc-400">Calendar view of scheduled publications</p>
      </div>

      <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 backdrop-blur-md">
        <div className="grid grid-cols-7 gap-4 mb-4 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <span key={d} className="text-xs font-semibold text-zinc-500 uppercase">{d}</span>
          ))}
        </div>
        {/* Mock Month Grid for June 2026 */}
        <div className="grid grid-cols-7 gap-4 h-[420px] items-stretch">
          {Array.from({ length: 30 }).map((_, i) => {
            const day = i + 1;
            const dayCards = cardsList.filter((_, idx) => (idx % 30) + 1 === day);
            return (
              <div key={i} className="bg-zinc-900/30 border border-white/5 rounded-xl p-3 flex flex-col justify-between hover:bg-zinc-900/50 transition-colors">
                <span className="text-xs font-bold text-zinc-600 block">{day}</span>
                <div className="space-y-1 mt-2 flex-1 overflow-y-auto max-h-[60px]">
                  {dayCards.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => onCardClick(c)}
                      className="bg-purple-950/30 border border-purple-500/20 text-[9px] font-medium text-purple-300 px-1.5 py-0.5 rounded truncate cursor-pointer hover:bg-purple-900/40 transition-colors"
                    >
                      {c.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
