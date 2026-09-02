import { describe, it, expect } from 'vitest'
import {
  r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12,
} from './exercise-01'

describe('00-vocabulario / exercise-01 — las piezas de una función', () => {
  describe('TEORÍA 1 — declarar no es llamar', () => {
    it('1) `nombre` en la declaración es el hueco, no lo que lo rellena', () => {
      expect(r1).toBe('parámetro')
    })

    it('2) `"Ana"` en la llamada es lo que rellena el hueco', () => {
      expect(r2).toBe('argumento')
    })

    it('3) `string` es la categoría permitida, no un dato', () => {
      expect(r3).toBe('tipo')
    })

    it('4) `saludar("Ana")` entero es la operación de llamar', () => {
      expect(r4).toBe('llamada')
    })

    it('5) `saludo` es el nombre al que se le asigna el retorno', () => {
      expect(r5).toBe('constante')
    })
  })

  describe('TEORÍA 2 — retornar no es imprimir', () => {
    it('6) `return` entrega el valor a quien llamó', () => {
      expect(r6).toBe('lo retorna')
    })

    it('7) `console.log` lo dibuja en pantalla y no entrega nada', () => {
      expect(r7).toBe('lo imprime')
    })

    it('8) una función `void` deja a quien la llamó con las manos vacías', () => {
      expect(r8).toBe('undefined')
    })

    it('9) `void` ocupa el sitio del tipo de retorno, después de los paréntesis', () => {
      expect(r9).toBe('el tipo de retorno')
    })
  })

  describe('TEORÍA 3 — de quién es cada pieza', () => {
    it('10) lo que está dentro de un objeto', () => {
      expect(r10).toBe('propiedad')
    })

    it('11) la propiedad y lo que guarda no son la misma cosa', () => {
      expect(r11).toBe('el valor')
    })

    it('12) lo que está dentro de un array', () => {
      expect(r12).toBe('elemento')
    })
  })
})
