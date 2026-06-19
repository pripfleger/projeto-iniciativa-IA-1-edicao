import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import type { AppUser } from '../App';
import { LogOut, Bell, Menu, X, ChevronRight, Accessibility } from 'lucide-react';
import logoImg from '../../imports/mundo_unifecaf_1.png';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

interface LayoutProps {
  user: AppUser;
  navItems: NavItem[];
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  roleLabel: string;
  roleBadgeColor: string;
  children: React.ReactNode;
}

const ROLE_AVATARS: Record<string, string> = {
  aluno: 'AB',
  colaborador: 'CE',
  coordenador: 'MO',
  admin: 'RN',
};

export default function Layout({
  user,
  navItems,
  currentPage,
  onPageChange,
  onLogout,
  roleLabel,
  roleBadgeColor,
  children,
}: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const initials = ROLE_AVATARS[user.role] || user.name.slice(0, 2).toUpperCase();
  const currentNav = navItems.find(n => n.id === currentPage);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F4FB]" style={{ fontSize: `${fontSize}px` }}>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-30 w-64 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: '#1E1B4B' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <img src={logoImg} alt="Mundo UniFECAF" className="w-9 h-9 object-contain flex-shrink-0" />
          <div>
            <div className="text-white font-bold leading-tight text-base" style={{ fontFamily: 'Nunito, sans-serif' }}>Mundo</div>
            <div className="text-violet-300 text-xs leading-tight">UniFECAF</div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-violet-300 hover:text-white lg:hidden"
            aria-label="Fechar menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 pb-3 overflow-y-auto space-y-0.5">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { onPageChange(item.id); setSidebarOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left group"
                style={{
                  background: active ? '#7C3AED' : 'transparent',
                  color: active ? '#fff' : '#C4B5FD',
                }}
                aria-current={active ? 'page' : undefined}
              >
                <Icon size={18} className="flex-shrink-0" />
                <span className="text-sm font-medium flex-1">{item.label}</span>
                {item.badge ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white">
                    {item.badge}
                  </span>
                ) : null}
                {active && <ChevronRight size={14} className="opacity-60" />}
              </button>
            );
          })}
        </nav>

        {/* User info + logout */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
              style={{ background: roleBadgeColor }}
            >
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-white truncate leading-tight">{user.name.split(' ').slice(0, 2).join(' ')}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full leading-none"
                  style={{ background: roleBadgeColor + '35', color: roleBadgeColor }}
                >
                  {roleLabel}
                </span>
              </div>
              <div className="text-[10px] text-white/30 truncate mt-0.5 leading-tight">{user.polo.split('—')[0].trim()}</div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-violet-300 hover:text-white hover:bg-white/10 text-sm transition-colors"
          >
            <LogOut size={15} />
            Sair do sistema
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white border-b border-violet-100 px-4 lg:px-6 h-14 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-800 p-1"
              aria-label="Abrir menu"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="text-violet-600 font-medium">{roleLabel}</span>
              <span>/</span>
              <span className="text-gray-700 font-medium">{currentNav?.label || 'Início'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Accessibility */}
            <div className="hidden sm:flex items-center gap-1 border border-gray-200 rounded-lg p-1">
              <button
                onClick={() => setFontSize(f => Math.max(12, f - 2))}
                className="w-6 h-6 rounded text-gray-500 hover:bg-gray-100 text-xs font-bold flex items-center justify-center"
                title="Diminuir fonte"
              >A-</button>
              <Accessibility size={12} className="text-gray-400" />
              <button
                onClick={() => setFontSize(f => Math.min(24, f + 2))}
                className="w-6 h-6 rounded text-gray-500 hover:bg-gray-100 text-xs font-bold flex items-center justify-center"
                title="Aumentar fonte"
              >A+</button>
            </div>

            {/* Notifications */}
            <button className="relative w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-violet-50 hover:text-violet-600 transition-colors" aria-label="Notificações">
              <Bell size={17} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>

            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
              style={{ background: roleBadgeColor }}
            >
              {initials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
