import { describe, it, expect } from 'vitest'
import { aplicar, restar, contarSi, aplicarA, reducir } from './exercise-04'

describe('02-funciones / exercise-04 — alias de tipo función', () => {
  /* ── BLOQUE A — alias como parámetro y como constante ── */

  it('1) aplicar usa una Operacion de dos números', () => {
    expect(aplicar(2, 3, (a, b) => a + b)).toBe(5)
    expect(aplicar(10, 4, (a, b) => a - b)).toBe(6)
  })

  it('2) restar es una Operacion', () => {
    expect(restar(10, 3)).toBe(7)
    expect(restar(0, 5)).toBe(-5)
  })

  /* ── BLOQUE B — otros alias sobre listas ── */

  it('3) contarSi usa un Predicado', () => {
    expect(contarSi([1, 2, 3, 4], (n) => n % 2 === 0)).toBe(2)
    expect(contarSi([1, 3, 5], (n) => n > 10)).toBe(0)
  })

  it('4) aplicarA usa un Transformador', () => {
    expect(aplicarA(['a', 'b'], (s) => s.toUpperCase())).toEqual(['A', 'B'])
  })

  /* ── BLOQUE C — capstone: Operacion como combinador ── */

  it('5) reducir combina la lista con una Operacion', () => {
    expect(reducir([1, 2, 3], (a, b) => a + b, 0)).toBe(6)
    expect(reducir([2, 3, 4], (a, b) => a * b, 1)).toBe(24)
  })
})
