# ShopSphere

A modern, responsive product-browsing SPA built with **React 19** and **Vite 8**, powered by the **FakeStore API**. Features a premium dark UI with real-time search, category filtering, skeleton loaders, wishlist toggling, and cart interactions — all without a backend.

---

## Features

- 🔍 **Live product search** — instant client-side filtering by product title
- 🗂️ **Category filtering** — pill buttons (desktop) + native `<select>` (mobile)
- 💀 **Skeleton loading screens** — smooth animated placeholders while data loads
- ❤️ **Wishlist toggle** — per-card favourite state with visual feedback
- 🛒 **Add-to-cart animation** — 2-second "Added!" confirmation state per card
- 🔁 **Retry on error** — graceful error boundaries with a one-click refetch
- 📱 **Fully responsive** — mobile hamburger menu with animated drawer
- 🌙 **Dark-first design** — deep `#030712` background, violet/indigo accent palette
- ♿ **Accessible** — semantic HTML, ARIA labels, `sr-only` labels, `role` attributes

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev/) |
| Build Tool | [Vite 8](https://vitejs.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`) |
| HTTP Client | [Axios 1.x](https://axios-http.com/) |
| API | [FakeStore API](https://fakestoreapi.com/) |
| Linting | ESLint 10 + `eslint-plugin-react-hooks` |

> **Why Tailwind CSS v4?** The new `@tailwindcss/vite` plugin requires zero config files — classes are scanned and compiled at build time via a single Vite plugin, keeping the setup minimal.

---

##  Project Structure

```
shopexplorer/
├── index.html                  # App shell & meta tags
├── vite.config.js              # Vite + React + Tailwind plugins
├── eslint.config.js            # ESLint flat config
├── package.json
└── src/
    ├── main.jsx                # React DOM entry point
    ├── App.jsx                 # Root component — state orchestration
    ├── index.css               # Global styles & Tailwind base
    ├── components/
    │   ├── Navbar.jsx          # Fixed header with scroll-aware glassmorphism
    │   ├── Hero.jsx            # Full-screen hero with animated badges & stats
    │   ├── CategoryFilter.jsx  # Pill buttons (desktop) + <select> (mobile)
    │   ├── ProductGrid.jsx     # Responsive grid — cards, skeletons, empty state
    │   ├── ProductCard.jsx     # Individual product card with wishlist & cart UX
    │   ├── Loading.jsx         # Full-screen loading spinner
    │   └── Error.jsx           # Full-screen or inline error with retry button
    ├── hooks/
    │   └── useProducts.js      # Custom hook — fetch, loading, error, refetch
    └── services/
        └── api.js              # Axios instance + interceptors + API functions
```

---

## API Used — FakeStore API

**Base URL:** `https://fakestoreapi.com`

| Function | Endpoint | Used in |
|---|---|---|
| `getAllProducts()` | `GET /products` | `useProducts` hook |
| `getProductById(id)` | `GET /products/:id` | exported, reserved for detail page |
| `getAllCategories()` | `GET /products/categories` | exported, reserved |
| `getProductsByCategory(cat)` | `GET /products/category/:cat` | exported, reserved |

> Currently the app fetches all products in one call and derives categories client-side using `useMemo`, avoiding extra round-trips.

### Axios Configuration (`src/services/api.js`)

- **Timeout:** 10 seconds
- **Request interceptor:** pass-through (hook point for auth tokens)
- **Response interceptor:** unwraps `response.data` on success; maps HTTP status codes (400, 401, 403, 404, 500) to human-readable error messages on failure

---

## Architecture & Key Decisions

### State Management — Local React State

No external state library (Redux, Zustand, Jotai) was used. The app's data requirements are simple:

| State | Location | Rationale |
|---|---|---|
| `products`, `loading`, `error` | `useProducts` hook | Encapsulates async lifecycle in one place |
| `selectedCategory`, `searchQuery` | `App.jsx` | Shared between `CategoryFilter` and `ProductGrid` |
| `isWishlisted`, `addedToCart` | `ProductCard.jsx` | Purely local UI state, not persisted |
| `isMenuOpen`, `isScrolled` | `Navbar.jsx` | Navbar-only concerns |

`useMemo` is used in `App.jsx` to derive two expensive values — the unique category list and the filtered product list — without re-computing on every render unless their dependencies change.

### Custom Hook — `useProducts`

```
useProducts()
  └─ returns { products, loading, error, refetch }
```

- Uses a `fetchIndex` counter state to trigger re-fetches declaratively (incrementing it causes the `useEffect` to re-run).
- Guards all state updates behind an `isMountedRef` to prevent setting state on an unmounted component.
- The `refetch` callback is memoised with `useCallback`.

### Service Layer — `src/services/api.js`

The Axios instance is created once and shared. Interceptors handle:
- **Success:** transparently unwraps `response.data` so callers receive raw JSON.
- **Error:** normalises any HTTP error into a plain `{ status, message, original }` object before rejecting, so UI components never need to inspect Axios internals.

### Component Design Principles

- **Presentation / container split** — `ProductGrid` owns layout and skeleton rendering; `ProductCard` owns a single product's display and interaction.
- **Prop drilling kept shallow** — state lives one level above the components that need it; no context was required at this scope.
- **Inline SVGs over icon libraries** — avoids adding a dependency (e.g., Heroicons package) for the small icon set required. Each icon is a tiny named component (`BagIcon`, `StarIcon`, etc.) for readability.
- **Price conversion** — FakeStore prices are in USD; the UI multiplies by 84 and renders in ₹ (INR) with a 20% fictional "original" price for a realistic e-commerce feel.

### Styling Approach

- **Tailwind CSS v4** provides utility classes. No custom `tailwind.config.js` is needed — configuration lives entirely in CSS via `@theme` (if needed) or directly as utility overrides.
- **Glassmorphism Navbar** — `backdrop-blur-2xl` + semi-transparent `bg-gray-950/80` activates only after scrolling 24px, keeping the hero clean.
- **Animated floating badges** — defined with an inline `@keyframes floatBadge` scoped inside the `Hero` component's `<style>` block, avoiding global CSS pollution.
- **Skeleton loaders** — built from Tailwind's `animate-pulse` utility, matching the exact card layout dimensions to prevent layout shift on data load.

---

## Setup & Running Locally

### Prerequisites

- **Node.js** ≥ 18 (LTS recommended)
- **npm** ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/shopexplorer.git
cd shopexplorer

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will be available at **http://localhost:5173** by default.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build optimised production bundle to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint across all source files |

---

## Dependencies

### Production

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.2.7 | UI library |
| `react-dom` | ^19.2.7 | DOM renderer |
| `axios` | ^1.18.1 | HTTP client with interceptor support |

### Development

| Package | Version | Purpose |
|---|---|---|
| `vite` | ^8.1.0 | Build tool & dev server |
| `@vitejs/plugin-react` | ^6.0.2 | Babel-based React Fast Refresh |
| `tailwindcss` | ^4.3.1 | Utility-first CSS framework |
| `@tailwindcss/vite` | ^4.3.1 | Zero-config Tailwind v4 Vite plugin |
| `eslint` | ^10.5.0 | Linter |
| `eslint-plugin-react-hooks` | ^7.1.1 | Enforces Rules of Hooks |
| `eslint-plugin-react-refresh` | ^0.5.3 | Validates Fast Refresh compatibility |

---

## Potential Enhancements

- [ ] Product detail modal or dedicated detail page (`/product/:id`)
- [ ] Persistent cart & wishlist via `localStorage` or a state manager
- [ ] Pagination or infinite scroll for large catalogs
- [ ] Sort controls (price ↑↓, rating, newest)
- [ ] Authentication flow using FakeStore's `/auth/login` endpoint
- [ ] Unit tests with Vitest + React Testing Library
- [ ] PWA manifest for offline support

---

## License

[ISC](./package.json)
