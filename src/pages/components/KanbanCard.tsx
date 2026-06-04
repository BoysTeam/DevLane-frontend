import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Clock, Trash2 } from 'lucide-react';
import type { Card } from '../../query/card';

interface KanbanCardProps {
  card: Card;
  onClick: () => void;
  onDelete: (e: React.MouseEvent, id: string) => void;
  isOverlay?: boolean;
}

export function KanbanCard({ card, onClick, onDelete, isOverlay }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: card.id,
    data: card,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={`bg-zinc-900/60 hover:bg-zinc-900 border hover:border-white/10 p-4 rounded-xl shadow-md cursor-grab active:cursor-grabbing hover:shadow-purple-500/5 transition-all duration-300 group relative ${
        isDragging ? 'opacity-40 ring-2 ring-purple-500 scale-95 border-purple-500/50 z-50' : 'border-white/5'
      } ${isOverlay ? 'scale-105 opacity-90 ring-2 ring-purple-500 shadow-2xl z-50 rotate-3' : ''}`}
    >
      <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-zinc-950 border border-white/5 text-purple-400">
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
        onClick={(e) => {
          e.stopPropagation();
          onDelete(e, card.id);
        }}
        onPointerDown={(e) => e.stopPropagation()} // Prevent dragging when clicking delete
        className="absolute bottom-3 right-3 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-white/5"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
