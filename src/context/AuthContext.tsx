import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types/user';
import { MOCK_USERS } from '../data/mockUsers';

interface AuthContextType {
  currentUser: User | null;
  userRole: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateProfile: (updated: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'flynest_auth_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse saved auth', e);
    }
    // Default logged in as guest for seamless demonstration preview
    return MOCK_USERS[0];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [currentUser]);

  const login = (email: string, role?: UserRole): boolean => {
    const match = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() || (role && u.role === role)
    );
    if (match) {
      setCurrentUser(match);
      return true;
    }
    // If arbitrary email, create simulated demo user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      role: role || 'guest',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
      verified: true,
    };
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const switchRole = (role: UserRole) => {
    const match = MOCK_USERS.find((u) => u.role === role) || {
      id: `user-${role}-demo`,
      email: `${role}@demo.com`,
      name: `Demo ${role.toUpperCase()}`,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      createdAt: '2024-01-01',
      status: 'active',
      verified: true,
    };
    setCurrentUser(match);
  };

  const updateProfile = (updated: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser((prev) => (prev ? { ...prev, ...updated } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userRole: currentUser ? currentUser.role : null,
        isAuthenticated: !!currentUser,
        login,
        logout,
        switchRole,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
