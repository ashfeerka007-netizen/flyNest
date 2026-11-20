import React from 'react';
import { HostLayout } from '../../components/host/HostLayout';
import { Star, MessageSquare } from 'lucide-react';

export const HostReviewsPage: React.FC = () => {
  const reviews = [
    {
      id: 'rev-1',
      guest: 'Aarav Mehta',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      property: 'Canopy Nest Treehouse & Cloud Observatory',
      rating: 5,
      date: 'November 2026',
      comment: 'Tara was an incredible custodian. The view of the morning hornbills gliding through the deodar canopy was something our family will remember forever.',
    },
    {
      id: 'rev-2',
      guest: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      property: 'Elysian Mist Cloud Ridge Retreat',
      rating: 5,
      date: 'October 2026',
      comment: 'The architectural details and peaceful highland tranquility exceeded every standard. Truly a sanctuary designed for rest.',
    },
  ];

  return (
    <HostLayout>
      <div className="space-y-8 text-left pb-16">
        <div className="pb-6 border-b border-stone-200">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2F7058]">Guest Feedback</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32] mt-1">Guest Reviews</h1>
          <p className="text-xs text-stone-500 mt-1">Verified traveler feedback across your listings</p>
        </div>

        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={rev.avatar} alt={rev.guest} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-sm text-[#173D32]">{rev.guest}</h4>
                    <p className="text-[10px] text-stone-400">{rev.property} • {rev.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  {[...Array(rev.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed italic">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </HostLayout>
  );
};
