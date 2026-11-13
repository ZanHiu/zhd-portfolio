import { useEffect, useMemo, useState } from 'react'
import { HiArrowDownTray, HiArrowPath, HiArrowTopRightOnSquare, HiMagnifyingGlassMinus, HiMagnifyingGlassPlus } from 'react-icons/hi2'
import type { CredentialRecord } from '../../data/credentials'
import { PdfCanvas } from './PdfCanvas'
import { ViewerShell } from './ViewerShell'
import styles from './modal.module.css'

interface DocumentViewerProps {
  record: CredentialRecord
  onClose: () => void
}

function documentText(record: CredentialRecord) {
  return `${record.documentLabel}\n\n${record.details.join('\n\n')}\n\nText record only — not an official certificate image.`
}

export function DocumentViewer({ record, onClose }: DocumentViewerProps) {
  const [zoom, setZoom] = useState(100)
  const generatedUrl = useMemo(() => URL.createObjectURL(new Blob([documentText(record)], { type: 'text/plain;charset=utf-8' })), [record])
  const isPdf = Boolean(record.assetUrl)
  const documentUrl = record.assetUrl ?? generatedUrl

  useEffect(() => () => URL.revokeObjectURL(generatedUrl), [generatedUrl])

  const openDocument = () => {
    const page = window.open(documentUrl, '_blank', 'noopener,noreferrer')
    page?.focus()
  }

  const toolbar = (
    <div className={styles.toolbar}>
      <span>{isPdf ? 'DOCUMENT / OFFICIAL PDF' : 'DOCUMENT / TEXT RECORD'}</span>
      <div className={styles.tools}>
        <button aria-label="Zoom out" data-aim disabled={zoom <= 50} onClick={() => setZoom((value) => Math.max(50, value - 25))} type="button"><HiMagnifyingGlassMinus /></button>
        <output aria-live="polite">{zoom}%</output>
        <button aria-label="Zoom in" data-aim disabled={zoom >= 200} onClick={() => setZoom((value) => Math.min(200, value + 25))} type="button"><HiMagnifyingGlassPlus /></button>
        <button aria-label="Reset zoom" data-aim onClick={() => setZoom(100)} type="button"><HiArrowPath /></button>
        <button aria-label={isPdf ? 'Open official resume PDF in a new tab' : 'Open text record in a new tab'} data-aim onClick={openDocument} type="button"><HiArrowTopRightOnSquare /></button>
      </div>
    </div>
  )

  return (
    <ViewerShell
      closeLabel="Close document viewer"
      footer={<><span>DOCUMENT VIEWER <i>PORTFOLIO / 2026</i></span><a data-aim download={record.fileName ?? `${record.id}.txt`} href={documentUrl}>DOWNLOAD <HiArrowDownTray /></a></>}
      onClose={onClose}
      title={`RECORD / ${record.documentLabel}`}
      toolbar={toolbar}
    >
      {isPdf
        ? <PdfCanvas src={documentUrl} title={record.title} zoom={zoom} />
        : <article className={styles.document} data-aim data-aim-contrast="dark" style={{ width: `${zoom * 0.9}%` }}>
          <p className={styles.documentKicker}>DOCUMENT PREVIEW / TEXT SUMMARY</p>
          <h2>{record.documentLabel}</h2>
          {record.details.map((detail) => <p key={detail}>{detail}</p>)}
        </article>}
    </ViewerShell>
  )
}
