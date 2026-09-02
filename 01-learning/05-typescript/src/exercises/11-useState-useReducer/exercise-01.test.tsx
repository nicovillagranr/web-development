import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Contador,
  Interruptor,
  SelectorColor,
  AvisoErrores,
  ListaTareas,
} from './exercise-01'

describe('11-useState-useReducer / exercise-01 — de dónde saca useState el tipo', () => {
  it('1) Contador — el inicial decide si `+ 1` suma o concatena', async () => {
    render(<Contador />)
    expect(screen.getByText('0')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Sumar' }))
    expect(screen.getByText('1')).toBeInTheDocument() // no "01"
    await userEvent.click(screen.getByRole('button', { name: 'Sumar' }))
    expect(screen.getByText('2')).toBeInTheDocument() // no "011"
  })

  it('2) Interruptor — arranca apagado y alterna', async () => {
    render(<Interruptor />)
    const boton = screen.getByRole('button')
    expect(boton).toHaveTextContent('OFF')
    await userEvent.click(boton)
    expect(boton).toHaveTextContent('ON')
    await userEvent.click(boton)
    expect(boton).toHaveTextContent('OFF')
  })

  it('3) SelectorColor — arranca sin elegir y guarda el color pulsado', async () => {
    render(<SelectorColor />)
    expect(screen.getByText('Sin elegir')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'verde' }))
    expect(screen.getByText('Elegido: verde')).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'azul' }))
    expect(screen.getByText('Elegido: azul')).toBeInTheDocument()
  })

  it('4) AvisoErrores — sin errores no pinta lista', () => {
    const { container } = render(<AvisoErrores errores={{}} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('4) AvisoErrores — pinta solo los errores que llegan', () => {
    render(<AvisoErrores errores={{ email: 'El correo no es válido' }} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.getByText('El correo no es válido')).toBeInTheDocument()
  })

  it('5) ListaTareas — cada click añade una tarea y la pinta', async () => {
    render(<ListaTareas />)
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)

    await userEvent.click(screen.getByRole('button', { name: 'Añadir' }))
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.getByText('Tarea 1')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Añadir' }))
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(screen.getByText('Tarea 2')).toBeInTheDocument()
  })
})
