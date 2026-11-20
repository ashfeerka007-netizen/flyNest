export type PropertyCategory =
  | 'Hotels'
  | 'Resorts'
  | 'Homestays'
  | 'Villas'
  | 'Apartments'
  | 'Private Rooms'
  | 'Guest Houses'
  | 'Cottages'
  | 'Eco Stays'
  | 'Farm Stays'
  | 'Hostels'
  | 'Unique Stays';

export type ApprovalStatus = 'approved' | 'pending' | 'rejected';

export interface AmenityItem {
  id: string;
  name: string;
  iconName: string;
  category: 'essentials' | 'features' | 'location' | 'safety';
}

export interface PropertyReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  stayType?: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  destination: string;
  location: {
    city: string;
    state: string;
    country: string;
    lat: number;
    lng: number;
    address: string;
  };
  category: PropertyCategory;
  images: string[];
  pricePerNight: number;
  originalPricePerNight?: number;
  rating: number;
  reviewCount: number;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  amenities: string[];
  host: {
    id: string;
    name: string;
    avatar: string;
    isSuperhost: boolean;
    joinedYear: number;
    responseRate: string;
    bio: string;
  };
  houseRules: {
    checkIn: string;
    checkOut: string;
    smokingAllowed: boolean;
    petsAllowed: boolean;
    partiesAllowed: boolean;
    additionalRules?: string[];
  };
  cancellationPolicy: 'Flexible' | 'Moderate' | 'Strict';
  instantBookable: boolean;
  featured?: boolean;
  status: ApprovalStatus;
  createdAt: string;
  blockedDates?: string[]; // YYYY-MM-DD
  customNightlyRates?: Record<string, number>; // date -> rate
}
