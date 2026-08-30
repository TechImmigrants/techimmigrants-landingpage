import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const projectFile = (path: string) => new URL(`../${path}`, import.meta.url);

function source(path: string) {
  const file = projectFile(path);
  return existsSync(file) ? readFileSync(file, "utf8") : "";
}

test("the Persian homepage replaces only its header and first view", () => {
  const index = source("src/pages/Index.tsx");
  const firstViewPosition = index.indexOf("<PersianFirstView />");
  const interviewsPosition = index.indexOf("<InterviewsSection />");

  assert.match(index, /import \{ PersianFirstView \}/);
  assert.match(index, /<Navbar \/>/);
  assert.ok(firstViewPosition >= 0);
  assert.ok(interviewsPosition > firstViewPosition);
  assert.doesNotMatch(index, /<Hero \/>/);
  assert.match(index, /<MentorsSection \/>/);
  assert.match(index, /<TestimonialsSection \/>/);
  assert.match(index, /<CommunitySection \/>/);
  assert.match(index, /<ResourcesSection \/>/);
});

test("the Persian first view reuses the English institutional UI primitives", () => {
  const firstView = source("src/components/landing/PersianFirstView.tsx");

  assert.match(firstView, /<HeroSection/);
  assert.match(firstView, /<TopicTicker/);
  assert.match(firstView, /className="ti-theme ti-theme--fa"/);
  assert.match(firstView, /locale="fa"/);
});

test("the Persian first view uses the supplied community copy and localized channels", () => {
  const content = source("src/components/landing/persianInstitutionalContent.ts");

  assert.match(
    content,
    /تجربه‌های مهاجرت در دنیای تکنولوژی،.*از زبان.*ایرانیان مهاجر/s,
  );
  assert.doesNotMatch(content, /headingEmphasis: "ایرانی‌های مهاجر"/);
  assert.match(
    content,
    /تک ایمیگرنتس یک جامعه داوطلبانه است که با مصاحبه از ایرانیان شاغل در صنعت تکنولوژی در کشورهای مختلف، تجربیات واقعی مهاجرت و کار رو با شما به اشتراک می‌ذاره\./,
  );
  assert.match(content, /name: "تلگرام"/);
  assert.match(content, /name: "یوتیوب"/);
  assert.match(content, /name: "لینکدین"/);
  assert.match(content, /name: "اینستاگرام"/);
  assert.match(content, /name: "گیت‌هاب"/);
});

test("the Persian navbar uses the shared glass header without the legacy menu", () => {
  const navbar = source("src/components/landing/Navbar.tsx");

  assert.match(navbar, /<SiteHeader/);
  assert.match(navbar, /className="ti-theme ti-theme--fa ti-header--standalone"/);
  assert.doesNotMatch(navbar, /useState|bg-card\/95|<Button/);
});

test("the English institutional tokens can be applied without the English page reset", () => {
  const palette = source("src/english/styles/tokens/palette.css");
  const scale = source("src/english/styles/tokens/scale.css");
  const semantic = source("src/english/styles/tokens/semantic.css");
  const reset = source("src/english/styles/base/reset.css");

  assert.match(palette, /:where\(\.ti, \.ti-theme\)/);
  assert.match(scale, /:where\(\.ti, \.ti-theme\)/);
  assert.match(semantic, /:where\(\.ti, \.ti-theme\)/);
  assert.match(reset, /\.ti-theme--fa/);
});
