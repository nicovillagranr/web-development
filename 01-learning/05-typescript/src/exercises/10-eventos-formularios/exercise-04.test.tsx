import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  BotonConSello,
  BotonRecibeManejador,
  EnlaceRecibeManejador,
  CampoRecibeManejador,
  BotonConSelloDeReact,
  BarraDeAcciones,
} from './exercise-04'

describe('10-eventos-formularios / exercise-04 — ponerle nombre al tipo', () => {
  it('1) BotonConSello — con el sello puesto, la `e` vuelve a llegar tipada', () => {
    const avisar = vi.fn<(tipo: string) => void>()
    render(<BotonConSello avisar={avisar} />)
    expect(avisar).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button'))
    expect(avisar).toHaveBeenCalledWith('click')
  })

  it('2) BotonRecibeManejador — el manejador llega por props y se entrega pelado', () => {
    const alPulsar = vi.fn()
    render(<BotonRecibeManejador alPulsar={alPulsar} />)
    fireEvent.click(screen.getByRole('button'))
    expect(alPulsar).toHaveBeenCalledTimes(1)
    expect(alPulsar.mock.calls[0]?.[0]).toMatchObject({ type: 'click' })
  })

  it('3) EnlaceRecibeManejador — un sello sirve para SU etiqueta, no para todas', () => {
    const alPulsar = vi.fn()
    render(<EnlaceRecibeManejador alPulsar={alPulsar} />)
    fireEvent.click(screen.getByRole('link'))
    expect(alPulsar).toHaveBeenCalledTimes(1)
    expect(alPulsar.mock.calls[0]?.[0]).toMatchObject({ type: 'click' })
  })

  it('4) CampoRecibeManejador — el sello del teclado, con su salida bien puesta', () => {
    const alTeclear = vi.fn()
    render(<CampoRecibeManejador alTeclear={alTeclear} />)
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'a' })
    expect(alTeclear).toHaveBeenCalledTimes(1)
    expect(alTeclear.mock.calls[0]?.[0]).toMatchObject({ key: 'a' })
  })

  it('5) BotonConSelloDeReact — el sello que ya venía tallado de fábrica', () => {
    const avisar = vi.fn<(tipo: string) => void>()
    render(<BotonConSelloDeReact avisar={avisar} />)
    fireEvent.click(screen.getByRole('button'))
    expect(avisar).toHaveBeenCalledWith('click')
  })

  it('6) BarraDeAcciones — dos manejadores, dos sellos, dos etiquetas', () => {
    const alGuardar = vi.fn()
    const alSalir = vi.fn()
    render(<BarraDeAcciones alGuardar={alGuardar} alSalir={alSalir} />)

    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(alGuardar).toHaveBeenCalledTimes(1)
    expect(alSalir).not.toHaveBeenCalled() // cada uno en su etiqueta

    fireEvent.click(screen.getByRole('link', { name: 'Salir' }))
    expect(alSalir).toHaveBeenCalledTimes(1)
    expect(alGuardar).toHaveBeenCalledTimes(1) // el de guardar no se dispara otra vez
  })
})
