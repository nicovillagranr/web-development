import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  CampoAvisaTexto,
  CampoNumeroAvisaDoble,
  AreaAvisaTexto,
  CampoGuardaTexto,
  CampoEnMayusculas,
  FormularioNombre,
} from './exercise-06'

describe('10-eventos-formularios / exercise-06 — onChange y el texto del campo', () => {
  it('1) CampoAvisaTexto — avisa con lo escrito, no con el elemento', async () => {
    const espia = vi.fn()
    render(<CampoAvisaTexto avisar={espia} />)
    await userEvent.type(screen.getByRole('textbox'), 'hola')
    expect(espia).toHaveBeenLastCalledWith('hola')
  })

  it('2) CampoNumeroAvisaDoble — el value es texto, hay que convertirlo', async () => {
    const espia = vi.fn()
    render(<CampoNumeroAvisaDoble avisar={espia} />)
    await userEvent.type(screen.getByRole('spinbutton'), '21')
    expect(espia).toHaveBeenLastCalledWith(42)
  })

  it('3) AreaAvisaTexto — otro elemento, otro argumento de tipo', async () => {
    const espia = vi.fn()
    render(<AreaAvisaTexto avisar={espia} />)
    await userEvent.type(screen.getByRole('textbox'), 'hey')
    expect(espia).toHaveBeenLastCalledWith('hey')
  })

  it('4) CampoGuardaTexto — lo tecleado acaba en el estado y se pinta', async () => {
    render(<CampoGuardaTexto />)
    await userEvent.type(screen.getByRole('textbox'), 'sol')
    expect(screen.getByText('sol')).toBeInTheDocument()
  })

  it('5) CampoEnMayusculas — el estado manda sobre lo que se ve', async () => {
    render(<CampoEnMayusculas />)
    const campo = screen.getByRole('textbox')
    await userEvent.type(campo, 'hola')
    expect(campo).toHaveValue('HOLA')
  })

  it('6) FormularioNombre — el campo se deja escribir y el saludo sigue', async () => {
    render(<FormularioNombre />)
    expect(screen.getByText('Escribe tu nombre')).toBeInTheDocument()
    const campo = screen.getByRole('textbox')
    await userEvent.type(campo, 'Nico')
    expect(campo).toHaveValue('Nico')
    expect(screen.getByText('Hola, Nico')).toBeInTheDocument()
  })
})
