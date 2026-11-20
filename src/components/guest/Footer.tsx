import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import { BRAND } from '../../config/brand';
import { MigrationPattern } from '../common/MigrationPattern';
import { useToast } from '../../context/ToastContext';
import { Mail, ArrowRight, ShieldCheck, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { success } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    success('Subscribed!', 'Welcome to the Migratory Journal. Sanctuary guides sent weekly.');
    setEmail('');
  };

  return (
    <footer className="relative bg-[#173D32] text-white pt-16 pb-12 overflow-hidden border-t border-[#2F7058]/40">
      <MigrationPattern opacity={0.08} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter Section */}
        <div className="bg-[#2F7058]/30 rounded-3xl p-8 sm:p-12 mb-16 border border-[#2F7058]/50 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-[#C5A66A] text-xs font-semibold tracking-widest uppercase">
              The Migratory Journal
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mt-2 text-white">
              Receive secret sanctuaries, seasonal flight paths & private listings
            </h3>
            <p className="text-stone-300 text-sm mt-2 leading-relaxed">
              Curated monthly dispatches on extraordinary wilderness retreats, architectural homestays and restorative slow travel.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex-1 max-w-md">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Mail className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#C5A66A] focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-[#C5A66A] hover:bg-[#b09257] text-[#173D32] font-semibold text-sm px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-black/20"
              >
                <span>{subscribed ? 'Subscribed' : 'Join Journey'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-stone-400 mt-2">
              We respect your sanctuary. Unsubscribe at any time. Zero spam.
            </p>
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          {/* Brand & Symbolism */}
          <div className="col-span-2">
            <BrandLogo variant="light" size="lg" showTagline={true} />
            <p className="text-stone-300 text-sm mt-4 leading-relaxed max-w-sm">
              {BRAND.tagline} {BRAND.symbolism}
            </p>
            <div className="flex items-center gap-3 mt-6 text-xs text-stone-300">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <Globe className="w-3.5 h-3.5 text-[#C5A66A]" />
                <span>India & International</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Sanctuaries</span>
              </span>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A66A] mb-4">
              Destinations
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li><Link to="/explore?destination=Wayanad" className="hover:text-white transition-colors">Wayanad Rainforest</Link></li>
              <li><Link to="/explore?destination=Munnar" className="hover:text-white transition-colors">Munnar Tea Valleys</Link></li>
              <li><Link to="/explore?destination=Coorg" className="hover:text-white transition-colors">Coorg Plantations</Link></li>
              <li><Link to="/explore?destination=Goa" className="hover:text-white transition-colors">Goa Coastal Cliffs</Link></li>
              <li><Link to="/explore?destination=Alleppey" className="hover:text-white transition-colors">Alleppey Backwaters</Link></li>
              <li><Link to="/explore?destination=Bali" className="hover:text-white transition-colors">Bali Bamboo Groves</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A66A] mb-4">
              Sanctuary Types
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li><Link to="/explore?category=Villas" className="hover:text-white transition-colors">Private Villas</Link></li>
              <li><Link to="/explore?category=Unique Stays" className="hover:text-white transition-colors">Treehouses & Domes</Link></li>
              <li><Link to="/explore?category=Eco Stays" className="hover:text-white transition-colors">Eco Sanctuaries</Link></li>
              <li><Link to="/explore?category=Farm Stays" className="hover:text-white transition-colors">Plantation Manors</Link></li>
              <li><Link to="/explore?category=Resorts" className="hover:text-white transition-colors">Highland Resorts</Link></li>
              <li><Link to="/explore?category=Homestays" className="hover:text-white transition-colors">Boutique Homestays</Link></li>
            </ul>
          </div>

          {/* Platform & Portals */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C5A66A] mb-4">
              Explore & Host
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li><Link to="/become-a-host" className="hover:text-white transition-colors">Host a Sanctuary</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How Booking Works</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Our Ethical Ethos</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Concierge & Help</Link></li>
              <li className="pt-2 border-t border-white/10">
                <Link to="/host/login" className="text-[#C5A66A] hover:underline font-medium">Host Portal Demo →</Link>
              </li>
              <li>
                <Link to="/admin/login" className="text-stone-400 hover:text-stone-200 text-xs">Admin Platform Demo →</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© 2026 {BRAND.name} Marketplace Inc. Built with reverence for migratory paths and mindful hospitality.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span>Currency:</span>
              <strong className="text-white">{BRAND.currency.symbol} {BRAND.currency.code}</strong>
            </span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" /> for travelers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
