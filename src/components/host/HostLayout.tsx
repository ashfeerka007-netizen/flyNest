import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { handleAvatarError } from '../../utils/imageUtils';
import {
  LayoutDashboard,
  Building,
  PlusCircle,
  Calendar,
  BookmarkCheck,
  DollarSign,
  Star,
  Settings,
  ArrowLeft,
  LogOut,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

interface HostLayoutProps {
  children: React.ReactNode;
}

export const HostLayout: React.FC<HostLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout, switchRole } = useAuth();
  const { pendingProperties } = useMarketplace();

  // Filter pending properties owned by this host or in system
  const hostPendingCount = pendingProperties.length;

  const navItems = [
    { label: 'Host Dashboard', href: '/host/dashboard', icon: LayoutDashboard },
    { label: 'My Properties', href: '/host/properties', icon: Building, badge: hostPendingCount > 0 ? `${hostPendingCount} pending` : undefined },
    { label: 'Add New Property', href: '/host/properties/new', icon: PlusCircle, highlight: true },
    { label: 'Availability Calendar', href: '/host/calendar', icon: Calendar },
    { label: 'Reservations', href: '/host/bookings', icon: BookmarkCheck },
    { label: 'Earnings & Payouts', href: '/host/earnings', icon: DollarSign },
    { label: 'Guest Reviews', href: '/host/reviews', icon: Star },
    { label: 'Host Settings', href: '/host/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#EEF0F8] flex text-[#1B1F4A]">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Host Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1B1F4A] text-white flex flex-col justify-between transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand & Portal Header */}
          <div className="p-5 border-b border-[#5B6BD6]/50 flex items-center justify-between">
            <Link to="/host/dashboard" className="flex items-center gap-2">
              <BrandLogo variant="light" size="sm" />
              <div className="ml-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#F0A92E] block">
                  Host Workspace
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

          {/* Host Profile Info Card */}
          <div className="p-4 mx-3 my-4 rounded-2xl bg-[#5B6BD6]/30 border border-[#5B6BD6]/40 flex items-center gap-3">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80'}
              alt="Host"
              className="w-10 h-10 rounded-full object-cover border border-[#F0A92E]/60"
              onError={handleAvatarError}
            />
            <div className="overflow-hidden">
              <div className="flex items-center gap-1">
                <p className="text-xs font-bold text-white truncate">{currentUser?.name || 'Tara Varma'}</p>
                <Sparkles className="w-3 h-3 text-[#F0A92E] shrink-0" />
              </div>
              <p className="text-[10px] text-stone-300 truncate">Superhost Sanctuary</p>
            </div>
          </div>

          {/* Navigation Links */}
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
                      ? 'bg-[#F0A92E] text-[#1B1F4A] font-semibold shadow-sm'
                      : item.highlight
                      ? 'bg-[#5B6BD6] text-white hover:bg-[#5B6BD6]/80'
                      : 'text-stone-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-400 text-amber-950">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#5B6BD6]/50 space-y-2">
          <button
            onClick={() => {
              switchRole('guest');
              navigate('/');
            }}
            className="w-full flex items-center gap-2 text-xs text-stone-300 hover:text-white py-2 px-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#F0A92E]" />
            <span>Switch to Guest Website</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-xs text-rose-300 hover:text-rose-200 py-2 px-3 rounded-xl hover:bg-rose-950/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-serif text-lg font-bold text-[#1B1F4A] hidden sm:block">
              Host Management Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/host/properties/new"
              className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-[#1B1F4A] hover:bg-[#5B6BD6] text-white flex items-center gap-1.5 shadow-sm transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#F0A92E]" />
              <span>Create Listing</span>
            </Link>

            <Link
              to="/"
              className="text-xs font-semibold px-3 py-2 rounded-xl border border-stone-200 hover:border-stone-400 text-stone-700 bg-white transition-all hidden sm:inline-flex"
            >
              Live Guest View ↗
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
