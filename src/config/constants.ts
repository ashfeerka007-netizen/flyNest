export interface PlatformCommissionConfig {
  hostCommissionRate: number; // e.g. 0.08 (8%)
  guestServiceFeeRate: number; // e.g. 0.07 (7%)
  taxRate: number; // e.g. 0.12 (12%)
  cleaningFeeDefault: number; // default flat rate in INR
  minimumNightlyRate: number;
}

export const DEFAULT_COMMISSION_SETTINGS: PlatformCommissionConfig = {
  hostCommissionRate: 0.08, // 8% host commission
  guestServiceFeeRate: 0.07, // 7% guest platform fee
  taxRate: 0.12, // 12% GST / hospitality tax
  cleaningFeeDefault: 1200,
  minimumNightlyRate: 1500,
};

export const DEMO_CREDENTIALS = {
  guest: {
    email: 'guest@demo.com',
    password: 'demo123',
    role: 'guest',
    label: 'Guest Explorer',
  },
  host: {
    email: 'host@demo.com',
    password: 'demo123',
    role: 'host',
    label: 'Sanctuary Host',
  },
  admin: {
    email: 'admin@demo.com',
    password: 'demo123',
    role: 'admin',
    label: 'Platform Administrator',
  },
};
