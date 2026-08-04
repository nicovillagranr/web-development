import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  CampoAvisaValor,
  CampoAvisaLargo,
  CampoNumeroAvisaNumero,
  CasillaAvisaMarcada,
  SelectorAvisa,
  FiltroDeLista,
} from './exercise-05'

describe('10-eventos-formularios / exercise-05 — lo que hay escrito en el campo', () => {
  it('1) CampoAvisaValor — llega el campo entero, no la tecla', () => {
    const avisar = vi.fn<(texto: string) => void>()
    render(<CampoAvisaValor avisar={avisar} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hola' } })
    expect(avisar).toHaveBeenCalledWith('hola') // "hola", no "a"
  })

  it('2) CampoAvisaLargo — el manejador sale del hueco y lleva su cartel', () => {
    const avisar = vi.fn<(largo: number) => void>()
    render(<CampoAvisaLargo avisar={avisar} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'hola' } })
    expect(avisar).toHaveBeenCalledWith(4)
  })

  it('3) CampoNumeroAvisaNumero — la fotocopia es papel aunque el campo pida cifras', () => {
    const avisar = vi.fn<(n: number) => void>()
    render(<CampoNumeroAvisaNumero avisar={avisar} />)
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '42' } })
    expect(avisar).toHaveBeenCalledWith(42)
    expect(avisar.mock.calls[0]?.[0]).toBeTypeOf('number') // 42, no "42"
  })

  it('4) CasillaAvisaMarcada — una casilla no tiene texto, tiene sí o no', () => {
    const avisar = vi.fn<(marcada: boolean) => void>()
    render(<CasillaAvisaMarcada avisar={avisar} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(avisar).toHaveBeenCalledWith(true)
  })

  it('5) SelectorAvisa — otra etiqueta, otra mitad del cartel', () => {
    const avisar = vi.fn<(elegido: string) => void>()
    render(<SelectorAvisa avisar={avisar} />)
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'gato' } })
    expect(avisar).toHaveBeenCalledWith('gato')
  })

  it('6) FiltroDeLista — los dos carteles, cada uno en su etiqueta', () => {
    const alEscribir = vi.fn<(texto: string) => void>()
    const alElegir = vi.fn<(animal: string) => void>()
    render(<FiltroDeLista alEscribir={alEscribir} alElegir={alElegir} />)

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'perr' } })
    expect(alEscribir).toHaveBeenCalledWith('perr')
    expect(alElegir).not.toHaveBeenCalled() // cada uno en su etiqueta

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'gato' } })
    expect(alElegir).toHaveBeenCalledWith('gato')
    expect(alEscribir).toHaveBeenCalledTimes(1)
  })
})
