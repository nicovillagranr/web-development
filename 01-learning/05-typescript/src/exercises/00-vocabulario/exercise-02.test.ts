import { describe, it, expect } from 'vitest'
import {
  r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12,
} from './exercise-02'

describe('00-vocabulario / exercise-02 — las piezas de un tipo', () => {
  describe('TEORÍA 1 — los dos trabajos del `:`', () => {
    it('1) a la derecha del `:` dentro de una interface hay una categoría, no un dato', () => {
      expect(r1).toBe('un tipo')
    })

    it('2) a la derecha del `:` dentro de un objeto hay algo que sí se puede imprimir', () => {
      expect(r2).toBe('un valor')
    })

    it('3) la clave y su valor tienen un nombre cuando se les llama juntos', () => {
      expect(r3).toBe('un par clave-valor')
    })

    it('4) escribir el tipo a mano, pegado al nombre de la constante', () => {
      expect(r4).toBe('una anotación de tipo')
    })
  })

  describe('TEORÍA 2 — cómo se llama cada tipo', () => {
    it('5) `type X = …` le pone nombre a un tipo', () => {
      expect(r5).toBe('un alias de tipo')
    })

    it('6) varias opciones separadas por `|`', () => {
      expect(r6).toBe('una unión')
    })

    it('7) un tipo con un solo valor posible', () => {
      expect(r7).toBe('un tipo literal')
    })

    it('8) `interface` no declara un alias', () => {
      expect(r8).toBe('una interface')
    })
  })

  describe('TEORÍA 3 — el tipo no es el dato', () => {
    it('9) lo que desaparece al compilar', () => {
      expect(r9).toBe('un tipo')
    })

    it('10) lo que sí llega a ejecutarse', () => {
      expect(r10).toBe('un objeto')
    })

    it('11) para qué sirve el `?` en una propiedad', () => {
      expect(r11).toBe('la hace opcional')
    })

    it('12) deducir el tipo sin que nadie lo escriba', () => {
      expect(r12).toBe('inferencia')
    })
  })
})
