import { describe, it, expect, expectTypeOf } from 'vitest'
import { juan, publicar, defaultSettings } from './exercise-06'
import type { User, Article, Settings } from './exercise-06'

describe('exercise-06 — objetos: opcionales y readonly por propiedad', () => {
  it('User tiene id readonly, name/email obligatorias, phone opcional', () => {
    expectTypeOf<User>().toEqualTypeOf<{
      readonly id: string
      name: string
      email: string
      phone?: string
    }>()
  })

  it('juan cumple el shape User con phone ausente', () => {
    expect(juan).toEqual({ id: 'u-1', name: 'Juan', email: 'juan@mail.com' })
    expectTypeOf(juan).toEqualTypeOf<User>()
  })

  it('Article tiene slug readonly, title/body obligatorios, publishedAt opcional', () => {
    expectTypeOf<Article>().toEqualTypeOf<{
      readonly slug: string
      title: string
      body: string
      publishedAt?: string
    }>()
  })

  it('publicar devuelve un nuevo Article con publishedAt asignado y no muta el original', () => {
    const original: Article = { slug: 'hola', title: 'Hola', body: 'mundo' }
    const publicado = publicar(original, '2026-05-27')
    expect(publicado).toEqual({ slug: 'hola', title: 'Hola', body: 'mundo', publishedAt: '2026-05-27' })
    expect(original).toEqual({ slug: 'hola', title: 'Hola', body: 'mundo' })
    expect(publicado).not.toBe(original)
  })

  it('Settings tiene theme literal union, language opcional, version readonly', () => {
    expectTypeOf<Settings>().toEqualTypeOf<{
      theme: 'light' | 'dark'
      language?: string
      readonly version: number
    }>()
  })

  it('defaultSettings cumple Settings con language ausente', () => {
    expect(defaultSettings).toEqual({ theme: 'light', version: 1 })
    expectTypeOf(defaultSettings).toEqualTypeOf<Settings>()
  })
})
