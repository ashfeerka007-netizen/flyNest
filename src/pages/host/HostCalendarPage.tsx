import React, { useState } from 'react';
import { HostLayout } from '../../components/host/HostLayout';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useToast } from '../../context/ToastContext';
import { BRAND } from '../../config/brand';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Ban,
  CheckCircle2,
  Lock,
  Edit,
  Sparkles,
} from 'lucide-react';

export const HostCalendarPage: React.FC = () => {
  const { properties, toggleDateAvailability, setCustomRate } = useMarketplace();
  const { success } = useToast();

  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(properties[0]?.id || '');
  const [currentMonth, setCurrentMonth] = useState('December 2026');
  const [editingRateDate, setEditingRateDate] = useState<string | null>(null);
  const [newRate, setNewRate] = useState<number>(9500);

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId) || properties[0];
  const blockedDates = selectedProperty?.blockedDates || [];
  const customRates = selectedProperty?.customNightlyRates || {};

  // Days in December 2026 (31 days, starts on Tuesday)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleDateClick = (day: number) => {
    const dayStr = day < 10 ? `0${day}` : `${day}`;
    const dateStr = `2026-12-${dayStr}`;
    toggleDateAvailability(selectedProperty.id, dateStr);
    const isNowBlocked = !blockedDates.includes(dateStr);
    success(
      isNowBlocked ? 'Date Blocked' : 'Date Available',
      `${dateStr} is now marked ${isNowBlocked ? 'unavailable' : 'available'} for guests.`
    );
  };

  const handleSaveRate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRateDate) return;
    setCustomRate(selectedProperty.id, editingRateDate, newRate);
    success('Seasonal Rate Updated', `${editingRateDate} price set to ₹${newRate.toLocaleString()}`);
    setEditingRateDate(null);
  };

  return (
    <HostLayout>
      <div className="space-y-8 text-left pb-16">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2F7058]">
              Interactive Availability & Rates
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32] mt-1">
              Sanctuary Availability Calendar
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Click any date to toggle booking availability or set seasonal pricing surcharges
            </p>
          </div>

          {/* Property Selector */}
          <div className="flex items-center gap-3">
            <select
              value={selectedPropertyId}
              onChange={(e) => setSelectedPropertyId(e.target.value)}
              className="bg-white border border-stone-300 text-xs font-semibold rounded-xl px-4 py-2.5 shadow-2xs focus:outline-hidden"
            >
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Calendar Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs">
          {/* Month Header */}
          <div className="flex items-center justify-between pb-6 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#C5A66A]" />
              <h3 className="font-serif text-xl font-bold text-[#173D32]">{currentMonth}</h3>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-stone-600">
                <span className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-300" />
                <span>Available</span>
              </span>
              <span className="flex items-center gap-1.5 text-stone-600">
                <span className="w-3 h-3 rounded-full bg-stone-200 border border-stone-300" />
                <span>Blocked / Unavailable</span>
              </span>
              <span className="flex items-center gap-1.5 text-stone-600">
                <span className="w-3 h-3 rounded-full bg-amber-100 border border-amber-300" />
                <span>Booked Guest Stay</span>
              </span>
            </div>
          </div>

          {/* Days Grid */}
          <div className="mt-6">
            {/* Weekday Labels */}
            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-stone-400 uppercase tracking-wider">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Calendar Dates (Offset for Dec 2026 starts on Tue: 2 empty slots) */}
            <div className="grid grid-cols-7 gap-2">
              <div className="h-24 bg-transparent rounded-2xl" />
              <div className="h-24 bg-transparent rounded-2xl" />

              {daysInMonth.map((day) => {
                const dayStr = day < 10 ? `0${day}` : `${day}`;
                const dateStr = `2026-12-${dayStr}`;
                const isBlocked = blockedDates.includes(dateStr);
                const hasCustomRate = customRates[dateStr];
                const activePrice = hasCustomRate || selectedProperty.pricePerNight;

                // Sample booked dates (e.g., Dec 5-8)
                const isBooked = day >= 5 && day <= 8;

                return (
                  <div
                    key={day}
                    onClick={() => !isBooked && handleDateClick(day)}
                    className={`h-24 p-2.5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer select-none group ${
                      isBooked
                        ? 'bg-amber-50/70 border-amber-300 cursor-not-allowed'
                        : isBlocked
                        ? 'bg-stone-100/80 border-stone-200 text-stone-400'
                        : 'bg-white hover:bg-emerald-50/30 border-stone-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isBlocked ? 'text-stone-400' : 'text-[#173D32]'}`}>
                        {day}
                      </span>
                      {isBooked ? (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-200 text-amber-900">
                          Booked
                        </span>
                      ) : isBlocked ? (
                        <Ban className="w-3.5 h-3.5 text-stone-400" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-emerald-500 opacity-60" />
                      )}
                    </div>

                    <div className="flex items-baseline justify-between">
                      <span className="text-[11px] font-semibold text-[#173D32]">
                        ₹{activePrice.toLocaleString()}
                      </span>

                      {!isBooked && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingRateDate(dateStr);
                            setNewRate(activePrice);
                          }}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-stone-500 hover:text-[#173D32] hover:bg-white text-[10px]"
                          title="Custom Rate"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Custom Seasonal Rate Modal */}
        {editingRateDate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-stone-200 animate-scale-up text-left">
              <h3 className="font-serif text-lg font-bold text-[#173D32]">
                Configure Nightly Rate
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Seasonal pricing override for {editingRateDate}
              </p>

              <form onSubmit={handleSaveRate} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Rate in INR ({BRAND.currency.symbol})
                  </label>
                  <input
                    type="number"
                    step={100}
                    value={newRate}
                    onChange={(e) => setNewRate(Number(e.target.value))}
                    required
                    className="w-full text-sm font-bold p-3 rounded-xl border border-stone-300"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingRateDate(null)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold bg-[#173D32] text-white rounded-xl shadow-xs"
                  >
                    Save Rate
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </HostLayout>
  );
};
