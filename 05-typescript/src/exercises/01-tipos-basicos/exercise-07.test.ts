import { describe, it, expect, expectTypeOf } from 'vitest'
import { formatearPrecio, saludarUsuario, longitudMensaje } from './exercise-07'

describe('exercise-07 — narrowing: estrechar un union antes de usarlo', () => {
  it('formatearPrecio formatea number con $ y 2 decimales', () => {
    expect(formatearPrecio(19.9)).toBe('$19.90')
    expect(formatearPrecio(5)).toBe('$5.00')
    expectTypeOf(formatearPrecio).returns.toEqualTypeOf<string>()
  })

  it('formatearPrecio recorta espacios cuando recibe string', () => {
    expect(formatearPrecio('  gratis  ')).toBe('gratis')
    expect(formatearPrecio('oferta')).toBe('oferta')
  })

  it('saludarUsuario devuelve invitado cuando no hay nombre', () => {
    expect(saludarUsuario(undefined)).toBe('Hola, invitado')
  })

  it('saludarUsuario saluda por nombre cuando lo hay', () => {
    expect(saludarUsuario('Nico')).toBe('Hola, Nico')
  })

  it('longitudMensaje cuenta solo texto cuando no hay extra', () => {
    expect(longitudMensaje('hola')).toBe(4)
  })

  it('longitudMensaje suma texto y extra cuando extra existe', () => {
    expect(longitudMensaje('hola', 'mundo')).toBe(9)
  })
})
