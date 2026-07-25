import { describe, it, expect } from 'vitest'
import {
  enStock,
  nombresPorPrecio,
  masCaro,
  valorInventario,
  catalogoDisponible,
  elMayor,
  sinCampeon,
  sumarDesde,
  elegirCampeon,
  masCaroDesarmado,
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

describe('03-arrays / exercise-10 — BLOQUE R (refuerzo reduce-campeón)', () => {
  // El `!` va porque con `noUncheckedIndexedAccess` un acceso por índice devuelve
  // `Producto | undefined`, y `elegirCampeon` pide un `Producto` pelado en su
  // segundo parámetro. Aquí el índice es fijo sobre un array literal de 3: existen.
  const pan = tienda[0]! // precio 2
  const huevos = tienda[2]! // precio 4

  it('R1) elMayor', () => {
    expect(elMayor(3, 8)).toBe(8)
    expect(elMayor(10, 2)).toBe(10)
  })

  it('R2) sinCampeon', () => {
    expect(sinCampeon(undefined)).toBe(true)
    expect(sinCampeon(pan)).toBe(false)
  })

  it('R3) sumarDesde', () => {
    expect(sumarDesde([1, 2, 3], 0)).toBe(6)
    expect(sumarDesde([1, 2, 3], 10)).toBe(16)
  })

  it('R4) elegirCampeon', () => {
    expect(elegirCampeon(undefined, pan)).toBe(pan) // no había campeón → entra pan
    expect(elegirCampeon(pan, huevos)).toBe(huevos) // huevos es más caro
    expect(elegirCampeon(huevos, pan)).toBe(huevos) // pan no supera → sigue huevos
  })

  it('R5) masCaroDesarmado', () => {
    expect(masCaroDesarmado(tienda)?.nombre).toBe('Huevos')
    expect(masCaroDesarmado([])).toBeUndefined()
  })
})
