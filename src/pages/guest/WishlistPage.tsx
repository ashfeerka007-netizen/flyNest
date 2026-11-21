import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/guest/Navbar';
import { Footer } from '../../components/guest/Footer';
import { PropertyCard } from '../../components/guest/PropertyCard';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Heart, Compass, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { properties, wishlistIds } = useMarketplace();

  const wishlistedProperties = properties.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#EEF0F8] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5B6BD6]">
              Saved Sanctuaries
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B1F4A] mt-1">
              Your Wishlist ({wishlistedProperties.length})
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Sanctuaries and resting places saved for future seasonal journeys
            </p>
          </div>

          {wishlistedProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-stone-200/80 max-w-md mx-auto my-12">
              <Heart className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-[#1B1F4A]">Your Wishlist is Empty</h3>
              <p className="text-xs text-stone-500 mt-1">Click the heart icon on any sanctuary to save it for your journey.</p>
              <Link
                to="/explore"
                className="mt-5 inline-block bg-[#1B1F4A] text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-[#5B6BD6] transition-all"
              >
                Explore Stays
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};
