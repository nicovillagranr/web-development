import { describe, it, expect } from 'vitest'
import {
  esAdmin,
  recargoTalla,
  etiquetaRol,
  esTallaGrande,
  nombresPorRol,
} from './exercise-08'

describe('01-tipos-basicos / exercise-08 — as const + (typeof LISTA)[number]', () => {
  /* ── BLOQUE A — unión derivada como parámetro ── */

  it('1) esAdmin es true solo para "admin"', () => {
    expect(esAdmin('admin')).toBe(true)
    expect(esAdmin('editor')).toBe(false)
    expect(esAdmin('lector')).toBe(false)
    // @ts-expect-error — "jefe" no está en ROLES: la unión derivada lo rechaza
    esAdmin('jefe')
  })

  it('2) recargoTalla cobra 500 solo a la XL', () => {
    expect(recargoTalla('XL')).toBe(500)
    expect(recargoTalla('M')).toBe(0)
    // @ts-expect-error — "XXL" no es una talla del menú
    recargoTalla('XXL')
  })

  /* ── BLOQUE B — la unión como menú para mapear ── */

  it('3) etiquetaRol da el nombre largo de cada rol', () => {
    expect(etiquetaRol('admin')).toBe('Administrador')
    expect(etiquetaRol('editor')).toBe('Editor')
    expect(etiquetaRol('lector')).toBe('Lector')
    // @ts-expect-error — rol inexistente
    etiquetaRol('root')
  })

  it('4) esTallaGrande es true para L y XL', () => {
    expect(esTallaGrande('S')).toBe(false)
    expect(esTallaGrande('M')).toBe(false)
    expect(esTallaGrande('L')).toBe(true)
    expect(esTallaGrande('XL')).toBe(true)
  })

  /* ── BLOQUE C — capstone: filtrar por valor de la unión ── */

  it('5) nombresPorRol filtra por rol y devuelve nombres', () => {
    const usuarios = [
      { nombre: 'Ana', rol: 'admin' as const },
      { nombre: 'Leo', rol: 'lector' as const },
      { nombre: 'Mia', rol: 'admin' as const },
    ]
    expect(nombresPorRol(usuarios, 'admin')).toEqual(['Ana', 'Mia'])
    expect(nombresPorRol(usuarios, 'editor')).toEqual([])
  })
})
