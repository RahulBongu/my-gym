# My Gym — Design Research & Interaction Architecture

## 1. Executive Summary & Vision

**My Gym** is a self-hosted, privacy-first workout & body-weight tracker engineered for fast, distraction-free logging, progressive overload tracking, and clear analytics. Built atop the **openGym** engine (AGPL-3.0-or-later), My Gym features a Light-first **Warm Editorial Fitness** design system generated with **Google Stitch MCP** (`projects/10906287608289081816`) alongside the supportive mascot **Kairo**.

---

## 2. Design Principles & Streamlined Scope

To make My Gym approachable and calm rather than overwhelming:

### 2.1 Uncluttered Daily Focus (`Home.jsx`, `MobileOnboarding.jsx`, `useStore.js`)
- **Lean Defaults:** New profiles start in **Light mode** with clean core modules active (`body`, `motivation`) while secondary power-user overlays (`effort`, `plates`, `strength`, `videos`, `watch`, `checkin`, `health`, `coach`, `integrations`, `community`, `seasonal`) remain opt-in under *Settings → Modules*.
- **Focused Home Dashboard:** Displays the Kairo daily cue pill, interactive 7-day plan & **Today** workout hero card, and the at-a-glance Body Weight & Consistency cards. Secondary cards (Recap, Deload cycle banners, Monthly Challenges, Wrapped, Recovery hints, Fasting timer, Streak rules) do not clutter the daily home feed.
- **Friendly Onboarding:** Features Kairo welcome illustration, optional focus goal chips (`Build muscle`, `Stronger`, `Steady`), and clear primary on-device start (`Let’s go` / `Use on this device`).

### 2.2 Hevy & Strong Active Workout Ergonomics
- Rapid tabular set entry with `44px+` steppers and focused coral border rings (`box-shadow: inset 0 0 0 1.5px var(--acc)`).
- Floating rest timer bar above the Deep Espresso bottom dock with quick `-15s / +15s / Skip` controls.
- Full-fidelity preservation of openGym's progression rules (`src/lib/progression.js`) and fatigue modeling (`src/lib/recovery.js`).

### 2.3 Warm Alabaster, Deep Espresso & Burnt Coral Palette
- Replaced dark obsidian / neon lime defaults with a bright, welcoming studio editorial aesthetic:
  - **Canvas (`--bg`):** `#FAF6F0` Warm Alabaster Cream
  - **Cards (`--surface`):** `#FFFFFF` with `1px solid #EAE2D6` hairline borders and subtle elevation
  - **Floating Navigation (`#tabbar`):** `#211B18` Deep Espresso pill bar anchored cleanly above system insets
  - **Primary Action Accent (`--acc`):** `#D14615` Burnt Coral with `#FFFFFF` ink (4.57:1 WCAG AA) and `#B8380B` text ink (>5.5:1 WCAG AA)

---

## 3. Accessibility & Motion
- **WCAG 2.1 AA Compliance:** Enforced by automated unit checks (`design-review.test.js`, `a11y-contrast-transparency.test.js`). Includes `prefers-contrast: more` overrides (deeper `#8F2702` ink and stronger `--label-2` / separator alphas) and `prefers-reduced-transparency: reduce` solid fallbacks.
- **Tactile Press Feedback:** Subtle scale (`0.97` buttons, `0.985` interactive cards) over `140ms`, automatically disabled under `prefers-reduced-motion: reduce`.

---

## 4. References & Artifacts
- Google Stitch Project: `projects/10906287608289081816` (*Warm Editorial Fitness* design system `assets/155dc6dde9294cffb608bbf70da598b1`)
- Apple Human Interface Guidelines & WCAG 2.1 AA Accessibility Specification
- openGym Engine Architecture (`docs/ARCHITECTURE.md`)
