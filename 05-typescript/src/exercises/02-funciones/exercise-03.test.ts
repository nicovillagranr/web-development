import { describe, it, expect } from 'vitest'
import { sumarTodos, concatenar, maximo, etiquetar, promedio } from './exercise-03'

describe('02-funciones / exercise-03 — rest parameters', () => {
  /* ── BLOQUE A — recoger sueltos ── */

  it('1) sumarTodos suma cualquier cantidad de números', () => {
    expect(sumarTodos(1, 2, 3)).toBe(6)
    expect(sumarTodos(10)).toBe(10)
    expect(sumarTodos()).toBe(0)
  })

  it('2) concatenar une palabras con espacios', () => {
    expect(concatenar('hola', 'qué', 'tal')).toBe('hola qué tal')
    expect(concatenar('solo')).toBe('solo')
  })

  /* ── BLOQUE B — usar el array + fijo con rest ── */

  it('3) maximo devuelve el mayor', () => {
    expect(maximo(3, 9, 5)).toBe(9)
    expect(maximo(-1, -5)).toBe(-1)
  })

  it('4) etiquetar combina prefijo fijo con items rest', () => {
    expect(etiquetar('Tags', 'a', 'b', 'c')).toBe('Tags: a, b, c')
    expect(etiquetar('Vacío')).toBe('Vacío: ')
  })

  /* ── BLOQUE C — capstone ── */

  it('5) promedio calcula la media redondeada', () => {
    expect(promedio(2, 4, 6)).toBe(4)
    expect(promedio(1, 2)).toBe(2) // 1.5 → 2
    expect(promedio()).toBe(0)
  })
})
