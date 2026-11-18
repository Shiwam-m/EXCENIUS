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

function App() {
  return (
    <ErrorBoundary>
      <LenisProvider>
        <div className="grain" aria-hidden="true" />
        <Preloader />
        <Cursor />
        <Nav />
        <main>
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
        <Toaster theme="dark" position="bottom-right" />
      </LenisProvider>
    </ErrorBoundary>
  );
}

export default App;
