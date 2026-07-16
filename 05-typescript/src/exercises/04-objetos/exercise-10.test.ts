import { describe, it, expect } from 'vitest'
import {
  montos,
  totalGeneral,
  totalPorCategoria,
  categorias,
  categoriaTop,
  ordenarPorTotalDesc,
  lineaDe,
  reporte,
} from './exercise-10'
import type { Venta } from './exercise-10'

const ventas: Venta[] = [
  { producto: 'p1', categoria: 'A', monto: 10 },
  { producto: 'p2', categoria: 'A', monto: 5 },
  { producto: 'p3', categoria: 'B', monto: 20 },
]

describe('04-objetos / exercise-10 — capstone analítica de ventas', () => {
  /* --- BLOQUE 1 — sumar montos --- */
  it('1) montos', () => {
    expect(montos(ventas)).toEqual([10, 5, 20])
    expect(montos([])).toEqual([])
  })
  it('2) totalGeneral', () => {
    expect(totalGeneral(ventas)).toBe(35)
    expect(totalGeneral([])).toBe(0)
  })
  it('3) totalPorCategoria', () => {
    expect(totalPorCategoria(ventas)).toEqual({ A: 15, B: 20 })
    expect(totalPorCategoria([])).toEqual({})
  })

  /* --- BLOQUE 2 — categorías únicas --- */
  it('4) categorias', () => {
    expect(categorias(ventas)).toEqual(['A', 'B'])
  })

  /* --- BLOQUE 3 — el campeón --- */
  it('5) categoriaTop', () => {
    expect(categoriaTop(ventas)).toBe('B')
    expect(categoriaTop([])).toBeUndefined()
  })

  /* --- BLOQUE 4 — el reporte, paso a paso --- */
  it('6) ordenarPorTotalDesc', () => {
    expect(ordenarPorTotalDesc({ A: 15, B: 20 })).toEqual([
      ['B', 20],
      ['A', 15],
    ])
    expect(ordenarPorTotalDesc({})).toEqual([])
  })
  it('7) lineaDe', () => {
    expect(lineaDe('B', 20)).toBe('B: $20')
    expect(lineaDe('A', 15)).toBe('A: $15')
  })
  it('8) reporte', () => {
    expect(reporte(ventas)).toBe('B: $20\nA: $15')
  })
})
