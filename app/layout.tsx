import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import SidebarNav from "@/components/SidebarNav"
import MobileNav from "@/components/MobileNav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Flora-Science",
  description: "Track and analyze your plants with science-driven care.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <div className="flex min-h-screen">
          <div className="hidden md:block">
            <SidebarNav />
          </div>
          <div className="flex-1 pb-16 md:pb-0">{children}</div>
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </body>
    </html>
  )
}
