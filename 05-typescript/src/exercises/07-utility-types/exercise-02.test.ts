import { describe, it, expect } from 'vitest'
import {
  sumar,
  producto,
  contarPares,
  concatenar,
  longitudTotal,
  todosPositivos,
  menorNumero,
  mayorNumero,
  masBarato,
  masCaro,
  conMenosVidas,
  menorPor,
  mayorPor,
} from './exercise-02'

describe('07-utility-types / exercise-02 — el reduce campeón (refuerzo drill 8)', () => {
  /* ── CALENTAMIENTO — fundamentos de reduce ── */

  it('1) sumar suma todos los números', () => {
    expect(sumar([1, 2, 3])).toBe(6)
    expect(sumar([10])).toBe(10)
    expect(sumar([])).toBe(0)
  })

  it('2) producto multiplica todos los números (neutro 1)', () => {
    expect(producto([2, 3, 4])).toBe(24)
    expect(producto([5])).toBe(5)
    expect(producto([])).toBe(1)
  })

  it('3) contarPares cuenta cuántos pares hay', () => {
    expect(contarPares([1, 2, 3, 4])).toBe(2)
    expect(contarPares([1, 3, 5])).toBe(0)
    expect(contarPares([])).toBe(0)
  })

  it('4) concatenar pega todas las palabras', () => {
    expect(concatenar(['a', 'b', 'c'])).toBe('abc')
    expect(concatenar([])).toBe('')
  })

  it('5) longitudTotal suma las longitudes (string[] → number)', () => {
    expect(longitudTotal(['ab', 'cde'])).toBe(5)
    expect(longitudTotal([])).toBe(0)
  })

  it('6) todosPositivos comprueba que todos sean > 0', () => {
    expect(todosPositivos([1, 2, 3])).toBe(true)
    expect(todosPositivos([1, -2, 3])).toBe(false)
    expect(todosPositivos([])).toBe(true)
  })

  /* ── BLOQUE A — campeón número ── */

  it('7) menorNumero devuelve el número más pequeño', () => {
    expect(menorNumero([3, 1, 2])).toBe(1)
    expect(menorNumero([5])).toBe(5)
    expect(menorNumero([-4, -1, -9])).toBe(-9)
  })

  it('8) mayorNumero devuelve el número más grande', () => {
    expect(mayorNumero([3, 1, 2])).toBe(3)
    expect(mayorNumero([5])).toBe(5)
    expect(mayorNumero([-4, -1, -9])).toBe(-1)
  })

  /* ── BLOQUE B — campeón objeto concreto ── */

  it('9) masBarato devuelve el producto de menor precio, o undefined', () => {
    expect(masBarato([{ nombre: 'a', precio: 30 }, { nombre: 'b', precio: 10 }])).toEqual({ nombre: 'b', precio: 10 })
    expect(masBarato([{ nombre: 'solo', precio: 7 }])).toEqual({ nombre: 'solo', precio: 7 })
    expect(masBarato([])).toBeUndefined()
  })

  it('10) masCaro devuelve el producto de mayor precio, o undefined', () => {
    expect(masCaro([{ nombre: 'b', precio: 10 }, { nombre: 'a', precio: 30 }])).toEqual({ nombre: 'a', precio: 30 })
    expect(masCaro([])).toBeUndefined()
  })

  it('11) conMenosVidas devuelve el jugador con menos vidas, o undefined', () => {
    expect(conMenosVidas([{ nombre: 'ana', vidas: 3 }, { nombre: 'leo', vidas: 1 }])).toEqual({ nombre: 'leo', vidas: 1 })
    expect(conMenosVidas([])).toBeUndefined()
  })

  /* ── BLOQUE C — clave variable (el dúo) ── */

  it('12) menorPor devuelve el objeto con menor valor en la columna', () => {
    expect(menorPor([{ n: 'a', v: 3 }, { n: 'b', v: 1 }], 'v')).toEqual({ n: 'b', v: 1 })
    const vacio: { v: number }[] = []
    expect(menorPor(vacio, 'v')).toBeUndefined()
    // @ts-expect-error — "n" guarda string: no hay "menor" entre no-números
    menorPor([{ n: 'a', v: 3 }], 'n')
  })

  it('13) mayorPor devuelve el objeto con mayor valor en la columna', () => {
    expect(mayorPor([{ n: 'a', v: 3 }, { n: 'b', v: 1 }], 'v')).toEqual({ n: 'a', v: 3 })
    // @ts-expect-error — "n" guarda string: no hay "mayor" entre no-números
    mayorPor([{ n: 'a', v: 3 }], 'n')
  })
})
