import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { handleAvatarError } from '../../utils/imageUtils';
import {
  ShieldAlert,
  Users,
  CheckCircle,
  Building2,
  CalendarDays,
  CreditCard,
  Percent,
  BarChart3,
  Sliders,
  LogOut,
  ArrowLeft,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, switchRole } = useAuth();
  const { pendingProperties } = useMarketplace();

  const pendingCount = pendingProperties.length;

  const navItems = [
    { label: 'Admin Dashboard', href: '/admin/dashboard', icon: BarChart3 },
    {
      label: 'Listing Approvals',
      href: '/admin/approvals',
      icon: CheckCircle,
      badge: pendingCount > 0 ? `${pendingCount} pending` : undefined,
    },
    { label: 'All Properties', href: '/admin/properties', icon: Building2 },
    { label: 'Global Reservations', href: '/admin/bookings', icon: CalendarDays },
    { label: 'User Directory', href: '/admin/users', icon: Users },
    { label: 'Payments & Ledger', href: '/admin/payments', icon: CreditCard },
    { label: 'Commissions & Fees', href: '/admin/commissions', icon: Percent },
    { label: 'Reports & Analytics', href: '/admin/reports', icon: BarChart3 },
    { label: 'System Settings', href: '/admin/settings', icon: Sliders },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F8F7F1] flex text-[#252A27]">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#252A27] text-white flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo & Portal Tag */}
          <div className="p-5 border-b border-stone-700/60 flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <BrandLogo variant="light" size="sm" />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A66A] block">
                  Administration
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-stone-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Admin Identity Card */}
          <div className="p-4 mx-3 my-4 rounded-2xl bg-stone-800/80 border border-stone-700 flex items-center gap-3">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'}
              alt="Admin"
              className="w-10 h-10 rounded-full object-cover border border-[#C5A66A]/60"
              onError={handleAvatarError}
            />
            <div className="overflow-hidden">
              <div className="flex items-center gap-1">
                <p className="text-xs font-bold text-white truncate">{currentUser?.name || 'Vikramaditya Rao'}</p>
                <Sparkles className="w-3 h-3 text-[#C5A66A] shrink-0" />
              </div>
              <p className="text-[10px] text-purple-300 truncate font-semibold uppercase">Super Administrator</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#173D32] text-[#C5A66A] border border-[#2F7058] font-bold shadow-sm'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-400 text-amber-950 animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Switcher & Logout */}
        <div className="p-4 border-t border-stone-700/60 space-y-2">
          <button
            onClick={() => {
              switchRole('guest');
              navigate('/');
            }}
            className="w-full flex items-center gap-2 text-xs text-stone-300 hover:text-white py-2 px-3 rounded-xl hover:bg-stone-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A66A]" />
            <span>Switch to Guest Website</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 py-2 px-3 rounded-xl hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Exit Admin</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Admin Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="font-serif text-lg font-bold text-[#173D32]">
                Marketplace Trust & Safety Console
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {pendingCount > 0 && (
              <Link
                to="/admin/approvals"
                className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5 hover:bg-amber-200 transition-all"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                <span>{pendingCount} Listing Approvals Pending</span>
              </Link>
            )}

            <Link
              to="/"
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-stone-200 hover:border-stone-400 text-stone-700 bg-white transition-all hidden sm:inline-flex"
            >
              Public Guest Site ↗
            </Link>
          </div>
        </header>

        {/* Admin Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
