/**
 * La tercera barrera: comprobar que en `dist/` no quedó ni un nombre real.
 *
 * Las otras dos barreras (el `.gitignore` y la guarda `import.meta.env.DEV` de
 * `src/mocks/roster.ts`) son mecanismos: funcionan hasta que alguien los toca sin
 * darse cuenta, y entonces siguen sin decir nada. Esto no es un mecanismo, es una
 * comprobación del resultado, y por eso corre DESPUÉS del build y rompe el build si
 * encuentra algo.
 *
 * Cómo sabe qué buscar sin contener datos reales: los lee de `roster.private.ts`,
 * que es el archivo ignorado por git. Si el archivo no está —lo normal en un clon, y
 * lo normal en CI— no hay nada que filtrar y el script pasa sin hacer nada. Ese caso
 * no es un agujero: sin archivo privado, el build sólo pudo usar los de relleno.
 *
 * Se ejecuta con `pnpm build`. Correrlo suelto: `node scripts/check-no-private-data.mjs`
 */
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const DIST = join(ROOT, "dist");
const PRIVATE_FILE = join(ROOT, "src", "mocks", "roster.private.ts");

/** Todos los archivos de `dist/`, recursivamente. */
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const found = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }),
  );
  return found.flat();
}

/**
 * Los nombres a buscar, sacados del archivo privado con una expresión regular.
 *
 * Se parsea con regex y no importando el módulo porque este script es Node puro y el
 * archivo es TypeScript: importarlo obligaría a meter un compilador en el camino del
 * build para leer una lista de cadenas.
 */
async function privateNames() {
  if (!existsSync(PRIVATE_FILE)) return [];
  const source = await readFile(PRIVATE_FILE, "utf8");
  return [...source.matchAll(/"([^"]+)"|'([^']+)'/g)]
    .map((match) => match[1] ?? match[2])
    .filter((value) => /\p{L}/u.test(value));
}

const names = await privateNames();

if (names.length === 0) {
  console.log("✓ sin datos privados que comprobar (no hay roster.private.ts)");
  process.exit(0);
}

if (!existsSync(DIST)) {
  console.error("✗ no existe dist/. Correr el build antes que esta comprobación.");
  process.exit(1);
}

const files = await walk(DIST);
const leaks = [];

for (const file of files) {
  const content = await readFile(file, "utf8").catch(() => null);
  // Los binarios (iconos, fuentes) no se leen como texto y no pueden contener un
  // nombre por accidente: si `readFile` devuelve algo raro, se salta.
  if (content === null) continue;

  for (const name of names) {
    if (content.includes(name)) leaks.push({ file: relative(ROOT, file), name });
  }
}

if (leaks.length > 0) {
  console.error(`\n✗ FUGA DE DATOS: ${leaks.length} coincidencia(s) en dist/\n`);
  for (const leak of leaks) console.error(`   ${leak.file} contiene "${leak.name}"`);
  console.error(
    "\nEl build incluyó nombres reales. Revisar la guarda import.meta.env.DEV de\n" +
      "src/mocks/roster.ts antes de desplegar. NO subir este dist/.\n",
  );
  process.exit(1);
}

console.log(`✓ dist/ limpio: ${names.length} nombres comprobados en ${files.length} archivos`);
