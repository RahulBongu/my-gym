# My Gym — Design System Specification

## 1. Design Tokens & Color Palettes

My Gym features a clean **Daylight Studio & Electric Indigo** design system configured through CSS custom properties in `frontend/src/index.css`.

### 1.1 Light Theme (Default — Crisp Daylight Studio)
| Token | Variable | Value | Purpose |
|---|---|---|---|
| Clean Canvas | `--bg` | `#F3F5F9` | Cool studio alabaster page background |
| Elevated Surface | `--bg-el` | `#EAEEF5` | Sheet headers and inset backdrops |
| Card Surface | `--surface` | `#FFFFFF` | Pure crisp elevated card containers |
| Nested Surface | `--surface-2` | `#EEF2F7` | Recessed wells, input pills, rest rows |
| Control Surface | `--surface-3` | `#E2E7F0` | Segmented tracks, inactive switches |
| Hairline Border | `--border-card` | `#E2E8F0` | Clean slate 1px card outline |
| Primary Accent | `--acc` | `#4F46E5` | Electric Indigo primary fill (6.29:1 contrast with white text) |
| Accent Active | `--acc-2` | `#4338CA` | Pressed / deeper indigo state |
| Accessible Accent Text | `--acc-ink` | `#4338CA` | Deep indigo small text & active nav ink (7.9:1 on white) |
| On-Accent Ink | `--on-acc` | `#FFFFFF` | Crisp white typography on filled indigo CTAs |
| Primary Text | `--label` | `#0F172A` | Deep Midnight Slate ink (>17:1 on white) |
| Secondary Text | `--label-2` | `rgba(15,23,42,.70)` | Secondary captions & labels (>6.8:1) |
| Hero Surface | `.home-hero` | `#0F172A → #1E293B` | High-contrast Midnight Slate workout focus card |
| Floating Nav Dock | `#tabbar` | `#FFFFFF` (`rgba(255,255,255,.94)`) | Frosted pure white floating bottom pill dock |

### 1.2 Dark Theme (Optional — Midnight Navy)
| Token | Variable | Value | Purpose |
|---|---|---|---|
| Deep Canvas | `--bg` | `#0B0F17` | Deep Midnight Navy background |
| Elevated Surface | `--bg-el` | `#111827` | Backdrops for sheets and floating bars |
| Card Surface | `--surface` | `#151E2E` | Card & grouped-list containers |
| Nested Surface | `--surface-2` | `#1E293B` | Pressed states, sub-cards, nested controls |
| Control Surface | `--surface-3` | `#273549` | Segmented controls, inactive switches |
| Raised Surface | `--surface-raised` | `#1E293B` | Dialogs and floating rest timer card |
| Primary Accent | `--acc` | `#60A5FA` | Luminous Electric Blue accent fill |
| Accent Ink on Fill | `--on-acc` | `#0F172A` | High-contrast dark typography on blue fills (>7.6:1) |
| Primary Text | `--label` | `#F8FAFC` | Crisp near-white slate ink |
| Secondary Text | `--label-2` | `rgba(248,250,252,.68)` | Subtitles, secondary metrics |
| Muted Border | `--border-card` | `#222D3F` | Dark navy hairline card frame |

---

## 2. Geometry & Tap Targets
- **Header Actions & Settings Control:**
  - Header action squircles (`.hdr .iconbtn`): `44px × 44px`, `border-radius: 14px`, `21px` glyph.
  - Home Settings button (`.hdr .iconbtn.hdr-settings`): `46px × 46px`, `border-radius: 15px`, `23px` gear icon with crisp card surface & border.
- **Corner Radii:**
  - Micro / Badge: `10px` (`--r-sm`)
  - Rows & Inputs: `14px` (`--r`)
  - Cards & Quick Routine Tiles: `20px` (`--r-card`)
  - Modals & Sheets: `22px` (`--r-xl`)
  - Pill CTAs & Floating Bottom Dock: `28px` / `999px`

---

## 3. Core Screen Structure
1. **Today Hero Card (`Home.jsx`):**
   - Midnight Slate feature card holding interactive 7-day calendar strip, Today's Workout title + Start CTA, and live exercise preview pills from the planned routine.
2. **Quick-Start Routine Grid (`Home.jsx`):**
   - Pre-seeded by default on first local start (`Push`, `Pull`, `Legs` via `buildStarterPlan('ppl')`) so new users have real exercises ready immediately and can launch any workout in 1 tap from Home.
3. **Calm Utility Screens (`Library.jsx`, `Stats.jsx`, `Home.jsx`):**
   - Removed intrusive coach banner boxes from daily utility screens so workouts, exercises, and progress appear cleanly above the fold.
