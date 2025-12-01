import { MessageCircle, Youtube, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div>
            <h3 className="text-xl font-bold">Tech Immigrants</h3>
            <p className="text-sm text-secondary-foreground/70 mt-1">
              جامعه ایرانیان شاغل در صنعت تکنولوژی
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://t.me/techimmigrants"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary-foreground/20 transition-colors"
              aria-label="Telegram"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com/@techimmigrants"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary-foreground/20 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/techimmigrants"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary-foreground/20 transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-secondary-foreground/70">
            © {currentYear} تک ایمیگرنتس. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}
