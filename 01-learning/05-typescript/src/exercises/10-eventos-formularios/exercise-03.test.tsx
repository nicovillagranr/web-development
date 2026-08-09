import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  BotonFuera,
  EnlaceFuera,
  CampoFuera,
  BotonFueraConId,
  CampoLeeValor,
  BarraFuera,
} from './exercise-03'

describe('10-eventos-formularios / exercise-03 — el manejador fuera del hueco', () => {
  it('1) BotonFuera — el manejador vive en un const y se entrega al hueco', async () => {
    const espia = vi.fn()
    render(<BotonFuera avisar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Avisar' }))
    expect(espia).toHaveBeenCalledWith('click')
  })

  it('2) EnlaceFuera — mismo gesto sobre un <a>', async () => {
    const espia = vi.fn()
    render(<EnlaceFuera avisar={espia} />)
    await userEvent.click(screen.getByRole('link', { name: 'Ir' }))
    expect(espia).toHaveBeenCalledWith('click')
  })

  it('3) CampoFuera — evento de teclado, manejador fuera', async () => {
    const espia = vi.fn()
    render(<CampoFuera avisar={espia} />)
    await userEvent.type(screen.getByRole('textbox'), 'a')
    expect(espia).toHaveBeenCalledWith('a')
  })

  it('4) BotonFueraConId — el de fuera pide dos cosas: hay que envolver', async () => {
    const espia = vi.fn()
    render(<BotonFueraConId id="guardar" avisar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Avisar' }))
    expect(espia).toHaveBeenCalledWith('guardar:click')
  })

  it('5) CampoLeeValor — currentTarget es el <input>, y por eso tiene .value', async () => {
    const espia = vi.fn()
    render(<CampoLeeValor avisar={espia} />)
    await userEvent.type(screen.getByRole('textbox'), 'hola')
    expect(espia).toHaveBeenLastCalledWith('hola')
  })

  it('6) BarraFuera — dos elementos, dos manejadores, dos carteles', async () => {
    const espia = vi.fn()
    render(<BarraFuera avisar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(espia).toHaveBeenLastCalledWith('boton:click')
    await userEvent.click(screen.getByRole('link', { name: 'Salir' }))
    expect(espia).toHaveBeenLastCalledWith('enlace:click')
  })
})
