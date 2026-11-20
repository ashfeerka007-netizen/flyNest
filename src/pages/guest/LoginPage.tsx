import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { DEMO_CREDENTIALS } from '../../config/constants';
import { BRAND } from '../../config/brand';
import { Key, ArrowRight, ShieldCheck, Home, Compass } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, switchRole } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      error('Please enter an email.');
      return;
    }
    login(email);
    success('Welcome Back', `Logged in as ${email}`);
    navigate('/');
  };

  const handleQuickDemo = (role: 'guest' | 'host' | 'admin') => {
    switchRole(role);
    success('Demo Access Granted', `Switched to ${role.toUpperCase()} mode.`);
    if (role === 'guest') navigate('/');
    if (role === 'host') navigate('/host/dashboard');
    if (role === 'admin') navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8F7F1] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200/90 shadow-xl text-left">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block">
            <BrandLogo size="md" showTagline={true} />
          </Link>
          <h2 className="font-serif text-2xl font-bold text-[#173D32] mt-4">
            Welcome to Your Sanctuary
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Log in to manage your journeys, wishlists and reservations
          </p>
        </div>

        {/* Demo Access Helper Box - Requirement Part 10 */}
        <div className="mb-6 p-4 rounded-2xl bg-[#173D32]/5 border border-[#173D32]/20">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#173D32] mb-1.5">
            <Key className="w-3.5 h-3.5 text-[#C5A66A]" />
            <span>1-Click Demo Login</span>
          </div>
          <p className="text-[11px] text-stone-500 mb-3">
            Click any demo profile to instantly test that role without typing:
          </p>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('guest')}
              className="p-2 rounded-xl bg-white border border-stone-200 hover:border-emerald-500 text-left transition-all cursor-pointer shadow-2xs"
            >
              <Compass className="w-3.5 h-3.5 text-[#2F7058] mb-1" />
              <p className="text-[11px] font-bold text-stone-800">Guest</p>
              <p className="text-[9px] text-stone-400 font-mono">guest@demo</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('host')}
              className="p-2 rounded-xl bg-white border border-stone-200 hover:border-amber-500 text-left transition-all cursor-pointer shadow-2xs"
            >
              <Home className="w-3.5 h-3.5 text-amber-600 mb-1" />
              <p className="text-[11px] font-bold text-stone-800">Host</p>
              <p className="text-[9px] text-stone-400 font-mono">host@demo</p>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="p-2 rounded-xl bg-white border border-stone-200 hover:border-purple-500 text-left transition-all cursor-pointer shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600 mb-1" />
              <p className="text-[11px] font-bold text-stone-800">Admin</p>
              <p className="text-[9px] text-stone-400 font-mono">admin@demo</p>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. guest@demo.com"
              required
              className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#173D32]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-700">
                Password
              </label>
              <span className="text-[10px] text-stone-400">Demo: demo123</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#173D32]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#173D32] hover:bg-[#2F7058] text-white text-xs font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Log In to Sanctuary</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-stone-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#2F7058] font-bold hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};
