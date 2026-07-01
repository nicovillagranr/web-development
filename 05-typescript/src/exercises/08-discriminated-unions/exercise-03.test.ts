import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  estaCargando,
  nombreSiExito,
  edadOcero,
  mensajeEstado,
  resumenEstado,
} from './exercise-03'

const cargando = { estado: 'cargando' } as const
const exito = { estado: 'exito', usuario: { nombre: 'Ana', edad: 30 } } as const
const error = { estado: 'error', mensaje: 'sin conexión' } as const

describe('exercise-03 — máquina de estados cargando/exito/error', () => {
  // BLOQUE A
  it('A1) estaCargando true solo en "cargando"', () => {
    expect(estaCargando(cargando)).toBe(true)
    expect(estaCargando(exito)).toBe(false)
    expect(estaCargando(error)).toBe(false)
  })

  it('A2) nombreSiExito devuelve el nombre o null', () => {
    expect(nombreSiExito(exito)).toBe('Ana')
    expect(nombreSiExito(cargando)).toBeNull()
    expect(nombreSiExito(error)).toBeNull()
    expectTypeOf(nombreSiExito).returns.toEqualTypeOf<string | null>()
  })

  it('A3) edadOcero devuelve la edad o 0', () => {
    expect(edadOcero(exito)).toBe(30)
    expect(edadOcero(cargando)).toBe(0)
    expect(edadOcero(error)).toBe(0)
  })

  // BLOQUE B
  it('B1) mensajeEstado cubre los tres estados', () => {
    expect(mensajeEstado(cargando)).toBe('Cargando…')
    expect(mensajeEstado(exito)).toBe('Hola, Ana')
    expect(mensajeEstado(error)).toBe('Error: sin conexión')
  })

  it('B2) resumenEstado (con never) cubre los tres estados', () => {
    expect(resumenEstado(cargando)).toBe('⏳ esperando')
    expect(resumenEstado(exito)).toBe('✅ Ana (30)')
    expect(resumenEstado(error)).toBe('❌ sin conexión')
    expectTypeOf(resumenEstado).returns.toEqualTypeOf<string>()
  })
})
