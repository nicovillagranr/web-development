import { describe, it, expect } from 'vitest'
import {
  nombreDe,
  esPorHoras,
  pagoMensual,
  describirEmpleado,
  nominaTotal,
} from './exercise-08'

const asalariado = { nombre: 'Ana', salario: 3000 }
const porHoras = { nombre: 'Beto', tarifaHora: 20, horas: 100 }

describe('exercise-08 — estrechar con el operador in', () => {
  // BLOQUE A
  it('A1) nombreDe lee el campo común sin estrechar', () => {
    expect(nombreDe(asalariado)).toBe('Ana')
    expect(nombreDe(porHoras)).toBe('Beto')
  })

  it('A2) esPorHoras detecta la variante con "tarifaHora" in e', () => {
    expect(esPorHoras(porHoras)).toBe(true)
    expect(esPorHoras(asalariado)).toBe(false)
  })

  // BLOQUE B
  it('B1) pagoMensual calcula según la variante', () => {
    expect(pagoMensual(asalariado)).toBe(3000)
    expect(pagoMensual(porHoras)).toBe(2000)
  })

  it('B2) describirEmpleado combina nombre, tipo y pago', () => {
    expect(describirEmpleado(asalariado)).toBe('Ana: asalariado (3000)')
    expect(describirEmpleado(porHoras)).toBe('Beto: por horas (2000)')
  })

  it('B3) nominaTotal suma una lista mezclada', () => {
    expect(nominaTotal([asalariado, porHoras])).toBe(5000)
    expect(nominaTotal([])).toBe(0)
    expect(nominaTotal([porHoras, porHoras])).toBe(4000)
  })
})
