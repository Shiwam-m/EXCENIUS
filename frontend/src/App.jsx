import { ThemeProvider, useTheme } from "./context/ThemeContext";
import LenisProvider from "./components/LenisProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import About from "./components/About";
import WhyUs from "./components/WhyUs";
import Work from "./components/Work";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

function AppContent() {
  const { theme } = useTheme();
  const isLight = theme === "warm-white";

  return (
    <LenisProvider>
      {/* Subtle ambient lighting layer for transparent & glass themes */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="ambient-glow absolute -top-[10%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] rounded-full bg-blue-600/15 blur-[140px]" />
        <div className="ambient-glow absolute top-[35%] -left-[10%] w-[650px] h-[650px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="ambient-glow absolute top-[65%] -right-[10%] w-[700px] h-[700px] rounded-full bg-indigo-600/10 blur-[160px]" />
      </div>

      <div className="grain" aria-hidden="true" />
      <Preloader />
      <Cursor />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <Services />
        <About />
        <WhyUs />
        <Work />
        <Process />
        <Contact />
      </main>
      <Footer />
      <Toaster theme={isLight ? "light" : "dark"} position="bottom-right" />
    </LenisProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
