import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  GuardarNombre,
  ContadorConAviso,
  ContadorDoble,
  RegistroDoble,
  ContadorConTope,
} from './exercise-02'

describe('11-useState-useReducer / exercise-02 — el setter guarda, no devuelve', () => {
  it('1) GuardarNombre — guarda lo escrito, lo pinta y vacía el input', async () => {
    render(<GuardarNombre />)
    expect(screen.getByText('Nada guardado')).toBeInTheDocument()

    const campo = screen.getByRole('textbox')
    await userEvent.type(campo, 'Ana')
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))

    expect(screen.getByText('Guardado: Ana')).toBeInTheDocument()
    expect(campo).toHaveValue('') // el setter no te devuelve lo que guardaste
  })

  it('2) ContadorConAviso — el aviso lleva el valor nuevo, no el de antes', async () => {
    render(<ContadorConAviso />)
    await userEvent.click(screen.getByRole('button', { name: 'Sumar' }))
    expect(screen.getByText('Ahora vale 1')).toBeInTheDocument() // no "Ahora vale 0"

    await userEvent.click(screen.getByRole('button', { name: 'Sumar' }))
    expect(screen.getByText('Ahora vale 2')).toBeInTheDocument()
  })

  it('3) ContadorDoble — dos llamadas al setter suben DE VERDAD dos', async () => {
    render(<ContadorDoble />)
    await userEvent.click(screen.getByRole('button', { name: 'Sumar 2' }))
    expect(screen.getByText('2')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Sumar 2' }))
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('4) RegistroDoble — un click mete dos entradas, y no se pierde ninguna', async () => {
    render(<RegistroDoble />)
    await userEvent.click(screen.getByRole('button', { name: 'Registrar 2' }))

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('Click 1')).toBeInTheDocument()
    expect(screen.getByText('Click 2')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Registrar 2' }))
    expect(screen.getAllByRole('listitem')).toHaveLength(4)
    expect(screen.getByText('Click 4')).toBeInTheDocument()
  })

  it('5) ContadorConTope — sube de dos en dos pero se planta en 3', async () => {
    render(<ContadorConTope />)
    await userEvent.click(screen.getByRole('button', { name: 'Sumar 2' }))
    expect(screen.getByText('2')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Sumar 2' }))
    expect(screen.getByText('3')).toBeInTheDocument() // el tope decide dentro

    await userEvent.click(screen.getByRole('button', { name: 'Sumar 2' }))
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
