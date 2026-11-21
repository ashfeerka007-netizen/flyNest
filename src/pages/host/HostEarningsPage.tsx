import React from 'react';
import { HostLayout } from '../../components/host/HostLayout';
import { useMarketplace } from '../../context/MarketplaceContext';
import { BRAND } from '../../config/brand';
import { DollarSign, TrendingUp, ArrowDownRight, CreditCard, ShieldCheck } from 'lucide-react';

export const HostEarningsPage: React.FC = () => {
  const { bookings } = useMarketplace();

  // Gross bookings calculation
  const totalGross = bookings.reduce((sum, b) => sum + b.pricing.grandTotal, 0);
  const platformCommission = Math.round(totalGross * 0.08); // 8% platform fee
  const netEarnings = totalGross - platformCommission;

  return (
    <HostLayout>
      <div className="space-y-8 text-left pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B6BD6]">
              Financial Performance
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1F4A] mt-1">
              Earnings & Payouts
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Demonstration accounting breakdown showing gross bookings, platform fee deductions and scheduled bank settlements
            </p>
          </div>
        </div>

        {/* 5 Financial Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Gross Booking Value</span>
            <p className="text-2xl font-serif font-bold text-[#1B1F4A] mt-1">
              ₹{totalGross.toLocaleString()}
            </p>
            <span className="text-[10px] text-stone-500">All guest payments</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Platform Fee (8%)</span>
            <p className="text-2xl font-serif font-bold text-rose-700 mt-1">
              -₹{platformCommission.toLocaleString()}
            </p>
            <span className="text-[10px] text-stone-500">Concierge & insurance</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Net Host Earnings</span>
            <p className="text-2xl font-serif font-bold text-emerald-700 mt-1">
              ₹{netEarnings.toLocaleString()}
            </p>
            <span className="text-[10px] text-emerald-600 font-medium">92% retainment</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Completed Payouts</span>
            <p className="text-2xl font-serif font-bold text-[#1B1F4A] mt-1">
              ₹{(netEarnings * 0.7).toFixed(0)}
            </p>
            <span className="text-[10px] text-stone-500">Transferred to HDFC</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Upcoming Payout</span>
            <p className="text-2xl font-serif font-bold text-amber-700 mt-1">
              ₹{(netEarnings * 0.3).toFixed(0)}
            </p>
            <span className="text-[10px] text-amber-600 font-medium">Settling in 48h</span>
          </div>
        </div>

        {/* Transaction History Ledger */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
            <div>
              <h3 className="font-serif text-base font-bold text-[#1B1F4A]">
                Demonstration Payout Ledger
              </h3>
              <p className="text-xs text-stone-400">All historical settlement credits</p>
            </div>
            <span className="text-[10px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
              Simulated Financial Data
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Reference</th>
                  <th className="py-3 px-3">Gross Guest Charge</th>
                  <th className="py-3 px-3">Platform Fee (8%)</th>
                  <th className="py-3 px-3">Net Disbursed</th>
                  <th className="py-3 px-3">Bank Account</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {bookings.map((b) => {
                  const fee = Math.round(b.pricing.grandTotal * 0.08);
                  const net = b.pricing.grandTotal - fee;

                  return (
                    <tr key={b.id} className="hover:bg-stone-50">
                      <td className="py-3 px-3 font-mono text-stone-500">
                        {b.createdAt.split('T')[0]}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-[#1B1F4A]">
                        {b.referenceNumber}
                      </td>
                      <td className="py-3 px-3 font-semibold text-stone-800">
                        ₹{b.pricing.grandTotal.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-rose-600 font-medium">
                        -₹{fee.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 font-bold text-emerald-800">
                        ₹{net.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-stone-500 font-mono">
                        HDFC •••• 9840
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HostLayout>
  );
};
