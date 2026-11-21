import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMarketplace } from '../../context/MarketplaceContext';
import { MapPin, Calendar, Users, Search, Minus, Plus, Sparkles, X } from 'lucide-react';

interface HeroSearchProps {
  compact?: boolean;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({ compact = false }) => {
  const { searchState, updateSearch } = useMarketplace();
  const navigate = useNavigate();

  const [destination, setDestination] = useState(searchState.destination || '');
  const [checkIn, setCheckIn] = useState(searchState.checkIn || '2026-12-10');
  const [checkOut, setCheckOut] = useState(searchState.checkOut || '2026-12-14');
  const [adults, setAdults] = useState(searchState.adults || 2);
  const [children, setChildren] = useState(searchState.children || 0);
  const [infants, setInfants] = useState(searchState.infants || 0);

  const [destPickerOpen, setDestPickerOpen] = useState(false);
  const [guestPickerOpen, setGuestPickerOpen] = useState(false);

  const destRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  const totalGuests = adults + children;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setDestPickerOpen(false);
      }
      if (guestRef.current && !guestRef.current.contains(e.target as Node)) {
        setGuestPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const popularDestinations = [
    { name: 'Wayanad', region: 'Kerala, India', type: 'Rainforest Canopy' },
    { name: 'Munnar', region: 'Kerala, India', type: 'Misty Tea Hills' },
    { name: 'Coorg', region: 'Karnataka, India', type: 'Coffee Plantations' },
    { name: 'Goa', region: 'India', type: 'Ocean Cliffs' },
    { name: 'Jaipur', region: 'Rajasthan, India', type: 'Royal Havelis' },
    { name: 'Alleppey', region: 'Kerala, India', type: 'Backwater Lagoons' },
    { name: 'Manali', region: 'Himachal, India', type: 'Alpine Pine Valleys' },
    { name: 'Rishikesh', region: 'Uttarakhand, India', type: 'River Ganga & Yoga' },
    { name: 'Bali', region: 'Indonesia', type: 'Bamboo Sanctuaries' },
    { name: 'Maldives', region: 'Indian Ocean', type: 'Overwater Lagoon' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearch({
      destination,
      checkIn,
      checkOut,
      adults,
      children,
      infants,
    });
    setDestPickerOpen(false);
    setGuestPickerOpen(false);
    navigate(`/explore${destination ? `?destination=${encodeURIComponent(destination)}` : ''}`);
  };

  const handleSelectDest = (name: string) => {
    setDestination(name);
    setDestPickerOpen(false);
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${compact ? '' : 'relative z-20'}`}>
      <form
        onSubmit={handleSearchSubmit}
        className="bg-white rounded-3xl sm:rounded-full p-2.5 sm:p-2 shadow-2xl border border-stone-200/80 flex flex-col sm:flex-row items-stretch sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-stone-100 transition-all text-left"
      >
        {/* Destination Field */}
        <div ref={destRef} className="relative flex-1 px-4 py-2 hover:bg-stone-50 rounded-2xl sm:rounded-full transition-colors cursor-pointer">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1F4A]">
            Where
          </label>
          <div className="flex items-center gap-2 mt-0.5">
            <MapPin className="w-4 h-4 text-[#F0A92E] shrink-0" />
            <input
              type="text"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setDestPickerOpen(true);
              }}
              onFocus={() => setDestPickerOpen(true)}
              placeholder="Search destinations (Wayanad, Goa...)"
              className="w-full text-sm font-medium text-[#1B1F4A] bg-transparent focus:outline-hidden placeholder-stone-400"
            />
            {destination && (
              <button
                type="button"
                onClick={() => setDestination('')}
                className="text-stone-400 hover:text-stone-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Destination Dropdown */}
          {destPickerOpen && (
            <div className="absolute left-0 top-full mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 z-50 animate-scale-up">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Curated Sanctuaries
                </span>
                <span className="text-[10px] text-[#5B6BD6] flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3 h-3" /> Migratory Routes
                </span>
              </div>
              <div className="grid grid-cols-1 gap-1 max-h-60 overflow-y-auto">
                {popularDestinations
                  .filter((d) => d.name.toLowerCase().includes(destination.toLowerCase()) || d.region.toLowerCase().includes(destination.toLowerCase()))
                  .map((dest) => (
                    <button
                      key={dest.name}
                      type="button"
                      onClick={() => handleSelectDest(dest.name)}
                      className="w-full text-left p-2 rounded-xl hover:bg-[#EEF0F8] flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-[#1B1F4A] group-hover:text-[#F0A92E] flex items-center justify-center text-stone-600 transition-colors">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#1B1F4A] group-hover:text-[#1B1F4A]">
                            {dest.name}
                          </p>
                          <p className="text-[10px] text-stone-400">{dest.region}</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-stone-400 group-hover:text-[#5B6BD6]">
                        {dest.type}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Check-in Field */}
        <div className="flex-1 px-4 py-2 hover:bg-stone-50 rounded-2xl sm:rounded-full transition-colors">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1F4A]">
            Check-In
          </label>
          <div className="flex items-center gap-2 mt-0.5">
            <Calendar className="w-4 h-4 text-[#F0A92E] shrink-0" />
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="text-xs font-medium text-[#1B1F4A] bg-transparent focus:outline-hidden w-full cursor-pointer"
            />
          </div>
        </div>

        {/* Check-out Field */}
        <div className="flex-1 px-4 py-2 hover:bg-stone-50 rounded-2xl sm:rounded-full transition-colors">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1F4A]">
            Check-Out
          </label>
          <div className="flex items-center gap-2 mt-0.5">
            <Calendar className="w-4 h-4 text-[#F0A92E] shrink-0" />
            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="text-xs font-medium text-[#1B1F4A] bg-transparent focus:outline-hidden w-full cursor-pointer"
            />
          </div>
        </div>

        {/* Guests Field */}
        <div ref={guestRef} className="relative flex-1 px-4 py-2 hover:bg-stone-50 rounded-2xl sm:rounded-full transition-colors cursor-pointer">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1B1F4A]">
            Who
          </label>
          <button
            type="button"
            onClick={() => setGuestPickerOpen(!guestPickerOpen)}
            className="flex items-center gap-2 mt-0.5 text-left w-full"
          >
            <Users className="w-4 h-4 text-[#F0A92E] shrink-0" />
            <span className="text-xs font-medium text-[#1B1F4A] truncate">
              {totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}
              {infants > 0 ? `, ${infants} ${infants === 1 ? 'infant' : 'infants'}` : ''}
            </span>
          </button>

          {/* Guest Selector Popover */}
          {guestPickerOpen && (
            <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-stone-200 p-4 z-50 animate-scale-up">
              <div className="space-y-4">
                {/* Adults */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div>
                    <p className="text-xs font-bold text-[#1B1F4A]">Adults</p>
                    <p className="text-[10px] text-stone-400">Ages 13 and above</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults((a) => Math.max(1, a - 1))}
                      className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#1B1F4A]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold w-4 text-center">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults((a) => a + 1)}
                      className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:border-[#1B1F4A]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                  <div>
                    <p className="text-xs font-bold text-[#1B1F4A]">Children</p>
                    <p className="text-[10px] text-stone-400">Ages 2–12</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren((c) => Math.max(0, c - 1))}
                      className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#1B1F4A]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold w-4 text-center">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren((c) => c + 1)}
                      className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:border-[#1B1F4A]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#1B1F4A]">Infants</p>
                    <p className="text-[10px] text-stone-400">Under 2 years</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      disabled={infants <= 0}
                      onClick={() => setInfants((i) => Math.max(0, i - 1))}
                      className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#1B1F4A]"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-semibold w-4 text-center">{infants}</span>
                    <button
                      type="button"
                      onClick={() => setInfants((i) => i + 1)}
                      className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center text-stone-600 hover:border-[#1B1F4A]"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setGuestPickerOpen(false)}
                  className="text-xs font-bold text-[#1B1F4A] hover:underline"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search Action Button */}
        <div className="p-1 sm:p-0 sm:pr-1 flex items-center justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto bg-[#1B1F4A] hover:bg-[#5B6BD6] text-white p-3.5 sm:px-6 rounded-2xl sm:rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#1B1F4A]/25 cursor-pointer font-semibold text-sm group"
          >
            <Search className="w-4 h-4 text-[#F0A92E] group-hover:scale-110 transition-transform" />
            <span className="sm:inline">Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};
