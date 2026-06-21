import { describe, it, expect } from 'vitest'
import {
  crearProducto,
  etiqueta,
  puedeEntrar,
  colorDe,
  nombresActivos,
} from './exercise-05'

describe('01-tipos-basicos / exercise-05 — type aliases', () => {
  /* ── BLOQUE A — alias de objeto reusado ── */

  it('1) crearProducto devuelve un Producto completo', () => {
    expect(crearProducto('Té', 1000)).toEqual({ nombre: 'Té', precio: 1000 })
    expect(crearProducto('Café', 1500)).toEqual({ nombre: 'Café', precio: 1500 })
  })

  it('2) etiqueta usa nombre y precio', () => {
    expect(etiqueta({ nombre: 'Té', precio: 1000 })).toBe('Té cuesta $1000')
    expect(etiqueta({ nombre: 'Café', precio: 1500 })).toBe('Café cuesta $1500')
  })

  /* ── BLOQUE B — alias de unión de literales (menú cerrado) ── */

  it('3) puedeEntrar es false solo si está baneado', () => {
    expect(puedeEntrar('activo')).toBe(true)
    expect(puedeEntrar('inactivo')).toBe(true)
    expect(puedeEntrar('baneado')).toBe(false)
    // @ts-expect-error — "fantasma" no es un Estado válido: la unión lo rechaza
    puedeEntrar('fantasma')
  })

  it('4) colorDe mapea cada estado a su color', () => {
    expect(colorDe('activo')).toBe('verde')
    expect(colorDe('inactivo')).toBe('gris')
    expect(colorDe('baneado')).toBe('rojo')
    // @ts-expect-error — solo se admiten los tres estados del alias
    colorDe('dorado')
  })

  /* ── BLOQUE C — capstone: filter + map reusando los alias ── */

  it('5) nombresActivos devuelve solo los nombres de los activos', () => {
    const usuarios = [
      { nombre: 'Ana', estado: 'activo' as const },
      { nombre: 'Leo', estado: 'baneado' as const },
      { nombre: 'Mia', estado: 'activo' as const },
    ]
    expect(nombresActivos(usuarios)).toEqual(['Ana', 'Mia'])
  })
})
