import { describe, it, expect } from 'vitest'
import { contiene, tieneRol, indiceDe, unir, disponiblesComoTexto } from './exercise-09'

describe('03-arrays / exercise-09 — includes, indexOf, join', () => {
  it('1) contiene', () => {
    expect(contiene([1, 2, 3], 2)).toBe(true)
    expect(contiene([1, 2], 9)).toBe(false)
  })

  it('2) tieneRol', () => {
    expect(tieneRol(['admin', 'user'], 'user')).toBe(true)
    expect(tieneRol(['user'], 'admin')).toBe(false)
  })

  it('3) indiceDe', () => {
    expect(indiceDe([10, 20, 30], 30)).toBe(2)
    expect(indiceDe([10], 99)).toBe(-1)
  })

  it('4) unir', () => {
    expect(unir(['a', 'b', 'c'], '-')).toBe('a-b-c')
  })

  it('5) disponiblesComoTexto', () => {
    expect(
      disponiblesComoTexto(
        [
          { nombre: 'a', stock: 0 },
          { nombre: 'b', stock: 2 },
          { nombre: 'c', stock: 5 },
        ],
        ', ',
      ),
    ).toBe('b, c')
  })
})
