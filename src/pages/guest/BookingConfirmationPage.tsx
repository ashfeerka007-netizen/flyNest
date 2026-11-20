import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Navbar } from '../../components/guest/Navbar';
import { Footer } from '../../components/guest/Footer';
import { useMarketplace } from '../../context/MarketplaceContext';
import { BRAND } from '../../config/brand';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  ShieldCheck,
  Download,
  Share2,
  ArrowRight,
  Sparkles,
  Printer,
} from 'lucide-react';

export const BookingConfirmationPage: React.FC = () => {
  const { reference } = useParams<{ reference: string }>();
  const { bookings } = useMarketplace();

  const booking = bookings.find((b) => b.referenceNumber === reference) || bookings[0];

  useEffect(() => {
    if (booking) {
      // Launch celebratory confetti animation on arrival
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#173D32', '#2F7058', '#C5A66A', '#F8F7F1'],
      });
    }
  }, [booking]);

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#F8F7F1] flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 pb-16 text-center max-w-md mx-auto px-4">
          <h2 className="font-serif text-2xl font-bold text-[#173D32]">Reservation Not Found</h2>
          <p className="text-xs text-stone-500 mt-2">No matching reservation was found.</p>
          <Link to="/my-bookings" className="mt-4 inline-block px-5 py-2.5 rounded-xl bg-[#173D32] text-white text-xs font-semibold">
            View My Reservations
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F8F7F1] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          {/* Success Banner */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-xl mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#173D32] via-[#C5A66A] to-[#2F7058]" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Reservation Confirmed
                  </span>
                  <h1 className="font-serif text-2xl font-bold text-[#173D32] mt-1">
                    Your Sanctuary is Reserved
                  </h1>
                </div>
              </div>

              <div className="bg-[#F8F7F1] p-3 rounded-xl border border-stone-200 text-left sm:text-right">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                  Reference Code
                </span>
                <span className="font-mono text-sm font-bold text-[#173D32]">
                  {booking.referenceNumber}
                </span>
              </div>
            </div>

            {/* Property details overview */}
            <div className="py-6 flex flex-col sm:flex-row gap-6 border-b border-stone-100">
              <img
                src={booking.propertyImage}
                alt={booking.propertyTitle}
                className="w-full sm:w-36 h-36 rounded-2xl object-cover shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A66A] bg-[#173D32] px-2 py-0.5 rounded-md">
                    {booking.propertyCategory}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#173D32] mt-1">
                    {booking.propertyTitle}
                  </h3>
                  <p className="text-xs text-stone-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#2F7058]" />
                    <span>{booking.propertyLocation}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-stone-100 text-xs">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Check-in</span>
                    <span className="font-semibold text-[#173D32] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A66A]" /> {booking.checkIn}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Check-out</span>
                    <span className="font-semibold text-[#173D32] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A66A]" /> {booking.checkOut}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment & Traveler Summary */}
            <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-stone-100 text-xs">
              <div>
                <h4 className="font-serif font-bold text-sm text-[#173D32] mb-2">Guest Details</h4>
                <p className="font-medium text-stone-800">{booking.guestDetails.fullName}</p>
                <p className="text-stone-500 font-mono text-[11px]">{booking.guestDetails.email}</p>
                <p className="text-stone-500 text-[11px]">{booking.guestDetails.phone}</p>
                <p className="text-stone-400 text-[11px] mt-1">{booking.guestDetails.adults} Guests</p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm text-[#173D32] mb-2">Demonstration Payment</h4>
                <p className="font-medium text-stone-800 capitalize">Method: {booking.payment.method}</p>
                <p className="text-stone-500 font-mono text-[11px]">Txn Ref: {booking.payment.transactionReference}</p>
                <p className="text-xs font-bold text-[#173D32] mt-1">
                  Total Paid: {BRAND.currency.symbol}{booking.pricing.grandTotal.toLocaleString()}
                </p>
                <span className="inline-block mt-1 text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-semibold">
                  Simulated Settled
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Voucher</span>
                </button>
              </div>

              <Link
                to="/my-bookings"
                className="bg-[#173D32] hover:bg-[#2F7058] text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
              >
                <span>View My Reservations</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
