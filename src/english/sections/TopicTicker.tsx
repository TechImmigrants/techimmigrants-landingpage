import { tickerTopics } from "../content/hero";
import { cx } from "../lib/cx";

interface TopicTickerProps {
  className?: string;
  topics?: readonly string[];
}

function TickerGroup({ topics }: { topics: readonly string[] }) {
  return (
    <div className="ti-ticker__group">
      {topics.map((topic) => (
        <span className="ti-ticker__item" key={topic}>
          {topic}
          <i aria-hidden="true" />
        </span>
      ))}
    </div>
  );
}

export function TopicTicker({ className, topics = tickerTopics }: TopicTickerProps = {}) {
  return (
    <div className={cx("ti-ticker", className)} aria-hidden="true">
      <div className="ti-ticker__track">
        <TickerGroup topics={topics} />
        <TickerGroup topics={topics} />
      </div>
    </div>
  );
}
