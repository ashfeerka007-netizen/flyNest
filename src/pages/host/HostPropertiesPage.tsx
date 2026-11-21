import React from 'react';
import { Link } from 'react-router-dom';
import { HostLayout } from '../../components/host/HostLayout';
import { useMarketplace } from '../../context/MarketplaceContext';
import { BRAND } from '../../config/brand';
import { handleImageError } from '../../utils/imageUtils';
import {
  PlusCircle,
  ExternalLink,
  Edit,
  Trash2,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Star,
  MapPin,
} from 'lucide-react';

export const HostPropertiesPage: React.FC = () => {
  const { properties, deleteProperty } = useMarketplace();

  return (
    <HostLayout>
      <div className="space-y-8 text-left">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2F7058]">
              Listing Management
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32] mt-1">
              My Managed Sanctuaries ({properties.length})
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Active listings, pending verifications, and property configuration
            </p>
          </div>

          <Link
            to="/host/properties/new"
            className="bg-[#173D32] hover:bg-[#2F7058] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer w-fit"
          >
            <PlusCircle className="w-4 h-4 text-[#C5A66A]" />
            <span>Create New Listing Wizard</span>
          </Link>
        </div>

        {/* Property Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={p.images[0]}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    {p.status === 'approved' && (
                      <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1 shadow-sm">
                        <CheckCircle className="w-3 h-3" /> Live & Approved
                      </span>
                    )}
                    {p.status === 'pending' && (
                      <span className="bg-amber-500/95 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1 shadow-sm animate-pulse">
                        <Clock className="w-3 h-3" /> Pending Admin Review
                      </span>
                    )}
                    {p.status === 'rejected' && (
                      <span className="bg-rose-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs flex items-center gap-1 shadow-sm">
                        <XCircle className="w-3 h-3" /> Needs Re-submission
                      </span>
                    )}
                  </div>

                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {p.images.length} Photos
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                    <span className="text-[#2F7058] font-bold uppercase text-[10px]">
                      {p.category}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-stone-800">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{p.rating}</span>
                      <span className="text-stone-400">({p.reviewCount})</span>
                    </span>
                  </div>

                  <h3 className="font-serif text-base font-bold text-[#173D32] line-clamp-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-stone-400 flex items-center gap-1 mt-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{p.location.city}, {p.location.country}</span>
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-base font-bold text-[#173D32]">
                        {BRAND.currency.symbol}{p.pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-xs text-stone-400"> / night</span>
                    </div>
                    <span className="text-[11px] text-stone-500">
                      Up to {p.maxGuests} guests
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-[#F8F7F1]/60 border-t border-stone-100 flex items-center justify-between text-xs">
                <Link
                  to={`/property/${p.id}`}
                  className="font-semibold text-stone-600 hover:text-[#173D32] flex items-center gap-1"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Public View</span>
                </Link>

                <div className="flex items-center gap-2">
                  <Link
                    to="/host/calendar"
                    className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-200 transition-colors"
                    title="Calendar Rates"
                  >
                    <Calendar className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => {
                      if (confirm(`Remove listing "${p.title}"?`)) {
                        deleteProperty(p.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Listing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </HostLayout>
  );
};
