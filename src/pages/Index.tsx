import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { InterviewsSection } from "@/components/landing/InterviewsSection";
import { MentorsSection } from "@/components/landing/MentorsSection";
import { CommunitySection } from "@/components/landing/CommunitySection";
import { ResourcesSection } from "@/components/landing/ResourcesSection";
import { LiveEventsSection } from "@/components/landing/LiveEventsSection";
import { FeedbackSection } from "@/components/landing/FeedbackSection";
import { DonationSection } from "@/components/landing/DonationSection";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navbar />
      <main>
        <Hero />
        <InterviewsSection />
        <MentorsSection />
        <CommunitySection />
        <ResourcesSection />
        <LiveEventsSection />
        <FeedbackSection />
        <DonationSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
