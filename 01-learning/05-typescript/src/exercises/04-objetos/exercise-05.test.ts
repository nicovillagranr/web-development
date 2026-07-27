import { describe, it, expect } from 'vitest'
import {
  clavesDe,
  valoresDe,
  sumaDeValores,
  paresClaveValor,
  describir,
  laClave,
  elValor,
  formatearConIndices,
  formatearDesestructurando,
  describirConIndices,
  clavesConValorMinimo,
  describirOrdenado,
} from './exercise-05'

describe('04-objetos / exercise-05 — keys / values / entries', () => {
  it('1) clavesDe', () => {
    expect(clavesDe({ a: 1, b: 2 })).toEqual(['a', 'b'])
  })
  it('2) valoresDe', () => {
    expect(valoresDe({ a: 1, b: 2 })).toEqual([1, 2])
  })
  it('3) sumaDeValores', () => {
    expect(sumaDeValores({ a: 1, b: 2, c: 3 })).toBe(6)
  })
  it('4) paresClaveValor', () => {
    expect(paresClaveValor({ a: 1, b: 2 })).toEqual([
      ['a', 1],
      ['b', 2],
    ])
  })
  it('5) describir', () => {
    expect(describir({ a: 1, b: 2 })).toBe('a=1, b=2')
  })
})

describe('04-objetos / exercise-05 — BLOQUE R: desarmar ([clave, valor])', () => {
  it('R1) laClave', () => {
    expect(laClave(['a', 1])).toBe('a')
    expect(laClave(['zzz', 99])).toBe('zzz')
  })
  it('R2) elValor', () => {
    expect(elValor(['a', 1])).toBe(1)
    expect(elValor(['zzz', 99])).toBe(99)
  })
  it('R3) formatearConIndices', () => {
    expect(formatearConIndices(['a', 1])).toBe('a=1')
    expect(formatearConIndices(['total', 42])).toBe('total=42')
  })
  it('R4) formatearDesestructurando', () => {
    expect(formatearDesestructurando(['a', 1])).toBe('a=1')
    expect(formatearDesestructurando(['total', 42])).toBe('total=42')
  })
  it('R5) describirConIndices', () => {
    expect(describirConIndices({ a: 1, b: 2 })).toBe('a=1, b=2')
    expect(describirConIndices({ x: 7 })).toBe('x=7')
  })
  it('R6) clavesConValorMinimo', () => {
    expect(clavesConValorMinimo({ a: 1, b: 5, c: 9 }, 5)).toEqual(['b', 'c'])
    expect(clavesConValorMinimo({ a: 1, b: 2 }, 10)).toEqual([])
  })
  it('R7) describirOrdenado', () => {
    expect(describirOrdenado({ a: 1, b: 9, c: 5 })).toBe('b=9, c=5, a=1')
    expect(describirOrdenado({ solo: 3 })).toBe('solo=3')
  })
})
