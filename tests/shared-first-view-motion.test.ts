import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const projectFile = (path: string) => new URL(`../${path}`, import.meta.url);

function source(path: string) {
  return readFileSync(projectFile(path), "utf8");
}

test("the header and channel board share one liquid-glass surface", () => {
  const header = source("src/english/components/SiteHeader.tsx");
  const board = source("src/english/components/ChannelBoard.tsx");
  const styles = source("src/english/styles/index.css");
  const liquidGlass = source("src/english/styles/components/liquid-glass.css");

  assert.match(header, /ti-header ti-liquid-glass/);
  assert.match(board, /ti-board ti-liquid-glass/);
  assert.match(styles, /components\/liquid-glass\.css/);
  assert.match(liquidGlass, /\.ti-liquid-glass::before/);
  assert.match(liquidGlass, /animation:\s*ti-liquid-flow/);
});

test("liquid glass paints blur on its surface so nested overlays retain backdrop blur", () => {
  const liquidGlass = source("src/english/styles/components/liquid-glass.css");
  const baseSurface = liquidGlass.match(/\.ti-liquid-glass \{([\s\S]*?)\n\}/)?.[1] ?? "";

  assert.match(
    liquidGlass,
    /\.ti-liquid-glass::before \{[\s\S]*backdrop-filter:\s*blur\(var\(--ti-liquid-blur\)\)/,
  );
  assert.match(
    liquidGlass,
    /\.ti-liquid-glass::after \{[\s\S]*animation:\s*ti-liquid-flow/,
  );
  assert.doesNotMatch(baseSurface, /backdrop-filter/);
});

test("the header liquid glass remains transparent enough to reveal the page", () => {
  const header = source("src/english/styles/components/header.css");

  assert.match(header, /--ti-liquid-start:\s*rgb\(var\(--light-rgb\) \/ 0\.3\)/);
  assert.match(header, /--ti-liquid-end:\s*rgb\(var\(--light-rgb\) \/ 0\.1\)/);
  assert.match(header, /--ti-liquid-blur:\s*18px/);
  assert.doesNotMatch(header, /rgb\(var\(--light-rgb\) \/ 0\.52\)/);
});

test("button sheen follows the reading direction", () => {
  const button = source("src/english/styles/components/button.css");

  assert.match(button, /--ti-button-sweep-start:\s*-130%/);
  assert.match(button, /--ti-button-sweep-end:\s*130%/);
  assert.match(button, /translate:\s*var\(--ti-button-sweep-start\) 0/);
  assert.match(button, /\[dir="rtl"\] \.ti-button[\s\S]*--ti-button-sweep-start:\s*130%/);
  assert.match(button, /\[dir="rtl"\] \.ti-button[\s\S]*--ti-button-sweep-end:\s*-130%/);
});

test("hero glows use logical corners and animated direction-aware drift", () => {
  const hero = source("src/english/styles/sections/hero.css");
  const motion = source("src/english/styles/base/motion.css");

  assert.match(hero, /--ti-sky-origin-x:\s*4%/);
  assert.match(hero, /--ti-warm-origin-x:\s*96%/);
  assert.match(hero, /\[dir="rtl"\]\.ti-hero[\s\S]*--ti-sky-origin-x:\s*96%/);
  assert.match(hero, /\[dir="rtl"\]\.ti-hero[\s\S]*--ti-warm-origin-x:\s*4%/);
  assert.match(hero, /inset-inline-start:\s*-12%/);
  assert.match(hero, /inset-inline-end:\s*-14%/);
  assert.match(motion, /@keyframes ti-drift-a[\s\S]*opacity:\s*0\.78/);
  assert.match(motion, /translate3d\(var\(--ti-aura-a-shift-x\)/);
});

test("the blue hero aura uses a restrained opacity pulse", () => {
  const motion = source("src/english/styles/base/motion.css");
  const blueAura = motion.match(/@keyframes ti-drift-a \{([\s\S]*?)\n\}/)?.[1] ?? "";

  assert.match(blueAura, /opacity:\s*0\.48/);
  assert.match(blueAura, /opacity:\s*0\.78/);
  assert.doesNotMatch(blueAura, /opacity:\s*1/);
});

test("shared typography keeps enough specificity to preserve the English display title", () => {
  const typography = source("src/english/styles/base/typography.css");

  assert.match(typography, /:is\(\.ti, \.ti-theme\) :where\(h1\)/);
  assert.doesNotMatch(typography, /:where\(\.ti, \.ti-theme\) :where\(h1\)/);
});

test("platform brand colors are available to both page themes", () => {
  const brands = source("src/english/styles/tokens/brands.css");

  assert.match(brands, /:is\(\.ti, \.ti-theme\) \{/);
  assert.match(brands, /:is\(\.ti, \.ti-theme\) \[data-platform="telegram"\]/);
  assert.match(brands, /:is\(\.ti, \.ti-theme\) \[data-platform="instagram"\]/);
  assert.doesNotMatch(brands, /\.ti \[data-platform="telegram"\]/);
});

test("the mobile menu reuses liquid glass and aligns with the header edge", () => {
  const component = source("src/english/components/MobileNav.tsx");
  const header = source("src/english/styles/components/header.css");
  const headerControls = source("src/english/styles/components/header-controls.css");
  const mobileNav = source("src/english/styles/components/mobile-nav.css");

  assert.match(component, /className="ti-mobile-nav__panel ti-liquid-glass"/);
  assert.match(
    header,
    /\.ti-header \{[\s\S]*--ti-liquid-start:\s*rgb\(var\(--light-rgb\) \/ 0\.3\)/,
  );
  assert.doesNotMatch(header, /:is\(\.ti-header, \.ti-mobile-nav__panel\)/);
  assert.match(mobileNav, /top:\s*calc\(100% \+ 1\.6rem\)/);
  assert.match(mobileNav, /inset-inline-end:\s*-0\.625rem/);
  assert.match(mobileNav, /--ti-liquid-blur:\s*30px/);
  assert.match(mobileNav, /--ti-liquid-start:\s*rgb\(var\(--light-rgb\) \/ 0\.86\)/);
  assert.match(mobileNav, /--ti-liquid-end:\s*rgb\(var\(--light-rgb\) \/ 0\.7\)/);
  assert.match(headerControls, /padding-inline-start:\s*0\.75rem/);
  assert.match(headerControls, /padding-inline-end:\s*0\.55rem/);
  assert.doesNotMatch(mobileNav, /background:\s*var\(--surface-glass-strong\)/);
});

test("the Persian marquee moves with RTL reading and uses a numeric ninety", () => {
  const ticker = source("src/english/styles/sections/ticker.css");
  const content = source("src/components/landing/persianInstitutionalContent.ts");
  const motion = source("src/english/styles/base/motion.css");

  assert.match(ticker, /\.ti-ticker__track[\s\S]*animation:\s*ti-marquee-ltr/);
  assert.match(ticker, /\.ti-ticker__group[\s\S]*flex:\s*0 0 auto/);
  assert.match(
    ticker,
    /\.ti-ticker\.ti-theme--fa \.ti-ticker__track[\s\S]*animation-name:\s*ti-marquee-rtl/,
  );
  assert.match(motion, /@keyframes ti-marquee-ltr[\s\S]*translate3d\(-50%, 0, 0\)/);
  assert.match(motion, /@keyframes ti-marquee-rtl[\s\S]*translate3d\(0, 0, 0\)/);
  assert.match(content, /"۹۰ روز اول"/);
  assert.match(content, /"شبکه‌سازی حرفه‌ای"/);
  assert.doesNotMatch(content, /"نود روز اول"/);
  assert.doesNotMatch(content, /"پیدا کردن آدم‌های خودت"/);
});

test("the Persian language switch renders one English label", () => {
  const languageSwitch = source("src/english/components/LanguageSwitch.tsx");
  const siteHeader = source("src/english/components/SiteHeader.tsx");
  const navbar = source("src/components/landing/Navbar.tsx");

  assert.match(languageSwitch, /hint\?: string \| null/);
  assert.match(languageSwitch, /\{hint \? <small>\{hint\}<\/small> : null\}/);
  assert.match(siteHeader, /hint\?: string \| null/);
  assert.match(navbar, /hint:\s*null/);
  assert.doesNotMatch(navbar, /English site/);
});
