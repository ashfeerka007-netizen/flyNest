import React, { useState } from 'react';
import { Navbar } from '../../components/guest/Navbar';
import { Footer } from '../../components/guest/Footer';
import { BRAND } from '../../config/brand';
import { useToast } from '../../context/ToastContext';
import { Mail, Phone, MessageSquare, Send, HelpCircle, ChevronDown } from 'lucide-react';

export const HelpContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const { success } = useToast();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    success('Message Delivered', 'Our concierge desk will respond within 2 hours.');
    setName('');
    setEmail('');
    setMessage('');
  };

  const faqs = [
    {
      q: 'How does cancellation work if my flight is delayed?',
      a: 'All flexible sanctuaries allow 100% full refund up to 5 days prior to check-in. In case of verified adverse weather disruptions or airline delays, our concierge coordinates directly with your host.',
    },
    {
      q: 'Are all sanctuaries inspected for environmental ethics?',
      a: 'Yes. Every listing is verified by our team for responsible waste management, minimal light pollution (to protect migratory birds), and respect for local forest laws.',
    },
    {
      q: 'Is this an interactive demo application?',
      a: 'Yes. This complete application is a demonstration featuring guest discovery, full host property management, and administration consoles with simulated payment verification.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F1] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2F7058]">
              Sanctuary Concierge
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#173D32] mt-2">
              Help & Concierge Inquiries
            </h1>
            <p className="text-sm text-stone-600 mt-2">
              Questions about an upcoming journey, host approval, or customized travel routes?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xs">
              <h3 className="font-serif text-xl font-bold text-[#173D32] mb-4">
                Message Our Concierge
              </h3>

              <form onSubmit={handleSend} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#173D32]"
                    placeholder="e.g. Vikramaditya"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#173D32]"
                    placeholder="vikram@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Message or Inquiry</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full text-xs p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-[#173D32]"
                    placeholder="How may our sanctuary team assist you?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#173D32] hover:bg-[#2F7058] text-white text-xs font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Concierge Inquiry</span>
                </button>
              </form>
            </div>

            {/* Direct Details & FAQ */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-[#173D32] text-white space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
                  Direct Contact
                </span>
                <p className="text-xs text-stone-300">
                  {BRAND.supportEmail}
                </p>
                <p className="text-xs text-stone-300">
                  {BRAND.supportPhone}
                </p>
                <p className="text-[11px] text-stone-400">
                  Concierge hours: Mon–Sun, 07:00 – 23:00 IST
                </p>
              </div>

              {/* FAQs */}
              <div className="space-y-3">
                <h4 className="font-serif text-lg font-bold text-[#173D32]">Frequently Asked Questions</h4>
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-stone-200 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-[#173D32]"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-400 transition-transform ${
                          activeFaq === i ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {activeFaq === i && (
                      <div className="p-4 pt-0 text-xs text-stone-600 leading-relaxed border-t border-stone-50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
