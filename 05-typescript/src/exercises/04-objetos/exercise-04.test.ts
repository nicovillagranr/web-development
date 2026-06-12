import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  soloActivos,
  conStock,
  pendientes,
  duplicarPrecios,
  rebajarPrecios,
  rebajarYdepurar,
  nombresDeActivos,
  recibirDanio,
  asequiblesConEnvio,
  depurarCarrito,
} from './exercise-04'

describe('exercise-04 — .map + .filter encadenados', () => {
  // Bloque A: filter aislado
  it('1) soloActivos conserva solo los usuarios activos, sin mutar', () => {
    const usuarios = [
      { nombre: 'Ana', edad: 30, activo: true },
      { nombre: 'Eva', edad: 25, activo: false },
      { nombre: 'Leo', edad: 40, activo: true },
    ]
    expect(soloActivos(usuarios)).toEqual([
      { nombre: 'Ana', edad: 30, activo: true },
      { nombre: 'Leo', edad: 40, activo: true },
    ])
    expect(usuarios).toHaveLength(3) // original intacto
  })

  it('2) conStock conserva solo los productos con stock > 0', () => {
    const productos = [
      { nombre: 'Lápiz', precio: 500, stock: 3 },
      { nombre: 'Goma', precio: 300, stock: 0 },
    ]
    expect(conStock(productos)).toEqual([{ nombre: 'Lápiz', precio: 500, stock: 3 }])
  })

  it('3) pendientes conserva solo las tareas NO completadas', () => {
    const tareas = [
      { titulo: 'Estudiar TS', completada: false },
      { titulo: 'Lavar platos', completada: true },
      { titulo: 'Bloque E', completada: false },
    ]
    expect(pendientes(tareas)).toEqual([
      { titulo: 'Estudiar TS', completada: false },
      { titulo: 'Bloque E', completada: false },
    ])
    expect(tareas).toHaveLength(3) // original intacto
  })

  // Bloque B: map aislado
  it('4) duplicarPrecios multiplica el precio por 2 de todos, mismo largo', () => {
    const productos = [
      { nombre: 'Lápiz', precio: 100, stock: 3 },
      { nombre: 'Goma', precio: 50, stock: 1 },
    ]
    expect(duplicarPrecios(productos)).toEqual([
      { nombre: 'Lápiz', precio: 200, stock: 3 },
      { nombre: 'Goma', precio: 100, stock: 1 },
    ])
    expect(productos[0]?.precio).toBe(100) // original intacto
  })

  it('5) rebajarPrecios resta el monto a TODOS sin eliminar a nadie', () => {
    const productos = [
      { nombre: 'Lápiz', precio: 100, stock: 3 },
      { nombre: 'Goma', precio: 30, stock: 1 },
    ]
    expect(rebajarPrecios(productos, 50)).toEqual([
      { nombre: 'Lápiz', precio: 50, stock: 3 },
      { nombre: 'Goma', precio: -20, stock: 1 }, // queda negativo pero NO se cae
    ])
    expect(productos[1]?.precio).toBe(30) // original intacto
  })

  // Bloque C: cadena map + filter
  it('6) rebajarYdepurar resta el monto a todos y elimina los que quedan <= 0', () => {
    const productos = [
      { nombre: 'Lápiz', precio: 100, stock: 3 },
      { nombre: 'Goma', precio: 30, stock: 1 },
    ]
    expect(rebajarYdepurar(productos, 50)).toEqual([{ nombre: 'Lápiz', precio: 50, stock: 3 }])
    expect(productos[1]?.precio).toBe(30) // original intacto
  })

  it('7) nombresDeActivos filtra primero y convierte cada superviviente en su nombre', () => {
    const usuarios = [
      { nombre: 'Ana', edad: 30, activo: true },
      { nombre: 'Eva', edad: 25, activo: false },
      { nombre: 'Leo', edad: 40, activo: true },
    ]
    expect(nombresDeActivos(usuarios)).toEqual(['Ana', 'Leo'])
    expectTypeOf(nombresDeActivos).returns.toEqualTypeOf<string[]>()
  })

  it('8) recibirDanio baja la vida solo del enemigo con ese id y elimina a los caídos', () => {
    expect(recibirDanio([{ id: 1, nombre: 'Orco', vida: 10 }], 1, 3)).toEqual([
      { id: 1, nombre: 'Orco', vida: 7 },
    ])
    expect(recibirDanio([{ id: 1, nombre: 'Orco', vida: 3 }], 1, 3)).toEqual([])
    const enemigos = [
      { id: 1, nombre: 'Orco', vida: 2 },
      { id: 2, nombre: 'Goblin', vida: 5 },
    ]
    expect(recibirDanio(enemigos, 1, 2)).toEqual([{ id: 2, nombre: 'Goblin', vida: 5 }])
    expect(enemigos[0]?.vida).toBe(2) // original intacto
    expectTypeOf(recibirDanio).returns.toEqualTypeOf<
      { id: number; nombre: string; vida: number }[]
    >()
  })

  it('9) asequiblesConEnvio suma el envío a todos y conserva los <= presupuesto', () => {
    const productos = [
      { nombre: 'Teclado', precio: 800, stock: 2 },
      { nombre: 'Mouse', precio: 950, stock: 5 },
    ]
    expect(asequiblesConEnvio(productos, 100, 1000)).toEqual([
      { nombre: 'Teclado', precio: 900, stock: 2 },
    ])
    // justo en el límite: presupuesto exacto sobrevive (<=, no <)
    expect(asequiblesConEnvio([{ nombre: 'Pad', precio: 900, stock: 1 }], 100, 1000)).toEqual([
      { nombre: 'Pad', precio: 1000, stock: 1 },
    ])
    expect(productos[0]?.precio).toBe(800) // original intacto
  })

  it('10) depurarCarrito baja 1 a todos y elimina los que llegan a 0', () => {
    expect(
      depurarCarrito([
        { id: 'a', nombre: 'Lápiz', cantidad: 2 },
        { id: 'b', nombre: 'Goma', cantidad: 1 },
      ]),
    ).toEqual([{ id: 'a', nombre: 'Lápiz', cantidad: 1 }])
  })
})
