import { toBynPenny } from '../src'

describe('toBynPenny', () => {
  it('default', () => {
    expect(toBynPenny(11)).toBe(1100)
  })

  it('default js fix', () => {
    // js return 1019.99999
    expect(toBynPenny(10.2)).toBe(1020)
  })

  it('float', () => {
    expect(toBynPenny(11.3)).toBe(1130)
  })

  it('* 2', () => {
    expect(toBynPenny(115 * 2)).toBe(23000)
  })

  it('* 2 float', () => {
    expect(toBynPenny(115.6 * 2)).toBe(23120)
  })

  it('* 2 float penny', () => {
    expect(toBynPenny(115.61 * 2)).toBe(23122)
  })
})
