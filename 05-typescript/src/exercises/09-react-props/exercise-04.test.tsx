import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  ListaSimple,
  ListaProductos,
  TablaPrecios,
  Etiquetas,
  Pasos,
  Bandeja,
  Contador,
  Escaparate,
  NombresEnStock,
} from './exercise-04'
import type { Producto, EscaparateProps } from './exercise-04'

const PRODUCTOS: Producto[] = [
  { id: 1, nombre: 'Pan', precio: 2, enStock: true },
  { id: 2, nombre: 'Sal', precio: 1, enStock: false },
  { id: 3, nombre: 'Té', precio: 3, enStock: true },
]

const textos = (role: string) =>
  screen.getAllByRole(role).map((el) => el.textContent)

describe('09-react-props / exercise-04 — listas y keys', () => {
  /* --- BLOQUE 0 --- */
  it('1) ListaSimple — un <li> por nombre', () => {
    render(<ListaSimple nombres={['a', 'b']} />)
    expect(textos('listitem')).toEqual(['a', 'b'])
  })

  /* --- BLOQUE 1 --- */
  it('2) ListaProductos — muestra el nombre de cada producto', () => {
    render(<ListaProductos productos={PRODUCTOS} />)
    expect(textos('listitem')).toEqual(['Pan', 'Sal', 'Té'])
  })
  it('3) TablaPrecios — nombre: precio€', () => {
    render(<TablaPrecios productos={[{ id: 1, nombre: 'Pan', precio: 2, enStock: true }]} />)
    expect(screen.getByRole('listitem').textContent).toBe('Pan: 2€')
  })

  /* --- BLOQUE 2 --- */
  it('4) Etiquetas — un <span> por tag, sin props extra (key no llega)', () => {
    const { container } = render(<Etiquetas tags={['react', 'ts']} />)
    const spans = container.querySelectorAll('span')
    expect([...spans].map((s) => s.textContent)).toEqual(['react', 'ts'])
    // key no aparece como atributo del DOM: React se lo queda
    expect(spans[0]?.getAttribute('key')).toBeNull()
  })
  it('5) Pasos — soporta elementos repetidos (key por índice)', () => {
    render(<Pasos pasos={['amasar', 'amasar', 'hornear']} />)
    expect(textos('listitem')).toEqual(['amasar', 'amasar', 'hornear'])
  })

  /* --- BLOQUE 3 --- */
  it('6) Bandeja — vacía muestra estado vacío; con datos, lista', () => {
    const { rerender } = render(<Bandeja correos={[]} />)
    expect(screen.getByText('Bandeja vacía')).toBeInTheDocument()
    rerender(<Bandeja correos={['a@b.com', 'c@d.com']} />)
    expect(textos('listitem')).toEqual(['a@b.com', 'c@d.com'])
  })
  it('7) Contador — cuenta los items', () => {
    const { rerender } = render(<Contador items={['a', 'b', 'c']} />)
    expect(screen.getByText('Total: 3')).toBeInTheDocument()
    rerender(<Contador items={[]} />)
    expect(screen.getByText('Total: 0')).toBeInTheDocument()
  })

  /* --- BLOQUE 4 — capstone --- */
  it('9) Escaparate — soloEnStock=false muestra todos', () => {
    render(<Escaparate productos={PRODUCTOS} soloEnStock={false} />)
    expect(textos('listitem')).toEqual(['Pan', 'Sal', 'Té'])
  })
  it('9b) Escaparate — soloEnStock=true filtra los sin stock', () => {
    render(<Escaparate productos={PRODUCTOS} soloEnStock={true} />)
    expect(textos('listitem')).toEqual(['Pan', 'Té'])
  })
  it('10) NombresEnStock — filtra por stock y muestra solo el nombre', () => {
    render(<NombresEnStock productos={PRODUCTOS} />)
    // caza el no-op .map(p=>p): si devolviera el objeto entero, no habría estos textos
    expect(textos('listitem')).toEqual(['Pan', 'Té'])
  })
  it('10b) NombresEnStock — sin productos en stock, lista vacía', () => {
    render(<NombresEnStock productos={[{ id: 1, nombre: 'Sal', precio: 1, enStock: false }]} />)
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })
  it('8) EscaparateProps — productos y soloEnStock obligatorias', () => {
    const ok: EscaparateProps = { productos: [], soloEnStock: false }
    expect(ok.soloEnStock).toBe(false)
    // @ts-expect-error — soloEnStock es obligatoria: omitirla debe ser error de tipos
    const falta: EscaparateProps = { productos: [] }
    expect(falta).toBeTruthy()
  })
})
