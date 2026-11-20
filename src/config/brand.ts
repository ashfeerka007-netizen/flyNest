// Configurable Brand Identity - Central definition
// Never hardcoded, easily customizable for rebranding

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
    forest: string;
    emerald: string;
    ivory: string;
    sand: string;
    charcoal: string;
    gold: string;
    white: string;
  };
  social: {
    instagram: string;
    twitter: string;
    facebook: string;
    linkedin: string;
  };
}

export const BRAND: BrandConfig = {
  name: 'FlyNest',
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
    forest: '#173D32',
    emerald: '#2F7058',
    ivory: '#F8F7F1',
    sand: '#E8E0D1',
    charcoal: '#252A27',
    gold: '#C5A66A',
    white: '#FFFFFF',
  },
  social: {
    instagram: 'https://instagram.com/flynest.stays',
    twitter: 'https://twitter.com/flynest',
    facebook: 'https://facebook.com/flynest',
    linkedin: 'https://linkedin.com/company/flynest',
  },
};
