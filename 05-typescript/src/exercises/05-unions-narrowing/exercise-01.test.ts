import { describe, it, expect, expectTypeOf } from 'vitest'
import { start, move, ROLES } from './exercise-01'
import type { Direction, Role } from './exercise-01'

describe('exercise-05 — tipos literales y unions', () => {
  it('Direction es un union literal de los 4 puntos cardinales', () => {
    expectTypeOf<Direction>().toEqualTypeOf<'up' | 'down' | 'left' | 'right'>()
  })

  it('start es una Direction válida con valor "up"', () => {
    expect(start).toBe('up')
    expectTypeOf(start).toEqualTypeOf<Direction>()
  })

  it('move acepta solo Direction y devuelve un string descriptivo', () => {
    expect(move('up', 3)).toBe('moviendo 3 pasos up')
    expect(move('left', 1)).toBe('moviendo 1 pasos left')
    expectTypeOf(move).parameter(0).toEqualTypeOf<Direction>()
    expectTypeOf(move).returns.toEqualTypeOf<string>()
  })

  it('ROLES está congelado como tupla readonly de literales', () => {
    expect(ROLES).toEqual(['admin', 'editor', 'viewer'])
    expectTypeOf(ROLES).toEqualTypeOf<readonly ['admin', 'editor', 'viewer']>()
  })

  it('Role se deriva de ROLES y es "admin" | "editor" | "viewer"', () => {
    expectTypeOf<Role>().toEqualTypeOf<'admin' | 'editor' | 'viewer'>()
  })
})
