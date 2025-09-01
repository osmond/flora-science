import { type HTMLAttributes } from "react"

export const navItems = [
  {
    href: "/",
    label: "Today",
    icon: ({ className }: HTMLAttributes<HTMLSpanElement>) => (
      <span className={className}>📅</span>
    ),
  },
  {
    href: "/rooms",
    label: "Rooms",
    icon: ({ className }: HTMLAttributes<HTMLSpanElement>) => (
      <span className={className}>🪴</span>
    ),
  },
  {
    href: "/science",
    label: "Science Panel",
    icon: ({ className }: HTMLAttributes<HTMLSpanElement>) => (
      <span className={className}>🔬</span>
    ),
  },
  {
    href: "/notebook",
    label: "Lab Notebook",
    icon: ({ className }: HTMLAttributes<HTMLSpanElement>) => (
      <span className={className}>📓</span>
    ),
  },
]
