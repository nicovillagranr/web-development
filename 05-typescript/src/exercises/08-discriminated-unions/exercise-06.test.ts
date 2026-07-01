import { describe, it, expect, expectTypeOf } from 'vitest'
import { parseNumero, raiz, andThen, primerError, secuenciar } from './exercise-06'
import type { Resultado } from './exercise-06'

describe('exercise-06 — errores como datos: encadenar y secuenciar', () => {
  // BLOQUE A
  it('A1) parseNumero modela el fallo de parseo', () => {
    expect(parseNumero('42')).toEqual({ ok: true, valor: 42 })
    expect(parseNumero('abc')).toEqual({ ok: false, error: 'no es un número' })
  })

  it('A2) raiz rechaza negativos', () => {
    expect(raiz(9)).toEqual({ ok: true, valor: 3 })
    expect(raiz(-1)).toEqual({ ok: false, error: 'negativo' })
  })

  // BLOQUE B
  it('B1) andThen encadena solo si el anterior salió bien', () => {
    expect(andThen({ ok: true, valor: 9 }, raiz)).toEqual({ ok: true, valor: 3 })
    expect(andThen({ ok: false, error: 'x' }, raiz)).toEqual({ ok: false, error: 'x' })
    // si el primero es ok pero el segundo falla, gana el segundo
    expect(andThen({ ok: true, valor: -4 }, raiz)).toEqual({ ok: false, error: 'negativo' })
    // combinado con parseNumero
    expect(andThen(parseNumero('16'), raiz)).toEqual({ ok: true, valor: 4 })
  })

  it('B2) primerError encuentra el primer error o null', () => {
    expect(
      primerError([
        { ok: true, valor: 1 },
        { ok: false, error: 'a' },
        { ok: false, error: 'b' },
      ]),
    ).toBe('a')
    expect(primerError([{ ok: true, valor: 1 }, { ok: true, valor: 2 }])).toBeNull()
    expectTypeOf(primerError<number>).returns.toEqualTypeOf<string | null>()
  })

  it('B3) secuenciar junta todos los valores o corta al primer error', () => {
    expect(secuenciar([{ ok: true, valor: 1 }, { ok: true, valor: 2 }])).toEqual({
      ok: true,
      valor: [1, 2],
    })
    expect(
      secuenciar([{ ok: true, valor: 1 }, { ok: false, error: 'x' }, { ok: true, valor: 3 }]),
    ).toEqual({ ok: false, error: 'x' })
    expect(secuenciar<number>([])).toEqual({ ok: true, valor: [] })
    expectTypeOf(secuenciar<number>).returns.toEqualTypeOf<Resultado<number[]>>()
  })
})
