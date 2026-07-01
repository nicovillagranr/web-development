import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  cantidadItems,
  puedeCancelar,
  describirPedido,
  pagar,
  confirmar,
} from './exercise-10'
import type { Pedido, Resultado } from './exercise-10'

const carrito: Pedido = { estado: 'carrito', items: ['a', 'b'] }
const pagando: Pedido = { estado: 'pagando', items: ['a'], metodo: 'efectivo' }
const confirmado: Pedido = { estado: 'confirmado', items: ['a'], numero: 1234 }
const cancelado: Pedido = { estado: 'cancelado', motivo: 'sin stock' }

describe('exercise-10 — CAPSTONE máquina de estados de un pedido', () => {
  // BLOQUE A
  it('A1) cantidadItems cuenta items (0 si cancelado)', () => {
    expect(cantidadItems(carrito)).toBe(2)
    expect(cantidadItems(pagando)).toBe(1)
    expect(cantidadItems(confirmado)).toBe(1)
    expect(cantidadItems(cancelado)).toBe(0)
  })

  it('A2) puedeCancelar salvo confirmado/cancelado', () => {
    expect(puedeCancelar(carrito)).toBe(true)
    expect(puedeCancelar(pagando)).toBe(true)
    expect(puedeCancelar(confirmado)).toBe(false)
    expect(puedeCancelar(cancelado)).toBe(false)
  })

  it('A3) describirPedido cubre los cuatro estados', () => {
    expect(describirPedido(carrito)).toBe('Carrito (2 items)')
    expect(describirPedido(pagando)).toBe('Pagando con efectivo')
    expect(describirPedido(confirmado)).toBe('Pedido #1234 confirmado')
    expect(describirPedido(cancelado)).toBe('Cancelado: sin stock')
  })

  // BLOQUE B
  it('B1) pagar transiciona solo desde carrito', () => {
    expect(pagar(carrito, 'tarjeta')).toEqual({
      ok: true,
      valor: { estado: 'pagando', items: ['a', 'b'], metodo: 'tarjeta' },
    })
    expect(pagar(pagando, 'tarjeta')).toEqual({
      ok: false,
      error: 'solo se puede pagar desde el carrito',
    })
    expectTypeOf(pagar).returns.toEqualTypeOf<Resultado<Pedido>>()
  })

  it('B2) confirmar transiciona solo desde pagando', () => {
    expect(confirmar(pagando, 1234)).toEqual({
      ok: true,
      valor: { estado: 'confirmado', items: ['a'], numero: 1234 },
    })
    expect(confirmar(carrito, 1)).toEqual({
      ok: false,
      error: 'solo se puede confirmar lo que se está pagando',
    })
  })
})
