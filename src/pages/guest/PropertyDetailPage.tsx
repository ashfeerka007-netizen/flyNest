import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/guest/Navbar';
import { Footer } from '../../components/guest/Footer';
import { BookingPanel } from '../../components/guest/BookingPanel';
import { PropertyCard } from '../../components/guest/PropertyCard';
import { useMarketplace } from '../../context/MarketplaceContext';
import { BRAND } from '../../config/brand';
import { handleImageError, handleAvatarError } from '../../utils/imageUtils';
import {
  Star,
  MapPin,
  Heart,
  Share2,
  Users,
  Bed,
  Bath,
  Sparkles,
  ShieldCheck,
  Check,
  Calendar,
  Clock,
  Ban,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Wifi,
  Waves,
  Mountain,
  Flame,
  Utensils,
  Coffee,
  TreePine,
  Compass,
} from 'lucide-react';

export const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { properties, toggleWishlist, isWishlisted } = useMarketplace();
  const navigate = useNavigate();

  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const property = properties.find((p) => p.id === id) || properties[0];
  const wishlisted = property ? isWishlisted(property.id) : false;

  // Similar properties
  const similarProperties = property
    ? properties
        .filter((p) => p.id !== property.id && (p.category === property.category || p.location.country === property.location.country))
        .slice(0, 3)
    : [];

  if (!property) {
    return (
      <div className="min-h-screen bg-[#EEF0F8] flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-16 text-center max-w-md mx-auto px-4">
          <h2 className="font-serif text-2xl font-bold text-[#1B1F4A]">Sanctuary Not Found</h2>
          <p className="text-xs text-stone-500 mt-2">The requested accommodation could not be located along this corridor.</p>
          <Link to="/explore" className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-[#1B1F4A] text-white text-xs font-semibold">
            Explore All Sanctuaries
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Amenity icon mapping
  const getAmenityDetails = (amenityKey: string) => {
    const map: Record<string, { label: string; icon: React.ElementType }> = {
      wifi: { label: 'Fiber High-speed Wi-Fi', icon: Wifi },
      private_pool: { label: 'Private Heated Plunge Pool', icon: Waves },
      mountain_view: { label: 'Panoramic Ridge & Valley View', icon: Mountain },
      fireplace: { label: 'Wood-burning Deodar Fireplace', icon: Flame },
      kitchen: { label: 'Fully Equipped Artisan Kitchen', icon: Utensils },
      breakfast: { label: 'Farm-to-Table Breakfast Included', icon: Coffee },
      tea_tasting: { label: 'Private Highland Tea Tasting', icon: Coffee },
      organic_garden: { label: 'Forest Garden & Healing Herbs', icon: TreePine },
      binoculars: { label: 'Avian Observatory Field Kit', icon: Compass },
    };
    return map[amenityKey] || { label: amenityKey.replace('_', ' '), icon: Check };
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: property.tagline,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF0F8] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          {/* Breadcrumb & Navigation */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-4">
            <div className="flex items-center gap-1.5">
              <Link to="/" className="hover:text-[#1B1F4A]">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link to="/explore" className="hover:text-[#1B1F4A]">Explore</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#5B6BD6] font-medium truncate max-w-[200px]">{property.title}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="flex items-center gap-1 text-xs font-semibold text-stone-700 hover:text-[#1B1F4A] bg-white px-3 py-1.5 rounded-full border border-stone-200 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>

              <button
                onClick={() => toggleWishlist(property.id)}
                className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                  wishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-stone-200 text-stone-700 hover:text-rose-600'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'fill-current' : ''}`} />
                <span>{wishlisted ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>

          {/* Title & Location Header */}
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#F0A92E] bg-[#1B1F4A] px-3 py-1 rounded-full">
              {property.category}
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B1F4A] mt-2">
              {property.title}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 mt-1 italic font-serif">
              "{property.tagline}"
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 mt-3">
              <span className="flex items-center gap-1 font-semibold text-[#1B1F4A]">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>{property.rating}</span>
                <span className="text-stone-400 font-normal">({property.reviewCount} reviews)</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#5B6BD6] font-medium">
                <MapPin className="w-3.5 h-3.5" />
                <span>{property.location.address}</span>
              </span>
              {property.host.isSuperhost && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-[#F0A92E] font-semibold">
                    <Sparkles className="w-3 h-3" /> Superhost Curation
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[420px] sm:h-[480px] rounded-3xl overflow-hidden mb-12 shadow-lg">
            {/* Main Primary Image */}
            <div
              className="md:col-span-2 h-full relative cursor-pointer group overflow-hidden"
              onClick={() => {
                setActivePhotoIndex(0);
                setGalleryModalOpen(true);
              }}
            >
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Sub-grid of images */}
            <div className="hidden md:grid col-span-2 grid-cols-2 gap-3 h-full">
              {property.images.slice(1, 5).map((img, idx) => (
                <div
                  key={idx}
                  className="relative cursor-pointer group overflow-hidden h-[234px]"
                  onClick={() => {
                    setActivePhotoIndex(idx + 1);
                    setGalleryModalOpen(true);
                  }}
                >
                  <img
                    src={img}
                    alt={`${property.title} view ${idx + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={handleImageError}
                  />
                  {idx === 3 && property.images.length > 5 && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center text-white font-semibold text-sm">
                      +{property.images.length - 4} More Photos
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Layout: Left Details + Right Sticky Booking Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left 2 Columns: Description & Features */}
            <div className="lg:col-span-2 space-y-10">
              {/* Hosted By Summary Card */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-start gap-4">
                <img
                  src={property.host.avatar}
                  alt={property.host.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#F0A92E]"
                  onError={handleAvatarError}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#1B1F4A]">
                        Hosted by {property.host.name}
                      </h3>
                      <p className="text-xs text-stone-500">
                        Sanctuary host since {property.host.joinedYear} • Responds {property.host.responseRate}
                      </p>
                    </div>
                    {property.host.isSuperhost && (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#F0A92E]/20 text-[#1B1F4A] border border-[#F0A92E]/40 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#F0A92E]" /> Superhost
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                    "{property.host.bio}"
                  </p>
                </div>
              </div>

              {/* Property Capacity & Quick Specs */}
              <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-stone-100/70 border border-stone-200 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Users className="w-5 h-5 text-[#5B6BD6]" />
                  <span className="text-xs font-bold text-[#1B1F4A]">Up to {property.maxGuests} Guests</span>
                  <span className="text-[10px] text-stone-400">Restful sanctuary</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Bed className="w-5 h-5 text-[#5B6BD6]" />
                  <span className="text-xs font-bold text-[#1B1F4A]">{property.bedrooms} Bedrooms</span>
                  <span className="text-[10px] text-stone-400">{property.beds} Luxury Beds</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Bath className="w-5 h-5 text-[#5B6BD6]" />
                  <span className="text-xs font-bold text-[#1B1F4A]">{property.bathrooms} Bathrooms</span>
                  <span className="text-[10px] text-stone-400">Spring-fed baths</span>
                </div>
              </div>

              {/* Editorial Description */}
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1B1F4A] mb-3">
                  About this Sanctuary
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed font-light whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              <hr className="border-stone-200" />

              {/* Amenities */}
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1B1F4A] mb-4">
                  Sanctuary Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.amenities.map((amenityKey) => {
                    const info = getAmenityDetails(amenityKey);
                    const Icon = info.icon;
                    return (
                      <div
                        key={amenityKey}
                        className="flex items-center gap-3 p-3 rounded-xl bg-white border border-stone-200/80"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#1B1F4A]/10 text-[#1B1F4A] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-medium text-stone-800">{info.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <hr className="border-stone-200" />

              {/* House Rules & Policies */}
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1B1F4A] mb-4">
                  Sanctuary Etiquette & Rules
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                    <div className="flex items-center gap-2 text-[#1B1F4A] font-semibold">
                      <Clock className="w-4 h-4 text-[#F0A92E]" />
                      <span>Check-in: After {property.houseRules.checkIn}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#1B1F4A] font-semibold">
                      <Clock className="w-4 h-4 text-[#F0A92E]" />
                      <span>Check-out: Before {property.houseRules.checkOut}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2 text-stone-700">
                    <p>• {property.houseRules.petsAllowed ? 'Pets welcome with prior notice' : 'No pets permitted'}</p>
                    <p>• {property.houseRules.smokingAllowed ? 'Designated smoking areas' : 'Strictly non-smoking sanctuary'}</p>
                    <p>• {property.houseRules.partiesAllowed ? 'Gatherings permitted' : 'No loud parties; wildlife quiet hours apply'}</p>
                  </div>
                </div>
              </div>

              <hr className="border-stone-200" />

              {/* Location Map Section */}
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1B1F4A] mb-2">
                  Location & Surroundings
                </h3>
                <p className="text-xs text-stone-500 mb-4">
                  {property.location.address} — nestled in the heart of {property.destination}.
                </p>

                <div className="relative h-64 rounded-2xl overflow-hidden border border-stone-300">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                    alt="Map Location"
                    className="w-full h-full object-cover filter contrast-125 opacity-70"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-[#1B1F4A]/30 flex items-center justify-center">
                    <div className="bg-white/95 px-4 py-2 rounded-full shadow-xl border border-stone-200 flex items-center gap-2 text-xs font-bold text-[#1B1F4A]">
                      <MapPin className="w-4 h-4 text-[#F0A92E]" />
                      <span>{property.location.city}, {property.location.state}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Booking Summary Panel */}
            <div className="lg:col-span-1">
              <BookingPanel property={property} />
            </div>
          </div>

          {/* Similar Sanctuaries Recommendations */}
          <div className="mt-20 pt-12 border-t border-stone-200">
            <h2 className="font-serif text-2xl font-bold text-[#1B1F4A] mb-6">
              Similar Sanctuaries You Might Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Gallery Lightbox Modal */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
          <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full pb-4">
            <span className="text-xs font-semibold text-stone-400">
              Photo {activePhotoIndex + 1} of {property.images.length}
            </span>
            <button
              onClick={() => setGalleryModalOpen(false)}
              className="text-white hover:text-stone-300 text-sm font-semibold px-3 py-1 bg-white/10 rounded-full"
            >
              Close ✕
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center max-w-5xl mx-auto w-full my-auto">
            <img
              src={property.images[activePhotoIndex]}
              alt={`Full view ${activePhotoIndex + 1}`}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              onError={handleImageError}
            />
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto py-4 max-w-3xl mx-auto">
            {property.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActivePhotoIndex(i)}
                className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  activePhotoIndex === i ? 'border-[#F0A92E] scale-105' : 'border-transparent opacity-60'
                }`}
              >
                <img src={img} alt="thumb" className="w-full h-full object-cover" onError={handleImageError} />
              </button>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
