import { describe, it, expect } from 'vitest'
import {
  publicar,
  confirmar,
  crearBorrador,
  crearPedido,
  completar,
} from './exercise-10'

describe('07-utility-types / exercise-10 — Required<T>', () => {
  /* ── BLOQUE A — Required en el parámetro (exigir el objeto completo) ── */

  it('1) publicar exige un borrador completo', () => {
    expect(publicar({ titulo: 'Hola', cuerpo: 'texto', autor: 'Ana' })).toBe('Hola por Ana')
    // @ts-expect-error — Required exige TODOS los campos; faltan cuerpo y autor
    publicar({ titulo: 'Hola' })
  })

  it('2) confirmar exige un pedido completo', () => {
    expect(confirmar({ producto: 'Té', cantidad: 3 })).toBe('3x Té')
    // @ts-expect-error — falta cantidad
    confirmar({ producto: 'Té' })
  })

  /* ── BLOQUE B — Required en el retorno (sale completo) ── */

  it('3) crearBorrador devuelve un borrador completo', () => {
    expect(crearBorrador('Hola', 'texto', 'Ana')).toEqual({
      titulo: 'Hola',
      cuerpo: 'texto',
      autor: 'Ana',
    })
  })

  it('4) crearPedido devuelve un pedido completo', () => {
    expect(crearPedido('Té', 3)).toEqual({ producto: 'Té', cantidad: 3 })
  })

  /* ── BLOQUE C — capstone: completar un borrador con defaults ── */

  it('5) completar usa el valor del borrador y rellena los huecos con defaults', () => {
    const defaults = { titulo: 'X', cuerpo: 'C', autor: 'A' }
    expect(completar({ titulo: 'Mío' }, defaults)).toEqual({
      titulo: 'Mío',
      cuerpo: 'C',
      autor: 'A',
    })
    expect(completar({}, defaults)).toEqual({ titulo: 'X', cuerpo: 'C', autor: 'A' })
    expect(completar({ cuerpo: 'Nuevo', autor: 'Yo' }, defaults)).toEqual({
      titulo: 'X',
      cuerpo: 'Nuevo',
      autor: 'Yo',
    })
  })
})
