import { describe, it, expect } from 'vitest'
import {
  nombreTipo,
  areaPlana,
  etiqueta,
  areaTotal,
  perimetro,
} from './exercise-02'

describe('exercise-02 — discriminante por propiedad + never', () => {
  // BLOQUE A
  it('A1) nombreTipo devuelve la etiqueta discriminante', () => {
    expect(nombreTipo({ tipo: 'circulo', radio: 2 })).toBe('circulo')
    expect(nombreTipo({ tipo: 'cuadrado', lado: 5 })).toBe('cuadrado')
  })

  it('A2) areaPlana estrecha leyendo la propiedad', () => {
    expect(areaPlana({ tipo: 'rectangulo', ancho: 3, alto: 4 })).toBe(12)
    expect(areaPlana({ tipo: 'cuadrado', lado: 5 })).toBe(25)
  })

  it('A3) etiqueta usa switch sobre las tres variantes', () => {
    expect(etiqueta({ tipo: 'circulo', radio: 1 })).toBe('Círculo')
    expect(etiqueta({ tipo: 'rectangulo', ancho: 1, alto: 1 })).toBe('Rectángulo')
    expect(etiqueta({ tipo: 'cuadrado', lado: 1 })).toBe('Cuadrado')
  })

  // BLOQUE B
  it('B1) areaTotal cubre las tres figuras', () => {
    expect(areaTotal({ tipo: 'circulo', radio: 2 })).toBeCloseTo(Math.PI * 4)
    expect(areaTotal({ tipo: 'rectangulo', ancho: 3, alto: 4 })).toBe(12)
    expect(areaTotal({ tipo: 'cuadrado', lado: 5 })).toBe(25)
  })

  it('B2) perimetro cubre las cuatro figuras (incluida triangulo)', () => {
    expect(perimetro({ tipo: 'circulo', radio: 2 })).toBeCloseTo(2 * Math.PI * 2)
    expect(perimetro({ tipo: 'rectangulo', ancho: 3, alto: 4 })).toBe(14)
    expect(perimetro({ tipo: 'cuadrado', lado: 5 })).toBe(20)
    expect(perimetro({ tipo: 'triangulo', a: 3, b: 4, c: 5 })).toBe(12)
  })
})
