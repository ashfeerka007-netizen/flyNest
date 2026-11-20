import React from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useMarketplace } from '../../context/MarketplaceContext';
import { MOCK_USERS } from '../../data/mockUsers';
import { BRAND } from '../../config/brand';
import {
  Users,
  Building,
  CheckCircle,
  AlertTriangle,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  Percent,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { properties, bookings, pendingProperties, commissionConfig } = useMarketplace();

  // Platform KPIs as required by Part 6.1
  const totalUsers = MOCK_USERS.length + 18; // base sample
  const totalHosts = properties.reduce((acc, p) => acc.add(p.host.id), new Set()).size + 2;
  const totalProperties = properties.length;
  const pendingApprovals = pendingProperties.length;
  const totalReservations = bookings.length;
  const confirmedReservations = bookings.filter((b) => b.status === 'confirmed').length;

  const grossBookingValue = bookings.reduce((sum, b) => sum + b.pricing.grandTotal, 0);
  const platformCommissionEarned = Math.round(grossBookingValue * commissionConfig.hostCommissionRate);

  const categoryDistribution = [
    { cat: 'Villas', count: properties.filter((p) => p.category === 'Villas').length },
    { cat: 'Unique Stays', count: properties.filter((p) => p.category === 'Unique Stays').length },
    { cat: 'Resorts', count: properties.filter((p) => p.category === 'Resorts').length },
    { cat: 'Eco Stays', count: properties.filter((p) => p.category === 'Eco Stays').length },
    { cat: 'Homestays', count: properties.filter((p) => p.category === 'Homestays').length },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8 text-left pb-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
              System Health & Governance
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32] mt-1">
              Platform Administration Dashboard
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Global marketplace metrics, host listing verifications, and financial commission logs
            </p>
          </div>

          {pendingApprovals > 0 && (
            <Link
              to="/admin/approvals"
              className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer animate-pulse"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Review {pendingApprovals} Pending Listings</span>
            </Link>
          )}
        </div>

        {/* 8 Primary Platform KPIs as required in Part 6.1 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Total Users</span>
            <p className="text-2xl font-bold text-[#173D32] mt-1">{totalUsers}</p>
            <span className="text-[10px] text-emerald-600 font-medium">+14 this week</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Total Hosts</span>
            <p className="text-2xl font-bold text-[#173D32] mt-1">{totalHosts}</p>
            <span className="text-[10px] text-stone-500">Verified custodians</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Total Properties</span>
            <p className="text-2xl font-bold text-[#173D32] mt-1">{totalProperties}</p>
            <span className="text-[10px] text-stone-500">Global sanctuaries</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Pending Approvals</span>
            <p className="text-2xl font-bold text-amber-600 mt-1">{pendingApprovals}</p>
            <span className="text-[10px] text-amber-700 font-medium">Awaiting action</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Total Bookings</span>
            <p className="text-2xl font-bold text-[#173D32] mt-1">{totalReservations}</p>
            <span className="text-[10px] text-stone-500">Across platform</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Confirmed Stays</span>
            <p className="text-2xl font-bold text-emerald-700 mt-1">{confirmedReservations}</p>
            <span className="text-[10px] text-emerald-600 font-medium">Active reservations</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Gross Booking Value</span>
            <p className="text-xl font-bold text-[#173D32] mt-1 font-serif">
              ₹{grossBookingValue.toLocaleString()}
            </p>
            <span className="text-[10px] text-stone-500">Simulated transactions</span>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase">Platform Revenue</span>
            <p className="text-xl font-bold text-emerald-700 mt-1 font-serif">
              ₹{platformCommissionEarned.toLocaleString()}
            </p>
            <span className="text-[10px] text-stone-500">{(commissionConfig.hostCommissionRate * 100)}% Host Commission</span>
          </div>
        </div>

        {/* Category Breakdown & Pending Approvals Snapshot */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Listings Quick Action (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div>
                <h3 className="font-serif text-base font-bold text-[#173D32]">
                  Awaiting Verification & Approvals
                </h3>
                <p className="text-xs text-stone-400">Host properties submitted awaiting public launch</p>
              </div>
              <Link
                to="/admin/approvals"
                className="text-xs font-bold text-[#2F7058] hover:underline flex items-center gap-1"
              >
                <span>Approvals Console →</span>
              </Link>
            </div>

            {pendingProperties.length > 0 ? (
              <div className="space-y-3">
                {pendingProperties.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.title}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-xs text-[#173D32]">{p.title}</h4>
                        <p className="text-[10px] text-stone-500">{p.category} • {p.destination} • ₹{p.pricePerNight}/night</p>
                        <p className="text-[10px] text-stone-400">Host: {p.host.name}</p>
                      </div>
                    </div>

                    <Link
                      to="/admin/approvals"
                      className="px-3 py-1.5 rounded-xl bg-[#173D32] text-white text-xs font-semibold hover:bg-[#2F7058] transition-colors shrink-0"
                    >
                      Review & Approve
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-stone-400">
                <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                All host listings have been reviewed and approved!
              </div>
            )}
          </div>

          {/* Category Distribution (1 col) */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs">
            <h3 className="font-serif text-base font-bold text-[#173D32] mb-1">
              Category Distribution
            </h3>
            <p className="text-xs text-stone-400 mb-6">Marketplace inventory by stay type</p>

            <div className="space-y-3 text-xs">
              {categoryDistribution.map((item) => (
                <div key={item.cat} className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span className="text-stone-700">{item.cat}</span>
                    <span className="font-bold text-[#173D32]">{item.count} stays</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#173D32]"
                      style={{ width: `${(item.count / totalProperties) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
