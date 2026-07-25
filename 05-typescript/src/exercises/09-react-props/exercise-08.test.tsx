import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  Insignia,
  BotonRoto,
  Boton,
  Mensaje,
  Aviso,
  describirBoton,
  etiquetaDe,
  Campo,
} from './exercise-08'
import type {
  EnlaceProps,
  AccionProps,
  BotonProps,
  MensajeProps,
  AvisoProps,
  CampoProps,
} from './exercise-08'

describe('09-react-props / exercise-08 — props mutuamente excluyentes', () => {
  /* --- BLOQUE 0 --- */
  it('1) Insignia — la unión de literales decide clase y texto', () => {
    const { container } = render(<Insignia estado="activo" />)
    const span = container.querySelector('span')
    expect(span?.getAttribute('class')).toBe('activo')
    expect(span?.textContent).toBe('Activo')
  })
  it('1b) Insignia — el otro miembro de la unión', () => {
    const { container } = render(<Insignia estado="inactivo" />)
    expect(container.querySelector('span')?.textContent).toBe('Inactivo')
  })

  /* --- BLOQUE 1 — los agujeros del tipo con opcionales --- */
  it('2) BotonRoto — funciona en los dos casos buenos', () => {
    const { unmount } = render(<BotonRoto texto="Ir" href="/a" />)
    expect(screen.getByRole('link').getAttribute('href')).toBe('/a')
    unmount()
    const pulsar = vi.fn()
    render(<BotonRoto texto="Ok" onClick={pulsar} />)
    fireEvent.click(screen.getByRole('button'))
    expect(pulsar).toHaveBeenCalledTimes(1)
  })
  it('2b) AGUJERO Nº1 — sin href y sin onClick COMPILA, y no hace nada', () => {
    // ⚠️ Fíjate en lo que NO hay aquí: ningún @ts-expect-error. El tipo lo admite.
    render(<BotonRoto texto="Ok" />)
    const boton = screen.getByRole('button')
    fireEvent.click(boton) // no explota… porque no hay nada que ejecutar
    expect(boton.textContent).toBe('Ok')
  })
  it('2c) AGUJERO Nº2 — con href Y onClick COMPILA, y el onClick se ignora', () => {
    const pulsar = vi.fn()
    render(<BotonRoto texto="Ir" href="#ver" onClick={pulsar} />)
    fireEvent.click(screen.getByRole('link'))
    // quien escribió esto creía haber puesto un manejador. Nunca se llamará.
    expect(pulsar).not.toHaveBeenCalled()
  })

  /* --- BLOQUE 2 — la unión discriminada --- */
  it('3) BotonProps — cada miembro exige lo suyo y prohíbe lo del otro', () => {
    const e: EnlaceProps = { como: 'enlace', texto: 'Ir', href: '/a' }
    const a: AccionProps = { como: 'accion', texto: 'Ok', onClick: () => {} }
    const union: BotonProps[] = [e, a]
    expect(union).toHaveLength(2)
    // @ts-expect-error — 'enlace' exige href
    const sinHref: BotonProps = { como: 'enlace', texto: 'Ir' }
    expect(sinHref).toBeTruthy()
    // @ts-expect-error — no se puede ser enlace Y traer onClick: el agujero, cerrado
    const mixto: BotonProps = { como: 'enlace', texto: 'Ir', href: '/a', onClick: () => {} }
    expect(mixto).toBeTruthy()
    // @ts-expect-error — 'ninguno' no es un discriminante válido
    const raro: BotonProps = { como: 'ninguno', texto: 'Ir' }
    expect(raro).toBeTruthy()
  })
  it('4) Boton — la rama enlace pinta un <a>', () => {
    render(<Boton como="enlace" texto="Ir" href="/a" />)
    const link = screen.getByRole('link')
    expect(link.getAttribute('href')).toBe('/a')
    expect(link.textContent).toBe('Ir')
    expect(screen.queryByRole('button')).toBeNull()
  })
  it('4b) Boton — la rama accion pinta un <button> con su callback', () => {
    const pulsar = vi.fn()
    render(<Boton como="accion" texto="Ok" onClick={pulsar} />)
    expect(pulsar).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button'))
    expect(pulsar).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('link')).toBeNull()
  })

  /* --- BLOQUE 3 — switch con tres miembros --- */
  it('5) Mensaje — las tres ramas, cada una con sus propias props', () => {
    const { unmount } = render(<Mensaje tipo="exito" detalle="Guardado" />)
    expect(screen.getByText('Guardado').getAttribute('class')).toBe('exito')
    unmount()
    const segunda = render(<Mensaje tipo="error" codigo={404} />)
    expect(segunda.container.querySelector('p')?.textContent).toBe('Error 404')
    expect(segunda.container.querySelector('p')?.getAttribute('class')).toBe('error')
    segunda.unmount()
    render(<Mensaje tipo="cargando" />)
    expect(screen.getByText('Cargando…').getAttribute('class')).toBe('cargando')
  })
  it('5b) MensajeProps — el miembro sin datos no admite datos de otro', () => {
    const c: MensajeProps = { tipo: 'cargando' }
    expect(c.tipo).toBe('cargando')
    // @ts-expect-error — `codigo` es del miembro 'error', no del 'cargando'
    const mezcla: MensajeProps = { tipo: 'cargando', codigo: 404 }
    expect(mezcla).toBeTruthy()
    // @ts-expect-error — 'error' exige codigo
    const sinCodigo: MensajeProps = { tipo: 'error' }
    expect(sinCodigo).toBeTruthy()
  })

  /* --- BLOQUE 4 — el operador `in` --- */
  it('6) Aviso — la rama con onCerrar trae botón', () => {
    const cerrar = vi.fn()
    const { container } = render(<Aviso texto="Guardado" onCerrar={cerrar} />)
    expect(container.querySelector('div')?.textContent).toBe('GuardadoCerrar')
    expect(container.querySelector('small')).toBeNull()
    fireEvent.click(screen.getByRole('button'))
    expect(cerrar).toHaveBeenCalledTimes(1)
  })
  it('6b) Aviso — la rama con segundos trae <small> y ningún botón', () => {
    const { container } = render(<Aviso texto="Guardado" segundos={3} />)
    expect(container.querySelector('small')?.textContent).toBe('3s')
    expect(screen.queryByRole('button')).toBeNull()
  })
  it('6c) ⚠️ AvisoProps — SIN discriminante, el agujero sigue abierto', () => {
    const a: AvisoProps = { texto: 'x', segundos: 3 }
    expect(a.texto).toBe('x')
    // Fíjate: NO hay @ts-expect-error. Esto compila, y no deberías poder escribirlo.
    // Contra una unión, TS solo rechaza claves que no estén en NINGÚN miembro;
    // `onCerrar` está en uno, así que pasa. Compáralo con el drill 3, donde el
    // discriminante elige el miembro PRIMERO y ahí sí se rechaza la mezcla.
    const mixto: AvisoProps = { texto: 'x', segundos: 3, onCerrar: () => {} }
    expect(mixto).toBeTruthy()
    // @ts-expect-error — lo que sí caza: una clave que no está en ningún miembro
    const inventada: AvisoProps = { texto: 'x', segundos: 3, color: 'rojo' }
    expect(inventada).toBeTruthy()
  })

  /* --- BLOQUE 5 — narrowing sin JSX + guardia never --- */
  it('7) describirBoton — mismo narrowing, cero React', () => {
    expect(describirBoton({ como: 'enlace', texto: 'Ir', href: '/a' })).toBe('Enlace a /a')
    expect(describirBoton({ como: 'accion', texto: 'Ok', onClick: () => {} })).toBe('Acción: Ok')
  })
  it('8) etiquetaDe — los tres casos (la guardia never la comprueba `pnpm typecheck`)', () => {
    expect(etiquetaDe({ tipo: 'exito', detalle: 'x' })).toBe('Todo bien')
    expect(etiquetaDe({ tipo: 'error', codigo: 500 })).toBe('Falló')
    expect(etiquetaDe({ tipo: 'cargando' })).toBe('Esperando')
  })

  /* --- BLOQUE 6 — capstone --- */
  it('9) CampoProps — cada clase exige su propio equipaje', () => {
    const t: CampoProps = { clase: 'texto', etiqueta: 'Nombre', valor: 'Ana' }
    expect(t.etiqueta).toBe('Nombre')
    // @ts-expect-error — 'numero' exige `maximo` además de `valor`
    const sinMaximo: CampoProps = { clase: 'numero', etiqueta: 'Edad', valor: 30 }
    expect(sinMaximo).toBeTruthy()
    // @ts-expect-error — `opciones` es de 'seleccion'; en 'texto' sobra
    const mezcla: CampoProps = { clase: 'texto', etiqueta: 'x', valor: 'a', opciones: ['a'] }
    expect(mezcla).toBeTruthy()
    // @ts-expect-error — 'texto' quiere un string, no un number
    const malTipo: CampoProps = { clase: 'texto', etiqueta: 'x', valor: 3 }
    expect(malTipo).toBeTruthy()
  })
  it('10) Campo — clase texto', () => {
    const { container } = render(<Campo clase="texto" etiqueta="Nombre" valor="Ana" />)
    const input = container.querySelector('input')
    expect(container.querySelector('label')?.textContent).toBe('Nombre')
    expect(input?.getAttribute('type')).toBe('text')
    expect(input?.getAttribute('value')).toBe('Ana')
  })
  it('10b) Campo — clase numero, con su maximo', () => {
    const { container } = render(
      <Campo clase="numero" etiqueta="Edad" valor={30} maximo={99} />,
    )
    const input = container.querySelector('input')
    expect(input?.getAttribute('type')).toBe('number')
    expect(input?.getAttribute('value')).toBe('30')
    expect(input?.getAttribute('max')).toBe('99')
  })
  it('10c) Campo — clase seleccion, un <option> por opción', () => {
    const { container } = render(
      <Campo clase="seleccion" etiqueta="Color" opciones={['rojo', 'azul']} />,
    )
    const opciones = [...container.querySelectorAll('option')]
    expect(opciones.map((o) => o.textContent)).toEqual(['rojo', 'azul'])
    expect(opciones.map((o) => o.getAttribute('value'))).toEqual(['rojo', 'azul'])
    expect(container.querySelector('input')).toBeNull()
  })
})
