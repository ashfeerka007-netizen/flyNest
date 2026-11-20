import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { DEMO_CREDENTIALS } from '../../config/constants';
import { Home, Key, ArrowRight, ShieldCheck } from 'lucide-react';

export const HostLoginPage: React.FC = () => {
  const [email, setEmail] = useState(DEMO_CREDENTIALS.host.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.host.password);
  const { login, switchRole } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'host');
    success('Welcome Host', 'Opened Sanctuary Host Management Console.');
    navigate('/host/dashboard');
  };

  const handleQuickFill = () => {
    switchRole('host');
    success('Host Demo Authenticated', 'Logged in as Tara Varma (Superhost)');
    navigate('/host/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8F7F1] flex flex-col justify-center items-center p-4 text-left">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200 shadow-xl">
        <div className="text-center mb-6">
          <BrandLogo size="md" />
          <span className="inline-block mt-3 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-[10px] font-bold uppercase tracking-wider">
            Host Workspace Portal
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#173D32] mt-2">
            Sanctuary Host Sign In
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Manage your listings, guest reservations, calendar rates and payouts
          </p>
        </div>

        {/* 1-Click Demo Fill Box */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5 uppercase tracking-wider">
              <Key className="w-3.5 h-3.5 text-[#C5A66A]" /> Demo Host Access
            </span>
            <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-amber-200">
              demo123
            </span>
          </div>
          <p className="text-[11px] text-amber-800 mb-3">
            Click below to instantly access the host management demonstration:
          </p>
          <button
            type="button"
            onClick={handleQuickFill}
            className="w-full bg-[#173D32] hover:bg-[#2F7058] text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-[#C5A66A]" />
            <span>Sign In as Demo Host ({DEMO_CREDENTIALS.host.email})</span>
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Host Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#173D32]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#173D32]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2F7058] hover:bg-[#173D32] text-white text-xs font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Log In to Host Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <Link to="/" className="hover:text-[#173D32]">← Public Guest Site</Link>
          <Link to="/admin/login" className="text-purple-700 hover:underline">Admin Login →</Link>
        </div>
      </div>
    </div>
  );
};
