import { describe, expect, it } from 'vitest'
import { staircaseClip } from '../components/transitions/staircase'

describe('staircase clip mask', () => {
  it('starts closed and finishes as a full staircase surface', () => {
    expect(staircaseClip(0)).toContain('0% 0%')
    expect(staircaseClip(1)).toContain('100% 0%')
    expect(staircaseClip(1)).toContain('0% 100%')
  })

  it('clamps out-of-range progress values', () => {
    expect(staircaseClip(-1)).toBe(staircaseClip(0))
    expect(staircaseClip(2)).toBe(staircaseClip(1))
  })
})
