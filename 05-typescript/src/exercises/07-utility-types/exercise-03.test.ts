import { describe, it, expect } from 'vitest'
import {
  mayorBucle,
  menorBucle,
  masLargaBucle,
  mayorReduce,
  menorReduce,
  masLargaReduce,
} from './exercise-03'

describe('07-utility-types / exercise-03 — el campeón: del bucle al reduce', () => {
  /* ── BLOQUE A — con bucle for ── */

  it('1) mayorBucle devuelve el número más grande', () => {
    expect(mayorBucle([3, 1, 2])).toBe(3)
    expect(mayorBucle([5])).toBe(5)
    expect(mayorBucle([-4, -1, -9])).toBe(-1)
  })

  it('2) menorBucle devuelve el número más pequeño', () => {
    expect(menorBucle([3, 1, 2])).toBe(1)
    expect(menorBucle([5])).toBe(5)
    expect(menorBucle([-4, -1, -9])).toBe(-9)
  })

  it('3) masLargaBucle devuelve la palabra más larga', () => {
    expect(masLargaBucle(['sol', 'luna', 'mar'])).toBe('luna')
    expect(masLargaBucle(['a'])).toBe('a')
    expect(masLargaBucle([])).toBe('')
  })

  /* ── BLOQUE B — el mismo problema con reduce ── */

  it('4) mayorReduce devuelve el número más grande', () => {
    expect(mayorReduce([3, 1, 2])).toBe(3)
    expect(mayorReduce([5])).toBe(5)
    expect(mayorReduce([-4, -1, -9])).toBe(-1)
  })

  it('5) menorReduce devuelve el número más pequeño', () => {
    expect(menorReduce([3, 1, 2])).toBe(1)
    expect(menorReduce([5])).toBe(5)
    expect(menorReduce([-4, -1, -9])).toBe(-9)
  })

  it('6) masLargaReduce devuelve la palabra más larga', () => {
    expect(masLargaReduce(['sol', 'luna', 'mar'])).toBe('luna')
    expect(masLargaReduce(['a'])).toBe('a')
    expect(masLargaReduce([])).toBe('')
  })
})
