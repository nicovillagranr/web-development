import { describe, it, expect, expectTypeOf } from 'vitest'
import { add, length, EMPTY_USER, userName, userAge, isActive } from './exercise-01'

describe('exercise-01 — tipos básicos', () => {
  it('userName es string, userAge es number, isActive es boolean', () => {
    expectTypeOf(userName).toEqualTypeOf<string>()
    expectTypeOf(userAge).toEqualTypeOf<number>()
    expectTypeOf(isActive).toEqualTypeOf<boolean>()
  })

  it('add suma dos números y devuelve number', () => {
    expect(add(2, 3)).toBe(5)
    expectTypeOf(add).returns.toEqualTypeOf<number>()
  })

  it('length devuelve la longitud de un string como number', () => {
    expect(length('hola')).toBe(4)
    expectTypeOf(length).returns.toEqualTypeOf<number>()
  })

  it('EMPTY_USER tiene name:string y age:number (no literales)', () => {
    expect(EMPTY_USER).toEqual({ name: '', age: 0 })
    expectTypeOf(EMPTY_USER).toEqualTypeOf<{ name: string; age: number }>()
  })
})
