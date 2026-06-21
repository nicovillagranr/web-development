import { describe, it, expect } from 'vitest'
import {
  mapConIndice,
  transformarA,
  aplicarSegun,
  primerQueCumple,
  mapYfiltra,
} from './exercise-06'

describe('02-funciones / exercise-06 — callbacks a fondo', () => {
  /* ── BLOQUE A — índice y cambio de tipo ── */

  it('1) mapConIndice usa item e índice', () => {
    expect(mapConIndice(['a', 'b', 'c'], (item, i) => `${i}:${item}`)).toEqual([
      '0:a',
      '1:b',
      '2:c',
    ])
  })

  it('2) transformarA convierte number[] en string[]', () => {
    expect(transformarA([1, 2], (n) => `#${n}`)).toEqual(['#1', '#2'])
  })

  /* ── BLOQUE B — elegir callback y find con undefined ── */

  it('3) aplicarSegun elige el callback según la condición', () => {
    expect(aplicarSegun(5, true, (n) => n + 1, (n) => n - 1)).toBe(6)
    expect(aplicarSegun(5, false, (n) => n + 1, (n) => n - 1)).toBe(4)
  })

  it('4) primerQueCumple devuelve el primero o undefined', () => {
    expect(primerQueCumple([1, 2, 3, 4], (n) => n > 2)).toBe(3)
    expect(primerQueCumple([1, 2], (n) => n > 5)).toBeUndefined()
  })

  /* ── BLOQUE C — capstone: map + filter con dos callbacks ── */

  it('5) mapYfiltra transforma y luego filtra', () => {
    expect(mapYfiltra([1, 2, 3], (n) => n * 10, (n) => n > 15)).toEqual([20, 30])
    expect(mapYfiltra([1, 2], (n) => n + 1, (n) => n > 100)).toEqual([])
  })
})
