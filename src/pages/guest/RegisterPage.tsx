import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BrandLogo } from '../../components/common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { BRAND } from '../../config/brand';
import { ArrowRight, Sparkles } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, 'guest');
    success('Passport Created', `Welcome to ${BRAND.name}, ${name}!`);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#EEF0F8] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-stone-200/90 shadow-xl text-left">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block">
            <BrandLogo size="md" showTagline={true} />
          </Link>
          <h2 className="font-serif text-2xl font-bold text-[#1B1F4A] mt-4">
            Begin Your Migratory Journey
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            Create an account to book handpicked sanctuaries and save your favorites
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Full Legal Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Maya Iyer"
              required
              className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#1B1F4A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="maya@example.com"
              required
              className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#1B1F4A]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Create Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#1B1F4A]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1B1F4A] hover:bg-[#5B6BD6] text-white text-xs font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Create Sanctuary Passport</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-stone-500 mt-6">
          Already registered?{' '}
          <Link to="/login" className="text-[#5B6BD6] font-bold hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};
