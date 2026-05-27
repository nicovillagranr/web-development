import { describe, it, expect, expectTypeOf } from 'vitest'
import { SIZES, firstOf, CONFIG } from './exercise-04'

describe('exercise-04 — readonly vs as const', () => {
  it('SIZES conserva los literales como tupla readonly', () => {
    expect(SIZES).toEqual(['S', 'M', 'L', 'XL'])
    expectTypeOf(SIZES).toEqualTypeOf<readonly ['S', 'M', 'L', 'XL']>()
  })

  it('firstOf acepta un array readonly de strings y devuelve string | undefined', () => {
    expect(firstOf(['a', 'b'])).toBe('a')
    expect(firstOf([])).toBeUndefined()
    expectTypeOf(firstOf).parameter(0).toEqualTypeOf<readonly string[]>()
    expectTypeOf(firstOf).returns.toEqualTypeOf<string | undefined>()
  })

  it('CONFIG tiene propiedades readonly con tipos literales', () => {
    expect(CONFIG).toEqual({ env: 'production', retries: 3 })
    expectTypeOf(CONFIG).toEqualTypeOf<{ readonly env: 'production'; readonly retries: 3 }>()
  })
})
