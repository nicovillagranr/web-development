import { describe, it, expect } from 'vitest'
import { mapear, filtrar, encontrar, contarSi, mapearYfiltrar } from './exercise-04'

describe('06-generics / exercise-04 — genéricos con callbacks', () => {
  it('1) mapear', () => {
    expect(mapear([1, 2], (n) => n * 2)).toEqual([2, 4])
    expect(mapear(['a', 'bb'], (s) => s.length)).toEqual([1, 2])
  })
  it('2) filtrar', () => {
    expect(filtrar([1, 2, 3], (n) => n > 1)).toEqual([2, 3])
  })
  it('3) encontrar', () => {
    expect(encontrar([1, 2, 3], (n) => n > 1)).toBe(2)
    expect(encontrar([1], (n) => n > 5)).toBeUndefined()
  })
  it('4) contarSi', () => {
    expect(contarSi([1, 2, 3, 4], (n) => n % 2 === 0)).toBe(2)
  })
  it('5) mapearYfiltrar', () => {
    expect(mapearYfiltrar([1, 2, 3], (n) => n * 10, (n) => n > 15)).toEqual([20, 30])
  })
})
