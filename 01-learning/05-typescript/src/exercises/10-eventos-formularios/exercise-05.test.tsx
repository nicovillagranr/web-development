import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  BotonRecibeManejador,
  EnlaceRecibeManejador,
  CampoRecibeManejador,
  BotonConIdRecibeManejador,
  BarraRecibeDos,
  PanelDeConteo,
} from './exercise-05'

describe('10-eventos-formularios / exercise-05 — el manejador llega por props', () => {
  it('1) BotonRecibeManejador — se entrega pelada, con el evento dentro', async () => {
    const espia = vi.fn()
    render(<BotonRecibeManejador alPulsar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Avisar' }))
    expect(espia).toHaveBeenCalledTimes(1)
    expect(espia.mock.calls[0]?.[0]?.type).toBe('click') // le llegó el evento
  })

  it('2) EnlaceRecibeManejador — otro elemento, otro alias en la prop', async () => {
    const espia = vi.fn()
    render(<EnlaceRecibeManejador alPulsar={espia} />)
    await userEvent.click(screen.getByRole('link', { name: 'Ir' }))
    expect(espia).toHaveBeenCalledTimes(1)
  })

  it('3) CampoRecibeManejador — el alias de teclado va en el hueco de teclado', async () => {
    const espia = vi.fn()
    render(<CampoRecibeManejador alTeclear={espia} />)
    await userEvent.type(screen.getByRole('textbox'), 'a')
    expect(espia).toHaveBeenCalled()
    expect(espia.mock.calls[0]?.[0]?.key).toBe('a')
  })

  it('4) BotonConIdRecibeManejador — el hijo añade lo suyo al envolver', async () => {
    const espia = vi.fn()
    render(<BotonConIdRecibeManejador id="guardar" alPulsar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Avisar' }))
    expect(espia).toHaveBeenCalledTimes(1)
    expect(espia.mock.calls[0]?.[1]).toBe('guardar') // el segundo argumento
  })

  it('5) BarraRecibeDos — cada manejador en su elemento', async () => {
    const alGuardar = vi.fn()
    const alSalir = vi.fn()
    render(<BarraRecibeDos alGuardar={alGuardar} alSalir={alSalir} />)
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(alGuardar).toHaveBeenCalledTimes(1)
    expect(alSalir).not.toHaveBeenCalled()
    await userEvent.click(screen.getByRole('link', { name: 'Salir' }))
    expect(alSalir).toHaveBeenCalledTimes(1)
  })

  it('6) BotonDeAccion — montado en un padre de verdad, el contador sube', async () => {
    render(<PanelDeConteo />)
    expect(screen.getByText('Total: 0')).toBeInTheDocument()
    const boton = screen.getByRole('button', { name: 'Sumar' })
    await userEvent.click(boton)
    await userEvent.click(boton)
    await userEvent.click(boton)
    expect(screen.getByText('Total: 3')).toBeInTheDocument()
  })
})
