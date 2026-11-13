import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
import { useEffect, useRef, useState } from 'react'
import styles from './modal.module.css'

GlobalWorkerOptions.workerSrc = workerUrl

interface PdfCanvasProps {
  src: string
  title: string
  zoom: number
}

/** Renders the supplied PDF inside the portfolio UI, avoiding the browser PDF chrome. */
export function PdfCanvas({ src, title, zoom }: PdfCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [pageCount, setPageCount] = useState(1)

  useEffect(() => {
    let cancelled = false
    let loadingTask: ReturnType<typeof getDocument> | undefined

    async function render() {
      setStatus('loading')
      try {
        loadingTask = getDocument({ url: src })
        const pdf = await loadingTask.promise
        if (cancelled) return
        setPageCount(pdf.numPages)
        const page = await pdf.getPage(1)
        const baseViewport = page.getViewport({ scale: 1 })
        const availableWidth = Math.max(360, Math.min(900, window.innerWidth - 260))
        const scale = Math.max(0.45, Math.min(1.55, (availableWidth / baseViewport.width) * (zoom / 100)))
        const viewport = page.getViewport({ scale })
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if (!canvas || !context || cancelled) return

        const outputScale = window.devicePixelRatio || 1
        canvas.width = Math.floor(viewport.width * outputScale)
        canvas.height = Math.floor(viewport.height * outputScale)
        canvas.style.width = `${Math.floor(viewport.width)}px`
        canvas.style.height = `${Math.floor(viewport.height)}px`
        await page.render({
          canvas,
          canvasContext: context,
          transform: [outputScale, 0, 0, outputScale, 0, 0],
          viewport,
        }).promise
        if (!cancelled) setStatus('ready')
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    void render()
    return () => {
      cancelled = true
      loadingTask?.destroy()
    }
  }, [src, zoom])

  return (
    <div aria-label={`${title} PDF preview`} className={styles.pdfPreview} data-aim data-aim-contrast="dark">
      <canvas aria-hidden={status !== 'ready'} className={styles.pdfCanvas} data-aim data-aim-contrast="dark" ref={canvasRef} />
      {status !== 'ready' && <p className={styles.pdfStatus} role={status === 'error' ? 'alert' : 'status'}>{status === 'loading' ? 'RENDERING DOCUMENT…' : 'DOCUMENT PREVIEW UNAVAILABLE'}</p>}
      <span className={styles.pdfPageCount}>PAGE 1 / {pageCount}</span>
    </div>
  )
}
