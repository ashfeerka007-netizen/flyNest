import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useToast } from '../../context/ToastContext';
import { Download, BarChart2, TrendingUp, Users } from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  const { bookings, properties } = useMarketplace();
  const { success } = useToast();

  const handleExport = () => {
    success('Export Initiated', 'Simulated CSV export downloaded for platform reporting.');
  };

  return (
    <AdminLayout>
      <div className="space-y-8 text-left pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Analytics & Auditing</span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32] mt-1">Platform Reports</h1>
            <p className="text-xs text-stone-500 mt-1">Downloadable financial summaries, occupancy rates and host performance metrics</p>
          </div>

          <button
            type="button"
            onClick={handleExport}
            className="bg-[#173D32] hover:bg-[#2F7058] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer w-fit"
          >
            <Download className="w-4 h-4 text-[#C5A66A]" />
            <span>Export CSV Report</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-2">
            <h3 className="font-serif font-bold text-base text-[#173D32]">Average Daily Rate (ADR)</h3>
            <p className="text-2xl font-bold text-[#173D32]">₹12,450</p>
            <p className="text-xs text-stone-400">Highland and coastal sanctuaries weighted avg</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-2">
            <h3 className="font-serif font-bold text-base text-[#173D32]">Avg Length of Stay</h3>
            <p className="text-2xl font-bold text-[#173D32]">3.4 Nights</p>
            <p className="text-xs text-stone-400">Travelers prioritizing restorative slow stays</p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-2">
            <h3 className="font-serif font-bold text-base text-[#173D32]">Superhost Share</h3>
            <p className="text-2xl font-bold text-emerald-700">82%</p>
            <p className="text-xs text-stone-400">Maintained high ratings and responsive hosting</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
