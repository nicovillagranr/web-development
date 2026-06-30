import { describe, it, expect } from 'vitest'
import {
  duplicarValores,
  incrementar,
  soloPositivos,
  valoresATexto,
  aplicarDescuento,
} from './exercise-07'

describe('04-objetos / exercise-07 — transformar valores (fromEntries)', () => {
  it('1) duplicarValores', () => {
    expect(duplicarValores({ a: 2, b: 3 })).toEqual({ a: 4, b: 6 })
  })
  it('2) incrementar', () => {
    expect(incrementar({ a: 1, b: 2 }, 10)).toEqual({ a: 11, b: 12 })
  })
  it('3) soloPositivos', () => {
    expect(soloPositivos({ a: 1, b: -2, c: 3 })).toEqual({ a: 1, c: 3 })
  })
  it('4) valoresATexto', () => {
    expect(valoresATexto({ a: 5, b: 9 })).toEqual({ a: '$5', b: '$9' })
  })
  it('5) aplicarDescuento', () => {
    expect(aplicarDescuento({ a: 100, b: 50 }, 10)).toEqual({ a: 90, b: 45 })
  })
})
