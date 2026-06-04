import { Search, Bell, Layout } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <header className="h-20 bg-zinc-950/30 border-b border-white/5 flex items-center justify-between px-6 md:px-8 z-10 backdrop-blur-md">
      {/* Mobile menu logo */}
      <div className="flex md:hidden items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
          <Layout className="w-4 h-4 text-white" />
        </div>
        <span className="font-bold text-base tracking-tight">CreatorFlow</span>
      </div>

      {/* Search bar */}
      <div className="hidden sm:flex items-center gap-3 bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-2 w-72 focus-within:border-purple-500/50 transition-colors">
        <Search className="w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none text-sm text-white placeholder-zinc-500 focus:outline-none w-full"
        />
      </div>

      {/* User profile actions */}
      <div className="flex items-center gap-4">
        <button className="relative w-9 h-9 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-purple-500" />
        </button>
        <div className="h-8 w-px bg-white/5" />
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-sm font-semibold text-white shadow-md shadow-purple-500/10">
            U
          </div>
          <span className="hidden sm:block text-sm font-medium text-zinc-300">Creator</span>
        </div>
      </div>
    </header>
  );
}
