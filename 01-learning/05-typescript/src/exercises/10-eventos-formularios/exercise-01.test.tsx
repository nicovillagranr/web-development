import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  BotonSimple,
  BotonTipo,
  BotonSintetico,
  BotonExtraido,
  EnlaceSeguro,
  BotonAlias,
  BotonIcono,
  BotonOpcional,
  BotonDoble,
  BotonConfirmar,
} from './exercise-01'
import type { ManejadorDeClic, BotonIconoProps, BotonConfirmarProps } from './exercise-01'

describe('10-eventos-formularios / exercise-01 — el handler y el tipo del evento', () => {
  /* --- BLOQUE 0 — entregar ≠ ejecutar --- */
  it('1) BotonSimple — pinta el botón y NO llama al handler al pintar', () => {
    const espia = vi.fn()
    render(<BotonSimple alPulsar={espia} />)
    expect(screen.getByRole('button', { name: 'Pulsar' })).toBeInTheDocument()
    // si estuviera `onClick={alPulsar()}`, el espía ya estaría llamado aquí
    expect(espia).not.toHaveBeenCalled()
  })
  it('1b) BotonSimple — llama al handler al hacer clic', async () => {
    const espia = vi.fn()
    render(<BotonSimple alPulsar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Pulsar' }))
    expect(espia).toHaveBeenCalledTimes(1)
  })

  /* --- BLOQUE 1 — tipado contextual --- */
  it('2) BotonTipo — avisa con el tipo del evento', async () => {
    const espia = vi.fn()
    render(<BotonTipo alAvisar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Pulsar' }))
    expect(espia).toHaveBeenCalledWith('click')
  })
  it('3) BotonSintetico — el evento NATIVO viaja dentro y dice lo mismo', async () => {
    const espia = vi.fn()
    render(<BotonSintetico alAvisar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Pulsar' }))
    expect(espia).toHaveBeenCalledWith('click')
  })

  /* --- BLOQUE 2 — handler extraído y anotado --- */
  it('4) BotonExtraido — mismo resultado con el handler fuera del JSX', async () => {
    const espia = vi.fn()
    render(<BotonExtraido alAvisar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Pulsar' }))
    expect(espia).toHaveBeenCalledWith('click')
  })
  it('5) EnlaceSeguro — cancela la navegación por defecto', async () => {
    const espia = vi.fn()
    render(<EnlaceSeguro alPulsar={espia} />)
    await userEvent.click(screen.getByRole('link', { name: 'Ir' }))
    expect(espia).toHaveBeenCalledWith(true)
  })
  it('5b) EnlaceSeguro — el enlace apunta a algún sitio (el href sigue ahí)', () => {
    render(<EnlaceSeguro alPulsar={() => {}} />)
    expect(screen.getByRole('link', { name: 'Ir' })).toHaveAttribute(
      'href',
      'https://ejemplo.com',
    )
  })

  /* --- BLOQUE 3 — el alias del handler --- */
  it('6) BotonAlias — funciona igual con el tipo puesto en la constante', async () => {
    const espia = vi.fn()
    render(<BotonAlias alAvisar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Pulsar' }))
    expect(espia).toHaveBeenCalledWith('click')
  })
  it('6b) ManejadorDeClic — recibe el evento y no devuelve nada', () => {
    const recogido: string[] = []
    // `e` va SIN anotar a propósito: si el alias está bien, el tipo baja solo
    const manejador: ManejadorDeClic = (e) => {
      recogido.push(e.type)
    }
    render(<BotonIcono icono="🗑" onPulsar={manejador} />)
    expect(recogido).toEqual([])
  })

  /* --- BLOQUE 4 — el handler como prop --- */
  it('7) BotonIcono — pinta el icono y entrega el handler', async () => {
    const espia = vi.fn()
    render(<BotonIcono icono="🗑" onPulsar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: '🗑' }))
    expect(espia).toHaveBeenCalledTimes(1)
  })
  it('7b) BotonIcono — al handler le llega el EVENTO, no otra cosa', async () => {
    const espia = vi.fn()
    render(<BotonIcono icono="🗑" onPulsar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: '🗑' }))
    expect(espia.mock.calls[0]?.[0]).toMatchObject({ type: 'click' })
  })
  it('7c) BotonIconoProps — las dos props son obligatorias', () => {
    const completo: BotonIconoProps = { icono: '🗑', onPulsar: () => {} }
    expect(completo.icono).toBe('🗑')
    // @ts-expect-error — falta `onPulsar`, que es obligatoria
    const incompleto: BotonIconoProps = { icono: '🗑' }
    expect(incompleto).toBeTruthy()
  })
  it('8) BotonOpcional — sin handler, el clic no rompe nada', async () => {
    render(<BotonOpcional texto="Nada" />)
    await userEvent.click(screen.getByRole('button', { name: 'Nada' }))
    expect(screen.getByRole('button', { name: 'Nada' })).toBeInTheDocument()
  })
  it('8b) BotonOpcional — con handler, se llama igual', async () => {
    const espia = vi.fn()
    render(<BotonOpcional texto="Algo" onPulsar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Algo' }))
    expect(espia).toHaveBeenCalledTimes(1)
  })

  /* --- BLOQUE 5 — capstone --- */
  it('9) BotonDoble — un clic suelto dispara solo onPulsar', async () => {
    const clic = vi.fn()
    const doble = vi.fn()
    render(<BotonDoble onPulsar={clic} onDoblePulsar={doble} />)
    await userEvent.click(screen.getByRole('button', { name: 'Doble' }))
    expect(clic).toHaveBeenCalledTimes(1)
    expect(doble).not.toHaveBeenCalled()
  })
  it('9b) BotonDoble — el doble clic dispara onDoblePulsar (y dos clics antes)', async () => {
    const clic = vi.fn()
    const doble = vi.fn()
    render(<BotonDoble onPulsar={clic} onDoblePulsar={doble} />)
    await userEvent.dblClick(screen.getByRole('button', { name: 'Doble' }))
    expect(doble).toHaveBeenCalledTimes(1)
    expect(clic).toHaveBeenCalledTimes(2)
  })
  it('10) BotonConfirmar — sin bloquear, confirma y recibe el evento', async () => {
    const espia = vi.fn()
    render(<BotonConfirmar texto="Ok" onConfirmar={espia} />)
    await userEvent.click(screen.getByRole('button', { name: 'Ok' }))
    expect(espia).toHaveBeenCalledTimes(1)
    expect(espia.mock.calls[0]?.[0]).toMatchObject({ type: 'click' })
  })
  it('10b) BotonConfirmar — bloqueado NO confirma', async () => {
    const espia = vi.fn()
    render(<BotonConfirmar texto="Ok" onConfirmar={espia} bloqueado={true} />)
    await userEvent.click(screen.getByRole('button', { name: 'Ok' }))
    expect(espia).not.toHaveBeenCalled()
  })
  it('10c) BotonConfirmar — bloqueado se PINTA igual: el botón no lleva disabled', () => {
    render(<BotonConfirmar texto="Ok" onConfirmar={() => {}} bloqueado={true} />)
    expect(screen.getByRole('button', { name: 'Ok' })).toBeEnabled()
  })
  it('10d) BotonConfirmarProps — bloqueado es opcional, las otras dos no', () => {
    const minimo: BotonConfirmarProps = { texto: 'Ok', onConfirmar: () => {} }
    expect(minimo.bloqueado).toBeUndefined()
    // @ts-expect-error — falta `onConfirmar`, que es obligatoria
    const roto: BotonConfirmarProps = { texto: 'Ok', bloqueado: true }
    expect(roto).toBeTruthy()
  })
})
