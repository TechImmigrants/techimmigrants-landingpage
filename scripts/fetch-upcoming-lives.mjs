#!/usr/bin/env node

/**
 * Fetches upcoming YouTube live streams for the Tech Immigrants channel
 * and writes them to src/data/youtube-events.json.
 *
 * Usage:
 *   YOUTUBE_API_KEY=... node scripts/fetch-upcoming-lives.mjs
 *
 * The script exits 0 even when no upcoming lives are found (writes []).
 */

import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "../src/data/youtube-events.json");

const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_HANDLE = "techimmigrants";
const API_BASE = "https://www.googleapis.com/youtube/v3";

if (!API_KEY) {
  console.error("YOUTUBE_API_KEY environment variable is required");
  process.exit(1);
}

async function apiFetch(endpoint, params) {
  const url = new URL(`${API_BASE}/${endpoint}`);
  url.searchParams.set("key", API_KEY);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`YouTube API ${endpoint} returned ${res.status}: ${body}`);
  }
  return res.json();
}

async function resolveChannelId() {
  const data = await apiFetch("channels", {
    forHandle: CHANNEL_HANDLE,
    part: "id",
  });

  if (!data.items?.length) {
    throw new Error(`Channel @${CHANNEL_HANDLE} not found`);
  }
  return data.items[0].id;
}

async function fetchUpcomingLives(channelId) {
  const data = await apiFetch("search", {
    channelId,
    eventType: "upcoming",
    type: "video",
    order: "date",
    maxResults: "5",
    part: "id",
  });

  if (!data.items?.length) return [];

  const videoIds = data.items.map((item) => item.id.videoId).join(",");

  const details = await apiFetch("videos", {
    id: videoIds,
    part: "snippet,liveStreamingDetails",
  });

  return (details.items || []).map((video) => ({
    videoId: video.id,
    title: video.snippet.title,
    description: video.snippet.description,
    scheduledStart:
      video.liveStreamingDetails?.scheduledStartTime || null,
    thumbnailUrl:
      video.snippet.thumbnails?.high?.url ||
      video.snippet.thumbnails?.medium?.url ||
      video.snippet.thumbnails?.default?.url ||
      null,
    youtubeUrl: `https://www.youtube.com/watch?v=${video.id}`,
  }));
}

async function main() {
  try {
    console.log(`Resolving channel ID for @${CHANNEL_HANDLE}...`);
    const channelId = await resolveChannelId();
    console.log(`Channel ID: ${channelId}`);

    console.log("Fetching upcoming live streams...");
    const events = await fetchUpcomingLives(channelId);
    console.log(`Found ${events.length} upcoming live(s)`);

    writeFileSync(OUTPUT_PATH, JSON.stringify(events, null, 2) + "\n");
    console.log(`Wrote ${OUTPUT_PATH}`);
  } catch (err) {
    console.error("Error fetching YouTube lives:", err.message);
    writeFileSync(OUTPUT_PATH, "[]\n");
    console.log(`Wrote empty fallback to ${OUTPUT_PATH}`);
  }
}

main();
