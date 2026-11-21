import React, { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { MOCK_USERS } from '../../data/mockUsers';
import { useToast } from '../../context/ToastContext';
import { User } from '../../types/user';
import { Users, Search, ShieldCheck, UserX, Check, AlertCircle } from 'lucide-react';
import { handleAvatarError } from '../../utils/imageUtils';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [roleFilter, setRoleFilter] = useState<'all' | 'guest' | 'host' | 'admin'>('all');
  const [search, setSearch] = useState('');
  const { success, error } = useToast();

  const handleToggleStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === 'active' ? 'suspended' : 'active';
          if (nextStatus === 'active') {
            success('Account Activated', `${u.name} status updated to active.`);
          } else {
            error('Account Suspended', `${u.name} status updated to suspended.`);
          }
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const filtered = users.filter((u) => {
    if (roleFilter !== 'all' && u.role !== roleFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <AdminLayout>
      <div className="space-y-8 text-left pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
              Community Governance
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D32] mt-1">
              User Directory ({users.length})
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Manage traveler passports, host credentials, verification and access states
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200">
          <div className="flex items-center gap-2">
            {(['all', 'guest', 'host', 'admin'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl capitalize transition-colors cursor-pointer ${
                  roleFilter === r ? 'bg-[#173D32] text-white' : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user by name or email..."
              className="text-xs pl-8 pr-3 py-1.5 rounded-xl border border-stone-300 w-full sm:w-64 focus:outline-hidden"
            />
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-stone-200 bg-[#F8F7F1]/60 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Joined</th>
                  <th className="py-3.5 px-4">Base Location</th>
                  <th className="py-3.5 px-4">Verification</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-9 h-9 rounded-full object-cover shrink-0"
                          onError={handleAvatarError}
                        />
                        <div>
                          <p className="font-bold text-stone-800">{u.name}</p>
                          <p className="text-[10px] text-stone-400 font-mono">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="capitalize font-semibold text-[#173D32] bg-[#173D32]/10 px-2 py-0.5 rounded text-[10px]">
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-500">{u.createdAt}</td>
                    <td className="py-3.5 px-4 text-stone-600">{u.location || 'India'}</td>
                    <td className="py-3.5 px-4">
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                        <Check className="w-3.5 h-3.5" /> ID Verified
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                          u.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleToggleStatus(u.id)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                          u.status === 'active'
                            ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
                            : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                        }`}
                      >
                        {u.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
