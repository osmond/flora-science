import { getLastSync } from "@/lib/utils"

type FooterProps = {
  lastSync?: string
}

export default function Footer({ lastSync }: FooterProps) {
  const syncTime = lastSync ?? getLastSync()
  return (
    <footer className="mt-6 text-xs text-gray-500">
      Last sync: {syncTime}
    </footer>
  )
}
