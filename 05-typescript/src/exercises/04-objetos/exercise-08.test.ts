import { describe, it, expect } from 'vitest'
import {
  copiarLista,
  agregar,
  leerListaOVacia,
  meterEn,
  agruparPorCategoria,
  paridad,
  agruparPorParidad,
  cuentaPorCategoria,
  sinRepetir,
  categoriasUnicas,
  categoriaConMasProductos,
} from './exercise-08'

describe('04-objetos / exercise-08 — agrupar (groupBy)', () => {
  /* --- BLOQUE 1 — listas inmutables --- */
  it('1) copiarLista — copia, NO la misma referencia', () => {
    const original = [1, 2]
    expect(copiarLista(original)).toEqual([1, 2])
    expect(copiarLista(original)).not.toBe(original)
  })
  it('2) agregar — inmutable', () => {
    const original = [1, 2]
    expect(agregar(original, 3)).toEqual([1, 2, 3])
    expect(agregar([], 5)).toEqual([5])
    expect(original).toEqual([1, 2]) // no mutó la vieja
  })
  it('3) leerListaOVacia', () => {
    expect(leerListaOVacia({ a: [1, 2] }, 'a')).toEqual([1, 2])
    expect(leerListaOVacia({}, 'x')).toEqual([])
  })

  /* --- BLOQUE 2 — una vuelta a mano --- */
  it('4) meterEn', () => {
    expect(meterEn({}, 'a', 1)).toEqual({ a: [1] })
    expect(meterEn({ a: [1] }, 'a', 2)).toEqual({ a: [1, 2] })
    expect(meterEn({ a: [1] }, 'b', 9)).toEqual({ a: [1], b: [9] })
  })

  /* --- BLOQUE 3 — clave desde un campo --- */
  it('5) agruparPorCategoria', () => {
    expect(
      agruparPorCategoria([
        { nombre: 'a', categoria: 'x' },
        { nombre: 'b', categoria: 'x' },
        { nombre: 'c', categoria: 'y' },
      ]),
    ).toEqual({
      x: [
        { nombre: 'a', categoria: 'x' },
        { nombre: 'b', categoria: 'x' },
      ],
      y: [{ nombre: 'c', categoria: 'y' }],
    })
    expect(agruparPorCategoria([])).toEqual({})
  })

  /* --- BLOQUE 4 — clave desde una condición --- */
  it('6) paridad', () => {
    expect(paridad(4)).toBe('par')
    expect(paridad(3)).toBe('impar')
    expect(paridad(0)).toBe('par')
  })
  it('7) agruparPorParidad', () => {
    expect(agruparPorParidad([1, 2, 3, 4])).toEqual({ impar: [1, 3], par: [2, 4] })
    expect(agruparPorParidad([])).toEqual({})
  })

  /* --- BLOQUE 5 — contar --- */
  it('8) cuentaPorCategoria', () => {
    expect(
      cuentaPorCategoria([
        { nombre: 'a', categoria: 'x' },
        { nombre: 'b', categoria: 'x' },
        { nombre: 'c', categoria: 'y' },
      ]),
    ).toEqual({ x: 2, y: 1 })
  })

  /* --- BLOQUE 6 — set y dedup --- */
  it('9) sinRepetir', () => {
    expect(sinRepetir(['x', 'x', 'y'])).toEqual(['x', 'y'])
    expect(sinRepetir([])).toEqual([])
  })
  it('10) categoriasUnicas', () => {
    expect(
      categoriasUnicas([
        { nombre: 'a', categoria: 'x' },
        { nombre: 'b', categoria: 'x' },
        { nombre: 'c', categoria: 'y' },
      ]),
    ).toEqual(['x', 'y'])
  })

  /* --- BLOQUE 7 — capstone --- */
  it('11) categoriaConMasProductos', () => {
    expect(
      categoriaConMasProductos([
        { nombre: 'a', categoria: 'x' },
        { nombre: 'b', categoria: 'x' },
        { nombre: 'c', categoria: 'y' },
      ]),
    ).toBe('x')
    expect(categoriaConMasProductos([])).toBeUndefined()
  })
})
