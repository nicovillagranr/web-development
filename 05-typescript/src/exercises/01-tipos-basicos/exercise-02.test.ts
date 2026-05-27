import { describe, it, expect, expectTypeOf } from 'vitest'
import { scores, lastLogin, findScore, addScore, currentStatus } from './exercise-02'
import type { Status } from "./exercise-02"

describe('exercise-02 — arrays, null y uniones', () => {
  it('scores es number[] (no never[])', () => {
    expectTypeOf(scores).toEqualTypeOf<number[]>()
  })

  it('lastLogin es string | null e inicia en null', () => {
    expect(lastLogin).toBeNull()
    expectTypeOf(lastLogin).toEqualTypeOf<string | null>()
  })

  it('findScore es honesto con el índice fuera de rango', () => {
    expect(findScore([10, 20], 0)).toBe(10)
    expect(findScore([10, 20], 5)).toBeUndefined()
    expectTypeOf(findScore).returns.toEqualTypeOf<number | undefined>()
  })

  it('addScore no muta el original y devuelve number[]', () => {
    const original: number[] = [1, 2]
    const next = addScore(original, 3)
    expect(next).toEqual([1, 2, 3])
    expect(original).toEqual([1, 2])
    expectTypeOf(addScore).returns.toEqualTypeOf<number[]>()
  })

  it('Status acepta exactamente "idle" | "loading" | "error"', () => {
    expectTypeOf<Status>().toEqualTypeOf<'idle' | 'loading' | 'error'>()
    expect(['idle', 'loading', 'error']).toContain(currentStatus)
  })
})
