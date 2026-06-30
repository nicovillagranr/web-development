import { describe, it, expect } from 'vitest'
import {
  enStock,
  nombresPorPrecio,
  masCaro,
  valorInventario,
  catalogoDisponible,
} from './exercise-10'
import type { Producto } from './exercise-10'

const tienda: Producto[] = [
  { id: 1, nombre: 'Pan', precio: 2, stock: 5 },
  { id: 2, nombre: 'Leche', precio: 3, stock: 0 },
  { id: 3, nombre: 'Huevos', precio: 4, stock: 2 },
]

describe('03-arrays / exercise-10 — capstone catálogo', () => {
  it('1) enStock', () => {
    expect(enStock(tienda).map((p) => p.nombre)).toEqual(['Pan', 'Huevos'])
  })

  it('2) nombresPorPrecio', () => {
    expect(nombresPorPrecio(tienda)).toEqual(['Pan', 'Leche', 'Huevos'])
  })

  it('3) masCaro', () => {
    expect(masCaro(tienda)?.nombre).toBe('Huevos')
    expect(masCaro([])).toBeUndefined()
  })

  it('4) valorInventario', () => {
    // 2*5 + 3*0 + 4*2 = 10 + 0 + 8 = 18
    expect(valorInventario(tienda)).toBe(18)
  })

  it('5) catalogoDisponible', () => {
    expect(catalogoDisponible(tienda)).toBe('Pan ($2), Huevos ($4)')
  })
})
