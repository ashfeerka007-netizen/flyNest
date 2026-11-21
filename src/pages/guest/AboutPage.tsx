import React from 'react';
import { Navbar } from '../../components/guest/Navbar';
import { Footer } from '../../components/guest/Footer';
import { BRAND } from '../../config/brand';
import { MigrationPattern } from '../../components/common/MigrationPattern';
import { Feather, Wind, ShieldCheck, HeartHandshake, Trees, Eye } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#EEF0F8] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6BD6]">
              The Avian Ethos
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1B1F4A] mt-2">
              Every Journey Deserves a Restorative Sanctuary
            </h1>
            <p className="text-sm text-stone-600 mt-4 leading-relaxed font-light">
              Migratory birds cross continents without borders, navigating by stars and wind currents, finding quiet branches and wetlands to restore their energy. We built {BRAND.name} to offer human travelers that same sacred refuge.
            </p>
          </div>

          {/* Core Philosophy Banner */}
          <div className="relative rounded-3xl overflow-hidden bg-[#1B1F4A] text-white p-8 sm:p-12 mb-16 shadow-xl">
            <MigrationPattern opacity={0.2} />
            <div className="relative z-10 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F0A92E]">
                The Sanctuary Manifesto
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold">
                Not Just Rooms. Sanctuaries Designed for Renewal.
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed font-light max-w-2xl">
                We reject mass tourism, carbon-heavy resorts, and anonymous concrete hotel corridors. Instead, every property in our marketplace is chosen for architectural honesty, ecological reverence, and authentic hospitality.
              </p>
            </div>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#5B6BD6] flex items-center justify-center mb-4">
                <Trees className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1B1F4A]">Ecological Attunement</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Solar energy, rainwater harvesting, endemic flora conservation, and biophilic architectural materials.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#F0A92E] flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1B1F4A]">Mindful Stewardship</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Direct partnerships with custodians, naturalists, and families who preserve local culinary and crafts heritage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#1B1F4A]">Verified Sanctuary Standards</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Every property undergoes a rigorous 48-point verification by our platform curators before opening its doors.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
