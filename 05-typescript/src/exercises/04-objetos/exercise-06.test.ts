import { describe, it, expect } from 'vitest'
import {
  contar,
  cuantasVeces,
  tieneClave,
  clavesConValorMayorQue,
  masFrecuente,
} from './exercise-06'

describe('04-objetos / exercise-06 — Record (contar y leer)', () => {
  it('1) contar', () => {
    expect(contar(['a', 'b', 'a'])).toEqual({ a: 2, b: 1 })
    expect(contar([])).toEqual({})
  })
  it('2) cuantasVeces', () => {
    expect(cuantasVeces({ a: 2 }, 'a')).toBe(2)
    expect(cuantasVeces({}, 'x')).toBe(0)
  })
  it('3) tieneClave', () => {
    expect(tieneClave({ a: 1 }, 'a')).toBe(true)
    expect(tieneClave({ a: 1 }, 'b')).toBe(false)
  })
  it('4) clavesConValorMayorQue', () => {
    expect(clavesConValorMayorQue({ a: 1, b: 5, c: 3 }, 2)).toEqual(['b', 'c'])
  })
  it('5) masFrecuente', () => {
    expect(masFrecuente(['a', 'b', 'a', 'a'])).toBe('a')
    expect(masFrecuente([])).toBeUndefined()
  })
})
