import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Property, PropertyCategory } from '../types/property';
import { Booking, PriceBreakdown, GuestDetails, PaymentDetails } from '../types/booking';
import { MOCK_PROPERTIES } from '../data/mockProperties';
import { MOCK_BOOKINGS } from '../data/mockBookings';
import { DEFAULT_COMMISSION_SETTINGS, PlatformCommissionConfig } from '../config/constants';

export interface SearchState {
  destination: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  adults: number;
  children: number;
  infants: number;
  category?: PropertyCategory | 'All';
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  instantOnly?: boolean;
  freeCancellationOnly?: boolean;
  selectedAmenities?: string[];
  sortBy?: 'recommended' | 'price_low' | 'price_high' | 'rating';
}

interface MarketplaceContextType {
  properties: Property[];
  approvedProperties: Property[];
  pendingProperties: Property[];
  rejectedProperties: Property[];
  bookings: Booking[];
  wishlistIds: string[];
  searchState: SearchState;
  commissionConfig: PlatformCommissionConfig;
  // Property Actions
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'status'>) => Property;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  approveProperty: (id: string) => void;
  rejectProperty: (id: string, reason?: string) => void;
  deleteProperty: (id: string) => void;
  toggleDateAvailability: (propertyId: string, dateStr: string) => void;
  setCustomRate: (propertyId: string, dateStr: string, rate: number) => void;
  // Booking Actions
  calculateBookingPrice: (property: Property, checkIn: string, checkOut: string, guestsCount: number) => PriceBreakdown;
  createBooking: (
    property: Property,
    guestDetails: GuestDetails,
    checkIn: string,
    checkOut: string,
    pricing: PriceBreakdown,
    payment: PaymentDetails
  ) => Booking;
  cancelBooking: (bookingId: string, reason?: string) => void;
  // Wishlist Actions
  toggleWishlist: (propertyId: string) => void;
  isWishlisted: (propertyId: string) => boolean;
  // Search state actions
  setSearchState: React.Dispatch<React.SetStateAction<SearchState>>;
  updateSearch: (partial: Partial<SearchState>) => void;
  resetSearch: () => void;
  // Commission settings actions
  updateCommissionConfig: (partial: Partial<PlatformCommissionConfig>) => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

const PROPERTIES_KEY = 'flynest_properties_v1';
const BOOKINGS_KEY = 'flynest_bookings_v1';
const WISHLIST_KEY = 'flynest_wishlist_v1';
const COMMISSIONS_KEY = 'flynest_commissions_v1';

export const MarketplaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Properties
  const [properties, setProperties] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem(PROPERTIES_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return MOCK_PROPERTIES;
  });

  useEffect(() => {
    localStorage.setItem(PROPERTIES_KEY, JSON.stringify(properties));
  }, [properties]);

  // 2. Bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKINGS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return MOCK_BOOKINGS;
  });

  useEffect(() => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }, [bookings]);

  // 3. Wishlist
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['prop-wayanad-treehouse', 'prop-bali-bamboo'];
  });

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // 4. Commissions
  const [commissionConfig, setCommissionConfig] = useState<PlatformCommissionConfig>(() => {
    try {
      const saved = localStorage.getItem(COMMISSIONS_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_COMMISSION_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem(COMMISSIONS_KEY, JSON.stringify(commissionConfig));
  }, [commissionConfig]);

  // 5. Search State
  const defaultSearch: SearchState = {
    destination: '',
    checkIn: '2026-12-10',
    checkOut: '2026-12-14',
    adults: 2,
    children: 0,
    infants: 0,
    category: 'All',
    sortBy: 'recommended',
    selectedAmenities: [],
  };

  const [searchState, setSearchState] = useState<SearchState>(defaultSearch);

  const updateSearch = (partial: Partial<SearchState>) => {
    setSearchState((prev) => ({ ...prev, ...partial }));
  };

  const resetSearch = () => {
    setSearchState(defaultSearch);
  };

  // Property Filters
  const approvedProperties = properties.filter((p) => p.status === 'approved');
  const pendingProperties = properties.filter((p) => p.status === 'pending');
  const rejectedProperties = properties.filter((p) => p.status === 'rejected');

  // Property Handlers
  const addProperty = (newProp: Omit<Property, 'id' | 'createdAt' | 'status'>): Property => {
    const id = `prop-${Date.now()}`;
    const property: Property = {
      ...newProp,
      id,
      status: 'pending', // Requires admin approval demonstration!
      createdAt: new Date().toISOString().split('T')[0],
      rating: 5.0,
      reviewCount: 0,
    };
    setProperties((prev) => [property, ...prev]);
    return property;
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const approveProperty = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'approved' } : p))
    );
  };

  const rejectProperty = (id: string) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'rejected' } : p))
    );
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleDateAvailability = (propertyId: string, dateStr: string) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id !== propertyId) return p;
        const blocked = p.blockedDates || [];
        const isBlocked = blocked.includes(dateStr);
        const newBlocked = isBlocked
          ? blocked.filter((d) => d !== dateStr)
          : [...blocked, dateStr];
        return { ...p, blockedDates: newBlocked };
      })
    );
  };

  const setCustomRate = (propertyId: string, dateStr: string, rate: number) => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id !== propertyId) return p;
        const customNightlyRates = { ...(p.customNightlyRates || {}), [dateStr]: rate };
        return { ...p, customNightlyRates };
      })
    );
  };

  // Pricing calculation
  const calculateBookingPrice = (
    property: Property,
    checkIn: string,
    checkOut: string,
    _guestsCount: number
  ): PriceBreakdown => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    const pricePerNight = property.pricePerNight;
    const baseTotal = pricePerNight * nights;
    const cleaningFee = commissionConfig.cleaningFeeDefault;
    const serviceFee = Math.round(baseTotal * commissionConfig.guestServiceFeeRate);
    const taxableSubtotal = baseTotal + cleaningFee + serviceFee;
    const taxes = Math.round(taxableSubtotal * commissionConfig.taxRate);
    const discount = nights >= 7 ? Math.round(baseTotal * 0.1) : 0;
    const grandTotal = taxableSubtotal + taxes - discount;

    return {
      nights,
      pricePerNight,
      baseTotal,
      cleaningFee,
      serviceFee,
      taxes,
      discount,
      grandTotal,
    };
  };

  // Booking Handlers
  const createBooking = (
    property: Property,
    guestDetails: GuestDetails,
    checkIn: string,
    checkOut: string,
    pricing: PriceBreakdown,
    payment: PaymentDetails
  ): Booking => {
    const referenceNumber = `FN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      referenceNumber,
      propertyId: property.id,
      propertyTitle: property.title,
      propertyImage: property.images[0],
      propertyCategory: property.category,
      propertyLocation: `${property.location.city}, ${property.location.country}`,
      hostId: property.host.id,
      hostName: property.host.name,
      guestId: 'user-guest-1',
      guestDetails,
      checkIn,
      checkOut,
      pricing,
      payment,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const cancelBooking = (bookingId: string, reason?: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'cancelled', cancellationReason: reason || 'Cancelled by guest' } : b
      )
    );
  };

  // Wishlist Handlers
  const toggleWishlist = (propertyId: string) => {
    setWishlistIds((prev) =>
      prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId]
    );
  };

  const isWishlisted = (propertyId: string) => wishlistIds.includes(propertyId);

  // Commission updates
  const updateCommissionConfig = (partial: Partial<PlatformCommissionConfig>) => {
    setCommissionConfig((prev) => ({ ...prev, ...partial }));
  };

  return (
    <MarketplaceContext.Provider
      value={{
        properties,
        approvedProperties,
        pendingProperties,
        rejectedProperties,
        bookings,
        wishlistIds,
        searchState,
        commissionConfig,
        addProperty,
        updateProperty,
        approveProperty,
        rejectProperty,
        deleteProperty,
        toggleDateAvailability,
        setCustomRate,
        calculateBookingPrice,
        createBooking,
        cancelBooking,
        toggleWishlist,
        isWishlisted,
        setSearchState,
        updateSearch,
        resetSearch,
        updateCommissionConfig,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) throw new Error('useMarketplace must be used within MarketplaceProvider');
  return context;
};
