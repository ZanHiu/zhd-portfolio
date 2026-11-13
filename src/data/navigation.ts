export type SectionId =
  | 'home'
  | 'about'
  | 'projects'
  | 'skills'
  | 'credentials'
  | 'guestbook'
  | 'contact'

export interface NavigationItem {
  id: SectionId
  index: string
  label: string
  path: string
}

export const navigationItems: readonly NavigationItem[] = [
  { id: 'home', index: '01', label: 'HOME', path: '/' },
  { id: 'about', index: '02', label: 'ABOUT', path: '/about' },
  { id: 'projects', index: '03', label: 'PROJECTS', path: '/projects' },
  { id: 'skills', index: '04', label: 'SKILLS', path: '/skills' },
  { id: 'credentials', index: '05', label: 'CREDENTIALS', path: '/credentials' },
  { id: 'guestbook', index: '06', label: 'GUESTBOOK', path: '/guestbook' },
  { id: 'contact', index: '07', label: 'CONTACT', path: '/contact' },
]

export function sectionForPath(pathname: string): NavigationItem {
  return navigationItems.find((item) => item.path === pathname) ?? navigationItems[0]
}
