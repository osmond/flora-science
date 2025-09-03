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

---

## Design Tokens

### Colors
Defined in `styles/tokens.css`:
```
:root {
  --color-primary: #4ade80;
  --color-secondary: #64748b;
  --color-bg: #f8fafc;
  --color-bg-dark: #1e293b;
  --color-error: #ef4444;
  --color-success: #22c55e;
  --color-warning: #facc15;
}
```

### Spacing
Defined in `styles/spacing.css`:
```
:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 12px;
  --space-lg: 16px;
  --space-xl: 24px;
  --space-2xl: 32px;
}
```

### Typography
Defined in `styles/typography.css`:
```
.h1 { text-[32px] font-bold leading-tight; }
.h2 { text-[24px] font-semibold leading-snug; }
.h3 { text-[20px] font-medium leading-snug; }
.h4 { text-base font-medium leading-snug; }
.h5 { text-sm font-medium leading-snug; }
.body-text { text-base leading-normal; }
```

### Radii
Defined in `styles/tokens.css`:
```
:root {
  --radius-md: 0.5rem;
  --radius-lg: 1rem;
}
```

---

## Component Guidelines

### ChartCard
Use for metric visualizations. Supports `title`, `insight`, and children. Accessible with ARIA region and optional metric explanation button.
```tsx
<ChartCard title="Hydration" insight="Stable" variant="primary">
  <HydrationTrendChart log={hydrationLog} />
</ChartCard>
```

### PlantCard
Displays plant summary, hydration, status, and tasks. Uses design tokens for spacing, color, and radii. Accessible progress bar and status labels.
```tsx
<PlantCard nickname="Fern" species="Nephrolepis" status="Due today" hydration={80} />
```

### RoomCard
Shows room status, average hydration, and tasks. Includes accessible progress bar and selectable checkbox.
```tsx
<RoomCard name="Living Room" status="healthy" avgHydration={75} tasksDue={2} tags={["Bright", "Humid"]} />
```

### Navigation (SidebarNav, MobileNav)
Role="navigation", ARIA labels, keyboard accessible, focus ring for active/selected items.

---

## Accessibility Standards
- All interactive components use ARIA roles and labels.
- Keyboard navigation and focus rings are present.
- Color contrast meets WCAG AA/AAA where possible.
- Tooltips and info buttons provide scientific explanations for metrics.

---

## Example Layout
```tsx
<div className="grid gap-6 md:grid-cols-2">
  <VitalsSummary plant={plant} weather={weather} />
  <QuickStats plant={plant} weather={weather} />
</div>
```
