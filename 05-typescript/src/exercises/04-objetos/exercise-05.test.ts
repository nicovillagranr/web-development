import { describe, it, expect } from 'vitest'
import { clavesDe, valoresDe, sumaDeValores, paresClaveValor, describir } from './exercise-05'

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
