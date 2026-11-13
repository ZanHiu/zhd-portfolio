import { describe, expect, it } from 'vitest'
import { navigationItems, sectionForPath } from '../data/navigation'

describe('navigation configuration', () => {
  it('contains the seven approved routes in reference order', () => {
    expect(navigationItems.map((item) => item.id)).toEqual([
      'home',
      'about',
      'projects',
      'skills',
      'credentials',
      'guestbook',
      'contact',
    ])
  })

  it('falls back to home for an unknown path', () => {
    expect(sectionForPath('/unknown').id).toBe('home')
  })
})
