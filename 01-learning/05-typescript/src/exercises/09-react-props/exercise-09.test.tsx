import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  BotonSimple,
  hacerManejador,
  BotonId,
  BotonRenombrar,
  FilaUsuario,
  ListaUsuarios,
  BotonBorrar,
  Precio,
  ListaTareas,
} from './exercise-09'
import type { Usuario, Tarea, ListaTareasProps } from './exercise-09'

describe('09-react-props / exercise-09 — props-función con argumentos', () => {
  /* --- BLOQUE 0 --- */
  it('1) BotonSimple — se entrega, no se ejecuta al pintar', () => {
    const avisar = vi.fn()
    render(<BotonSimple texto="Ok" onAccion={avisar} />)
    expect(avisar).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button'))
    expect(avisar).toHaveBeenCalledTimes(1)
  })
  it('1b) las DOS formas rotas de la cabecera las caza el compilador', () => {
    const elegir = (id: number): void => {
      void id
    }
    render(
      <BotonSimple
        texto="Ok"
        // @ts-expect-error — PELADA: `(id:number)=>void` no encaja en `()=>void`
        onAccion={elegir}
      />,
    )
    render(
      <BotonSimple
        texto="Ok"
        // @ts-expect-error — EJECUTADA: `elegir(1)` vale `void`, no es una función
        onAccion={elegir(1)}
      />,
    )
    expect(screen.getAllByRole('button')).toHaveLength(2)
  })

  /* --- BLOQUE 1 — el envoltorio desnudo --- */
  it('2) hacerManejador — FABRICA una función; no ejecuta nada al fabricarla', () => {
    const elegir = vi.fn()
    const manejar = hacerManejador(7, elegir)
    expect(typeof manejar).toBe('function')
    expect(elegir).not.toHaveBeenCalled() // ← la nota está escrita, no servida
    manejar()
    expect(elegir).toHaveBeenCalledTimes(1)
    expect(elegir).toHaveBeenCalledWith(7)
  })
  it('2b) hacerManejador — cada envoltorio recuerda SU id', () => {
    const elegir = vi.fn()
    const uno = hacerManejador(1, elegir)
    const dos = hacerManejador(2, elegir)
    dos()
    uno()
    expect(elegir.mock.calls).toEqual([[2], [1]])
  })

  /* --- BLOQUE 2 — el envoltorio dentro del JSX --- */
  it('3) BotonId — el clic llega con el id dentro', () => {
    const elegir = vi.fn()
    render(<BotonId id={7} texto="Elegir" onSeleccionar={elegir} />)
    expect(elegir).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button'))
    expect(elegir).toHaveBeenCalledWith(7)
  })
  it('4) BotonRenombrar — dos argumentos, en su orden', () => {
    const renombrar = vi.fn()
    render(<BotonRenombrar id={7} nombre="Ana" onRenombrar={renombrar} />)
    expect(screen.getByRole('button').textContent).toBe('Ana')
    fireEvent.click(screen.getByRole('button'))
    expect(renombrar).toHaveBeenCalledWith(7, 'Ana')
  })

  /* --- BLOQUE 3 — el objeto entero, y la lista --- */
  it('5) FilaUsuario — entrega el usuario completo, no solo el id', () => {
    const elegir = vi.fn()
    const ana: Usuario = { id: 7, nombre: 'Ana' }
    render(<FilaUsuario usuario={ana} onElegir={elegir} />)
    fireEvent.click(screen.getByRole('button'))
    expect(elegir).toHaveBeenCalledWith({ id: 7, nombre: 'Ana' })
  })
  it('6) ListaUsuarios — cada fila lleva SU usuario dentro de su envoltorio', () => {
    const elegir = vi.fn()
    const usuarios: Usuario[] = [
      { id: 1, nombre: 'Ana' },
      { id: 2, nombre: 'Leo' },
      { id: 3, nombre: 'Sam' },
    ]
    render(<ListaUsuarios usuarios={usuarios} onElegir={elegir} />)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    fireEvent.click(screen.getByText('Leo'))
    expect(elegir).toHaveBeenCalledWith({ id: 2, nombre: 'Leo' })
    fireEvent.click(screen.getByText('Sam'))
    expect(elegir).toHaveBeenLastCalledWith({ id: 3, nombre: 'Sam' })
    expect(elegir).toHaveBeenCalledTimes(2)
  })

  /* --- BLOQUE 4 — el callback opcional --- */
  it('7) BotonBorrar — con callback, llama con el id', () => {
    const borrar = vi.fn()
    render(<BotonBorrar id={7} onBorrar={borrar} />)
    fireEvent.click(screen.getByRole('button'))
    expect(borrar).toHaveBeenCalledWith(7)
  })
  it('7b) BotonBorrar — SIN callback, el clic no revienta', () => {
    render(<BotonBorrar id={7} />)
    expect(() => fireEvent.click(screen.getByRole('button'))).not.toThrow()
  })

  /* --- BLOQUE 5 — la prop-función que SÍ devuelve algo --- */
  it('8) Precio — pinta lo que devuelve el formateador', () => {
    const { container } = render(<Precio valor={12} formatear={(n) => `${n} €`} />)
    expect(container.querySelector('span')?.textContent).toBe('12 €')
  })
  it('8b) Precio — quien llama decide el formato; el componente no sabe nada', () => {
    const { container } = render(
      <Precio valor={12} formatear={(n) => `USD ${n.toFixed(2)}`} />,
    )
    expect(container.querySelector('span')?.textContent).toBe('USD 12.00')
  })

  /* --- BLOQUE 6 — capstone --- */
  const TAREAS: Tarea[] = [
    { id: 1, titulo: 'Comprar pan', hecha: false },
    { id: 2, titulo: 'Regar', hecha: true },
  ]
  const etiquetaDe: ListaTareasProps['etiquetaDe'] = (t) =>
    t.hecha ? `✔ ${t.titulo}` : t.titulo

  it('9) ListaTareasProps — onBorrar es la única opcional', () => {
    const props: ListaTareasProps = {
      tareas: [],
      onAlternar: () => {},
      etiquetaDe: (t) => t.titulo,
    }
    expect(props.onBorrar).toBeUndefined()
    // @ts-expect-error — `onAlternar` es obligatoria
    const falta: ListaTareasProps = { tareas: [], etiquetaDe: (t) => t.titulo }
    expect(falta).toBeTruthy()
    const malRetorno: ListaTareasProps = {
      tareas: [],
      onAlternar: () => {},
      // @ts-expect-error — `etiquetaDe` devuelve string, no void
      etiquetaDe: () => {},
    }
    expect(malRetorno).toBeTruthy()
  })
  it('10) ListaTareas — lista vacía, estado vacío', () => {
    render(
      <ListaTareas tareas={[]} onAlternar={() => {}} etiquetaDe={etiquetaDe} />,
    )
    expect(screen.getByText('Sin tareas')).toBeInTheDocument()
    expect(screen.queryByRole('list')).toBeNull()
  })
  it('10b) ListaTareas — una fila por tarea, con su etiqueta y su clase', () => {
    const { container } = render(
      <ListaTareas tareas={TAREAS} onAlternar={() => {}} etiquetaDe={etiquetaDe} />,
    )
    const spans = [...container.querySelectorAll('span')]
    expect(spans.map((s) => s.textContent)).toEqual(['Comprar pan', '✔ Regar'])
    expect(spans.map((s) => s.getAttribute('class'))).toEqual(['pendiente', 'hecha'])
  })
  it('10c) ListaTareas — cada botón alterna SU tarea', () => {
    const alternar = vi.fn()
    render(
      <ListaTareas tareas={TAREAS} onAlternar={alternar} etiquetaDe={etiquetaDe} />,
    )
    const botones = screen.getAllByRole('button', { name: 'Alternar' })
    expect(botones).toHaveLength(2)
    fireEvent.click(botones[1]!)
    expect(alternar).toHaveBeenCalledWith(2)
  })
  it('10d) ListaTareas — sin onBorrar, el botón Borrar existe y no revienta', () => {
    render(
      <ListaTareas tareas={TAREAS} onAlternar={() => {}} etiquetaDe={etiquetaDe} />,
    )
    const borrar = screen.getAllByRole('button', { name: 'Borrar' })
    expect(() => fireEvent.click(borrar[0]!)).not.toThrow()
  })
  it('10e) ListaTareas — con onBorrar, llama con el id de su fila', () => {
    const borrar = vi.fn()
    render(
      <ListaTareas
        tareas={TAREAS}
        onAlternar={() => {}}
        onBorrar={borrar}
        etiquetaDe={etiquetaDe}
      />,
    )
    fireEvent.click(screen.getAllByRole('button', { name: 'Borrar' })[0]!)
    expect(borrar).toHaveBeenCalledWith(1)
  })
})
