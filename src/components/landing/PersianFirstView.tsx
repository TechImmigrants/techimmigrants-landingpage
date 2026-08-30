import { HeroSection } from "@/english/sections/HeroSection";
import { TopicTicker } from "@/english/sections/TopicTicker";
import {
  persianCurrentMonth,
  persianHeroContent,
  persianPlatforms,
  persianTickerTopics,
} from "./persianInstitutionalContent";

export function PersianFirstView() {
  return (
    <>
      <HeroSection
        channels={persianPlatforms}
        className="ti-theme ti-theme--fa"
        content={persianHeroContent}
        locale="fa"
        month={persianCurrentMonth}
      />
      <TopicTicker
        className="ti-theme ti-theme--fa"
        topics={persianTickerTopics}
      />
    </>
  );
}
