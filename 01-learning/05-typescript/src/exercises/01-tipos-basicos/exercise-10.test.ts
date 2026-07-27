import { describe, it, expect } from 'vitest'
import {
  crear,
  esBebida,
  descripcion,
  porCategoria,
  ofertasDe,
} from './exercise-10'

describe('01-tipos-basicos / exercise-10 — capstone: mini-modelo de dominio', () => {
  /* ── BLOQUE A — alta y descripción ── */

  it('1) crear añade el id (interface extendida en el retorno)', () => {
    expect(crear({ nombre: 'Té', precio: 1000, categoria: 'bebida' }, 7)).toEqual({
      nombre: 'Té',
      precio: 1000,
      categoria: 'bebida',
      id: 7,
    })
  })

  it('2) esBebida solo es true para "bebida"', () => {
    expect(esBebida('bebida')).toBe(true)
    expect(esBebida('snack')).toBe(false)
    expect(esBebida('postre')).toBe(false)
    // @ts-expect-error — "fruta" no es una categoría del menú
    esBebida('fruta')
  })

  it('3) descripcion usa nombre y precio', () => {
    expect(descripcion({ nombre: 'Té', precio: 1000, categoria: 'bebida' })).toBe('Té: $1000')
  })

  /* ── BLOQUE B — consultar el catálogo ── */

  it('4) porCategoria filtra por la categoría pedida', () => {
    const catalogo = [
      { id: 1, nombre: 'Té', precio: 1000, categoria: 'bebida' as const },
      { id: 2, nombre: 'Papas', precio: 800, categoria: 'snack' as const },
      { id: 3, nombre: 'Cola', precio: 1200, categoria: 'bebida' as const },
    ]
    expect(porCategoria(catalogo, 'bebida')).toEqual([
      { id: 1, nombre: 'Té', precio: 1000, categoria: 'bebida' },
      { id: 3, nombre: 'Cola', precio: 1200, categoria: 'bebida' },
    ])
    // @ts-expect-error — categoría inexistente
    porCategoria(catalogo, 'fruta')
  })

  /* ── BLOQUE C — capstone: ofertas ── */

  it('5) ofertasDe filtra por categoría y precio máximo, devuelve nombres', () => {
    const catalogo = [
      { id: 1, nombre: 'Té', precio: 1000, categoria: 'bebida' as const },
      { id: 2, nombre: 'Cola', precio: 2000, categoria: 'bebida' as const },
      { id: 3, nombre: 'Papas', precio: 500, categoria: 'snack' as const },
    ]
    expect(ofertasDe(catalogo, 'bebida', 1500)).toEqual(['Té'])
    expect(ofertasDe(catalogo, 'snack', 1500)).toEqual(['Papas'])
    expect(ofertasDe(catalogo, 'postre', 1500)).toEqual([])
  })
})
