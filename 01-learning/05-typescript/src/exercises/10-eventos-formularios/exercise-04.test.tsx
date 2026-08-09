import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  BotonConSello,
  EnlaceConSello,
  CampoConSello,
  BotonConSelloDeReact,
  CampoConSelloDeReact,
  BarraConSellos,
  doblar,
  triplicar,
  gritar,
  repetir,
  BotonEscalera,
  BotonEscaleraDeReact,
} from './exercise-04'

describe('10-eventos-formularios / exercise-04 — ponerle nombre al tipo', () => {
  it('1) BotonConSello — el alias nombra al MANEJADOR, no al evento', async () => {
    const espia = vi.fn()
    render(<BotonConSello avisar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Avisar' }))
    expect(espia).toHaveBeenCalledWith('click')
  })

  it('2) EnlaceConSello — un alias sirve para SU elemento', async () => {
    const espia = vi.fn()
    render(<EnlaceConSello avisar={espia} />)
    await userEvent.click(screen.getByRole('link', { name: 'Ir' }))
    expect(espia).toHaveBeenCalledWith('click')
  })

  it('3) CampoConSello — el alias tiene los mismos huecos que el sitio', async () => {
    const espia = vi.fn()
    render(<CampoConSello avisar={espia} />)
    await userEvent.type(screen.getByRole('textbox'), 'a')
    expect(espia).toHaveBeenCalledWith('a') // no undefined
  })

  it('4) BotonConSelloDeReact — el alias de fábrica va en el const', async () => {
    const espia = vi.fn()
    render(<BotonConSelloDeReact avisar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Avisar' }))
    expect(espia).toHaveBeenCalledWith('click')
  })

  it('5) CampoConSelloDeReact — la regla del nombre: Event vs EventHandler', async () => {
    const espia = vi.fn()
    render(<CampoConSelloDeReact avisar={espia} />)
    await userEvent.type(screen.getByRole('textbox'), 'a')
    expect(espia).toHaveBeenCalledWith('a')
  })

  it('6) BarraConSellos — el tuyo y el de React son intercambiables', async () => {
    const espia = vi.fn()
    render(<BarraConSellos avisar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(espia).toHaveBeenLastCalledWith('boton:click')
    await userEvent.click(screen.getByRole('link', { name: 'Salir' }))
    expect(espia).toHaveBeenLastCalledWith('enlace:click')
  })
})

describe('🪜 ESCALERA T — quién le pone el tipo a la `e`', () => {
  it('T1) doblar — la etiqueta del const tipa la `n` sin que la anotes', () => {
    expect(doblar(4)).toBe(8)
    expect(doblar(0)).toBe(0)
  })

  it('T2) triplicar — sin etiqueta, la información va en el parámetro', () => {
    expect(triplicar(4)).toBe(12)
    expect(triplicar(-2)).toBe(-6)
  })

  it('T3) gritar — la `t` es string porque lo dice la etiqueta', () => {
    expect(gritar('hola')).toBe('HOLA')
    expect(gritar('')).toBe('')
  })

  it('T4) repetir — la etiqueta tipa TODOS los parámetros, por posición', () => {
    expect(repetir('ab', 3)).toBe('ababab')
    expect(repetir('x', 1)).toBe('x')
    expect(repetir('ab', 0)).toBe('')
  })

  it('T5) BotonEscalera — mismo mecanismo, ahora la `e` es un evento', async () => {
    const espia = vi.fn()
    render(<BotonEscalera avisar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Pulsa' }))
    expect(espia).toHaveBeenCalledWith('click') // no "[object Object]"
  })

  it('T6) BotonEscaleraDeReact — ⚠️ este sale verde aunque falte la etiqueta', async () => {
    const espia = vi.fn()
    render(<BotonEscaleraDeReact avisar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Pulsa' }))
    expect(espia).toHaveBeenCalledWith('click')
  })
})
