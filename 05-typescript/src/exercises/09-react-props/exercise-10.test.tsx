import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import {
  EtiquetaEstado,
  Dinero,
  FilaPedido,
  TablaPedidos,
  Panel,
  Contenido,
  resumen,
  PaginaPedidos,
} from './exercise-10'
import type {
  Pedido,
  EstadoPedido,
  DineroProps,
  FilaPedidoProps,
  PanelProps,
  EstadoCarga,
  PaginaPedidosProps,
} from './exercise-10'

const PEDIDOS: Pedido[] = [
  { id: 1, cliente: 'Ana', total: 10, estado: 'pendiente' },
  { id: 2, cliente: 'Leo', total: 5, estado: 'entregado' },
]

/** Envuelve un <tr> suelto para que el DOM lo acepte sin avisos de React. */
function enTabla(fila: React.ReactNode) {
  return (
    <table>
      <tbody>{fila}</tbody>
    </table>
  )
}

describe('09-react-props / exercise-10 — capstone: árbol de componentes', () => {
  /* --- BLOQUE 0 — el tipo derivado y la hoja --- */
  it('1) EstadoPedido — sale de Pedido, no de una copia a mano', () => {
    const e: EstadoPedido = 'enviado'
    expect(e).toBe('enviado')
    // @ts-expect-error — 'cancelado' no es un estado del dominio
    const malo: EstadoPedido = 'cancelado'
    expect(malo).toBeTruthy()
  })
  it('2) EtiquetaEstado — los tres estados, con su clase y su texto', () => {
    const estados: EstadoPedido[] = ['pendiente', 'enviado', 'entregado']
    const textos = ['Pendiente', 'Enviado', 'Entregado']
    estados.forEach((estado, i) => {
      const { container, unmount } = render(<EtiquetaEstado estado={estado} />)
      const span = container.querySelector('span')
      expect(span?.getAttribute('class')).toBe(estado)
      expect(span?.textContent).toBe(textos[i])
      unmount()
    })
  })

  /* --- BLOQUE 1 — props nativas + rest --- */
  it('3) Dinero — formatea a dos decimales y deja pasar las props nativas', () => {
    const { container } = render(
      <Dinero cantidad={12} className="precio" id="d1" title="total" />,
    )
    const span = container.querySelector('span')
    expect(span?.textContent).toBe('12.00 €')
    expect(span?.getAttribute('class')).toBe('precio')
    expect(span?.getAttribute('id')).toBe('d1')
    expect(span?.getAttribute('title')).toBe('total')
    // `cantidad` se sacó del rest: no puede acabar como atributo
    expect(span?.getAttribute('cantidad')).toBeNull()
  })
  it('3b) DineroProps — hereda lo nativo y exige la cantidad', () => {
    const p: DineroProps = { cantidad: 3, className: 'x' }
    expect(p.cantidad).toBe(3)
    // @ts-expect-error — falta `cantidad`
    const falta: DineroProps = { className: 'x' }
    expect(falta).toBeTruthy()
  })

  /* --- BLOQUE 2 — la fila --- */
  it('4) FilaPedido — tres celdas, hojas montadas y callback con su id', () => {
    const ver = vi.fn()
    const { container } = render(
      enTabla(
        <FilaPedido id={7} cliente="Ana" total={12} estado="enviado" onVer={ver} />,
      ),
    )
    const celdas = [...container.querySelectorAll('td')]
    expect(celdas).toHaveLength(3)
    expect(celdas[0]?.textContent).toBe('Ana')
    expect(celdas[1]?.querySelector('span.total')?.textContent).toBe('12.00 €')
    expect(celdas[2]?.querySelector('span.enviado')?.textContent).toBe('Enviado')
    expect(ver).not.toHaveBeenCalled()
    fireEvent.click(screen.getByRole('button', { name: 'Ver' }))
    expect(ver).toHaveBeenCalledWith(7)
  })
  it('4b) FilaPedidoProps — recorte del dominio + lo de la UI', () => {
    const p: FilaPedidoProps = {
      id: 1, cliente: 'Ana', total: 10, estado: 'pendiente', onVer: () => {},
    }
    expect(p.id).toBe(1)
    // @ts-expect-error — `onVer` es obligatoria: es lo que la fila añade
    const falta: FilaPedidoProps = {
      id: 1, cliente: 'Ana', total: 10, estado: 'pendiente',
    }
    expect(falta).toBeTruthy()
  })

  /* --- BLOQUE 3 — la lista --- */
  it('5) TablaPedidos — lista vacía', () => {
    render(<TablaPedidos pedidos={[]} onVer={() => {}} />)
    expect(screen.getByText('No hay pedidos')).toBeInTheDocument()
    expect(screen.queryByRole('table')).toBeNull()
  })
  it('5b) TablaPedidos — una fila por pedido, cada botón con SU id', () => {
    const ver = vi.fn()
    const { container } = render(<TablaPedidos pedidos={PEDIDOS} onVer={ver} />)
    expect(container.querySelectorAll('tr')).toHaveLength(2)
    const botones = screen.getAllByRole('button', { name: 'Ver' })
    fireEvent.click(botones[1]!)
    expect(ver).toHaveBeenCalledWith(2)
  })

  /* --- BLOQUE 4 — el marco --- */
  it('6) Panel — sin acciones no pinta el envoltorio de acciones', () => {
    const { container } = render(
      <Panel titulo="Pedidos">
        <p>Hola</p>
      </Panel>,
    )
    expect(container.querySelector('h2')?.textContent).toBe('Pedidos')
    expect(container.querySelector('.acciones')).toBeNull()
    expect(container.querySelector('.cuerpo')?.textContent).toBe('Hola')
  })
  it('7) Panel — con acciones, el slot con nombre va en el header', () => {
    const { container } = render(
      <Panel titulo="Pedidos" acciones={<button>Nuevo</button>}>
        <p>Hola</p>
      </Panel>,
    )
    const header = container.querySelector('header')
    expect(header?.querySelector('.acciones button')?.textContent).toBe('Nuevo')
    // las acciones NO se cuelan en el cuerpo
    expect(container.querySelector('.cuerpo')?.textContent).toBe('Hola')
  })
  it('7b) PanelProps — titulo y children obligatorios, acciones no', () => {
    const p: PanelProps = { titulo: 'x', children: null }
    expect(p.acciones).toBeUndefined()
    // @ts-expect-error — falta `children`
    const falta: PanelProps = { titulo: 'x' }
    expect(falta).toBeTruthy()
  })

  /* --- BLOQUE 5 — la unión discriminada --- */
  it('8) Contenido — fase cargando', () => {
    render(<Contenido estado={{ fase: 'cargando' }} onVer={() => {}} />)
    expect(screen.getByText('Cargando…')).toBeInTheDocument()
  })
  it('8b) Contenido — fase error', () => {
    const { container } = render(
      <Contenido estado={{ fase: 'error', mensaje: 'Se cayó' }} onVer={() => {}} />,
    )
    const p = container.querySelector('p')
    expect(p?.textContent).toBe('Se cayó')
    expect(p?.getAttribute('class')).toBe('error')
  })
  it('8c) Contenido — fase listo monta la tabla', () => {
    const ver = vi.fn()
    render(<Contenido estado={{ fase: 'listo', pedidos: PEDIDOS }} onVer={ver} />)
    expect(screen.getAllByRole('row')).toHaveLength(2)
    fireEvent.click(screen.getAllByRole('button', { name: 'Ver' })[0]!)
    expect(ver).toHaveBeenCalledWith(1)
  })
  it('8d) EstadoCarga — cada fase con su propio equipaje', () => {
    const e: EstadoCarga = { fase: 'cargando' }
    expect(e.fase).toBe('cargando')
    // @ts-expect-error — 'listo' exige `pedidos`
    const sinPedidos: EstadoCarga = { fase: 'listo' }
    expect(sinPedidos).toBeTruthy()
    // @ts-expect-error — `mensaje` es de 'error', no de 'cargando'
    const mezcla: EstadoCarga = { fase: 'cargando', mensaje: 'x' }
    expect(mezcla).toBeTruthy()
  })

  /* --- BLOQUE 6 — la raíz --- */
  it('9) resumen — sin JSX, FASE 1 pura', () => {
    expect(resumen([])).toBe('Sin pedidos')
    expect(resumen(PEDIDOS)).toBe('2 pedidos · 15€')
  })
  it('10) PaginaPedidos — cargando: ni footer ni resumen', () => {
    const { container } = render(
      <PaginaPedidos titulo="Pedidos" estado={{ fase: 'cargando' }} onVer={() => {}} />,
    )
    expect(container.querySelector('h2')?.textContent).toBe('Pedidos')
    expect(screen.getByText('Cargando…')).toBeInTheDocument()
    expect(container.querySelector('footer')).toBeNull()
  })
  it('10b) PaginaPedidos — listo: tabla, footer con resumen y acciones', () => {
    const ver = vi.fn()
    const { container } = render(
      <PaginaPedidos
        titulo="Pedidos"
        estado={{ fase: 'listo', pedidos: PEDIDOS }}
        onVer={ver}
        acciones={<button>Nuevo</button>}
      />,
    )
    expect(container.querySelector('.acciones button')?.textContent).toBe('Nuevo')
    expect(container.querySelectorAll('tbody tr')).toHaveLength(2)
    expect(container.querySelector('footer')?.textContent).toBe('2 pedidos · 15€')
    // el aviso sube desde la hoja hasta la raíz, con su id
    fireEvent.click(screen.getAllByRole('button', { name: 'Ver' })[1]!)
    expect(ver).toHaveBeenCalledWith(2)
  })
  it('10c) PaginaPedidos — error: mensaje y sin footer', () => {
    const { container } = render(
      <PaginaPedidos
        titulo="Pedidos"
        estado={{ fase: 'error', mensaje: 'Se cayó' }}
        onVer={() => {}}
      />,
    )
    expect(container.querySelector('p.error')?.textContent).toBe('Se cayó')
    expect(container.querySelector('footer')).toBeNull()
  })
  it('10d) PaginaPedidosProps — solo `acciones` es opcional', () => {
    const p: PaginaPedidosProps = {
      titulo: 'x',
      estado: { fase: 'cargando' },
      onVer: () => {},
    }
    expect(p.acciones).toBeUndefined()
    // @ts-expect-error — falta `estado`
    const falta: PaginaPedidosProps = { titulo: 'x', onVer: () => {} }
    expect(falta).toBeTruthy()
  })
})
