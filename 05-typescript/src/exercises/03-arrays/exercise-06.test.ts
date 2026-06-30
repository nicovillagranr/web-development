import { describe, it, expect } from 'vitest'
import {
  ordenarAscendente,
  ordenarDescendente,
  ordenarPorPrecio,
  ordenarPorNombre,
  topDosPorPuntos,
} from './exercise-06'

describe('03-arrays / exercise-06 — sort inmutable + comparador', () => {
  it('1) ordenarAscendente (y no muta el original)', () => {
    const orig = [10, 2, 1]
    expect(ordenarAscendente(orig)).toEqual([1, 2, 10])
    expect(orig).toEqual([10, 2, 1]) // intacto
  })

  it('2) ordenarDescendente', () => {
    expect(ordenarDescendente([1, 3, 2])).toEqual([3, 2, 1])
  })

  it('3) ordenarPorPrecio', () => {
    expect(
      ordenarPorPrecio([
        { nombre: 'a', precio: 9 },
        { nombre: 'b', precio: 3 },
      ]),
    ).toEqual([
      { nombre: 'b', precio: 3 },
      { nombre: 'a', precio: 9 },
    ])
  })

  it('4) ordenarPorNombre', () => {
    expect(
      ordenarPorNombre([
        { nombre: 'b', precio: 1 },
        { nombre: 'a', precio: 1 },
      ]),
    ).toEqual([
      { nombre: 'a', precio: 1 },
      { nombre: 'b', precio: 1 },
    ])
  })

  it('5) topDosPorPuntos', () => {
    expect(
      topDosPorPuntos([
        { nombre: 'a', puntos: 5 },
        { nombre: 'b', puntos: 10 },
        { nombre: 'c', puntos: 1 },
      ]),
    ).toEqual([
      { nombre: 'b', puntos: 10 },
      { nombre: 'a', puntos: 5 },
    ])
  })
})
