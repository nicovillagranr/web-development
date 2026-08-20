/**
 * Genera los iconos PNG de la PWA a partir de un SVG escrito aquí mismo.
 *
 * Se ejecuta a mano (`node scripts/generate-icons.mjs`) y no en cada build: los
 * iconos cambian una vez al año y rasterizarlos en cada `pnpm build` solo añadiría
 * una dependencia nativa pesada al camino crítico.
 *
 * Se generan tres tamaños porque cada uno tiene un trabajo distinto:
 *   192 y 512  — los que pide el manifest para instalar la app.
 *   maskable   — con margen de seguridad, para que Android pueda recortarlo en
 *                círculo, en cuadrado redondeado o en gota sin comerse el dibujo.
 */
import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const BRAND = "#4f46e5";

/** El pulso: una línea que baja, sube fuerte y se estabiliza. */
const pulse = (scale) => `
  <path d="M ${14 * scale} ${52 * scale}
           L ${28 * scale} ${52 * scale}
           L ${36 * scale} ${30 * scale}
           L ${48 * scale} ${72 * scale}
           L ${58 * scale} ${44 * scale}
           L ${66 * scale} ${52 * scale}
           L ${82 * scale} ${52 * scale}"
        fill="none" stroke="#ffffff" stroke-width="${7 * scale}"
        stroke-linecap="round" stroke-linejoin="round"/>`;

/** `padding` deja el margen que Android necesita para recortar los maskable. */
function icon(size, padding = 0) {
  const inner = 96;
  const scale = ((100 - padding * 2) / inner) * (size / 100);
  const offset = (size * padding) / 100;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" fill="${BRAND}"/>
    <g transform="translate(${offset} ${offset}) scale(${(size - offset * 2) / size})">
      <g transform="scale(${size / 100})">${pulse(1)}</g>
    </g>
  </svg>`;
}

await mkdir("public", { recursive: true });

const targets = [
  { file: "public/icon-192.png", size: 192, padding: 0 },
  { file: "public/icon-512.png", size: 512, padding: 0 },
  { file: "public/icon-maskable-512.png", size: 512, padding: 12 },
  { file: "public/apple-touch-icon.png", size: 180, padding: 0 },
];

for (const { file, size, padding } of targets) {
  await sharp(Buffer.from(icon(size, padding)))
    .png()
    .toFile(file);
  console.log(`✓ ${file} (${size}px)`);
}

await writeFile("public/favicon.svg", icon(100, 0), "utf8");
console.log("✓ public/favicon.svg");
