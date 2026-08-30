import { ArrowUpRight } from "lucide-react";
import type { Platform } from "../content/platforms";
import { externalLinkProps } from "../lib/externalLink";
import { MetricValue } from "./MetricValue";
import { PlatformIcon } from "./PlatformIcon";

interface ChannelRowProps {
  platform: Platform;
}

export function ChannelRow({ platform }: ChannelRowProps) {
  return (
    <a
      className="ti-channel-row"
      href={platform.href}
      data-platform={platform.id}
      {...externalLinkProps(platform.href)}
    >
      <span className="ti-channel-row__glyph">
        <PlatformIcon platform={platform.id} />
      </span>
      <span className="ti-channel-row__identity">
        <strong>{platform.name}</strong>
        <small dir="ltr">{platform.handle}</small>
      </span>
      {platform.metric ? (
        <span className="ti-channel-row__metric">
          <MetricValue value={platform.metric} />
          <small>{platform.metricLabel}</small>
        </span>
      ) : (
        <span className="ti-channel-row__metric ti-channel-row__metric--empty" />
      )}
      <ArrowUpRight aria-hidden="true" />
    </a>
  );
}
