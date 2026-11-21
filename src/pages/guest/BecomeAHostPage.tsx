import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/guest/Navbar';
import { Footer } from '../../components/guest/Footer';
import { useAuth } from '../../context/AuthContext';
import { BRAND } from '../../config/brand';
import { handleImageError } from '../../utils/imageUtils';
import { MigrationPattern } from '../../components/common/MigrationPattern';
import { Sparkles, DollarSign, ShieldCheck, HeartHandshake, ArrowRight, Check } from 'lucide-react';

export const BecomeAHostPage: React.FC = () => {
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const handleStartHosting = () => {
    switchRole('host');
    navigate('/host/properties/new');
  };

  return (
    <div className="min-h-screen bg-[#EEF0F8] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          {/* Hero Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-[#1B1F4A] text-white p-8 sm:p-16 mb-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
            <MigrationPattern opacity={0.2} />

            <div className="max-w-xl relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F0A92E]">
                Host with Reverence
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold mt-2 leading-tight">
                Share Your Sanctuary with Discerning Travelers
              </h1>
              <p className="text-stone-300 text-sm sm:text-base mt-4 font-light leading-relaxed">
                Join our curated collective of architects, plantation custodians, naturalists and boutique hosts welcoming slow travelers from across the globe.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={handleStartHosting}
                  className="bg-[#F0A92E] hover:bg-[#b09257] text-[#1B1F4A] font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Launch Property Wizard</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/host/login"
                  className="bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all"
                >
                  <span>Host Dashboard Demo →</span>
                </Link>
              </div>
            </div>

            <div className="relative z-10 w-full lg:w-96 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                alt="Sanctuary Hosting"
                className="w-full h-80 object-cover"
                onError={handleImageError}
              />
            </div>
          </div>

          {/* Hosting Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#5B6BD6] flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#1B1F4A]">Competitive Host Revenue</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Keep 92% of your booking earnings with only an 8% flat platform commission. Direct payouts scheduled seamlessly after guest check-in.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#F0A92E] flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1B1F4A]">₹25,00,000 Host Protection</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Comprehensive damage protection and liability coverage included with every booking. Verified guest IDs on all reservations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1B1F4A]">Curation & Editorial Showcase</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Your listing is spotlighted to international naturalists, photographers, architectural enthusiasts, and executive retreat leaders.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
