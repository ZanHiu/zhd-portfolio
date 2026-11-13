import type { AnchorHTMLAttributes, MouseEvent } from 'react'
import { useTransition } from './TransitionProvider'

interface RouteLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
}

export function RouteLink({ to, onClick, ...props }: RouteLinkProps) {
  const { requestNavigation } = useTransition()

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return
    event.preventDefault()
    requestNavigation(to)
  }

  return <a {...props} data-aim href={to} onClick={handleClick} />
}
