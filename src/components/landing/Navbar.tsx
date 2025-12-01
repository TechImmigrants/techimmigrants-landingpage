import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "مصاحبه‌ها", href: "#interviews" },
  { label: "منتورها", href: "#mentors" },
  { label: "جامعه", href: "#community" },
  { label: "منابع", href: "#resources" },
  { label: "لایوها", href: "#lives" },
  { label: "حمایت", href: "#donation" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="text-xl font-bold text-primary">
            Tech Immigrants
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button
              size="sm"
              onClick={() => scrollToSection("#community")}
            >
              عضویت در گروه تلگرام
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium py-2 text-right"
                >
                  {item.label}
                </button>
              ))}
              <Button
                size="sm"
                className="mt-2"
                onClick={() => scrollToSection("#community")}
              >
                عضویت در گروه تلگرام
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
