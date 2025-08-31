import "./globals.css"
import type { Metadata } from "next"
import { Inter, Merriweather } from "next/font/google"
import PageTransition from "../components/PageTransition"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const merriweather = Merriweather({ subsets: ["latin"], variable: "--font-heading" })

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
      <body
        className={`${inter.variable} ${merriweather.variable} font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
