import React, { useState } from 'react';
import { Property } from '../../types/property';
import { BRAND } from '../../config/brand';
import { Link } from 'react-router-dom';
import { MapPin, Star, X, Compass, ExternalLink } from 'lucide-react';
import { handleImageError } from '../../utils/imageUtils';

interface MapViewMockProps {
  properties: Property[];
}

export const MapViewMock: React.FC<MapViewMockProps> = ({ properties }) => {
  const [selectedProp, setSelectedProp] = useState<Property | null>(properties[0] || null);

  return (
    <div className="relative w-full h-[650px] bg-[#173D32] rounded-3xl overflow-hidden border border-[#2F7058]/50 shadow-xl">
      {/* Stylized Topo / Satellite Map Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity filter contrast-125"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80")',
        }}
      />

      {/* Migration Flight Contour Overlay */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 50 150 Q 300 50 600 300 T 1100 200"
          stroke="#C5A66A"
          strokeWidth="2"
          strokeDasharray="6 6"
          fill="none"
        />
        <path
          d="M 100 450 Q 400 250 800 500 T 1200 400"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          fill="none"
        />
      </svg>

      {/* Map Control Pill Top Left */}
      <div className="absolute top-5 left-5 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-stone-200 shadow-md flex items-center gap-2 text-xs font-semibold text-[#173D32]">
        <Compass className="w-4 h-4 text-[#C5A66A] animate-spin" style={{ animationDuration: '20s' }} />
        <span>Migratory Corridor Map • {properties.length} Active Sanctuaries</span>
      </div>

      {/* Simulated Property Map Pins */}
      <div className="absolute inset-0 p-8 flex flex-wrap items-center justify-around z-10 pointer-events-auto">
        {properties.slice(0, 10).map((prop, idx) => {
          const isSelected = selectedProp?.id === prop.id;
          // Offset each pin dynamically to spread across the stylized view
          const positions = [
            'top-[20%] left-[18%]',
            'top-[28%] left-[45%]',
            'top-[35%] left-[75%]',
            'top-[52%] left-[25%]',
            'top-[58%] left-[60%]',
            'top-[72%] left-[40%]',
            'top-[78%] left-[80%]',
            'top-[40%] left-[85%]',
            'top-[65%] left-[15%]',
            'top-[82%] left-[30%]',
          ];
          const pos = positions[idx % positions.length];

          return (
            <button
              key={prop.id}
              onClick={() => setSelectedProp(prop)}
              className={`absolute ${pos} transform -translate-x-1/2 -translate-y-1/2 transition-all cursor-pointer group select-none ${
                isSelected ? 'scale-115 z-30' : 'hover:scale-110 z-20'
              }`}
            >
              <div
                className={`px-3 py-1.5 rounded-full font-bold text-xs shadow-lg flex items-center gap-1.5 transition-colors border ${
                  isSelected
                    ? 'bg-[#C5A66A] text-[#173D32] border-white scale-105'
                    : 'bg-[#173D32] text-white hover:bg-[#2F7058] border-[#C5A66A]/40'
                }`}
              >
                <MapPin className="w-3 h-3 text-[#C5A66A]" />
                <span>
                  {BRAND.currency.symbol}{Math.round(prop.pricePerNight / 1000)}k
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Property Floating Preview Card Bottom Center */}
      {selectedProp && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 w-11/12 max-w-md bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex animate-scale-up">
          <div className="w-36 h-36 shrink-0 relative">
            <img
              src={selectedProp.images[0]}
              alt={selectedProp.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#173D32]/85 text-[#C5A66A]">
              {selectedProp.category}
            </span>
          </div>

          <div className="p-3.5 flex-1 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                <span>{selectedProp.location.city}, {selectedProp.location.country}</span>
                <button
                  onClick={() => setSelectedProp(null)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <h4 className="font-serif text-sm font-bold text-[#173D32] line-clamp-1">
                {selectedProp.title}
              </h4>
              <div className="flex items-center gap-1 text-xs font-semibold text-[#252A27] mt-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>{selectedProp.rating}</span>
                <span className="text-stone-400 font-normal">({selectedProp.reviewCount} reviews)</span>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-sm font-bold text-[#173D32]">
                {BRAND.currency.symbol}{selectedProp.pricePerNight.toLocaleString()}
                <span className="text-[10px] text-stone-400 font-normal"> / night</span>
              </span>

              <Link
                to={`/property/${selectedProp.id}`}
                className="text-[11px] font-semibold text-[#173D32] hover:text-[#2F7058] flex items-center gap-1 bg-[#173D32]/5 px-2.5 py-1 rounded-lg"
              >
                <span>View Details</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
