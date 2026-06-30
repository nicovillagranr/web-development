import { describe, it, expect } from 'vitest'
import {
  componerYaplicar2,
  componerYaplicar3,
  componerCambiandoTipo,
  encadenar,
  encadenarTres,
  procesar,
  repetir2,
  encadenarYaplicar,
} from './exercise-08'

describe('02-funciones / exercise-08 — composición [reforzado]', () => {
  /* ── BLOQUE 0 — componer y aplicar YA (devuelve el número) ── */

  it('1) componerYaplicar2 aplica f y luego g a x', () => {
    expect(componerYaplicar2(3, (n) => n + 1, (n) => n * 2)).toBe(8)
    expect(componerYaplicar2(0, (n) => n + 1, (n) => n * 2)).toBe(2)
  })

  it('2) componerYaplicar3 aplica f, g, h en orden', () => {
    expect(componerYaplicar3(4, (n) => n + 1, (n) => n * 2, (n) => n - 3)).toBe(7)
  })

  it('3) componerCambiandoTipo conecta string → number → string', () => {
    expect(componerCambiandoTipo('hola', (s) => s.length, (n) => `len:${n}`)).toBe('len:4')
    expect(componerCambiandoTipo('', (s) => s.length, (n) => `len:${n}`)).toBe('len:0')
  })

  /* ── BLOQUE A — encadenar dos y tres (devuelve función) ── */

  it('4) encadenar aplica f y luego g', () => {
    const h = encadenar((n) => n + 1, (n) => n * 2)
    expect(h(3)).toBe(8)
    expect(h(0)).toBe(2)
  })

  it('5) encadenarTres aplica f, g, h en orden', () => {
    const t = encadenarTres((n) => n + 1, (n) => n * 2, (n) => n - 3)
    expect(t(3)).toBe(5) // 3 → 4 → 8 → 5
  })

  /* ── BLOQUE B — cambio de tipo y aplicar dos veces ── */

  it('6) procesar encadena string → number → string', () => {
    const p = procesar((s) => s.length, (n) => `len:${n}`)
    expect(p('hola')).toBe('len:4')
    expect(p('')).toBe('len:0')
  })

  it('7) repetir2 aplica f dos veces', () => {
    const d = repetir2((n) => n + 3)
    expect(d(1)).toBe(7)
  })

  /* ── BLOQUE C — capstone ── */

  it('8) encadenarYaplicar compone y aplica directo', () => {
    expect(encadenarYaplicar(3, (n) => n + 1, (n) => n * 2)).toBe(8)
  })
})
