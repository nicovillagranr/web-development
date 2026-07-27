import { describe, it, expect } from 'vitest'
import { masLargo, idDe, idsDe, porId, maxPor } from './exercise-05'

describe('06-generics / exercise-05 — constraints (extends)', () => {
  it('1) masLargo', () => {
    expect(masLargo('abc', 'de')).toBe('abc')
    expect(masLargo([1], [1, 2, 3])).toEqual([1, 2, 3])
  })
  it('2) idDe', () => {
    expect(idDe({ id: 5, nombre: 'x' })).toBe(5)
  })
  it('3) idsDe', () => {
    expect(idsDe([{ id: 1 }, { id: 2 }])).toEqual([1, 2])
  })
  it('4) porId', () => {
    expect(porId([{ id: 1 }, { id: 2 }], 2)).toEqual({ id: 2 })
    expect(porId([{ id: 1 }], 9)).toBeUndefined()
  })
  it('5) maxPor', () => {
    expect(maxPor([{ v: 1 }, { v: 5 }, { v: 3 }], (x) => x.v)).toEqual({ v: 5 })
    const vacio: { v: number }[] = []
    expect(maxPor(vacio, (x) => x.v)).toBeUndefined()
  })
})
