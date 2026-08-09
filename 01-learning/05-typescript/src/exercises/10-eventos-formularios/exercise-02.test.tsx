import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  BotonPelado,
  BotonAvisaTipo,
  BotonAvisaDobleClic,
  CampoAvisaTecla,
  BotonAvisaNativo,
  BotonAvisaConId,
} from './exercise-02'

describe('10-eventos-formularios / exercise-02 — el evento llega solo', () => {
  it('1) BotonPelado — se entrega, no se llama al pintar', async () => {
    const espia = vi.fn()
    render(<BotonPelado alPulsar={espia} />)
    expect(espia).not.toHaveBeenCalled() // pintar no es pulsar
    await userEvent.click(screen.getByRole('button', { name: 'Avisar' }))
    expect(espia).toHaveBeenCalledTimes(1)
  })

  it('2) BotonAvisaTipo — pasa el CAMPO type, no la caja entera', async () => {
    const espia = vi.fn()
    render(<BotonAvisaTipo avisar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Avisar' }))
    expect(espia).toHaveBeenCalledWith('click')
  })

  it('3) BotonAvisaDobleClic — el hueco que eliges decide el suceso', async () => {
    const espia = vi.fn()
    render(<BotonAvisaDobleClic avisar={espia} />)
    await userEvent.dblClick(screen.getByRole('button', { name: 'Avisar' }))
    expect(espia).toHaveBeenCalledTimes(1)
    expect(espia).toHaveBeenCalledWith('dblclick') // lo trae el evento, no lo escribes tú
  })

  it('4) CampoAvisaTecla — otro elemento, otro hueco, otro evento', async () => {
    const espia = vi.fn()
    render(<CampoAvisaTecla avisar={espia} />)
    await userEvent.type(screen.getByRole('textbox'), 'a')
    expect(espia).toHaveBeenCalledWith('a')
  })

  it('5) BotonAvisaNativo — entrega la carta de dentro, no el envoltorio', async () => {
    const espia = vi.fn()
    render(<BotonAvisaNativo avisar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Avisar' }))
    expect(espia).toHaveBeenCalledTimes(1)
    const recibido = espia.mock.calls[0]?.[0]
    expect(recibido).toBeInstanceOf(MouseEvent) // el del navegador, de verdad
  })

  it('6) BotonAvisaConId — dentro del hueco tienes las props Y el evento', async () => {
    const espia = vi.fn()
    render(<BotonAvisaConId id="guardar" avisar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Avisar' }))
    expect(espia).toHaveBeenCalledWith('guardar:click')
  })
})
