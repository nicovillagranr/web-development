import { describe, it, expect } from 'vitest'
import { unicos, incluye, sinElemento, agregarUnico, combinarUnicos } from './exercise-06'

describe('06-generics / exercise-06 — Set y duplicados', () => {
  it('1) unicos', () => {
    expect(unicos([1, 1, 2, 3, 3])).toEqual([1, 2, 3])
    expect(unicos(['a', 'a'])).toEqual(['a'])
  })
  it('2) incluye', () => {
    expect(incluye([1, 2, 3], 2)).toBe(true)
    expect(incluye([1], 9)).toBe(false)
  })
  it('3) sinElemento', () => {
    expect(sinElemento([1, 2, 1, 3], 1)).toEqual([2, 3])
  })
  it('4) agregarUnico', () => {
    expect(agregarUnico([1, 2], 3)).toEqual([1, 2, 3])
    expect(agregarUnico([1, 2], 2)).toEqual([1, 2])
  })
  it('5) combinarUnicos', () => {
    expect(combinarUnicos([1, 2], [2, 3])).toEqual([1, 2, 3])
  })
})
