import { heroContent } from "../content/hero";
import type { HeroContent } from "../content/hero";
import { platforms } from "../content/platforms";
import type { Platform } from "../content/platforms";
import { currentMonth, currentYearMonth } from "../reportingPeriod";
import { ChannelRow } from "./ChannelRow";
import { LiveDot } from "./LiveDot";
import { MetricValue } from "./MetricValue";

interface ChannelBoardProps {
  board?: HeroContent["board"];
  channels?: readonly Platform[];
  month?: string;
  yearMonth?: string;
}

export function ChannelBoard({
  board = heroContent.board,
  channels = platforms,
  month = currentMonth,
  yearMonth = currentYearMonth,
}: ChannelBoardProps) {

  return (
    <aside className="ti-board ti-liquid-glass" aria-label={board.title}>
      <header className="ti-board__head">
        <span className="ti-label">
          <LiveDot />
          {board.title}
        </span>
        <time className="ti-label" dateTime={yearMonth}>
          {month}
        </time>
      </header>

      <div className="ti-board__list">
        <span className="ti-board__sweep" aria-hidden="true" />
        {channels.map((platform) => (
          <ChannelRow key={platform.id} platform={platform} />
        ))}
      </div>

      <footer className="ti-board__foot">
        <span>{board.note}</span>
        <span className="ti-board__total">
          <MetricValue value={board.total} />
          <small>{board.totalLabel}</small>
        </span>
      </footer>
    </aside>
  );
}
