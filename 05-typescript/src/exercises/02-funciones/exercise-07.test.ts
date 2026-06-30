import { describe, it, expect } from 'vitest'
import {
  multiplicador,
  sumador,
  saludador,
  crearContador,
  crearAcumulador,
  crearAlternador,
  crearLimitado,
  crearContadorDesde,
} from './exercise-07'

describe('02-funciones / exercise-07 — closures con estado [reforzado]', () => {
  /* ── BLOQUE 0 — la cafetera: devolver una función que recuerda un valor fijo ── */

  it('1) multiplicador captura el factor', () => {
    const triple = multiplicador(3)
    expect(triple(5)).toBe(15)
    expect(triple(0)).toBe(0)
    expect(multiplicador(10)(2)).toBe(20)
  })

  it('2) sumador captura la base', () => {
    const mas10 = sumador(10)
    expect(mas10(5)).toBe(15)
    expect(mas10(0)).toBe(10)
  })

  it('3) saludador captura el saludo', () => {
    const hola = saludador('Hola')
    expect(hola('Nico')).toBe('Hola, Nico')
    expect(saludador('Buenas')('Ana')).toBe('Buenas, Ana')
  })

  /* ── BLOQUE A — contar y acumular ── */

  it('4) crearContador recuerda y sube', () => {
    const c = crearContador()
    expect(c()).toBe(1)
    expect(c()).toBe(2)
    expect(c()).toBe(3)
  })

  it('4b) cada contador es independiente', () => {
    const a = crearContador()
    const b = crearContador()
    expect(a()).toBe(1)
    expect(a()).toBe(2)
    expect(b()).toBe(1) // b lleva su propia cuenta
  })

  it('5) crearAcumulador suma a un total que persiste', () => {
    const acum = crearAcumulador()
    expect(acum(5)).toBe(5)
    expect(acum(3)).toBe(8)
    expect(acum(10)).toBe(18)
  })

  /* ── BLOQUE B — estado booleano ── */

  it('6) crearAlternador alterna empezando en true', () => {
    const tic = crearAlternador()
    expect(tic()).toBe(true)
    expect(tic()).toBe(false)
    expect(tic()).toBe(true)
  })

  it('7) crearLimitado da true las primeras max veces', () => {
    const ok = crearLimitado(2)
    expect(ok()).toBe(true)
    expect(ok()).toBe(true)
    expect(ok()).toBe(false)
    expect(ok()).toBe(false)
  })

  /* ── BLOQUE C — capstone ── */

  it('8) crearContadorDesde empieza en inicio y sube de paso en paso', () => {
    const c = crearContadorDesde(10, 5)
    expect(c()).toBe(10)
    expect(c()).toBe(15)
    expect(c()).toBe(20)
  })
})
