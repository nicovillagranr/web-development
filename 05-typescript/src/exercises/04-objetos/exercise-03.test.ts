import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  cumplirAniosDe,
  desactivarA,
  subirPrecio,
  cumplirAniosEnRegistro,
  renombrarEnRegistro,
  incrementarCantidad,
  quitarUnaUnidad,
} from './exercise-03'

describe('exercise-03 — actualización inmutable anidada', () => {
  // D1: el objeto vive en un array → .map
  it('1) cumplirAniosDe sube la edad solo del que coincide, sin mutar', () => {
    const usuarios = [
      { nombre: 'Ana', edad: 30, activo: true },
      { nombre: 'Eva', edad: 25, activo: true },
    ]
    expect(cumplirAniosDe(usuarios, 'Ana')).toEqual([
      { nombre: 'Ana', edad: 31, activo: true },
      { nombre: 'Eva', edad: 25, activo: true },
    ])
    expect(usuarios[0]?.edad).toBe(30) // original intacto
    expectTypeOf(cumplirAniosDe).returns.toEqualTypeOf<
      { nombre: string; edad: number; activo: boolean }[]
    >()
  })

  it('2) desactivarA pone activo:false solo en el que coincide', () => {
    const usuarios = [
      { nombre: 'Ana', edad: 30, activo: true },
      { nombre: 'Eva', edad: 25, activo: true },
    ]
    expect(desactivarA(usuarios, 'Eva')).toEqual([
      { nombre: 'Ana', edad: 30, activo: true },
      { nombre: 'Eva', edad: 25, activo: false },
    ])
    expect(usuarios[1]?.activo).toBe(true)
  })

  it('3) subirPrecio suma el monto solo al producto que coincide', () => {
    const productos = [
      { nombre: 'Lápiz', precio: 500, stock: 3 },
      { nombre: 'Goma', precio: 300, stock: 1 },
    ]
    expect(subirPrecio(productos, 'Lápiz', 100)).toEqual([
      { nombre: 'Lápiz', precio: 600, stock: 3 },
      { nombre: 'Goma', precio: 300, stock: 1 },
    ])
    expect(productos[0]?.precio).toBe(500)
  })

  // D2: el objeto vive en un diccionario → spread + [id]
  it('4) cumplirAniosEnRegistro sube la edad en esa llave, sin mutar', () => {
    const reg = {
      u1: { nombre: 'Ana', edad: 30, activo: true },
      u2: { nombre: 'Eva', edad: 25, activo: true },
    }
    expect(cumplirAniosEnRegistro(reg, 'u1')).toEqual({
      u1: { nombre: 'Ana', edad: 31, activo: true },
      u2: { nombre: 'Eva', edad: 25, activo: true },
    })
    expect(reg.u1.edad).toBe(30) // original intacto
  })

  it('4b) cumplirAniosEnRegistro devuelve el registro igual si el id no existe', () => {
    const reg = { u1: { nombre: 'Ana', edad: 30, activo: true } }
    expect(cumplirAniosEnRegistro(reg, 'noexiste')).toEqual({
      u1: { nombre: 'Ana', edad: 30, activo: true },
    })
  })

  it('5) renombrarEnRegistro cambia solo el nombre de esa llave', () => {
    const reg = { u1: { nombre: 'Ana', edad: 30, activo: true } }
    expect(renombrarEnRegistro(reg, 'u1', 'Eva')).toEqual({
      u1: { nombre: 'Eva', edad: 30, activo: true },
    })
    expect(reg.u1.nombre).toBe('Ana')
  })

  // D3: capstone carrito
  it('6) incrementarCantidad sube la cantidad solo del item que coincide', () => {
    const carrito = [
      { id: 'a', nombre: 'Lápiz', cantidad: 1 },
      { id: 'b', nombre: 'Goma', cantidad: 3 },
    ]
    expect(incrementarCantidad(carrito, 'a')).toEqual([
      { id: 'a', nombre: 'Lápiz', cantidad: 2 },
      { id: 'b', nombre: 'Goma', cantidad: 3 },
    ])
    expect(carrito[0]?.cantidad).toBe(1)
  })

  it('7) quitarUnaUnidad baja la cantidad y elimina el item si llega a 0', () => {
    expect(quitarUnaUnidad([{ id: 'a', nombre: 'Lápiz', cantidad: 2 }], 'a')).toEqual([
      { id: 'a', nombre: 'Lápiz', cantidad: 1 },
    ])
    expect(quitarUnaUnidad([{ id: 'a', nombre: 'Lápiz', cantidad: 1 }], 'a')).toEqual([])
    // no toca los demás
    const carrito = [
      { id: 'a', nombre: 'Lápiz', cantidad: 1 },
      { id: 'b', nombre: 'Goma', cantidad: 2 },
    ]
    expect(quitarUnaUnidad(carrito, 'a')).toEqual([{ id: 'b', nombre: 'Goma', cantidad: 2 }])
    expectTypeOf(quitarUnaUnidad).returns.toEqualTypeOf<
      { id: string; nombre: string; cantidad: number }[]
    >()
  })
})
