import { describe, it, expect } from 'vitest'
import {
  destinatario,
  vistaPrevia,
  esInstantanea,
  enrutar,
  resumenEnvios,
} from './exercise-09'
import type { Notificacion } from './exercise-09'

const email: Notificacion = { canal: 'email', para: 'a@b.com', asunto: 'Hola' }
const sms: Notificacion = { canal: 'sms', telefono: '600123', texto: 'Ping' }
const push: Notificacion = { canal: 'push', deviceId: 'd1', titulo: 'Alerta' }

describe('exercise-09 — enrutar y agregar por etiqueta', () => {
  // BLOQUE A
  it('A1) destinatario lee el campo de cada canal', () => {
    expect(destinatario(email)).toBe('a@b.com')
    expect(destinatario(sms)).toBe('600123')
    expect(destinatario(push)).toBe('d1')
  })

  it('A2) vistaPrevia devuelve el texto principal', () => {
    expect(vistaPrevia(email)).toBe('Hola')
    expect(vistaPrevia(sms)).toBe('Ping')
    expect(vistaPrevia(push)).toBe('Alerta')
  })

  it('A3) esInstantanea true en sms/push', () => {
    expect(esInstantanea(email)).toBe(false)
    expect(esInstantanea(sms)).toBe(true)
    expect(esInstantanea(push)).toBe(true)
  })

  // BLOQUE B
  it('B1) enrutar arma la línea de envío por canal', () => {
    expect(enrutar(email)).toBe('EMAIL a a@b.com: Hola')
    expect(enrutar(sms)).toBe('SMS a 600123: Ping')
    expect(enrutar(push)).toBe('PUSH a d1: Alerta')
  })

  it('B2) resumenEnvios cuenta por canal', () => {
    expect(resumenEnvios([email, sms, email])).toEqual({ email: 2, sms: 1, push: 0 })
    expect(resumenEnvios([])).toEqual({ email: 0, sms: 0, push: 0 })
    expect(resumenEnvios([push, push, sms, email])).toEqual({ email: 1, sms: 1, push: 2 })
  })
})
