import { describe, it, expect } from 'vitest'
import {
  duplicarValores,
  incrementar,
  soloPositivos,
  valoresATexto,
  aplicarDescuento,
  pares,
  cuantosPares,
  primerPar,
  claveDe,
  valorDe,
  describirPar,
  describirParBis,
  soloClaves,
  soloValores,
  descripciones,
  montar,
  clonarViaEntries,
  duplicarPasoAPaso,
  duplicarEnCadena,
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

describe('04-objetos / exercise-07 — BLOQUE E: desarmar entries → map → fromEntries', () => {
  /* E-A — mirar los pares */
  it('E1) pares', () => {
    expect(pares({ a: 2, b: 3 })).toEqual([
      ['a', 2],
      ['b', 3],
    ])
    expect(pares({})).toEqual([])
  })
  it('E2) cuantosPares', () => {
    expect(cuantosPares({ a: 2, b: 3 })).toBe(2)
    expect(cuantosPares({})).toBe(0)
  })
  it('E3) primerPar', () => {
    expect(primerPar({ a: 2, b: 3 })).toEqual(['a', 2])
    expect(primerPar({})).toBeUndefined()
  })

  /* E-B — abrir un par */
  it('E4) claveDe', () => {
    expect(claveDe(['a', 2])).toBe('a')
  })
  it('E5) valorDe', () => {
    expect(valorDe(['a', 2])).toBe(2)
  })
  it('E6) describirPar', () => {
    expect(describirPar(['a', 2])).toBe('a=2')
  })
  it('E7) describirParBis — mismo resultado que E6, pero desempaquetando', () => {
    expect(describirParBis(['a', 2])).toBe('a=2')
    // la prueba de que son la MISMA función con distinta puerta:
    expect(describirParBis(['x', 9])).toBe(describirPar(['x', 9]))
  })

  /* E-C — recorrer con map */
  it('E8) soloClaves', () => {
    expect(soloClaves({ a: 2, b: 3 })).toEqual(['a', 'b'])
    expect(soloClaves({})).toEqual([])
  })
  it('E9) soloValores', () => {
    expect(soloValores({ a: 2, b: 3 })).toEqual([2, 3])
  })
  it('E10) descripciones', () => {
    expect(descripciones({ a: 2, b: 3 })).toEqual(['a=2', 'b=3'])
  })

  /* E-D — montar */
  it('E11) montar', () => {
    expect(
      montar([
        ['a', 1],
        ['b', 2],
      ]),
    ).toEqual({ a: 1, b: 2 })
    expect(montar([])).toEqual({})
  })

  /* E-E — el viaje completo */
  it('E12) clonarViaEntries — entries y fromEntries son inversas', () => {
    expect(clonarViaEntries({ a: 2, b: 3 })).toEqual({ a: 2, b: 3 })
    // sale un objeto NUEVO, no el mismo:
    const original = { a: 2 }
    expect(clonarViaEntries(original)).not.toBe(original)
  })
  it('E13) duplicarPasoAPaso', () => {
    expect(duplicarPasoAPaso({ a: 2, b: 3 })).toEqual({ a: 4, b: 6 })
  })
  it('E14) duplicarEnCadena — el drill 1, reconstruido', () => {
    expect(duplicarEnCadena({ a: 2, b: 3 })).toEqual({ a: 4, b: 6 })
    expect(duplicarEnCadena({ a: 2, b: 3 })).toEqual(duplicarPasoAPaso({ a: 2, b: 3 }))
  })
})
