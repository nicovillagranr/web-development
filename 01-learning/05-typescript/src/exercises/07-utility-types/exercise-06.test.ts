import { describe, it, expect } from 'vitest'
import {
  copiar,
  combinar,
  combinarTres,
  tomarParcial,
  combinarParciales,
  aplicarUnParche,
  aplicarUnParcheCaja,
  aplicarDosParchesBis,
} from './exercise-06'

describe('07-utility-types / exercise-06 — entender el drill 1 de exercise-05', () => {
  /* ── BLOQUE A — el spread a solas (valores) ── */

  it('1) copiar devuelve una COPIA nueva (mismo contenido, otro objeto)', () => {
    const p = { x: 3, y: 4 }
    expect(copiar(p)).toEqual({ x: 3, y: 4 })
    // es un objeto DISTINTO, no el mismo: el spread fabrica uno nuevo
    expect(copiar(p)).not.toBe(p)
  })

  it('2) combinar pisa con b encima (gana el de la derecha)', () => {
    expect(combinar({ x: 0, y: 0 }, { x: 5, y: 9 })).toEqual({ x: 5, y: 9 })
    expect(combinar({ x: 1, y: 1 }, { x: 2, y: 2 })).toEqual({ x: 2, y: 2 })
    // no muta el primero
    const a = { x: 0, y: 0 }
    combinar(a, { x: 9, y: 9 })
    expect(a).toEqual({ x: 0, y: 0 })
  })

  it('3) combinarTres encadena: gana el último que toca cada propiedad', () => {
    expect(combinarTres({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 9, y: 9 })).toEqual({ x: 9, y: 9 })
    expect(combinarTres({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 })).toEqual({ x: 2, y: 2 })
  })

  /* ── BLOQUE B — el Partial a solas (tipos) ── */

  it('4) tomarParcial acepta objetos INCOMPLETOS', () => {
    expect(tomarParcial({ x: 5 })).toEqual({ x: 5 })
    expect(tomarParcial({})).toEqual({})
    expect(tomarParcial({ x: 5, y: 9 })).toEqual({ x: 5, y: 9 })
    // @ts-expect-error — "z" no es propiedad de Punto: Partial afloja, no inventa llaves
    tomarParcial({ z: 1 })
  })

  it('5) combinarParciales junta dos parches (sin base: el resultado sigue parcial)', () => {
    expect(combinarParciales({ x: 5 }, { y: 9 })).toEqual({ x: 5, y: 9 })
    expect(combinarParciales({ x: 1 }, { x: 2 })).toEqual({ x: 2 })
    expect(combinarParciales({}, { y: 7 })).toEqual({ y: 7 })
  })

  /* ── BLOQUE C — base completa + un parche parcial ── */

  it('6) aplicarUnParche: la base tapa los huecos, el parche pisa lo que trae', () => {
    expect(aplicarUnParche({ x: 0, y: 0 }, { x: 5 })).toEqual({ x: 5, y: 0 })
    expect(aplicarUnParche({ x: 3, y: 4 }, {})).toEqual({ x: 3, y: 4 })
    // no muta la base
    const base = { x: 0, y: 0 }
    aplicarUnParche(base, { x: 9 })
    expect(base).toEqual({ x: 0, y: 0 })
    // @ts-expect-error — "z" no es propiedad de Punto
    aplicarUnParche({ x: 0, y: 0 }, { z: 1 })
  })

  it('7) aplicarUnParcheCaja: mismo patrón, otro tipo', () => {
    expect(
      aplicarUnParcheCaja({ ancho: 10, alto: 5, color: 'rojo' }, { color: 'azul' }),
    ).toEqual({ ancho: 10, alto: 5, color: 'azul' })
    expect(
      aplicarUnParcheCaja({ ancho: 2, alto: 2, color: 'rojo' }, {}),
    ).toEqual({ ancho: 2, alto: 2, color: 'rojo' })
  })

  /* ── BLOQUE D — la meta: base + dos parches = gemelo del drill 1 ── */

  it('8) aplicarDosParchesBis: base + p1 + p2 (gana el último)', () => {
    expect(aplicarDosParchesBis({ x: 0, y: 0 }, { x: 5 }, { y: 9 })).toEqual({ x: 5, y: 9 })
    expect(aplicarDosParchesBis({ x: 0, y: 0 }, { x: 1 }, { x: 2 })).toEqual({ x: 2, y: 0 })
    // @ts-expect-error — "z" no es propiedad de Punto
    aplicarDosParchesBis({ x: 0, y: 0 }, { z: 1 }, {})
  })
})
