import { ArrowUpRight } from "lucide-react";
import { PlatformIcon } from "../../english/components/PlatformIcon";
import { cn } from "../../lib/utils";
import {
  communityFooterContent,
  type FooterLocale,
  type FooterPlatformId,
} from "./communityFooterContent";

interface CommunityFooterProps {
  locale: FooterLocale;
}

const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

const focusRing =
  "focus-visible:rounded-[0.6rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#8ad4f1]";

const platformGlyphClasses: Record<FooterPlatformId, string> = {
  telegram: "bg-[#229ed9]/20 text-[#229ed9]",
  youtube: "bg-[#e03e3e]/20 text-[#e03e3e]",
  x: "bg-[#dbe8f3]/20 text-[#dbe8f3]",
  linkedin: "bg-[#0a66c2]/20 text-[#0a66c2]",
  instagram: "bg-[#cd3a7e]/20 text-[#cd3a7e]",
  github: "bg-[#d0e0ee]/20 text-[#d0e0ee]",
};

function labelClasses(locale: FooterLocale) {
  return cn(
    "m-0 text-[0.625rem] font-semibold text-white/65",
    locale === "en"
      ? "font-mono uppercase tracking-[0.08em]"
      : "font-sans normal-case tracking-normal",
  );
}

export function CommunityFooter({ locale }: CommunityFooterProps) {
  const content = communityFooterContent[locale];

  async function copyDescription() {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(content.description).catch(() => undefined);
    }
  }

  return (
    <footer
      className={cn(
        "community-footer relative select-none overflow-hidden bg-[#0b2942]",
        "bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]",
        "pt-[clamp(3rem,5vw,4.5rem)] text-start text-base leading-[1.6] text-white antialiased [font-family:var(--font-sans)]",
        "before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-[#e8a33d] before:via-[#0b84c6] before:to-transparent before:content-['']",
        `community-footer--${locale}`,
      )}
      dir={content.direction}
      lang={content.locale}
    >
      <div
        className={cn(
          "community-footer__shell community-footer__inner mx-auto grid w-[calc(100%-2rem)] max-w-[1240px]",
          "grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] gap-[clamp(2rem,4vw,3.5rem)] pb-[clamp(2.5rem,4vw,3.5rem)]",
          "max-[1040px]:grid-cols-2 max-[620px]:w-[calc(100%-1.7rem)] max-[620px]:grid-cols-1",
        )}
      >
        <div className="community-footer__brand grid content-start justify-items-start gap-4">
          <a
            className={cn(
              "community-footer__identity inline-flex w-max items-center gap-[0.7rem] text-inherit no-underline",
              focusRing,
            )}
            href={content.homeHref}
            aria-label={content.backToTopLabel}
          >
            <img
              className="community-footer__mark block h-[2.6rem] w-[2.6rem] shrink-0 rounded-[0.85rem] object-cover shadow-[0_6px_16px_rgb(3_14_24/0.28),inset_0_0_0_1px_rgb(255_255_255/0.08)]"
              src="/brand-mark.png"
              alt=""
              width={40}
              height={40}
            />
            <span className="community-footer__identity-copy grid gap-[0.08rem] leading-tight">
              <strong
                className={cn(
                  "text-[0.82rem] font-semibold",
                  locale === "en" ? "tracking-[-0.015em]" : "tracking-normal",
                )}
              >
                {content.brandName}
              </strong>
              <small className="text-[0.625rem] text-white/65">{content.promise}</small>
            </span>
          </a>

          <button
            className={cn(
              "community-footer__description-copy group grid max-w-96 cursor-copy appearance-none justify-items-start gap-[0.45rem] border-0 bg-transparent p-0 text-start text-inherit",
              focusRing,
            )}
            type="button"
            onClick={copyDescription}
            aria-label={content.copyDescriptionLabel}
          >
            <span
              className={cn(
                "community-footer__description-text max-w-96 select-text text-[0.82rem] leading-[1.7] text-white/80",
                "transition-colors duration-200 group-hover:text-white group-focus-visible:text-white motion-reduce:transition-none",
                "selection:!bg-[#f6dcb0] selection:!text-[#071e32]",
              )}
            >
              {content.description}
            </span>
          </button>

          <span
            className={cn(
              "community-footer__status inline-flex items-center gap-[0.45rem]",
              labelClasses(locale),
            )}
          >
            <span
              className="community-footer__live-dot inline-block h-[0.45rem] w-[0.45rem] shrink-0 animate-pulse rounded-full bg-[#34c88a] motion-reduce:animate-none"
              aria-hidden="true"
            />
            {content.liveLabel} · {content.reportingMonth}
          </span>

          <a
            className={cn(
              "community-footer__language inline-flex min-h-[2.6rem] items-center gap-2 rounded-[0.85rem] border border-white/15 bg-white/[0.045] px-[0.85rem] py-1.5 text-inherit no-underline",
              "transition duration-200 hover:-translate-y-px hover:border-white/30 motion-reduce:transform-none motion-reduce:transition-none",
              focusRing,
            )}
            href={content.language.href}
          >
            <span
              className={cn(
                "text-[0.82rem] font-semibold",
                locale === "en" && "font-sans",
              )}
              lang={content.language.locale}
              dir={content.language.direction}
            >
              {content.language.label}
            </span>
            <small className="text-[0.625rem] text-white/65">{content.language.hint}</small>
            <ArrowUpRight
              className={cn(
                "h-3 w-3 text-white/65",
                locale === "fa" && "-scale-x-100",
              )}
              aria-hidden="true"
            />
          </a>

        </div>

        <nav
          className="community-footer__column grid content-start gap-[0.85rem]"
          aria-label={content.channelsLabel}
        >
          <p className={labelClasses(locale)}>{content.channelsLabel}</p>
          <ul className="m-0 grid list-none gap-[0.55rem] p-0">
            {content.channels.map((channel) => (
              <li key={channel.id}>
                <a
                  className={cn(
                    "community-footer__channel grid grid-cols-[1.85rem_auto_minmax(0,1fr)] items-center gap-[0.55rem] text-[0.82rem] text-white/80 no-underline",
                    "transition-colors duration-200 hover:text-white motion-reduce:transition-none",
                    focusRing,
                  )}
                  href={channel.href}
                  data-platform={channel.platform}
                  {...externalLinkProps}
                >
                  <span
                    className={cn(
                      "community-footer__glyph grid h-[1.85rem] w-[1.85rem] place-items-center rounded-[0.6rem] [&_svg]:block [&_svg]:h-[0.85rem] [&_svg]:w-[0.85rem]",
                      platformGlyphClasses[channel.platform],
                    )}
                  >
                    <PlatformIcon platform={channel.platform} />
                  </span>
                  <span>{channel.label}</span>
                  <small
                    className={cn(
                      "overflow-hidden text-ellipsis whitespace-nowrap text-[0.6rem] text-white/65 [font-family:var(--font-mono)]",
                      locale === "fa" ? "text-right" : "text-left",
                    )}
                    dir="ltr"
                  >
                    {channel.handle}
                  </small>
                </a>
              </li>
            ))}
          </ul>
        </nav>

      </div>

      <div
        className={cn(
          "community-footer__shell community-footer__base mx-auto flex w-[calc(100%-2rem)] max-w-[1240px] flex-wrap items-center justify-between gap-4 border-t border-white/15 py-[1.15rem] pb-[1.6rem] text-[0.625rem] text-white/65",
          "max-[620px]:w-[calc(100%-1.7rem)] max-[620px]:items-start max-[620px]:justify-start",
          locale === "en" ? "[font-family:var(--font-mono)]" : "font-sans",
        )}
      >
        <span>{content.footerNote}</span>
        <span>
          © {new Date().getFullYear()} {content.brandName}
        </span>
      </div>
    </footer>
  );
}
