import { describe, it, expect } from 'vitest'
import { saludar, potencia, etiqueta, rango, formatearPrecio } from './exercise-02'

describe('02-funciones / exercise-02 — opcionales y por defecto', () => {
  /* ── BLOQUE A — por defecto ── */

  it('1) saludar usa "Hola" por defecto', () => {
    expect(saludar('Ana')).toBe('Hola, Ana')
    expect(saludar('Ana', 'Hey')).toBe('Hey, Ana')
  })

  it('2) potencia eleva al cuadrado por defecto', () => {
    expect(potencia(3)).toBe(9)
    expect(potencia(2, 3)).toBe(8)
  })

  /* ── BLOQUE B — opcional + manejar undefined ── */

  it('3) etiqueta funciona con y sin sufijo', () => {
    expect(etiqueta('Hola')).toBe('Hola')
    expect(etiqueta('Hola', '!')).toBe('Hola!')
  })

  it('4) rango cambia según haya max o no', () => {
    expect(rango(10, 20)).toBe('10-20')
    expect(rango(10)).toBe('10+')
  })

  /* ── BLOQUE C — capstone: varios por defecto ── */

  it('5) formatearPrecio tiene moneda y decimales por defecto', () => {
    expect(formatearPrecio(5)).toBe('$5.00')
    expect(formatearPrecio(5, '€', 1)).toBe('€5.0')
    expect(formatearPrecio(1234.5, '$', 0)).toBe('$1235')
  })
})
