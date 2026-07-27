import { describe, it, expect } from 'vitest'
import { oVacio, longitudSegura, sinNulos, sumarDefinidos, nombresValidos } from './exercise-07'

describe('05-unions / exercise-07 — quitar null/undefined', () => {
  it('1) oVacio', () => {
    expect(oVacio('a')).toBe('a')
    expect(oVacio(null)).toBe('')
  })
  it('2) longitudSegura', () => {
    expect(longitudSegura('hola')).toBe(4)
    expect(longitudSegura(null)).toBe(0)
    expect(longitudSegura(undefined)).toBe(0)
  })
  it('3) sinNulos', () => {
    expect(sinNulos(['a', null, 'b'])).toEqual(['a', 'b'])
  })
  it('4) sumarDefinidos', () => {
    expect(sumarDefinidos([1, undefined, 2])).toBe(3)
  })
  it('5) nombresValidos', () => {
    expect(nombresValidos([{ nombre: 'a' }, { nombre: null }, { nombre: 'b' }])).toEqual([
      'a',
      'b',
    ])
  })
})
