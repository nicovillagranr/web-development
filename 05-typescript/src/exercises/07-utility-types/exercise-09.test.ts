import { describe, it, expect } from 'vitest'
import {
  congelarConfig,
  congelarPunto,
  moverDerecha,
  escalar,
  cambiarTema,
} from './exercise-09'

describe('07-utility-types / exercise-09 — Readonly<T>', () => {
  /* ── BLOQUE A — Readonly en el retorno (entregar algo sellado) ── */

  it('1) congelarConfig devuelve una COPIA sellada (no el mismo objeto)', () => {
    const c = { tema: 'claro', idioma: 'es', fuente: 14 }
    expect(congelarConfig(c)).toEqual(c)
    expect(congelarConfig(c)).not.toBe(c) // copia nueva, no el original
    // @ts-expect-error — el resultado es de solo lectura: no se puede reasignar
    congelarConfig(c).tema = 'oscuro'
  })

  it('2) congelarPunto devuelve una COPIA sellada', () => {
    const p = { x: 3, y: 4 }
    expect(congelarPunto(p)).toEqual(p)
    expect(congelarPunto(p)).not.toBe(p)
    // @ts-expect-error — solo lectura
    congelarPunto(p).x = 9
  })

  /* ── BLOQUE B — Readonly en el parámetro (obliga a trabajar inmutable) ── */

  it('3) moverDerecha NO muta el original y devuelve uno nuevo', () => {
    expect(moverDerecha({ x: 0, y: 0 })).toEqual({ x: 1, y: 0 })
    const orig = { x: 5, y: 5 }
    moverDerecha(orig)
    expect(orig).toEqual({ x: 5, y: 5 }) // intacto
  })

  it('4) escalar NO muta la caja original y devuelve una nueva', () => {
    expect(escalar({ ancho: 2, alto: 3 }, 10)).toEqual({ ancho: 20, alto: 30 })
    const orig = { ancho: 2, alto: 3 }
    escalar(orig, 10)
    expect(orig).toEqual({ ancho: 2, alto: 3 }) // intacto
  })

  /* ── BLOQUE C — capstone: actualización inmutable de un objeto sellado ── */

  it('5) cambiarTema devuelve una config nueva sellada y no toca la base', () => {
    const base = { tema: 'claro', idioma: 'es', fuente: 14 }
    expect(cambiarTema(base, 'oscuro')).toEqual({ tema: 'oscuro', idioma: 'es', fuente: 14 })
    expect(base.tema).toBe('claro') // la base no se muta
    // @ts-expect-error — el resultado es de solo lectura
    cambiarTema(base, 'oscuro').idioma = 'en'
  })
})
