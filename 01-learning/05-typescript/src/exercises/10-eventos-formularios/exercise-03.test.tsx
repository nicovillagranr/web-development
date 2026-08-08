import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  BotonFuera,
  EnlaceFuera,
  EnlaceSinNavegar,
  CampoFuera,
  BotonFueraConId,
  EnlaceCompleto,
  ejecutar,
  medirDoble,
  registro,
  apuntar,
  BotonTimbre,
} from './exercise-03'

describe('10-eventos-formularios / exercise-03 — el manejador fuera del hueco', () => {
  it('1) BotonFuera — sale del hueco y sigue funcionando', () => {
    const avisar = vi.fn<(tipo: string) => void>()
    render(<BotonFuera avisar={avisar} />)
    expect(avisar).not.toHaveBeenCalled() // se entrega, no se ejecuta al pintar
    fireEvent.click(screen.getByRole('button'))
    expect(avisar).toHaveBeenCalledWith('click')
  })

  it('2) EnlaceFuera — el cartel tiene que coincidir con la etiqueta', () => {
    const avisar = vi.fn<(tipo: string) => void>()
    render(<EnlaceFuera avisar={avisar} />)
    fireEvent.click(screen.getByRole('link'))
    expect(avisar).toHaveBeenCalledWith('click')
  })

  it('3) EnlaceSinNavegar — corta lo que el navegador iba a hacer solo', () => {
    const avisar = vi.fn<(tipo: string) => void>()
    render(<EnlaceSinNavegar avisar={avisar} />)
    const clic = new window.MouseEvent('click', { bubbles: true, cancelable: true })
    fireEvent(screen.getByRole('link'), clic)
    expect(avisar).toHaveBeenCalledWith('click')
    expect(clic.defaultPrevented).toBe(true) // el navegador se queda quieto
  })

  it('4) CampoFuera — el cartel dice las dos cosas: teclado e input', () => {
    const avisar = vi.fn<(tecla: string) => void>()
    render(<CampoFuera avisar={avisar} />)
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'a' })
    expect(avisar).toHaveBeenCalledWith('a') // la tecla, no "keydown"
  })

  it('5) BotonFueraConId — el de fuera no encaja pelado, hay que envolverlo', () => {
    const avisar = vi.fn<(id: number, tipo: string) => void>()
    render(<BotonFueraConId id={7} avisar={avisar} />)
    fireEvent.click(screen.getByRole('button'))
    expect(avisar).toHaveBeenCalledWith(7, 'click') // el id era tuyo, el tipo del evento
  })

  it('6) EnlaceCompleto — anotar + cortar + pasar el destino, a la vez', () => {
    const avisar = vi.fn<(destino: string, tipo: string) => void>()
    render(<EnlaceCompleto destino="/perfil" avisar={avisar} />)
    const enlace = screen.getByRole('link')
    expect(enlace).toHaveAttribute('href', '/perfil') // el destino se pinta
    const clic = new window.MouseEvent('click', { bubbles: true, cancelable: true })
    fireEvent(enlace, clic)
    expect(avisar).toHaveBeenCalledWith('/perfil', 'click')
    expect(clic.defaultPrevented).toBe(true)
  })
})

describe('10-eventos-formularios / exercise-03 — BLOQUE V: qué significa `void`', () => {
  it('V1) ejecutar — llama a la función una vez y tira lo que salga', () => {
    const espia = vi.fn<() => void>()
    ejecutar(espia)
    expect(espia).toHaveBeenCalledTimes(1)
  })

  it('V2) medirDoble — el espejo: aquí SÍ se usa lo que sale', () => {
    expect(medirDoble(() => 21)).toBe(42)
    expect(medirDoble(() => 0)).toBe(0)
  })

  it('V3) apuntar — devolver algo desde un `=> void` es legal', () => {
    registro.length = 0 // el registro es compartido: se limpia antes de mirar
    apuntar()
    expect(registro).toEqual(['visita'])
  })

  it('V4) BotonTimbre — el mismo `=> void`, ahora con el evento delante', () => {
    const avisar = vi.fn<(tipo: string) => void>()
    render(<BotonTimbre avisar={avisar} />)
    expect(avisar).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button'))
    expect(avisar).toHaveBeenCalledWith('click')
  })
})
