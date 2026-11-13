import { createContext, type PropsWithChildren, useCallback, useContext, useState } from 'react'
import type { CredentialRecord } from '../../data/credentials'
import { DocumentViewer } from './DocumentViewer'

interface ModalContextValue {
  openDocument: (record: CredentialRecord) => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: PropsWithChildren) {
  const [record, setRecord] = useState<CredentialRecord | null>(null)
  const openDocument = useCallback((nextRecord: CredentialRecord) => setRecord(nextRecord), [])
  const close = useCallback(() => setRecord(null), [])

  return (
    <ModalContext.Provider value={{ openDocument }}>
      {children}
      {record && <DocumentViewer record={record} onClose={close} />}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal must be used within ModalProvider')
  return context
}
