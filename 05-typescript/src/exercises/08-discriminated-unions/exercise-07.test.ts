import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  aplicar,
  etiquetaAccion,
  esDestructiva,
  aplicarTodas,
  aplicarConHistorial,
} from './exercise-07'
import type { EstadoContador } from './exercise-07'

describe('exercise-07 — unión de acciones (patrón reducer)', () => {
  // BLOQUE A
  it('A1) aplicar es un reducer correcto', () => {
    expect(aplicar(5, { tipo: 'incrementar' })).toBe(6)
    expect(aplicar(5, { tipo: 'decrementar' })).toBe(4)
    expect(aplicar(5, { tipo: 'sumar', cantidad: 10 })).toBe(15)
    expect(aplicar(5, { tipo: 'reiniciar' })).toBe(0)
    expectTypeOf(aplicar).returns.toEqualTypeOf<number>()
  })

  it('A2) etiquetaAccion describe cada acción', () => {
    expect(etiquetaAccion({ tipo: 'incrementar' })).toBe('+1')
    expect(etiquetaAccion({ tipo: 'decrementar' })).toBe('-1')
    expect(etiquetaAccion({ tipo: 'sumar', cantidad: 7 })).toBe('+7')
    expect(etiquetaAccion({ tipo: 'reiniciar' })).toBe('reset')
  })

  it('A3) esDestructiva true solo en reiniciar', () => {
    expect(esDestructiva({ tipo: 'reiniciar' })).toBe(true)
    expect(esDestructiva({ tipo: 'sumar', cantidad: 3 })).toBe(false)
    expect(esDestructiva({ tipo: 'incrementar' })).toBe(false)
  })

  // BLOQUE B
  it('B1) aplicarTodas reduce una lista de acciones', () => {
    expect(
      aplicarTodas(0, [
        { tipo: 'incrementar' },
        { tipo: 'sumar', cantidad: 5 },
        { tipo: 'decrementar' },
      ]),
    ).toBe(5)
    expect(aplicarTodas(10, [{ tipo: 'reiniciar' }, { tipo: 'incrementar' }])).toBe(1)
    expect(aplicarTodas(3, [])).toBe(3)
  })

  it('B2) aplicarConHistorial actualiza contador e historial sin mutar', () => {
    const inicial: EstadoContador = { contador: 0, historial: [] }
    const tras1 = aplicarConHistorial(inicial, { tipo: 'incrementar' })
    expect(tras1).toEqual({ contador: 1, historial: ['+1'] })
    // no mutó el original
    expect(inicial).toEqual({ contador: 0, historial: [] })
    const tras2 = aplicarConHistorial(tras1, { tipo: 'sumar', cantidad: 4 })
    expect(tras2).toEqual({ contador: 5, historial: ['+1', '+4'] })
  })
})
