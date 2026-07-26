import { describe, it, expect } from 'vitest'
import {
  vistaPublica,
  tarjetaProducto,
  etiquetaPrecio,
  infoStock,
  listaPublica,
} from './exercise-07'

/* eslint-disable @typescript-eslint/no-unused-expressions --
 * PRUEBAS DE TIPO. Las líneas sueltas tipo `vistaPublica(u).password` no calculan
 * nada en runtime y ESLint las ve como expresiones desperdiciadas; están ahí a
 * propósito, para darle al `@ts-expect-error` de la línea de encima un error que
 * cazar. Si se borran, el @ts-expect-error se queda sin trabajo → TS2578.
 * El disable va a nivel de ARCHIVO porque no cabe entre el @ts-expect-error y su
 * expresión: TS mira la línea siguiente exacta, y un comentario en medio lo rompe. */

describe('07-utility-types / exercise-07 — Pick<T, K>', () => {
  /* ── BLOQUE A — Pick en el retorno (fabricar una vista reducida) ── */

  it('1) vistaPublica devuelve SOLO id y nombre (sin email ni password)', () => {
    const u = { id: 1, nombre: 'Ana', email: 'a@a.com', password: '123' }
    expect(vistaPublica(u)).toEqual({ id: 1, nombre: 'Ana' })
    // @ts-expect-error — la vista pública NO tiene password: Pick lo dejó fuera
    vistaPublica(u).password
  })

  it('2) tarjetaProducto devuelve SOLO nombre y precio', () => {
    const p = { nombre: 'Té', precio: 1000, stock: 5, sku: 'TE-01' }
    expect(tarjetaProducto(p)).toEqual({ nombre: 'Té', precio: 1000 })
    // @ts-expect-error — la tarjeta NO tiene stock
    tarjetaProducto(p).stock
  })

  /* ── BLOQUE B — Pick en el parámetro (pedir solo lo que se usa) ── */

  it('3) etiquetaPrecio acepta solo { nombre, precio }', () => {
    expect(etiquetaPrecio({ nombre: 'Té', precio: 1000 })).toBe('Té: $1000')
    expect(etiquetaPrecio({ nombre: 'Café', precio: 1500 })).toBe('Café: $1500')
  })

  it('4) infoStock acepta solo { nombre, stock }', () => {
    expect(infoStock({ nombre: 'Té', stock: 5 })).toBe('Té: 5 en stock')
    expect(infoStock({ nombre: 'Café', stock: 0 })).toBe('Café: 0 en stock')
  })

  /* ── BLOQUE C — capstone: lista de vistas (Pick + map) ── */

  it('5) listaPublica transforma cada usuario en su vista pública', () => {
    const usuarios = [
      { id: 1, nombre: 'Ana', email: 'a@a.com', password: 'x' },
      { id: 2, nombre: 'Leo', email: 'l@l.com', password: 'y' },
    ]
    expect(listaPublica(usuarios)).toEqual([
      { id: 1, nombre: 'Ana' },
      { id: 2, nombre: 'Leo' },
    ])
    // @ts-expect-error — los elementos de la lista pública NO tienen email
    listaPublica(usuarios)[0]?.email
  })
})
