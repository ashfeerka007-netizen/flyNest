import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useToast } from '../../context/ToastContext';
import { BRAND } from '../../config/brand';
import { Percent, Save, Sliders, ShieldCheck, DollarSign } from 'lucide-react';

export const AdminCommissionsPage: React.FC = () => {
  const { commissionConfig, updateCommissionConfig } = useMarketplace();
  const { success } = useToast();

  const [hostRatePercent, setHostRatePercent] = useState(
    Math.round(commissionConfig.hostCommissionRate * 100)
  );
  const [guestFeePercent, setGuestFeePercent] = useState(
    Math.round(commissionConfig.guestServiceFeeRate * 100)
  );
  const [taxPercent, setTaxPercent] = useState(
    Math.round(commissionConfig.taxRate * 100)
  );
  const [cleaningFee, setCleaningFee] = useState(
    commissionConfig.cleaningFeeDefault
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCommissionConfig({
      hostCommissionRate: hostRatePercent / 100,
      guestServiceFeeRate: guestFeePercent / 100,
      taxRate: taxPercent / 100,
      cleaningFeeDefault: cleaningFee,
    });
    success(
      'Fee Parameters Updated!',
      'New commission rates and tax percentages will immediately apply to all upcoming guest calculations.'
    );
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-8 text-left pb-16">
        <div className="pb-6 border-b border-stone-200">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
            Platform Monetization Model
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32] mt-1">
            Commission & Fee Architecture
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Configure host take-rates, guest service charges and statutory tax formulas across the marketplace
          </p>
        </div>

        <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 text-xs text-purple-900 leading-relaxed">
            <strong>Real-time Dynamic Impact:</strong> Adjusting these settings immediately influences the price calculation on property details and checkout pages across all listings.
          </div>

          <div className="space-y-4 text-xs">
            {/* Host Commission */}
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Host Commission Deduction (% from booking total)
              </label>
              <div className="relative max-w-xs">
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={hostRatePercent}
                  onChange={(e) => setHostRatePercent(Number(e.target.value))}
                  required
                  className="w-full p-3 rounded-xl border border-stone-300 font-bold text-sm"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-stone-400">%</span>
              </div>
              <p className="text-[11px] text-stone-400 mt-1">Current default: 8% (Host keeps 92%)</p>
            </div>

            {/* Guest Platform Fee */}
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Guest Service Fee (% of accommodation subtotal)
              </label>
              <div className="relative max-w-xs">
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={guestFeePercent}
                  onChange={(e) => setGuestFeePercent(Number(e.target.value))}
                  required
                  className="w-full p-3 rounded-xl border border-stone-300 font-bold text-sm"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-stone-400">%</span>
              </div>
              <p className="text-[11px] text-stone-400 mt-1">Current default: 7% platform fee</p>
            </div>

            {/* Hospitality Tax / GST */}
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Hospitality GST / Tax Rate (%)
              </label>
              <div className="relative max-w-xs">
                <input
                  type="number"
                  min={0}
                  max={28}
                  value={taxPercent}
                  onChange={(e) => setTaxPercent(Number(e.target.value))}
                  required
                  className="w-full p-3 rounded-xl border border-stone-300 font-bold text-sm"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-stone-400">%</span>
              </div>
              <p className="text-[11px] text-stone-400 mt-1">Statutory hospitality tax (12% standard GST)</p>
            </div>

            {/* Cleaning Fee */}
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Default Sanctuary Cleaning Fee ({BRAND.currency.symbol})
              </label>
              <div className="relative max-w-xs">
                <input
                  type="number"
                  min={0}
                  step={100}
                  value={cleaningFee}
                  onChange={(e) => setCleaningFee(Number(e.target.value))}
                  required
                  className="w-full p-3 rounded-xl border border-stone-300 font-bold text-sm"
                />
              </div>
              <p className="text-[11px] text-stone-400 mt-1">Applied per reservation for sanitation & linen</p>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-end">
            <button
              type="submit"
              className="bg-[#173D32] hover:bg-[#2F7058] text-white text-xs font-semibold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Update Fee Parameters</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
