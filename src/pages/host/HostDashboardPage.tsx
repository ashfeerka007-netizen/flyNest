import React from 'react';
import { Link } from 'react-router-dom';
import { HostLayout } from '../../components/host/HostLayout';
import { useMarketplace } from '../../context/MarketplaceContext';
import { BRAND } from '../../config/brand';
import {
  Building,
  CheckCircle,
  Clock,
  BookmarkCheck,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  ArrowRight,
  PlusCircle,
  Eye,
  Star,
  Sparkles,
} from 'lucide-react';

export const HostDashboardPage: React.FC = () => {
  const { properties, bookings, pendingProperties } = useMarketplace();

  // Metrics calculation
  const totalHostProperties = properties.length;
  const approvedCount = properties.filter((p) => p.status === 'approved').length;
  const pendingCount = pendingProperties.length;
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed');

  // Simulated Host revenue (Gross minus 8% platform fee)
  const totalGrossRevenue = bookings.reduce((sum, b) => sum + b.pricing.grandTotal, 0);
  const netEarnings = Math.round(totalGrossRevenue * 0.92);

  const monthlyData = [
    { month: 'Jun', revenue: 42000, bookings: 5 },
    { month: 'Jul', revenue: 58000, bookings: 7 },
    { month: 'Aug', revenue: 74000, bookings: 9 },
    { month: 'Sep', revenue: 89000, bookings: 11 },
    { month: 'Oct', revenue: 112000, bookings: 14 },
    { month: 'Nov', revenue: 145000, bookings: 18 },
  ];

  return (
    <HostLayout>
      <div className="space-y-8 text-left">
        {/* Welcome Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#5B6BD6]">
              Host Management Overview
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1F4A] mt-1">
              Sanctuary Dashboard
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Live performance metrics, pending listings, and upcoming guest reservations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/host/properties/new"
              className="bg-[#1B1F4A] hover:bg-[#5B6BD6] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#F0A92E]" />
              <span>Add New Sanctuary</span>
            </Link>
          </div>
        </div>

        {/* 7 Summary Cards as requested in Part 5.1 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Total Stays</span>
            <p className="text-xl font-bold text-[#1B1F4A] mt-1">{totalHostProperties}</p>
            <span className="text-[10px] text-stone-500">Across corridors</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Active Live</span>
            <p className="text-xl font-bold text-emerald-700 mt-1">{approvedCount}</p>
            <span className="text-[10px] text-emerald-600 font-medium">Bookable</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Pending Approval</span>
            <p className="text-xl font-bold text-amber-600 mt-1">{pendingCount}</p>
            <span className="text-[10px] text-amber-700 font-medium">In verification</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Total Bookings</span>
            <p className="text-xl font-bold text-[#1B1F4A] mt-1">{totalBookings}</p>
            <span className="text-[10px] text-stone-500">All-time stays</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Upcoming Checks</span>
            <p className="text-xl font-bold text-[#5B6BD6] mt-1">{confirmedBookings.length}</p>
            <span className="text-[10px] text-stone-500">This month</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Net Revenue</span>
            <p className="text-lg font-bold text-[#1B1F4A] mt-1 font-serif">
              {BRAND.currency.symbol}{Math.round(netEarnings / 1000)}k
            </p>
            <span className="text-[10px] text-emerald-600 font-medium">+18% vs last mo</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Occupancy Rate</span>
            <p className="text-xl font-bold text-[#1B1F4A] mt-1">84%</p>
            <span className="text-[10px] text-stone-500">High season peak</span>
          </div>
        </div>

        {/* Charts & Graphs Representation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart Visual (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="font-serif text-base font-bold text-[#1B1F4A]">Monthly Earnings Trend</h3>
                <p className="text-xs text-stone-400">Past 6 months payout performance</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                +24.6% Avg Growth
              </span>
            </div>

            {/* Visual Bar Chart */}
            <div className="mt-6 h-56 flex items-end justify-between gap-4 px-2">
              {monthlyData.map((d) => {
                const heightPercent = Math.round((d.revenue / 150000) * 100);
                return (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="text-[10px] font-bold text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{Math.round(d.revenue / 1000)}k
                    </div>
                    <div
                      className="w-full bg-[#1B1F4A]/15 group-hover:bg-[#1B1F4A] rounded-t-xl transition-all duration-300 relative"
                      style={{ height: `${heightPercent}%` }}
                    >
                      <div
                        className="w-full bg-[#5B6BD6] rounded-t-xl absolute bottom-0 transition-all duration-300"
                        style={{ height: `${heightPercent * 0.7}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-stone-600">{d.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Property Status & Pending Approvals (1 col) */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-base font-bold text-[#1B1F4A] mb-1">
                Listing Status Ratio
              </h3>
              <p className="text-xs text-stone-400 mb-6">Marketplace verification progress</p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-emerald-800">Approved & Live</span>
                    <span>{approvedCount}</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full"
                      style={{ width: `${(approvedCount / totalHostProperties) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-amber-700">Pending Review</span>
                    <span>{pendingCount}</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${(pendingCount / totalHostProperties) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 mt-6 text-xs text-amber-900">
              <span className="font-bold block">Did you know?</span>
              New properties submitted by hosts require Administrator approval before showing up in the public guest search results.
            </div>
          </div>
        </div>

        {/* Recent Reservations Table */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
            <div>
              <h3 className="font-serif text-base font-bold text-[#1B1F4A]">
                Recent Guest Reservations
              </h3>
              <p className="text-xs text-stone-400">Incoming bookings across your listings</p>
            </div>
            <Link
              to="/host/bookings"
              className="text-xs font-bold text-[#5B6BD6] hover:underline flex items-center gap-1"
            >
              <span>Manage All ({bookings.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3">Reference</th>
                  <th className="py-3 px-3">Property</th>
                  <th className="py-3 px-3">Guest</th>
                  <th className="py-3 px-3">Dates</th>
                  <th className="py-3 px-3">Total (INR)</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {bookings.slice(0, 4).map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-[#1B1F4A]">{b.referenceNumber}</td>
                    <td className="py-3 px-3 font-medium text-stone-800 truncate max-w-[200px]">{b.propertyTitle}</td>
                    <td className="py-3 px-3">{b.guestDetails.fullName}</td>
                    <td className="py-3 px-3 font-mono text-stone-500">{b.checkIn} → {b.checkOut}</td>
                    <td className="py-3 px-3 font-bold text-[#1B1F4A]">₹{b.pricing.grandTotal.toLocaleString()}</td>
                    <td className="py-3 px-3">
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
    </HostLayout>
  );
};
