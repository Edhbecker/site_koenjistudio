import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  return readFile(new URL("../out/index.html", import.meta.url), "utf8");
}

test("static export contains the complete Koenji landing page and SEO", async () => {
  const html = await render();
  assert.match(html, /<html lang="pt-BR">/i);
  assert.match(html, /<title>Koenji Studio \| Barbearia<\/title>/i);
  assert.match(html, /Barbearia, estilo e cultura/i);
  assert.match(html, /Bento/);
  assert.match(html, /FOLLOW/);
  assert.match(html, /Agendar horário/i);
  assert.match(html, /booksy\.com\/pt-br\/dl\/show-business\/421566/i);
  assert.match(html, /instagram\.com\/koenjistudio/i);
  assert.match(html, /property="og:image" content="https:\/\/koenjistudio\.onrender\.com\/og\.png"/i);
  assert.doesNotMatch(html, /Biografia provisória/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("static export includes its entry point and essential assets", async () => {
  await Promise.all([
    access(new URL("../out/index.html", import.meta.url)),
    access(new URL("../out/_next/", import.meta.url)),
    access(new URL("../out/og.png", import.meta.url)),
    access(new URL("../out/images/bento.jpeg", import.meta.url)),
    access(new URL("../out/images/corte (1).jpeg", import.meta.url)),
    access(new URL("../out/images/espaco (1).jpeg", import.meta.url)),
    access(new URL("../out/images/espaco (2).jpeg", import.meta.url)),
    access(new URL("../out/images/espaco (3).jpeg", import.meta.url)),
    access(new URL("../out/images/espaco (4).jpeg", import.meta.url)),
  ]);
});

test("uses the official Next.js static export configuration", async () => {
  const [nextConfig, layout, packageJson] = await Promise.all([
    readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(nextConfig, /output:\s*["']export["']/);
  assert.match(nextConfig, /unoptimized:\s*true/);
  assert.match(packageJson, /"build":\s*"next build"/);
  assert.doesNotMatch(layout, /next\/headers|headers\(\)/);
});

test("keeps brand data centralized and removes starter dependencies", async () => {
  const [config, page, packageJson] = await Promise.all([
    readFile(new URL("../lib/site.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(config, /instagramUrl/);
  assert.match(config, /bookingUrl/);
  assert.match(config, /ownerName/);
  assert.doesNotMatch(page, /https:\/\/booksy\.com|https:\/\/www\.instagram\.com/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /href=["']#["']/);
});

test("connects all 11 supplied cut photos to the page", async () => {
  const [config, imageFiles] = await Promise.all([
    readFile(new URL("../lib/site.ts", import.meta.url), "utf8"),
    readdir(new URL("../public/images/", import.meta.url)),
  ]);

  const suppliedCuts = imageFiles.filter((file) => /^corte \(\d+\)\.jpeg$/i.test(file));
  const configuredCuts = new Set(
    [...config.matchAll(/\/images\/corte \((\d+)\)\.jpeg/g)].map((match) => match[1]),
  );

  assert.equal(suppliedCuts.length, 11);
  assert.deepEqual([...configuredCuts].sort((a, b) => Number(a) - Number(b)), ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]);
});

test("connects all four supplied studio photos to the space presentation", async () => {
  const [config, imageFiles] = await Promise.all([
    readFile(new URL("../lib/site.ts", import.meta.url), "utf8"),
    readdir(new URL("../public/images/", import.meta.url)),
  ]);

  const suppliedSpaces = imageFiles.filter((file) => /^espaco \(\d+\)\.jpeg$/i.test(file));
  const configuredSpaces = new Set(
    [...config.matchAll(/\/images\/espaco \((\d+)\)\.jpeg/g)].map((match) => match[1]),
  );

  assert.equal(suppliedSpaces.length, 4);
  assert.deepEqual([...configuredSpaces].sort((a, b) => Number(a) - Number(b)), ["1", "2", "3", "4"]);
});
