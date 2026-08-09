import { describe, it, expect, vi } from 'vitest'
import {
  guardarEnLista,
  ejecutar,
  entregar,
  entregarPelado,
  entregarEnvuelto,
  entregarSacandoDelObjeto,
  avisarEnMayusculas,
  avisarNombre,
  avisarEdad,
  avisarAlias,
  avisarResumen,
  listarConPosicion,
  avisarCadaColor,
  entregarQueRetorna,
} from './exercise-01'

describe('10-eventos-formularios / exercise-01 — entregar una función no es ejecutarla', () => {
  it('1) guardarEnLista — guarda el VALOR función, sin llamarla', () => {
    const receta = vi.fn(() => 'café')
    const lista = guardarEnLista(receta)
    expect(lista).toHaveLength(1)
    expect(receta).not.toHaveBeenCalled() // guardar no es llamar
    expect(lista[0]?.()).toBe('café') // y aquí, al ponerle (), sí se llama
  })

  it('2) ejecutar — la llama y devuelve lo que salga', () => {
    expect(ejecutar(() => 'café')).toBe('café')
  })

  it('3) entregar — la devuelve sin llamar, y sigue sirviendo', () => {
    const receta = vi.fn(() => 'café')
    const devuelta = entregar(receta)
    expect(receta).not.toHaveBeenCalled() // salió la función, no su retorno
    expect(devuelta()).toBe('café') // los () de aquí son los que llaman
    expect(receta).toHaveBeenCalledTimes(1)
  })

  it('4) entregarPelado — las firmas encajan: se entrega pelada y la llama llamaConTexto', () => {
    const espia = vi.fn()
    entregarPelado(espia)
    expect(espia).toHaveBeenCalledTimes(1)
    expect(espia).toHaveBeenCalledWith('click') // el argumento lo pone quien llama
  })

  it('5) entregarEnvuelto — no encajan: el número sale del texto que llega', () => {
    const espia = vi.fn()
    entregarEnvuelto(espia)
    expect(espia).toHaveBeenCalledWith(5) // "click".length, no un 5 inventado
  })

  it('6) entregarSacandoDelObjeto — llega la caja, se entrega el campo', () => {
    const espia = vi.fn()
    entregarSacandoDelObjeto(espia)
    expect(espia).toHaveBeenCalledWith('click') // el campo
    expect(espia).not.toHaveBeenCalledWith({ type: 'click' }) // no la caja
  })
})

describe('BLOQUE R — refuerzo: el envoltorio como enrutador', () => {
  it('7) avisarEnMayusculas — el envoltorio transforma, no solo reenvía', () => {
    const espia = vi.fn()
    avisarEnMayusculas(espia)
    expect(espia).toHaveBeenCalledWith('CLICK')
  })

  it('8) avisarNombre — del Usuario sale el campo que encaja con el destino', () => {
    const espia = vi.fn()
    avisarNombre(espia)
    expect(espia).toHaveBeenCalledWith('Nico')
  })

  it('9) avisarEdad — mismo objeto, otra pieza: la firma decide cuál', () => {
    const espia = vi.fn()
    avisarEdad(espia)
    expect(espia).toHaveBeenCalledWith(30)
  })

  it('10) avisarAlias — el campo está dentro de otra caja: dos puntos', () => {
    const espia = vi.fn()
    avisarAlias(espia)
    expect(espia).toHaveBeenCalledWith('@nico')
    expect(espia).not.toHaveBeenCalledWith({ alias: '@nico' }) // no la caja intermedia
  })

  it('11) avisarResumen — un envoltorio puede combinar varias piezas', () => {
    const espia = vi.fn()
    avisarResumen(espia)
    expect(espia).toHaveBeenCalledWith('Nico (30)')
  })

  it('12) listarConPosicion — el índice de .forEach empieza en 0, la posición en 1', () => {
    const espia = vi.fn()
    listarConPosicion(espia)
    expect(espia).toHaveBeenCalledTimes(3)
    expect(espia).toHaveBeenNthCalledWith(1, '1. rojo')
    expect(espia).toHaveBeenNthCalledWith(2, '2. verde')
    expect(espia).toHaveBeenNthCalledWith(3, '3. azul')
  })

  it('13) avisarCadaColor — declarar menos parámetros de los que pasan es legal', () => {
    const espia = vi.fn()
    avisarCadaColor(espia)
    expect(espia).toHaveBeenCalledTimes(3)
    expect(espia).toHaveBeenNthCalledWith(1, 'rojo') // el índice y el array se descartan
    expect(espia).toHaveBeenNthCalledWith(3, 'azul')
  })

  it('14) entregarQueRetorna — void acepta el retorno, pero no te protege de él', () => {
    const espia = vi.fn((t: string) => t.length)
    entregarQueRetorna(espia)
    expect(espia).toHaveBeenCalledWith('click')
    expect(espia).toHaveReturnedWith(5) // se llamó de verdad, y devolvió
  })
})
