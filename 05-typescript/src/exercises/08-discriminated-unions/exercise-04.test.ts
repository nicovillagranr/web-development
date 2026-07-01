import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  puedeReintentar,
  cantidadDatos,
  descripcion,
  desdeBanderas,
  reintentar,
} from './exercise-04'
import type { Peticion } from './exercise-04'

describe('exercise-04 — estados imposibles, imposibles', () => {
  // BLOQUE A
  it('A1) puedeReintentar true en idle/fallo', () => {
    expect(puedeReintentar({ fase: 'idle' })).toBe(true)
    expect(puedeReintentar({ fase: 'fallo', codigo: 500 })).toBe(true)
    expect(puedeReintentar({ fase: 'cargando' })).toBe(false)
    expect(puedeReintentar({ fase: 'ok', datos: [] })).toBe(false)
  })

  it('A2) cantidadDatos lee datos.length solo en "ok"', () => {
    expect(cantidadDatos({ fase: 'ok', datos: ['a', 'b'] })).toBe(2)
    expect(cantidadDatos({ fase: 'idle' })).toBe(0)
    expect(cantidadDatos({ fase: 'fallo', codigo: 1 })).toBe(0)
  })

  it('A3) descripcion cubre las cuatro fases', () => {
    expect(descripcion({ fase: 'idle' })).toBe('Sin empezar')
    expect(descripcion({ fase: 'cargando' })).toBe('Cargando…')
    expect(descripcion({ fase: 'ok', datos: ['a', 'b', 'c'] })).toBe('3 datos')
    expect(descripcion({ fase: 'fallo', codigo: 404 })).toBe('Error 404')
  })

  // BLOQUE B
  it('B1) desdeBanderas construye la fase correcta por prioridad', () => {
    expect(desdeBanderas(false, ['a'], null)).toEqual({ fase: 'ok', datos: ['a'] })
    expect(desdeBanderas(true, null, null)).toEqual({ fase: 'cargando' })
    expect(desdeBanderas(false, null, 404)).toEqual({ fase: 'fallo', codigo: 404 })
    expect(desdeBanderas(false, null, null)).toEqual({ fase: 'idle' })
    // el código gana aunque haya datos/cargando
    expect(desdeBanderas(true, ['a'], 500)).toEqual({ fase: 'fallo', codigo: 500 })
    expectTypeOf(desdeBanderas).returns.toEqualTypeOf<Peticion>()
  })

  it('B2) reintentar transiciona idle/fallo a cargando, el resto intacto', () => {
    expect(reintentar({ fase: 'idle' })).toEqual({ fase: 'cargando' })
    expect(reintentar({ fase: 'fallo', codigo: 500 })).toEqual({ fase: 'cargando' })
    expect(reintentar({ fase: 'ok', datos: ['a'] })).toEqual({ fase: 'ok', datos: ['a'] })
    expect(reintentar({ fase: 'cargando' })).toEqual({ fase: 'cargando' })
  })
})
