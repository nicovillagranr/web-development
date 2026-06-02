import { describe, it, expect, expectTypeOf } from 'vitest'
import {
  medirLargo,
  tieneContenido,
  obtenerId,
  nombreEnMayus,
  precioConIva,
  esMayorDeEdad,
  areaRect,
  presentar,
  codigo,
  borrarPorId,
  editarPorId,
  clonarConId,
  hayStock,
  nombreCompleto,
  resumen,
  fijarTono,
  definirEstado,
  propiedad,
  extraer,
  valorDe,
  igualA,
  mismaPropiedad,
  columna,
  cuantosConValor,
  etiquetar,
  primerValor,
  valoresUnicos,
  dosValores,
  buscarPor,
} from './exercise-12'
import type { LlavesLibro, LlavesUsuario, TipoTitulo, TipoActivo } from './exercise-12'

describe('exercise-12 — constraints (extends) y keyof', () => {
  // BLOQUE A — extends para exigir una forma con length
  it('1) medirLargo funciona con cualquier cosa que tenga length', () => {
    expect(medirLargo('hola')).toBe(4)
    expect(medirLargo([1, 2, 3])).toBe(3)
    expectTypeOf(medirLargo('hola')).toEqualTypeOf<number>()
  })

  it('2) tieneContenido distingue vacío de no vacío', () => {
    expect(tieneContenido('')).toBe(false)
    expect(tieneContenido('x')).toBe(true)
    expect(tieneContenido([])).toBe(false)
    expect(tieneContenido([1])).toBe(true)
    expectTypeOf(tieneContenido('x')).toEqualTypeOf<boolean>()
  })

  // BLOQUE B — extends para exigir una propiedad concreta
  it('3) obtenerId lee id de cualquier objeto que lo tenga', () => {
    expect(obtenerId({ id: 7, name: 'a' })).toBe(7)
    expect(obtenerId({ id: 1 })).toBe(1)
    expectTypeOf(obtenerId({ id: 7 })).toEqualTypeOf<number>()
  })

  // BLOQUE REFUERZO — 10 drills solo de extends
  it('4) nombreEnMayus lee una prop string', () => {
    expect(nombreEnMayus({ nombre: 'ana' })).toBe('ANA')
    expect(nombreEnMayus({ nombre: 'ana', edad: 9 })).toBe('ANA') // extras permitidos
  })

  it('5) precioConIva lee una prop number y calcula', () => {
    expect(precioConIva({ precio: 100 })).toBeCloseTo(119)
  })

  it('6) esMayorDeEdad devuelve boolean', () => {
    expect(esMayorDeEdad({ edad: 20 })).toBe(true)
    expect(esMayorDeEdad({ edad: 17 })).toBe(false)
  })

  it('7) areaRect usa dos props number', () => {
    expect(areaRect({ ancho: 3, alto: 4 })).toBe(12)
  })

  it('8) presentar exige un método en el constraint', () => {
    expect(presentar({ saludar: () => 'hola' })).toBe('hola')
  })

  it('9) codigo combina dos props de tipos distintos', () => {
    expect(codigo({ id: 7, tipo: 'user' })).toBe('user-7')
  })

  it('10) borrarPorId usa un tipo con nombre como constraint', () => {
    expect(borrarPorId({ id: 9, name: 'x' })).toBe(9)
    expectTypeOf(borrarPorId({ id: 9 })).toEqualTypeOf<number>()
  })

  it('10b) el mismo alias Identificable se reutiliza en varias funciones (DRY)', () => {
    // las tres comparten el constraint <T extends Identificable>: una sola forma
    // con nombre, reutilizada. Cambiar Identificable las afectaría a todas.
    expect(editarPorId({ id: 9, name: 'x' })).toBe(9)
    expect(clonarConId({ id: 5, name: 'test' })).toBe(5)
    expectTypeOf(editarPorId({ id: 9 })).toEqualTypeOf<number>()
    expectTypeOf(clonarConId({ id: 5 })).toEqualTypeOf<number>()
  })

  it('11) hayStock devuelve boolean', () => {
    expect(hayStock({ stock: 3 })).toBe(true)
    expect(hayStock({ stock: 0 })).toBe(false)
  })

  it('12) nombreCompleto combina dos props string', () => {
    expect(nombreCompleto({ nombre: 'Ana', apellido: 'Paz' })).toBe('Ana Paz')
  })

  it('13) resumen mezcla string y number', () => {
    expect(resumen({ titulo: 'Intro', minutos: 5 })).toBe('Intro (5 min)')
  })

  // BLOQUE C — keyof en escalera

  // un texto exacto es un tipo (literales y uniones)
  it('14) fijarTono solo acepta el literal "claro"', () => {
    expect(fijarTono('claro')).toBe('tema claro')
    // @ts-expect-error "oscuro" NO es el literal permitido
    fijarTono('oscuro')
  })

  it('15) definirEstado acepta solo la unión de tres literales', () => {
    expect(definirEstado('activo')).toBe('Estado: activo')
    expect(definirEstado('pendiente')).toBe('Estado: pendiente')
    // @ts-expect-error "borrado" no está en la unión
    definirEstado('borrado')
  })

  // keyof = lista de nombres de las llaves
  it('16) LlavesLibro es la unión de las llaves de Libro', () => {
    expectTypeOf<LlavesLibro>().toEqualTypeOf<'titulo' | 'paginas'>()
  })

  it('17) LlavesUsuario es la unión de las llaves de Usuario', () => {
    expectTypeOf<LlavesUsuario>().toEqualTypeOf<'id' | 'nombre' | 'activo'>()
  })

  // Tipo["llave"] = el tipo guardado en esa llave
  it('18) TipoTitulo es el tipo guardado en Libro["titulo"]', () => {
    expectTypeOf<TipoTitulo>().toEqualTypeOf<string>()
  })

  it('19) TipoActivo es el tipo guardado en Usuario["activo"]', () => {
    expectTypeOf<TipoActivo>().toEqualTypeOf<boolean>()
  })

  // todo junto en una función genérica
  it('20) propiedad conserva el tipo exacto de la clave pedida', () => {
    const p = { name: 'Ana', age: 30 }
    expect(propiedad(p, 'name')).toBe('Ana')
    expect(propiedad(p, 'age')).toBe(30)
    expectTypeOf(propiedad(p, 'name')).toEqualTypeOf<string>()
    expectTypeOf(propiedad(p, 'age')).toEqualTypeOf<number>()
  })

  // BLOQUE D — pluck: keyof + map
  it('21) extraer recoge el valor de una clave en cada objeto', () => {
    expect(extraer([{ id: 1 }, { id: 2 }], 'id')).toEqual([1, 2])
    expect(extraer([{ name: 'Ana' }, { name: 'Lu' }], 'name')).toEqual(['Ana', 'Lu'])
    expectTypeOf(extraer([{ id: 1 }], 'id')).toEqualTypeOf<number[]>()
    expectTypeOf(extraer([{ name: 'Ana' }], 'name')).toEqualTypeOf<string[]>()
  })

  // BLOQUE E — refuerzo keyof + T[K] + pluck (22–31)

  it('22) valorDe devuelve el valor de la clave con su tipo exacto', () => {
    const p = { nombre: 'Ana', edad: 30 }
    expect(valorDe(p, 'nombre')).toBe('Ana')
    expect(valorDe(p, 'edad')).toBe(30)
    expectTypeOf(valorDe(p, 'nombre')).toEqualTypeOf<string>()
    expectTypeOf(valorDe(p, 'edad')).toEqualTypeOf<number>()
  })

  it('23) igualA compara con un valor del tipo de la clave', () => {
    const p = { nombre: 'Ana', edad: 30 }
    expect(igualA(p, 'edad', 30)).toBe(true)
    expect(igualA(p, 'nombre', 'Luis')).toBe(false)
    // @ts-expect-error el valor debe ser number (tipo de "edad"), no string
    igualA(p, 'edad', 'treinta')
  })

  it('24) mismaPropiedad compara la misma clave entre dos objetos', () => {
    expect(mismaPropiedad({ id: 1 }, { id: 1 }, 'id')).toBe(true)
    expect(mismaPropiedad({ id: 1 }, { id: 2 }, 'id')).toBe(false)
  })

  it('25) columna saca el valor de la clave en cada objeto (pluck)', () => {
    const arr = [{ precio: 100 }, { precio: 200 }]
    expect(columna(arr, 'precio')).toEqual([100, 200])
    expectTypeOf(columna(arr, 'precio')).toEqualTypeOf<number[]>()
  })

  it('26) cuantosConValor cuenta los valores verdaderos', () => {
    const arr = [{ activo: true }, { activo: false }, { activo: true }]
    expect(cuantosConValor(arr, 'activo')).toBe(2)
    expectTypeOf(cuantosConValor(arr, 'activo')).toEqualTypeOf<number>()
  })

  it('27) etiquetar convierte la columna a string[]', () => {
    const arr = [{ precio: 100 }, { precio: 200 }]
    expect(etiquetar(arr, 'precio')).toEqual(['100', '200'])
    expectTypeOf(etiquetar(arr, 'precio')).toEqualTypeOf<string[]>()
  })

  it('28) primerValor devuelve el primero o undefined', () => {
    const arr = [{ n: 'Ana' }, { n: 'Lu' }]
    expect(primerValor(arr, 'n')).toBe('Ana')
    const vacio: { n: string }[] = []
    expect(primerValor(vacio, 'n')).toBeUndefined()
    expectTypeOf(primerValor(arr, 'n')).toEqualTypeOf<string | undefined>()
  })

  it('29) valoresUnicos elimina duplicados de la columna', () => {
    const arr = [{ t: 'a' }, { t: 'b' }, { t: 'a' }]
    expect(valoresUnicos(arr, 't')).toEqual(['a', 'b'])
    expectTypeOf(valoresUnicos(arr, 't')).toEqualTypeOf<string[]>()
  })

  it('30) dosValores devuelve dos claves como tupla tipada', () => {
    const p = { nombre: 'Ana', edad: 30 }
    expect(dosValores(p, 'nombre', 'edad')).toEqual(['Ana', 30])
    expectTypeOf(dosValores(p, 'nombre', 'edad')).toEqualTypeOf<[string, number]>()
  })

  it('31) buscarPor encuentra el objeto por el valor de una clave', () => {
    const arr = [{ id: 1, n: 'Ana' }, { id: 2, n: 'Lu' }]
    expect(buscarPor(arr, 'id', 2)).toEqual({ id: 2, n: 'Lu' })
    expect(buscarPor(arr, 'id', 99)).toBeUndefined()
    expectTypeOf(buscarPor(arr, 'id', 1)).toEqualTypeOf<{ id: number; n: string } | undefined>()
    // @ts-expect-error el valor debe ser number (tipo de "id"), no string
    buscarPor(arr, 'id', 'dos')
  })
})
