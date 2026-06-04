import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  obtenerSaludo,
  doblar,
  enMayusculas,
  sumar,
  esMayorDeEdad,
  aplicar,
  describir,
  aplicarDosVeces,
  crearMultiplicador,
  crearRepetidor,
} from './exercise-01'

describe('exercise-09 — funciones como valores', () => {
  // BLOQUE A
  it('1) obtenerSaludo: () => string', () => {
    expect(obtenerSaludo()).toBe('hola')
    expectTypeOf(obtenerSaludo).toEqualTypeOf<() => string>()
  })

  it('2) doblar: (n: number) => number', () => {
    expect(doblar(5)).toBe(10)
    expect(doblar(0)).toBe(0)
    expectTypeOf(doblar).toEqualTypeOf<(n: number) => number>()
  })

  it('3) enMayusculas: (texto: string) => string', () => {
    expect(enMayusculas('hola')).toBe('HOLA')
    expectTypeOf(enMayusculas).toEqualTypeOf<(texto: string) => string>()
  })

  // BLOQUE B
  it('4) sumar: (a: number, b: number) => number', () => {
    expect(sumar(3, 4)).toBe(7)
    expectTypeOf(sumar).toEqualTypeOf<(a: number, b: number) => number>()
  })

  it('5) esMayorDeEdad: (edad: number) => boolean', () => {
    expect(esMayorDeEdad(20)).toBe(true)
    expect(esMayorDeEdad(18)).toBe(true)
    expect(esMayorDeEdad(15)).toBe(false)
    expectTypeOf(esMayorDeEdad).toEqualTypeOf<(edad: number) => boolean>()
  })

  // BLOQUE C
  it('6) aplicar aplica un callback al valor', () => {
    expect(aplicar(10, (n) => n + 1)).toBe(11)
    expect(aplicar(10, (n) => n * 3)).toBe(30)
    expectTypeOf(aplicar).parameter(1).toEqualTypeOf<(n: number) => number>()
    expectTypeOf(aplicar).returns.toEqualTypeOf<number>()
  })

  it('7) describir usa un callback number => string', () => {
    expect(describir(5, (n) => 'número ' + n)).toBe('número 5')
    expectTypeOf(describir).parameter(1).toEqualTypeOf<(n: number) => string>()
    expectTypeOf(describir).returns.toEqualTypeOf<string>()
  })

  it('8) aplicarDosVeces encadena el callback', () => {
    expect(aplicarDosVeces(3, (n) => n + 1)).toBe(5)
    expect(aplicarDosVeces(2, (n) => n * 2)).toBe(8)
    expectTypeOf(aplicarDosVeces).returns.toEqualTypeOf<number>()
  })

  // BLOQUE D
  it('9) crearMultiplicador devuelve una función configurada', () => {
    const por5 = crearMultiplicador(5)
    expect(por5(10)).toBe(50)
    expect(por5(0)).toBe(0)
    expectTypeOf(crearMultiplicador).returns.toEqualTypeOf<(n: number) => number>()
  })

  it('10) crearRepetidor devuelve una función configurada', () => {
    const triple = crearRepetidor(3)
    expect(triple('ab')).toBe('ababab')
    expectTypeOf(crearRepetidor).returns.toEqualTypeOf<(texto: string) => string>()
  })
})
