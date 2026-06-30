import { describe, it, expect } from 'vitest'
import { indexarPorId, buscar, nombrePorId, actualizarNombre, nombresDe } from './exercise-09'
import type { Item } from './exercise-09'

const indice: Record<number, Item> = {
  1: { id: 1, nombre: 'a' },
  2: { id: 2, nombre: 'b' },
}

describe('04-objetos / exercise-09 — indexar por id', () => {
  it('1) indexarPorId', () => {
    expect(indexarPorId([{ id: 1, nombre: 'a' }, { id: 2, nombre: 'b' }])).toEqual(indice)
  })
  it('2) buscar', () => {
    expect(buscar(indice, 2)).toEqual({ id: 2, nombre: 'b' })
    expect(buscar(indice, 9)).toBeUndefined()
  })
  it('3) nombrePorId', () => {
    expect(nombrePorId(indice, 1)).toBe('a')
    expect(nombrePorId(indice, 9)).toBe('desconocido')
  })
  it('4) actualizarNombre', () => {
    expect(actualizarNombre(indice, 1, 'z')).toEqual({
      1: { id: 1, nombre: 'z' },
      2: { id: 2, nombre: 'b' },
    })
    expect(actualizarNombre(indice, 9, 'z')).toEqual(indice) // id inexistente → igual
  })
  it('5) nombresDe', () => {
    expect(nombresDe(indice, [1, 9, 2])).toEqual(['a', 'desconocido', 'b'])
  })
})
