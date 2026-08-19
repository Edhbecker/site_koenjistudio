import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://koenji.example/", {
      headers: {
        accept: "text/html",
        "x-forwarded-host": "koenji.example",
        "x-forwarded-proto": "https",
      },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete Koenji landing page and SEO", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="pt-BR">/i);
  assert.match(html, /<title>Koenji Studio \| Barbearia<\/title>/i);
  assert.match(html, /Barbearia, estilo e cultura/i);
  assert.match(html, /Bento/);
  assert.match(html, /FOLLOW/);
  assert.match(html, /Agendar horário/i);
  assert.match(html, /booksy\.com\/pt-br\/dl\/show-business\/421566/i);
  assert.match(html, /instagram\.com\/koenjistudio/i);
  assert.match(html, /property="og:image" content="https:\/\/koenji\.example\/og\.png"/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
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
