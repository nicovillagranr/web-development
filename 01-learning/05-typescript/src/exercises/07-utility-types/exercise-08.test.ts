import { describe, it, expect } from 'vitest'
import {
  crearUsuario,
  crearProducto,
  sinPassword,
  productoVisible,
  registrarUsuarios,
} from './exercise-08'

/* eslint-disable @typescript-eslint/no-unused-expressions --
 * PRUEBAS DE TIPO. Las líneas sueltas tipo `sinPassword(u).password` no calculan
 * nada en runtime y ESLint las ve como expresiones desperdiciadas; están ahí a
 * propósito, para darle al `@ts-expect-error` de la línea de encima un error que
 * cazar. Si se borran, el @ts-expect-error se queda sin trabajo → TS2578.
 * El disable va a nivel de ARCHIVO porque no cabe entre el @ts-expect-error y su
 * expresión: TS mira la línea siguiente exacta, y un comentario en medio lo rompe. */

describe('07-utility-types / exercise-08 — Omit<T, K>', () => {
  /* ── BLOQUE A — Omit en el parámetro (datos de alta sin id) ── */

  it('1) crearUsuario recibe datos SIN id y añade el id aparte', () => {
    expect(crearUsuario({ nombre: 'Ana', email: 'a@a.com', password: '123' }, 1)).toEqual({
      id: 1,
      nombre: 'Ana',
      email: 'a@a.com',
      password: '123',
    })
    // @ts-expect-error — los datos de alta NO deben incluir id (lo pone la función)
    crearUsuario({ id: 9, nombre: 'Ana', email: 'a@a.com', password: '123' }, 1)
  })

  it('2) crearProducto recibe datos SIN sku y lo añade aparte', () => {
    expect(crearProducto({ nombre: 'Té', precio: 1000, stock: 5 }, 'TE-01')).toEqual({
      sku: 'TE-01',
      nombre: 'Té',
      precio: 1000,
      stock: 5,
    })
  })

  /* ── BLOQUE B — Omit en el retorno (objeto censurado) ── */

  it('3) sinPassword devuelve el usuario SIN password', () => {
    const u = { id: 1, nombre: 'Ana', email: 'a@a.com', password: '123' }
    expect(sinPassword(u)).toEqual({ id: 1, nombre: 'Ana', email: 'a@a.com' })
    // @ts-expect-error — el resultado ya no tiene password
    sinPassword(u).password
  })

  it('4) productoVisible devuelve el producto SIN sku', () => {
    const p = { sku: 'TE-01', nombre: 'Té', precio: 1000, stock: 5 }
    expect(productoVisible(p)).toEqual({ nombre: 'Té', precio: 1000, stock: 5 })
    // @ts-expect-error — el producto visible ya no tiene sku
    productoVisible(p).sku
  })

  /* ── BLOQUE C — capstone: registrar una lista de altas (Omit + map) ── */

  it('5) registrarUsuarios asigna id correlativo (posición + 1)', () => {
    expect(
      registrarUsuarios([
        { nombre: 'Ana', email: 'a@a.com', password: 'x' },
        { nombre: 'Leo', email: 'l@l.com', password: 'y' },
      ]),
    ).toEqual([
      { id: 1, nombre: 'Ana', email: 'a@a.com', password: 'x' },
      { id: 2, nombre: 'Leo', email: 'l@l.com', password: 'y' },
    ])
  })
})
