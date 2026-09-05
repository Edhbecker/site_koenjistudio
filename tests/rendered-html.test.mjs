import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  return readFile(new URL("../out/index.html", import.meta.url), "utf8");
}

function imageSources(html) {
  return [...html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/g)].map((match) => match[1]);
}

function section(html, attribute) {
  const match = html.match(new RegExp(`<section\\b[^>]*${attribute}[^>]*>([\\s\\S]*?)<\\/section>`));
  assert.ok(match, `Missing section: ${attribute}`);
  return match[1];
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
  ]);

  const sources = new Set(imageSources(await render()));
  assert.equal(sources.size, 15, "Ten haircut photos, four studio photos and Bento's portrait");
  for (const source of sources) {
    assert.ok(source.startsWith("/images/"), `Expected a local photo: ${source}`);
    const image = await readFile(new URL(`../out${source}`, import.meta.url));
    if (source.endsWith(".webp")) {
      assert.equal(image.toString("ascii", 0, 4), "RIFF");
      assert.equal(image.toString("ascii", 8, 12), "WEBP");
      assert.ok(image.length < 350 * 1024, `Photo exceeds the optimized asset budget: ${source}`);
    }
  }
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

test("connects all ten updated haircut photos without mixing in studio images", async () => {
  const [html, imageFiles] = await Promise.all([
    render(),
    readdir(new URL("../public/images/", import.meta.url)),
  ]);

  const expectedSources = imageFiles
    .filter((file) => /^corte_v[12] \(\d+\)\.(jpeg|PNG)$/.test(file))
    .map((file) => file.replace(/^corte_v(\d) \((\d+)\)\.(jpeg|PNG)$/, "/images/optimized/corte-v$1-$2.webp"));
  const cuts = imageSources(section(html, 'id="cuts"'));
  const instagram = imageSources(section(html, 'id="instagram"'));

  assert.equal(expectedSources.length, 10);
  assert.equal(cuts.length, 6, "Preserve the six-frame haircut composition");
  assert.equal(instagram.length, 4, "Preserve the four-frame Instagram composition");
  assert.deepEqual([...new Set([...cuts, ...instagram])].sort(), expectedSources.sort());
});

test("preserves the space gallery with complementary studio photos", async () => {
  const html = await render();
  const studio = section(html, 'aria-labelledby="space-title"');
  assert.deepEqual(imageSources(studio), [
    "/images/optimized/espaco-10.webp",
    "/images/optimized/espaco-6.webp",
    "/images/optimized/espaco-15.webp",
    "/images/optimized/espaco-16.webp",
  ]);
  assert.doesNotMatch(studio, /photo-placeholder/);
});

test("uses the requested afro portrait at the opening and preserves the editorial banner", async () => {
  const html = await render();
  const hero = section(html, 'id="top"');
  const editorial = section(html, 'aria-labelledby="identity-title"');
  const portrait = "/images/optimized/corte-v1-3.webp";

  assert.deepEqual(imageSources(hero), [portrait]);
  assert.doesNotMatch(hero, /loading="lazy"/);
  assert.deepEqual(imageSources(editorial), [portrait]);
  assert.match(editorial, /Koenji \/ Barbershop/);
  assert.match(editorial, /YOUR HAIR\.<br\s*\/>YOUR STYLE\.<br\s*\/><em>YOUR IDENTITY\.<\/em>/);
});
