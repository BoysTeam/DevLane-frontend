import { motion } from 'framer-motion';
import {
  LayoutGrid,
  BarChart3,
  Calendar as CalendarIcon,
  Settings as SettingsIcon,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Layout,
} from 'lucide-react';

const navItems = [
  { id: 'board', label: 'Board', icon: LayoutGrid },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

interface SidebarProps {
  activeTab: 'board' | 'analytics' | 'calendar' | 'settings';
  setActiveTab: (tab: 'board' | 'analytics' | 'calendar' | 'settings') => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  onLogout: () => void;
}

export function Sidebar({
  activeTab,
  setActiveTab,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  onLogout,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <motion.aside
        animate={{ width: isSidebarCollapsed ? 80 : 256 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed md:relative flex-col bg-zinc-950/90 md:bg-zinc-950/60 border-r border-white/5 h-screen z-50 backdrop-blur-md overflow-hidden transition-transform duration-300 flex ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/5">
          <div className="flex items-center overflow-hidden">
            {isSidebarCollapsed ? (
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                <img src="/logo.png" alt="Logo" className="h-6 w-auto object-contain opacity-0" />
              </div>
            ) : (
              <img src="/logo.png" alt="CreatorFlow Logo" className="h-20 w-auto object-contain flex-shrink-0" />
            )}
          </div>
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-7 h-7 rounded-lg border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Sidebar Menu Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative ${isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isSidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                {isActive && (
                  <motion.div
                    layoutId="sidebarActiveIndicator"
                    className="absolute inset-0 bg-white/[0.05] rounded-xl -z-10 border border-white/5"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Profile / Logout */}
        <div className="p-4 border-t border-white/5 bg-zinc-950/40">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-zinc-400 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span className="text-sm font-medium">Log out</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
