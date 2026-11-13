export interface GreetingOption {
  readonly code: string
  readonly label: string
  readonly greeting: string
}

export const greetingOptions = [
  { code: 'VI', label: 'Vietnamese', greeting: 'Xin chào' },
  { code: 'EN', label: 'English', greeting: 'Hello' },
  { code: 'FR', label: 'French', greeting: 'Bonjour' },
  { code: 'ES', label: 'Spanish', greeting: 'Hola' },
  { code: 'IT', label: 'Italian', greeting: 'Ciao' },
  { code: 'DE', label: 'German', greeting: 'Hallo' },
  { code: 'PT', label: 'Portuguese', greeting: 'Olá' },
  { code: 'JA', label: 'Japanese', greeting: 'こんにちは' },
  { code: 'KO', label: 'Korean', greeting: '안녕하세요' },
  { code: 'ZH', label: 'Chinese', greeting: '你好' },
  { code: 'RU', label: 'Russian', greeting: 'Привет' },
  { code: 'AR', label: 'Arabic', greeting: 'مرحبا' },
  { code: 'HI', label: 'Hindi', greeting: 'नमस्ते' },
  { code: 'TH', label: 'Thai', greeting: 'สวัสดี' },
  { code: 'MS', label: 'Malay', greeting: 'Selamat datang' },
  { code: 'SV', label: 'Swedish', greeting: 'Hej' },
  { code: 'TR', label: 'Turkish', greeting: 'Merhaba' },
  { code: 'PL', label: 'Polish', greeting: 'Cześć' },
] as const satisfies readonly GreetingOption[]

export const defaultGreetingCode = 'EN'

export function orderedGreetings(startCode: string): readonly GreetingOption[] {
  const startIndex = greetingOptions.findIndex((option) => option.code === startCode)
  if (startIndex < 0) return greetingOptions
  return [...greetingOptions.slice(startIndex), ...greetingOptions.slice(0, startIndex)]
}
