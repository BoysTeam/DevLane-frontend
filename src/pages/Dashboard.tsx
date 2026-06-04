import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { api } from '../lib/axios';
import { queryKeys } from '../query/keys';
import { useGetCard, useDeleteCard } from '../query/card';
import { useCreateBoard } from '../query/board';
import type { Card } from '../query/card';

import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { BoardView } from './components/BoardView';
import { AnalyticsView } from './components/AnalyticsView';
import { CalendarView } from './components/CalendarView';
import { SettingsView } from './components/SettingsView';
import { CreateCardModal } from './components/CreateCardModal';
import { EditorView } from './components/EditorView';

export default function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<'board' | 'analytics' | 'calendar' | 'settings'>('board');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeEditorCard, setActiveEditorCard] = useState<Card | null>(null);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);

  // Form states for creating a new card
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardPlatform, setNewCardPlatform] = useState('YouTube');
  console.log(localStorage.getItem('jwt-token'))
  // Fetch cards data from backend
  const { data: cardsData, isLoading, refetch } = useGetCard();

  // Custom mutations
  const createCardMutation = useCreateBoard();
  const deleteCardMutation = useDeleteCard();

  // Direct board-level update mutation for status/drag-and-drop
  const updateCardMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { title: string; platform: string; status: string } }) =>
      api.put<Card>(`board/cards/${id}`, data).then((res) => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cards.mine });
      queryClient.invalidateQueries({ queryKey: queryKeys.cards.detail(variables.id) });
      toast.success('Card status updated');
    },
    onError: () => {
      toast.error('Failed to update card status');
    }
  });

  // Extract list of cards reliably from varying backend response structures
  const cardsList = useMemo<Card[]>(() => {
    if (!cardsData) return [];
    if (Array.isArray(cardsData)) return cardsData;
    if (Array.isArray((cardsData as any).cards)) return (cardsData as any).cards;
    if (typeof cardsData === 'object' && (cardsData as any).id) return [cardsData as any];
    return [];
  }, [cardsData]);

  // Filtered cards based on global search
  const filteredCards = useMemo(() => {
    return cardsList.filter((card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.platform.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cardsList, searchQuery]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('jwt-token');
    toast.success('Logged out successfully');
    navigate('/auth');
  };

  // Drag and Drop Handlers
  const handleDragStart = (e: React.DragEvent, card: Card) => {
    e.dataTransfer.setData('text/plain', card.id);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedCardId(card.id);
  };

  const handleDragEnd = () => {
    setDraggedCardId(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('text/plain');
    const draggedCard = cardsList.find((c) => c.id === cardId);

    if (draggedCard && draggedCard.status.toUpperCase() !== targetStatus.toUpperCase()) {
      updateCardMutation.mutate({
        id: cardId,
        data: {
          title: draggedCard.title,
          platform: draggedCard.platform,
          status: targetStatus,
        }
      });
    }
  };

  const handleDeleteCard = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteCardMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Card deleted');
        refetch();
      }
    });
  };

  // Handle new card submission
  const handleCreateCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardTitle.trim()) {
      toast.error('Card title is required');
      return;
    }

    createCardMutation.mutate(
      {
        title: newCardTitle,
        platform: newCardPlatform,
      },
      {
        onSuccess: () => {
          toast.success('New content card created!');
          setIsCreateModalOpen(false);
          setNewCardTitle('');
          refetch(); // Reload card list
        },
        onError: (err: any) => {
          toast.error(err.response?.data?.message || 'Failed to create card');
        }
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex overflow-hidden font-sans">
      {/* Background ambient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none" />

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Navbar */}
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Dynamic Tab Panels */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {activeTab === 'board' && (
                <BoardView
                  filteredCards={filteredCards}
                  onAddIdeaClick={() => setIsCreateModalOpen(true)}
                  onAddCardClick={(status) => {
                    setNewCardPlatform(status === 'PUBLISHED' ? 'YouTube' : 'YouTube');
                    setIsCreateModalOpen(true);
                  }}
                  onCardClick={(card) => setActiveEditorCard(card)}
                  onDeleteCard={handleDeleteCard}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  isUpdating={updateCardMutation.isPending}
                  draggedCardId={draggedCardId}
                />
              )}

              {activeTab === 'analytics' && (
                <AnalyticsView cardsList={cardsList} />
              )}

              {activeTab === 'calendar' && (
                <CalendarView cardsList={cardsList} onCardClick={(card) => setActiveEditorCard(card)} />
              )}

              {activeTab === 'settings' && (
                <SettingsView />
              )}
            </AnimatePresence>
          )}
        </main>
      </div>

      {/* Slide-over Script Editor Component */}
      <AnimatePresence>
        {activeEditorCard && (
          <EditorView
            card={activeEditorCard}
            onClose={() => {
              setActiveEditorCard(null);
              refetch(); // Refresh board list when closing editor
            }}
          />
        )}
      </AnimatePresence>

      {/* Create Card Dialog Modal */}
      <CreateCardModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        newCardTitle={newCardTitle}
        setNewCardTitle={setNewCardTitle}
        newCardPlatform={newCardPlatform}
        setNewCardPlatform={setNewCardPlatform}
        onSubmit={handleCreateCardSubmit}
        isPending={createCardMutation.isPending}
      />
    </div>
  );
}
