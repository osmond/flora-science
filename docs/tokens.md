# Design Tokens

Flora-Science centralizes visual decisions in Tailwind's theme.

## Spacing

| Token | Value |
|-------|-------|
| `13`  | `3.25rem` |
| `18`  | `4.5rem`  |

Use these via Tailwind utilities, e.g. `p-13` or `mb-18`.

## Typography

| Token       | Font family |
|-------------|-------------|
| `font-sans` | Inter, system sans-serif |
| `font-heading` | Merriweather, serif |

Apply font families with `font-sans` and `font-heading` classes.

All new components should rely on these tokens instead of hard-coded values to ensure consistent spacing and type across the app.
