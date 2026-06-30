import { describe, it, expect } from 'vitest'
import {
  totalPorCategoria,
  categorias,
  totalGeneral,
  categoriaTop,
  reporte,
} from './exercise-10'
import type { Venta } from './exercise-10'

const ventas: Venta[] = [
  { producto: 'p1', categoria: 'A', monto: 10 },
  { producto: 'p2', categoria: 'A', monto: 5 },
  { producto: 'p3', categoria: 'B', monto: 20 },
]

describe('04-objetos / exercise-10 — capstone analítica de ventas', () => {
  it('1) totalPorCategoria', () => {
    expect(totalPorCategoria(ventas)).toEqual({ A: 15, B: 20 })
  })
  it('2) categorias', () => {
    expect(categorias(ventas)).toEqual(['A', 'B'])
  })
  it('3) totalGeneral', () => {
    expect(totalGeneral(ventas)).toBe(35)
  })
  it('4) categoriaTop', () => {
    expect(categoriaTop(ventas)).toBe('B')
    expect(categoriaTop([])).toBeUndefined()
  })
  it('5) reporte', () => {
    expect(reporte(ventas)).toBe('B: $20\nA: $15')
  })
})
