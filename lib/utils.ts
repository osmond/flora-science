export function getLastSync(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })
}

export function formatTemperature(
  tempF: number,
  unit: 'F' | 'C' = 'F'
): string {
  const value = unit === 'F' ? tempF : ((tempF - 32) * 5) / 9
  return `${value.toFixed(1)}°${unit}`
}

export function formatHumidity(rh: number): string {
  return `${rh.toFixed(0)}% RH`
}

export function formatVpd(vpd: number, unit = 'kPa'): string {
  return `${vpd.toFixed(1)} ${unit}`
}

// TODO: Wire to real sync events once data persistence is available.
export function toCsv(rows: Record<string, any>[]): string {
  if (!rows.length) return ''
  const headers = Object.keys(rows[0])
  const lines = [headers.join(',')]
  for (const row of rows) {
    lines.push(headers.map((h) => JSON.stringify(row[h] ?? '')).join(','))
  }
  return lines.join('\n')
}

export function downloadCsv(filename: string, rows: Record<string, any>[]): void {
  const csv = toCsv(rows)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.click()
  URL.revokeObjectURL(url)
}
