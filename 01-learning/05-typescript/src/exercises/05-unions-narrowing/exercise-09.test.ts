import { describe, it, expect } from 'vitest'
import { area, perimetro, identificador, descripcion, areaTotal } from './exercise-09'

describe('05-unions / exercise-09 — narrowing con `in`', () => {
  it('1) area', () => {
    expect(area({ lado: 3 })).toBe(9)
    expect(area({ ancho: 2, alto: 5 })).toBe(10)
  })
  it('2) perimetro', () => {
    expect(perimetro({ lado: 3 })).toBe(12)
    expect(perimetro({ ancho: 2, alto: 5 })).toBe(14)
  })
  it('3) identificador', () => {
    expect(identificador({ email: 'x@y' })).toBe('x@y')
    expect(identificador({ ruc: '123' })).toBe('123')
  })
  it('4) descripcion', () => {
    expect(descripcion({ lado: 3 })).toBe('cuadrado de 3')
    expect(descripcion({ ancho: 2, alto: 5 })).toBe('rect 2x5')
  })
  it('5) areaTotal', () => {
    expect(areaTotal([{ lado: 2 }, { ancho: 2, alto: 3 }])).toBe(10)
  })
})
