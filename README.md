# FlyNest | Premium Accommodation Booking Marketplace
> Inspired by the symbolism and freedom of migratory birds, designed with the functionality and user experience of Airbnb.

## 🌿 Brand Concept & Creative Direction
- **Theme**: Migratory birds finding restorative resting places along seasonal corridors.
- **Symbolism**: Freedom, Exploration, Travel, Discovery, Nature, Hospitality, Comfort & Belonging.
- **Configurable Brand**: The brand name, tagline, colors, currencies, and support contacts are centrally configured in `src/config/brand.ts` and never hardcoded.
- **Color Palette**:
  - Deep Forest Green: `#173D32`
  - Emerald Green: `#2F7058`
  - Warm Ivory: `#F8F7F1`
  - Sand Beige: `#E8E0D1`
  - Charcoal: `#252A27`
  - Muted Gold: `#C5A66A`
  - White: `#FFFFFF`
- **Typography**: Geometric Sans (`Plus Jakarta Sans`) paired with editorial Serif (`Playfair Display`) for headings.

---

## 🏗️ Technical Architecture
- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 with custom theme tokens
- **Routing**: React Router DOM (v7)
- **Icons**: Lucide React
- **State Management**: React Context (`MarketplaceContext`, `AuthContext`, `ToastContext`) with localStorage persistence for bookings, properties, wishlists, and fees.
- **Simulated Celebrations**: `canvas-confetti` on booking confirmation.

---

## 🧭 Three Logically Separated Experiences

### A. Public Guest Website
- `/` — Premium homepage with hero search, destination corridors, category bar, handpicked stays, unique stays, testimonials, and newsletter.
- `/explore` (or `/search`) — Discovery interface with live search, filters (price range, categories, bedrooms, amenities, instant book), sorting (recommended, price, ratings), grid/list toggles, and interactive migratory corridor map preview.
- `/property/:id` — Rich accommodation details with 5-photo grid, light-box gallery, host bio, capacity specs, full amenities list, house rules, location, and sticky booking summary panel with real-time price calculation.
- `/checkout/:id` — 8-step booking journey with contact input, terms acceptance, price breakdown, and demonstration payment gateway (Card, UPI, Net Banking, Wallet) with simulated success/failure toggle.
- `/booking/:reference` — Booking confirmation with reference code, confetti celebration, ticket summary, and print voucher action.
- `/my-bookings` — Traveler passport with reservation cards, filter tabs (Confirmed, Completed, Cancelled), and cancellation simulation.
- `/wishlist` — Saved sanctuaries.
- `/destinations` — Showcase across 12+ Indian and international migratory corridors.
- `/about`, `/how-it-works`, `/help`, `/become-a-host` — Informational storytelling.
- `/login`, `/register` — Authentication with 1-click demo login buttons.

### B. Host Management Workspace
- `/host/dashboard` — Performance metrics (Total Properties, Active Listings, Pending Approvals, Total Bookings, Upcoming Check-ins, Monthly Revenue, Occupancy Rate), revenue growth bar charts, and recent reservations table.
- `/host/properties` — Property portfolio with live status badges (`Approved & Live`, `Pending Review`, `Rejected`).
- `/host/properties/new` — **10-step Property Creation Wizard** (Category, Basic Info, Location, Capacity, Bedrooms, Amenities, Description, Photos, Pricing, House Rules, Review & Submit). Submitting automatically enters the admin approval queue!
- `/host/calendar` — Interactive monthly calendar: click any date to toggle availability (available vs blocked), view sample bookings, or configure custom seasonal nightly rates.
- `/host/bookings` — Host reservation management with filters (All, Confirmed, Completed, Cancelled) and detailed guest dossiers.
- `/host/earnings` — Financial ledger displaying gross booking value, platform fee deductions (8%), net host payouts (92%), and bank settlement history.
- `/host/reviews` — Guest feedback and rating breakdown.
- `/host/settings` — Payout bank account configuration.

### C. Platform Administration Portal
- `/admin/dashboard` — High-level platform KPIs (Total Users, Total Hosts, Total Properties, Pending Listing Approvals, Total Bookings, Gross Booking Value, Platform Commission), category distribution, and approval queue preview.
- `/admin/approvals` — **Listing Approvals Workflow**: live list of newly created host properties with **Approve & Publish** (immediately makes it live in guest search!) and **Reject** actions.
- `/admin/properties` — Complete inventory ledger with status toggles and deletion.
- `/admin/users` — User directory with Activate / Suspend action toggles.
- `/admin/bookings` — Global reservation ledger.
- `/admin/payments` — Simulated payment records, transaction references, and settlement logs.
- `/admin/commissions` — Dynamic platform monetization controls: Host commission %, Guest service fee %, Tax / GST %, and Cleaning fee default. Saving changes immediately updates all guest booking calculations across the marketplace.
- `/admin/reports` — Analytics with simulated CSV report export.
- `/admin/settings` — Marketplace brand configuration and security settings.

---

## 🔑 Demonstration Accounts & Quick Switching
| Role | Email | Password | Quick Access |
|---|---|---|---|
| **Guest Explorer** | `guest@demo.com` | `demo123` | 1-Click button on `/login` or bottom-left Demo Switcher |
| **Sanctuary Host** | `host@demo.com` | `demo123` | 1-Click button on `/host/login` or bottom-left Demo Switcher |
| **Platform Admin** | `admin@demo.com` | `demo123` | 1-Click button on `/admin/login` or bottom-left Demo Switcher |

> **Floating Demo Switcher**: A floating pill in the bottom-left corner allows switching between Guest, Host, and Admin portals at any time with one click.

---

## 🚀 Running the Project
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Build for production
npm run build
```
The server will start at `http://127.0.0.1:5000/`.
