import React, { useState } from 'react';
import { HostLayout } from '../../components/host/HostLayout';
import { useToast } from '../../context/ToastContext';
import { Save, Building, ShieldCheck, Bell } from 'lucide-react';

export const HostSettingsPage: React.FC = () => {
  const { success } = useToast();
  const [bankAccount, setBankAccount] = useState('•••• •••• •••• 9840');
  const [bankName, setBankName] = useState('HDFC Bank');
  const [ifsc, setIfsc] = useState('HDFC0001248');
  const [autoApprove, setAutoApprove] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    success('Settings Updated', 'Host payout account and preferences saved.');
  };

  return (
    <HostLayout>
      <div className="max-w-2xl mx-auto space-y-8 text-left pb-16">
        <div className="pb-6 border-b border-stone-200">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B6BD6]">Preferences</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1F4A] mt-1">Host Settings</h1>
          <p className="text-xs text-stone-500 mt-1">Configure banking settlements, payout methods, and hosting preferences</p>
        </div>

        <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6">
          <h3 className="font-serif text-base font-bold text-[#1B1F4A] flex items-center gap-2">
            <Building className="w-4 h-4 text-[#F0A92E]" />
            <span>Bank Payout Account</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Bank Name</label>
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-300"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Account Number</label>
              <input
                type="text"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-300 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">IFSC / Routing Code</label>
              <input
                type="text"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
                className="w-full p-3 rounded-xl border border-stone-300 font-mono"
              />
            </div>
          </div>

          <hr className="border-stone-100" />

          <div className="pt-2">
            <button
              type="submit"
              className="bg-[#1B1F4A] hover:bg-[#5B6BD6] text-white text-xs font-semibold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Host Settings</span>
            </button>
          </div>
        </form>
      </div>
    </HostLayout>
  );
};
