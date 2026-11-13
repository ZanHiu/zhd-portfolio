import { AppShell } from './AppShell'
import { AppRoutes } from './routes'
import { CursorProvider } from '../components/cursor/CursorProvider'
import { ModalProvider } from '../components/modals/ModalProvider'
import { GreetingProvider } from '../components/motion/GreetingProvider'
import { TransitionProvider } from '../components/transitions/TransitionProvider'

export function App() {
  return (
    <GreetingProvider>
      <TransitionProvider>
        <CursorProvider>
          <ModalProvider>
            <AppShell>
              <AppRoutes />
            </AppShell>
          </ModalProvider>
        </CursorProvider>
      </TransitionProvider>
    </GreetingProvider>
  )
}
