import { describe, it, expect } from 'vitest'
import {
  describir,
  longitud,
  aMayusculas,
  sumarSiNumeros,
  formatear,
} from './exercise-06'

describe('01-tipos-basicos / exercise-06 — unknown vs any', () => {
  /* ── BLOQUE A — unknown + typeof ── */

  it('1) describir distingue string, number y "otro"', () => {
    expect(describir('hola')).toBe('texto: HOLA')
    expect(describir(5)).toBe('número: 5')
    expect(describir(true)).toBe('otro')
  })

  it('2) longitud: string/array → length, resto → -1', () => {
    expect(longitud('hola')).toBe(4)
    expect(longitud([1, 2, 3])).toBe(3)
    expect(longitud(5)).toBe(-1)
  })

  /* ── BLOQUE B — el peligro de any ── */

  it('3) aMayusculas solo actúa sobre strings', () => {
    expect(aMayusculas('hola')).toBe('HOLA')
    expect(aMayusculas(5)).toBe('')
  })

  it('4) sumarSiNumeros suma solo números (no concatena strings)', () => {
    expect(sumarSiNumeros(2, 3)).toBe(5)
    expect(sumarSiNumeros('2', '3')).toBe(0)
    expect(sumarSiNumeros(2, '3')).toBe(0)
  })

  /* ── BLOQUE C — capstone formateador ── */

  it('5) formatear etiqueta por tipo y tiene salida segura', () => {
    expect(formatear('hola')).toBe('texto: hola')
    expect(formatear(5)).toBe('número: 5')
    expect(formatear(true)).toBe('bool: true')
    expect(formatear(null)).toBe('?')
    expect(formatear({})).toBe('?')
  })
})
