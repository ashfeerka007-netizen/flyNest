export type UserRole = 'guest' | 'host' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  createdAt: string;
  status: 'active' | 'suspended';
  bio?: string;
  location?: string;
  verified: boolean;
}
