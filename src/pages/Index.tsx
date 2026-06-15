import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToAnchor } from "@/lib/nav";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TrustStats } from "@/components/landing/TrustStats";
import { Mission } from "@/components/landing/Mission";
import { Journey } from "@/components/landing/Journey";
import { CommunityIntelligence } from "@/components/landing/CommunityIntelligence";
import { Programs } from "@/components/landing/Programs";
import { ProductBuilders } from "@/components/landing/ProductBuilders";
import { ResourcesHub } from "@/components/landing/ResourcesHub";
import { Partnership } from "@/components/landing/Partnership";
import { SupportMission } from "@/components/landing/SupportMission";
import { Founder } from "@/components/landing/Founder";
import { Faq } from "@/components/landing/Faq";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Wait for sections to render before scrolling to the target anchor.
      const id = setTimeout(() => scrollToAnchor(location.hash), 100);
      return () => clearTimeout(id);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustStats />
        <Mission />
        <Journey />
        <CommunityIntelligence />
        <Programs />
        <ProductBuilders />
        <ResourcesHub />
        <Partnership />
        <SupportMission />
        <Founder />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
