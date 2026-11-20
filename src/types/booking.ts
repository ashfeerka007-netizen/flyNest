export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface PriceBreakdown {
  nights: number;
  pricePerNight: number;
  baseTotal: number;
  cleaningFee: number;
  serviceFee: number;
  taxes: number;
  discount: number;
  grandTotal: number;
}

export interface GuestDetails {
  fullName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  adults: number;
  children: number;
  infants: number;
}

export type PaymentMethodType = 'card' | 'upi' | 'netbanking' | 'wallet';

export interface PaymentDetails {
  method: PaymentMethodType;
  cardLast4?: string;
  upiId?: string;
  bankName?: string;
  walletProvider?: string;
  transactionReference: string;
  paidAt: string;
  status: 'simulated_success' | 'simulated_failed';
}

export interface Booking {
  id: string;
  referenceNumber: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyCategory: string;
  propertyLocation: string;
  hostId: string;
  hostName: string;
  guestId: string;
  guestDetails: GuestDetails;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  pricing: PriceBreakdown;
  payment: PaymentDetails;
  status: BookingStatus;
  createdAt: string;
  cancellationReason?: string;
}
