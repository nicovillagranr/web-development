import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  puedeReintentar,
  cantidadDatos,
  descripcion,
  desdeBanderas,
  reintentar,
  primeraActiva,
  desdeCodigo,
  desdeCargaODatos,
  ganaPrimero,
} from './exercise-04'
import type { Peticion } from './exercise-04'

describe('exercise-04 — estados imposibles, imposibles', () => {
  // BLOQUE A
  it('A1) puedeReintentar true en inactivo/fallo', () => {
    expect(puedeReintentar({ fase: 'inactivo' })).toBe(true)
    expect(puedeReintentar({ fase: 'fallo', codigo: 500 })).toBe(true)
    expect(puedeReintentar({ fase: 'cargando' })).toBe(false)
    expect(puedeReintentar({ fase: 'ok', datos: [] })).toBe(false)
  })

  it('A2) cantidadDatos lee datos.length solo en "ok"', () => {
    expect(cantidadDatos({ fase: 'ok', datos: ['a', 'b'] })).toBe(2)
    expect(cantidadDatos({ fase: 'inactivo' })).toBe(0)
    expect(cantidadDatos({ fase: 'fallo', codigo: 1 })).toBe(0)
  })

  it('A3) descripcion cubre las cuatro fases', () => {
    expect(descripcion({ fase: 'inactivo' })).toBe('Sin empezar')
    expect(descripcion({ fase: 'cargando' })).toBe('Cargando…')
    expect(descripcion({ fase: 'ok', datos: ['a', 'b', 'c'] })).toBe('3 datos')
    expect(descripcion({ fase: 'fallo', codigo: 404 })).toBe('Error 404')
  })

  // BLOQUE B
  it('B1) desdeBanderas construye la fase correcta por prioridad', () => {
    expect(desdeBanderas(false, ['a'], null)).toEqual({ fase: 'ok', datos: ['a'] })
    expect(desdeBanderas(true, null, null)).toEqual({ fase: 'cargando' })
    expect(desdeBanderas(false, null, 404)).toEqual({ fase: 'fallo', codigo: 404 })
    expect(desdeBanderas(false, null, null)).toEqual({ fase: 'inactivo' })
    // el código gana aunque haya datos/cargando
    expect(desdeBanderas(true, ['a'], 500)).toEqual({ fase: 'fallo', codigo: 500 })
    expectTypeOf(desdeBanderas).returns.toEqualTypeOf<Peticion>()
  })

  it('B2) reintentar transiciona inactivo/fallo a cargando, el resto intacto', () => {
    expect(reintentar({ fase: 'inactivo' })).toEqual({ fase: 'cargando' })
    expect(reintentar({ fase: 'fallo', codigo: 500 })).toEqual({ fase: 'cargando' })
    expect(reintentar({ fase: 'ok', datos: ['a'] })).toEqual({ fase: 'ok', datos: ['a'] })
    expect(reintentar({ fase: 'cargando' })).toEqual({ fase: 'cargando' })
  })

  // BLOQUE C — escalera de refuerzo del drill 4
  it('C1) primeraActiva devuelve la etiqueta del primer true, en orden', () => {
    expect(primeraActiva(true, false, false)).toBe('a')
    expect(primeraActiva(false, true, true)).toBe('b') // gana b aunque c sea true
    expect(primeraActiva(false, false, true)).toBe('c')
    expect(primeraActiva(false, false, false)).toBe('ninguna')
  })

  it('C2) desdeCodigo elige fallo o inactivo según haya código', () => {
    expect(desdeCodigo(404)).toEqual({ fase: 'fallo', codigo: 404 })
    expect(desdeCodigo(null)).toEqual({ fase: 'inactivo' })
  })

  it('C3) desdeCargaODatos aplica prioridad cargando > datos > inactivo', () => {
    expect(desdeCargaODatos(true, ['a'])).toEqual({ fase: 'cargando' })
    expect(desdeCargaODatos(false, ['a'])).toEqual({ fase: 'ok', datos: ['a'] })
    expect(desdeCargaODatos(false, null)).toEqual({ fase: 'inactivo' })
  })

  it('C4) ganaPrimero: el código manda aunque también esté cargando', () => {
    expect(ganaPrimero(true, 500)).toBe('fallo')
    expect(ganaPrimero(true, null)).toBe('cargando')
    expect(ganaPrimero(false, null)).toBe('cargando')
  })
})
