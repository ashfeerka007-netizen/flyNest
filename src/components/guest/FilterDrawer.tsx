import React from 'react';
import { PropertyCategory } from '../../types/property';
import { BRAND } from '../../config/brand';
import { X, RotateCcw, Check } from 'lucide-react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  bedrooms: number;
  onBedroomsChange: (num: number) => void;
  instantOnly: boolean;
  onInstantChange: (val: boolean) => void;
  selectedAmenities: string[];
  onToggleAmenity: (amenity: string) => void;
  onReset: () => void;
}

const ALL_CATEGORIES: PropertyCategory[] = [
  'Hotels',
  'Resorts',
  'Homestays',
  'Villas',
  'Apartments',
  'Private Rooms',
  'Guest Houses',
  'Cottages',
  'Eco Stays',
  'Farm Stays',
  'Hostels',
  'Unique Stays',
];

const AVAILABLE_AMENITIES = [
  { id: 'wifi', label: 'High-speed Wi-Fi' },
  { id: 'private_pool', label: 'Private / Lap Pool' },
  { id: 'mountain_view', label: 'Mountain / Ridge View' },
  { id: 'fireplace', label: 'Wood-burning Fireplace' },
  { id: 'kitchen', label: 'Full Gourmet Kitchen' },
  { id: 'breakfast', label: 'Artisanal Breakfast Included' },
  { id: 'sea_view', label: 'Sea / Ocean Front' },
  { id: 'organic_garden', label: 'Organic Garden / Estate' },
  { id: 'binoculars', label: 'Avian Observatory & Binoculars' },
  { id: 'yoga_shala', label: 'Yoga Shala / Meditation Deck' },
  { id: 'ac', label: 'Air Conditioning' },
  { id: 'free_parking', label: 'Complimentary Parking' },
];

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  minPrice,
  maxPrice,
  onPriceChange,
  bedrooms,
  onBedroomsChange,
  instantOnly,
  onInstantChange,
  selectedAmenities,
  onToggleAmenity,
  onReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1B1F4A]/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-left text-left">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#EEF0F8]/80">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1B1F4A]">Filter Sanctuaries</h3>
            <p className="text-xs text-stone-500">Refine by price, stay type and restorative amenities</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Filters */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Price Range */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1F4A] mb-3">
              Nightly Price ({BRAND.currency.symbol})
            </h4>
            <div className="flex items-center gap-3">
              <div className="flex-1 border border-stone-200 rounded-xl p-2.5">
                <span className="block text-[10px] text-stone-400 uppercase">Min Price</span>
                <span className="text-sm font-semibold text-[#1B1F4A]">
                  {BRAND.currency.symbol}{minPrice.toLocaleString()}
                </span>
              </div>
              <span className="text-stone-300">—</span>
              <div className="flex-1 border border-stone-200 rounded-xl p-2.5">
                <span className="block text-[10px] text-stone-400 uppercase">Max Price</span>
                <span className="text-sm font-semibold text-[#1B1F4A]">
                  {BRAND.currency.symbol}{maxPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-3">
              <input
                type="range"
                min={1500}
                max={60000}
                step={500}
                value={maxPrice}
                onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
                className="w-full accent-[#1B1F4A] cursor-pointer"
              />
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Stay Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1F4A] mb-3">
              Property Category
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onSelectCategory('All')}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-[#1B1F4A] border-[#1B1F4A] text-white font-medium'
                    : 'border-stone-200 text-stone-600 hover:border-stone-400'
                }`}
              >
                All Categories
              </button>
              {ALL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onSelectCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#1B1F4A] border-[#1B1F4A] text-white font-medium'
                      : 'border-stone-200 text-stone-600 hover:border-stone-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Bedrooms */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1F4A] mb-3">
              Bedrooms
            </h4>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => onBedroomsChange(num)}
                  className={`flex-1 py-2 text-xs rounded-xl border transition-all ${
                    bedrooms === num
                      ? 'bg-[#1B1F4A] border-[#1B1F4A] text-white font-semibold'
                      : 'border-stone-200 text-stone-700 hover:border-stone-300'
                  }`}
                >
                  {num === 0 ? 'Any' : `${num}+`}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Instant Book */}
          <div>
            <label className="flex items-center justify-between cursor-pointer p-3 rounded-xl border border-stone-200 hover:bg-stone-50 transition-colors">
              <div>
                <p className="text-xs font-bold text-[#1B1F4A]">Instant Booking</p>
                <p className="text-[11px] text-stone-400">Reserve without waiting for host confirmation</p>
              </div>
              <input
                type="checkbox"
                checked={instantOnly}
                onChange={(e) => onInstantChange(e.target.checked)}
                className="w-4 h-4 accent-[#1B1F4A] rounded cursor-pointer"
              />
            </label>
          </div>

          <hr className="border-stone-100" />

          {/* Amenities */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B1F4A] mb-3">
              Amenities & Sanctuaries
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {AVAILABLE_AMENITIES.map((amenity) => {
                const isChecked = selectedAmenities.includes(amenity.id);
                return (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() => onToggleAmenity(amenity.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs transition-colors ${
                      isChecked
                        ? 'border-[#5B6BD6] bg-emerald-50/50 text-[#1B1F4A] font-semibold'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span>{amenity.label}</span>
                    {isChecked && <Check className="w-4 h-4 text-[#5B6BD6]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-200 bg-[#EEF0F8]/80 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#1B1F4A] px-3 py-2 rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-[#1B1F4A] hover:bg-[#5B6BD6] text-white text-xs font-semibold py-3 px-6 rounded-xl transition-all shadow-md shadow-[#1B1F4A]/20"
          >
            Show Stays
          </button>
        </div>
      </div>
    </div>
  );
};
