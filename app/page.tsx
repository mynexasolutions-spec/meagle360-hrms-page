import { SiteChrome } from "./components/SiteChrome";
import { Hero } from "./components/Hero";
import { LogoStrip } from "./components/LogoStrip";
import { Features } from "./components/Features";
import { Modules } from "./components/Modules";
import { Stats } from "./components/Stats";
import { EmployeeCentric } from "./components/EmployeeCentric";
import { Pricing } from "./components/Pricing";
import { Testimonials } from "./components/Testimonials";
import { Faq } from "./components/Faq";
import { CtaBanner } from "./components/CtaBanner";

export default function Home() {
  return (
    <SiteChrome>
      <Hero />
      <LogoStrip />
      <Features />
      <Modules />
      <Stats />
      <EmployeeCentric />
      <Pricing />
      <Testimonials />
      <Faq />
      <CtaBanner />
    </SiteChrome>
  );
}
