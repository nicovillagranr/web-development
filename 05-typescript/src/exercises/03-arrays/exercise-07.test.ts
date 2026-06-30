import { describe, it, expect } from 'vitest'
import {
  primerosTres,
  sinElPrimero,
  agregarAlFinal,
  agregarAlInicio,
  quitarEn,
} from './exercise-07'

describe('03-arrays / exercise-07 — slice + spread (inmutable)', () => {
  it('1) primerosTres', () => {
    expect(primerosTres([1, 2, 3, 4, 5])).toEqual([1, 2, 3])
  })

  it('2) sinElPrimero', () => {
    expect(sinElPrimero([1, 2, 3])).toEqual([2, 3])
  })

  it('3) agregarAlFinal (no muta el original)', () => {
    const orig = [1, 2]
    expect(agregarAlFinal(orig, 9)).toEqual([1, 2, 9])
    expect(orig).toEqual([1, 2]) // intacto
  })

  it('4) agregarAlInicio', () => {
    expect(agregarAlInicio([1, 2], 9)).toEqual([9, 1, 2])
  })

  it('5) quitarEn', () => {
    expect(quitarEn([10, 20, 30, 40], 1)).toEqual([10, 30, 40])
    expect(quitarEn([10, 20], 0)).toEqual([20])
  })
})
