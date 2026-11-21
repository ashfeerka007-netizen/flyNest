import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useMarketplace } from '../../context/MarketplaceContext';
import { BRAND } from '../../config/brand';
import { CreditCard, CheckCircle2 } from 'lucide-react';

export const AdminPaymentsPage: React.FC = () => {
  const { bookings, commissionConfig } = useMarketplace();

  return (
    <AdminLayout>
      <div className="space-y-8 text-left pb-16">
        <div className="pb-6 border-b border-stone-200">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Financial Clearinghouse</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1F4A] mt-1">
            Simulated Payments & Transactions
          </h1>
          <p className="text-xs text-stone-500 mt-1">Gateway settlement references, platform commission calculations and tax disbursements</p>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-[#EEF0F8]/60 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Txn Reference</th>
                  <th className="py-3.5 px-4">Booking</th>
                  <th className="py-3.5 px-4">Method</th>
                  <th className="py-3.5 px-4">Gross Collected</th>
                  <th className="py-3.5 px-4">Platform Fee ({(commissionConfig.hostCommissionRate * 100)}%)</th>
                  <th className="py-3.5 px-4">Net Host Due</th>
                  <th className="py-3.5 px-4">Gateway Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {bookings.map((b) => {
                  const fee = Math.round(b.pricing.grandTotal * commissionConfig.hostCommissionRate);
                  const net = b.pricing.grandTotal - fee;

                  return (
                    <tr key={b.id} className="hover:bg-stone-50">
                      <td className="py-3.5 px-4 font-mono font-bold text-stone-800">{b.payment.transactionReference}</td>
                      <td className="py-3.5 px-4 font-mono text-[#1B1F4A] font-semibold">{b.referenceNumber}</td>
                      <td className="py-3.5 px-4 uppercase text-[10px] font-bold text-stone-600">{b.payment.method}</td>
                      <td className="py-3.5 px-4 font-bold text-[#1B1F4A]">₹{b.pricing.grandTotal.toLocaleString()}</td>
                      <td className="py-3.5 px-4 text-purple-700 font-semibold">₹{fee.toLocaleString()}</td>
                      <td className="py-3.5 px-4 text-emerald-700 font-bold">₹{net.toLocaleString()}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Simulated Settled
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
