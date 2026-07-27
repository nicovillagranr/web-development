import { describe, it, expect } from 'vitest'
import {
  primerPar,
  buscarPorId,
  posicionDe,
  indiceDelPrimerMayor,
  nombreDelPrimeroConStock,
} from './exercise-04'

describe('03-arrays / exercise-04 — find y findIndex', () => {
  it('1) primerPar', () => {
    expect(primerPar([1, 3, 4, 6])).toBe(4)
    expect(primerPar([1, 3, 5])).toBeUndefined()
  })

  it('2) buscarPorId', () => {
    const items = [
      { id: 1, nombre: 'a' },
      { id: 2, nombre: 'b' },
    ]
    expect(buscarPorId(items, 2)).toEqual({ id: 2, nombre: 'b' })
    expect(buscarPorId(items, 9)).toBeUndefined()
  })

  it('3) posicionDe', () => {
    expect(posicionDe([10, 20, 30], 20)).toBe(1)
    expect(posicionDe([10], 99)).toBe(-1)
  })

  it('4) indiceDelPrimerMayor', () => {
    expect(indiceDelPrimerMayor([1, 5, 9], 4)).toBe(1)
    expect(indiceDelPrimerMayor([1, 2], 9)).toBe(-1)
  })

  it('5) nombreDelPrimeroConStock', () => {
    expect(
      nombreDelPrimeroConStock([
        { nombre: 'a', stock: 0 },
        { nombre: 'b', stock: 3 },
      ]),
    ).toBe('b')
    expect(nombreDelPrimeroConStock([{ nombre: 'a', stock: 0 }])).toBe('agotado')
  })
})
