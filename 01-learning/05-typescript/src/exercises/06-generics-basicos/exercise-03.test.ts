import { describe, it, expect } from 'vitest'
import { primero, ultimo, envolver, repetir, tomar } from './exercise-03'

describe('06-generics / exercise-03 — utilidades de array', () => {
  it('1) primero', () => {
    expect(primero([1, 2, 3])).toBe(1)
    expect(primero([])).toBeUndefined()
  })
  it('2) ultimo', () => {
    expect(ultimo(['a', 'b'])).toBe('b')
    expect(ultimo([])).toBeUndefined()
  })
  it('3) envolver', () => {
    expect(envolver(5)).toEqual([5])
  })
  it('4) repetir', () => {
    expect(repetir('x', 3)).toEqual(['x', 'x', 'x'])
  })
  it('5) tomar', () => {
    expect(tomar([1, 2, 3, 4], 2)).toEqual([1, 2])
  })
})
