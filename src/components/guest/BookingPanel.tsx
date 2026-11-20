import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Property } from '../../types/property';
import { useMarketplace } from '../../context/MarketplaceContext';
import { BRAND } from '../../config/brand';
import {
  Star,
  ShieldCheck,
  Calendar,
  Users,
  ChevronDown,
  Info,
  Sparkles,
} from 'lucide-react';

interface BookingPanelProps {
  property: Property;
}

export const BookingPanel: React.FC<BookingPanelProps> = ({ property }) => {
  const { calculateBookingPrice, searchState, updateSearch } = useMarketplace();
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState(searchState.checkIn || '2026-12-10');
  const [checkOut, setCheckOut] = useState(searchState.checkOut || '2026-12-14');
  const [guests, setGuests] = useState(searchState.adults || 2);
  const [guestPickerOpen, setGuestPickerOpen] = useState(false);

  // Dynamic live price calculation based on central platform rates
  const pricing = calculateBookingPrice(property, checkIn, checkOut, guests);

  const handleReserve = () => {
    updateSearch({
      checkIn,
      checkOut,
      adults: guests,
    });
    // Navigate to simulated checkout
    navigate(`/checkout/${property.id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  return (
    <>
      {/* Desktop Sticky Panel */}
      <div className="hidden lg:block sticky top-28 bg-white rounded-3xl p-6 shadow-xl border border-stone-200/90 text-left">
        {/* Header: Price & Rating */}
        <div className="flex items-baseline justify-between pb-5 border-b border-stone-100">
          <div>
            <span className="text-2xl font-serif font-bold text-[#173D32]">
              {BRAND.currency.symbol}{property.pricePerNight.toLocaleString()}
            </span>
            <span className="text-xs text-stone-400"> / night</span>
            {property.originalPricePerNight && (
              <span className="text-xs text-stone-400 line-through ml-2">
                {BRAND.currency.symbol}{property.originalPricePerNight.toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-[#252A27]">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{property.rating}</span>
            <span className="text-stone-400 font-normal">({property.reviewCount})</span>
          </div>
        </div>

        {/* Date & Guest Selectors Box */}
        <div className="mt-5 border border-stone-300 rounded-2xl overflow-hidden divide-y divide-stone-200">
          <div className="grid grid-cols-2 divide-x divide-stone-200 bg-[#F8F7F1]/30">
            {/* Check-in */}
            <div className="p-3">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#173D32]">
                Check-In
              </label>
              <div className="flex items-center gap-1.5 mt-1">
                <Calendar className="w-3.5 h-3.5 text-[#C5A66A]" />
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full text-xs font-medium text-[#252A27] bg-transparent focus:outline-hidden cursor-pointer"
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="p-3">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#173D32]">
                Check-Out
              </label>
              <div className="flex items-center gap-1.5 mt-1">
                <Calendar className="w-3.5 h-3.5 text-[#C5A66A]" />
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full text-xs font-medium text-[#252A27] bg-transparent focus:outline-hidden cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Guest Count */}
          <div className="p-3 relative bg-white">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#173D32]">
              Guests
            </label>
            <button
              type="button"
              onClick={() => setGuestPickerOpen(!guestPickerOpen)}
              className="w-full flex items-center justify-between text-xs font-medium text-[#252A27] mt-1"
            >
              <span className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#C5A66A]" />
                <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
              </span>
              <ChevronDown className="w-4 h-4 text-stone-400" />
            </button>

            {guestPickerOpen && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 z-30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#173D32]">Capacity ({property.maxGuests} max)</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={guests <= 1}
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center text-xs font-bold disabled:opacity-30"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold">{guests}</span>
                    <button
                      type="button"
                      disabled={guests >= property.maxGuests}
                      onClick={() => setGuests((g) => Math.min(property.maxGuests, g + 1))}
                      className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center text-xs font-bold disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setGuestPickerOpen(false)}
                  className="mt-3 w-full py-1.5 text-xs font-semibold text-[#173D32] bg-[#F8F7F1] rounded-lg"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Reserve Button */}
        <button
          type="button"
          onClick={handleReserve}
          className="w-full mt-5 bg-[#173D32] hover:bg-[#2F7058] text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-[#173D32]/20 flex items-center justify-center gap-2 cursor-pointer group"
        >
          <Sparkles className="w-4 h-4 text-[#C5A66A] group-hover:scale-110 transition-transform" />
          <span>Reserve Sanctuary</span>
        </button>

        <p className="text-[11px] text-stone-400 text-center mt-2.5 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>You won't be charged yet</span>
        </p>

        {/* Pricing Calculation Breakdown */}
        <div className="mt-5 pt-4 border-t border-stone-100 space-y-2.5 text-xs">
          <div className="flex items-center justify-between text-stone-600">
            <span>
              {BRAND.currency.symbol}{property.pricePerNight.toLocaleString()} × {pricing.nights} {pricing.nights === 1 ? 'night' : 'nights'}
            </span>
            <span className="font-medium text-[#252A27]">
              {BRAND.currency.symbol}{pricing.baseTotal.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-stone-600">
            <span className="flex items-center gap-1">
              <span>Sanctuary Cleaning & Prep</span>
              <Info className="w-3 h-3 text-stone-300" />
            </span>
            <span className="font-medium text-[#252A27]">
              {BRAND.currency.symbol}{pricing.cleaningFee.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-stone-600">
            <span className="flex items-center gap-1">
              <span>Platform Service & Concierge</span>
              <Info className="w-3 h-3 text-stone-300" />
            </span>
            <span className="font-medium text-[#252A27]">
              {BRAND.currency.symbol}{pricing.serviceFee.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-stone-600">
            <span className="flex items-center gap-1">
              <span>Estimated Taxes & GST (12%)</span>
              <Info className="w-3 h-3 text-stone-300" />
            </span>
            <span className="font-medium text-[#252A27]">
              {BRAND.currency.symbol}{pricing.taxes.toLocaleString()}
            </span>
          </div>

          {pricing.discount > 0 && (
            <div className="flex items-center justify-between text-emerald-700 font-medium">
              <span>Long-stay Sanctuary Discount</span>
              <span>-{BRAND.currency.symbol}{pricing.discount.toLocaleString()}</span>
            </div>
          )}

          {/* Grand Total */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-between text-sm font-bold text-[#173D32]">
            <span>Total Amount</span>
            <span className="text-lg font-serif">
              {BRAND.currency.symbol}{pricing.grandTotal.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Cancellation policy guarantee */}
        <div className="mt-5 p-3 rounded-xl bg-[#F8F7F1] border border-stone-200/60 text-[11px] text-stone-600 flex items-start gap-2">
          <Info className="w-4 h-4 text-[#2F7058] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#173D32]">{property.cancellationPolicy} Cancellation:</strong>{' '}
            Full refund permitted up to 5 days prior to arrival.
          </div>
        </div>
      </div>

      {/* Mobile Floating Bottom Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 p-4 px-6 flex items-center justify-between shadow-2xl">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-[#173D32]">
              {BRAND.currency.symbol}{property.pricePerNight.toLocaleString()}
            </span>
            <span className="text-xs text-stone-400">/ night</span>
          </div>
          <p className="text-[11px] text-stone-500">
            {pricing.nights} {pricing.nights === 1 ? 'night' : 'nights'} • {BRAND.currency.symbol}{pricing.grandTotal.toLocaleString()} total
          </p>
        </div>

        <button
          type="button"
          onClick={handleReserve}
          className="bg-[#173D32] hover:bg-[#2F7058] text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
        >
          Reserve
        </button>
      </div>
    </>
  );
};
