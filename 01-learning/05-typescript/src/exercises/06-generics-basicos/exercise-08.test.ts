import { describe, it, expect } from 'vitest'
import { oPorDefecto, primeroODef, mapearDef, noNulos, primerValido } from './exercise-08'

describe('06-generics / exercise-08 — opcionales y respaldos', () => {
  it('1) oPorDefecto', () => {
    expect(oPorDefecto(5, 0)).toBe(5)
    expect(oPorDefecto(undefined, 0)).toBe(0)
  })
  it('2) primeroODef', () => {
    expect(primeroODef([1, 2], 0)).toBe(1)
    expect(primeroODef([], 0)).toBe(0)
  })
  it('3) mapearDef', () => {
    expect(mapearDef<number, number>(5, (n) => n * 2, -1)).toBe(10)
    expect(mapearDef<number, number>(undefined, (n) => n * 2, -1)).toBe(-1)
  })
  it('4) noNulos', () => {
    expect(noNulos([1, null, 2])).toEqual([1, 2])
  })
  it('5) primerValido', () => {
    expect(primerValido([null, 'a', 'b'], 'def')).toBe('a')
    expect(primerValido([null], 'def')).toBe('def')
  })
})
