import React, { useState } from 'react';
import { HostLayout } from '../../components/host/HostLayout';
import { useMarketplace } from '../../context/MarketplaceContext';
import { BRAND } from '../../config/brand';
import { Booking } from '../../types/booking';
import {
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ExternalLink,
  Users,
  Eye,
  Mail,
  Phone,
} from 'lucide-react';

export const HostBookingsPage: React.FC = () => {
  const { bookings } = useMarketplace();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReservation, setActiveReservation] = useState<Booking | null>(null);

  const filtered = bookings.filter((b) => {
    if (filterStatus !== 'all' && b.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.referenceNumber.toLowerCase().includes(q) ||
        b.guestDetails.fullName.toLowerCase().includes(q) ||
        b.propertyTitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <HostLayout>
      <div className="space-y-8 text-left pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2F7058]">
              Guest Reservations
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32] mt-1">
              Host Bookings ({bookings.length})
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Monitor incoming traveler schedules, special requests and settlement values
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200">
          <div className="flex items-center gap-2 overflow-x-auto">
            {['all', 'confirmed', 'completed', 'cancelled'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl capitalize transition-colors cursor-pointer shrink-0 ${
                  filterStatus === st
                    ? 'bg-[#173D32] text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference or guest..."
              className="text-xs pl-8 pr-3 py-1.5 rounded-xl border border-stone-300 w-full sm:w-60 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Reservations Ledger Table */}
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-[#F8F7F1]/60 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Booking Ref</th>
                  <th className="py-3.5 px-4">Property</th>
                  <th className="py-3.5 px-4">Guest</th>
                  <th className="py-3.5 px-4">Travel Dates</th>
                  <th className="py-3.5 px-4">Gross Total</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#173D32]">
                      {b.referenceNumber}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-stone-800 max-w-[200px] truncate">
                      {b.propertyTitle}
                    </td>
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-medium text-stone-800">{b.guestDetails.fullName}</p>
                        <p className="text-[10px] text-stone-400 font-mono">{b.guestDetails.email}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-600">
                      {b.checkIn} → {b.checkOut}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#173D32]">
                      ₹{b.pricing.grandTotal.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-stone-200 text-stone-700'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setActiveReservation(b)}
                        className="px-2.5 py-1 rounded-lg border border-stone-200 hover:border-stone-400 text-stone-700 font-semibold text-[11px] cursor-pointer"
                      >
                        View Info
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Reservation View Modal */}
        {activeReservation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 animate-scale-up text-left space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <div>
                  <span className="text-[10px] font-bold uppercase text-stone-400">Reservation Dossier</span>
                  <h3 className="font-mono text-lg font-bold text-[#173D32]">
                    {activeReservation.referenceNumber}
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold capitalize">
                  {activeReservation.status}
                </span>
              </div>

              <div className="text-xs space-y-2">
                <p><strong>Property:</strong> {activeReservation.propertyTitle}</p>
                <p><strong>Dates:</strong> {activeReservation.checkIn} to {activeReservation.checkOut} ({activeReservation.pricing.nights} nights)</p>
                <p><strong>Traveler:</strong> {activeReservation.guestDetails.fullName}</p>
                <p><strong>Contact:</strong> {activeReservation.guestDetails.phone} • {activeReservation.guestDetails.email}</p>
                {activeReservation.guestDetails.specialRequests && (
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-600">
                    <strong>Special Requests:</strong> {activeReservation.guestDetails.specialRequests}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-bold block">Gross Amount</span>
                  <span className="text-base font-bold text-[#173D32]">₹{activeReservation.pricing.grandTotal.toLocaleString()}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveReservation(null)}
                  className="px-4 py-2 bg-[#173D32] text-white text-xs font-semibold rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </HostLayout>
  );
};
