import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useToast } from '../../context/ToastContext';
import { BRAND } from '../../config/brand';
import {
  Building2,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  ExternalLink,
} from 'lucide-react';

export const AdminPropertiesPage: React.FC = () => {
  const { properties, approveProperty, rejectProperty, deleteProperty } = useMarketplace();
  const { success, error } = useToast();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = properties.filter((p) => {
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.location.city.toLowerCase().includes(q) ||
        p.host.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-8 text-left pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
              Inventory Oversight
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32] mt-1">
              All Properties ({properties.length})
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Global directory of approved, pending and rejected listings
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200">
          <div className="flex items-center gap-2 overflow-x-auto">
            {['all', 'approved', 'pending', 'rejected'].map((st) => (
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
              placeholder="Search by title, city or host..."
              className="text-xs pl-8 pr-3 py-1.5 rounded-xl border border-stone-300 w-full sm:w-64 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-[#F8F7F1]/60 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Property</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Host</th>
                  <th className="py-3.5 px-4">Nightly Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.title}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                        <div className="max-w-[200px]">
                          <Link to={`/property/${p.id}`} className="font-bold text-stone-800 hover:text-[#173D32] truncate block">
                            {p.title}
                          </Link>
                          <span className="text-[10px] text-stone-400">{p.maxGuests} Guests • {p.bedrooms} Beds</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-stone-700">{p.category}</td>
                    <td className="py-3.5 px-4">{p.location.city}, {p.location.country}</td>
                    <td className="py-3.5 px-4">{p.host.name}</td>
                    <td className="py-3.5 px-4 font-bold text-[#173D32]">
                      {BRAND.currency.symbol}{p.pricePerNight.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                        p.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.status === 'pending'
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {p.status === 'pending' && (
                        <button
                          onClick={() => {
                            approveProperty(p.id);
                            success('Approved', `Published ${p.title}`);
                          }}
                          className="text-[11px] font-bold text-emerald-700 hover:underline"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (confirm(`Delete listing "${p.title}"?`)) {
                            deleteProperty(p.id);
                            error('Deleted', `Removed ${p.title}`);
                          }
                        }}
                        className="text-[11px] text-rose-600 hover:underline"
                      >
                        Delete
                      </button>
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
