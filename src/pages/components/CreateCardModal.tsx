import { motion, AnimatePresence } from 'framer-motion';

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  newCardTitle: string;
  setNewCardTitle: (title: string) => void;
  newCardPlatform: string;
  setNewCardPlatform: (platform: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
}

export function CreateCardModal({
  isOpen,
  onClose,
  newCardTitle,
  setNewCardTitle,
  newCardPlatform,
  setNewCardPlatform,
  onSubmit,
  isPending,
}: CreateCardModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-zinc-950 border border-white/5 w-full max-w-md rounded-2xl p-6 shadow-2xl space-y-6"
          >
            <h3 className="text-lg font-bold">Create content card</h3>
            
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Content Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 10 Python Tricks You Didn't Know"
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">Target Platform</label>
                <select
                  value={newCardPlatform}
                  onChange={(e) => setNewCardPlatform(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="YouTube">YouTube</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Instagram">Instagram</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl border border-white/5 text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isPending ? 'Creating...' : 'Create Card'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
