import { describe, it, expect } from 'vitest'
import { colorHex, etiquetaEstado, descuentoPorPlan, esActivo, badge } from './exercise-04'

describe('05-unions / exercise-04 — uniones de literales → valor', () => {
  it('1) colorHex', () => {
    expect(colorHex('rojo')).toBe('#ff0000')
    expect(colorHex('azul')).toBe('#0000ff')
  })
  it('2) etiquetaEstado', () => {
    expect(etiquetaEstado('activo')).toBe('Activo')
    expect(etiquetaEstado('pendiente')).toBe('Pendiente')
  })
  it('3) descuentoPorPlan', () => {
    expect(descuentoPorPlan('pro')).toBe(10)
    expect(descuentoPorPlan('free')).toBe(0)
  })
  it('4) esActivo', () => {
    expect(esActivo('activo')).toBe(true)
    expect(esActivo('pendiente')).toBe(false)
  })
  it('5) badge', () => {
    expect(badge('activo')).toBe('Activo (activo)')
  })
})
