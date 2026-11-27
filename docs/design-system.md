# My Gym — Design System Specification

## 1. Design Tokens & Color Palettes

My Gym features a warm editorial Light-first design system engineered with **Google Stitch MCP** (`projects/10906287608289081816`, design system *"Warm Editorial Fitness"*) and configured through CSS custom properties in `frontend/src/index.css`.

### 1.1 Light Theme (Default — Warm Editorial Cream)
| Token | Variable | Value | Purpose |
|---|---|---|---|
| Clean Canvas | `--bg` | `#FAF6F0` | Warm Alabaster Cream canvas |
| Elevated Surface | `--bg-el` | `#F3EDE3` | Warm Sand headers and sheet backdrops |
| Card Surface | `--surface` | `#FFFFFF` | Pure crisp elevated card containers |
| Nested Surface | `--surface-2` | `#F3EDE3` | Recessed wells, input pills, rest rows |
| Control Surface | `--surface-3` | `#E8DFD2` | Segmented tracks, inactive controls |
| Hairline Border | `--border-card` | `#EAE2D6` | Warm stone 1px card outline |
| Primary Accent | `--acc` | `#D14615` | Burnt Coral primary fill (4.57:1 contrast with white text) |
| Accent Active | `--acc-2` | `#A73400` | Pressed / active state coral |
| Accessible Accent Text | `--acc-ink` | `#B8380B` | Deep terracotta small text & inline action ink (>5.5:1) |
| On-Accent Ink | `--on-acc` | `#FFFFFF` | Crisp white typography on filled coral CTAs |
| Primary Text | `--label` | `#1E1815` | Deep Espresso body & heading ink (>15:1) |
| Secondary Text | `--label-2` | `rgba(30,24,21,.72)` | Secondary captions & labels (>7:1) |
| Floating Nav Dock | `#tabbar` | `#211B18` (`rgba(33,27,24,.94)`) | Deep Espresso floating bottom pill navigation dock |

### 1.2 Dark Theme (Optional — Warm Deep Espresso)
| Token | Variable | Value | Purpose |
|---|---|---|---|
| Deep Canvas | `--bg` | `#161210` | Warm espresso obsidian background |
| Elevated Surface | `--bg-el` | `#1B1614` | Backdrops for sheets and floating bars |
| Card Surface | `--surface` | `#211B18` | Card & grouped-list containers |
| Nested Surface | `--surface-2` | `#2C2420` | Pressed states, sub-cards, nested controls |
| Control Surface | `--surface-3` | `#382E29` | Segmented controls, inactive switches |
| Raised Surface | `--surface-raised` | `#2E2521` | Dialogs and floating rest timer card |
| Primary Accent | `--acc` | `#F06D3B` | Luminous Coral accent fill |
| Accent Ink on Fill | `--on-acc` | `#0C0E12` | High-contrast dark typography on coral fills (>6.4:1) |
| Primary Text | `--label` | `#FAF6F0` | Warm cream readable ink |
| Secondary Text | `--label-2` | `rgba(250,246,240,.66)` | Subtitles, secondary metrics |
| Muted Border | `--border-card` | `#332924` | Warm espresso hairline card frame |

---

## 2. Typography Scale

The typographic hierarchy prioritizes rapid legibility between sets:

- **Screen Title:** System UI Sans Bold (`34px`, tight tracking `-0.028em`)
- **Card Header:** SemiBold (`17px–20px`, crisp weight contrast)
- **Hero Metric Value:** Tabular SemiBold (`30px`, `font-variant-numeric: tabular-nums`)
- **Set Stepper Numbers:** Tabular Medium/SemiBold (`17px` capped at `1.12x` text scale for fit)
- **Micro-label / Kicker:** Bold uppercase caption (`11px–12px`, `letter-spacing: 0.05em`)

---

## 3. Geometry & Spacing
- **Corner Radii:**
  - Micro / Badge: `10px` (`--r-sm`)
  - Rows & Inputs: `14px` (`--r`)
  - Cards & Grouped Lists: `20px` (`--r-card`)
  - Modals & Sheets: `22px` (`--r-xl`)
  - Primary CTA Buttons, Chips & Floating Bottom Dock: `28px` / `999px` (Full pill)
- **Tap Targets:**
  - Standard button: `44px` height minimum
  - Set completion badge & steppers: `44px+` dedicated hit area

---

## 4. Component Patterns

1. **Today Hero Card (`Home.jsx`):**
   - Clean 7-day calendar strip at top, single high-contrast Burnt Coral pill CTA (`Start`), and quiet `Choose a different workout` secondary link.
2. **At-a-Glance Bento Row (`Home.jsx`):**
   - Streamlined Body Weight trend + Streak consistency cards (`Recap`, `Deload`, `Challenges`, `RecoveryHint`, `Wrapped`, `StreakRule` removed from Home by default to eliminate vertical scrolling overload).
3. **Floating Espresso Dock (`#tabbar`):**
   - Floating `#211B18` pill dock over warm cream canvas, centered coral Start action button, and crisp high-contrast cream/warm-coral icons.
4. **Kairo Companion Pill (`Kairo.jsx`):**
   - Warm white editorial card with `#EAE2D6` hairline border, soft radial coral wash, and concise contextual guidance.
