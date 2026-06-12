import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  type Moneda,
  type Coordenada,
  type Contacto,
  conDescuento,
  leerNumero,
  esPositivo,
  sumarColumna,
  minimoPor,
} from './exercise-01'

describe('07-utility-types / exercise-01 — Record', () => {
  /* ── BLOQUE A — fabricar tipos ── */

  it('1) Moneda ≡ { clp: number }', () => {
    expectTypeOf<Moneda>().toEqualTypeOf<{ clp: number }>()
  })

  it('2) Coordenada ≡ { x: number; y: number }', () => {
    expectTypeOf<Coordenada>().toEqualTypeOf<{ x: number; y: number }>()
  })

  it('3) Contacto ≡ { email: string; telefono: string }', () => {
    expectTypeOf<Contacto>().toEqualTypeOf<{ email: string; telefono: string }>()
  })

  /* ── BLOQUE B — portero de clave fija ── */

  it('4) conDescuento aplica 20% y exige precio numérico', () => {
    expect(conDescuento({ precio: 100 })).toBe(80)
    expect(conDescuento({ precio: 1000, nombre: 'bici' })).toBe(800)
    // @ts-expect-error — sin `precio` no se entra
    conDescuento({ nombre: 'bici' })
  })

  /* ── BLOQUE C — clave variable (flecha invertida) ── */

  it('5) leerNumero lee la propiedad numérica pedida', () => {
    expect(leerNumero({ v: 7, n: 'a' }, 'v')).toBe(7)
    expect(leerNumero({ stock: 0 }, 'stock')).toBe(0)
    // @ts-expect-error — "n" guarda string, no number
    leerNumero({ v: 7, n: 'a' }, 'n')
  })

  it('6) esPositivo compara con > (por eso exige number)', () => {
    expect(esPositivo({ stock: 3 }, 'stock')).toBe(true)
    expect(esPositivo({ stock: 0 }, 'stock')).toBe(false)
    // @ts-expect-error — "nombre" guarda string: comparar "mayor" no tiene sentido
    esPositivo({ nombre: 'ana', stock: 1 }, 'nombre')
  })

  it('7) sumarColumna suma la columna numérica', () => {
    expect(sumarColumna([{ v: 1 }, { v: 2 }], 'v')).toBe(3)
    expect(sumarColumna([], 'v')).toBe(0)
    // @ts-expect-error — columna de strings: no se puede sumar
    sumarColumna([{ n: 'a' }, { n: 'b' }], 'n')
  })

  it('8) minimoPor devuelve el objeto con menor valor, o undefined', () => {
    expect(minimoPor([{ n: 'a', v: 3 }, { n: 'b', v: 1 }], 'v')).toEqual({ n: 'b', v: 1 })
    const vacio: { v: number }[] = []
    expect(minimoPor(vacio, 'v')).toBeUndefined()
    // @ts-expect-error — "n" guarda string: no hay "menor" entre no-números
    minimoPor([{ n: 'a', v: 3 }], 'n')
  })
})
