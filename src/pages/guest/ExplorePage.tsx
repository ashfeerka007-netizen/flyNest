import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '../../components/guest/Navbar';
import { Footer } from '../../components/guest/Footer';
import { PropertyCard } from '../../components/guest/PropertyCard';
import { FilterDrawer } from '../../components/guest/FilterDrawer';
import { MapViewMock } from '../../components/guest/MapViewMock';
import { CategoryBar } from '../../components/guest/CategoryBar';
import { useMarketplace } from '../../context/MarketplaceContext';
import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  Map,
  RotateCcw,
  Compass,
  ArrowUpDown,
  Search,
  Calendar,
  Users,
} from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { approvedProperties, searchState, updateSearch } = useMarketplace();

  // View state: grid, list, or map
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Local filter states synced with URL/context
  const initialDest = searchParams.get('destination') || searchState.destination || '';
  const initialCat = searchParams.get('category') || searchState.category || 'All';

  const [destinationFilter, setDestinationFilter] = useState(initialDest);
  const [categoryFilter, setCategoryFilter] = useState(initialCat);
  const [minPrice, setMinPrice] = useState(1500);
  const [maxPrice, setMaxPrice] = useState(60000);
  const [bedrooms, setBedrooms] = useState(0);
  const [instantOnly, setInstantOnly] = useState(false);
  const [freeCancelOnly, setFreeCancelOnly] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'price_high' | 'rating'>('recommended');

  useEffect(() => {
    const destParam = searchParams.get('destination');
    const catParam = searchParams.get('category');
    if (destParam !== null) setDestinationFilter(destParam);
    if (catParam !== null) setCategoryFilter(catParam);
  }, [searchParams]);

  // Handle Category click from bar
  const handleSelectCategory = (cat: string) => {
    setCategoryFilter(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const handleToggleAmenity = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((a) => a !== amenityId) : [...prev, amenityId]
    );
  };

  const handleResetFilters = () => {
    setDestinationFilter('');
    setCategoryFilter('All');
    setMinPrice(1500);
    setMaxPrice(60000);
    setBedrooms(0);
    setInstantOnly(false);
    setFreeCancelOnly(false);
    setSelectedAmenities([]);
    setSortBy('recommended');
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProperties = useMemo(() => {
    let result = [...approvedProperties];

    // Destination filter
    if (destinationFilter.trim()) {
      const q = destinationFilter.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.destination.toLowerCase().includes(q) ||
          p.location.city.toLowerCase().includes(q) ||
          p.location.state.toLowerCase().includes(q) ||
          p.location.country.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (categoryFilter !== 'All') {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Price range
    result = result.filter((p) => p.pricePerNight >= minPrice && p.pricePerNight <= maxPrice);

    // Bedrooms
    if (bedrooms > 0) {
      result = result.filter((p) => p.bedrooms >= bedrooms);
    }

    // Instant book
    if (instantOnly) {
      result = result.filter((p) => p.instantBookable);
    }

    // Free cancellation
    if (freeCancelOnly) {
      result = result.filter((p) => p.cancellationPolicy === 'Flexible');
    }

    // Amenities
    if (selectedAmenities.length > 0) {
      result = result.filter((p) =>
        selectedAmenities.every((a) => p.amenities.includes(a))
      );
    }

    // Sorting
    if (sortBy === 'price_low') {
      result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === 'price_high') {
      result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [
    approvedProperties,
    destinationFilter,
    categoryFilter,
    minPrice,
    maxPrice,
    bedrooms,
    instantOnly,
    freeCancelOnly,
    selectedAmenities,
    sortBy,
  ]);

  const activeFilterCount =
    (destinationFilter ? 1 : 0) +
    (categoryFilter !== 'All' ? 1 : 0) +
    (maxPrice < 60000 || minPrice > 1500 ? 1 : 0) +
    (bedrooms > 0 ? 1 : 0) +
    (instantOnly ? 1 : 0) +
    selectedAmenities.length;

  return (
    <div className="min-h-screen bg-[#EEF0F8] flex flex-col">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-20">
        {/* Category Navigation Bar */}
        <CategoryBar
          selectedCategory={categoryFilter}
          onSelectCategory={handleSelectCategory}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full text-left">
          {/* Top Bar: Search metadata & controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                <span className="flex items-center gap-1 text-[#5B6BD6] font-semibold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Migratory Sanctuaries</span>
                </span>
                <span>•</span>
                <span>{searchState.checkIn} to {searchState.checkOut}</span>
                <span>•</span>
                <span>{searchState.adults + searchState.children} Guests</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1F4A]">
                {destinationFilter ? `Stays in "${destinationFilter}"` : 'All Restorative Sanctuaries'}
                <span className="text-sm font-normal text-stone-400 ml-2 font-sans">
                  ({filteredProperties.length} available)
                </span>
              </h1>
            </div>

            {/* View Mode & Filter Triggers */}
            <div className="flex items-center flex-wrap gap-2.5">
              {/* Filter Drawer Toggle */}
              <button
                type="button"
                onClick={() => setFilterDrawerOpen(true)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  activeFilterCount > 0
                    ? 'bg-[#1B1F4A] border-[#1B1F4A] text-white shadow-sm'
                    : 'bg-white border-stone-300 text-stone-700 hover:border-stone-400'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#F0A92E] text-[#1B1F4A] text-[10px] font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sorting Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-stone-300 text-stone-700 text-xs font-semibold rounded-xl px-3 py-2.5 pr-8 focus:outline-hidden cursor-pointer"
                >
                  <option value="recommended">Sort: Recommended</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* View Toggle Buttons */}
              <div className="flex items-center bg-white border border-stone-300 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-[#1B1F4A] text-white' : 'text-stone-500 hover:text-stone-800'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-[#1B1F4A] text-white' : 'text-stone-500 hover:text-stone-800'
                  }`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('map')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'map' ? 'bg-[#1B1F4A] text-white' : 'text-stone-500 hover:text-stone-800'
                  }`}
                  title="Map View"
                >
                  <Map className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFilterCount > 0 && (
            <div className="flex items-center flex-wrap gap-2 pt-4">
              <span className="text-xs text-stone-400">Active filters:</span>
              {destinationFilter && (
                <span className="inline-flex items-center gap-1.5 bg-stone-200/80 text-stone-700 px-2.5 py-1 rounded-full text-xs font-medium">
                  Location: {destinationFilter}
                  <button onClick={() => setDestinationFilter('')} className="text-stone-500 hover:text-stone-800">×</button>
                </span>
              )}
              {categoryFilter !== 'All' && (
                <span className="inline-flex items-center gap-1.5 bg-stone-200/80 text-stone-700 px-2.5 py-1 rounded-full text-xs font-medium">
                  {categoryFilter}
                  <button onClick={() => setCategoryFilter('All')} className="text-stone-500 hover:text-stone-800">×</button>
                </span>
              )}
              {(maxPrice < 60000 || minPrice > 1500) && (
                <span className="inline-flex items-center gap-1.5 bg-stone-200/80 text-stone-700 px-2.5 py-1 rounded-full text-xs font-medium">
                  ₹{minPrice} - ₹{maxPrice}
                </span>
              )}
              {bedrooms > 0 && (
                <span className="inline-flex items-center gap-1.5 bg-stone-200/80 text-stone-700 px-2.5 py-1 rounded-full text-xs font-medium">
                  {bedrooms}+ Bedrooms
                  <button onClick={() => setBedrooms(0)} className="text-stone-500 hover:text-stone-800">×</button>
                </span>
              )}
              {instantOnly && (
                <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full text-xs font-medium">
                  Instant Book
                  <button onClick={() => setInstantOnly(false)} className="text-stone-500 hover:text-stone-800">×</button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#5B6BD6] hover:underline font-semibold ml-2 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Clear all
              </button>
            </div>
          )}

          {/* Properties Grid or Map View */}
          <div className="mt-8">
            {viewMode === 'map' ? (
              <div className="space-y-6">
                <MapViewMock properties={filteredProperties} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                  {filteredProperties.slice(0, 4).map((prop) => (
                    <PropertyCard key={prop.id} property={prop} />
                  ))}
                </div>
              </div>
            ) : filteredProperties.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                    : 'flex flex-col gap-6'
                }
              >
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 max-w-lg mx-auto my-12">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-[#1B1F4A] flex items-center justify-center mx-auto mb-4">
                  <Compass className="w-8 h-8 text-[#F0A92E]" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1B1F4A]">
                  No Sanctuaries Found
                </h3>
                <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                  We could not find accommodation matching your specific combination of filters along this flyway corridor. Try adjusting dates, price or clearing categories.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-6 bg-[#1B1F4A] text-white text-xs font-semibold px-6 py-3 rounded-xl hover:bg-[#5B6BD6] transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Filter Drawer Modal */}
      <FilterDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        selectedCategory={categoryFilter}
        onSelectCategory={handleSelectCategory}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onPriceChange={(min, max) => {
          setMinPrice(min);
          setMaxPrice(max);
        }}
        bedrooms={bedrooms}
        onBedroomsChange={setBedrooms}
        instantOnly={instantOnly}
        onInstantChange={setInstantOnly}
        selectedAmenities={selectedAmenities}
        onToggleAmenity={handleToggleAmenity}
        onReset={handleResetFilters}
      />

      <Footer />
    </div>
  );
};
