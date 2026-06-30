import { describe, it, expect } from 'vitest'
import {
  aplicarPasosConFor,
  aplicarPasosConReduce,
  aplicarYregistrar,
  aplicarPasos,
  aplicarPasosTexto,
  pipe,
  pipeTexto,
  procesarCada,
} from './exercise-09'

describe('02-funciones / exercise-09 — pipe (lista de funciones) [reforzado]', () => {
  /* ── BLOQUE 0 — el carry: del bucle al reduce, y apuntar intermedios ── */

  it('1) aplicarPasosConFor arrastra el dato con un bucle', () => {
    expect(aplicarPasosConFor(3, [(n) => n + 1, (n) => n * 2, (n) => n - 1])).toBe(7)
    expect(aplicarPasosConFor(3, [])).toBe(3) // sin pasos → sale igual
  })

  it('2) aplicarPasosConReduce hace lo mismo con reduce', () => {
    expect(aplicarPasosConReduce(3, [(n) => n + 1, (n) => n * 2, (n) => n - 1])).toBe(7)
    expect(aplicarPasosConReduce(3, [])).toBe(3)
  })

  it('3) aplicarYregistrar apunta cada resultado intermedio', () => {
    const reg: number[] = []
    expect(aplicarYregistrar(3, [(n) => n + 1, (n) => n * 2], reg)).toBe(8)
    expect(reg).toEqual([4, 8])
  })

  /* ── BLOQUE A — aplicar pasos a un dato ── */

  it('4) aplicarPasos pasa el número por todos los pasos', () => {
    expect(aplicarPasos(3, [(n) => n + 1, (n) => n * 2, (n) => n - 1])).toBe(7)
    expect(aplicarPasos(3, [])).toBe(3) // lista vacía → sale igual
  })

  it('5) aplicarPasosTexto encadena transformaciones de string', () => {
    expect(aplicarPasosTexto('hola', [(s) => s.toUpperCase(), (s) => s + '!'])).toBe('HOLA!')
  })

  /* ── BLOQUE B — devolver la tubería montada ── */

  it('6) pipe devuelve una función que aplica todos los pasos', () => {
    const p = pipe([(n) => n + 1, (n) => n * 2])
    expect(p(3)).toBe(8)
    expect(p(10)).toBe(22)
  })

  it('7) pipeTexto monta una tubería de strings', () => {
    const p = pipeTexto([(s) => s.trim(), (s) => s.toUpperCase()])
    expect(p('  hi ')).toBe('HI')
  })

  /* ── BLOQUE C — capstone: la tubería sobre cada elemento ── */

  it('8) procesarCada aplica los pasos a cada número', () => {
    expect(procesarCada([1, 2, 3], [(n) => n + 1, (n) => n * 10])).toEqual([20, 30, 40])
  })
})
