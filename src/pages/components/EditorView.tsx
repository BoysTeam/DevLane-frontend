import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Save } from 'lucide-react';
import type { Card } from '../../query/card';
import { usePatchCard } from '../../query/card';

interface EditorViewProps {
  card: Card;
  onClose: () => void;
}

export function EditorView({ card, onClose }: EditorViewProps) {
  const patchCardMutation = usePatchCard(card.id);
  const [content, setContent] = useState(card.script_content || '');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved');

  // Debounced auto-save triggers whenever content changes
  useEffect(() => {
    if (content === card.script_content) {
      setSaveStatus('saved');
      return;
    }
    setSaveStatus('saving');
    
    const timer = setTimeout(() => {
      patchCardMutation.mutate(
        { script: content },
        {
          onSuccess: () => {
            setSaveStatus('saved');
          },
          onError: () => {
            setSaveStatus('error');
          }
        }
      );
    }, 1500); // 1.5-second debounce window

    return () => clearTimeout(timer);
  }, [content, card.id, card.script_content, patchCardMutation]);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 right-0 z-50 w-full max-w-4xl bg-zinc-950/95 border-l border-white/5 flex flex-col shadow-2xl backdrop-blur-md"
    >
      {/* Editor Header */}
      <div className="h-20 border-b border-white/5 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div>
            <h3 className="font-bold text-base truncate max-w-md">{card.title}</h3>
            {/* Auto-Saved Pulse Status */}
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${
                saveStatus === 'saved' ? 'bg-emerald-400 animate-pulse' :
                saveStatus === 'saving' ? 'bg-amber-400 animate-spin border border-dashed border-zinc-900' : 'bg-red-500'
              }`} />
              <span className="text-[10px] font-semibold text-zinc-500">
                {saveStatus === 'saved' && 'Auto-Saved'}
                {saveStatus === 'saving' && 'Saving...'}
                {saveStatus === 'error' && 'Save Error'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-zinc-900 border border-white/5 text-purple-400 px-3 py-1 rounded-full font-semibold">
            {card.platform}
          </span>
        </div>
      </div>

      {/* Markdown Script Editor */}
      <div className="flex-1 flex p-6 gap-6 overflow-hidden">
        {/* Input Panel */}
        <div className="flex-1 flex flex-col space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-500 font-semibold tracking-wider uppercase mb-1">
            <span>Edit Script Script Content</span>
            <span className="flex items-center gap-1">
              <Save className="w-3.5 h-3.5" /> Ctrl+S to save
            </span>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="# Script Content&#10;&#10;Type your video script here using Markdown structure..."
            className="flex-1 bg-zinc-900/40 border border-white/5 rounded-2xl p-6 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500/50 resize-none font-mono leading-relaxed"
          />
        </div>

        {/* Live Preview Panel */}
        <div className="hidden lg:flex flex-col w-80 bg-zinc-900/20 border border-white/5 rounded-2xl p-6 overflow-y-auto">
          <span className="text-xs text-zinc-500 font-semibold tracking-wider uppercase mb-4 block">Render Preview</span>
          <article className="prose prose-invert prose-sm text-zinc-400 space-y-4 max-w-none">
            {content ? (
              content.split('\n').map((line, idx) => {
                if (line.startsWith('# ')) {
                  return <h1 key={idx} className="text-lg font-bold text-white pt-2 border-b border-white/5 pb-1">{line.slice(2)}</h1>;
                }
                if (line.startsWith('## ')) {
                  return <h2 key={idx} className="text-base font-bold text-white pt-1">{line.slice(3)}</h2>;
                }
                if (line.trim() === '') {
                  return <div key={idx} className="h-2" />;
                }
                return <p key={idx} className="text-xs leading-relaxed text-zinc-400">{line}</p>;
              })
            ) : (
              <p className="text-zinc-600 italic">No content written yet. Preview will generate here.</p>
            )}
          </article>
        </div>
      </div>
    </motion.div>
  );
}
