import { describe, it, expect, vi } from 'vitest'
import {
  guardarEnLista,
  ejecutar,
  entregar,
  entregarPelado,
  entregarEnvuelto,
  entregarSacandoDelObjeto,
} from './exercise-01'

describe('10-eventos-formularios / exercise-01 — entregar una función no es ejecutarla', () => {
  it('1) guardarEnLista — la guarda SIN cocinarla', () => {
    const receta = vi.fn(() => 'café')
    const lista = guardarEnLista(receta)
    expect(lista).toHaveLength(1)
    expect(receta).not.toHaveBeenCalled() // guardar no es cocinar
    expect(lista[0]?.()).toBe('café') // y aquí, al ponerle (), se cocina
  })

  it('2) ejecutar — cocina y devuelve el plato', () => {
    expect(ejecutar(() => 'café')).toBe('café')
  })

  it('3) entregar — devuelve el papel, y el papel todavía sirve', () => {
    const receta = vi.fn(() => 'café')
    const devuelta = entregar(receta)
    expect(receta).not.toHaveBeenCalled() // salió el papel, no el plato
    expect(devuelta()).toBe('café') // los () de aquí son los que cocinan
    expect(receta).toHaveBeenCalledTimes(1)
  })

  it('4) entregarPelado — la entrega tal cual y la llama llamaConTexto', () => {
    const espia = vi.fn()
    entregarPelado(espia)
    expect(espia).toHaveBeenCalledWith('click')
  })

  it('5) entregarEnvuelto — el número sale del texto que llega', () => {
    const espia = vi.fn()
    entregarEnvuelto(espia)
    expect(espia).toHaveBeenCalledWith(5) // "click".length
  })

  it('6) entregarSacandoDelObjeto — saca del objeto el campo que hace falta', () => {
    const espia = vi.fn()
    entregarSacandoDelObjeto(espia)
    expect(espia).toHaveBeenCalledWith('click')
  })
})
