/* CORRECCIÓN del Parcial 03 — cazador de bugs.
 * ⚠️ NO abras este archivo hasta haber terminado.
 *
 * Cómo corrige: no comprueba que las funciones estén bien (están rotas a
 * propósito y se quedan así). Comprueba que la constante que escribió el
 * alumno DESTAPA el fallo — que la entrada elegida hace mentir, reventar o
 * ensuciar a la función. Por eso cada test lleva dos mitades: una dice "esta
 * entrada es del tipo que pide el ítem", y la otra "y con ella la función
 * falla de verdad".
 */
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import {
  primero,
  P3_01_ENTRADA,
  conReserva,
  P3_02_ENTRADA,
  aPreview,
  P3_03_CLAVE_FILTRADA,
  describir,
  P3_04_ENTRADA,
  aNumeros,
  P3_05_ENTRADA,
  masBarato,
  P3_06_ENTRADA,
  ordenarPorPrecio,
  P3_07_ENTRADA,
  esNumero,
  formatear,
  P3_08_ENTRADA,
  fusionar,
  AJUSTES_BASE,
  P3_09_PARCHE,
  incluye,
  CATALOGO,
  P3_10_ENTRADA,
  Aviso,
  P3_11_ENTRADA,
} from './parcial-03'

describe('PARCIAL 03 — cazador de bugs', () => {
  it('01) primero() devuelve undefined prometiendo T', () => {
    expect(primero(P3_01_ENTRADA)).toBeUndefined()
  })

  it('02) conReserva() ignora un valor que sí existe', () => {
    // el valor pasado existe, así que la función DEBERÍA devolverlo tal cual
    expect(conReserva(P3_02_ENTRADA, 99)).not.toBe(P3_02_ENTRADA)
  })

  it('03) la preview arrastra una propiedad que debía quedarse fuera', () => {
    const articulo = { id: 1, titulo: 'Hola', cuerpo: 'texto largo' }
    // la clave señalada no es una de las dos que SÍ debe llevar la preview…
    expect(['id', 'titulo']).not.toContain(P3_03_CLAVE_FILTRADA)
    // …y sin embargo ahí está
    expect(Object.keys(aPreview(articulo))).toContain(P3_03_CLAVE_FILTRADA)
  })

  it('04) describir() responde con el comodín del default', () => {
    expect(describir(P3_04_ENTRADA)).toBe('sin datos')
  })

  it('05) aNumeros() produce basura', () => {
    // La entrada tiene que ser de textos que POR SÍ SOLOS son números válidos.
    // Si metes "a", el NaN no lo provoca el fallo de esta función: lo provoca la
    // "a", y saldría igual con una conversión bien escrita. No demuestra nada.
    expect(P3_05_ENTRADA.length).toBeGreaterThan(1)
    expect(
      P3_05_ENTRADA.every((t) => t.trim() !== '' && !Number.isNaN(Number(t))),
    ).toBe(true)
    expect(aNumeros(P3_05_ENTRADA).some(Number.isNaN)).toBe(true)
  })

  it('06) masBarato() lanza', () => {
    expect(() => masBarato(P3_06_ENTRADA)).toThrow()
  })

  it('07) ordenarPorPrecio() destroza la lista original', () => {
    const antes = P3_07_ENTRADA.map((p) => p.id)
    ordenarPorPrecio(P3_07_ENTRADA)
    const despues = P3_07_ENTRADA.map((p) => p.id)
    expect(despues).not.toEqual(antes)
  })

  it('08) el portero deja pasar algo que no es un número', () => {
    expect(typeof P3_08_ENTRADA).not.toBe('number')
    expect(esNumero(P3_08_ENTRADA)).toBe(true)
    expect(() => formatear(P3_08_ENTRADA)).toThrow()
  })

  it('09) el parche se pide y no se aplica', () => {
    // el parche tiene que pedir un cambio REAL respecto a la base
    const pideCambio =
      (P3_09_PARCHE.tema !== undefined && P3_09_PARCHE.tema !== AJUSTES_BASE.tema) ||
      (P3_09_PARCHE.idioma !== undefined && P3_09_PARCHE.idioma !== AJUSTES_BASE.idioma) ||
      (P3_09_PARCHE.fuente !== undefined && P3_09_PARCHE.fuente !== AJUSTES_BASE.fuente)
    expect(pideCambio).toBe(true)
    // y aun así el resultado sale idéntico a la base
    expect(fusionar(AJUSTES_BASE, P3_09_PARCHE)).toEqual(AJUSTES_BASE)
  })

  it('10) incluye() no encuentra algo que sí está', () => {
    expect(CATALOGO).toContainEqual(P3_10_ENTRADA)
    expect(incluye(CATALOGO, P3_10_ENTRADA)).toBe(false)
  })

  it('11) Aviso no pinta el span y aun así ensucia la pantalla', () => {
    const { container } = render(<Aviso cantidad={P3_11_ENTRADA} />)
    expect(container.querySelector('span')).toBeNull()
    expect(container.textContent).not.toBe('')
  })
})
