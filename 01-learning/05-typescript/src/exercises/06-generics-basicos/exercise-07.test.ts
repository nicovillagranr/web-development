import { describe, it, expect } from 'vitest'
import { plegar, total, contarPor, algunoCumple, resumenNumerico } from './exercise-07'

describe('06-generics / exercise-07 — plegar/reducir', () => {
  it('1) plegar', () => {
    expect(plegar([1, 2, 3], 0, (acc, n) => acc + n)).toBe(6)
    expect(plegar(['a', 'b'], '', (acc, s) => acc + s)).toBe('ab')
  })
  it('2) total', () => {
    expect(total([{ p: 10 }, { p: 5 }], (x) => x.p)).toBe(15)
  })
  it('3) contarPor', () => {
    expect(contarPor(['a', 'b', 'a'], (x) => x)).toEqual({ a: 2, b: 1 })
  })
  it('4) algunoCumple', () => {
    expect(algunoCumple([1, 2, 3], (n) => n > 2)).toBe(true)
    expect(algunoCumple([1], (n) => n > 5)).toBe(false)
  })
  it('5) resumenNumerico', () => {
    expect(resumenNumerico([{ p: 10 }, { p: 20 }], (x) => x.p)).toEqual({ suma: 30, cantidad: 2 })
  })
})
