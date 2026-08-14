import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  CampoTexto,
  SelectorPrioridad,
  FormularioTarea,
  FilaTarea,
  ListaTareas,
  GestorDeTareas,
  EtiquetaTexto,
  BotonQueAvisa,
  PadreQueGuarda,
  PadreQueLimpia,
  PadreConDosCajas,
  PadreQueEntregaLosDos,
} from './exercise-10'

const tareaDe = (id: string, texto: string, hecha = false) =>
  ({ id, texto, prioridad: 'media', hecha }) as const

describe('10-eventos-formularios / exercise-10 — CAPSTONE: el formulario entero', () => {
  it('1) CampoTexto — pinta lo que le llega y avisa con el texto', async () => {
    const espia = vi.fn()
    render(<CampoTexto texto="hola" alEscribir={espia} />)
    const campo = screen.getByRole('textbox')
    expect(campo).toHaveValue('hola')
    await userEvent.type(campo, '!')
    expect(espia).toHaveBeenLastCalledWith('hola!')
  })

  it('2) SelectorPrioridad — pinta la que le llega y avisa con una Prioridad', async () => {
    const espia = vi.fn()
    render(<SelectorPrioridad prioridad="media" alElegir={espia} />)
    const selector = screen.getByRole('combobox')
    expect(selector).toHaveValue('media')
    await userEvent.selectOptions(selector, 'alta')
    expect(espia).toHaveBeenLastCalledWith('alta')
  })

  it('3) FormularioTarea — entrega texto y prioridad, y se deja limpio', async () => {
    const espia = vi.fn()
    render(<FormularioTarea alAñadir={espia} />)
    const campo = screen.getByRole('textbox')

    await userEvent.click(screen.getByRole('button', { name: 'Añadir' }))
    expect(espia).not.toHaveBeenCalled()

    await userEvent.type(campo, 'Comprar pan')
    await userEvent.selectOptions(screen.getByRole('combobox'), 'alta')
    await userEvent.click(screen.getByRole('button', { name: 'Añadir' }))

    expect(espia).toHaveBeenLastCalledWith({ texto: 'Comprar pan', prioridad: 'alta' })
    expect(campo).toHaveValue('')
    expect(screen.getByRole('combobox')).toHaveValue('media')
  })

  it('4) FilaTarea — la casilla avisa con id y estado; el botón, con el id', async () => {
    const alMarcar = vi.fn()
    const alBorrar = vi.fn()
    render(<FilaTarea tarea={tareaDe('t-7', 'Regar')} alMarcar={alMarcar} alBorrar={alBorrar} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(alMarcar).toHaveBeenLastCalledWith('t-7', true)
    await userEvent.click(screen.getByRole('button'))
    expect(alBorrar).toHaveBeenLastCalledWith('t-7')
  })

  it('5) ListaTareas — pinta una fila por tarea y reparte los avisos', async () => {
    const alMarcar = vi.fn()
    const alBorrar = vi.fn()
    render(
      <ListaTareas
        tareas={[tareaDe('t-1', 'Uno'), tareaDe('t-2', 'Dos')]}
        alMarcar={alMarcar}
        alBorrar={alBorrar}
      />,
    )
    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    await userEvent.click(screen.getByRole('button', { name: 'Borrar Dos' }))
    expect(alBorrar).toHaveBeenLastCalledWith('t-2')
  })

  it('6) GestorDeTareas — añade, marca y borra de verdad', async () => {
    render(<GestorDeTareas />)
    const campo = screen.getByRole('textbox')

    await userEvent.type(campo, 'Regar')
    await userEvent.click(screen.getByRole('button', { name: 'Añadir' }))
    expect(screen.getByText('Regar')).toBeInTheDocument()

    await userEvent.type(campo, 'Comprar pan')
    await userEvent.click(screen.getByRole('button', { name: 'Añadir' }))
    expect(screen.getAllByRole('listitem')).toHaveLength(2)

    const casillas = screen.getAllByRole('checkbox')
    const primera = casillas[0]
    if (!primera) throw new Error('no hay casillas')
    await userEvent.click(primera)
    expect(primera).toBeChecked()

    await userEvent.click(screen.getByRole('button', { name: 'Borrar Regar' }))
    expect(screen.queryByText('Regar')).not.toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
  })
})

describe('10-eventos-formularios / exercise-10 — escalera E', () => {
  it('E1) EtiquetaTexto — pinta la prop, y la sigue si cambia', () => {
    const { rerender } = render(<EtiquetaTexto texto="hola" />)
    expect(screen.getByText('hola')).toBeInTheDocument()
    rerender(<EtiquetaTexto texto="adios" />)
    expect(screen.getByText('adios')).toBeInTheDocument()
  })

  it('E2) BotonQueAvisa — avisa al pulsar, y no antes', async () => {
    const espia = vi.fn()
    render(<BotonQueAvisa alPulsar={espia} />)
    expect(espia).not.toHaveBeenCalled()
    await userEvent.click(screen.getByRole('button'))
    expect(espia).toHaveBeenCalledTimes(1)
  })

  it('E3) PadreQueGuarda — lo tecleado en el hijo sube y se pinta arriba', async () => {
    render(<PadreQueGuarda />)
    await userEvent.type(screen.getByRole('textbox'), 'hola')
    expect(screen.getByText('hola')).toBeInTheDocument()
  })

  it('E4) PadreQueLimpia — el botón del padre vacía el campo del hijo', async () => {
    render(<PadreQueLimpia />)
    const campo = screen.getByRole('textbox')
    await userEvent.type(campo, 'hola')
    expect(campo).toHaveValue('hola')
    await userEvent.click(screen.getByRole('button', { name: 'Limpiar' }))
    expect(campo).toHaveValue('')
  })

  it('E5) PadreConDosCajas — los dos estados son independientes', async () => {
    render(<PadreConDosCajas />)
    const [caja1, caja2] = screen.getAllByRole('textbox')
    if (!caja1 || !caja2) throw new Error('faltan cajas')
    await userEvent.type(caja1, 'Nico')
    await userEvent.type(caja2, 'n@a.com')
    expect(screen.getByText('nombre: Nico')).toBeInTheDocument()
    expect(screen.getByText('email: n@a.com')).toBeInTheDocument()
  })

  it('E6) PadreQueEntregaLosDos — entrega los dos juntos, en un objeto', async () => {
    const espia = vi.fn()
    render(<PadreQueEntregaLosDos alEnviar={espia} />)
    const [caja1, caja2] = screen.getAllByRole('textbox')
    if (!caja1 || !caja2) throw new Error('faltan cajas')
    await userEvent.type(caja1, 'Nico')
    await userEvent.type(caja2, 'n@a.com')
    await userEvent.click(screen.getByRole('button', { name: 'Enviar' }))
    expect(espia).toHaveBeenLastCalledWith({ nombre: 'Nico', email: 'n@a.com' })
  })
})
