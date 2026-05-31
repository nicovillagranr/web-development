import { describe, it, expect, expectTypeOf } from 'vitest'
import { area, describir } from './exercise-08'
import type { Figura } from './exercise-08'

describe('exercise-08 — uniones discriminadas', () => {
  it('Figura es una unión discriminada por la propiedad "tipo"', () => {
    expectTypeOf<Figura>().toEqualTypeOf<
      | { tipo: 'circulo'; radio: number }
      | { tipo: 'cuadrado'; lado: number }
    >()
  })

  it('area calcula el área de un círculo', () => {
    expect(area({ tipo: 'circulo', radio: 2 })).toBeCloseTo(Math.PI * 4)
  })

  it('area calcula el área de un cuadrado', () => {
    expect(area({ tipo: 'cuadrado', lado: 3 })).toBe(9)
    expectTypeOf(area).returns.toEqualTypeOf<number>()
  })

  it('describir devuelve el texto del círculo', () => {
    expect(describir({ tipo: 'circulo', radio: 5 })).toBe('Círculo de radio 5')
  })

  it('describir devuelve el texto del cuadrado', () => {
    expect(describir({ tipo: 'cuadrado', lado: 4 })).toBe('Cuadrado de lado 4')
  })
})
