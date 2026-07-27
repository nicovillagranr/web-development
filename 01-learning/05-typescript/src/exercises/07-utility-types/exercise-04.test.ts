import { describe, it, expect } from 'vitest'
import {
  actualizarUsuario,
  editarProducto,
  crearAjustesParciales,
  crearAjustesCompletos,
  aplicarCambios,
} from './exercise-04'

describe('07-utility-types / exercise-04 — Partial<T>', () => {
  /* ── BLOQUE A — Partial en el parámetro (merge con spread) ── */

  it('1) actualizarUsuario aplica solo los cambios, sin mutar el original', () => {
    const u = { id: 1, nombre: 'Ana', email: 'a@a.com' }

    expect(actualizarUsuario(u, { email: 'b@b.com' })).toEqual({
      id: 1,
      nombre: 'Ana',
      email: 'b@b.com',
    })
    // cambios vacíos → usuario igual
    expect(actualizarUsuario(u, {})).toEqual(u)
    // varios campos a la vez
    expect(actualizarUsuario(u, { nombre: 'Anita', email: 'x@y.com' })).toEqual({
      id: 1,
      nombre: 'Anita',
      email: 'x@y.com',
    })
    // inmutable: el original no se toca
    actualizarUsuario(u, { nombre: 'Z' })
    expect(u.nombre).toBe('Ana')
    // @ts-expect-error — "edad" no es una propiedad de Usuario: Partial afloja, no inventa llaves
    actualizarUsuario(u, { edad: 30 })
  })

  it('2) editarProducto aplica cambios parciales sobre el producto', () => {
    const p = { nombre: 'Té', precio: 1000, stock: 5 }

    expect(editarProducto(p, { precio: 800 })).toEqual({
      nombre: 'Té',
      precio: 800,
      stock: 5,
    })
    expect(editarProducto(p, { precio: 800, stock: 0 })).toEqual({
      nombre: 'Té',
      precio: 800,
      stock: 0,
    })
    // @ts-expect-error — "color" no existe en Producto
    editarProducto(p, { color: 'rojo' })
  })

  /* ── BLOQUE B — Partial + valores por defecto ── */

  it('3) crearAjustesParciales rellena con los defaults lo que no se especifica', () => {
    expect(crearAjustesParciales({ tema: 'oscuro' })).toEqual({
      tema: 'oscuro',
      idioma: 'es',
      notificaciones: true,
    })
    expect(crearAjustesParciales({})).toEqual({
      tema: 'claro',
      idioma: 'es',
      notificaciones: true,
    })
    expect(crearAjustesParciales({ idioma: 'en', notificaciones: false })).toEqual({
      tema: 'claro',
      idioma: 'en',
      notificaciones: false,
    })
  })

  it('3-bis) crearAjustesCompletos (versión SIN Partial) exige el objeto entero', () => {
    // pasando los 3 campos sí funciona en runtime
    expect(
      crearAjustesCompletos({ tema: 'oscuro', idioma: 'en', notificaciones: false }),
    ).toEqual({
      tema: 'oscuro',
      idioma: 'en',
      notificaciones: false,
    })
    // @ts-expect-error — sin Partial, omitir un campo NO compila (este es el dolor que Partial evita)
    crearAjustesCompletos({ tema: 'oscuro' })
  })

  /* ── BLOQUE C — capstone: lista de cambios (reduce + Partial) ── */

  it('4) aplicarCambios aplica una lista de parches en orden (gana el último)', () => {
    const u = { id: 1, nombre: 'Ana', email: 'a@a.com' }

    expect(aplicarCambios(u, [{ nombre: 'Ani' }, { email: 'x@x.com' }])).toEqual({
      id: 1,
      nombre: 'Ani',
      email: 'x@x.com',
    })
    // si dos parches tocan la misma llave, gana el último
    expect(aplicarCambios(u, [{ nombre: 'A' }, { nombre: 'B' }])).toEqual({
      id: 1,
      nombre: 'B',
      email: 'a@a.com',
    })
    // lista vacía → usuario igual
    expect(aplicarCambios(u, [])).toEqual(u)
  })
})
