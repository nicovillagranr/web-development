import { describe, it, expect } from 'vitest'
import {
  correr,
  aplicar,
  aplicarDosVeces,
  elegirYaplicar,
  aplicarACadaUno,
  mapConIndice,
  transformarA,
  aplicarSegun,
  primerQueCumple,
  mapYfiltra,
} from './exercise-06'

describe('02-funciones / exercise-06 — callbacks a fondo [reforzado]', () => {
  /* ── BLOQUE 0 — una función es un VALOR: TÚ aprietas el gatillo ── */

  it('1) correr ejecuta la función que recibe', () => {
    expect(correr(() => 'hola')).toBe('hola')
    expect(correr(() => 'ok')).toBe('ok')
  })

  it('2) aplicar pasa el dato por la función', () => {
    expect(aplicar(5, (n) => n * 2)).toBe(10)
    expect(aplicar(7, (n) => n + 1)).toBe(8)
  })

  it('3) aplicarDosVeces encadena la salida en la entrada', () => {
    expect(aplicarDosVeces(3, (n) => n + 1)).toBe(5)
    expect(aplicarDosVeces(2, (n) => n * 3)).toBe(18)
  })

  it('4) elegirYaplicar dispara solo el callback que toca', () => {
    expect(elegirYaplicar(10, true, (n) => n + 1, (n) => n - 1)).toBe(11)
    expect(elegirYaplicar(10, false, (n) => n + 1, (n) => n - 1)).toBe(9)
  })

  /* ── puente — ahora el método llama a tu función por ti ── */

  it('5) aplicarACadaUno deja que .map llame a fn por cada elemento', () => {
    expect(aplicarACadaUno([1, 2, 3], (n) => n * 10)).toEqual([10, 20, 30])
    expect(aplicarACadaUno([4, 5], (n) => n + 1)).toEqual([5, 6])
  })

  /* ── BLOQUE A — índice y cambio de tipo ── */

  it('6) mapConIndice usa item e índice', () => {
    expect(mapConIndice(['a', 'b', 'c'], (item, i) => `${i}:${item}`)).toEqual([
      '0:a',
      '1:b',
      '2:c',
    ])
  })

  it('7) transformarA convierte number[] en string[]', () => {
    expect(transformarA([1, 2], (n) => `#${n}`)).toEqual(['#1', '#2'])
  })

  /* ── BLOQUE B — elegir callback y find con undefined ── */

  it('8) aplicarSegun elige el callback según la condición', () => {
    expect(aplicarSegun(5, true, (n) => n + 1, (n) => n - 1)).toBe(6)
    expect(aplicarSegun(5, false, (n) => n + 1, (n) => n - 1)).toBe(4)
  })

  it('9) primerQueCumple devuelve el primero o undefined', () => {
    expect(primerQueCumple([1, 2, 3, 4], (n) => n > 2)).toBe(3)
    expect(primerQueCumple([1, 2], (n) => n > 5)).toBeUndefined()
  })

  /* ── BLOQUE C — capstone: map + filter con dos callbacks ── */

  it('10) mapYfiltra transforma y luego filtra', () => {
    expect(mapYfiltra([1, 2, 3], (n) => n * 10, (n) => n > 15)).toEqual([20, 30])
    expect(mapYfiltra([1, 2], (n) => n + 1, (n) => n > 100)).toEqual([])
  })
})
