import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  BotonPelado,
  BotonAvisaTipo,
  BotonAvisaDobleClic,
  CampoAvisaTecla,
  BotonAvisaNativo,
  BotonAvisaConId,
} from './exercise-02'

describe('10-eventos-formularios / exercise-02 — el evento llega solo', () => {
  it('1) BotonPelado — se entrega, no se ejecuta al pintar', () => {
    const avisar = vi.fn<() => void>()
    render(<BotonPelado avisar={avisar} />)
    expect(avisar).not.toHaveBeenCalled() // pintar no es cocinar
    fireEvent.click(screen.getByRole('button'))
    expect(avisar).toHaveBeenCalledTimes(1)
  })

  it('2) BotonAvisaTipo — el nombre del suceso sale del evento', () => {
    const avisar = vi.fn<(tipo: string) => void>()
    render(<BotonAvisaTipo avisar={avisar} />)
    fireEvent.click(screen.getByRole('button'))
    expect(avisar).toHaveBeenCalledWith('click')
  })

  it('3) BotonAvisaDobleClic — el hueco que eliges decide el suceso', () => {
    const avisar = vi.fn<(tipo: string) => void>()
    render(<BotonAvisaDobleClic avisar={avisar} />)
    fireEvent.click(screen.getByRole('button'))
    expect(avisar).not.toHaveBeenCalled() // un clic suelto no es un doble clic
    fireEvent.doubleClick(screen.getByRole('button'))
    expect(avisar).toHaveBeenCalledWith('dblclick')
  })

  it('4) CampoAvisaTecla — cada molde da lo suyo: el del teclado, la tecla', () => {
    const avisar = vi.fn<(tecla: string) => void>()
    render(<CampoAvisaTecla avisar={avisar} />)
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'a' })
    expect(avisar).toHaveBeenCalledWith('a') // la tecla, no "keydown"
  })

  it('5) BotonAvisaNativo — dentro del sobre de React viene el del navegador', () => {
    const avisar = vi.fn<(nativo: MouseEvent) => void>()
    render(<BotonAvisaNativo avisar={avisar} />)
    fireEvent.click(screen.getByRole('button'))
    expect(avisar).toHaveBeenCalledTimes(1)
    expect(avisar.mock.calls[0]?.[0]).toBeInstanceOf(MouseEvent) // el de verdad
  })

  it('6) BotonAvisaConId — dentro del molde tienes las dos cosas', () => {
    const avisar = vi.fn<(id: number, tipo: string) => void>()
    render(<BotonAvisaConId id={7} avisar={avisar} />)
    fireEvent.click(screen.getByRole('button'))
    expect(avisar).toHaveBeenCalledWith(7, 'click') // el id era tuyo, el tipo del evento
  })
})
