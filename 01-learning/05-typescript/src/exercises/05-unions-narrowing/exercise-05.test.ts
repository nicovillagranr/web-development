import { describe, it, expect } from 'vitest'
import { formatear, longitudOValor, duplicar, aTexto, sumarNumeros } from './exercise-05'

describe('05-unions / exercise-05 — typeof narrowing', () => {
  it('1) formatear', () => {
    expect(formatear(5)).toBe('$5')
    expect(formatear('hola')).toBe('hola')
  })
  it('2) longitudOValor', () => {
    expect(longitudOValor('hola')).toBe(4)
    expect(longitudOValor(7)).toBe(7)
  })
  it('3) duplicar', () => {
    expect(duplicar(5)).toBe(10)
    expect(duplicar('ab')).toBe('abab')
  })
  it('4) aTexto', () => {
    expect(aTexto([1, 'ab'])).toEqual(['#1', 'AB'])
  })
  it('5) sumarNumeros', () => {
    expect(sumarNumeros([1, 'x', 2, 'y', 3])).toBe(6)
  })
})
