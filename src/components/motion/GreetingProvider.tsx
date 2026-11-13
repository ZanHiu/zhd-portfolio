import { createContext, type PropsWithChildren, useContext, useEffect, useState } from 'react'
import { defaultGreetingCode } from '../../data/greetings'
import { translate, type LocaleKey } from '../../data/locale'
import { GreetingLoader } from './GreetingLoader'

interface GreetingContextValue {
  restart: () => void
  selectedCode: string
  selectLanguage: (code: string) => void
  t: (key: LocaleKey) => string
}

const GreetingContext = createContext<GreetingContextValue | null>(null)

export function GreetingProvider({ children }: PropsWithChildren) {
  const [run, setRun] = useState(0)
  const [selectedCode, setSelectedCode] = useState(() => window.localStorage.getItem('zhd-language') ?? defaultGreetingCode)

  useEffect(() => {
    document.documentElement.lang = selectedCode.toLowerCase()
  }, [selectedCode])

  function selectLanguage(code: string) {
    setSelectedCode(code)
    window.localStorage.setItem('zhd-language', code)
    setRun((value) => value + 1)
  }

  return (
    <GreetingContext.Provider value={{ restart: () => setRun((value) => value + 1), selectedCode, selectLanguage, t: (key) => translate(selectedCode, key) }}>
      {children}
      <GreetingLoader run={run} startCode={selectedCode} />
    </GreetingContext.Provider>
  )
}

export function useGreeting() {
  const context = useContext(GreetingContext)
  if (!context) throw new Error('useGreeting must be used within GreetingProvider')
  return context
}
