import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';
import { handleAvatarError } from '../../utils/imageUtils';
import {
  Heart,
  User as UserIcon,
  Menu,
  X,
  Compass,
  MapPin,
  HelpCircle,
  LogOut,
  CalendarCheck,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  transparentAtTop?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ transparentAtTop = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const { currentUser, isAuthenticated, logout, switchRole } = useAuth();
  const { wishlistIds } = useMarketplace();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const shouldBeTransparent = transparentAtTop && isHome && !isScrolled;

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { label: 'Explore', href: '/explore', icon: Compass },
    { label: 'Destinations', href: '/destinations', icon: MapPin },
    { label: 'About', href: '/about' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Help', href: '/help', icon: HelpCircle },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        shouldBeTransparent
          ? 'bg-gradient-to-b from-black/60 via-black/25 to-transparent text-white pt-4 pb-4'
          : 'bg-[#F8F7F1]/95 backdrop-blur-md border-b border-[#E8E0D1] shadow-xs text-[#252A27] py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <BrandLogo
            variant={shouldBeTransparent ? 'light' : 'forest'}
            size="md"
            showTagline={true}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`transition-colors py-1 relative hover:text-[#C5A66A] ${
                  isActive
                    ? 'text-[#C5A66A] font-semibold'
                    : shouldBeTransparent
                    ? 'text-white/90'
                    : 'text-[#252A27]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C5A66A] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons & Auth */}
        <div className="flex items-center gap-3">
          {/* Become a Host Link */}
          <Link
            to="/become-a-host"
            className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full border transition-all ${
              shouldBeTransparent
                ? 'border-white/30 hover:border-white text-white hover:bg-white/10'
                : 'border-[#173D32]/20 hover:border-[#173D32] text-[#173D32] hover:bg-[#173D32]/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A66A]" />
            <span>Become a Host</span>
          </Link>

          {/* Wishlist Button */}
          <Link
            to="/wishlist"
            className={`relative p-2 rounded-full transition-colors ${
              shouldBeTransparent
                ? 'hover:bg-white/10 text-white'
                : 'hover:bg-stone-200/60 text-[#252A27]'
            }`}
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistIds.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#C5A66A] text-[#173D32] text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistIds.length}
              </span>
            )}
          </Link>

          {/* User Account / Login */}
          <div className="relative">
            {isAuthenticated && currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`flex items-center gap-2 p-1.5 pr-2.5 rounded-full border transition-all cursor-pointer ${
                    shouldBeTransparent
                      ? 'border-white/30 bg-black/20 hover:bg-black/40 text-white'
                      : 'border-stone-200 bg-white hover:border-stone-300 text-[#252A27] shadow-xs'
                  }`}
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover"
                    onError={handleAvatarError}
                  />
                  <span className="text-xs font-medium max-w-[80px] truncate hidden md:inline">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 text-stone-800 z-50 animate-scale-up text-left">
                    <div className="px-4 py-2.5 border-b border-stone-100">
                      <p className="text-xs font-semibold text-[#173D32] truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-stone-400 truncate font-mono">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider rounded-md bg-[#173D32]/10 text-[#173D32]">
                        {currentUser.role}
                      </span>
                    </div>

                    <Link
                      to="/my-bookings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs hover:bg-[#F8F7F1] text-stone-700 hover:text-[#173D32]"
                    >
                      <CalendarCheck className="w-4 h-4 text-[#2F7058]" />
                      My Reservations
                    </Link>

                    <Link
                      to="/wishlist"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs hover:bg-[#F8F7F1] text-stone-700 hover:text-[#173D32]"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      Wishlist ({wishlistIds.length})
                    </Link>

                    <Link
                      to="/account"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs hover:bg-[#F8F7F1] text-stone-700 hover:text-[#173D32]"
                    >
                      <UserIcon className="w-4 h-4 text-stone-400" />
                      Account Settings
                    </Link>

                    {/* Quick Portal Switch Link if Host/Admin */}
                    <div className="border-t border-stone-100 my-1 pt-1">
                      <button
                        onClick={() => {
                          switchRole('host');
                          setUserDropdownOpen(false);
                          navigate('/host/dashboard');
                        }}
                        className="w-full text-left flex items-center justify-between px-4 py-1.5 text-xs text-[#2F7058] hover:bg-emerald-50"
                      >
                        <span>Switch to Host Portal</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">Host</span>
                      </button>
                      <button
                        onClick={() => {
                          switchRole('admin');
                          setUserDropdownOpen(false);
                          navigate('/admin/dashboard');
                        }}
                        className="w-full text-left flex items-center justify-between px-4 py-1.5 text-xs text-purple-700 hover:bg-purple-50"
                      >
                        <span>Platform Administration</span>
                        <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded">Admin</span>
                      </button>
                    </div>

                    <div className="border-t border-stone-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className={`text-xs font-semibold px-3 py-2 rounded-xl transition-colors ${
                    shouldBeTransparent ? 'text-white hover:bg-white/10' : 'text-[#173D32] hover:bg-stone-200/50'
                  }`}
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-xs font-semibold px-4 py-2 rounded-xl bg-[#173D32] hover:bg-[#2F7058] text-white shadow-xs transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg lg:hidden transition-colors ${
              shouldBeTransparent ? 'text-white' : 'text-[#252A27]'
            }`}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white text-[#252A27] border-b border-stone-200 px-6 py-6 shadow-xl animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium py-1 text-[#252A27] hover:text-[#2F7058]"
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-stone-100" />
            <Link
              to="/become-a-host"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between text-sm font-semibold text-[#173D32] py-1"
            >
              <span>Become a Host</span>
              <Sparkles className="w-4 h-4 text-[#C5A66A]" />
            </Link>
            <Link
              to="/my-bookings"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-stone-700 py-1"
            >
              My Reservations
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-stone-700 py-1"
            >
              Wishlist ({wishlistIds.length})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
