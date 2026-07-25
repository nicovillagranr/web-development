import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  partirUsuario,
  Caja,
  BotonPasarela,
  TituloSimple,
  CajaConAtributos,
  EntradaPasarela,
  Boton,
  CajaFija,
  CajaAbierta,
  Entrada,
  BotonAccion,
  EnlaceSeguro,
  BotonIcono,
} from './exercise-07'
import type {
  PropsDeBoton,
  BotonProps,
  EntradaProps,
  BotonAccionProps,
  EnlaceSeguroProps,
  BotonIconoProps,
} from './exercise-07'

describe('09-react-props / exercise-07 — ComponentProps y el rest {...resto}', () => {
  /* --- BLOQUE 0 — el rest en objetos --- */
  it('1) partirUsuario — parte el objeto en "lo mío" y "el resto"', () => {
    expect(partirUsuario({ id: 1, nombre: 'Ana', activo: true })).toEqual({
      id: 1,
      resto: { nombre: 'Ana', activo: true },
    })
    // el `id` NO se queda también dentro del resto: el rest lo excluye
    expect(Object.keys(partirUsuario({ id: 7, nombre: 'Leo', activo: false }).resto))
      .toEqual(['nombre', 'activo'])
  })

  /* --- BLOQUE 1 — derramar el rest sobre JSX --- */
  it('2) Caja — id y className llegan al div sin nombrarlos uno a uno', () => {
    const { container } = render(<Caja titulo="Hola" id="c1" className="caja" />)
    const div = container.querySelector('div')
    expect(div?.getAttribute('id')).toBe('c1')
    expect(div?.getAttribute('class')).toBe('caja')
    expect(div?.querySelector('h3')?.textContent).toBe('Hola')
    // el `titulo` se sacó del rest: NO debe acabar como atributo del div
    expect(div?.getAttribute('titulo')).toBeNull()
  })

  /* --- BLOQUE 2 — ComponentProps --- */
  it('3) BotonPasarela — deja pasar props nativas que nunca declaraste', () => {
    render(
      <BotonPasarela type="submit" disabled aria-label="Enviar">
        Ok
      </BotonPasarela>,
    )
    const boton = screen.getByRole('button', { name: 'Enviar' })
    expect(boton.getAttribute('type')).toBe('submit')
    expect(boton).toBeDisabled()
    expect(boton.textContent).toBe('Ok')
    const p: PropsDeBoton = { type: 'button', disabled: false }
    expect(p.type).toBe('button')
  })
  /* --- ESCALERA P — refuerzo del cuerpo del drill 3 --- */
  it('P1) TituloSimple — el parámetro con nombre, leído con punto', () => {
    const { container } = render(<TituloSimple texto="Hola" />)
    expect(container.querySelector('h1')?.textContent).toBe('Hola')
    // el dato SALE de las props: con otro texto, cambia lo pintado
    const otro = render(<TituloSimple texto="Adiós" />)
    expect(otro.container.querySelector('h1')?.textContent).toBe('Adiós')
  })

  it('P2) CajaConAtributos — derramar un objeto que ya tiene contenido', () => {
    const { container } = render(<CajaConAtributos />)
    const div = container.querySelector('div')
    expect(div?.getAttribute('id')).toBe('x1')
    expect(div?.getAttribute('class')).toBe('fija')
    expect(div?.textContent).toBe('fija')
  })

  it('P3) EntradaPasarela — parámetro con nombre + derrame entero', () => {
    const { container } = render(
      <EntradaPasarela type="email" placeholder="Correo" disabled />,
    )
    const input = container.querySelector('input')
    expect(input?.getAttribute('type')).toBe('email')
    expect(input?.getAttribute('placeholder')).toBe('Correo')
    expect(input).toBeDisabled()
  })

  it('P3b) EntradaPasarela — nada está clavado: con otras props, otro input', () => {
    const { container } = render(<EntradaPasarela type="text" value="Ana" readOnly />)
    const input = container.querySelector('input')
    expect(input?.getAttribute('type')).toBe('text')
    expect(input?.getAttribute('value')).toBe('Ana')
    expect(input).not.toBeDisabled()
  })

  it('4) Boton — variante va al className y el resto sigue pasando', () => {
    render(
      <Boton variante="primario" disabled>
        Ok
      </Boton>,
    )
    const boton = screen.getByRole('button')
    expect(boton.getAttribute('class')).toBe('primario')
    expect(boton).toBeDisabled()
    // children viajó dentro del rest
    expect(boton.textContent).toBe('Ok')
  })
  it('4b) BotonProps — hereda lo nativo y exige lo propio', () => {
    const p: BotonProps = { variante: 'secundario', type: 'submit' }
    expect(p.variante).toBe('secundario')
    // @ts-expect-error — `variante` es obligatoria, no la hereda de <button>
    const falta: BotonProps = { type: 'submit' }
    expect(falta).toBeTruthy()
    // @ts-expect-error — 'terciario' no está en la unión de literales
    const mala: BotonProps = { variante: 'terciario' }
    expect(mala).toBeTruthy()
  })

  /* --- BLOQUE 3 — el orden del derrame --- */
  it('5) CajaFija — el className propio gana porque se derrama ANTES', () => {
    const { container } = render(<CajaFija className="ajena" id="x" />)
    const div = container.querySelector('div')
    expect(div?.getAttribute('class')).toBe('mio')
    // lo que no choca sigue pasando
    expect(div?.getAttribute('id')).toBe('x')
  })
  it('5b) CajaAbierta — el className de quien llama PISA al propio', () => {
    const { container } = render(<CajaAbierta className="ajena" />)
    expect(container.querySelector('div')?.getAttribute('class')).toBe('ajena')
  })
  it('5c) CajaAbierta — si nadie manda className, queda el propio', () => {
    const { container } = render(<CajaAbierta />)
    expect(container.querySelector('div')?.getAttribute('class')).toBe('mio')
  })

  /* --- BLOQUE 4 — Omit sobre props nativas --- */
  it('6) Entrada — type fijo en "text", y lo demás pasa', () => {
    const { container } = render(<Entrada etiqueta="Nombre" placeholder="Ana" />)
    const input = container.querySelector('input')
    expect(input?.getAttribute('type')).toBe('text')
    expect(input?.getAttribute('placeholder')).toBe('Ana')
    expect(container.querySelector('label')?.textContent).toBe('Nombre')
  })
  it('6b) EntradaProps — `type` fue omitido: ya no se puede mandar', () => {
    const p: EntradaProps = { etiqueta: 'Nombre', placeholder: 'Ana' }
    expect(p.etiqueta).toBe('Nombre')
    // @ts-expect-error — `type` no forma parte del tipo: lo decide el componente
    const conType: EntradaProps = { etiqueta: 'Nombre', type: 'password' }
    expect(conType).toBeTruthy()
  })
  it('7) BotonAccion — el callback se entrega, y se ejecuta al clic', () => {
    const guardar = vi.fn()
    render(<BotonAccion onClick={guardar}>Guardar</BotonAccion>)
    expect(guardar).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button'))
    expect(guardar).toHaveBeenCalledTimes(1)
  })
  it('7b) BotonAccionProps — onClick estrechado a () => void', () => {
    const p: BotonAccionProps = { onClick: () => {} }
    expect(typeof p.onClick).toBe('function')
    // @ts-expect-error — el onClick estrechado NO recibe el evento del DOM
    const conEvento: BotonAccionProps = { onClick: (e: MouseEvent) => e.preventDefault() }
    expect(conEvento).toBeTruthy()
  })

  /* --- BLOQUE 5 — capstone --- */
  it('8) EnlaceSeguroProps — href obligatorio, target y rel prohibidos', () => {
    const p: EnlaceSeguroProps = { href: '/a' }
    expect(p.href).toBe('/a')
    // @ts-expect-error — en <a> nativo href es opcional; aquí NO
    const sinHref: EnlaceSeguroProps = { className: 'link' }
    expect(sinHref).toBeTruthy()
    // @ts-expect-error — `target` lo fija el componente, no quien llama
    const conTarget: EnlaceSeguroProps = { href: '/a', target: '_self' }
    expect(conTarget).toBeTruthy()
  })
  it('9) EnlaceSeguro — target y rel innegociables, el resto pasa', () => {
    const { container } = render(
      <EnlaceSeguro href="/a" className="link">
        Ir
      </EnlaceSeguro>,
    )
    const a = container.querySelector('a')
    expect(a?.getAttribute('href')).toBe('/a')
    expect(a?.getAttribute('class')).toBe('link')
    expect(a?.getAttribute('target')).toBe('_blank')
    expect(a?.getAttribute('rel')).toBe('noopener noreferrer')
    expect(a?.textContent).toBe('Ir')
  })
  it('10) BotonIcono — icono en su span, children después, variante por defecto', () => {
    const { container } = render(
      <BotonIcono icono={<b>★</b>} disabled>
        Guardar
      </BotonIcono>,
    )
    const boton = container.querySelector('button')
    expect(boton?.getAttribute('class')).toBe('primario')
    expect(boton).toBeDisabled()
    const span = boton?.querySelector('span.icono')
    expect(span?.textContent).toBe('★')
    expect(boton?.textContent).toBe('★Guardar')
    // el `icono` se sacó del rest: no puede acabar como atributo del button
    expect(boton?.getAttribute('icono')).toBeNull()
  })
  it('10b) BotonIcono — la variante explícita manda, y nadie la pisa', () => {
    const { container } = render(
      <BotonIcono icono={<b>★</b>} variante="secundario" className="ajena">
        Ok
      </BotonIcono>,
    )
    expect(container.querySelector('button')?.getAttribute('class')).toBe('secundario')
  })
  it('10c) BotonIconoProps — icono obligatorio, variante opcional', () => {
    const p: BotonIconoProps = { icono: '★' }
    expect(p.variante).toBeUndefined()
    // @ts-expect-error — falta `icono`
    const falta: BotonIconoProps = { variante: 'primario' }
    expect(falta).toBeTruthy()
  })
})
