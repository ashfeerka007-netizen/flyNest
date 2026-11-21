import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { DEMO_CREDENTIALS } from '../../config/constants';
import { ShieldCheck, Key, ArrowRight } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState(DEMO_CREDENTIALS.admin.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.admin.password);
  const { login, switchRole } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'admin');
    success('Admin Authenticated', 'Opened Platform Administration Console.');
    navigate('/admin/dashboard');
  };

  const handleQuickFill = () => {
    switchRole('admin');
    success('Admin Demo Access', 'Logged in as Super Administrator (Vikramaditya Rao)');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#1B1F4A] text-white flex flex-col justify-center items-center p-4 text-left">
      <div className="max-w-md w-full bg-stone-900 rounded-3xl p-8 border border-stone-800 shadow-2xl">
        <div className="text-center mb-6">
          <BrandLogo variant="light" size="md" />
          <span className="inline-block mt-3 px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-bold uppercase tracking-wider">
            Super Administrator Gateway
          </span>
          <h2 className="font-serif text-2xl font-bold text-white mt-2">
            Platform Trust & Console
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Access listing verification, global ledger, users and fee configurations
          </p>
        </div>

        {/* 1-Click Admin Demo Box */}
        <div className="mb-6 p-4 rounded-2xl bg-purple-950/40 border border-purple-800/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Key className="w-3.5 h-3.5 text-[#F0A92E]" /> Demo Admin Access
            </span>
            <span className="text-[10px] font-mono bg-stone-800 px-2 py-0.5 rounded text-stone-300">
              demo123
            </span>
          </div>
          <p className="text-[11px] text-stone-300 mb-3">
            Click below to immediately log in as the Platform Administrator:
          </p>
          <button
            type="button"
            onClick={handleQuickFill}
            className="w-full bg-[#1B1F4A] hover:bg-[#5B6BD6] text-[#F0A92E] text-xs font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#F0A92E]/40"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Sign In as Demo Admin ({DEMO_CREDENTIALS.admin.email})</span>
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-xs p-3 rounded-xl border border-stone-700 bg-stone-800 text-white focus:outline-hidden focus:ring-2 focus:ring-[#F0A92E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-xs p-3 rounded-xl border border-stone-700 bg-stone-800 text-white focus:outline-hidden focus:ring-2 focus:ring-[#F0A92E]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1B1F4A] hover:bg-[#5B6BD6] text-white text-xs font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Enter Administration Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
          <Link to="/" className="hover:text-white">← Public Guest Site</Link>
          <Link to="/host/login" className="text-amber-400 hover:underline">Host Portal →</Link>
        </div>
      </div>
    </div>
  );
};
