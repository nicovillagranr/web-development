import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  aplicar,
  etiquetaAccion,
  esDestructiva,
  aplicarTodas,
  aplicarConHistorial,
  leerContador,
  agregarEtiqueta,
  nuevoEstado,
  avanzarManual,
  aplicarConHistorialBis,
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

  // BLOQUE C — escalera de refuerzo del capstone
  it('C1) leerContador saca el número de dentro del estado', () => {
    expect(leerContador({ contador: 7, historial: ['a'] })).toBe(7)
    expect(leerContador({ contador: 0, historial: [] })).toBe(0)
  })

  it('C2) agregarEtiqueta añade al final sin mutar el original', () => {
    expect(agregarEtiqueta(['+1'], '+2')).toEqual(['+1', '+2'])
    expect(agregarEtiqueta([], 'reset')).toEqual(['reset'])
    const original = ['+1']
    agregarEtiqueta(original, '+2')
    expect(original).toEqual(['+1']) // no mutó el original
  })

  it('C3) nuevoEstado construye el objeto con sus dos campos', () => {
    expect(nuevoEstado(5, ['+5'])).toEqual({ contador: 5, historial: ['+5'] })
    expect(nuevoEstado(0, [])).toEqual({ contador: 0, historial: [] })
  })

  it('C4) avanzarManual pone el contador dado y añade la etiqueta al historial', () => {
    expect(avanzarManual({ contador: 1, historial: ['+1'] }, 3, '+2')).toEqual({
      contador: 3,
      historial: ['+1', '+2'],
    })
    const inicial: EstadoContador = { contador: 1, historial: ['+1'] }
    avanzarManual(inicial, 3, '+2')
    expect(inicial).toEqual({ contador: 1, historial: ['+1'] }) // no mutó
  })

  it('C5) aplicarConHistorialBis = el capstone reconstruido', () => {
    expect(
      aplicarConHistorialBis({ contador: 0, historial: [] }, { tipo: 'incrementar' }),
    ).toEqual({ contador: 1, historial: ['+1'] })
    expect(
      aplicarConHistorialBis({ contador: 4, historial: ['+4'] }, { tipo: 'sumar', cantidad: 3 }),
    ).toEqual({ contador: 7, historial: ['+4', '+3'] })
    const inicial: EstadoContador = { contador: 0, historial: [] }
    aplicarConHistorialBis(inicial, { tipo: 'incrementar' })
    expect(inicial).toEqual({ contador: 0, historial: [] }) // no mutó
  })
})
