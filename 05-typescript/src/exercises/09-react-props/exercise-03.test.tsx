import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Marca,
  Estado,
  Acceso,
  AvisoError,
  Insignia,
  Perfil,
  Lista,
  CarritoRoto,
  CarritoBien,
  Notificacion,
} from './exercise-03'
import type { NotificacionProps } from './exercise-03'

describe('09-react-props / exercise-03 — renderizado condicional', () => {
  /* --- BLOQUE 0 — return null --- */
  it('1) Marca — visible pinta NUEVO, no visible no pinta nada', () => {
    const { container, rerender } = render(<Marca visible={true} />)
    expect(screen.getByText('NUEVO')).toBeInTheDocument()
    rerender(<Marca visible={false} />)
    expect(container).toBeEmptyDOMElement()
  })

  /* --- BLOQUE 1 — ternario --- */
  it('2) Estado — texto según activo', () => {
    const { rerender } = render(<Estado activo={true} />)
    expect(screen.getByText('En línea')).toBeInTheDocument()
    rerender(<Estado activo={false} />)
    expect(screen.getByText('Desconectado')).toBeInTheDocument()
  })
  it('3) Acceso — elemento distinto según logueado', () => {
    const { rerender } = render(<Acceso logueado={true} />)
    expect(screen.getByText('Bienvenido').tagName).toBe('P')
    rerender(<Acceso logueado={false} />)
    expect(screen.getByText('Entrar').tagName).toBe('A')
  })

  /* --- BLOQUE 2 — && --- */
  it('4) AvisoError — sin mensaje el div existe pero va vacío', () => {
    const { container } = render(<AvisoError />)
    expect(container.querySelector('div')).toBeInTheDocument()
    expect(container.querySelector('p')).toBeNull()
  })
  it('4b) AvisoError — con mensaje pinta el <p>', () => {
    render(<AvisoError mensaje="Falló algo" />)
    expect(screen.getByText('Falló algo').tagName).toBe('P')
  })
  it('5) Insignia — contador 0 no pinta <b>, contador>0 sí', () => {
    const { container, rerender } = render(<Insignia contador={0} />)
    expect(container.querySelector('b')).toBeNull()
    // y no hay "0" fantasma
    expect(container.textContent).toBe('')
    rerender(<Insignia contador={3} />)
    expect(screen.getByText('3').tagName).toBe('B')
  })

  /* --- BLOQUE 3 — early return --- */
  it('6) Perfil — sin nombre carga, con nombre muestra', () => {
    const { rerender } = render(<Perfil />)
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
    rerender(<Perfil nombre="Ana" />)
    expect(screen.getByText('Ana').tagName).toBe('H2')
  })
  it('7) Lista — vacía muestra estado vacío; con items, una lista', () => {
    const { rerender } = render(<Lista items={[]} />)
    expect(screen.getByText('Sin resultados')).toBeInTheDocument()
    rerender(<Lista items={['a', 'b']} />)
    expect(screen.getAllByRole('listitem').map((li) => li.textContent)).toEqual(['a', 'b'])
  })

  /* --- BLOQUE 4 — la trampa del && con números --- */
  it('8) CarritoRoto pinta "0" fantasma; CarritoBien no', () => {
    const roto = render(<CarritoRoto cantidad={0} />)
    // BUG: el 0 se coló como texto dentro del div
    expect(roto.container.textContent).toBe('0')
    roto.unmount()
    const bien = render(<CarritoBien cantidad={0} />)
    // CORRECTO: nada
    expect(bien.container.textContent).toBe('')
  })
  it('8b) con cantidad>0 los dos pintan igual', () => {
    const roto = render(<CarritoRoto cantidad={2} />)
    expect(roto.getByText('Tienes 2')).toBeInTheDocument()
    roto.unmount()
    const bien = render(<CarritoBien cantidad={2} />)
    expect(bien.getByText('Tienes 2')).toBeInTheDocument()
  })

  /* --- BLOQUE 5 — capstone --- */
  it('10) Notificacion — cargando: early return', () => {
    render(<Notificacion cargando={true} noLeidas={0} />)
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })
  it('10b) Notificacion — sin mensaje ni no-leídas', () => {
    const { container } = render(<Notificacion cargando={false} noLeidas={0} />)
    expect(screen.getByText('Sin novedades')).toBeInTheDocument()
    expect(container.querySelector('b')).toBeNull()
    // sin "0" fantasma
    expect(container.querySelector('section')?.textContent).toBe('Sin novedades')
  })
  it('10c) Notificacion — con mensaje y no-leídas', () => {
    render(<Notificacion cargando={false} mensaje="Hola" noLeidas={2} />)
    expect(screen.getByText('Hola')).toBeInTheDocument()
    expect(screen.getByText('2 sin leer').tagName).toBe('B')
  })
  it('10d) NotificacionProps — cargando y noLeidas obligatorias, mensaje opcional', () => {
    const ok: NotificacionProps = { cargando: false, noLeidas: 0 }
    expect(ok.cargando).toBe(false)
    // @ts-expect-error — noLeidas es obligatoria: omitirla debe ser error de tipos
    const falta: NotificacionProps = { cargando: false }
    expect(falta).toBeTruthy()
  })
})
