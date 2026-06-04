import { useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';

interface KanbanColumnProps {
  id: string;
  title: string;
  count: number;
  onAddCardClick: () => void;
  children: React.ReactNode;
}

export function KanbanColumn({ id, title, count, onAddCardClick, children }: KanbanColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col bg-zinc-950/30 border rounded-2xl p-4 min-h-[480px] w-full transition-colors duration-300 focus-within:bg-zinc-900/10 ${
        isOver ? 'border-purple-500/50 bg-purple-500/5' : 'border-white/5'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              id === 'IDEA' ? 'bg-purple-500' :
              id === 'SCRIPTING' ? 'bg-blue-500' :
              id === 'EDITING' ? 'bg-amber-500' : 'bg-emerald-500'
            }`}
          />
          <h3 className="font-semibold text-sm text-zinc-300 tracking-wider">
            {title}
          </h3>
        </div>
        <span className="text-xs bg-zinc-900 px-2 py-0.5 rounded-md border border-white/5 font-semibold text-zinc-500">
          {count}
        </span>
      </div>

      <div className="space-y-3 overflow-y-auto flex-1 max-h-[600px] pr-1">
        {children}
      </div>

      <button
        onClick={onAddCardClick}
        className="w-full mt-4 py-2 border border-dashed border-white/5 hover:border-white/10 rounded-xl text-xs text-zinc-500 hover:text-white flex items-center justify-center gap-2 hover:bg-white/[0.02] transition-all duration-300"
      >
        <Plus className="w-3.5 h-3.5" />
        Add Card
      </button>
    </div>
  );
}
