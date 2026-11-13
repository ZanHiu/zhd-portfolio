import { createContext, type PropsWithChildren, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { sectionForPath } from '../../data/navigation'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { staircaseClip } from './staircase'
import { TransitionOverlay } from './TransitionOverlay'

export type TransitionPhase = 'idle' | 'covering' | 'titleHold' | 'swap' | 'revealing'

interface TransitionContextValue {
  phase: TransitionPhase
  renderedPath: string
  requestNavigation: (path: string) => void
}

interface QueuedNavigation {
  path: string
  alreadyCommitted: boolean
}

const TransitionContext = createContext<TransitionContextValue | null>(null)

function animateMask(
  element: HTMLDivElement,
  direction: 'cover' | 'reveal',
  duration: number,
  isCurrent: () => boolean,
) {
  return new Promise<void>((resolve) => {
    const start = performance.now()

    const tick = (now: number) => {
      if (!isCurrent()) {
        resolve()
        return
      }

      const progress = Math.min(1, (now - start) / duration)
      element.style.clipPath = staircaseClip(direction === 'cover' ? progress : 1 - progress)
      if (progress >= 1) {
        resolve()
        return
      }
      requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  })
}

export function TransitionProvider({ children }: PropsWithChildren) {
  const location = useLocation()
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const [renderedPath, setRenderedPath] = useState(location.pathname)
  const [phase, setPhase] = useState<TransitionPhase>('idle')
  const [targetPath, setTargetPath] = useState(location.pathname)
  const overlayRef = useRef<HTMLDivElement>(null)
  const mountedRef = useRef(true)
  const phaseRef = useRef<TransitionPhase>('idle')
  const renderedPathRef = useRef(location.pathname)
  const queuedRef = useRef<QueuedNavigation | null>(null)
  const runRef = useRef(0)
  const timersRef = useRef(new Set<number>())
  const startRef = useRef<(path: string, alreadyCommitted: boolean) => void>(() => undefined)

  const setMachine = useCallback((nextPhase: TransitionPhase, nextTarget: string) => {
    phaseRef.current = nextPhase
    if (!mountedRef.current) return
    setPhase(nextPhase)
    setTargetPath(nextTarget)
  }, [])

  const pause = useCallback((duration: number, run: number) => new Promise<boolean>((resolve) => {
    const timeout = window.setTimeout(() => {
      timersRef.current.delete(timeout)
      resolve(run === runRef.current && mountedRef.current)
    }, duration)
    timersRef.current.add(timeout)
  }), [])

  const runTransition = useCallback(async (path: string, alreadyCommitted: boolean) => {
    const safePath = path.startsWith('/') ? path : '/'
    if (phaseRef.current !== 'idle' || safePath === renderedPathRef.current) return

    const run = ++runRef.current
    const isCurrent = () => run === runRef.current && mountedRef.current
    const overlay = overlayRef.current
    const commitRoute = () => {
      renderedPathRef.current = safePath
      if (mountedRef.current) setRenderedPath(safePath)
      if (!alreadyCommitted) navigate(safePath)
    }

    setMachine('covering', safePath)

    try {
      if (reducedMotion || !overlay) {
        setMachine('swap', safePath)
        commitRoute()
        setMachine('idle', safePath)
        return
      }

      overlay.style.clipPath = staircaseClip(0)
      await animateMask(overlay, 'cover', 740, isCurrent)
      if (!isCurrent()) return

      overlay.style.clipPath = 'inset(0 0 0 0)'
      setMachine('titleHold', safePath)
      if (!await pause(620, run)) return

      setMachine('swap', safePath)
      commitRoute()
      if (!await pause(16, run)) return

      setMachine('revealing', safePath)
      await animateMask(overlay, 'reveal', 760, isCurrent)
      if (!isCurrent()) return
    } catch (error) {
      console.error('Navigation transition failed', error)
      commitRoute()
    } finally {
      if (isCurrent()) {
        if (overlay) overlay.style.clipPath = 'inset(0 100% 0 0)'
        setMachine('idle', safePath)
        const queued = queuedRef.current
        queuedRef.current = null
        if (queued && queued.path !== renderedPathRef.current) {
          queueMicrotask(() => startRef.current(queued.path, queued.alreadyCommitted))
        }
      }
    }
  }, [navigate, pause, reducedMotion, setMachine])

  startRef.current = (path, alreadyCommitted) => {
    void runTransition(path, alreadyCommitted)
  }

  const requestNavigation = useCallback((path: string) => {
    const safePath = path.startsWith('/') ? path : '/'
    if (safePath === renderedPathRef.current && phaseRef.current === 'idle') return
    if (phaseRef.current !== 'idle') {
      queuedRef.current = { path: safePath, alreadyCommitted: false }
      return
    }
    startRef.current(safePath, false)
  }, [])

  useEffect(() => {
    if (location.pathname === renderedPathRef.current) return
    if (phaseRef.current !== 'idle') {
      queuedRef.current = { path: location.pathname, alreadyCommitted: true }
      return
    }
    startRef.current(location.pathname, true)
  }, [location.pathname])

  useEffect(() => {
    // React Strict Mode intentionally runs setup -> cleanup -> setup in development.
    // Restore this guard at every setup so the second mounted instance can transition.
    mountedRef.current = true
    const activeTimers = timersRef.current
    return () => {
      mountedRef.current = false
      runRef.current += 1
      activeTimers.forEach((timer) => window.clearTimeout(timer))
      activeTimers.clear()
    }
  }, [])

  const section = sectionForPath(targetPath)
  const value = { phase, renderedPath, requestNavigation }

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <TransitionOverlay
        index={section.index}
        overlayRef={overlayRef}
        phase={phase}
        title={section.label}
      />
    </TransitionContext.Provider>
  )
}

export function useTransition() {
  const context = useContext(TransitionContext)
  if (!context) throw new Error('useTransition must be used within TransitionProvider')
  return context
}
