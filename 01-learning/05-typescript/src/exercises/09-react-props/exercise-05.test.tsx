import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Marco,
  Tarjeta,
  CajaOpcional,
  Layout,
  PanelDoble,
  Dialogo,
  Estrella,
  ConIcono,
  ConIconoFn,
  Pagina,
} from './exercise-05'
import type { PaginaProps } from './exercise-05'

describe('09-react-props / exercise-05 — composición: children y slots nombrados', () => {
  /* --- BLOQUE 0 --- */
  it('1) Marco — envuelve el children en <article class="marco">', () => {
    const { container } = render(<Marco><p>Hola</p></Marco>)
    const article = container.querySelector('article.marco')
    expect(article).not.toBeNull()
    expect(article?.innerHTML).toBe('<p>Hola</p>')
  })

  /* --- BLOQUE 1 --- */
  it('2) Tarjeta — titulo en <h3> y children después', () => {
    const { container } = render(<Tarjeta titulo="Perfil"><p>Ana</p></Tarjeta>)
    expect(screen.getByRole('heading', { level: 3 }).textContent).toBe('Perfil')
    expect(container.querySelector('section')?.innerHTML).toBe('<h3>Perfil</h3><p>Ana</p>')
  })
  it('3) CajaOpcional — sin children pinta el estado vacío', () => {
    render(<CajaOpcional />)
    expect(screen.getByText('Vacío')).toBeInTheDocument()
  })
  it('3b) CajaOpcional — con children lo envuelve en un <div>', () => {
    const { container } = render(<CajaOpcional><b>Hola</b></CajaOpcional>)
    expect(screen.queryByText('Vacío')).toBeNull()
    expect(container.querySelector('div > b')?.textContent).toBe('Hola')
  })

  /* --- BLOQUE 2 --- */
  it('4) Layout — cabecera en <header>, children en <main>', () => {
    const { container } = render(
      <Layout cabecera={<h1>Web</h1>}><p>Cuerpo</p></Layout>,
    )
    expect(container.querySelector('header')?.innerHTML).toBe('<h1>Web</h1>')
    expect(container.querySelector('main')?.innerHTML).toBe('<p>Cuerpo</p>')
  })
  it('5) PanelDoble — cada slot en su div, sin mezclarse', () => {
    const { container } = render(<PanelDoble izquierda={<p>A</p>} derecha={<p>B</p>} />)
    expect(container.querySelector('.izq')?.innerHTML).toBe('<p>A</p>')
    expect(container.querySelector('.der')?.innerHTML).toBe('<p>B</p>')
  })

  /* --- BLOQUE 3 --- */
  it('6) Dialogo — sin pie no pinta <footer>', () => {
    const { container } = render(<Dialogo titulo="Aviso"><p>Texto</p></Dialogo>)
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('Aviso')
    expect(container.querySelector('footer')).toBeNull()
  })
  it('6b) Dialogo — con pie lo envuelve en <footer>', () => {
    const { container } = render(
      <Dialogo titulo="Aviso" pie={<button>Ok</button>}><p>Texto</p></Dialogo>,
    )
    expect(container.querySelector('footer')?.innerHTML).toBe('<button>Ok</button>')
  })

  /* --- BLOQUE 4 — elemento vs componente --- */
  it('7) ConIcono — recibe un ELEMENTO ya construido y lo pinta', () => {
    const { container } = render(<ConIcono icono={<Estrella />} texto="Favorito" />)
    expect(container.querySelector('p')?.innerHTML).toBe('<span>★</span>Favorito')
  })
  it('8) ConIconoFn — recibe la FUNCIÓN y la construye dentro', () => {
    const { container } = render(<ConIconoFn Icono={Estrella} texto="Favorito" />)
    expect(container.querySelector('p')?.innerHTML).toBe('<span>★</span>Favorito')
  })
  it('8b) ConIconoFn — el slot pide la FUNCIÓN: un elemento no encaja', () => {
    // Solo se CONSTRUYE el elemento, no se renderiza: si se renderizara, React
    // reventaría con "Element type is invalid ... but got: <Estrella />".
    // @ts-expect-error — `Icono` pide `() => ReactNode`; `<Estrella />` ya es el resultado
    const malo = <ConIconoFn Icono={<Estrella />} texto="x" />
    expect(malo).toBeTruthy()
  })

  /* --- BLOQUE 5 — capstone --- */
  it('9) PaginaProps — titulo y children obligatorios, cabecera y pie opcionales', () => {
    const minima: PaginaProps = { titulo: 'Inicio', children: 'x' }
    expect(minima.titulo).toBe('Inicio')
    const completa: PaginaProps = {
      titulo: 'Inicio',
      children: 'x',
      cabecera: 'c',
      pie: 'p',
    }
    expect(completa.pie).toBe('p')
    // @ts-expect-error — `titulo` es obligatoria: omitirla debe ser error de tipos
    const falta: PaginaProps = { children: 'x' }
    expect(falta).toBeTruthy()
  })
  it('10) Pagina — sin slots opcionales solo pinta h1 y main', () => {
    const { container } = render(<Pagina titulo="Inicio"><p>Hola</p></Pagina>)
    expect(container.querySelector('header')).toBeNull()
    expect(container.querySelector('footer')).toBeNull()
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Inicio')
    expect(container.querySelector('main')?.innerHTML).toBe('<p>Hola</p>')
  })
  it('10b) Pagina — con los tres slots, en el orden pedido', () => {
    const { container } = render(
      <Pagina titulo="Inicio" cabecera={<nav>Menú</nav>} pie={<small>©</small>}>
        <p>Hola</p>
      </Pagina>,
    )
    const hijos = [...(container.querySelector('div')?.children ?? [])]
    expect(hijos.map((el) => el.tagName.toLowerCase())).toEqual([
      'header', 'h1', 'main', 'footer',
    ])
    expect(container.querySelector('footer')?.innerHTML).toBe('<small>©</small>')
  })
})
