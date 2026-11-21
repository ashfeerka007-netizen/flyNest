import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/guest/Navbar';
import { Footer } from '../../components/guest/Footer';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useToast } from '../../context/ToastContext';
import { BRAND } from '../../config/brand';
import { handleImageError } from '../../utils/imageUtils';
import { Booking } from '../../types/booking';
import {
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  AlertCircle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const MyBookingsPage: React.FC = () => {
  const { bookings, cancelBooking } = useMarketplace();
  const { success } = useToast();

  const [activeTab, setActiveTab] = useState<'all' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(null);
  const [cancelReason, setCancelReason] = useState('Change of flight schedule');

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    return b.status === activeTab;
  });

  const handleConfirmCancel = () => {
    if (!cancellingBooking) return;
    cancelBooking(cancellingBooking.id, cancelReason);
    success('Booking Cancelled', `Reservation ${cancellingBooking.referenceNumber} has been cancelled.`);
    setCancellingBooking(null);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F1] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2F7058]">
              Sanctuary Passport
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#173D32] mt-1">
              My Reservations
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Track past and upcoming sanctuaries along your migration routes
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 border-b border-stone-200 pb-3 mb-8 overflow-x-auto">
            {(['all', 'confirmed', 'completed', 'cancelled'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-semibold px-4 py-2 rounded-xl capitalize transition-all cursor-pointer shrink-0 ${
                  activeTab === tab
                    ? 'bg-[#173D32] text-white shadow-xs'
                    : 'text-stone-600 hover:bg-stone-200/60'
                }`}
              >
                {tab} ({bookings.filter((b) => (tab === 'all' ? true : b.status === tab)).length})
              </button>
            ))}
          </div>

          {/* Bookings List */}
          {filteredBookings.length > 0 ? (
            <div className="space-y-6">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start"
                >
                  <img
                    src={b.propertyImage}
                    alt={b.propertyTitle}
                    className="w-full md:w-52 h-44 rounded-2xl object-cover shrink-0"
                    onError={handleImageError}
                  />

                  <div className="flex-1 flex flex-col justify-between h-full w-full">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A66A] bg-[#173D32] px-2 py-0.5 rounded-md">
                          {b.propertyCategory}
                        </span>

                        {/* Status Badge */}
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full capitalize ${
                            b.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : b.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-stone-200 text-stone-700'
                          }`}
                        >
                          {b.status}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[#173D32] mt-1.5">
                        {b.propertyTitle}
                      </h3>
                      <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#2F7058]" />
                        <span>{b.propertyLocation}</span>
                      </p>
                    </div>

                    {/* Metadata Specs */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4 py-3 border-y border-stone-100 text-xs">
                      <div>
                        <span className="text-[10px] uppercase text-stone-400 font-bold block">Dates</span>
                        <span className="font-semibold text-stone-800">{b.checkIn} → {b.checkOut}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-stone-400 font-bold block">Ref Code</span>
                        <span className="font-mono font-semibold text-[#173D32]">{b.referenceNumber}</span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase text-stone-400 font-bold block">Total Paid</span>
                        <span className="font-bold text-[#173D32]">{BRAND.currency.symbol}{b.pricing.grandTotal.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-1">
                      <Link
                        to={`/property/${b.propertyId}`}
                        className="text-xs font-semibold text-[#2F7058] hover:underline flex items-center gap-1"
                      >
                        <span>View Sanctuary Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>

                      {b.status === 'confirmed' && (
                        <button
                          type="button"
                          onClick={() => setCancellingBooking(b)}
                          className="text-xs font-semibold text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 max-w-md mx-auto my-12">
              <Calendar className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-[#173D32]">No Reservations Found</h3>
              <p className="text-xs text-stone-500 mt-1">You have no {activeTab !== 'all' ? activeTab : ''} bookings at the moment.</p>
              <Link
                to="/explore"
                className="mt-5 inline-block bg-[#173D32] text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[#2F7058] transition-all"
              >
                Discover Sanctuaries
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Cancellation Confirmation Dialog */}
      {cancellingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200 animate-scale-up text-left">
            <h3 className="font-serif text-lg font-bold text-rose-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <span>Cancel Sanctuary Reservation?</span>
            </h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Are you sure you want to cancel reservation <strong>{cancellingBooking.referenceNumber}</strong> at <em>{cancellingBooking.propertyTitle}</em>?
            </p>

            <div className="mt-4">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Reason for Cancellation
              </label>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300"
              >
                <option value="Change of travel dates">Change of travel dates</option>
                <option value="Flight or train cancellation">Flight or train cancellation</option>
                <option value="Personal / family emergency">Personal / family emergency</option>
                <option value="Booked another stay">Booked another stay</option>
              </select>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setCancellingBooking(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Keep Reservation
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow-xs"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
