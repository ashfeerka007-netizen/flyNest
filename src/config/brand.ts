// Configurable Brand Identity - Central definition
// Version 2: Flock-of-roofs mark, Midnight Indigo, Sunrise Gold, Mist, Sky

export interface BrandConfig {
  name: string;
  tagline: string;
  subtitle: string;
  symbolism: string;
  supportEmail: string;
  supportPhone: string;
  currency: {
    symbol: string;
    code: string;
    name: string;
  };
  colors: {
    midnightIndigo: string;
    sunriseGold: string;
    mist: string;
    sky: string;
    white: string;
    forest: string;
    emerald: string;
    ivory: string;
    sand: string;
    charcoal: string;
    gold: string;
  };
  social: {
    instagram: string;
    twitter: string;
    facebook: string;
    linkedin: string;
  };
}

export const BRAND: BrandConfig = {
  name: 'flynest',
  tagline: 'Every Journey Deserves a Beautiful Place to Stay.',
  subtitle: 'Discover extraordinary stays, explore new destinations and find your sanctuary along the journey.',
  symbolism: 'Inspired by the enduring spirit of migratory birds finding restorative sanctuaries across continents.',
  supportEmail: 'concierge@flynest.stay',
  supportPhone: '+91 (0) 800-NEST-FLY',
  currency: {
    symbol: '₹',
    code: 'INR',
    name: 'Indian Rupee',
  },
  colors: {
    midnightIndigo: '#1B1F4A',
    sunriseGold: '#F0A92E',
    mist: '#EEF0F8',
    sky: '#5B6BD6',
    white: '#FFFFFF',
    forest: '#1B1F4A',
    emerald: '#5B6BD6',
    ivory: '#EEF0F8',
    sand: '#DCE1F2',
    charcoal: '#1B1F4A',
    gold: '#F0A92E',
  },
  social: {
    instagram: 'https://instagram.com/flynest.stays',
    twitter: 'https://twitter.com/flynest',
    facebook: 'https://facebook.com/flynest',
    linkedin: 'https://linkedin.com/company/flynest',
  },
};
