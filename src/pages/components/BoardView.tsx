import type { MouseEvent, DragEvent } from 'react';
import { motion } from 'framer-motion';
import { Plus, Clock, Trash2 } from 'lucide-react';
import type { Card } from '../../query/card';

interface BoardViewProps {
  filteredCards: Card[];
  onAddIdeaClick: () => void;
  onAddCardClick: (status: string) => void;
  onCardClick: (card: Card) => void;
  onDeleteCard: (e: MouseEvent, id: string) => void;
  onDragStart: (e: DragEvent, card: Card) => void;
  onDragEnd: (e: any) => void;
  onDragOver: (e: DragEvent) => void;
  onDrop: (e: DragEvent, targetStatus: string) => void;
  isUpdating?: boolean;
  draggedCardId?: string | null;
}

export function BoardView({
  filteredCards,
  onAddIdeaClick,
  onAddCardClick,
  onCardClick,
  onDeleteCard,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  isUpdating,
  draggedCardId,
}: BoardViewProps) {
  return (
    <motion.div
      key="board"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className={`space-y-6 h-full flex flex-col ${isUpdating ? 'opacity-50 pointer-events-none transition-opacity duration-300' : 'transition-opacity duration-300'}`}
    >
      {/* Workspace Sub Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">The Kanban Board</h2>
          <p className="text-sm text-zinc-400">Manage your video workflow and ideas</p>
        </div>
        <button
          onClick={onAddIdeaClick}
          className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl text-sm font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          Add Idea
        </button>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 min-h-[500px] items-start pb-12">
        {/* Columns structure */}
        {[
          { status: 'IDEA', border: 'border-purple-500/30', bg: 'bg-purple-950/10', title: 'IDEA' },
          { status: 'SCRIPTING', border: 'border-blue-500/30', bg: 'bg-blue-950/10', title: 'SCRIPTING' },
          { status: 'EDITING', border: 'border-amber-500/30', bg: 'bg-amber-950/10', title: 'EDITING' },
          { status: 'PUBLISHED', border: 'border-emerald-500/30', bg: 'bg-emerald-950/10', title: 'PUBLISHED' },
        ].map((col) => {
          const colCards = filteredCards.filter(
            (card) => card.status?.toUpperCase() === col.status
          );
          return (
            <div
              key={col.status}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, col.status)}
              className={`flex flex-col bg-zinc-950/30 border border-white/5 rounded-2xl p-4 min-h-[480px] w-full transition-colors duration-300 focus-within:bg-zinc-900/10`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    col.status === 'IDEA' ? 'bg-purple-500' :
                    col.status === 'SCRIPTING' ? 'bg-blue-500' :
                    col.status === 'EDITING' ? 'bg-amber-500' : 'bg-emerald-500'
                  }`} />
                  <h3 className="font-semibold text-sm text-zinc-300 tracking-wider">
                    {col.title}
                  </h3>
                </div>
                <span className="text-xs bg-zinc-900 px-2 py-0.5 rounded-md border border-white/5 font-semibold text-zinc-500">
                  {colCards.length}
                </span>
              </div>

              <div className="space-y-3 overflow-y-auto flex-1 max-h-[600px] pr-1">
                {colCards.map((card) => (
                  <motion.div
                    key={card.id}
                    draggable
                    onDragStart={(e: any) => onDragStart(e, card)}
                    onDragEnd={onDragEnd}
                    onClick={() => onCardClick(card)}
                    layoutId={`card-${card.id}`}
                    className={`bg-zinc-900/60 hover:bg-zinc-900 border hover:border-white/10 p-4 rounded-xl shadow-md cursor-grab active:cursor-grabbing hover:shadow-purple-500/5 transition-all duration-300 group relative ${
                      draggedCardId === card.id
                        ? 'opacity-40 ring-2 ring-purple-500 scale-95 border-purple-500/50 z-50'
                        : 'border-white/5'
                    }`}
                  >
                    <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-zinc-950 border border-white/5 text-purple-400`}>
                      {card.platform || 'YouTube'}
                    </span>
                    <h4 className="font-medium text-sm text-white mt-2 leading-snug group-hover:text-purple-300 transition-colors">
                      {card.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-4">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(card.created_at || Date.now()).toLocaleDateString()}</span>
                    </div>
                    <button
                      onClick={(e) => onDeleteCard(e, card.id)}
                      className="absolute bottom-3 right-3 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-white/5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
                {colCards.length === 0 && (
                  <div className="h-28 border border-dashed border-white/5 rounded-xl flex items-center justify-center text-xs text-zinc-600">
                    Drag files here
                  </div>
                )}
              </div>
              
              <button
                onClick={() => onAddCardClick(col.status)}
                className="w-full mt-4 py-2 border border-dashed border-white/5 hover:border-white/10 rounded-xl text-xs text-zinc-500 hover:text-white flex items-center justify-center gap-2 hover:bg-white/[0.02] transition-all duration-300"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Card
              </button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
