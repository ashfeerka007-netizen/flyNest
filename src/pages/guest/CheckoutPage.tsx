import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../../components/guest/Navbar';
import { Footer } from '../../components/guest/Footer';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { BRAND } from '../../config/brand';
import { handleImageError } from '../../utils/imageUtils';
import { PaymentMethodType, GuestDetails, PaymentDetails } from '../../types/booking';
import {
  CreditCard,
  QrCode,
  Building,
  Wallet,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  Users,
  ChevronLeft,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { properties, calculateBookingPrice, createBooking } = useMarketplace();
  const { currentUser } = useAuth();
  const { success, error } = useToast();

  const property = properties.find((p) => p.id === id) || properties[0];

  const checkIn = searchParams.get('checkIn') || '2026-12-10';
  const checkOut = searchParams.get('checkOut') || '2026-12-14';
  const guestsCount = Number(searchParams.get('guests')) || 2;

  const pricing = property ? calculateBookingPrice(property, checkIn, checkOut, guestsCount) : null;

  // Form State
  const [fullName, setFullName] = useState(currentUser?.name || 'Aarav Mehta');
  const [email, setEmail] = useState(currentUser?.email || 'guest@demo.com');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98201 44589');
  const [specialRequests, setSpecialRequests] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Payment Demo State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('•••');
  const [upiId, setUpiId] = useState('guest@oksbi');
  const [bankName, setBankName] = useState('HDFC Bank');
  const [walletProvider, setWalletProvider] = useState('PhonePe');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!property || !pricing) {
    return (
      <div className="min-h-screen bg-[#EEF0F8] flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-16 text-center max-w-md mx-auto px-4">
          <h2 className="font-serif text-2xl font-bold text-[#1B1F4A]">No Sanctuary Selected</h2>
          <p className="text-xs text-stone-500 mt-2">Please select a sanctuary from our catalog before proceeding to checkout.</p>
          <Link to="/explore" className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-[#1B1F4A] text-white text-xs font-semibold">
            Explore Sanctuaries
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      error('Please accept the Sanctuary Etiquette and Terms to proceed.');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      if (simulateFailure) {
        error(
          'Simulated Payment Declined',
          'This is a demonstration failure scenario. Toggle simulated failure off to complete the reservation.'
        );
        return;
      }

      const guestDetails: GuestDetails = {
        fullName,
        email,
        phone,
        specialRequests,
        adults: guestsCount,
        children: 0,
        infants: 0,
      };

      const payment: PaymentDetails = {
        method: paymentMethod,
        cardLast4: paymentMethod === 'card' ? '4242' : undefined,
        upiId: paymentMethod === 'upi' ? upiId : undefined,
        bankName: paymentMethod === 'netbanking' ? bankName : undefined,
        walletProvider: paymentMethod === 'wallet' ? walletProvider : undefined,
        transactionReference: `SIM-TXN-${Math.floor(1000000 + Math.random() * 9000000)}`,
        paidAt: new Date().toISOString(),
        status: 'simulated_success',
      };

      const booking = createBooking(
        property,
        guestDetails,
        checkIn,
        checkOut,
        pricing,
        payment
      );

      success('Reservation Confirmed!', `Booking Reference: ${booking.referenceNumber}`);
      navigate(`/booking/${booking.referenceNumber}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#EEF0F8] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          {/* Header & Back Link */}
          <div className="mb-8">
            <Link
              to={`/property/${property.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#1B1F4A] mb-3"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to property</span>
            </Link>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#1B1F4A]">
              Confirm Your Sanctuary Reservation
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Step 7 of 8: Enter traveler details and simulate payment verification
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Form Details & Simulated Payment (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Trip Overview Pill */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B6BD6]">
                    Selected Dates
                  </span>
                  <div className="flex items-center gap-2 font-semibold text-sm text-[#1B1F4A] mt-0.5">
                    <Calendar className="w-4 h-4 text-[#F0A92E]" />
                    <span>{checkIn} to {checkOut} ({pricing.nights} {pricing.nights === 1 ? 'night' : 'nights'})</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B6BD6]">
                    Occupancy
                  </span>
                  <div className="flex items-center gap-2 font-semibold text-sm text-[#1B1F4A] mt-0.5">
                    <Users className="w-4 h-4 text-[#F0A92E]" />
                    <span>{guestsCount} Guests</span>
                  </div>
                </div>
              </div>

              {/* Guest Information */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <h3 className="font-serif text-lg font-bold text-[#1B1F4A] mb-4">
                  1. Traveler Contact Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#1B1F4A] bg-[#EEF0F8]/30"
                      placeholder="e.g. Aarav Mehta"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#1B1F4A] bg-[#EEF0F8]/30"
                        placeholder="guest@demo.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#1B1F4A] bg-[#EEF0F8]/30"
                        placeholder="+91 98201 44589"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Special Requests or Arrival Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="E.g., early arrival by mountain cab, dietary restrictions for tea..."
                      className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#1B1F4A] bg-[#EEF0F8]/30"
                    />
                  </div>
                </div>
              </div>

              {/* Simulated Payment Experience */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-lg font-bold text-[#1B1F4A]">
                    2. Simulated Payment Method
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    Demonstration Mode
                  </span>
                </div>

                {/* Important Demonstration Notice Alert */}
                <div className="p-3.5 mb-5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong>Simulated Payment Gateway:</strong> No actual money or credit card charges will be transacted. You can test successful reservations or simulate payment declines.
                  </div>
                </div>

                {/* Payment Method Selector Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#1B1F4A] bg-[#1B1F4A]/5 text-[#1B1F4A] ring-1 ring-[#1B1F4A]'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#5B6BD6]" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'border-[#1B1F4A] bg-[#1B1F4A]/5 text-[#1B1F4A] ring-1 ring-[#1B1F4A]'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-[#5B6BD6]" />
                    <span>UPI / QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      paymentMethod === 'netbanking'
                        ? 'border-[#1B1F4A] bg-[#1B1F4A]/5 text-[#1B1F4A] ring-1 ring-[#1B1F4A]'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <Building className="w-5 h-5 text-[#5B6BD6]" />
                    <span>Net Banking</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      paymentMethod === 'wallet'
                        ? 'border-[#1B1F4A] bg-[#1B1F4A]/5 text-[#1B1F4A] ring-1 ring-[#1B1F4A]'
                        : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <Wallet className="w-5 h-5 text-[#5B6BD6]" />
                    <span>Digital Wallet</span>
                  </button>
                </div>

                {/* Sub-inputs per method */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                    <div>
                      <label className="block font-medium text-stone-600 mb-1">Simulated Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-2.5 bg-white border border-stone-300 rounded-lg font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-medium text-stone-600 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full p-2.5 bg-white border border-stone-300 rounded-lg font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-medium text-stone-600 mb-1">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full p-2.5 bg-white border border-stone-300 rounded-lg font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-3">
                    <label className="block font-medium text-stone-600 mb-1">Simulated UPI ID / VPA</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-lg font-mono"
                    />
                    <p className="text-[11px] text-stone-400">Supported: GPay, PhonePe, Paytm, BHIM</p>
                  </div>
                )}

                {paymentMethod === 'netbanking' && (
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-3">
                    <label className="block font-medium text-stone-600 mb-1">Select Bank</label>
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-lg"
                    >
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="ICICI Bank">ICICI Bank</option>
                      <option value="State Bank of India">State Bank of India</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    </select>
                  </div>
                )}

                {paymentMethod === 'wallet' && (
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs space-y-3">
                    <label className="block font-medium text-stone-600 mb-1">Select Wallet</label>
                    <select
                      value={walletProvider}
                      onChange={(e) => setWalletProvider(e.target.value)}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-lg"
                    >
                      <option value="PhonePe">PhonePe Wallet</option>
                      <option value="Paytm">Paytm Wallet</option>
                      <option value="Amazon Pay">Amazon Pay Balance</option>
                    </select>
                  </div>
                )}

                {/* Simulated Success / Failure Toggle */}
                <div className="mt-5 p-3 rounded-xl bg-[#EEF0F8] border border-stone-200 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-[#1B1F4A]">Simulate Payment Failure?</p>
                    <p className="text-[10px] text-stone-500">Toggle to test the payment error scenario</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={simulateFailure}
                    onChange={(e) => setSimulateFailure(e.target.checked)}
                    className="w-4 h-4 accent-rose-600 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Terms & Policies */}
              <div className="p-4 rounded-xl bg-white border border-stone-200 text-xs space-y-3">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 accent-[#1B1F4A] rounded shrink-0 mt-0.5"
                  />
                  <span className="text-stone-600 leading-relaxed">
                    I agree to the <strong className="text-[#1B1F4A]">House Rules</strong>, the{' '}
                    <strong className="text-[#1B1F4A]">{property.cancellationPolicy} Cancellation Policy</strong>, and honor the sanctuary quiet hours.
                  </span>
                </label>
              </div>

              {/* Reserve Button */}
              <button
                type="button"
                onClick={handleCompleteBooking}
                disabled={isProcessing}
                className="w-full bg-[#1B1F4A] hover:bg-[#5B6BD6] text-white font-semibold py-4 px-6 rounded-2xl transition-all shadow-xl shadow-[#1B1F4A]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm group"
              >
                {isProcessing ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#F0A92E] group-hover:scale-110 transition-transform" />
                    <span>Complete Simulated Reservation • {BRAND.currency.symbol}{pricing.grandTotal.toLocaleString()}</span>
                  </>
                )}
              </button>
            </div>

            {/* Right Column: Property Summary & Price Breakdown (5 cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xl sticky top-28 space-y-6">
                {/* Property Card Mini */}
                <div className="flex gap-4 pb-6 border-b border-stone-100">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-24 h-24 rounded-2xl object-cover shrink-0"
                    onError={handleImageError}
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F0A92E] bg-[#1B1F4A] px-2 py-0.5 rounded-md">
                      {property.category}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#1B1F4A] mt-1 line-clamp-1">
                      {property.title}
                    </h4>
                    <p className="text-xs text-stone-500 truncate">{property.location.city}, {property.location.country}</p>
                    <p className="text-xs text-[#5B6BD6] font-semibold mt-1">Hosted by {property.host.name}</p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 text-xs">
                  <h4 className="font-serif text-sm font-bold text-[#1B1F4A]">
                    Price Breakdown
                  </h4>

                  <div className="flex justify-between text-stone-600">
                    <span>
                      {BRAND.currency.symbol}{property.pricePerNight.toLocaleString()} × {pricing.nights} {pricing.nights === 1 ? 'night' : 'nights'}
                    </span>
                    <span className="font-semibold text-[#1B1F4A]">
                      {BRAND.currency.symbol}{pricing.baseTotal.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>Sanctuary Cleaning & Linen Prep</span>
                    <span className="font-semibold text-[#1B1F4A]">
                      {BRAND.currency.symbol}{pricing.cleaningFee.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>Platform Service Fee</span>
                    <span className="font-semibold text-[#1B1F4A]">
                      {BRAND.currency.symbol}{pricing.serviceFee.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-stone-600">
                    <span>Hospitality GST & Local Taxes (12%)</span>
                    <span className="font-semibold text-[#1B1F4A]">
                      {BRAND.currency.symbol}{pricing.taxes.toLocaleString()}
                    </span>
                  </div>

                  {pricing.discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Long-stay Sanctuary Discount</span>
                      <span>-{BRAND.currency.symbol}{pricing.discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-sm font-bold text-[#1B1F4A]">
                    <span>Total Amount (INR)</span>
                    <span className="text-xl font-serif">
                      {BRAND.currency.symbol}{pricing.grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Cancellation Policy Pill */}
                <div className="p-4 rounded-2xl bg-[#EEF0F8] border border-stone-200 text-xs text-stone-600 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#1B1F4A]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>{property.cancellationPolicy} Cancellation</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Cancel up to 5 days before check-in for a full refund. 24/7 concierge support during flight disruptions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
