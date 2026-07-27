import { describe, it, expect } from 'vitest'
import {
  describirConfig,
  resumenPerfil,
  configPorDefecto,
  perfilPorDefecto,
  conPuerto,
} from './exercise-07'

describe('01-tipos-basicos / exercise-07 — typeof (operador de tipo)', () => {
  /* ── BLOQUE A — tipo derivado como parámetro ── */

  it('1) describirConfig usa host y port', () => {
    expect(describirConfig({ host: 'localhost', port: 3000, https: false })).toBe('localhost:3000')
    expect(describirConfig({ host: 'api.web', port: 443, https: true })).toBe('api.web:443')
  })

  it('2) resumenPerfil usa usuario y nivel', () => {
    expect(resumenPerfil({ usuario: 'ana', nivel: 7 })).toBe('ana (nivel 7)')
    expect(resumenPerfil({ usuario: 'leo', nivel: 1 })).toBe('leo (nivel 1)')
  })

  /* ── BLOQUE B — tipo derivado como retorno (objeto completo) ── */

  it('3) configPorDefecto devuelve la config completa', () => {
    expect(configPorDefecto()).toEqual({ host: 'localhost', port: 3000, https: false })
  })

  it('4) perfilPorDefecto devuelve el perfil completo', () => {
    expect(perfilPorDefecto()).toEqual({ usuario: 'invitado', nivel: 0 })
  })

  /* ── BLOQUE C — capstone: copia + pisa ── */

  it('5) conPuerto cambia solo el puerto y no muta el original', () => {
    const base = { host: 'localhost', port: 3000, https: false }
    expect(conPuerto(base, 8080)).toEqual({ host: 'localhost', port: 8080, https: false })
    expect(base.port).toBe(3000) // intacto
  })
})
