import { describe, it, expect } from 'vitest'
import { totalPor, agruparPor, mayorPor, top3Por, mejorDeCadaGrupo } from './exercise-10'

describe('06-generics / exercise-10 — capstone toolkit genérico', () => {
  it('1) totalPor', () => {
    expect(totalPor([{ p: 10 }, { p: 5 }], (x) => x.p)).toBe(15)
  })
  it('2) agruparPor', () => {
    expect(agruparPor([{ c: 'a' }, { c: 'b' }, { c: 'a' }], (x) => x.c)).toEqual({
      a: [{ c: 'a' }, { c: 'a' }],
      b: [{ c: 'b' }],
    })
  })
  it('3) mayorPor', () => {
    expect(mayorPor([{ v: 1 }, { v: 5 }], (x) => x.v)).toEqual({ v: 5 })
  })
  it('4) top3Por', () => {
    expect(top3Por([{ v: 1 }, { v: 5 }, { v: 3 }, { v: 2 }], (x) => x.v)).toEqual([
      { v: 5 },
      { v: 3 },
      { v: 2 },
    ])
  })
  it('5) mejorDeCadaGrupo', () => {
    expect(
      mejorDeCadaGrupo(
        [
          { c: 'a', v: 1 },
          { c: 'a', v: 9 },
          { c: 'b', v: 4 },
        ],
        (x) => x.c,
        (x) => x.v,
      ),
    ).toEqual({ a: { c: 'a', v: 9 }, b: { c: 'b', v: 4 } })
  })
})
