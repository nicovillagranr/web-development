import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  BotonAvisaSuId,
  BotonConIcono,
  ListaDeTareas,
  BotonAvisaSuValor,
  CampoAvisaLoEscrito,
  TarjetaQueIgnoraElBoton,
} from './exercise-07'

describe('10-eventos-formularios / exercise-07 — target y currentTarget', () => {
  it('1) BotonAvisaSuId — avisa con el id del botón', async () => {
    const espia = vi.fn()
    render(<BotonAvisaSuId avisar={espia} />)
    await userEvent.click(screen.getByRole('button'))
    expect(espia).toHaveBeenLastCalledWith('guardar')
  })

  it('2) BotonConIcono — pulsando el icono sigue avisando del botón', async () => {
    const espia = vi.fn()
    render(<BotonConIcono avisar={espia} />)
    await userEvent.click(screen.getByText('🗑'))
    expect(espia).toHaveBeenLastCalledWith('borrar')
  })

  it('3) ListaDeTareas — avisa del <li> pulsado, no de la lista', async () => {
    const espia = vi.fn()
    render(<ListaDeTareas avisar={espia} />)
    await userEvent.click(screen.getByText('Dos'))
    expect(espia).toHaveBeenLastCalledWith('dos')
    await userEvent.click(screen.getByText('Uno'))
    expect(espia).toHaveBeenLastCalledWith('uno')
  })

  it('4) BotonAvisaSuValor — avisa con el value del botón', async () => {
    const espia = vi.fn()
    render(<BotonAvisaSuValor avisar={espia} />)
    await userEvent.click(screen.getByRole('button'))
    expect(espia).toHaveBeenLastCalledWith('rojo')
  })

  it('5) CampoAvisaLoEscrito — avisa con lo tecleado', async () => {
    const espia = vi.fn()
    render(<CampoAvisaLoEscrito avisar={espia} />)
    await userEvent.type(screen.getByRole('textbox'), 'hey')
    expect(espia).toHaveBeenLastCalledWith('hey')
  })

  it('6) TarjetaQueIgnoraElBoton — la tarjeta avisa, el botón de dentro no', async () => {
    const espia = vi.fn()
    render(<TarjetaQueIgnoraElBoton avisar={espia} />)
    await userEvent.click(screen.getByRole('article'))
    expect(espia).toHaveBeenLastCalledWith('tarjeta')
    espia.mockClear()
    await userEvent.click(screen.getByRole('button'))
    expect(espia).not.toHaveBeenCalled()
  })
})
