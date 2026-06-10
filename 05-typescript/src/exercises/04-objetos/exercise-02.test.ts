import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  copiarUsuario,
  renombrar,
  cumplirAnios,
  desactivar,
  venderUno,
  aplicarIva,
  resumirCompra,
} from './exercise-02'

describe('exercise-02 — actualización inmutable con spread', () => {
  // Bloque A: copiar y pisar una propiedad
  it('1) copiarUsuario devuelve una copia NUEVA, no el mismo objeto', () => {
    const u = { nombre: 'Ana', edad: 30, activo: true }
    const copia = copiarUsuario(u)
    expect(copia).toEqual({ nombre: 'Ana', edad: 30, activo: true })
    expect(copia).not.toBe(u) // es otro objeto, no la misma referencia
    expectTypeOf(copiarUsuario).returns.toEqualTypeOf<{
      nombre: string
      edad: number
      activo: boolean
    }>()
  })

  it('2) renombrar cambia solo el nombre y no muta el original', () => {
    const u = { nombre: 'Ana', edad: 30, activo: true }
    expect(renombrar(u, 'Eva')).toEqual({ nombre: 'Eva', edad: 30, activo: true })
    expect(u.nombre).toBe('Ana') // el original sigue intacto
  })

  it('3) cumplirAnios suma 1 a la edad sin mutar', () => {
    const u = { nombre: 'Ana', edad: 30, activo: true }
    expect(cumplirAnios(u)).toEqual({ nombre: 'Ana', edad: 31, activo: true })
    expect(u.edad).toBe(30)
  })

  // Bloque B: otros tipos de cambio
  it('4) desactivar pone activo en false', () => {
    expect(desactivar({ nombre: 'Ana', edad: 30, activo: true })).toEqual({
      nombre: 'Ana',
      edad: 30,
      activo: false,
    })
  })

  it('5) venderUno resta 1 al stock', () => {
    const p = { nombre: 'Lápiz', precio: 500, stock: 3 }
    expect(venderUno(p)).toEqual({ nombre: 'Lápiz', precio: 500, stock: 2 })
    expect(p.stock).toBe(3)
  })

  it('6) aplicarIva multiplica el precio por (1 + iva)', () => {
    expect(aplicarIva({ nombre: 'Lápiz', precio: 1000, stock: 3 }, 0.19)).toEqual({
      nombre: 'Lápiz',
      precio: 1190,
      stock: 3,
    })
  })

  // Bloque C: capstone dentro de un reduce
  it('7) resumirCompra acumula total e items en un objeto', () => {
    expect(
      resumirCompra([
        { nombre: 'Lápiz', precio: 500, stock: 3 },
        { nombre: 'Goma', precio: 300, stock: 1 },
      ]),
    ).toEqual({ total: 800, items: 2 })
    expect(resumirCompra([])).toEqual({ total: 0, items: 0 })
    expectTypeOf(resumirCompra).returns.toEqualTypeOf<{ total: number; items: number }>()
  })
})
