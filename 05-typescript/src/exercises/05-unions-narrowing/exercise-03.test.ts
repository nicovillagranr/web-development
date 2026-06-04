import { describe, it, expect } from 'vitest'
import {
  largo,
  doble,
  saludar,
  describir,
  contactar,
  sonido,
  area,
  canal,
  quien,
  procesar,
} from './exercise-03'

describe('exercise-03 — narrowing con objetos y null', () => {
  // BLOQUE A — descartar null
  it('A1) largo devuelve length o 0 si null', () => {
    expect(largo('hola')).toBe(4)
    expect(largo('')).toBe(0)
    expect(largo(null)).toBe(0)
  })

  it('A2) doble devuelve el doble o 0 si null', () => {
    expect(doble(5)).toBe(10)
    expect(doble(0)).toBe(0)
    expect(doble(null)).toBe(0)
  })

  // BLOQUE B — la trampa typeof null
  it('B1) saludar lee nombre o "anónimo", sin dejar pasar null', () => {
    expect(saludar({ nombre: 'Ana' })).toBe('Ana')
    expect(saludar(null)).toBe('anónimo')
  })

  it('B2) describir maneja number, string y null', () => {
    expect(describir(3)).toBe('3')
    expect(describir('hola')).toBe('HOLA')
    expect(describir(null)).toBe('vacío')
  })

  // BLOQUE C — el operador in
  it('C1) contactar distingue email de teléfono con `in`', () => {
    expect(contactar({ email: 'a@b.c' })).toBe('a@b.c')
    expect(contactar({ telefono: '123' })).toBe('123')
  })

  it('C2) sonido distingue ladrido de maullido con `in`', () => {
    expect(sonido({ ladrido: 'Guau' })).toBe('Guau')
    expect(sonido({ maullido: 'Miau' })).toBe('Miau')
  })

  // BLOQUE D — más práctica con in
  it('D1) area calcula según la variante de Caja', () => {
    expect(area({ lado: 3 })).toBe(9)
    expect(area({ ancho: 2, alto: 5 })).toBe(10)
  })

  it('D2) canal encadena `in` con 3 variantes', () => {
    expect(canal({ email: 'a@b.c' })).toBe('a@b.c')
    expect(canal({ sms: 'hola' })).toBe('hola')
    expect(canal({ push: 'ping' })).toBe('ping')
  })

  it('D3) quien distingue rol aunque compartan `nombre`', () => {
    expect(quien({ nombre: 'Ana', rolAdmin: 'root' })).toBe('Ana: root')
    expect(quien({ nombre: 'Leo', rolCliente: 'premium' })).toBe('Leo: premium')
  })

  it('D4) procesar combina null + `in`', () => {
    expect(procesar(null)).toBe('sin respuesta')
    expect(procesar({ ok: 'listo' })).toBe('OK: listo')
    expect(procesar({ error: 'boom' })).toBe('ERR: boom')
  })
})
