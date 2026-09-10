<div align="center">
  <img src="./public/logo.png" alt="360 Coating Solutions Logo" width="350" style="margin-bottom: 20px; border-radius: 8px;" />
  <h1>360 Coating Solutions & 360 Painting and Wall Design</h1>
  <p><strong>A Premium, High-Performance Web Experience Engineered for Excellence</strong></p>
</div>

---

## 📖 Overview

This repository contains the source code for the official web presence of **360 Coating Solutions** (B2B industrial coatings) and **360 Painting and Wall Design** (high-end residential design). 

Engineered with a focus on **uncompromising performance, sophisticated animations, and technical elegance**, the application delivers a seamless **360° user journey**. The interface introduces the bespoke *"Steel & Silk"* design system, which strikes a delicate balance between industrial structural integrity (Carbon) and warm, editorial residential aesthetics (Sand).

---

## ✨ Engineering Excellence & Architecture

This project was built adhering to the highest software engineering standards, ensuring top-tier performance, maintainability, and user experience for both clients and future developers.

### 🚀 Advanced Tech Stack
- **React 19 & Vite**: Leverages the latest React concurrent features and Vite's lightning-fast build engine for optimal static asset generation and seamless HMR during development.
- **Tailwind CSS v4**: Utilizes a highly scalable, token-based design architecture (`src/index.css`) for consistent, utility-first styling across the entire application.
- **GSAP & ScrollTrigger**: Implements cinema-quality entrance choreography, pinned gateways, and hardware-accelerated parallax effects that feel native and fluid.

### ⚡ Performance & Optimization
- **Zero Cumulative Layout Shift (CLS)**: All media and structural elements are meticulously pre-calculated with explicit dimensions to ensure a perfectly stable layout during load.
- **Self-Hosted Variable Fonts**: (Fraunces & Archivo) Served directly from the origin to eliminate third-party DNS lookups, ensuring instantaneous text rendering and maximum privacy across all devices.
- **Media Compression Pipelines**: All video sources are heavily compressed into web-safe H.264 MP4s and progressive WebP posters, delivering rich visual storytelling without bandwidth bloat.

### 🛡️ Security & Reliability
- **Integrated Node.js & Express Backend**: A unified service (`server/index.js`) that serves the static frontend while securely managing the `/api/contact` endpoint.
- **Robust Anti-Spam Architecture**: Features an invisible Honeypot field that traps bots without degrading human UX, backed by server-side rate limiting to prevent abuse.
- **Sanitized Email Routing**: Powered by **Resend**, featuring strict header-injection guards and automatic inquiry tagging (`X-360-Inquiry-Type`) for seamless inbox management and zero client-side API key exposure.

### ♿ Accessibility (a11y) & SEO
- **Motion Sensitivity**: Animations strictly respect the OS-level `prefers-reduced-motion` queries, gracefully degrading complex animations to ensure a comfortable experience for all users.
- **WCAG-AA Compliance**: Color palettes and typography scales are rigorously tested for optimal contrast and readability.
- **Semantic SEO**: Fully optimized with dynamic JSON-LD structured data (FAQ schemas) and precise semantic HTML5 landmarks to dominate search engine rankings.

---

## 🛠️ Local Development

The architecture separates the frontend client and the backend contact API into two distinct processes during development for maximum velocity.

### Prerequisites
- Node.js (v18+ recommended)
- `npm` or `yarn`

### Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env and add your RESEND_API_KEY to enable email dispatching
   ```

3. **Run the Development Servers**
   You will need two terminal instances:
   ```bash
   # Terminal 1: Starts the Vite frontend with HMR (http://localhost:5173)
   npm run dev            
   
   # Terminal 2: Starts the Express contact API (http://localhost:3001)
   npm run server          
   ```
   *Note: Vite is configured to automatically proxy `/api/*` requests to the Express server, mirroring the production environment flawlessly.*

4. **Production Build**
   ```bash
   npm run build
   # Outputs optimized, minified static files to the dist/ directory
   ```

---

## ⚙️ Content Management & Configuration

The codebase is architected for maximum maintainability. All business logic and content are centralized, allowing for safe and rapid updates without digging through complex component trees:

| Component | Location |
| :--- | :--- |
| **Contact Info & Socials** | `src/content/site.js` → `CONTACT` object |
| **Services & FAQs** | `src/content/site.js` → `COATING_SERVICES` / `FAQS` |
| **Client Testimonials** | `src/content/site.js` → `TESTIMONIALS` |
| **Image Registry** | `src/assets/img/` (Configured in `src/content/images.js`) |
| **Design Tokens (Colors/Fonts)** | `src/index.css` (`@theme` block) |
| **Email Routing Configuration** | Production Environment Variables (`RESEND_FROM`, `CONTACT_EMAIL_ADMIN`) |

---

## ☁️ Production Deployment (Railway)

This repository is engineered for a seamless, single-service deployment on **Railway**. The Node.js instance serves both the static site and the dynamic API endpoint simultaneously.

1. **Connect Repository**: Link this GitHub repository to a new Railway project.
2. **Root Directory**: Set the deployment root directory to `site/`.
3. **Automatic Build**: Railway will automatically detect Node.js, execute `npm install`, compile the frontend via `npm run build`, and start the server with `npm start`.
4. **Environment Variables**:
   - `RESEND_API_KEY`: Your secure API key from Resend.
   - `RESEND_FROM`: The verified sender address (e.g., `notifications@360coatingsolutions.com`).
   - `CONTACT_EMAIL_ADMIN`: The target inbox for incoming leads.
5. **Custom Domain**: Map your DNS records (CNAME) via the Railway networking dashboard.

---

<div align="center">
  <i>Architected and developed with precision for 360 Coating Solutions.</i>
</div>
