import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { MentorsSection } from "@/components/landing/MentorsSection";

export default function Mentors() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link to="/" className="gap-2">
                <ArrowRight className="h-4 w-4" />
                بازگشت به صفحه اصلی
              </Link>
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              همه منتورها
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              افرادی با تجربه در صنعت تک و مهاجرت آماده‌اند تا در مسیر شما کمکتون کنن.
            </p>
          </div>
        </div>

        <MentorsSection showAll showHeader={false} />
      </main>
      <Footer />
    </div>
  );
}
