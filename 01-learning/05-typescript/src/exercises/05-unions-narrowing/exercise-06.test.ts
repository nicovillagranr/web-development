import { describe, it, expect } from 'vitest'
import { aLista, cuantos, primero, normalizarTodos, unirTodo } from './exercise-06'

describe('05-unions / exercise-06 — Array.isArray narrowing', () => {
  it('1) aLista', () => {
    expect(aLista('a')).toEqual(['a'])
    expect(aLista(['a', 'b'])).toEqual(['a', 'b'])
  })
  it('2) cuantos', () => {
    expect(cuantos('a')).toBe(1)
    expect(cuantos(['a', 'b'])).toBe(2)
  })
  it('3) primero', () => {
    expect(primero('a')).toBe('a')
    expect(primero(['x', 'y'])).toBe('x')
    expect(primero([])).toBe('')
  })
  it('4) normalizarTodos', () => {
    expect(normalizarTodos(['a', ['b', 'c']])).toEqual(['a', 'b', 'c'])
  })
  it('5) unirTodo', () => {
    expect(unirTodo(['a', 'b'], '-')).toBe('a-b')
    expect(unirTodo('solo', '-')).toBe('solo')
  })
})
