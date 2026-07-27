import { describe, it, expect } from 'vitest'
import {
  copiarLista,
  agregar,
  leerListaOVacia,
  agregarEnCasillero,
  meterEnNumeros,
  meterEn,
  meterDosAMano,
  meterVariosFor,
  meterVariosReduce,
  paridad,
  agruparPorParidad,
  agruparPorCategoria,
  cuentaPorCategoria,
  sinRepetir,
  categoriasUnicas,
  campeonDeConteo,
  categoriaConMasProductos,
} from './exercise-08'

describe('04-objetos / exercise-08 — agrupar (groupBy)', () => {
  /* --- BLOQUE 1 — listas inmutables --- */
  it('1) copiarLista — copia, NO la misma referencia', () => {
    const original = [1, 2]
    expect(copiarLista(original)).toEqual([1, 2])
    expect(copiarLista(original)).not.toBe(original)
  })
  it('2) agregar — inmutable', () => {
    const original = [1, 2]
    expect(agregar(original, 3)).toEqual([1, 2, 3])
    expect(agregar([], 5)).toEqual([5])
    expect(original).toEqual([1, 2])
  })

  /* --- BLOQUE 2 — leer con respaldo --- */
  it('3) leerListaOVacia', () => {
    expect(leerListaOVacia({ a: [1, 2] }, 'a')).toEqual([1, 2])
    expect(leerListaOVacia({}, 'x')).toEqual([])
  })

  /* --- BLOQUE 3 — meter UN elemento --- */
  it('4) agregarEnCasillero — devuelve SOLO la lista nueva', () => {
    expect(agregarEnCasillero({ a: [1] }, 'a', 2)).toEqual([1, 2])
    expect(agregarEnCasillero({}, 'x', 9)).toEqual([9])
  })
  it('5) meterEnNumeros — copia el objeto + pisa la etiqueta', () => {
    expect(meterEnNumeros({}, 'a', 1)).toEqual({ a: [1] })
    expect(meterEnNumeros({ a: [1] }, 'a', 2)).toEqual({ a: [1, 2] })
    expect(meterEnNumeros({ a: [1] }, 'b', 9)).toEqual({ a: [1], b: [9] })
  })
  it('6) meterEn — genérico (number y string)', () => {
    expect(meterEn({}, 'a', 1)).toEqual({ a: [1] })
    expect(meterEn({ a: [1] }, 'a', 2)).toEqual({ a: [1, 2] })
    expect(meterEn({}, 'x', 'hola')).toEqual({ x: ['hola'] })
  })

  /* --- BLOQUE 4 — meter MUCHAS veces (a mano → for → reduce) --- */
  it('7) meterDosAMano — arrastre a mano, sin bucle', () => {
    expect(meterDosAMano('a', 1, 2)).toEqual({ a: [1, 2] })
    expect(meterDosAMano('b', 5, 5)).toEqual({ b: [5, 5] })
  })
  it('8) meterVariosFor — for + acumulador', () => {
    expect(meterVariosFor('a', [1, 2, 3])).toEqual({ a: [1, 2, 3] })
    expect(meterVariosFor('x', [])).toEqual({})
  })
  it('9) meterVariosReduce — el mismo for, ahora con reduce', () => {
    expect(meterVariosReduce('a', [1, 2, 3])).toEqual({ a: [1, 2, 3] })
    expect(meterVariosReduce('x', [])).toEqual({})
  })

  /* --- BLOQUE 5 — la clave sale de cada elemento --- */
  it('10) paridad', () => {
    expect(paridad(4)).toBe('par')
    expect(paridad(3)).toBe('impar')
    expect(paridad(0)).toBe('par')
  })
  it('11) agruparPorParidad', () => {
    expect(agruparPorParidad([1, 2, 3, 4])).toEqual({ impar: [1, 3], par: [2, 4] })
    expect(agruparPorParidad([])).toEqual({})
  })
  it('12) agruparPorCategoria', () => {
    expect(
      agruparPorCategoria([
        { nombre: 'a', categoria: 'x' },
        { nombre: 'b', categoria: 'x' },
        { nombre: 'c', categoria: 'y' },
      ]),
    ).toEqual({
      x: [
        { nombre: 'a', categoria: 'x' },
        { nombre: 'b', categoria: 'x' },
      ],
      y: [{ nombre: 'c', categoria: 'y' }],
    })
    expect(agruparPorCategoria([])).toEqual({})
  })

  /* --- BLOQUE 6 — contar --- */
  it('13) cuentaPorCategoria', () => {
    expect(
      cuentaPorCategoria([
        { nombre: 'a', categoria: 'x' },
        { nombre: 'b', categoria: 'x' },
        { nombre: 'c', categoria: 'y' },
      ]),
    ).toEqual({ x: 2, y: 1 })
    expect(cuentaPorCategoria([])).toEqual({})
  })

  /* --- BLOQUE 7 — set y dedup --- */
  it('14) sinRepetir', () => {
    expect(sinRepetir(['x', 'x', 'y'])).toEqual(['x', 'y'])
    expect(sinRepetir([])).toEqual([])
  })
  it('15) categoriasUnicas', () => {
    expect(
      categoriasUnicas([
        { nombre: 'a', categoria: 'x' },
        { nombre: 'b', categoria: 'x' },
        { nombre: 'c', categoria: 'y' },
      ]),
    ).toEqual(['x', 'y'])
  })

  /* --- BLOQUE 8 — capstone: campeón --- */
  it('16) campeonDeConteo', () => {
    expect(campeonDeConteo({ x: 2, y: 1 })).toBe('x')
    expect(campeonDeConteo({})).toBeUndefined()
  })
  it('17) categoriaConMasProductos', () => {
    expect(
      categoriaConMasProductos([
        { nombre: 'a', categoria: 'x' },
        { nombre: 'b', categoria: 'x' },
        { nombre: 'c', categoria: 'y' },
      ]),
    ).toBe('x')
    expect(categoriaConMasProductos([])).toBeUndefined()
  })
})
