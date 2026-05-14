import { GuestRole } from "./videos";
import youtubeEvents from "./youtube-events.json";

export type EventPlatform = "YouTube Live" | "Instagram Live" | "Other";

export interface LiveEvent {
  id: string;
  title: string;
  guestName: string;
  country: string;
  guestRole: GuestRole;
  datetime: string;
  platform: EventPlatform;
  youtubeOrEventUrl?: string;
  thumbnailUrl?: string;
  description: string;
}

interface YouTubeEvent {
  videoId: string;
  title: string;
  description: string;
  scheduledStart: string | null;
  thumbnailUrl: string | null;
  youtubeUrl: string;
}

function toLiveEvent(yt: YouTubeEvent): LiveEvent {
  return {
    id: yt.videoId,
    title: yt.title,
    guestName: "",
    country: "",
    guestRole: "Backend",
    datetime: yt.scheduledStart || "",
    platform: "YouTube Live",
    youtubeOrEventUrl: yt.youtubeUrl,
    thumbnailUrl: yt.thumbnailUrl ?? undefined,
    description: yt.description,
  };
}

export const events: LiveEvent[] = (youtubeEvents as YouTubeEvent[])
  .filter((e) => e.scheduledStart && new Date(e.scheduledStart) > new Date())
  .map(toLiveEvent)
  .sort(
    (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
  );
