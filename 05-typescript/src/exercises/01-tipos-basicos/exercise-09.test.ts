import { describe, it, expect, expectTypeOf } from 'vitest'
import { restar, transformar, crearMultiplicador } from './exercise-09'

describe('exercise-09 — funciones como valores', () => {
  it('restar tiene tipo (number, number) => number y resta', () => {
    expect(restar(10, 3)).toBe(7)
    expectTypeOf(restar).toEqualTypeOf<(a: number, b: number) => number>()
  })

  it('transformar aplica la operacion (callback) al numero', () => {
    expect(transformar(5, (n) => n * 2)).toBe(10)
    expect(transformar(9, (n) => n - 1)).toBe(8)
    expectTypeOf(transformar).parameter(1).toEqualTypeOf<(n: number) => number>()
    expectTypeOf(transformar).returns.toEqualTypeOf<number>()
  })

  it('crearMultiplicador devuelve una función configurada', () => {
    const triple = crearMultiplicador(3)
    expect(triple(4)).toBe(12)
    expect(triple(10)).toBe(30)
    expectTypeOf(crearMultiplicador).returns.toEqualTypeOf<(n: number) => number>()
  })
})
