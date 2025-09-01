# Design System

## Color Palette

The palette is tested against the `flora.light` background (`#F0FDF4`). Contrast ratios were calculated using the WCAG formula and meet at least AA guidelines for normal text.

| Token | Hex | Contrast vs `#F0FDF4` |
|-------|-----|-----------------------|
| `flora.leaf` / `fertilize` | `#1A7D1E` | 5.02:1 |
| `flora.soil` | `#6B4226` | 8.25:1 |
| `flora.sky` / `water` | `#0950C4` | 6.79:1 |
| `flora.light` | `#F0FDF4` | — |
| `notes` | `#7623C5` | 7.12:1 |
| `alert.DEFAULT` | `#8E6B00` | 4.72:1 |
| `alert.red` | `#BD1212` | 6.16:1 |

These values satisfy WCAG AA for normal text (≥4.5:1). `flora.soil` and `notes` also meet AAA (≥7:1).
