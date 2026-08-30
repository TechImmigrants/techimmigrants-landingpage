import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const projectFile = (path: string) => new URL(`../${path}`, import.meta.url);

test("English text selection uses distinct themes on light and inverse surfaces", () => {
  const semantic = readFileSync(
    projectFile("src/english/styles/tokens/semantic.css"),
    "utf8",
  );
  const inverse = readFileSync(
    projectFile("src/english/styles/tokens/surfaces.css"),
    "utf8",
  );
  const reset = readFileSync(
    projectFile("src/english/styles/base/reset.css"),
    "utf8",
  );

  assert.match(semantic, /--selection-background:\s*var\(--blue-100\);/);
  assert.match(semantic, /--selection-text:\s*var\(--navy-800\);/);
  assert.match(inverse, /--selection-background:\s*var\(--amber-200\);/);
  assert.match(inverse, /--selection-text:\s*var\(--navy-900\);/);
  assert.match(reset, /background:\s*var\(--selection-background\);/);
  assert.match(reset, /color:\s*var\(--selection-text\);/);
  assert.match(reset, /:where\(\.ti, \.ti-theme\) ::-moz-selection/);
});
