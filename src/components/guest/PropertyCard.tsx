import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../../types/property';
import { useMarketplace } from '../../context/MarketplaceContext';
import { BRAND } from '../../config/brand';
import { Heart, Star, MapPin, Users, Sparkles, Zap } from 'lucide-react';
import { handleImageError } from '../../utils/imageUtils';

interface PropertyCardProps {
  property: Property;
  viewMode?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  viewMode = 'grid',
}) => {
  const { toggleWishlist, isWishlisted } = useMarketplace();
  const wishlisted = isWishlisted(property.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(property.id);
  };

  const isList = viewMode === 'list';

  return (
    <div
      className={`group bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#5B6BD6]/40 transition-all duration-300 flex flex-col ${
        isList ? 'md:flex-row' : ''
      }`}
    >
      {/* Property Image Container */}
      <div className={`relative overflow-hidden ${isList ? 'md:w-80 h-64 md:h-auto' : 'h-64 sm:h-60'}`}>
        <Link to={`/property/${property.id}`} className="block w-full h-full">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={handleImageError}
          />
        </Link>

        {/* Gradient overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#1B1F4A]/85 text-[#F0A92E] backdrop-blur-md border border-[#F0A92E]/30">
            {property.category}
          </span>
          {property.host.isSuperhost && (
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/90 text-[#1B1F4A] backdrop-blur-md flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#F0A92E]" /> Superhost
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all cursor-pointer z-10 ${
            wishlisted
              ? 'bg-rose-500 text-white scale-110 shadow-md'
              : 'bg-black/30 hover:bg-black/50 text-white hover:scale-110'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Instant Book Tag */}
        {property.instantBookable && (
          <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 backdrop-blur-xs flex items-center gap-1 border border-emerald-500/30">
              <Zap className="w-2.5 h-2.5 text-[#F0A92E]" /> Instant Book
            </span>
          </div>
        )}
      </div>

      {/* Property Details Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="flex items-center gap-1 text-[#5B6BD6] font-medium truncate max-w-[200px]">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{property.location.city}, {property.location.country}</span>
            </span>
            <span className="flex items-center gap-1 font-semibold text-[#1B1F4A]">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{property.rating}</span>
              <span className="text-stone-400 font-normal">({property.reviewCount})</span>
            </span>
          </div>

          {/* Property Title */}
          <Link to={`/property/${property.id}`} className="block group-hover:text-[#5B6BD6] transition-colors">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#1B1F4A] line-clamp-1">
              {property.title}
            </h3>
          </Link>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-stone-500 mt-1 line-clamp-1 italic">
            "{property.tagline}"
          </p>

          {/* Specs */}
          <div className="flex items-center gap-3 text-xs text-stone-400 mt-2.5">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>Up to {property.maxGuests} guests</span>
            </span>
            <span>•</span>
            <span>{property.bedrooms} {property.bedrooms === 1 ? 'bed' : 'beds'}</span>
            <span>•</span>
            <span>{property.bathrooms} {property.bathrooms === 1 ? 'bath' : 'baths'}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-bold text-[#1B1F4A]">
              {BRAND.currency.symbol}{property.pricePerNight.toLocaleString()}
            </span>
            <span className="text-xs text-stone-400">/ night</span>
            {property.originalPricePerNight && (
              <span className="text-xs text-stone-400 line-through ml-1">
                {BRAND.currency.symbol}{property.originalPricePerNight.toLocaleString()}
              </span>
            )}
          </div>

          <Link
            to={`/property/${property.id}`}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#1B1F4A]/5 hover:bg-[#1B1F4A] text-[#1B1F4A] hover:text-white transition-all"
          >
            Explore Stay →
          </Link>
        </div>
      </div>
    </div>
  );
};
