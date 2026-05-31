import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  doblarTodos,
  aMayusculas,
  longitudes,
  soloPares,
  palabrasLargas,
  sumarTodos,
  concatenar,
  transformarCada,
  contarSi,
} from './exercise-10'

describe('exercise-10 — arrays + callbacks (map/filter/reduce)', () => {
  // BLOQUE A — map
  it('1) doblarTodos transforma cada número', () => {
    expect(doblarTodos([1, 2, 3])).toEqual([2, 4, 6])
    expect(doblarTodos([])).toEqual([])
    expectTypeOf(doblarTodos).returns.toEqualTypeOf<number[]>()
  })

  it('2) aMayusculas transforma cada texto', () => {
    expect(aMayusculas(['hola', 'ts'])).toEqual(['HOLA', 'TS'])
    expectTypeOf(aMayusculas).returns.toEqualTypeOf<string[]>()
  })

  it('3) longitudes cambia el tipo string[] → number[]', () => {
    expect(longitudes(['hola', 'ab'])).toEqual([4, 2])
    expectTypeOf(longitudes).returns.toEqualTypeOf<number[]>()
  })

  // BLOQUE B — filter
  it('4) soloPares se queda con los pares', () => {
    expect(soloPares([1, 2, 3, 4])).toEqual([2, 4])
    expect(soloPares([1, 3, 5])).toEqual([])
    expectTypeOf(soloPares).returns.toEqualTypeOf<number[]>()
  })

  it('5) palabrasLargas se queda con las de 5+ letras', () => {
    expect(palabrasLargas(['sol', 'pelota', 'ab', 'camino'])).toEqual(['pelota', 'camino'])
    expectTypeOf(palabrasLargas).returns.toEqualTypeOf<string[]>()
  })

  // BLOQUE C — reduce
  it('6) sumarTodos combina en la suma', () => {
    expect(sumarTodos([1, 2, 3, 4])).toBe(10)
    expect(sumarTodos([])).toBe(0)
    expectTypeOf(sumarTodos).returns.toEqualTypeOf<number>()
  })

  it('7) concatenar une los textos en orden', () => {
    expect(concatenar(['a', 'b', 'c'])).toBe('abc')
    expect(concatenar([])).toBe('')
    expectTypeOf(concatenar).returns.toEqualTypeOf<string>()
  })

  // BLOQUE D — higher-order
  it('8) transformarCada aplica el callback a cada número', () => {
    expect(transformarCada([1, 2, 3], (n) => n + 10)).toEqual([11, 12, 13])
    expect(transformarCada([1, 2, 3], (n) => n * 2)).toEqual([2, 4, 6])
    expectTypeOf(transformarCada).parameter(1).toEqualTypeOf<(n: number) => number>()
    expectTypeOf(transformarCada).returns.toEqualTypeOf<number[]>()
  })

  it('9) contarSi cuenta los que cumplen el predicado', () => {
    expect(contarSi([1, 2, 3, 4], (n) => n > 2)).toBe(2)
    expect(contarSi([1, 2, 3, 4], (n) => n % 2 === 0)).toBe(2)
    expectTypeOf(contarSi).parameter(1).toEqualTypeOf<(n: number) => boolean>()
    expectTypeOf(contarSi).returns.toEqualTypeOf<number>()
  })
})
