import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, Home, Key, Compass, ChevronDown, Check } from 'lucide-react';
import { DEMO_CREDENTIALS } from '../../config/constants';

export const DemoSwitcher: React.FC = () => {
  const { currentUser, switchRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelectRole = (role: 'guest' | 'host' | 'admin') => {
    switchRole(role);
    setIsOpen(false);
    if (role === 'guest') navigate('/');
    if (role === 'host') navigate('/host/dashboard');
    if (role === 'admin') navigate('/admin/dashboard');
  };

  return (
    <div className="fixed bottom-5 left-5 z-40">
      {/* Dropdown panel */}
      {isOpen && (
        <div className="mb-2 w-80 bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 animate-scale-up text-left">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-[#C5A66A]" />
              <span className="font-semibold text-xs tracking-wider uppercase text-[#173D32]">
                Interactive Demo Switcher
              </span>
            </div>
            <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-mono">
              demo123
            </span>
          </div>

          <p className="text-xs text-stone-500 my-2">
            Instantaneously switch portals to test different user journeys:
          </p>

          <div className="space-y-1.5">
            {/* Guest */}
            <button
              onClick={() => handleSelectRole('guest')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                currentUser?.role === 'guest'
                  ? 'bg-emerald-50/70 border-emerald-300 text-[#173D32]'
                  : 'border-stone-100 hover:bg-stone-50 text-stone-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold">{DEMO_CREDENTIALS.guest.label}</p>
                  <p className="text-[10px] text-stone-400 font-mono">{DEMO_CREDENTIALS.guest.email}</p>
                </div>
              </div>
              {currentUser?.role === 'guest' && <Check className="w-4 h-4 text-emerald-600" />}
            </button>

            {/* Host */}
            <button
              onClick={() => handleSelectRole('host')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                currentUser?.role === 'host'
                  ? 'bg-amber-50/70 border-amber-300 text-[#173D32]'
                  : 'border-stone-100 hover:bg-stone-50 text-stone-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold">{DEMO_CREDENTIALS.host.label}</p>
                  <p className="text-[10px] text-stone-400 font-mono">{DEMO_CREDENTIALS.host.email}</p>
                </div>
              </div>
              {currentUser?.role === 'host' && <Check className="w-4 h-4 text-amber-600" />}
            </button>

            {/* Admin */}
            <button
              onClick={() => handleSelectRole('admin')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
                currentUser?.role === 'admin'
                  ? 'bg-purple-50/70 border-purple-300 text-[#173D32]'
                  : 'border-stone-100 hover:bg-stone-50 text-stone-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-800">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold">{DEMO_CREDENTIALS.admin.label}</p>
                  <p className="text-[10px] text-stone-400 font-mono">{DEMO_CREDENTIALS.admin.email}</p>
                </div>
              </div>
              {currentUser?.role === 'admin' && <Check className="w-4 h-4 text-purple-600" />}
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-[#173D32] hover:bg-[#2F7058] text-white text-xs font-medium rounded-full shadow-lg border border-[#C5A66A]/30 transition-all hover:scale-105 select-none"
      >
        <span className="w-2 h-2 rounded-full bg-[#C5A66A] animate-ping" />
        <UserCheck className="w-3.5 h-3.5 text-[#C5A66A]" />
        <span>Role: <strong className="capitalize">{currentUser?.role || 'Guest'}</strong></span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
};
