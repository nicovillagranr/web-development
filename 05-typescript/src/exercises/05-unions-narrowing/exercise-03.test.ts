import { describe, it, expect } from 'vitest'
import {
  largo,
  doble,
  saludar,
  describir,
  contactar,
  sonido,
  area,
  canal,
  quien,
  procesar,
  tituloProyecto,
  enlaceRepo,
  precioFinal,
  saludoSesion,
  cantidadItems,
  etiquetaPrecio,
  ciudadEnvio,
  stockMostrado,
  portada,
  activar,
  primerProducto,
  resumenConfig,
} from './exercise-03'

describe('exercise-03 — narrowing con objetos y null', () => {
  // BLOQUE A — descartar null
  it('A1) largo devuelve length o 0 si null', () => {
    expect(largo('hola')).toBe(4)
    expect(largo('')).toBe(0)
    expect(largo(null)).toBe(0)
  })

  it('A2) doble devuelve el doble o 0 si null', () => {
    expect(doble(5)).toBe(10)
    expect(doble(0)).toBe(0)
    expect(doble(null)).toBe(0)
  })

  // BLOQUE B — la trampa typeof null
  it('B1) saludar lee nombre o "anónimo", sin dejar pasar null', () => {
    expect(saludar({ nombre: 'Ana' })).toBe('Ana')
    expect(saludar(null)).toBe('anónimo')
  })

  it('B2) describir maneja number, string y null', () => {
    expect(describir(3)).toBe('3')
    expect(describir('hola')).toBe('HOLA')
    expect(describir(null)).toBe('vacío')
  })

  // BLOQUE C — el operador in
  it('C1) contactar distingue email de teléfono con `in`', () => {
    expect(contactar({ email: 'a@b.c' })).toBe('a@b.c')
    expect(contactar({ telefono: '123' })).toBe('123')
  })

  it('C2) sonido distingue ladrido de maullido con `in`', () => {
    expect(sonido({ ladrido: 'Guau' })).toBe('Guau')
    expect(sonido({ maullido: 'Miau' })).toBe('Miau')
  })

  // BLOQUE D — más práctica con in
  it('D1) area calcula según la variante de Caja', () => {
    expect(area({ lado: 3 })).toBe(9)
    expect(area({ ancho: 2, alto: 5 })).toBe(10)
  })

  it('D2) canal encadena `in` con 3 variantes', () => {
    expect(canal({ email: 'a@b.c' })).toBe('a@b.c')
    expect(canal({ sms: 'hola' })).toBe('hola')
    expect(canal({ push: 'ping' })).toBe('ping')
  })

  it('D3) quien distingue rol aunque compartan `nombre`', () => {
    expect(quien({ nombre: 'Ana', rolAdmin: 'root' })).toBe('Ana: root')
    expect(quien({ nombre: 'Leo', rolCliente: 'premium' })).toBe('Leo: premium')
  })

  it('D4) procesar combina null + `in`', () => {
    expect(procesar(null)).toBe('sin respuesta')
    expect(procesar({ ok: 'listo' })).toBe('OK: listo')
    expect(procesar({ error: 'boom' })).toBe('ERR: boom')
  })

  // BLOQUE E — el null en el borde de una API
  it('E1) tituloProyecto descarta el null del recurso completo', () => {
    expect(tituloProyecto({ nombre: 'Projex', repoUrl: null })).toBe('Projex')
    expect(tituloProyecto(null)).toBe('Proyecto no encontrado')
  })

  it('E2) enlaceRepo descarta el null del campo opcional', () => {
    expect(enlaceRepo({ nombre: 'Projex', repoUrl: 'github.com/x' })).toBe('github.com/x')
    expect(enlaceRepo({ nombre: 'Privado', repoUrl: null })).toBe('Sin repositorio')
  })

  it('E3) precioFinal aplica el descuento o el precio tal cual', () => {
    expect(precioFinal({ nombre: 'X', precio: 100, descuento: { porcentaje: 20 } })).toBe(80)
    expect(precioFinal({ nombre: 'Y', precio: 100, descuento: null })).toBe(100)
  })

  it('E4) saludoSesion usa ?. y ?? para el usuario null', () => {
    expect(saludoSesion({ usuario: { nombre: 'Nico' } })).toBe('Nico')
    expect(saludoSesion({ usuario: null })).toBe('invitado')
  })

  it('E5) cantidadItems trata el carrito null como 0', () => {
    expect(cantidadItems({ items: [{ precio: 10 }, { precio: 5 }] })).toBe(2)
    expect(cantidadItems(null)).toBe(0)
  })

  it('E6) etiquetaPrecio combina null de producto + null de descuento', () => {
    expect(etiquetaPrecio(null)).toBe('No disponible')
    expect(etiquetaPrecio({ nombre: 'X', precio: 100, descuento: null })).toBe('$100.00')
    expect(etiquetaPrecio({ nombre: 'Y', precio: 100, descuento: { porcentaje: 25 } })).toBe('$75.00')
  })

  // BLOQUE F — sintaxis fina de ?. y ??
  it('F1) ciudadEnvio encadena ?. dos niveles', () => {
    expect(ciudadEnvio({ cliente: { direccion: { ciudad: 'Lima' } } })).toBe('Lima')
    expect(ciudadEnvio({ cliente: { direccion: null } })).toBe('sin ciudad')
    expect(ciudadEnvio({ cliente: null })).toBe('sin ciudad')
  })

  it('F2) stockMostrado respeta el 0 (?? y no ||)', () => {
    expect(stockMostrado({ stock: 7 })).toBe(7)
    expect(stockMostrado({ stock: 0 })).toBe(0)
    expect(stockMostrado({ stock: null })).toBe(-1)
  })

  it('F3) portada usa ?.[] sobre un array que puede ser null', () => {
    expect(portada({ fotos: ['a.png', 'b.png'] })).toBe('a.png')
    expect(portada({ fotos: [] })).toBe('placeholder.webp')
    expect(portada({ fotos: null })).toBe('placeholder.webp')
  })

  it('F4) activar usa ?.() para llamar un callback opcional', () => {
    expect(activar({ onClick: () => 'guardado' })).toBe('guardado')
    expect(activar({ onClick: null })).toBe('sin acción')
  })

  it('F5) primerProducto encadena ?. con acceso por índice', () => {
    expect(primerProducto({ carrito: { items: [{ nombre: 'Té' }] } })).toBe('Té')
    expect(primerProducto({ carrito: { items: [] } })).toBe('vacío')
    expect(primerProducto({ carrito: null })).toBe('vacío')
  })

  it('F6) resumenConfig junta ?. propiedad, ?.() y el 0 válido', () => {
    expect(resumenConfig({ tema: { color: 'rojo' }, obtenerDescuento: () => 15 })).toBe('rojo / 15%')
    expect(resumenConfig({ tema: null, obtenerDescuento: () => 0 })).toBe('default / 0%')
    expect(resumenConfig({ tema: { color: 'azul' }, obtenerDescuento: null })).toBe('azul / 0%')
  })
})
