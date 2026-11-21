import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/guest/Navbar';
import { Footer } from '../../components/guest/Footer';
import { HeroSearch } from '../../components/guest/HeroSearch';
import { CategoryBar } from '../../components/guest/CategoryBar';
import { PropertyCard } from '../../components/guest/PropertyCard';
import { MigrationPattern } from '../../components/common/MigrationPattern';
import { useMarketplace } from '../../context/MarketplaceContext';
import { TESTIMONIALS } from '../../data/mockReviews';
import { BRAND } from '../../config/brand';
import { handleImageError, handleAvatarError } from '../../utils/imageUtils';
import {
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  ShieldCheck,
  Heart,
  Feather,
  Wind,
  Trees,
  CheckCircle2,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { approvedProperties, searchState, updateSearch } = useMarketplace();
  const navigate = useNavigate();

  const handleCategorySelect = (category: string) => {
    updateSearch({ category: category as any });
    navigate(`/explore${category !== 'All' ? `?category=${category}` : ''}`);
  };

  const featuredStays = approvedProperties.filter((p) => p.featured).slice(0, 4);
  const uniqueStays = approvedProperties.filter((p) => p.category === 'Unique Stays' || p.category === 'Eco Stays').slice(0, 4);
  const popularStays = approvedProperties.slice(0, 6);

  const curatedDestinations = [
    {
      name: 'Wayanad',
      tag: 'Rainforest Canopy',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      stays: '18 Sanctuaries',
    },
    {
      name: 'Munnar',
      tag: 'Cloud & Tea Valleys',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      stays: '24 Sanctuaries',
    },
    {
      name: 'Coorg',
      tag: 'Coffee Estates',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      stays: '15 Sanctuaries',
    },
    {
      name: 'Goa',
      tag: 'Coastal Cliffs',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      stays: '32 Sanctuaries',
    },
    {
      name: 'Jaipur',
      tag: 'Heritage Havelis',
      image: 'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=800&q=80',
      stays: '21 Sanctuaries',
    },
    {
      name: 'Bali',
      tag: 'Bamboo Architecture',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      stays: '28 Sanctuaries',
    },
  ];

  return (
    <div className="min-h-screen bg-[#EEF0F8] flex flex-col">
      <Navbar transparentAtTop={true} />

      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] sm:min-h-[92vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
        {/* Full-width landscape backdrop with migratory aesthetic */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=85")',
          }}
        >
          {/* Subtle multi-stop gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B1F4A] via-[#1B1F4A]/40 to-black/50" />
        </div>

        <MigrationPattern opacity={0.25} />

        <div className="relative z-10 max-w-5xl mx-auto text-center text-white mt-10">
          {/* Brand Concept Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-semibold tracking-wider uppercase mb-6 animate-fade-in">
            <Feather className="w-3.5 h-3.5 text-[#F0A92E]" />
            <span>The Migratory Spirit • Curated Sanctuaries</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 drop-shadow-md">
            {BRAND.tagline}
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-stone-200 font-light leading-relaxed mb-10 drop-shadow-xs">
            {BRAND.subtitle}
          </p>

          {/* Prominent Interactive Search Interface */}
          <div className="mt-4">
            <HeroSearch />
          </div>

          {/* Quick flight stats below search */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-stone-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#F0A92E]" />
              <span>100% Verified Sanctuaries</span>
            </span>
            <span className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-[#F0A92E]" />
              <span>Low-Impact Regenerative Stays</span>
            </span>
            <span className="flex items-center gap-2">
              <Trees className="w-4 h-4 text-[#F0A92E]" />
              <span>Avian & Nature Corridors</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. Accommodation Category Bar */}
      <CategoryBar
        selectedCategory={searchState.category || 'All'}
        onSelectCategory={handleCategorySelect}
      />

      {/* 3. Featured Destinations */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6BD6]">
              Seasonal Flyways
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B1F4A] mt-1">
              Featured Destinations
            </h2>
            <p className="text-sm text-stone-500 mt-2 max-w-xl">
              Regions where biodiversity flourishes, mist settles over highlands, and travelers discover serene refuge.
            </p>
          </div>
          <Link
            to="/destinations"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#1B1F4A] hover:text-[#5B6BD6] group"
          >
            <span>Explore All 15 Destinations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {curatedDestinations.map((dest) => (
            <Link
              key={dest.name}
              to={`/explore?destination=${dest.name}`}
              className="group relative h-72 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-stone-200/80"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#F0A92E] block">
                  {dest.tag}
                </span>
                <h3 className="font-serif text-lg font-bold leading-tight">{dest.name}</h3>
                <p className="text-[11px] text-stone-300 mt-0.5">{dest.stays}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Handpicked Curated Stays */}
      <section className="py-16 bg-[#DCE1F2]/30 border-y border-[#DCE1F2] text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#5B6BD6]">
                Handpicked For You
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B1F4A] mt-1">
                Restorative Stays Along The Path
              </h2>
              <p className="text-sm text-stone-500 mt-2 max-w-xl">
                Exceptional architectural integrity, intimate natural settings, and hosts dedicated to mindful living.
              </p>
            </div>
            <Link
              to="/explore"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#1B1F4A] hover:text-[#5B6BD6] group"
            >
              <span>View All Properties</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStays.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Unique Places to Stay (Treehouses & Eco-stays) */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6BD6]">
              Unconventional Architecture
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B1F4A] mt-1">
              Canopy Nests, Treehouses & Domes
            </h2>
            <p className="text-sm text-stone-500 mt-2 max-w-xl">
              Sleep in elevated rainforest perches, stilted lake houses, and bamboo pavilions designed in harmony with native ecosystems.
            </p>
          </div>
          <Link
            to="/explore?category=Unique Stays"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#1B1F4A] hover:text-[#5B6BD6] group"
          >
            <span>See Unique Stays</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {uniqueStays.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 6. Popular Stays Grid */}
      <section className="py-16 bg-white border-y border-stone-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#5B6BD6]">
                Highest Rated
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B1F4A] mt-1">
                Beloved By Migratory Travelers
              </h2>
            </div>
            <Link
              to="/explore?sortBy=rating"
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#1B1F4A] hover:text-[#5B6BD6] group"
            >
              <span>Explore Highest Rated</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularStays.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Become a Host Banner */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-[#1B1F4A] text-white p-8 sm:p-16 border border-[#5B6BD6] shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <MigrationPattern opacity={0.2} />

          <div className="max-w-xl text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#F0A92E] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sanctuary Custodians</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Open Your Doors to Mindful Migratory Travelers
            </h2>
            <p className="text-stone-300 text-sm sm:text-base mt-4 leading-relaxed font-light">
              Do you steward a secluded mountain cabin, restored haveli, plantation manor or coastal retreat? Share your sanctuary with travelers who cherish silence, craftsmanship, and ecological harmony.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/become-a-host"
                className="bg-[#F0A92E] hover:bg-[#b09257] text-[#1B1F4A] font-semibold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2"
              >
                <span>Start Hosting Today</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/host/login"
                className="bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all"
              >
                <span>Host Portal Demo →</span>
              </Link>
            </div>
          </div>

          <div className="relative z-10 lg:w-96 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
              alt="Become a Host"
              className="w-full h-80 object-cover"
              onError={handleImageError}
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-5 text-left">
              <p className="text-xs font-semibold text-[#F0A92E]">Average Host Earnings</p>
              <p className="text-2xl font-serif font-bold text-white mt-0.5">₹1,45,000 / month</p>
              <p className="text-[11px] text-stone-300 mt-1">Full host protection, verified guest community & concierge support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Guest Testimonials */}
      <section className="py-16 bg-[#EEF0F8] border-t border-[#DCE1F2] text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6BD6]">
              Stories from the Flight
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1F4A] mt-1">
              Sanctuary Experiences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-4">
                    {[...Array(test.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic mb-6">
                    "{test.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                  <img
                    src={test.avatar}
                    alt={test.author}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={handleAvatarError}
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#1B1F4A]">{test.author}</h4>
                    <p className="text-[10px] text-stone-400">{test.role}</p>
                    <p className="text-[10px] text-[#5B6BD6] font-medium mt-0.5">
                      {test.stayTitle} • {test.destination}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
