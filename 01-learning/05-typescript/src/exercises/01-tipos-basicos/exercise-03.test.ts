import { describe, it, expect, expectTypeOf } from 'vitest'
import { COLORS, POINT, THEME, swap, head } from './exercise-03'

describe('exercise-03 — tuplas, readonly y as const', () => {
  it('COLORS es una tupla readonly de literales "red" | "green" | "blue"', () => {
    expect(COLORS).toEqual(['red', 'green', 'blue'])
    expectTypeOf(COLORS).toEqualTypeOf<readonly ['red', 'green', 'blue']>()
  })

  it('POINT es una tupla [number, number]', () => {
    expect(POINT).toEqual([10, 20])
    expectTypeOf(POINT).toMatchTypeOf<readonly [number, number]>()
  })

  it('THEME tiene literales, no tipos ensanchados', () => {
    expect(THEME).toEqual({ mode: 'light', radius: 8 })
    expectTypeOf(THEME).toMatchTypeOf<{ readonly mode: 'light'; readonly radius: 8 }>()
  })

  it('swap invierte una tupla conservando los tipos por posición', () => {
    expect(swap(['hola', 42])).toEqual([42, 'hola'])
    expectTypeOf(swap<string, number>).returns.toEqualTypeOf<[number, string]>()
  })

  it('head devuelve number | undefined (por noUncheckedIndexedAccess)', () => {
    expect(head([1, 2, 3])).toBe(1)
    expect(head([])).toBeUndefined()
    expectTypeOf(head).returns.toEqualTypeOf<number | undefined>()
  })
})
