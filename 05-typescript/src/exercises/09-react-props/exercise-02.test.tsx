import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Etiqueta,
  Saludo,
  Precio,
  Boton,
  Avatar,
  Contador,
  CampoTexto,
  PrecioRoto,
  PrecioBien,
  Tarjeta,
} from './exercise-02'
import type { TarjetaProps } from './exercise-02'

describe('09-react-props / exercise-02 — props opcionales y defaults', () => {
  /* --- BLOQUE 0 — opcional = T | undefined --- */
  it('1) Etiqueta — sin color no aplica color inline', () => {
    render(<Etiqueta texto="Hola" />)
    const span = screen.getByText('Hola')
    expect(span).toBeInTheDocument()
    expect(span.style.color).toBe('')
  })
  it('1b) Etiqueta — con color lo aplica', () => {
    render(<Etiqueta texto="Hola" color="red" />)
    expect(screen.getByText('Hola').style.color).toBe('red')
  })

  /* --- BLOQUE 1 — defecto con ?? en el cuerpo --- */
  it('2) Saludo — sin nombre usa "invitado"', () => {
    render(<Saludo />)
    expect(screen.getByText('Hola, invitado')).toBeInTheDocument()
  })
  it('2b) Saludo — con nombre lo usa', () => {
    render(<Saludo nombre="Nico" />)
    expect(screen.getByText('Hola, Nico')).toBeInTheDocument()
  })
  it('3) Precio — moneda por defecto € ; cantidad obligatoria', () => {
    const { rerender } = render(<Precio cantidad={10} />)
    expect(screen.getByText('10 €')).toBeInTheDocument()
    rerender(<Precio cantidad={10} moneda="$" />)
    expect(screen.getByText('10 $')).toBeInTheDocument()
  })

  /* --- BLOQUE 2 — defecto en la firma --- */
  it('4) Boton — tamano por defecto "medio"', () => {
    const { rerender } = render(<Boton texto="Ok" />)
    expect(screen.getByRole('button', { name: 'Ok' })).toHaveClass('medio')
    rerender(<Boton texto="Ok" tamano="grande" />)
    expect(screen.getByRole('button', { name: 'Ok' })).toHaveClass('grande')
  })
  it('5) Avatar — tamanoPx por defecto 40 (número)', () => {
    const { rerender } = render(<Avatar nombre="Ana" />)
    expect(screen.getByRole('img', { name: 'Ana' })).toHaveAttribute('width', '40')
    rerender(<Avatar nombre="Ana" tamanoPx={80} />)
    expect(screen.getByRole('img', { name: 'Ana' })).toHaveAttribute('width', '80')
  })

  /* --- BLOQUE 3 — ?? vs || --- */
  it('6) Contador — sin valor muestra 0', () => {
    render(<Contador />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })
  it('6b) Contador — valor={0} muestra 0 (no el defecto)', () => {
    render(<Contador valor={0} />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })
  it('6c) Contador — valor={5} muestra 5', () => {
    render(<Contador valor={5} />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })
  it('7) CampoTexto — sin valor el input queda vacío', () => {
    render(<CampoTexto />)
    expect(screen.getByRole('textbox')).toHaveValue('')
  })
  it('7b) CampoTexto — con valor lo refleja', () => {
    render(<CampoTexto valor="hola" />)
    expect(screen.getByRole('textbox')).toHaveValue('hola')
  })
  it('8) PrecioRoto vs PrecioBien — el bug del || con descuento={0}', () => {
    const { unmount } = render(<PrecioRoto descuento={0} />)
    // el || se comió el 0 y puso el defecto 100 → BUG
    expect(screen.getByText('100')).toBeInTheDocument()
    unmount()
    render(<PrecioBien descuento={0} />)
    // el ?? respetó el 0 → CORRECTO
    expect(screen.getByText('0')).toBeInTheDocument()
  })
  it('8b) PrecioRoto vs PrecioBien — sin descuento, los DOS dan el defecto 100', () => {
    const { unmount } = render(<PrecioRoto />)
    expect(screen.getByText('100')).toBeInTheDocument()
    unmount()
    render(<PrecioBien />)
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  /* --- BLOQUE 4 — capstone --- */
  it('10) Tarjeta — solo título: defaults aplicados', () => {
    render(<Tarjeta titulo="Hola" />)
    const article = screen.getByRole('heading', { name: 'Hola' }).parentElement
    expect(article?.tagName).toBe('ARTICLE')
    expect(article).not.toHaveClass('destacada')
    expect((article as HTMLElement).style.margin).toBe('0px')
    // subtítulo vacío: el <p> existe pero sin texto
    expect(article?.querySelector('p')?.textContent).toBe('')
  })
  it('10b) Tarjeta — todas las props puestas', () => {
    render(<Tarjeta titulo="Hola" subtitulo="Mundo" destacada margen={8} />)
    const article = screen.getByRole('heading', { name: 'Hola' }).parentElement as HTMLElement
    expect(article).toHaveClass('destacada')
    expect(article.style.margin).toBe('8px')
    expect(screen.getByText('Mundo')).toBeInTheDocument()
  })
  it('10c) Tarjeta — margen={0} da margin 0, no el defecto (mismo valor, pero prueba que 0 pasa)', () => {
    render(<Tarjeta titulo="X" margen={0} />)
    const article = screen.getByRole('heading', { name: 'X' }).parentElement as HTMLElement
    expect(article.style.margin).toBe('0px')
  })
  it('10d) TarjetaProps — solo titulo es obligatoria', () => {
    const minima: TarjetaProps = { titulo: 'X' }
    expect(minima.titulo).toBe('X')
    // @ts-expect-error — titulo es obligatoria: omitirla debe ser error de tipos
    const sinTitulo: TarjetaProps = { subtitulo: 'y' }
    expect(sinTitulo).toBeTruthy()
  })
})
