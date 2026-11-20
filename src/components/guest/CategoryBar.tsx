import React from 'react';
import { PropertyCategory } from '../../types/property';
import {
  Hotel,
  Palmtree,
  Home,
  Building,
  Key,
  DoorClosed,
  Castle,
  Tent,
  Leaf,
  Tractor,
  Users,
  Compass,
} from 'lucide-react';

interface CategoryBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

interface CategoryItem {
  id: PropertyCategory | 'All';
  label: string;
  icon: React.ElementType;
}

export const CATEGORIES: CategoryItem[] = [
  { id: 'All', label: 'All Stays', icon: Compass },
  { id: 'Hotels', label: 'Hotels', icon: Hotel },
  { id: 'Resorts', label: 'Resorts', icon: Palmtree },
  { id: 'Homestays', label: 'Homestays', icon: Home },
  { id: 'Villas', label: 'Villas', icon: Castle },
  { id: 'Apartments', label: 'Apartments', icon: Building },
  { id: 'Private Rooms', label: 'Private Rooms', icon: Key },
  { id: 'Guest Houses', label: 'Guest Houses', icon: DoorClosed },
  { id: 'Cottages', label: 'Cottages', icon: Tent },
  { id: 'Eco Stays', label: 'Eco Stays', icon: Leaf },
  { id: 'Farm Stays', label: 'Farm Stays', icon: Tractor },
  { id: 'Hostels', label: 'Hostels', icon: Users },
  { id: 'Unique Stays', label: 'Unique Stays', icon: Tent },
];

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full bg-[#F8F7F1] border-b border-[#E8E0D1] py-4 sticky top-[65px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex flex-col items-center gap-2 pb-2 border-b-2 transition-all shrink-0 cursor-pointer group ${
                  isSelected
                    ? 'border-[#173D32] text-[#173D32] font-semibold'
                    : 'border-transparent text-stone-500 hover:text-[#173D32] hover:border-stone-300'
                }`}
              >
                <div
                  className={`p-2 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-[#173D32] text-[#C5A66A]'
                      : 'bg-stone-100 group-hover:bg-stone-200 text-stone-600 group-hover:text-[#173D32]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs whitespace-nowrap">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
