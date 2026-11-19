# My Gym — Design System Specification

## 1. Design Tokens & Color Palettes

My Gym features a dual-theme, high-performance athletic design system configured through CSS variables and Google Stitch design tokens.

### 1.1 Dark Theme (Foundational Athletic Obsidian)
| Token | Variable | Value | Purpose |
|---|---|---|---|
| Deep Canvas | `--bg` | `#0D110F` | Pitch obsidian background |
| Elevated Surface | `--bg-el` | `#111613` | Backdrops for sheets and floating bars |
| Card Surface | `--surface` | `#151B17` | Standard grouped card / container background |
| Nested Surface | `--surface-2` | `#202922` | Pressed states, sub-cards, nested controls |
| Control Surface | `--surface-3` | `#2D3930` | Segmented controls, inactive switches |
| Raised Surface | `--surface-raised` | `#26322A` | Dialogs, rest timer toast, tooltips |
| Primary Accent | `--acc` | `#C7F36B` | High-voltage acid lime for primary actions & active states |
| Accent Secondary | `--acc-2` | `#9FD834` | Hover / focus gradient state |
| Accent Text | `--on-acc` | `#0C0E12` | High-contrast dark text on lime buttons (>12:1) |
| Primary Text | `--label` | `#F3F6F0` | Maximum readability body and titles |
| Secondary Text | `--label-2` | `#A5B0A6` | Subtitles, secondary metrics (>7:1) |
| Hairline Border | `--sep` | `rgba(255,255,255,0.08)` | Sub-pixel clean dividing lines |
| Muted Border | `--border-card` | `#232B25` | Structured card framing |

### 1.2 Light Theme (Studio Crisp)
| Token | Variable | Value | Purpose |
|---|---|---|---|
| Clean Canvas | `--bg` | `#F5F7F2` | Warm off-white studio canvas |
| Elevated Surface | `--bg-el` | `#EBF0E7` | Sheets and navigation backdrops |
| Card Surface | `--surface` | `#FFFFFF` | Card containers |
| Nested Surface | `--surface-2` | `#E4ECE0` | Pressed elements and secondary groups |
| Primary Accent | `--acc` | `#84CC16` | Studio lime green fill |
| Accessible Green | `--acc-ink` | `#45691F` | High-contrast text and glyphs (>4.8:1) |
| Primary Text | `--label` | `#1A241C` | Crisp dark-green black text (>14:1) |
| Secondary Text | `--label-2` | `#59665C` | Secondary notes (>4.8:1) |
| Muted Border | `--border-card` | `#DCE3D9` | Border treatment |

---

## 2. Typography Scale

The typographic hierarchy prioritizes rapid readability during physical activity:

- **Display:** Plus Jakarta Sans Bold / Extrabold (32px–40px, letter-spacing: -0.025em)
- **Title 1 / Screen Title:** Plus Jakarta Sans Bold (24px–28px, -0.02em)
- **Title 2 / Card Header:** Plus Jakarta Sans SemiBold (18px–20px, -0.015em)
- **Body Bold / Metric Value:** Inter Medium / SemiBold (16px, tabular figures)
- **Body Regular:** Inter Regular (15px, line-height: 1.4)
- **Subhead / Caption:** Inter Regular / Medium (12px–13px)
- **Badge / Micro-label:** Plus Jakarta Sans Bold (10px–11px, uppercase, letter-spacing: 0.05em)

---

## 3. Geometry & Spacing
- **Corner Radii:**
  - Micro / Badge: `6px` (`--r-sm`)
  - Buttons & Inputs: `12px` (`--r`)
  - Cards & Containers: `16px` (`--r-lg` / `--r-card`)
  - Modals & Sheets: `22px` (`--r-xl`)
  - Avatars & Pills: `9999px` (Full round)
- **Tap Targets:**
  - Standard button: `44px` height minimum
  - Exercise row / set checkmark: `48px` x `48px` dedicated hit area
  - Icon buttons: `44px` x `44px` touch bounding box

---

## 4. Component Patterns

1. **Active Workout Set Row:**
   - Completed: Dimmed muted label, solid lime circle badge with dark checkmark.
   - Active: Lime highlight border, elevated surface, large +/- stepper buttons for rapid weight adjustment.
2. **Rest Timer Widget:**
   - Floating pill with circular countdown progress ring, time remaining, and instant +30s / Skip buttons.
3. **Kairo Companion Badge:**
   - Vector-rendered avatar, contextual speech bubble, and motivational tips.
