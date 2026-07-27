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
  masPesado,
  masLigero,
  maximoPorD,
  minimoPorD,
  maxPor,
  minPor,
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

  /* ── BLOQUE D·1 — tipos fijos, cuerpo del campeón ── */

  it('D1) masPesado devuelve el paquete de mayor peso, o undefined', () => {
    expect(masPesado([{ codigo: 'a', peso: 2 }, { codigo: 'b', peso: 5 }])).toEqual({ codigo: 'b', peso: 5 })
    expect(masPesado([{ codigo: 'solo', peso: 9 }])).toEqual({ codigo: 'solo', peso: 9 })
    expect(masPesado([])).toBeUndefined()
  })

  it('D2) masLigero devuelve el paquete de menor peso, o undefined', () => {
    // el más ligero NO es el primero, para que un starter `return paquetes[0]` falle
    expect(masLigero([{ codigo: 'b', peso: 5 }, { codigo: 'a', peso: 2 }])).toEqual({ codigo: 'a', peso: 2 })
    expect(masLigero([])).toBeUndefined()
  })

  /* ── BLOQUE D·2 — cuerpo dado, apretar la firma genérica ── */

  it('D3) maximoPorD devuelve el objeto con mayor valor en la clave', () => {
    expect(maximoPorD([{ n: 'a', v: 3 }, { n: 'b', v: 1 }], 'v')).toEqual({ n: 'a', v: 3 })
    expect(maximoPorD([], 'v')).toBeUndefined()
    // @ts-expect-error — "n" guarda string: no hay "mayor" entre no-números
    maximoPorD([{ n: 'a', v: 3 }], 'n')
  })

  it('D4) minimoPorD devuelve el objeto con menor valor en la clave', () => {
    expect(minimoPorD([{ n: 'a', v: 3 }, { n: 'b', v: 1 }], 'v')).toEqual({ n: 'b', v: 1 })
    expect(minimoPorD([], 'v')).toBeUndefined()
    // @ts-expect-error — "n" guarda string: no hay "menor" entre no-números
    minimoPorD([{ n: 'a', v: 3 }], 'n')
  })

  /* ── BLOQUE D·3 — de cero: firma Y cuerpo (el drill 8 completo) ── */

  it('D5) maxPor: firma y cuerpo de cero (máximo)', () => {
    // el máximo NO es el primero, para que un starter `return arr[0]` falle
    expect(maxPor([{ n: 'b', v: 1 }, { n: 'a', v: 3 }], 'v')).toEqual({ n: 'a', v: 3 })
    expect(maxPor([], 'v')).toBeUndefined()
    // @ts-expect-error — "n" guarda string
    maxPor([{ n: 'a', v: 3 }], 'n')
  })

  it('D6) minPor: el drill 8 de memoria (mínimo)', () => {
    expect(minPor([{ n: 'a', v: 3 }, { n: 'b', v: 1 }], 'v')).toEqual({ n: 'b', v: 1 })
    expect(minPor([], 'v')).toBeUndefined()
    // @ts-expect-error — "n" guarda string
    minPor([{ n: 'a', v: 3 }], 'n')
  })
})
