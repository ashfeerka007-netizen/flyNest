import React, { useState } from 'react';
import { Navbar } from '../../components/guest/Navbar';
import { Footer } from '../../components/guest/Footer';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { BRAND } from '../../config/brand';
import { handleAvatarError } from '../../utils/imageUtils';
import { User, Mail, Phone, MapPin, ShieldCheck, Save, Sparkles } from 'lucide-react';

export const GuestAccountPage: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const { success } = useToast();

  const [name, setName] = useState(currentUser?.name || 'Aarav Mehta');
  const [email, setEmail] = useState(currentUser?.email || 'guest@demo.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98201 44589');
  const [location, setLocation] = useState(currentUser?.location || 'Mumbai, India');
  const [bio, setBio] = useState(currentUser?.bio || 'Avid nature wanderer and bird-flight enthusiast exploring restorative stays.');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone, location, bio });
    success('Profile Updated', 'Your guest passport details have been saved.');
  };

  return (
    <div className="min-h-screen bg-[#EEF0F8] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6BD6]">
              Traveler Profile
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B1F4A] mt-1">
              Account Settings
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Manage your personal details, preferences and travel verification
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-xs space-y-6">
            <div className="flex items-center gap-5 pb-6 border-b border-stone-100">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt={name}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#F0A92E]"
                onError={handleAvatarError}
              />
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1B1F4A] flex items-center gap-2">
                  <span>{name}</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </h3>
                <p className="text-xs text-stone-400 font-mono">{email}</p>
                <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#1B1F4A]/10 text-[#1B1F4A]">
                  Verified Guest Explorer
                </span>
              </div>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    required
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#1B1F4A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#1B1F4A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Current Base / City</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#1B1F4A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Traveler Bio</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#1B1F4A]"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#1B1F4A] hover:bg-[#5B6BD6] text-white text-xs font-semibold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
