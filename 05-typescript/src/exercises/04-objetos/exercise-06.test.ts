import { describe, it, expect } from 'vitest'
import {
  contar,
  cuantasVeces,
  tieneClave,
  clavesConValorMayorQue,
  masFrecuente,
  copiar,
  conTotal,
  pisarA,
  unaClave,
  ponerClave,
  leerOCero,
  sumarUno,
  envolverTodos,
  contarBis,
  sumarPorClave,
  campeon,
} from './exercise-06'

describe('04-objetos / exercise-06 — Record (contar y leer)', () => {
  it('1) contar', () => {
    expect(contar(['a', 'b', 'a'])).toEqual({ a: 2, b: 1 })
    expect(contar([])).toEqual({})
  })
  it('2) cuantasVeces', () => {
    expect(cuantasVeces({ a: 2 }, 'a')).toBe(2)
    expect(cuantasVeces({}, 'x')).toBe(0)
  })
  it('3) tieneClave', () => {
    expect(tieneClave({ a: 1 }, 'a')).toBe(true)
    expect(tieneClave({ a: 1 }, 'b')).toBe(false)
  })
  it('4) clavesConValorMayorQue', () => {
    expect(clavesConValorMayorQue({ a: 1, b: 5, c: 3 }, 2)).toEqual(['b', 'c'])
  })
  it('5) masFrecuente', () => {
    expect(masFrecuente(['a', 'b', 'a', 'a'])).toBe('a')
    expect(masFrecuente([])).toBeUndefined()
  })
})

describe('04-objetos / exercise-06 — BLOQUE R: desarmar el reduce-a-objeto', () => {
  it('R1) copiar — devuelve una copia, NO el mismo objeto', () => {
    const original = { a: 1, b: 2 }
    expect(copiar(original)).toEqual({ a: 1, b: 2 })
    expect(copiar(original)).not.toBe(original) // copia nueva, no la misma referencia
  })
  it('R2) conTotal', () => {
    expect(conTotal({ a: 1 })).toEqual({ a: 1, total: 10 })
    expect(conTotal({})).toEqual({ total: 10 })
  })
  it('R3) pisarA — el de después gana', () => {
    expect(pisarA({ a: 1, b: 2 })).toEqual({ a: 99, b: 2 })
    expect(pisarA({ b: 2 })).toEqual({ b: 2, a: 99 })
  })
  it('R4) unaClave — llave calculada, no literal', () => {
    expect(unaClave('hola', 3)).toEqual({ hola: 3 })
    expect(unaClave('x', 0)).toEqual({ x: 0 })
  })
  it('R5) ponerClave', () => {
    expect(ponerClave({ a: 1 }, 'b', 2)).toEqual({ a: 1, b: 2 })
    expect(ponerClave({ a: 1 }, 'a', 9)).toEqual({ a: 9 })
  })
  it('R6) leerOCero', () => {
    expect(leerOCero({ a: 5 }, 'a')).toBe(5)
    expect(leerOCero({}, 'x')).toBe(0)
    expect(leerOCero({ a: 0 }, 'a')).toBe(0)
  })
  it('R7) sumarUno — una vuelta del reduce, a mano', () => {
    expect(sumarUno({ a: 1 }, 'a')).toEqual({ a: 2 })
    expect(sumarUno({ a: 1 }, 'b')).toEqual({ a: 1, b: 1 })
    expect(sumarUno({}, 'z')).toEqual({ z: 1 })
  })
  it('R8) envolverTodos — la trampa del parentesis', () => {
    expect(envolverTodos([1, 2])).toEqual([{ valor: 1 }, { valor: 2 }])
    expect(envolverTodos([])).toEqual([])
  })
  it('R9) contarBis', () => {
    expect(contarBis(['a', 'b', 'a'])).toEqual({ a: 2, b: 1 })
    expect(contarBis([])).toEqual({})
  })
  it('R10) sumarPorClave', () => {
    expect(
      sumarPorClave([
        ['a', 1],
        ['b', 2],
        ['a', 10],
      ]),
    ).toEqual({ a: 11, b: 2 })
    expect(sumarPorClave([])).toEqual({})
  })
  it('R11) campeon', () => {
    expect(campeon({ a: 1, b: 9, c: 5 })).toBe('b')
    expect(campeon({ solo: 3 })).toBe('solo')
    expect(campeon({})).toBeUndefined()
  })
})
