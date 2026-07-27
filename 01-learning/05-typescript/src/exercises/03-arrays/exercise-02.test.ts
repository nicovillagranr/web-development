import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  aplicar,
  aplicarTexto,
  dosVeces,
  mapear,
  aplicaTresVeces,
  aplicaNVeces,
  etiquetas,
  nombresEnMayuscula,
  transformarYFiltrar,
  aplicaYSuma,
} from './exercise-02'

describe('exercise-02 — recibir y aplicar callbacks (refuerzo Parte C)', () => {
  // Aplicar un callback a un valor
  it('1) aplicar usa el callback una vez sobre el número', () => {
    expect(aplicar(5, (x) => x + 1)).toBe(6)
    expect(aplicar(3, (x) => x * 10)).toBe(30)
    expectTypeOf(aplicar).parameter(1).toEqualTypeOf<(x: number) => number>()
    expectTypeOf(aplicar).returns.toEqualTypeOf<number>()
  })

  it('2) aplicarTexto usa el callback una vez sobre el string', () => {
    expect(aplicarTexto('hola', (s) => s.toUpperCase())).toBe('HOLA')
    expect(aplicarTexto('  ts ', (s) => s.trim())).toBe('ts')
    expectTypeOf(aplicarTexto).parameter(1).toEqualTypeOf<(s: string) => string>()
    expectTypeOf(aplicarTexto).returns.toEqualTypeOf<string>()
  })

  it('3) dosVeces aplica el callback dos veces (fn(fn(n)))', () => {
    expect(dosVeces(1, (x) => x + 10)).toBe(21)
    expect(dosVeces(2, (x) => x * 2)).toBe(8)
    expectTypeOf(dosVeces).returns.toEqualTypeOf<number>()
  })

  // Aplicar sobre cada elemento de un array
  it('4) mapear aplica el callback a cada número', () => {
    expect(mapear([1, 2, 3], (n) => n + 10)).toEqual([11, 12, 13])
    expect(mapear([], (n) => n + 1)).toEqual([])
    expectTypeOf(mapear).returns.toEqualTypeOf<number[]>()
  })

  it('5) aplicaTresVeces aplica el callback tres veces a cada número', () => {
    expect(aplicaTresVeces([1, 2], (n) => n + 10)).toEqual([31, 32])
    expect(aplicaTresVeces([1, 2], (n) => n * 2)).toEqual([8, 16])
    expectTypeOf(aplicaTresVeces).returns.toEqualTypeOf<number[]>()
  })

  it('6) aplicaNVeces aplica el callback `veces` veces a cada número', () => {
    expect(aplicaNVeces([1], (n) => n + 1, 3)).toEqual([4])
    expect(aplicaNVeces([2], (n) => n * 2, 2)).toEqual([8])
    expect(aplicaNVeces([5], (n) => n + 1, 0)).toEqual([5])
    expectTypeOf(aplicaNVeces).returns.toEqualTypeOf<number[]>()
  })

  // map que cambia de tipo / objetos
  it('7) etiquetas convierte cada producto en "#<id>"', () => {
    expect(etiquetas([{ id: 1 }, { id: 2 }])).toEqual(['#1', '#2'])
    expect(etiquetas([])).toEqual([])
    expectTypeOf(etiquetas).returns.toEqualTypeOf<string[]>()
  })

  it('8) nombresEnMayuscula pone cada nombre en mayúsculas', () => {
    expect(nombresEnMayuscula([{ nombre: 'ana' }, { nombre: 'leo' }])).toEqual(['ANA', 'LEO'])
    expectTypeOf(nombresEnMayuscula).returns.toEqualTypeOf<string[]>()
  })

  // Combinar callbacks / encadenar
  it('9) transformarYFiltrar transforma y luego selecciona', () => {
    expect(transformarYFiltrar([1, 2, 3], (n) => n * 10, (n) => n > 15)).toEqual([20, 30])
    expect(transformarYFiltrar([1, 2, 3], (n) => n + 1, (n) => n % 2 === 0)).toEqual([2, 4])
    expectTypeOf(transformarYFiltrar).returns.toEqualTypeOf<number[]>()
  })

  it('10) aplicaYSuma aplica el callback y devuelve la suma', () => {
    expect(aplicaYSuma([1, 2, 3], (n) => n * 2)).toBe(12)
    expect(aplicaYSuma([], (n) => n + 1)).toBe(0)
    expectTypeOf(aplicaYSuma).returns.toEqualTypeOf<number>()
  })
})
