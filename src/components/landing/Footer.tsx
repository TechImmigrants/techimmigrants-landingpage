import { Youtube, MessageCircle, Linkedin, Twitter, Instagram, Github, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { site } from "@/config/site";

const socialLinks = [
  { href: site.social.youtube, label: "YouTube", Icon: Youtube },
  { href: site.social.telegram, label: "Telegram", Icon: MessageCircle },
  { href: site.social.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: site.social.twitter, label: "X / Twitter", Icon: Twitter },
  { href: site.social.instagram, label: "Instagram", Icon: Instagram },
  { href: site.social.github, label: "GitHub", Icon: Github },
];

const quickLinks = [
  { label: "برنامه‌ها", href: "#programs" },
  { label: "Product Builders", href: "#product-builders" },
  { label: "منابع", href: "#resources" },
  { label: "همکاری با ما", href: "#partners" },
  { label: "حمایت", href: "#support" },
  { label: "تماس", href: "#contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold">{site.meta.name}</h3>
            <p className="text-sm text-secondary-foreground/80 mt-2 leading-relaxed max-w-xs">
              {site.footer.mission}
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm text-secondary-foreground/90">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>{site.footer.trustNote}</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">دسترسی سریع</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/partners"
                  className="text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  صفحه همکاری
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">ما را دنبال کنید</h4>
            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-secondary-foreground/10 rounded-full flex items-center justify-center hover:bg-secondary-foreground/20 transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-block mt-4 text-sm text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
              dir="ltr"
            >
              {site.contact.email}
            </a>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-secondary-foreground/70">
            © {currentYear} {site.meta.nameFa}. ساخته‌شده توسط جامعه.
          </p>
        </div>
      </div>
    </footer>
  );
}
