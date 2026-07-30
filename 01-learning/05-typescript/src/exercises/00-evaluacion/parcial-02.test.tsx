/* CORRECCIÓN del Parcial 02.
 * ⚠️ NO abras este archivo hasta haber terminado el parcial: contiene las respuestas.
 *
 * Reparto de corrección:
 *   - Ítems de TIPO (A2, A3, D1, F1) → se validan con `pnpm typecheck`.
 *     En `pnpm test:run` pueden aparecer como "passed" aunque estén mal: las
 *     comprobaciones de tipo (`expectTypeOf`, `@ts-expect-error`) desaparecen en
 *     runtime. La nota real de esos sale de typecheck.
 *   - Comportamiento (B1, C1, C2, C3, E1, F1) y opción múltiple (B2, D2) →
 *     `pnpm test:run`.
 */
import { describe, it, expect, expectTypeOf } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  ROLES,
  validadores,
  PERFIL,
  rebajar,
  B2,
  nombresBienPagados,
  unirRutas,
  creaEtiquetador,
  porDefecto,
  D2,
  describir,
  Tarjeta,
} from './parcial-02'
import type { A1, A2, A3, TarjetaProps } from './parcial-02'

describe('PARCIAL 02 — consolidación FASE 1 + props', () => {
  // ── PARTE A — inferencia y lectura de tipos (typecheck) ───────────────────
  it('A1) (typeof ROLES)[number] es la unión de los tres literales', () => {
    expectTypeOf<A1>().toEqualTypeOf<'admin' | 'editor' | 'lector'>()
    expect(ROLES).toHaveLength(3)
  })
  it('A2) validadores[0] es la función O undefined', () => {
    expectTypeOf<A2>().toEqualTypeOf<((t: string) => boolean) | undefined>()
    expect(validadores).toHaveLength(2)
  })
  it('A3) Partial<typeof PERFIL>["edad"] es number | undefined', () => {
    expectTypeOf<A3>().toEqualTypeOf<number | undefined>()
    expect(PERFIL.edad).toBe(23)
  })

  // ── PARTE B — objetos e inmutabilidad ────────────────────────────────────
  it('B1) rebajar devuelve una copia y NO toca el original', () => {
    const original = { id: 1, nombre: 'Té', precio: 100 }
    const copia = rebajar(original, 25)
    expect(copia.precio).toBe(75)
    expect(copia.nombre).toBe('Té')
    expect(original.precio).toBe(100) // el original, intacto
    expect(copia).not.toBe(original) // y es OTRO objeto, no el mismo
    expect(rebajar(original, 0).precio).toBe(100)
    expect(rebajar(original, 100).precio).toBe(0)
  })
  it('B2) la línea que muta el original', () => {
    expect(B2).toBe('b')
  })

  // ── PARTE C — funciones de orden superior ────────────────────────────────
  it('C1) nombresBienPagados filtra por dos condiciones y devuelve NOMBRES', () => {
    const emps = [
      { nombre: 'Ana', salario: 3000, activo: true },
      { nombre: 'Beto', salario: 1000, activo: true },
      { nombre: 'Luis', salario: 2000, activo: true },
      { nombre: 'Sara', salario: 5000, activo: false },
    ]
    expect(nombresBienPagados(emps, 2000)).toEqual(['Ana', 'Luis'])
    expect(nombresBienPagados(emps, 9000)).toEqual([])
    expect(nombresBienPagados([], 0)).toEqual([])
    expectTypeOf(nombresBienPagados(emps, 0)).toEqualTypeOf<string[]>()
  })
  it('C2) unirRutas recibe argumentos SUELTOS, no un array', () => {
    expect(unirRutas('api', 'v1', 'users')).toBe('api/v1/users')
    expect(unirRutas('solo')).toBe('solo')
    expect(unirRutas()).toBe('')
  })
  it('C3) creaEtiquetador devuelve una función que recuerda el prefijo', () => {
    const conHash = creaEtiquetador('#')
    const conGuion = creaEtiquetador('-')
    expect(conHash('ts')).toBe('#ts')
    expect(conHash('js')).toBe('#js')
    expect(conGuion('ts')).toBe('-ts') // cada una recuerda SU prefijo
    expectTypeOf(creaEtiquetador('#')).toEqualTypeOf<(texto: string) => string>()
  })

  // ── PARTE D — genéricos y utility types ──────────────────────────────────
  it('D1) porDefecto funciona con cualquier tipo y nunca devuelve undefined', () => {
    expect(porDefecto(undefined, 'vacío')).toBe('vacío')
    expect(porDefecto('hola', 'vacío')).toBe('hola')
    expect(porDefecto(5, 0)).toBe(5)
    expect(porDefecto(undefined, 0)).toBe(0)
    // Solo `undefined` activa la reserva: un valor FALSY que sí existe se respeta.
    // Estos dos casos separan `??` de `||` — con `||` devolverían la reserva.
    expect(porDefecto(0, 99)).toBe(0)
    expect(porDefecto('', 'reserva')).toBe('')
    expect(porDefecto(false, true)).toBe(false)
    expectTypeOf(porDefecto(5, 0)).toEqualTypeOf<number>()
    expectTypeOf(porDefecto('a', 'b')).toEqualTypeOf<string>()
    // El caso del propio enunciado, y el que distingue la firma buena de la floja:
    // con `(valor: T | undefined, reserva: T)` el retorno es `string`, porque la `T`
    // la fija `reserva`. Con `(valor: T, reserva: T)` la `T` se ensancha a
    // `string | undefined` y el retorno deja de cumplir "nunca devuelve undefined".
    expectTypeOf(porDefecto(undefined, 'vacío')).toEqualTypeOf<string>()
    // @ts-expect-error los dos argumentos tienen que ser del MISMO tipo
    porDefecto(5, 'texto')
  })
  it('D2) la línea que compila y no hace lo que parece', () => {
    expect(D2).toBe('b')
  })

  // ── PARTE E — uniones discriminadas ──────────────────────────────────────
  it('E1) describir cubre las tres fases', () => {
    expect(describir({ fase: 'cargando' })).toBe('cargando…')
    expect(describir({ fase: 'listo', datos: ['a', 'b', 'c'] })).toBe('3 elementos')
    expect(describir({ fase: 'listo', datos: [] })).toBe('0 elementos')
    expect(describir({ fase: 'error', mensaje: 'sin red' })).toBe('sin red')
  })

  // ── PARTE F — props de un componente ─────────────────────────────────────
  it('F1) Tarjeta pinta titulo, children, y la insignia solo si viene', () => {
    render(
      <Tarjeta titulo="Informe" insignia="nuevo">
        <p>cuerpo</p>
      </Tarjeta>,
    )
    expect(screen.getByRole('heading', { name: 'Informe' })).toBeInTheDocument()
    expect(screen.getByText('nuevo')).toBeInTheDocument()
    expect(screen.getByText('cuerpo')).toBeInTheDocument()
  })
  it('F1b) sin insignia, no pinta el <span>', () => {
    const { container } = render(
      <Tarjeta titulo="Informe">
        <p>cuerpo</p>
      </Tarjeta>,
    )
    expect(screen.getByRole('heading', { name: 'Informe' })).toBeInTheDocument()
    expect(container.querySelector('span')).toBeNull()
  })
  it('F1c) TarjetaProps: insignia es opcional, titulo y children no', () => {
    const minimo: TarjetaProps = { titulo: 'X', children: 'algo' }
    expect(minimo.insignia).toBeUndefined()
    // @ts-expect-error falta `titulo`, que es obligatoria
    const roto: TarjetaProps = { children: 'algo' }
    expect(roto).toBeTruthy()
  })
})
