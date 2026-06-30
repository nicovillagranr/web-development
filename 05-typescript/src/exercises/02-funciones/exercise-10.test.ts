import { describe, it, expect } from 'vitest'
import {
  aplicarUno,
  aplicarVarios,
  crearPipeline,
  aplicarYregistrar,
  crearCaja,
  crearContadorObj,
  crearProcesador,
} from './exercise-10'

describe('02-funciones / exercise-10 — capstone: procesador de pasos [reforzado]', () => {
  /* ── BLOQUE A — del paso suelto a la lista variable ── */

  it('1) aplicarUno aplica un solo paso', () => {
    expect(aplicarUno(5, (n) => n * 2)).toBe(10)
  })

  it('2) aplicarVarios aplica una cantidad variable de pasos', () => {
    expect(aplicarVarios(3, (n) => n + 1, (n) => n * 2)).toBe(8)
    expect(aplicarVarios(7)).toBe(7) // sin pasos → igual
  })

  /* ── BLOQUE B — montar tubería y observar intermedios ── */

  it('3) crearPipeline une todos los pasos en uno', () => {
    const p = crearPipeline((n) => n + 1, (n) => n * 2)
    expect(p(3)).toBe(8)
    expect(p(0)).toBe(2)
  })

  it('4) aplicarYregistrar apunta cada resultado intermedio', () => {
    const reg: number[] = []
    expect(aplicarYregistrar(3, [(n) => n + 1, (n) => n * 2], reg)).toBe(8)
    expect(reg).toEqual([4, 8])
  })

  /* ── BLOQUE C — calentamiento: objeto de funciones que comparten estado ── */

  it('5) crearCaja comparte un texto entre guardar y ver', () => {
    const c = crearCaja()
    c.guardar('hola')
    expect(c.ver()).toBe('hola')
    c.guardar('adios')
    expect(c.ver()).toBe('adios')
  })

  it('5b) cada caja es independiente', () => {
    const a = crearCaja()
    const b = crearCaja()
    a.guardar('A')
    expect(b.ver()).toBe('') // b tiene su propia caja
  })

  it('6) crearContadorObj comparte un número entre incrementar y valor', () => {
    const c = crearContadorObj()
    c.incrementar()
    c.incrementar()
    expect(c.valor()).toBe(2)
  })

  /* ── BLOQUE D — capstone: procesador con contador ── */

  it('7) crearProcesador procesa y cuenta los usos', () => {
    const proc = crearProcesador([(n) => n + 1, (n) => n * 2])
    expect(proc.ejecutar(3)).toBe(8)
    expect(proc.ejecutar(10)).toBe(22)
    expect(proc.vecesUsado()).toBe(2)
  })
})
