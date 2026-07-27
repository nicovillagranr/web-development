import { describe, it, expect } from 'vitest'
import {
  presentar,
  ficha,
  contratar,
  describirCoche,
  bienPagados,
} from './exercise-09'

describe('01-tipos-basicos / exercise-09 — interface y extends', () => {
  /* ── BLOQUE A — base y extendida ── */

  it('1) presentar usa nombre y edad', () => {
    const ana = { nombre: 'Ana', edad: 30 }
    expect(presentar(ana)).toBe('Soy Ana, 30 años')
  })

  it('2) ficha necesita el salario (tipo extendido)', () => {
    expect(ficha({ nombre: 'Ana', edad: 30, salario: 1000 })).toBe('Ana: $1000')
    // @ts-expect-error — una Persona NO basta: a ficha le falta el salario
    ficha({ nombre: 'Ana', edad: 30 })
  })

  /* ── BLOQUE B — construir la extendida desde la base ── */

  it('3) contratar asciende una Persona a Empleado', () => {
    expect(contratar({ nombre: 'Ana', edad: 30 }, 1000)).toEqual({
      nombre: 'Ana',
      edad: 30,
      salario: 1000,
    })
  })

  it('4) describirCoche necesita las puertas (otra jerarquía extends)', () => {
    expect(describirCoche({ marca: 'Seat', puertas: 5 })).toBe('Seat de 5 puertas')
    // @ts-expect-error — un Vehiculo a secas no tiene puertas
    describirCoche({ marca: 'Seat' })
  })

  /* ── BLOQUE C — capstone: lista de la interface extendida ── */

  it('5) bienPagados filtra por salario mínimo y devuelve nombres', () => {
    const plantilla = [
      { nombre: 'Ana', edad: 30, salario: 1000 },
      { nombre: 'Leo', edad: 25, salario: 500 },
      { nombre: 'Mia', edad: 40, salario: 2000 },
    ]
    expect(bienPagados(plantilla, 800)).toEqual(['Ana', 'Mia'])
    expect(bienPagados(plantilla, 3000)).toEqual([])
  })
})
