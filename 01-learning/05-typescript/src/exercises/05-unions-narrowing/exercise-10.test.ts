import { describe, it, expect } from 'vitest'
import { aTexto, esVacio, soloValidos, sumarNumericos, resumen } from './exercise-10'

describe('05-unions / exercise-10 — capstone valores de formulario', () => {
  it('1) aTexto', () => {
    expect(aTexto(null)).toBe('—')
    expect(aTexto(5)).toBe('$5')
    expect(aTexto('hi')).toBe('hi')
  })
  it('2) esVacio', () => {
    expect(esVacio(null)).toBe(true)
    expect(esVacio('')).toBe(true)
    expect(esVacio('a')).toBe(false)
    expect(esVacio(0)).toBe(false)
  })
  it('3) soloValidos', () => {
    expect(soloValidos(['a', null, 5])).toEqual(['a', 5])
  })
  it('4) sumarNumericos', () => {
    expect(sumarNumericos([1, 'a', 2, null])).toBe(3)
  })
  it('5) resumen', () => {
    expect(resumen(['a', null, 5, 'b'])).toBe('3 válidos, suma 5')
  })
})
