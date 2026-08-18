/**
 * Un generador pseudoaleatorio con semilla (mulberry32).
 *
 * `Math.random()` no sirve aquí: una demo de portfolio que enseña números distintos
 * en cada recarga parece rota, y unos tests que dependen del azar fallan solos un
 * martes cualquiera. Con semilla, los mismos datos salen siempre iguales.
 *
 * No es criptográfico ni pretende serlo — solo tiene que producir ruido con buena
 * pinta de forma reproducible.
 */
export function createRandom(seed: number): () => number {
  let state = seed >>> 0;

  return function next(): number {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Convierte un texto en una semilla numérica estable (hash FNV-1a de 32 bits). */
export function seedFrom(text: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** Un número en [min, max) a partir de una función aleatoria. */
export function between(random: () => number, min: number, max: number): number {
  return min + random() * (max - min);
}
