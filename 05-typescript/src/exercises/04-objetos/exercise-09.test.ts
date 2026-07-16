import { describe, it, expect } from 'vitest'
import {
  ponerItem,
  indexarPorId,
  buscar,
  nombrePorId,
  renombrarItem,
  actualizarNombre,
  nombresDe,
} from './exercise-09'
import type { Item } from './exercise-09'

const indice: Record<number, Item> = {
  1: { id: 1, nombre: 'a' },
  2: { id: 2, nombre: 'b' },
}

describe('04-objetos / exercise-09 — indexar por id', () => {
  /* --- BLOQUE 1 — construir el índice --- */
  it('1) ponerItem', () => {
    expect(ponerItem({}, { id: 1, nombre: 'a' })).toEqual({ 1: { id: 1, nombre: 'a' } })
    expect(ponerItem({ 1: { id: 1, nombre: 'a' } }, { id: 2, nombre: 'b' })).toEqual({
      1: { id: 1, nombre: 'a' },
      2: { id: 2, nombre: 'b' },
    })
  })
  it('2) indexarPorId', () => {
    expect(indexarPorId([{ id: 1, nombre: 'a' }, { id: 2, nombre: 'b' }])).toEqual(indice)
    expect(indexarPorId([])).toEqual({})
  })

  /* --- BLOQUE 2 — leer con guard --- */
  it('3) buscar', () => {
    expect(buscar(indice, 2)).toEqual({ id: 2, nombre: 'b' })
    expect(buscar(indice, 9)).toBeUndefined()
  })
  it('4) nombrePorId', () => {
    expect(nombrePorId(indice, 1)).toBe('a')
    expect(nombrePorId(indice, 9)).toBe('desconocido')
  })

  /* --- BLOQUE 3 — actualización inmutable anidada --- */
  it('5) renombrarItem — inmutable', () => {
    const item: Item = { id: 1, nombre: 'a' }
    expect(renombrarItem(item, 'z')).toEqual({ id: 1, nombre: 'z' })
    expect(item).toEqual({ id: 1, nombre: 'a' }) // no mutó el original
  })
  it('6) actualizarNombre', () => {
    expect(actualizarNombre(indice, 1, 'z')).toEqual({
      1: { id: 1, nombre: 'z' },
      2: { id: 2, nombre: 'b' },
    })
    expect(actualizarNombre(indice, 9, 'z')).toEqual(indice) // id inexistente → igual
    expect(indice).toEqual({ 1: { id: 1, nombre: 'a' }, 2: { id: 2, nombre: 'b' } }) // no mutó
  })

  /* --- BLOQUE 4 — capstone --- */
  it('7) nombresDe', () => {
    expect(nombresDe(indice, [1, 9, 2])).toEqual(['a', 'desconocido', 'b'])
  })
})
