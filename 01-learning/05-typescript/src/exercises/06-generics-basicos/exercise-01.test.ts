import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  identidad,
  envolver,
  primerElemento,
  emparejar,
  repetir,
  mapear,
  primeroQueCumple,
} from './exercise-01'

describe('exercise-11 — genéricos básicos', () => {
  // BLOQUE A — identidad
  it('1) identidad conserva el valor y el tipo exacto', () => {
    expect(identidad(5)).toBe(5)
    expect(identidad('hola')).toBe('hola')
    expectTypeOf(identidad(5)).toEqualTypeOf<number>()
    expectTypeOf(identidad('hola')).toEqualTypeOf<string>()
    expectTypeOf(identidad(true)).toEqualTypeOf<boolean>()
  })

  // BLOQUE B — T dentro de arrays
  it('2) envolver mete el valor en un array conservando el tipo', () => {
    expect(envolver(5)).toEqual([5])
    expect(envolver('a')).toEqual(['a'])
    expectTypeOf(envolver(5)).toEqualTypeOf<number[]>()
    expectTypeOf(envolver('a')).toEqualTypeOf<string[]>()
  })

  it('3) primerElemento devuelve el primero o undefined', () => {
    expect(primerElemento([1, 2])).toBe(1)
    expect(primerElemento([])).toBeUndefined()
    expect(primerElemento(['x', 'y'])).toBe('x')
    expectTypeOf(primerElemento([1, 2])).toEqualTypeOf<number | undefined>()
    expectTypeOf(primerElemento(['x'])).toEqualTypeOf<string | undefined>()
  })

  // BLOQUE C — varios parámetros de tipo
  it('4) emparejar admite tipos distintos y los junta en una tupla', () => {
    expect(emparejar('edad', 30)).toEqual(['edad', 30])
    expectTypeOf(emparejar('edad', 30)).toEqualTypeOf<[string, number]>()
    expectTypeOf(emparejar(true, 'x')).toEqualTypeOf<[boolean, string]>()
  })

  it('5) repetir generaliza el valor pero n sigue siendo number', () => {
    expect(repetir('x', 3)).toEqual(['x', 'x', 'x'])
    expect(repetir(0, 2)).toEqual([0, 0])
    expectTypeOf(repetir('x', 3)).toEqualTypeOf<string[]>()
    expectTypeOf(repetir(0, 2)).toEqualTypeOf<number[]>()
  })

  // BLOQUE D — genéricos + callbacks
  it('6) mapear transforma T[] en U[] (entrada y salida pueden diferir)', () => {
    expect(mapear([1, 2, 3], (n) => n * 2)).toEqual([2, 4, 6])
    expect(mapear([1, 2, 3], (n) => `#${n}`)).toEqual(['#1', '#2', '#3'])
    expectTypeOf(mapear([1, 2, 3], (n) => n * 2)).toEqualTypeOf<number[]>()
    expectTypeOf(mapear([1, 2, 3], (n) => `#${n}`)).toEqualTypeOf<string[]>()
  })

  it('7) primeroQueCumple devuelve el primer match o undefined', () => {
    expect(primeroQueCumple([1, 2, 3, 4], (n) => n > 2)).toBe(3)
    expect(primeroQueCumple([1, 2], (n) => n > 9)).toBeUndefined()
    expect(primeroQueCumple(['a', 'bb', 'ccc'], (s) => s.length >= 2)).toBe('bb')
    expectTypeOf(primeroQueCumple([1], (n) => n > 0)).toEqualTypeOf<number | undefined>()
    expectTypeOf(primeroQueCumple(['a'], (s) => s.length > 0)).toEqualTypeOf<string | undefined>()
  })
})
