import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const projectFile = (path: string) => new URL(`../${path}`, import.meta.url);

test("the root HTML entry describes the English homepage", () => {
  const html = readFileSync(projectFile("index.html"), "utf8");

  assert.match(html, /<html lang="en" dir="ltr">/);
  assert.match(html, /<meta name="theme-color" content="#0b2942"/);
  assert.doesNotMatch(html, /Sahar Pakseresht|"founder"/);
  assert.match(html, /<link rel="canonical" href="https:\/\/techimmigrants\.com\/"/);
  assert.match(html, /hreflang="fa" href="https:\/\/techimmigrants\.com\/fa\/"/);
  assert.match(html, /https:\/\/www\.instagram\.com\/techimmigrant/);
  assert.doesNotMatch(html, /instagram\.com\/techimmigrants/);
});

test("the Persian HTML entry preserves Persian language metadata", () => {
  const entry = projectFile("fa/index.html");
  assert.equal(existsSync(entry), true, "fa/index.html should exist");

  if (!existsSync(entry)) return;
  const html = readFileSync(entry, "utf8");

  assert.match(html, /<html lang="fa" dir="rtl">/);
  assert.match(html, /<link rel="canonical" href="https:\/\/techimmigrants\.com\/fa\/"/);
  assert.match(html, /hreflang="en" href="https:\/\/techimmigrants\.com\/"/);
  assert.match(html, /https:\/\/www\.instagram\.com\/techimmigrant/);
  assert.doesNotMatch(html, /instagram\.com\/techimmigrants/);
});

test("Cloudflare no longer redirects the English root to Persian", () => {
  const redirects = readFileSync(projectFile("_redirects"), "utf8");

  assert.doesNotMatch(redirects, /^\/\s+\/fa\/\s+302$/m);
  assert.match(redirects, /^\/fa\/\*\s+\/fa\/index\.html\s+200$/m);
});
