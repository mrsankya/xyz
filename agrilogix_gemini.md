# Agrilogix - Project Memory & Context

## Project Overview
- **Project Name:** Agrilogix
- **Description:** AI-powered real-time agricultural supply-chain intelligence platform tracking produce freshness, predicting spoilage risk, providing AI FreshRoute and Crop Rescue rerouting, and maintaining an evidence-based digital chain of custody.
- **Root Directory:** `C:\Users\sanke\Agrilogix-final\Agrilogix-main (1)`
- **Application Directory:** `C:\Users\sanke\Agrilogix-final\Agrilogix-main (1)\Agrilogix-main`

## Technology Stack & Architecture
- **Frontend Framework:** React 19, TypeScript (~5.8.2), Vite 6
- **Styling:** Tailwind CSS (v4)
- **Icons & Animations:** Lucide React, Motion (Framer Motion v12), Canvas Confetti
- **Mapping & Location:** Google Maps API Loader (`@googlemaps/js-api-loader`, `@types/google.maps`)
- **AI Integration:** Google GenAI SDK (`@google/genai`), Gemini API
- **Offline & PWA:**
  - Service Worker (`sw.js`) with cache-first and stale-while-revalidate strategy for instant offline loading
  - Web App Manifest (`manifest.webmanifest` and `manifest.json`) enabling standalone app install on Android, iOS, Windows, Mac
  - High-resolution SVG app icon (`public/icons/icon.svg`)
  - Offline banner notification and in-app PWA install trigger button
  - `localStorage` state persistence for offline data resilience
- **Mobile Optimization:**
  - `MobileBottomNav` component with role-specific thumb-friendly actions and badge counts
  - Responsive safe-area bottom padding (`pb-24 lg:pb-6`)
  - Touch-friendly action buttons
- **Sidebar Architecture:**
  - Fixed desktop overlap bug by making sidebar an in-flow flex child (`lg:static lg:h-full shrink-0`)
  - Desktop collapse/expand toggle (`lg:w-20` vs `lg:w-64`) with icon tooltips
  - Mobile slide-out drawer (`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] shadow-2xl`) with backdrop blur and auto-close

## Running the Application
- **Quick Start Script:** `run.bat` in workspace root or subfolder (checks Node.js, installs dependencies if needed, and starts dev server)
- **Development Server:** `npm run dev` (`http://localhost:3000`)
- **Build:** `npm run build`

## Deployment (Cloudflare Pages)
- **Platform:** Cloudflare Pages
- **Project Name:** `agrilogix`
- **Production URL:** [https://agrilogix.pages.dev/](https://agrilogix.pages.dev/)
- **Latest Deployment:** [https://0d78f5be.agrilogix.pages.dev](https://0d78f5be.agrilogix.pages.dev)
- **Deployed Build:** `frontend/dist` (Updated with Auth, KYC Verification, Business Dashboard, PWA & SPA routing)
- **Deployment Status:** Successfully deployed & verified (HTTP 200 OK)
- **Edge Reverse Proxy:** Cloudflare Pages Function (`frontend/functions/api/[[catchall]].js`) automatically proxies all `/api/*` requests directly to `https://agrilogix-api.onrender.com`.
- **Routing Configuration:** Configured with `public/_redirects` for SPA fallback routing.

## Connected Frontend Deployments
1. **Cloudflare Pages:** [https://agrilogix.pages.dev](https://agrilogix.pages.dev) (Proxied via Cloudflare Pages Function)
2. **Vercel Deployment:** [https://farmer-transport-pwey637rc-mittixperts.vercel.app](https://farmer-transport-pwey637rc-mittixperts.vercel.app)
   - Configured with regex CORS matching `r"^https://.*\.vercel\.app$"`
   - Cookie `SameSite="none"` and `Secure=True` enabled for cross-domain auth.

## Git Repository
- **Remote URL:** [https://github.com/mrsankya/xyz.git](https://github.com/mrsankya/xyz.git)
- **Default Branch:** `main`

