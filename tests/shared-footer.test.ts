import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

import { communityFooterContent } from "../src/components/community-footer/communityFooterContent.ts";
import {
  socialProfiles,
  telegramChannelProfile,
} from "../src/content/communityData.ts";

const projectFile = (path: string) => new URL(`../${path}`, import.meta.url);

test("English and Persian pages render the same localized footer", () => {
  const englishPage = readFileSync(projectFile("src/english/EnglishHomePage.tsx"), "utf8");
  const persianFooter = readFileSync(projectFile("src/components/landing/Footer.tsx"), "utf8");

  assert.match(englishPage, /<CommunityFooter locale="en" \/>/);
  assert.match(persianFooter, /<CommunityFooter locale="fa" \/>/);
});

test("the Persian footer keeps the English footer destinations and uses Persian copy", () => {
  const english = communityFooterContent.en;
  const persian = communityFooterContent.fa;
  const profileDestinations = new Set([
    ...Object.values(socialProfiles).map((profile) => profile.url),
    telegramChannelProfile.url,
  ]);

  assert.equal(persian.locale, "fa");
  assert.equal(persian.direction, "rtl");
  assert.match(persian.description, /[\u0600-\u06ff]/);
  assert.deepEqual(
    new Set(persian.channels.map((channel) => channel.href)),
    profileDestinations,
  );
  assert.deepEqual(
    persian.channels.map((channel) => channel.href),
    english.channels.map((channel) => channel.href),
  );
  assert.equal(
    persian.description,
    "تک ایمیگرنتس یک جامعه داوطلبانه است که با مصاحبه از ایرانیان شاغل در صنعت تکنولوژی در کشورهای مختلف، تجربیات واقعی مهاجرت و کار رو با شما به اشتراک می‌ذاره.",
  );
  assert.equal(persian.footerNote, "جامعه ایرانیان شاغل در صنعت تکنولوژی");
  assert.equal(persian.homeHref, "/fa/");
  assert.equal("workshopsLink" in persian, false);
  assert.deepEqual(persian.language, {
    label: "English",
    hint: "وب‌سایت انگلیسی",
    href: "/",
    locale: "en",
    direction: "ltr",
  });
  assert.equal(socialProfiles.instagram.url, "https://www.instagram.com/techimmigrant");
  assert.equal(socialProfiles.instagram.handle, "@techimmigrant");
});

test("the Persian footer localizes platform names", () => {
  const labels = Object.fromEntries(
    communityFooterContent.fa.channels.map((channel) => [channel.id, channel.label]),
  );

  assert.equal(labels.youtube, "یوتیوب");
  assert.equal(labels.linkedin, "لینکدین");
  assert.equal(labels.instagram, "اینستاگرام");
  assert.equal(labels.github, "گیت‌هاب");
});

test("the footer overrides the page selection color for contrast", () => {
  const component = readFileSync(
    projectFile("src/components/community-footer/CommunityFooter.tsx"),
    "utf8",
  );

  assert.match(component, /selection:!bg-\[#f6dcb0\]/);
  assert.match(component, /selection:!text-\[#071e32\]/);
});

test("the footer separates the Telegram conversation group from the broadcast channel", () => {
  const englishTelegram = communityFooterContent.en.channels.filter(
    (channel) => channel.platform === "telegram",
  );
  const persianTelegram = communityFooterContent.fa.channels.filter(
    (channel) => channel.platform === "telegram",
  );

  assert.deepEqual(
    englishTelegram.map(({ id, label, href }) => ({ id, label, href })),
    [
      {
        id: "telegram-group",
        label: "Telegram group",
        href: "https://t.me/techimmigrants",
      },
      {
        id: "telegram-channel",
        label: "Telegram channel",
        href: "https://t.me/Tech_Immigrants",
      },
    ],
  );
  assert.deepEqual(
    persianTelegram.map((channel) => channel.href),
    englishTelegram.map((channel) => channel.href),
  );
});

test("only the footer description is selectable and copies without visible status text", () => {
  const component = readFileSync(
    projectFile("src/components/community-footer/CommunityFooter.tsx"),
    "utf8",
  );

  assert.match(component, /select-none/);
  assert.match(component, /select-text/);
  assert.match(component, /community-footer__description-copy/);
  assert.match(component, /navigator\.clipboard\.writeText\(content\.description\)/);
  assert.doesNotMatch(component, /copyState|copyStatus|aria-live="polite"/);
  assert.doesNotMatch(component, /<Check|<Copy/);
});

test("the shared footer uses Tailwind instead of a standalone component stylesheet", () => {
  assert.equal(
    existsSync(projectFile("src/components/community-footer/community-footer.css")),
    false,
  );

  const component = readFileSync(
    projectFile("src/components/community-footer/CommunityFooter.tsx"),
    "utf8",
  );
  assert.doesNotMatch(component, /community-footer\.css/);
  assert.match(component, /grid-cols-\[minmax\(0,1\.5fr\)_minmax\(0,1fr\)\]/);
  assert.doesNotMatch(component, /pageLinksLabel|content\.pageLinks|workshopsLink/);
});

test("the Persian footer uses Persian typography and keeps handles near their labels", () => {
  const component = readFileSync(
    projectFile("src/components/community-footer/CommunityFooter.tsx"),
    "utf8",
  );

  assert.match(
    component,
    /locale === "en"\s*\? "\[font-family:var\(--font-mono\)\]"\s*: "font-sans"/s,
  );
  assert.match(component, /locale === "fa" \? "text-right" : "text-left"/);
  assert.match(component, /content\.footerNote/);
});

test("the Persian header and footer share one community tagline source", () => {
  const communityData = readFileSync(
    projectFile("src/content/communityData.ts"),
    "utf8",
  );
  const headerContent = readFileSync(
    projectFile("src/components/landing/persianInstitutionalContent.ts"),
    "utf8",
  );
  const footerContent = readFileSync(
    projectFile("src/components/community-footer/communityFooterContent.ts"),
    "utf8",
  );

  assert.match(communityData, /export const persianCommunityTagline/);
  assert.match(headerContent, /hint:\s*persianCommunityTagline/);
  assert.match(footerContent, /promise:\s*persianCommunityTagline/);
});

test("the mobile menu has breathing room and does not duplicate the language switch", () => {
  const component = readFileSync(
    projectFile("src/english/components/MobileNav.tsx"),
    "utf8",
  );
  const css = readFileSync(
    projectFile("src/english/styles/components/mobile-nav.css"),
    "utf8",
  );

  assert.doesNotMatch(component, /siteLinks|ti-mobile-nav__persian|Persian site/);
  assert.match(css, /top:\s*calc\(100% \+ 1\.6rem\);/);
});
