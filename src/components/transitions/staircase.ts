export function staircaseClip(progress: number, reverse = false) {
  const rows = 12
  const points: string[] = []
  const range = Math.max(0, Math.min(1, progress))

  for (let row = 0; row < rows; row += 1) {
    const y0 = (row * 100) / rows
    const y1 = ((row + 1) * 100) / rows
    const delay = (row / rows) * 0.27
    const normalized = Math.max(0, Math.min(1, (range - delay) / 0.73))
    const eased = normalized * normalized * (3 - 2 * normalized)
    const x = (reverse ? 1 - eased : eased) * 100

    if (row === 0) points.push(`0% 0%`, `${x}% 0%`)
    else points.push(`${x}% ${y0}%`)
    points.push(`${x}% ${y1}%`)
  }

  points.push('0% 100%')
  return `polygon(${points.join(',')})`
}
