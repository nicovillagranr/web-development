import { describe, it, expect } from 'vitest'
import { aplanar, duplicarCada, palabras, todosLosTags, idsDeItems } from './exercise-08'

describe('03-arrays / exercise-08 — flat y flatMap', () => {
  it('1) aplanar', () => {
    expect(aplanar([[1, 2], [3], [4, 5]])).toEqual([1, 2, 3, 4, 5])
  })

  it('2) duplicarCada', () => {
    expect(duplicarCada([1, 2, 3])).toEqual([1, 1, 2, 2, 3, 3])
  })

  it('3) palabras', () => {
    expect(palabras(['hola mundo', 'que tal'])).toEqual(['hola', 'mundo', 'que', 'tal'])
  })

  it('4) todosLosTags', () => {
    expect(todosLosTags([{ tags: ['a', 'b'] }, { tags: ['c'] }])).toEqual(['a', 'b', 'c'])
  })

  it('5) idsDeItems', () => {
    expect(
      idsDeItems([{ items: [{ id: 1 }, { id: 2 }] }, { items: [{ id: 3 }] }]),
    ).toEqual([1, 2, 3])
  })
})
