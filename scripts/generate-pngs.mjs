/**
 * Converts HazloSimple OS PWA SVG icons to PNG.
 * Run once: node scripts/generate-pngs.mjs
 * Requires: @resvg/resvg-js (devDependency)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const __dir = dirname(fileURLToPath(import.meta.url));
const pub = join(__dir, "..", "public");

const ICONS = [
  { svg: "icon-192.svg",        png: "icon-192.png",        w: 192, h: 192 },
  { svg: "icon-512.svg",        png: "icon-512.png",        w: 512, h: 512 },
  { svg: "maskable-icon.svg",   png: "maskable-icon.png",   w: 512, h: 512 },
  { svg: "apple-touch-icon.svg",png: "apple-touch-icon.png",w: 180, h: 180 },
];

for (const { svg, png, w, h } of ICONS) {
  const svgData = readFileSync(join(pub, svg), "utf8");
  const resvg = new Resvg(svgData, {
    fitTo: { mode: "width", value: w },
    font: { loadSystemFonts: false },
  });
  const pngData = resvg.render().asPng();
  writeFileSync(join(pub, png), pngData);
  console.log(`✓ ${png} (${w}×${h})`);
}

console.log("Done. PNG icons written to public/");
