# EXCENIUS — Digital Experiences That Move Businesses Forward

A full-service digital studio and creative agency website built with **React 18 + Vite + Tailwind CSS** and instant email notifications via **Web3Forms**.

---

## 🚀 Quick Start (Local Development)

### 1-Click Launch (Windows)
Double-click `start.bat` or run:
```powershell
.\run.ps1
```
This automatically launches:
- **React Frontend**: [http://localhost:5173](http://localhost:5173)
- **FastAPI Backend**: [http://127.0.0.1:8001](http://127.0.0.1:8001)

---

## 🌐 1-Click Render Deployment (Free & Fast)

This project includes a pre-configured `render.yaml` blueprint. Because contact submissions are delivered instantly to your Gmail via Web3Forms over HTTPS, the site runs on Render as a **Global Static Site**:
- ⚡ **Never sleeps** (zero cold starts or lag)
- 💰 **100% Free forever**
- 📩 **Instant email notifications** directly to `shiwammaddheshiya@gmail.com`

### Deployment Steps:
1. Push this folder to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "Deploy NOIRFORM"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO>.git
   git push -u origin main
   ```
2. Go to **[dashboard.render.com](https://dashboard.render.com/)**.
3. Click **New +** ➔ **Blueprint**.
4. Select your GitHub repository and click **Apply**.
5. Render will automatically build and launch your live website in under 60 seconds!

---

## 📁 Project Architecture

```
Company_/
├── frontend/
│   ├── public/
│   │   └── logo.svg         # Monogram vector logo
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.jsx        # Agency story & 5 daily disciplines
│   │   │   ├── Contact.jsx      # Web3Forms + Zod validation form
│   │   │   ├── Cursor.jsx       # Custom dual magnetic trailing cursor
│   │   │   ├── ErrorBoundary.jsx# Error boundary fallback
│   │   │   ├── Footer.jsx       # Multi-column footer & Lenis back-to-top
│   │   │   ├── Hero.jsx         # Parallax editorial hero
│   │   │   ├── HeroCanvas.jsx   # Interactive 2D constellation canvas
│   │   │   ├── Icons.jsx        # SVG brand icons
│   │   │   ├── LenisProvider.jsx# Lenis smooth inertia scrolling
│   │   │   ├── Marquee.jsx      # Infinite 48s typography ticker
│   │   │   ├── Modal.jsx        # Animated service popups
│   │   │   ├── Nav.jsx          # Sticky blur header & mobile drawer
│   │   │   ├── Preloader.jsx    # Minimalist splash preloader screen
│   │   │   ├── Process.jsx      # 4-step vertical timeline
│   │   │   ├── Reveal.jsx       # Viewport scroll reveal wrapper
│   │   │   ├── Services.jsx     # 5 service cards with detail modals
│   │   │   ├── WhyUs.jsx        # 6-card grid with hover inversion
│   │   │   └── Work.jsx         # Filterable portfolio showcase
│   │   ├── App.jsx              # Main page assembly
│   │   ├── index.css            # Tailwind directives, SVG film grain, custom utilities
│   │   └── main.jsx             # React entry point
│   ├── index.html           # Google Fonts & SEO meta tags
│   ├── package.json         # NPM scripts and dependencies
│   ├── tailwind.config.js   # Custom fonts, colors, and animations
│   └── vite.config.js       # Vite configuration
├── backend/                 # Local FastAPI server & backup lead storage
├── render.yaml              # Render 1-click deployment blueprint
├── run.ps1                  # PowerShell concurrent launcher
├── start.bat                # Batch launcher for Windows
└── README.md
```
