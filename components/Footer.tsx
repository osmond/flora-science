import { getLastSync } from "@/lib/utils"

type FooterProps = {
  lastSync?: string
}

export default function Footer({ lastSync }: FooterProps) {
  const syncTime = lastSync ?? getLastSync()
  return (
    <footer className="mt-[var(--space-xl)] text-xs text-gray-500 dark:text-gray-400">
      Last sync: {syncTime}
    </footer>
  )
}
