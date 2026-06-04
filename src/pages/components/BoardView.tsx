import type { MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import type { Card } from '../../query/card';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';

interface BoardViewProps {
  filteredCards: Card[];
  onAddIdeaClick: () => void;
  onAddCardClick: (status: string) => void;
  onCardClick: (card: Card) => void;
  onDeleteCard: (e: MouseEvent, id: string) => void;
  onDragStart: (e: any) => void;
  onDragEnd: (e: any) => void;
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
  isUpdating,
  draggedCardId,
}: BoardViewProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const draggedCard = draggedCardId ? filteredCards.find((c) => c.id === draggedCardId) : null;

  return (
    <motion.div
      key="board"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className={`space-y-6 h-full flex flex-col relative transition-opacity duration-300 ${isUpdating ? 'pointer-events-none' : ''}`}
    >
      {/* Loading Overlay */}
      {isUpdating && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/40 backdrop-blur-[2px] rounded-2xl">
          <div className="w-10 h-10 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-3" />
          <p className="text-sm font-semibold text-purple-400 animate-pulse">Updating status...</p>
        </div>
      )}

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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        {/* Kanban Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 min-h-[500px] items-start pb-12">
          {[
            { status: 'IDEA', title: 'IDEA' },
            { status: 'SCRIPTING', title: 'SCRIPTING' },
            { status: 'EDITING', title: 'EDITING' },
            { status: 'PUBLISHED', title: 'PUBLISHED' },
          ].map((col) => {
            const colCards = filteredCards.filter(
              (card) => card.status?.toUpperCase() === col.status
            );
            return (
              <KanbanColumn
                key={col.status}
                id={col.status}
                title={col.title}
                count={colCards.length}
                onAddCardClick={() => onAddCardClick(col.status)}
              >
                {colCards.map((card) => (
                  <KanbanCard
                    key={card.id}
                    card={card}
                    onClick={() => onCardClick(card)}
                    onDelete={onDeleteCard}
                  />
                ))}
                {colCards.length === 0 && (
                  <div className="h-28 border border-dashed border-white/5 rounded-xl flex items-center justify-center text-xs text-zinc-600">
                    Drag files here
                  </div>
                )}
              </KanbanColumn>
            );
          })}
        </div>

        <DragOverlay dropAnimation={null}>
          {draggedCard ? (
            <KanbanCard
              card={draggedCard}
              onClick={() => {}}
              onDelete={() => {}}
              isOverlay
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </motion.div>
  );
}
