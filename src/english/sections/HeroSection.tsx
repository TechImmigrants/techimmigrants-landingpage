import { ActionButton } from "../components/ActionButton";
import { ChannelBoard } from "../components/ChannelBoard";
import { LiveDot } from "../components/LiveDot";
import { heroContent } from "../content/hero";
import type { HeroContent } from "../content/hero";
import { platforms as defaultPlatforms, type Platform } from "../content/platforms";
import { currentMonth, currentYearMonth } from "../reportingPeriod";
import { cx } from "../lib/cx";

interface HeroSectionProps {
  channels?: readonly Platform[];
  className?: string;
  content?: HeroContent;
  locale?: "en" | "fa";
  month?: string;
}

export function HeroSection({
  channels = defaultPlatforms,
  className,
  content = heroContent,
  locale = "en",
  month = currentMonth,
}: HeroSectionProps = {}) {
  const { status, headingLead, headingRest, headingEmphasis, lead, actions, trust, board } =
    content;

  return (
    <section
      className={cx("ti-hero ti-shell--wide", className)}
      aria-labelledby={`${locale}-hero-title`}
      dir={locale === "fa" ? "rtl" : "ltr"}
      lang={locale}
    >
      <span className="ti-hero__aura ti-hero__aura--a" aria-hidden="true" />
      <span className="ti-hero__aura ti-hero__aura--b" aria-hidden="true" />

      <div className="ti-hero__copy">
        <p className="ti-hero__status">
          <LiveDot />
          <span>{status}</span>
        </p>

        <h1 id={`${locale}-hero-title`}>
          {headingLead} {headingRest} <em>{headingEmphasis}</em>
        </h1>

        <p className="ti-hero__lead">{lead}</p>

        <div className="ti-hero__actions">
          <ActionButton href={actions.telegram.href} platform="telegram">
            {actions.telegram.label}
          </ActionButton>
          <ActionButton href={actions.youtube.href} platform="youtube" variant="solid">
            {actions.youtube.label}
          </ActionButton>
        </div>

        <ul className="ti-hero__trust">
          {trust.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <ChannelBoard
        board={board}
        channels={channels}
        month={month}
        yearMonth={currentYearMonth}
      />
    </section>
  );
}
