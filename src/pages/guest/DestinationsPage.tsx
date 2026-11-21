import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/guest/Navbar';
import { Footer } from '../../components/guest/Footer';
import { MapPin, ArrowRight, Compass } from 'lucide-react';
import { handleImageError } from '../../utils/imageUtils';

export const DestinationsPage: React.FC = () => {
  const destinations = [
    {
      name: 'Wayanad',
      state: 'Kerala',
      country: 'India',
      description: 'Mist-clad Western Ghats with deep evergreen rainforests and hornbill migratory flyways.',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      type: 'Rainforest Canopy',
    },
    {
      name: 'Munnar',
      state: 'Kerala',
      country: 'India',
      description: 'Rolling velvet tea ridges, morning mountain fogs, and cool mountain air.',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      type: 'Tea Valley Sanctuary',
    },
    {
      name: 'Coorg',
      state: 'Karnataka',
      country: 'India',
      description: 'Ancestral Kodava estates sheltered by silver oak trees and shade-grown coffee.',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      type: 'Coffee Plantations',
    },
    {
      name: 'Goa',
      state: 'Goa',
      country: 'India',
      description: 'Red laterite sea cliffs, quiet northern olive ridley turtle bays, and sunset horizon villas.',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      type: 'Ocean Cliffs',
    },
    {
      name: 'Jaipur',
      state: 'Rajasthan',
      country: 'India',
      description: 'Aristocratic sandstone havelis, gilded fresco courtyards and desert astronomy.',
      image: 'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&w=800&q=80',
      type: 'Royal Havelis',
    },
    {
      name: 'Alleppey',
      state: 'Kerala',
      country: 'India',
      description: 'Vembanad backwaters dotted with lotus canals, solar wooden barges, and egret sanctuaries.',
      image: 'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80',
      type: 'Lotus Backwaters',
    },
    {
      name: 'Manali',
      state: 'Himachal Pradesh',
      country: 'India',
      description: 'Snowcapped Himalayan pinnacles, ancient deodar pine forests and river rock cabins.',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
      type: 'Alpine Valleys',
    },
    {
      name: 'Rishikesh',
      state: 'Uttarakhand',
      country: 'India',
      description: 'Where the Ganga leaves the mountains; bamboo eco lodges, river sandbars and yoga ashrams.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      type: 'Ganga Foothills',
    },
    {
      name: 'Darjeeling',
      state: 'West Bengal',
      country: 'India',
      description: 'Panoramic views of Mount Kanchenjunga sunrise over historical colonial tea lofts.',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      type: 'Himalayan Ridge',
    },
    {
      name: 'Bali',
      state: 'Ubud',
      country: 'Indonesia',
      description: 'Curved organic bamboo pavilions suspended over emerald terraced rice paddies.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      type: 'Bamboo Architecture',
    },
    {
      name: 'Dubai',
      state: 'Dubai',
      country: 'UAE',
      description: 'Waterfront sky suites on the Palm overlooking the Arabian Gulf and coastal mirages.',
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
      type: 'Gulf Horizon',
    },
    {
      name: 'Maldives',
      state: 'North Malé Atoll',
      country: 'Maldives',
      description: 'Overwater wooden villas with catamaran nets suspended above turquoise coral reefs.',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
      type: 'Overwater Lagoon',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F1] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2F7058]">
              Migratory Corridors
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#173D32] mt-1">
              Curated Destinations
            </h1>
            <p className="text-sm text-stone-600 mt-2 leading-relaxed">
              From the rainforest peaks of Wayanad and mist-veiled tea gardens of Munnar to the tropical coral atolls of the Indian Ocean.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((d) => (
              <Link
                key={d.name}
                to={`/explore?destination=${d.name}`}
                className="group bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-xs hover:shadow-xl transition-all flex flex-col"
              >
                <div className="h-56 relative overflow-hidden">
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#173D32]/90 text-[#C5A66A]">
                    {d.type}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#173D32] group-hover:text-[#2F7058] transition-colors">
                      {d.name}
                    </h3>
                    <p className="text-xs text-[#2F7058] font-medium mt-0.5">
                      {d.state ? `${d.state}, ` : ''}{d.country}
                    </p>
                    <p className="text-xs text-stone-500 mt-3 leading-relaxed">
                      {d.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#173D32]">
                    <span>Explore Sanctuaries</span>
                    <ArrowRight className="w-4 h-4 text-[#C5A66A] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
