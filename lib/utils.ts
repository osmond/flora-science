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
