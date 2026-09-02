import { describe, it, expect } from 'vitest'
import {
  r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12,
} from './exercise-03'

describe('00-vocabulario / exercise-03 — las piezas de una expresión', () => {
  describe('TEORÍA 1 — el símbolo y los datos', () => {
    it('1) el símbolo, que no se puede imprimir por separado', () => {
      expect(r1).toBe('el operador')
    })

    it('2) el dato de un lado del símbolo', () => {
      expect(r2).toBe('un operando')
    })

    it('3) todo junto, y produce un valor', () => {
      expect(r3).toBe('una expresión')
    })

    it('4) el que toma tres operandos', () => {
      expect(r4).toBe('ternario')
    })
  })

  describe('TEORÍA 2 — false no es falsy', () => {
    it('5) `0` pertenece a la categoría, pero no es `false`', () => {
      expect(r5).toBe('falsy')
    })

    it('6) `false` es un booleano concreto, no un conjunto', () => {
      expect(r6).toBe('un valor')
    })

    it('7) un array vacío no está entre los seis falsy', () => {
      expect(r7).toBe('truthy')
    })

    it('8) el que solo descarta null y undefined', () => {
      expect(r8).toBe('??')
    })
  })

  describe('TEORÍA 3 — juntar texto tiene nombre', () => {
    it('9) la forma con comillas invertidas', () => {
      expect(r9).toBe('template literal')
    })

    it('10) el hueco de dentro y lo que se mete en él', () => {
      expect(r10).toBe('una interpolación')
    })

    it('11) pegar dos textos con `+`', () => {
      expect(r11).toBe('concatenación')
    })

    it('12) `length` guarda un dato y se lee sin paréntesis', () => {
      expect(r12).toBe('una propiedad')
    })
  })
})
