import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/guest/Navbar';
import { Footer } from '../../components/guest/Footer';
import { BRAND } from '../../config/brand';
import { Search, Calendar, Sparkles, CheckCircle2, ShieldCheck, Home, ArrowRight } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8F7F1] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2F7058]">
              The Guest Journey
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#173D32] mt-2">
              How Booking Works
            </h1>
            <p className="text-sm text-stone-600 mt-3">
              Simple, transparent, and verified from takeoff to landing
            </p>
          </div>

          <div className="space-y-8 mb-16">
            <div className="bg-white rounded-3xl p-8 border border-stone-200 flex items-start gap-6">
              <div className="w-12 h-12 rounded-2xl bg-[#173D32] text-[#C5A66A] font-serif font-bold text-lg flex items-center justify-center shrink-0">
                01
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#173D32]">Discover by Corridor or Style</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Search across 15 curated destinations. Filter by treehouses, bamboo villas, heritage havelis, and eco-lodges with exact amenities and capacity filters.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-stone-200 flex items-start gap-6">
              <div className="w-12 h-12 rounded-2xl bg-[#173D32] text-[#C5A66A] font-serif font-bold text-lg flex items-center justify-center shrink-0">
                02
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#173D32]">Transparent Pricing & Real-Time Availability</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  View itemized pricing with nightly rates, cleaning fees, platform fees, and statutory hospitality taxes before booking. No surprise markups at checkout.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-stone-200 flex items-start gap-6">
              <div className="w-12 h-12 rounded-2xl bg-[#173D32] text-[#C5A66A] font-serif font-bold text-lg flex items-center justify-center shrink-0">
                03
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#173D32]">Flexible Payment Demonstrations</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Choose from Credit Card, UPI, Net Banking, or Digital Wallets in our interactive simulated gateway.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-stone-200 flex items-start gap-6">
              <div className="w-12 h-12 rounded-2xl bg-[#173D32] text-[#C5A66A] font-serif font-bold text-lg flex items-center justify-center shrink-0">
                04
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#173D32]">Direct Concierge & Host Connection</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  Receive an instant reservation reference, check-in instructions, dietary customization, and direct host messaging for smooth arrival.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 bg-[#173D32] hover:bg-[#2F7058] text-white text-xs font-semibold px-8 py-4 rounded-2xl shadow-lg transition-all"
            >
              <span>Explore Sanctuaries Now</span>
              <ArrowRight className="w-4 h-4 text-[#C5A66A]" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
