import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  esExito,
  valorODefecto,
  mensajeError,
  dividir,
  mapResultado,
} from './exercise-05'
import type { Resultado } from './exercise-05'

describe('exercise-05 — Resultado<T> con discriminante booleano', () => {
  // BLOQUE A
  it('A1) esExito refleja el campo ok', () => {
    expect(esExito({ ok: true, valor: 5 })).toBe(true)
    expect(esExito({ ok: false, error: 'x' })).toBe(false)
  })

  it('A2) valorODefecto devuelve el valor o el por defecto', () => {
    expect(valorODefecto({ ok: true, valor: 5 }, 0)).toBe(5)
    expect(valorODefecto({ ok: false, error: 'x' }, 0)).toBe(0)
    expect(valorODefecto({ ok: false, error: 'x' }, 'fallback')).toBe('fallback')
  })

  it('A3) mensajeError devuelve el error o null', () => {
    expect(mensajeError({ ok: false, error: 'boom' })).toBe('boom')
    expect(mensajeError({ ok: true, valor: 5 })).toBeNull()
    expectTypeOf(mensajeError<number>).returns.toEqualTypeOf<string | null>()
  })

  // BLOQUE B
  it('B1) dividir modela el fallo como dato', () => {
    expect(dividir(6, 2)).toEqual({ ok: true, valor: 3 })
    expect(dividir(1, 0)).toEqual({ ok: false, error: 'división por cero' })
    expectTypeOf(dividir).returns.toEqualTypeOf<Resultado<number>>()
  })

  it('B2) mapResultado transforma el éxito y deja pasar el error', () => {
    expect(mapResultado({ ok: true, valor: 4 }, (n) => n * 10)).toEqual({ ok: true, valor: 40 })
    expect(mapResultado({ ok: false, error: 'x' }, (n: number) => n * 10)).toEqual({
      ok: false,
      error: 'x',
    })
    // cambia el tipo del valor: number -> string
    expect(mapResultado({ ok: true, valor: 4 }, (n) => `#${n}`)).toEqual({ ok: true, valor: '#4' })
  })
})
