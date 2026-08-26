import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const projectFile = (path: string) => new URL(`../${path}`, import.meta.url);

const ENTRIES = ["index.html", "fa/index.html"];

const readPreloadScript = (path: string) => {
  const html = readFileSync(projectFile(path), "utf8");
  const match = html.match(/<script>\s*\/\/ Applies the stored theme[\s\S]*?<\/script>/);
  assert.ok(match, `${path} should inline the theme preload script`);
  return { html, script: match[0] };
};

test("both HTML entries apply the stored theme before first paint", () => {
  for (const path of ENTRIES) {
    const { html, script } = readPreloadScript(path);

    // It has to run before the app bundle, or it cannot beat the first paint.
    assert.ok(
      html.indexOf(script) < html.indexOf("<title>"),
      `${path} should run the preload script in <head> before the title`
    );
    // Same storage key next-themes uses, so the two never disagree.
    assert.match(script, /localStorage\.getItem\("theme"\)/);
    assert.match(script, /prefers-color-scheme: dark/);
    assert.match(script, /classList\.toggle\("dark"/);
    // Storage throws in some privacy modes; the page must still render.
    assert.match(script, /try \{/);
  }
});

test("the preload script is identical across HTML entries", () => {
  const [first, ...rest] = ENTRIES.map((path) => readPreloadScript(path).script);

  for (const script of rest) {
    assert.equal(script, first, "the inlined theme preload scripts have drifted apart");
  }
});

test("both HTML entries declare a dark theme-color", () => {
  for (const path of ENTRIES) {
    const html = readFileSync(projectFile(path), "utf8");

    assert.match(html, /<meta name="theme-color" content="#[0-9a-f]{6}" media="\(prefers-color-scheme: light\)"/);
    assert.match(html, /<meta name="theme-color" content="#[0-9a-f]{6}" media="\(prefers-color-scheme: dark\)"/);
  }
});
