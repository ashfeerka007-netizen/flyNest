import React from 'react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useToast } from '../../context/ToastContext';
import { BRAND } from '../../config/brand';
import { handleImageError } from '../../utils/imageUtils';
import {
  CheckCircle2,
  XCircle,
  Eye,
  AlertTriangle,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';

export const AdminApprovalsPage: React.FC = () => {
  const { pendingProperties, approveProperty, rejectProperty } = useMarketplace();
  const { success, error } = useToast();

  const handleApprove = (id: string, title: string) => {
    approveProperty(id);
    success(
      'Listing Approved!',
      `"${title}" is now active and immediately bookable on the public guest site.`
    );
  };

  const handleReject = (id: string, title: string) => {
    rejectProperty(id);
    error(
      'Listing Rejected',
      `"${title}" has been rejected. The host has been notified to re-submit documentation.`
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-8 text-left pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
              Trust & Curation Queue
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32] mt-1">
              Property Verification & Approvals ({pendingProperties.length})
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Review newly created host listings. Approving a listing immediately makes it live in guest search results!
            </p>
          </div>
        </div>

        {/* Approval Cards List */}
        {pendingProperties.length > 0 ? (
          <div className="space-y-6">
            {pendingProperties.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col lg:flex-row gap-6 items-start justify-between"
              >
                <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-3/4">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full sm:w-56 h-48 rounded-2xl object-cover shrink-0"
                    onError={handleImageError}
                  />

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                        {p.category}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        Submitted: {p.createdAt}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#173D32]">
                      {p.title}
                    </h3>
                    <p className="text-xs text-stone-500 italic font-serif">
                      "{p.tagline}"
                    </p>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-stone-500">
                      <span className="flex items-center gap-1 font-semibold text-[#173D32]">
                        <MapPin className="w-3.5 h-3.5 text-[#2F7058]" />
                        <span>{p.location.city}, {p.location.country}</span>
                      </span>
                      <span>•</span>
                      <span>₹{p.pricePerNight.toLocaleString()} / night</span>
                      <span>•</span>
                      <span>Host: <strong className="text-[#173D32]">{p.host.name}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Approve / Reject Actions */}
                <div className="w-full lg:w-auto flex lg:flex-col gap-2 pt-4 lg:pt-0 border-t lg:border-t-0 border-stone-100 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleApprove(p.id, p.title)}
                    className="flex-1 lg:flex-none bg-[#173D32] hover:bg-emerald-800 text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C5A66A]" />
                    <span>Approve & Publish</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleReject(p.id, p.title)}
                    className="flex-1 lg:flex-none bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold px-5 py-2.5 rounded-xl border border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>

                  <Link
                    to={`/property/${p.id}`}
                    target="_blank"
                    className="flex-1 lg:flex-none text-stone-600 hover:text-[#173D32] text-xs font-medium py-2 text-center"
                  >
                    Preview Listing ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 max-w-md mx-auto my-12">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
            <h3 className="font-serif text-lg font-bold text-[#173D32]">
              Queue Clear!
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              There are no host properties currently awaiting administrator approval.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
