import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const initialCurves = [
  'M-200 310 C230 -180 610 290 1250 95 S1780 95 1900 -80',
  'M-120 520 C280 -90 1000 180 1630 260',
  'M250 -250 C490 250 980 300 1400 1060',
  'M690 -180 C840 400 1210 490 1590 1100',
  'M-260 680 C350 50 940 940 1580 400',
  'M1120 -260 C1060 300 1510 530 1710 910',
  'M-100 845 C490 370 1060 480 1770 740',
]

const curveConfigurations = [
  [-190, 180, 290, -80, 540, 240, 950, 100, 1500, 80],
  [80, -190, 190, 450, 850, 160, 1580, 240, 1730, 280],
  [-10, -250, 340, 350, 1150, 230, 1600, 1030, 1700, 1170],
  [-150, 770, 330, 30, 1030, 860, 1560, 340, 1780, 90],
  [-100, 930, 540, 330, 1190, 500, 1700, 710, 1860, 840],
  [-140, 150, 430, -200, 960, 450, 1460, -250, 1900, 170],
  [-220, 530, 450, 80, 1060, 650, 1580, 560, 1890, 410],
]

export function HomeCurves() {
  const reducedMotion = useReducedMotion()
  const pathsRef = useRef<Array<SVGPathElement | null>>([])

  useEffect(() => {
    if (reducedMotion) return undefined
    const pointer = { x: 0, y: 0 }
    let frame = 0
    let lastCurve = 0
    let running = true
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2
    }
    const tick = (time: number) => {
      if (!running || document.visibilityState === 'hidden') return
      if (time - lastCurve > 30) {
        lastCurve = time
        pathsRef.current.forEach((path, index) => {
          if (!path) return
          const config = curveConfigurations[index]
          const wave = Math.sin(time * 0.00054 + index * 0.87)
          const waveTwo = Math.cos(time * 0.00038 + index * 1.4)
          const a = wave * 175 + pointer.x * 42
          const b = waveTwo * 165 + pointer.y * 40
          path.setAttribute('d', `M${config[0]} ${config[1] + a * 0.3} C${config[2] + a} ${config[3] + b} ${config[4] - a * 0.7} ${config[5] - b * 0.7} ${config[6]} ${config[7]} S${config[8] + b * 0.2} ${config[9] + a * 0.6} 1950 ${config[9] - b}`)
        })
      }
      frame = requestAnimationFrame(tick)
    }
    const onVisibility = () => {
      cancelAnimationFrame(frame)
      if (document.visibilityState === 'visible') frame = requestAnimationFrame(tick)
    }

    document.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    frame = requestAnimationFrame(tick)
    return () => {
      running = false
      cancelAnimationFrame(frame)
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reducedMotion])

  return (
    <svg viewBox="0 0 1500 950" preserveAspectRatio="xMidYMid slice">
      <g stroke="currentColor" fill="none">
        {initialCurves.map((curve, index) => <path d={curve} key={curve} ref={(element) => { pathsRef.current[index] = element }} />)}
      </g>
    </svg>
  )
}
