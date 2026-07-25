import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  Avatar,
  FilaProducto,
  FilaUsuario,
  Chip,
  Resumen,
  Alta,
  Parche,
  TarjetaProducto,
} from './exercise-06'
import type {
  AvatarProps,
  ProductoProps,
  UsuarioProps,
  ChipProps,
  ResumenProps,
  AltaProps,
  ParcheProps,
  AltaRota,
  AltaSana,
  TarjetaProductoProps,
} from './exercise-06'

describe('09-react-props / exercise-06 — interface, extends y tipos derivados', () => {
  /* --- BLOQUE 0 --- */
  it('1) Avatar — url en src, nombre en alt', () => {
    render(<Avatar nombre="Ana" url="/ana.png" />)
    const img = screen.getByRole('img')
    expect(img.getAttribute('src')).toBe('/ana.png')
    expect(img.getAttribute('alt')).toBe('Ana')
    const props: AvatarProps = { nombre: 'Ana', url: '/ana.png' }
    expect(props.url).toBe('/ana.png')
  })

  /* --- BLOQUE 1 — extends --- */
  it('2) ProductoProps — hereda id y nombre de ElementoProps, y añade precio', () => {
    const p: ProductoProps = { id: 1, nombre: 'Pan', precio: 2 }
    expect(p.id).toBe(1)
    // @ts-expect-error — `id` viene heredado, así que es obligatorio
    const falta: ProductoProps = { nombre: 'Pan', precio: 2 }
    expect(falta).toBeTruthy()
  })
  it('2b) FilaProducto — nombre: precio€', () => {
    render(<FilaProducto id={1} nombre="Pan" precio={2} />)
    expect(screen.getByRole('listitem').textContent).toBe('Pan: 2€')
  })
  it('3) FilaUsuario — nombre (email), con la misma base heredada', () => {
    render(<FilaUsuario id={1} nombre="Ana" email="a@b.com" />)
    expect(screen.getByRole('listitem').textContent).toBe('Ana (a@b.com)')
    const u: UsuarioProps = { id: 1, nombre: 'Ana', email: 'a@b.com' }
    expect(u.email).toBe('a@b.com')
  })

  /* --- BLOQUE 2 — extends múltiple --- */
  it('4) Chip — junta className, etiqueta y onQuitar de dos bases', () => {
    const quitar = vi.fn()
    const { container } = render(
      <Chip className="tag" etiqueta="react" onQuitar={quitar} />,
    )
    const span = container.querySelector('span.tag')
    expect(span).not.toBeNull()
    expect(span?.textContent).toBe('reactx')
    // la función se ENTREGA, no se ejecuta al pintar
    expect(quitar).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button'))
    expect(quitar).toHaveBeenCalledTimes(1)
  })
  it('4b) ChipProps — exige las tres, vengan de donde vengan', () => {
    const c: ChipProps = { className: 'tag', etiqueta: 'react', onQuitar: () => {} }
    expect(c.etiqueta).toBe('react')
    // @ts-expect-error — falta `className`, heredado de ConEstilo
    const falta: ChipProps = { etiqueta: 'react', onQuitar: () => {} }
    expect(falta).toBeTruthy()
  })

  /* --- BLOQUE 3 — Pick / Omit / Partial --- */
  it('5) ResumenProps — SOLO nombre y precio', () => {
    render(<Resumen nombre="Pan" precio={2} />)
    expect(screen.getByText('Pan — 2€')).toBeInTheDocument()
    const r: ResumenProps = { nombre: 'Pan', precio: 2 }
    expect(r.precio).toBe(2)
    // @ts-expect-error — `descripcion` NO entró en el Pick
    const sobra: ResumenProps = { nombre: 'Pan', precio: 2, descripcion: 'x' }
    expect(sobra).toBeTruthy()
  })
  it('6) AltaProps — todo Articulo menos id', () => {
    const { container } = render(
      <Alta nombre="Pan" precio={2} descripcion="De masa madre" enStock={true} />,
    )
    expect(container.querySelector('h3')?.textContent).toBe('Pan')
    expect(container.querySelector('p')?.textContent).toBe('De masa madre')
    const a: AltaProps = { nombre: 'Pan', precio: 2, descripcion: 'x', enStock: true }
    expect(a.enStock).toBe(true)
    // @ts-expect-error — `id` fue omitido: ya no forma parte del tipo
    const conId: AltaProps = { id: 1, nombre: 'Pan', precio: 2, descripcion: 'x', enStock: true }
    expect(conId).toBeTruthy()
  })
  it('7) ParcheProps — todo opcional; el objeto vacío es válido', () => {
    const vacio: ParcheProps = {}
    expect(vacio).toEqual({})
    render(<Parche nombre="Pan" precio={2} />)
    expect(screen.getByText('Pan — 2€')).toBeInTheDocument()
  })
  it('7b) Parche — sin props usa los defectos', () => {
    render(<Parche />)
    expect(screen.getByText('(sin nombre) — 0€')).toBeInTheDocument()
  })
  it('7c) Parche — "" y 0 son valores QUE LLEGARON: `??` sí, `||` no', () => {
    render(<Parche nombre="" precio={0} />)
    // con `||` saldría "(sin nombre) — 0€" y este test fallaría
    expect(screen.getByText('— 0€')).toBeInTheDocument()
    expect(screen.queryByText('(sin nombre) — 0€')).toBeNull()
  })

  /* --- BLOQUE 4 — la trampa de Omit --- */
  it('8) Omit con la clave mal escrita NO quita nada (y TS no avisa)', () => {
    // AltaRota = Omit<Articulo, 'idd'> → el typo se traga, `id` SIGUE ahí
    const rota: AltaRota = {
      id: 1, nombre: 'Pan', precio: 2, descripcion: 'x', enStock: true,
    }
    expect(rota.id).toBe(1)
    // AltaSana = Omit<Articulo, 'id'> → aquí sí desapareció
    // @ts-expect-error — `id` ya no existe en AltaSana
    const sana: AltaSana = { id: 1, nombre: 'Pan', precio: 2, descripcion: 'x', enStock: true }
    expect(sana).toBeTruthy()
  })

  /* --- BLOQUE 5 — capstone --- */
  it('9) TarjetaProductoProps — recorte del dominio + extras de UI', () => {
    const p: TarjetaProductoProps = { nombre: 'Pan', precio: 2, onComprar: () => {} }
    expect(p.destacado).toBeUndefined()
    // @ts-expect-error — `descripcion` no entró en el Pick del extends
    const sobra: TarjetaProductoProps = { nombre: 'Pan', precio: 2, descripcion: 'x', onComprar: () => {} }
    expect(sobra).toBeTruthy()
  })
  it('10) TarjetaProducto — clase normal y botón que entrega el callback', () => {
    const comprar = vi.fn()
    const { container } = render(
      <TarjetaProducto nombre="Pan" precio={2} onComprar={comprar} />,
    )
    const article = container.querySelector('article')
    expect(article?.getAttribute('class')).toBe('normal')
    expect([...(article?.children ?? [])].map((el) => el.tagName.toLowerCase()))
      .toEqual(['h3', 'b', 'button'])
    expect(container.querySelector('b')?.textContent).toBe('2€')
    expect(comprar).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button'))
    expect(comprar).toHaveBeenCalledTimes(1)
  })
  it('10b) TarjetaProducto — destacado cambia la clase', () => {
    const { container } = render(
      <TarjetaProducto nombre="Pan" precio={2} destacado onComprar={() => {}} />,
    )
    expect(container.querySelector('article')?.getAttribute('class')).toBe('destacada')
  })
})
