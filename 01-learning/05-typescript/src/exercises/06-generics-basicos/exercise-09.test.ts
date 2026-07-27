import { describe, it, expect } from 'vitest'
import { ordenarPor, ordenarDesc, minimoPor, top, ordenarPorTexto } from './exercise-09'

describe('06-generics / exercise-09 — ordenar por criterio', () => {
  it('1) ordenarPor', () => {
    expect(ordenarPor([{ v: 3 }, { v: 1 }, { v: 2 }], (x) => x.v)).toEqual([
      { v: 1 },
      { v: 2 },
      { v: 3 },
    ])
  })
  it('2) ordenarDesc', () => {
    expect(ordenarDesc([{ v: 1 }, { v: 3 }, { v: 2 }], (x) => x.v)).toEqual([
      { v: 3 },
      { v: 2 },
      { v: 1 },
    ])
  })
  it('3) minimoPor', () => {
    expect(minimoPor([{ v: 3 }, { v: 1 }, { v: 2 }], (x) => x.v)).toEqual({ v: 1 })
    const vacio: { v: number }[] = []
    expect(minimoPor(vacio, (x) => x.v)).toBeUndefined()
  })
  it('4) top', () => {
    expect(top([{ v: 1 }, { v: 5 }, { v: 3 }], (x) => x.v, 2)).toEqual([{ v: 5 }, { v: 3 }])
  })
  it('5) ordenarPorTexto', () => {
    expect(ordenarPorTexto([{ n: 'b' }, { n: 'a' }], (x) => x.n)).toEqual([{ n: 'a' }, { n: 'b' }])
  })
})
