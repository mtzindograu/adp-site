'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Newspaper,
  Users,
  Calendar,
  LogOut,
  X,
  Shield,
  ChevronLeft,
  Menu,
} from 'lucide-react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminNews from './AdminNews';
import AdminPlayers from './AdminPlayers';
import AdminMatches from './AdminMatches';

type AdminView = 'dashboard' | 'news' | 'players' | 'matches';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems: { key: AdminView; label: string; icon: React.ReactNode }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { key: 'news', label: 'Notícias', icon: <Newspaper className="w-5 h-5" /> },
  { key: 'players', label: 'Jogadores', icon: <Users className="w-5 h-5" /> },
  { key: 'matches', label: 'Jogos', icon: <Calendar className="w-5 h-5" /> },
];

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (isOpen) {
      checkAuth();
    }
  }, [isOpen]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth');
      const data = await res.json();
      if (data.authenticated) {
        setAuthenticated(true);
      }
    } catch {
      // not authenticated
    } finally {
      setAuthChecked(true);
    }
  };

  const handleLogin = () => {
    setAuthenticated(true);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      setAuthenticated(false);
      setAuthChecked(false);
    } catch {
      // handle error
    } finally {
      setLoggingOut(false);
    }
  };

  const handleClose = () => {
    setActiveView('dashboard');
    onClose();
  };

  if (!isOpen) return null;

  if (!authChecked) {
    return (
      <div className="fixed inset-0 z-50 bg-[#060F24] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#3FA9F5] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="fixed inset-0 z-50">
        <AdminLogin onLogin={handleLogin} />
        <button
          onClick={handleClose}
          className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-[#0A1F44]/80 text-slate-400 hover:text-white hover:bg-[#1E3A5F] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'news':
        return <AdminNews />;
      case 'players':
        return <AdminPlayers />;
      case 'matches':
        return <AdminMatches />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060F24] flex overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-40 h-full
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-16'}
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-64' : 'w-0 lg:w-16'}
          bg-[#0A1F44] border-r border-[#1E3A5F] flex flex-col
          flex-shrink-0
        `}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#1E3A5F]">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#3FA9F5]/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-[#3FA9F5]" />
              </div>
              <div>
                <span className="text-white font-bold text-sm block leading-tight">ADP Admin</span>
                <span className="text-[#3FA9F5] text-[10px] tracking-wider">PAINEL</span>
              </div>
            </div>
          ) : (
            <div className="mx-auto">
              <Shield className="w-5 h-5 text-[#3FA9F5]" />
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActiveView(item.key);
                if (window.innerWidth < 1024) setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${
                  activeView === item.key
                    ? 'bg-[#3FA9F5]/15 text-[#3FA9F5] border border-[#3FA9F5]/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }
                ${!sidebarOpen ? 'lg:justify-center lg:px-2' : ''}
              `}
              title={!sidebarOpen ? item.label : undefined}
            >
              <span className={activeView === item.key ? 'text-[#3FA9F5]' : ''}>{item.icon}</span>
              {sidebarOpen && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#1E3A5F]">
          <Button
            onClick={handleLogout}
            disabled={loggingOut}
            variant="ghost"
            className={`
              w-full flex items-center gap-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10
              ${!sidebarOpen ? 'lg:justify-center lg:px-2' : ''}
            `}
            title={!sidebarOpen ? 'Sair' : undefined}
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && (
              <span className="text-sm font-medium">
                {loggingOut ? 'Saindo...' : 'Sair'}
              </span>
            )}
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-[#0A1F44]/80 backdrop-blur-md border-b border-[#1E3A5F] flex items-center justify-between px-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                {sidebarOpen ? (
                  <ChevronLeft className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            )}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-500 hidden sm:inline">Admin</span>
              <span className="text-slate-600 hidden sm:inline">/</span>
              <span className="text-white font-medium">
                {navItems.find((n) => n.key === activeView)?.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleClose}
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white hover:bg-white/5 gap-2"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Fechar Painel</span>
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{renderContent()}</main>
      </div>
    </div>
  );
}
