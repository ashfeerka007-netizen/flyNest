import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useMarketplace } from '../../context/MarketplaceContext';
import { BRAND } from '../../config/brand';
import { Calendar, CreditCard, ShieldCheck } from 'lucide-react';

export const AdminBookingsPage: React.FC = () => {
  const { bookings } = useMarketplace();

  return (
    <AdminLayout>
      <div className="space-y-8 text-left pb-16">
        <div className="pb-6 border-b border-stone-200">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Platform Bookings Ledger</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32] mt-1">
            Global Reservations ({bookings.length})
          </h1>
          <p className="text-xs text-stone-500 mt-1">Universal transaction and booking ledger across all host sanctuaries</p>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-[#F8F7F1]/60 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Ref</th>
                  <th className="py-3.5 px-4">Sanctuary</th>
                  <th className="py-3.5 px-4">Guest</th>
                  <th className="py-3.5 px-4">Host</th>
                  <th className="py-3.5 px-4">Dates</th>
                  <th className="py-3.5 px-4">Gross Total</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#173D32]">{b.referenceNumber}</td>
                    <td className="py-3.5 px-4 font-semibold text-stone-800">{b.propertyTitle}</td>
                    <td className="py-3.5 px-4">{b.guestDetails.fullName}</td>
                    <td className="py-3.5 px-4">{b.hostName}</td>
                    <td className="py-3.5 px-4 font-mono text-stone-500">{b.checkIn} → {b.checkOut}</td>
                    <td className="py-3.5 px-4 font-bold text-[#173D32]">₹{b.pricing.grandTotal.toLocaleString()}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
