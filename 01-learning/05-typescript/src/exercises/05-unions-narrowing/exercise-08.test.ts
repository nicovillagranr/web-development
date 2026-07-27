import { describe, it, expect } from 'vitest'
import { esString, esNumero, soloStrings, soloNumeros, contarTipos } from './exercise-08'

describe('05-unions / exercise-08 — type guards propios', () => {
  it('1) esString', () => {
    expect(esString('a')).toBe(true)
    expect(esString(5)).toBe(false)
  })
  it('2) esNumero', () => {
    expect(esNumero(5)).toBe(true)
    expect(esNumero('a')).toBe(false)
  })
  it('3) soloStrings', () => {
    expect(soloStrings([1, 'a', 2, 'b'])).toEqual(['a', 'b'])
  })
  it('4) soloNumeros', () => {
    expect(soloNumeros([1, 'a', 2, 'b'])).toEqual([1, 2])
  })
  it('5) contarTipos', () => {
    expect(contarTipos([1, 'a', 2, 'b', 'c'])).toEqual({ strings: 3, numeros: 2 })
  })
})
