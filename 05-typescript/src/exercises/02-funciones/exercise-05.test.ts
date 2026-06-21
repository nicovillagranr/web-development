import { describe, it, expect } from 'vitest'
import {
  porCada,
  cadaTexto,
  registrar,
  repetirAccion,
  porCadaPositivo,
} from './exercise-05'

describe('02-funciones / exercise-05 — void', () => {
  /* ── BLOQUE A — callbacks que devuelven void ── */

  it('1) porCada ejecuta la acción con cada número', () => {
    const out: number[] = []
    porCada([1, 2, 3], (n) => {
      out.push(n)
    })
    expect(out).toEqual([1, 2, 3])
  })

  it('2) cadaTexto ejecuta la acción con cada string', () => {
    const out: string[] = []
    cadaTexto(['a', 'b'], (t) => {
      out.push(t)
    })
    expect(out).toEqual(['a', 'b'])
  })

  /* ── BLOQUE B — funciones void (efecto sobre la lista recibida) ── */

  it('3) registrar empuja al registro y no devuelve nada', () => {
    const r: string[] = []
    registrar(r, 'hola')
    registrar(r, 'mundo')
    expect(r).toEqual(['hola', 'mundo'])
  })

  it('4) repetirAccion ejecuta con los índices 0..veces-1', () => {
    const out: number[] = []
    repetirAccion(3, (i) => {
      out.push(i)
    })
    expect(out).toEqual([0, 1, 2])
  })

  /* ── BLOQUE C — capstone: efecto condicional ── */

  it('5) porCadaPositivo solo actúa sobre los > 0', () => {
    const out: number[] = []
    porCadaPositivo([1, -2, 3, 0], (n) => {
      out.push(n)
    })
    expect(out).toEqual([1, 3])
  })
})
