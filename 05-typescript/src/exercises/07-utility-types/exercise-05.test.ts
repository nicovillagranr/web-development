import { describe, it, expect } from 'vitest'
import {
  aplicarDosParches,
  fusionarConFor,
  fusionarCajasConFor,
  fusionarConReduce,
  fusionarCajasConReduce,
  aplicarParches,
} from './exercise-05'

describe('07-utility-types / exercise-05 — aplicar una lista de parches', () => {
  /* ── BLOQUE A — merge encadenado (sin bucle) ── */

  it('1) aplicarDosParches aplica p1 y luego p2 (gana el último)', () => {
    expect(aplicarDosParches({ x: 0, y: 0 }, { x: 5 }, { y: 9 })).toEqual({ x: 5, y: 9 })
    // los dos tocan x → gana el segundo
    expect(aplicarDosParches({ x: 0, y: 0 }, { x: 1 }, { x: 2 })).toEqual({ x: 2, y: 0 })
    // no muta la base
    const base = { x: 0, y: 0 }
    aplicarDosParches(base, { x: 7 }, { y: 7 })
    expect(base).toEqual({ x: 0, y: 0 })
    // @ts-expect-error — "z" no es una propiedad de Punto: Partial afloja, no inventa llaves
    aplicarDosParches({ x: 0, y: 0 }, { z: 1 }, {})
  })

  /* ── BLOQUE B — generalizar con for ── */

  it('2) fusionarConFor aplica toda la lista en orden', () => {
    expect(fusionarConFor({ x: 0, y: 0 }, [{ x: 5 }, { y: 9 }])).toEqual({ x: 5, y: 9 })
    // lista vacía → base intacta
    expect(fusionarConFor({ x: 1, y: 1 }, [])).toEqual({ x: 1, y: 1 })
    // gana el último
    expect(fusionarConFor({ x: 0, y: 0 }, [{ x: 1 }, { x: 2 }])).toEqual({ x: 2, y: 0 })
    // no muta la base
    const base = { x: 0, y: 0 }
    fusionarConFor(base, [{ x: 9 }])
    expect(base).toEqual({ x: 0, y: 0 })
  })

  it('3) fusionarCajasConFor aplica parches sobre la caja', () => {
    expect(
      fusionarCajasConFor({ ancho: 10, alto: 5, color: 'rojo' }, [{ alto: 8 }, { color: 'azul' }]),
    ).toEqual({ ancho: 10, alto: 8, color: 'azul' })
    // dos parches tocan color → gana el último
    expect(
      fusionarCajasConFor({ ancho: 1, alto: 1, color: 'rojo' }, [{ color: 'rojo' }, { color: 'azul' }]),
    ).toEqual({ ancho: 1, alto: 1, color: 'azul' })
  })

  /* ── BLOQUE C — el mismo con reduce ── */

  it('4) fusionarConReduce da el mismo resultado que fusionarConFor', () => {
    expect(fusionarConReduce({ x: 0, y: 0 }, [{ x: 5 }, { y: 9 }])).toEqual({ x: 5, y: 9 })
    expect(fusionarConReduce({ x: 1, y: 1 }, [])).toEqual({ x: 1, y: 1 })
    expect(fusionarConReduce({ x: 0, y: 0 }, [{ x: 1 }, { x: 2 }])).toEqual({ x: 2, y: 0 })
  })

  it('5) fusionarCajasConReduce aplica parches sobre la caja', () => {
    expect(
      fusionarCajasConReduce({ ancho: 10, alto: 5, color: 'rojo' }, [{ alto: 8 }, { color: 'azul' }]),
    ).toEqual({ ancho: 10, alto: 8, color: 'azul' })
  })

  /* ── BLOQUE D — capstone: gemelo del drill 5 de exercise-04 ── */

  it('6) aplicarParches aplica una lista de parches parciales en orden', () => {
    const u = { id: 1, nombre: 'Ana', email: 'a@a.com' }
    expect(aplicarParches(u, [{ nombre: 'Ani' }, { email: 'x@x.com' }])).toEqual({
      id: 1,
      nombre: 'Ani',
      email: 'x@x.com',
    })
    // gana el último
    expect(aplicarParches(u, [{ nombre: 'A' }, { nombre: 'B' }])).toEqual({
      id: 1,
      nombre: 'B',
      email: 'a@a.com',
    })
    // lista vacía → usuario igual
    expect(aplicarParches(u, [])).toEqual(u)
  })
})
