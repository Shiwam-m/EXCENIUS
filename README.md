# NOIRFORM — Digital Experiences That Move Businesses Forward

A full-service digital studio and creative agency website built with **React 18 + Vite + Tailwind CSS** and a **Python FastAPI** backend.

---

## 🚀 Quick Start

### 1-Click Launch (Windows)
Double-click `start.bat` or run:
```powershell
.\run.ps1
```
This automatically launches:
- **FastAPI Backend**: [http://127.0.0.1:8001](http://127.0.0.1:8001) (API docs at `/docs`)
- **React Frontend**: [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Architecture

```
Company_/
├── backend/
│   ├── main.py              # FastAPI app with CORS, contact form handling, and persistence
│   ├── requirements.txt     # Python dependencies (fastapi, uvicorn, pydantic)
│   └── contacts.json        # Automatically created storage for contact inquiries
├── frontend/
│   ├── public/
│   │   └── logo.svg         # Monogram vector logo
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.jsx        # Agency story & 5 daily disciplines with hover effects
│   │   │   ├── Contact.jsx      # Zod-validated contact form with Sonner dark toasts
│   │   │   ├── Cursor.jsx       # Custom dual magnetic trailing cursor
│   │   │   ├── ErrorBoundary.jsx# Error boundary fallback
│   │   │   ├── Footer.jsx       # Multi-column footer & Lenis back-to-top button
│   │   │   ├── Hero.jsx         # Parallax editorial hero with scroll indicator
│   │   │   ├── HeroCanvas.jsx   # Interactive 2D constellation canvas (mouse proximity)
│   │   │   ├── Icons.jsx        # Clean SVG social media brand icons
│   │   │   ├── LenisProvider.jsx# Lenis smooth inertia scrolling provider
│   │   │   ├── Marquee.jsx      # Infinite 48s typography ticker
│   │   │   ├── Modal.jsx        # Framer Motion animated modal portal (ESC + backdrop close)
│   │   │   ├── Nav.jsx          # Sticky blur header & mobile slide-out menu
│   │   │   ├── Preloader.jsx    # Minimalist splash preloader screen
│   │   │   ├── Process.jsx      # 4-step vertical timeline with scroll-synced spring line
│   │   │   ├── Reveal.jsx       # Reusable viewport scroll reveal wrapper
│   │   │   ├── Services.jsx     # 5 service cards with detail modals and checklist
│   │   │   ├── WhyUs.jsx        # 6-card grid with high-contrast color inversion
│   │   │   └── Work.jsx         # Filterable portfolio & case-study modals
│   │   ├── App.jsx              # Main page assembly
│   │   ├── index.css            # Tailwind directives, SVG film grain, custom utilities
│   │   └── main.jsx             # React entry point
│   ├── index.html           # Google Fonts & SEO meta tags
│   ├── package.json         # NPM scripts and dependencies
│   ├── tailwind.config.js   # Custom fonts, colors, and animations
│   └── vite.config.js       # Vite configuration with `/api` proxy to port 8001
├── run.ps1                  # PowerShell concurrent launcher
├── start.bat                # Batch launcher for Windows
└── README.md
```

---

## 🛠️ Tech Stack & Key Features

### Frontend
- **React 18** + **Vite 6**
- **Tailwind CSS v3** with bespoke tokens:
  - Fonts: **Syne** (Display), **Instrument Serif** (Editorial accents), **JetBrains Mono** (Tech metadata), **Plus Jakarta Sans** (Body)
  - Colors: Base `#0A0A0A`, elevated cards `#121212`, hairline white borders
- **Framer Motion**:
  - Mask-overflow text reveal animations
  - Smooth parallax scroll transforms
  - Exit & enter spring modals
  - Scroll-linked spring progress bar on the Process timeline
- **Lenis Smooth Scroll**: Inertia wheel scrolling and smooth anchor jumping with navigation offset.
- **Interactive Canvas**: Custom particle physics network connecting nodes with mouse proximity tracking.
- **Custom Magnetic Cursor**: Dual dot + trailing ring with `mix-blend-difference` (touchscreen-aware).
- **Form Handling**: `react-hook-form` + `zod` client validation + `sonner` notifications.

### Backend (FastAPI)
- **FastAPI** + **Uvicorn**
- **CORS Middleware** preconfigured for seamless client communication.
- Endpoints:
  - `GET /api/` — Health check
  - `POST /api/contact` — Validates and stores incoming inquiries into `backend/contacts.json`
  - `GET /api/contacts` — View received inquiries
  - `GET /docs` — Swagger UI API documentation

---

## 🔧 Manual Setup (Optional)

### Backend
```powershell
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8001
```

### Frontend
```powershell
cd frontend
npm install
npm run dev
```
Production build:
```powershell
npm run build
```

## Run Both Files in single commond 
``` .\run.ps1
Both services launched in separate windows!