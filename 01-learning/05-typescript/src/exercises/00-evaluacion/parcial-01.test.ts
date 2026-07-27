/* CORRECCIÓN del Parcial 01.
 * ⚠️ NO abras este archivo hasta haber terminado el parcial: contiene las respuestas.
 *
 * Reparto de corrección:
 *   - Preguntas de TIPO (A1–A3, D1, D2, E1) → se validan con `pnpm typecheck`.
 *     En `pnpm test:run` aparecen como "passed" aunque estén mal: las
 *     comprobaciones de tipo (`expectTypeOf`, `@ts-expect-error`) se borran en
 *     runtime. La nota real de esas sale de typecheck.
 *   - Comportamiento (B1, B2, C1, C2) y opción múltiple (B3, D3) → `pnpm test:run`.
 */
import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  formatear,
  area,
  B3,
  aplicaDosVeces,
  etiquetas,
  tomar,
  columna,
  D3,
  maximoPor,
} from './parcial-01'
import type { A1, A2, A3 } from './parcial-01'

describe('PARCIAL 01 — diagnóstico FASE 1', () => {
  // ── PARTE A — inferencia (typecheck) ──────────────────────────────────────
  it('A1) configA.mode se ensancha a string', () => {
    expectTypeOf<A1>().toEqualTypeOf<string>()
  })
  it('A2) con `as const`, mode es el literal "dark"', () => {
    expectTypeOf<A2>().toEqualTypeOf<'dark'>()
  })
  it('A3) acceso por índice da `number | undefined`', () => {
    expectTypeOf<A3>().toEqualTypeOf<number | undefined>()
  })

  // ── PARTE B — uniones y narrowing ─────────────────────────────────────────
  it('B1) formatear estrecha string | number', () => {
    expect(formatear('  HOLA ')).toBe('hola')
    expect(formatear(' Mix ED ')).toBe('mix ed')
    expect(formatear(3.5)).toBe('3.50')
    expect(formatear(7)).toBe('7.00')
  })
  it('B2) area cubre las tres figuras (con exhaustividad)', () => {
    expect(area({ tipo: 'circulo', radio: 2 })).toBeCloseTo(Math.PI * 4)
    expect(area({ tipo: 'rectangulo', ancho: 3, alto: 4 })).toBe(12)
    expect(area({ tipo: 'cuadrado', lado: 5 })).toBe(25)
  })
  it('B3) la opción con narrowing roto', () => {
    expect(B3).toBe('b')
  })

  // ── PARTE C — funciones y arrays ──────────────────────────────────────────
  it('C1) aplicaDosVeces aplica la fn dos veces a cada elemento', () => {
    expect(aplicaDosVeces([1, 2], (n) => n + 10)).toEqual([21, 22])
    expect(aplicaDosVeces([3], (n) => n * 2)).toEqual([12])
    expect(aplicaDosVeces([], (n) => n)).toEqual([])
    expectTypeOf(aplicaDosVeces([1], (n) => n)).toEqualTypeOf<number[]>()
  })
  it('C2) etiquetas devuelve string[] aunque id sea number', () => {
    expect(etiquetas([{ id: 1 }, { id: 2 }])).toEqual(['#1', '#2'])
    expectTypeOf(etiquetas([{ id: 1 }])).toEqualTypeOf<string[]>()
  })

  // ── PARTE D — genéricos, keyof, T[K] ──────────────────────────────────────
  it('D1) tomar conserva el tipo exacto y rechaza claves inexistentes', () => {
    const u = { nombre: 'Ana', edad: 30 }
    expect(tomar(u, 'nombre')).toBe('Ana')
    expect(tomar(u, 'edad')).toBe(30)
    expectTypeOf(tomar(u, 'nombre')).toEqualTypeOf<string>()
    expectTypeOf(tomar(u, 'edad')).toEqualTypeOf<number>()
    // @ts-expect-error "telefono" no es una llave de u
    tomar(u, 'telefono')
  })
  it('D2) columna saca la columna conservando su tipo', () => {
    expect(columna([{ v: 1 }, { v: 2 }], 'v')).toEqual([1, 2])
    expectTypeOf(columna([{ v: 1 }], 'v')).toEqualTypeOf<number[]>()
    expectTypeOf(columna([{ s: 'a' }], 's')).toEqualTypeOf<string[]>()
  })
  it('D3) la firma con genérico innecesario', () => {
    expect(D3).toBe('b')
  })

  // ── PARTE E — debugging de tipos ──────────────────────────────────────────
  it('E1) maximoPor encuentra el mayor por una clave NUMÉRICA', () => {
    const arr = [
      { n: 'a', v: 1 },
      { n: 'b', v: 9 },
      { n: 'c', v: 5 },
    ]
    expect(maximoPor(arr, 'v')).toEqual({ n: 'b', v: 9 })
    const vacio: { n: string; v: number }[] = []
    expect(maximoPor(vacio, 'v')).toBeUndefined()
    // @ts-expect-error "n" no es una propiedad numérica, no se puede comparar con >
    maximoPor(arr, 'n')
  })
})
