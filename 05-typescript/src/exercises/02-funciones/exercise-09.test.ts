import { describe, it, expect } from 'vitest'
import {
  aplicarPasos,
  aplicarPasosTexto,
  pipe,
  pipeTexto,
  procesarCada,
} from './exercise-09'

describe('02-funciones / exercise-09 — pipe (lista de funciones)', () => {
  /* ── BLOQUE A — aplicar pasos a un dato ── */

  it('1) aplicarPasos pasa el número por todos los pasos', () => {
    expect(aplicarPasos(3, [(n) => n + 1, (n) => n * 2, (n) => n - 1])).toBe(7)
    expect(aplicarPasos(3, [])).toBe(3) // lista vacía → sale igual
  })

  it('2) aplicarPasosTexto encadena transformaciones de string', () => {
    expect(aplicarPasosTexto('hola', [(s) => s.toUpperCase(), (s) => s + '!'])).toBe('HOLA!')
  })

  /* ── BLOQUE B — devolver la tubería montada ── */

  it('3) pipe devuelve una función que aplica todos los pasos', () => {
    const p = pipe([(n) => n + 1, (n) => n * 2])
    expect(p(3)).toBe(8)
    expect(p(10)).toBe(22)
  })

  it('4) pipeTexto monta una tubería de strings', () => {
    const p = pipeTexto([(s) => s.trim(), (s) => s.toUpperCase()])
    expect(p('  hi ')).toBe('HI')
  })

  /* ── BLOQUE C — capstone: la tubería sobre cada elemento ── */

  it('5) procesarCada aplica los pasos a cada número', () => {
    expect(procesarCada([1, 2, 3], [(n) => n + 1, (n) => n * 10])).toEqual([20, 30, 40])
  })
})
