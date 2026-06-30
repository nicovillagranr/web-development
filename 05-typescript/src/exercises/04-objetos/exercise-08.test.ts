import { describe, it, expect } from 'vitest'
import {
  agruparPorCategoria,
  agruparPorParidad,
  cuentaPorCategoria,
  categoriasUnicas,
  categoriaConMasProductos,
} from './exercise-08'

describe('04-objetos / exercise-08 — agrupar (groupBy)', () => {
  it('1) agruparPorCategoria', () => {
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
  })
  it('2) agruparPorParidad', () => {
    expect(agruparPorParidad([1, 2, 3, 4])).toEqual({ impar: [1, 3], par: [2, 4] })
  })
  it('3) cuentaPorCategoria', () => {
    expect(
      cuentaPorCategoria([
        { nombre: 'a', categoria: 'x' },
        { nombre: 'b', categoria: 'x' },
        { nombre: 'c', categoria: 'y' },
      ]),
    ).toEqual({ x: 2, y: 1 })
  })
  it('4) categoriasUnicas', () => {
    expect(
      categoriasUnicas([
        { nombre: 'a', categoria: 'x' },
        { nombre: 'b', categoria: 'x' },
        { nombre: 'c', categoria: 'y' },
      ]),
    ).toEqual(['x', 'y'])
  })
  it('5) categoriaConMasProductos', () => {
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
