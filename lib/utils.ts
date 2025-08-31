export function getLastSync(): string {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })
}

// TODO: Wire to real sync events once data persistence is available.
