import type { PropsWithChildren } from 'react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './cursor.module.css'

const targetSelector = 'a[href],button:not(:disabled),input:not(:disabled),textarea:not(:disabled),select:not(:disabled),[role="button"],[tabindex]:not([tabindex="-1"]),[data-aim]'

function findTarget(x: number, y: number) {
  const activeModal = document.querySelector<HTMLElement>('[role="dialog"][aria-modal="true"]:not([hidden])')
  for (const element of document.elementsFromPoint(x, y)) {
    if (!(element instanceof HTMLElement)) continue
    const target = element.closest<HTMLElement>(targetSelector)
    if (!target || !target.getClientRects().length) continue
    if (target.closest('[aria-hidden="true"], [inert]')) continue
    if (activeModal && !target.closest('[role="dialog"][aria-modal="true"]')) continue
    const rect = target.getBoundingClientRect()
    // Large canvases are valid aim targets in a modal viewer. The normal
    // page-level size guard is only needed outside of a modal.
    if (rect.width < 6 || rect.height < 6 || (!activeModal && (rect.width > window.innerWidth * 0.94 || rect.height > window.innerHeight * 0.9))) continue
    return target
  }
  return null
}

export function CursorProvider({ children }: PropsWithChildren) {
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const reticleRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine) and (hover: hover)')
    const update = () => setEnabled(media.matches && !reducedMotion)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [reducedMotion])

  useEffect(() => {
    if (!enabled || !reticleRef.current || !frameRef.current || !ghostRef.current) return

    document.documentElement.dataset.cursorReady = 'true'
    const reticle = reticleRef.current
    const frame = frameRef.current
    const ghost = ghostRef.current
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const follow = { ...pointer }
    const box = { left: 0, top: 0, width: 0, height: 0 }
    let lastTime = performance.now()
    let angle = 0
    let visible = false
    let running = true
    let animationFrame = 0
    let lastTarget: HTMLElement | null = null

    const setLocked = (target: HTMLElement | null) => {
      if (target === lastTarget) return
      lastTarget = target
      const locked = String(Boolean(target))
      // A white PDF page sits inside a dark viewer. Contrast belongs to the
      // hovered target itself, not to its parent viewer stage.
      const requestedContrast = target?.dataset.aimContrast
      const contrast = requestedContrast === 'light' || requestedContrast === 'dark'
        ? requestedContrast
        : target?.matches('[data-aim-dark="true"]') || document.documentElement.dataset.theme === 'dark'
          ? 'light'
          : 'dark'
      frame.dataset.locked = locked
      reticle.dataset.locked = locked
      frame.dataset.contrast = contrast
      reticle.dataset.contrast = contrast
      ghost.dataset.contrast = contrast
    }

    const frameLoop = (time: number) => {
      if (!running || document.visibilityState === 'hidden') return
      const delta = Math.min(3, Math.max(0.2, (time - lastTime) / 16.667))
      lastTime = time
      ghost.style.left = `${pointer.x}px`
      ghost.style.top = `${pointer.y}px`

      const target = visible ? findTarget(pointer.x, pointer.y) : null
      setLocked(target)
      const lattice = 21
      const gridX = Math.round((pointer.x - 14) / lattice) * lattice + 14
      const gridY = Math.round((pointer.y - 2) / lattice) * lattice + 2
      const desiredX = pointer.x * 0.92 + gridX * 0.08
      const desiredY = pointer.y * 0.92 + gridY * 0.08
      const smooth = 1 - Math.pow(0.79, delta)
      const previousX = follow.x
      const previousY = follow.y
      follow.x += (desiredX - follow.x) * smooth
      follow.y += (desiredY - follow.y) * smooth
      reticle.style.left = `${follow.x}px`
      reticle.style.top = `${follow.y}px`
      angle += (0.55 + Math.min(2.9, Math.hypot(follow.x - previousX, follow.y - previousY) * 0.45)) * delta
      reticle.style.setProperty('--reticle-angle', `${angle.toFixed(2)}deg`)

      if (target) {
        const rect = target.getBoundingClientRect()
        const padding = 7
        const next = { left: rect.left - padding, top: rect.top - padding, width: rect.width + padding * 2, height: rect.height + padding * 2 }
        const ease = 1 - Math.pow(0.68, delta)
        box.left += (next.left - box.left) * ease
        box.top += (next.top - box.top) * ease
        box.width += (next.width - box.width) * ease
        box.height += (next.height - box.height) * ease
        frame.style.transform = `translate3d(${box.left}px, ${box.top}px, 0)`
        frame.style.width = `${box.width}px`
        frame.style.height = `${box.height}px`
        frame.style.setProperty('--corner', `${Math.min(15, Math.max(8, Math.min(box.width, box.height) * 0.23))}px`)
      }

      animationFrame = requestAnimationFrame(frameLoop)
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return
      pointer.x = event.clientX
      pointer.y = event.clientY
      visible = true
      reticle.dataset.visible = 'true'
      ghost.dataset.visible = 'true'
    }
    const hide = () => {
      visible = false
      setLocked(null)
      reticle.dataset.visible = 'false'
      ghost.dataset.visible = 'false'
    }
    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) hide()
    }
    const onResize = () => setLocked(null)
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        cancelAnimationFrame(animationFrame)
        hide()
      } else {
        lastTime = performance.now()
        animationFrame = requestAnimationFrame(frameLoop)
      }
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerout', onPointerOut)
    window.addEventListener('blur', hide)
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)
    animationFrame = requestAnimationFrame(frameLoop)

    return () => {
      running = false
      cancelAnimationFrame(animationFrame)
      document.documentElement.removeAttribute('data-cursor-ready')
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerout', onPointerOut)
      window.removeEventListener('blur', hide)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [enabled])

  return (
    <>
      {children}
      {enabled && createPortal(
        <>
          <div aria-hidden="true" className={styles.aimFrame} data-locked="false" ref={frameRef} />
          <div aria-hidden="true" className={styles.reticle} data-locked="false" data-visible="false" ref={reticleRef}><span className={styles.reticleShape} /></div>
          <div aria-hidden="true" className={styles.ghost} data-visible="false" ref={ghostRef} />
        </>,
        document.body,
      )}
    </>
  )
}
