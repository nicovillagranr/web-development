import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  CampoTexto,
  Interruptor,
  CampoConNombre,
  BotonBorrar,
  CampoCantidad,
  SelectorDeColor,
} from './exercise-09'

describe('10-eventos-formularios / exercise-09 — el manejador que traduce', () => {
  it('1) CampoTexto — la prop recibe el texto, no el evento', async () => {
    const espia = vi.fn()
    render(<CampoTexto alEscribir={espia} />)
    await userEvent.type(screen.getByRole('textbox'), 'hola')
    expect(espia).toHaveBeenLastCalledWith('hola')
  })

  it('2) Interruptor — la prop recibe si quedó marcada', async () => {
    const espia = vi.fn()
    render(<Interruptor alCambiar={espia} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(espia).toHaveBeenLastCalledWith(true)
  })

  it('3) CampoConNombre — recibe el nombre del campo y luego el valor', async () => {
    const espia = vi.fn()
    render(<CampoConNombre alCambiar={espia} />)
    await userEvent.type(screen.getByRole('textbox'), 'a')
    expect(espia).toHaveBeenLastCalledWith('email', 'a')
  })

  it('4) BotonBorrar — avisa con el id que llegó por props', async () => {
    const espia = vi.fn()
    render(<BotonBorrar id="t-7" alBorrar={espia} />)
    await userEvent.click(screen.getByRole('button'))
    expect(espia).toHaveBeenLastCalledWith('t-7')
  })

  it('5) CampoCantidad — la prop recibe un número, no un texto', async () => {
    const espia = vi.fn()
    render(<CampoCantidad alCambiar={espia} />)
    await userEvent.type(screen.getByRole('spinbutton'), '21')
    expect(espia).toHaveBeenLastCalledWith(21)
  })

  it('6) SelectorDeColor — la prop recibe un Color', async () => {
    const espia = vi.fn()
    render(<SelectorDeColor alElegir={espia} />)
    await userEvent.selectOptions(screen.getByRole('combobox'), 'verde')
    expect(espia).toHaveBeenLastCalledWith('verde')
  })
})
