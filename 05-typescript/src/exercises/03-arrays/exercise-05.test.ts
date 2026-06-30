import { describe, it, expect } from 'vitest'
import {
  hayAlgunNegativo,
  algunoSinStock,
  todosPositivos,
  todosMayoresDeEdad,
  carritoValido,
} from './exercise-05'

describe('03-arrays / exercise-05 — some y every', () => {
  it('1) hayAlgunNegativo', () => {
    expect(hayAlgunNegativo([1, -2, 3])).toBe(true)
    expect(hayAlgunNegativo([1, 2, 3])).toBe(false)
  })

  it('2) algunoSinStock', () => {
    expect(algunoSinStock([{ nombre: 'a', stock: 0 }])).toBe(true)
    expect(algunoSinStock([{ nombre: 'a', stock: 5 }])).toBe(false)
  })

  it('3) todosPositivos', () => {
    expect(todosPositivos([1, 2, 3])).toBe(true)
    expect(todosPositivos([1, -2])).toBe(false)
  })

  it('4) todosMayoresDeEdad', () => {
    expect(
      todosMayoresDeEdad([
        { nombre: 'a', edad: 20 },
        { nombre: 'b', edad: 17 },
      ]),
    ).toBe(false)
    expect(todosMayoresDeEdad([{ nombre: 'a', edad: 18 }])).toBe(true)
  })

  it('5) carritoValido', () => {
    expect(carritoValido([{ nombre: 'a', cantidad: 2 }])).toBe(true)
    expect(carritoValido([{ nombre: 'a', cantidad: 0 }])).toBe(false)
    expect(carritoValido([])).toBe(false)
  })
})
