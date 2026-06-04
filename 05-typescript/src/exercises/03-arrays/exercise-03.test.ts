import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  sumar,
  multiplicarTodos,
  contar,
  maximo,
  concatenar,
  longitudTotal,
  contarVerdaderos,
  todosPositivos,
  sumaDeCuadrados,
  contarParesImpares,
} from './exercise-03'

describe('exercise-03 — refuerzo .reduce', () => {
  // reduce que devuelve un número
  it('1) sumar combina en la suma (inicial 0)', () => {
    expect(sumar([1, 2, 3, 4])).toBe(10)
    expect(sumar([])).toBe(0)
    expectTypeOf(sumar).returns.toEqualTypeOf<number>()
  })

  it('2) multiplicarTodos usa inicial 1', () => {
    expect(multiplicarTodos([1, 2, 3, 4])).toBe(24)
    expect(multiplicarTodos([5])).toBe(5)
    expect(multiplicarTodos([])).toBe(1)
  })

  it('3) contar cuenta los elementos con reduce', () => {
    expect(contar([10, 20, 30])).toBe(3)
    expect(contar([])).toBe(0)
  })

  it('4) maximo devuelve el mayor', () => {
    expect(maximo([3, 9, 2, 7])).toBe(9)
    expect(maximo([-5, -1])).toBe(-1)
  })

  // reduce que cambia de tipo
  it('5) concatenar une los textos (inicial "")', () => {
    expect(concatenar(['a', 'b', 'c'])).toBe('abc')
    expect(concatenar([])).toBe('')
    expectTypeOf(concatenar).returns.toEqualTypeOf<string>()
  })

  it('6) longitudTotal suma las longitudes (string[] → number)', () => {
    expect(longitudTotal(['hola', 'ab'])).toBe(6)
    expect(longitudTotal([])).toBe(0)
    expectTypeOf(longitudTotal).returns.toEqualTypeOf<number>()
  })

  // reduce que devuelve un booleano
  it('7) contarVerdaderos cuenta los true', () => {
    expect(contarVerdaderos([true, false, true, true])).toBe(3)
    expect(contarVerdaderos([false, false])).toBe(0)
    expect(contarVerdaderos([])).toBe(0)
  })

  it('8) todosPositivos devuelve true solo si todos son > 0', () => {
    expect(todosPositivos([1, 2, 3])).toBe(true)
    expect(todosPositivos([1, -2, 3])).toBe(false)
    expect(todosPositivos([])).toBe(true)
    expectTypeOf(todosPositivos).returns.toEqualTypeOf<boolean>()
  })

  // transformar dentro del reduce / acumulador objeto
  it('9) sumaDeCuadrados eleva al cuadrado dentro del reduce', () => {
    expect(sumaDeCuadrados([1, 2, 3])).toBe(14)
    expect(sumaDeCuadrados([])).toBe(0)
  })

  it('10) contarParesImpares acumula en un objeto', () => {
    expect(contarParesImpares([1, 2, 3, 4])).toEqual({ pares: 2, impares: 2 })
    expect(contarParesImpares([2, 4, 6])).toEqual({ pares: 3, impares: 0 })
    expect(contarParesImpares([])).toEqual({ pares: 0, impares: 0 })
    expectTypeOf(contarParesImpares).returns.toEqualTypeOf<{ pares: number; impares: number }>()
  })
})
