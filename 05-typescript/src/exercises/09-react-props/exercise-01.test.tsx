import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Hola,
  Saludo,
  Contador,
  Precio,
  Boton,
  Insignia,
  ListaUsuarios,
  Caja,
  BotonAccion,
  Panel,
} from './exercise-01'
import type { BotonProps, Usuario, PanelProps } from './exercise-01'

describe('09-react-props / exercise-01 — props como objeto tipado', () => {
  /* --- BLOQUE 0 — un componente retorna JSX --- */
  it('1) Hola — retorna un párrafo con "Hola"', () => {
    render(<Hola />)
    expect(screen.getByText('Hola')).toBeInTheDocument()
  })

  /* --- BLOQUE 1 — una prop --- */
  it('2) Saludo — usa la prop nombre', () => {
    render(<Saludo nombre="Nico" />)
    expect(screen.getByText('Hola, Nico')).toBeInTheDocument()
  })
  it('2b) Saludo — el texto cambia con la prop (no está hardcodeado)', () => {
    render(<Saludo nombre="Ana" />)
    expect(screen.getByText('Hola, Ana')).toBeInTheDocument()
  })
  it('3) Contador — usa la prop total', () => {
    render(<Contador total={3} />)
    expect(screen.getByText('Total: 3')).toBeInTheDocument()
  })

  /* --- BLOQUE 2 — desestructurar --- */
  it('4) Precio — usa la prop euros', () => {
    render(<Precio euros={12} />)
    expect(screen.getByText('12 €')).toBeInTheDocument()
  })

  /* --- BLOQUE 3 — varias props, una opcional, tipo con nombre --- */
  it('5) Boton — sin deshabilitado llega habilitado', () => {
    render(<Boton texto="Enviar" />)
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeEnabled()
  })
  it('5b) Boton — con deshabilitado={true} llega deshabilitado', () => {
    render(<Boton texto="Enviar" deshabilitado={true} />)
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeDisabled()
  })
  it('5c) BotonProps — deshabilitado es OPCIONAL, texto NO', () => {
    const soloTexto: BotonProps = { texto: 'Ok' }
    const completo: BotonProps = { texto: 'Ok', deshabilitado: false }
    expect(soloTexto.texto).toBe('Ok')
    expect(completo.deshabilitado).toBe(false)
    // @ts-expect-error — `texto` es obligatoria: omitirla debe ser un error de tipos
    const sinTexto: BotonProps = { deshabilitado: true }
    expect(sinTexto).toBeTruthy()
  })

  it('6) Insignia — el className es la variante', () => {
    render(<Insignia texto="Nuevo" variante="info" />)
    expect(screen.getByText('Nuevo')).toHaveClass('info')
  })
  it('6b) Insignia — la otra variante también', () => {
    render(<Insignia texto="Cuidado" variante="alerta" />)
    expect(screen.getByText('Cuidado')).toHaveClass('alerta')
  })
  it('6c) Insignia — la unión rechaza variantes inventadas', () => {
    render(
      // @ts-expect-error — "rojo" no pertenece a la unión "info" | "alerta"
      <Insignia texto="X" variante="rojo" />,
    )
    expect(screen.getByText('X')).toBeInTheDocument()
  })

  /* --- BLOQUE 4 — capstone --- */
  it('7) ListaUsuarios — un <li> por usuario, con su nombre', () => {
    const usuarios: Usuario[] = [
      { id: 1, nombre: 'Ana' },
      { id: 2, nombre: 'Leo' },
    ]
    render(<ListaUsuarios usuarios={usuarios} />)
    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(2)
    expect(items.map((li) => li.textContent)).toEqual(['Ana', 'Leo'])
  })
  it('7b) ListaUsuarios — lista vacía no rompe', () => {
    render(<ListaUsuarios usuarios={[]} />)
    expect(screen.queryAllByRole('listitem')).toHaveLength(0)
  })

  /* --- BLOQUE 5 — children --- */
  it('8) Caja — pinta el children dentro de un div.caja', () => {
    render(
      <Caja>
        <p>Contenido</p>
      </Caja>,
    )
    const parrafo = screen.getByText('Contenido')
    expect(parrafo).toBeInTheDocument()
    expect(parrafo.parentElement).toHaveClass('caja')
  })
  it('8b) Caja — children también acepta texto pelado', () => {
    render(<Caja>solo texto</Caja>)
    expect(screen.getByText('solo texto')).toHaveClass('caja')
  })

  /* --- BLOQUE 6 — prop de tipo función --- */
  it('9) BotonAccion — muestra la etiqueta', () => {
    render(<BotonAccion etiqueta="Borrar" onAccion={() => {}} />)
    expect(screen.getByRole('button', { name: 'Borrar' })).toBeInTheDocument()
  })
  it('9b) BotonAccion — ejecuta onAccion SOLO al hacer clic', async () => {
    const espia = vi.fn()
    render(<BotonAccion etiqueta="Borrar" onAccion={espia} />)
    // si la función se hubiera EJECUTADO al pintar (`onClick={onAccion()}`),
    // el espía ya estaría llamado aquí, antes de tocar nada
    expect(espia).not.toHaveBeenCalled()
    await userEvent.click(screen.getByRole('button', { name: 'Borrar' }))
    expect(espia).toHaveBeenCalledTimes(1)
  })

  /* --- BLOQUE 7 — capstone: las tres clases de prop --- */
  it('10) Panel — título, botón Cerrar y children, en ese orden', () => {
    render(
      <Panel titulo="Ajustes" onCerrar={() => {}}>
        <p>Contenido</p>
      </Panel>,
    )
    expect(screen.getByRole('heading', { name: 'Ajustes' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cerrar' })).toBeInTheDocument()
    expect(screen.getByText('Contenido')).toBeInTheDocument()

    const seccion = screen.getByRole('heading', { name: 'Ajustes' }).parentElement
    expect(seccion?.children[0]?.tagName).toBe('H2')
    expect(seccion?.children[1]?.tagName).toBe('BUTTON')
    expect(seccion?.children[2]?.textContent).toBe('Contenido')
  })
  it('10b) Panel — el botón Cerrar dispara onCerrar', async () => {
    const espia = vi.fn()
    render(
      <Panel titulo="Ajustes" onCerrar={espia}>
        <p>Contenido</p>
      </Panel>,
    )
    expect(espia).not.toHaveBeenCalled()
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(espia).toHaveBeenCalledTimes(1)
  })
  it('10c) PanelProps — las tres props son obligatorias', () => {
    const props: PanelProps = {
      titulo: 'Ajustes',
      children: null,
      onCerrar: () => {},
    }
    expect(props.titulo).toBe('Ajustes')
    // @ts-expect-error — `onCerrar` es obligatoria: omitirla debe ser error de tipos
    const incompleto: PanelProps = { titulo: 'Ajustes', children: null }
    expect(incompleto).toBeTruthy()
  })
})
