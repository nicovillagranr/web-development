import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, createEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  FormularioAvisa,
  FormularioConDosBotones,
  FormularioManejadorFuera,
  FormularioLeeElNombre,
  FormularioLimpiaAlEnviar,
  FormularioNoEnviaVacio,
} from './exercise-08'

/** Envía el <form> y devuelve el evento, para poder mirar si se frenó. */
function enviar(contenedor: HTMLElement) {
  const formulario = contenedor.querySelector('form')
  if (!formulario) throw new Error('no hay <form> en el componente')
  const evento = createEvent.submit(formulario)
  fireEvent(formulario, evento)
  return evento
}

describe('10-eventos-formularios / exercise-08 — onSubmit y preventDefault', () => {
  it('1) FormularioAvisa — avisa y frena la recarga del navegador', () => {
    const espia = vi.fn()
    const { container } = render(<FormularioAvisa alEnviar={espia} />)
    const evento = enviar(container)
    expect(espia).toHaveBeenCalled()
    expect(evento.defaultPrevented).toBe(true)
  })

  it('2) FormularioConDosBotones — "Limpiar" limpia y no envía', async () => {
    const alEnviar = vi.fn()
    const alLimpiar = vi.fn()
    render(<FormularioConDosBotones alEnviar={alEnviar} alLimpiar={alLimpiar} />)
    await userEvent.click(screen.getByRole('button', { name: 'Limpiar' }))
    expect(alLimpiar).toHaveBeenCalled()
    expect(alEnviar).not.toHaveBeenCalled()
    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))
    expect(alEnviar).toHaveBeenCalled()
  })

  it('3) FormularioManejadorFuera — mismo comportamiento, manejador anotado fuera', () => {
    const espia = vi.fn()
    const { container } = render(<FormularioManejadorFuera alEnviar={espia} />)
    const evento = enviar(container)
    expect(espia).toHaveBeenCalled()
    expect(evento.defaultPrevented).toBe(true)
  })

  it('4) FormularioLeeElNombre — envía lo que hay escrito', async () => {
    const espia = vi.fn()
    const { container } = render(<FormularioLeeElNombre alEnviar={espia} />)
    await userEvent.type(screen.getByRole('textbox'), 'Nico')
    enviar(container)
    expect(espia).toHaveBeenLastCalledWith('Nico')
  })

  it('5) FormularioLimpiaAlEnviar — tras enviar, el campo queda vacío', async () => {
    const espia = vi.fn()
    const { container } = render(<FormularioLimpiaAlEnviar alEnviar={espia} />)
    const campo = screen.getByRole('textbox')
    await userEvent.type(campo, 'Nico')
    enviar(container)
    expect(espia).toHaveBeenLastCalledWith('Nico')
    expect(campo).toHaveValue('')
  })

  it('6) FormularioNoEnviaVacio — vacío no envía; lleno envía y limpia', async () => {
    const espia = vi.fn()
    const { container } = render(<FormularioNoEnviaVacio alEnviar={espia} />)
    enviar(container)
    expect(espia).not.toHaveBeenCalled()
    const campo = screen.getByRole('textbox')
    await userEvent.type(campo, 'Nico')
    enviar(container)
    expect(espia).toHaveBeenLastCalledWith('Nico')
    expect(campo).toHaveValue('')
  })
})
