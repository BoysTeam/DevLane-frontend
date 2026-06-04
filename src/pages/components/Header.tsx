import { Avatar } from '@radix-ui/react-avatar';
import { Search, Bell, Menu, User } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onMenuClick: () => void;
}

export function Header({ searchQuery, setSearchQuery, onMenuClick }: HeaderProps) {
  return (
    <header className="h-20 bg-zinc-950/30 border-b border-white/5 flex items-center justify-between px-6 md:px-8 z-10 backdrop-blur-md">
      {/* Mobile menu logo */}
      <div className="flex md:hidden items-center gap-3">
        <button onClick={onMenuClick} className="text-zinc-400 hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <img src="/logo.png" alt="CreatorFlow Logo" className="h-24 w-auto object-contain" />
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
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold text-white shadow-md shadow-purple-500/10">
            <Avatar>
              <User />
            </Avatar>
          </div>
          <span className="hidden sm:block text-sm font-medium text-zinc-300">Creator</span>
        </div>
      </div>
    </header>
  );
}
