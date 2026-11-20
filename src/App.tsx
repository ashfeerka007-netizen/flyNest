import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { MarketplaceProvider } from './context/MarketplaceContext';
import { DemoSwitcher } from './components/common/DemoSwitcher';

// Guest Public Pages
import { HomePage } from './pages/guest/HomePage';
import { ExplorePage } from './pages/guest/ExplorePage';
import { PropertyDetailPage } from './pages/guest/PropertyDetailPage';
import { CheckoutPage } from './pages/guest/CheckoutPage';
import { BookingConfirmationPage } from './pages/guest/BookingConfirmationPage';
import { MyBookingsPage } from './pages/guest/MyBookingsPage';
import { WishlistPage } from './pages/guest/WishlistPage';
import { GuestAccountPage } from './pages/guest/GuestAccountPage';
import { DestinationsPage } from './pages/guest/DestinationsPage';
import { AboutPage } from './pages/guest/AboutPage';
import { HowItWorksPage } from './pages/guest/HowItWorksPage';
import { HelpContactPage } from './pages/guest/HelpContactPage';
import { BecomeAHostPage } from './pages/guest/BecomeAHostPage';
import { LoginPage } from './pages/guest/LoginPage';
import { RegisterPage } from './pages/guest/RegisterPage';

// Host Pages
import { HostLoginPage } from './pages/host/HostLoginPage';
import { HostDashboardPage } from './pages/host/HostDashboardPage';
import { HostPropertiesPage } from './pages/host/HostPropertiesPage';
import { HostNewPropertyPage } from './pages/host/HostNewPropertyPage';
import { HostCalendarPage } from './pages/host/HostCalendarPage';
import { HostBookingsPage } from './pages/host/HostBookingsPage';
import { HostEarningsPage } from './pages/host/HostEarningsPage';
import { HostReviewsPage } from './pages/host/HostReviewsPage';
import { HostSettingsPage } from './pages/host/HostSettingsPage';

// Admin Pages
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminPropertiesPage } from './pages/admin/AdminPropertiesPage';
import { AdminApprovalsPage } from './pages/admin/AdminApprovalsPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminBookingsPage } from './pages/admin/AdminBookingsPage';
import { AdminPaymentsPage } from './pages/admin/AdminPaymentsPage';
import { AdminCommissionsPage } from './pages/admin/AdminCommissionsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export function App() {
  return (
    <HashRouter>
      <ToastProvider>
        <AuthProvider>
          <MarketplaceProvider>
            <Routes>
              {/* PUBLIC GUEST ROUTES */}
              <Route path="/" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/search" element={<ExplorePage />} />
              <Route path="/property/:id" element={<PropertyDetailPage />} />
              <Route path="/checkout/:id" element={<CheckoutPage />} />
              <Route path="/booking/:reference" element={<BookingConfirmationPage />} />
              <Route path="/my-bookings" element={<MyBookingsPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/account" element={<GuestAccountPage />} />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/become-a-host" element={<BecomeAHostPage />} />
              <Route path="/help" element={<HelpContactPage />} />
              <Route path="/contact" element={<HelpContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* HOST WORKSPACE ROUTES */}
              <Route path="/host" element={<Navigate to="/host/dashboard" replace />} />
              <Route path="/host/login" element={<HostLoginPage />} />
              <Route path="/host/register" element={<HostLoginPage />} />
              <Route path="/host/dashboard" element={<HostDashboardPage />} />
              <Route path="/host/properties" element={<HostPropertiesPage />} />
              <Route path="/host/properties/new" element={<HostNewPropertyPage />} />
              <Route path="/host/properties/:id/edit" element={<HostNewPropertyPage />} />
              <Route path="/host/calendar" element={<HostCalendarPage />} />
              <Route path="/host/bookings" element={<HostBookingsPage />} />
              <Route path="/host/earnings" element={<HostEarningsPage />} />
              <Route path="/host/reviews" element={<HostReviewsPage />} />
              <Route path="/host/settings" element={<HostSettingsPage />} />

              {/* ADMINISTRATION PORTAL ROUTES */}
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/hosts" element={<AdminUsersPage />} />
              <Route path="/admin/properties" element={<AdminPropertiesPage />} />
              <Route path="/admin/approvals" element={<AdminApprovalsPage />} />
              <Route path="/admin/bookings" element={<AdminBookingsPage />} />
              <Route path="/admin/payments" element={<AdminPaymentsPage />} />
              <Route path="/admin/commissions" element={<AdminCommissionsPage />} />
              <Route path="/admin/reviews" element={<HostReviewsPage />} />
              <Route path="/admin/promotions" element={<AdminCommissionsPage />} />
              <Route path="/admin/reports" element={<AdminReportsPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />

              {/* FALLBACK */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {/* Quick Demo Switcher available across pages */}
            <DemoSwitcher />
          </MarketplaceProvider>
        </AuthProvider>
      </ToastProvider>
    </HashRouter>
  );
}

export default App;
