import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useToast } from '../../context/ToastContext';
import { BRAND } from '../../config/brand';
import { Sliders, Save, ShieldCheck, Mail } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { success } = useToast();
  const [siteName, setSiteName] = useState(BRAND.name);
  const [supportEmail, setSupportEmail] = useState(BRAND.supportEmail);
  const [requireHostApproval, setRequireHostApproval] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    success('System Settings Saved', 'Platform administrative configurations persisted.');
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto space-y-8 text-left pb-16">
        <div className="pb-6 border-b border-stone-200">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Platform Environment</span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1F4A] mt-1">System Settings</h1>
          <p className="text-xs text-stone-500 mt-1">Configure global platform metadata, security rules and email notifications</p>
        </div>

        <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs space-y-6 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">Marketplace Brand Name</label>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-300 font-bold"
            />
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Concierge Support Email</label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-stone-300 font-mono"
            />
          </div>

          <div className="pt-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={requireHostApproval}
                onChange={(e) => setRequireHostApproval(e.target.checked)}
                className="w-4 h-4 accent-[#1B1F4A]"
              />
              <span className="font-semibold text-stone-700">
                Mandatory Admin Listing Verification prior to public publication
              </span>
            </label>
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-end">
            <button
              type="submit"
              className="bg-[#1B1F4A] hover:bg-[#5B6BD6] text-white text-xs font-semibold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save System Settings</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
